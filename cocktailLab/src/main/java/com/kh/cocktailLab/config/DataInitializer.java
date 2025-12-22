package com.kh.cocktailLab.config;

import com.kh.cocktailLab.entity.Cocktail;
import com.kh.cocktailLab.entity.CocktailType;
import com.kh.cocktailLab.entity.Member;
import com.kh.cocktailLab.repository.CocktailRepository;
import com.kh.cocktailLab.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 서버 시작 시 초기 데이터를 삽입하는 클래스
 * 
 * 동작 방식:
 * 1. 서버가 완전히 시작된 후 실행됩니다 (ApplicationRunner)
 * 2. JPA가 완전히 초기화된 후 실행됩니다
 * 3. ddl-auto: create 모드일 때 테이블이 재생성되므로, 데이터가 없으면 자동으로 초기 데이터를 삽입합니다
 * 
 * 주의사항:
 * - Cocktail은 Member와 연관관계가 필수이므로, 먼저 시스템 Member를 생성합니다
 * - 이미지 경로는 /images/cocktails/ 폴더에 있다고 가정합니다
 * - 실제 이미지 파일은 src/main/resources/static/images/cocktails/ 에 위치해야 합니다
 */
@Slf4j
@Component
@RequiredArgsConstructor
@Order(1) // 다른 ApplicationRunner보다 먼저 실행되도록 설정
public class DataInitializer implements ApplicationRunner {

    private final MemberRepository memberRepository;
    private final CocktailRepository cocktailRepository;

    @Value("${cocktail.initial-data.enabled:true}")
    private boolean initialDataEnabled;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        // 초기 데이터 삽입이 비활성화되어 있으면 실행하지 않음
        if (!initialDataEnabled) {
            log.info("초기 데이터 삽입이 비활성화되어 있습니다.");
            return;
        }

        // 이미 데이터가 있으면 초기화하지 않음
        if (memberRepository.count() > 0) {
            log.info("이미 데이터가 존재하므로 초기 데이터를 삽입하지 않습니다.");
            return;
        }

        log.info("초기 데이터 삽입을 시작합니다...");

        // 1. 기본 Member 생성 (일반 칵테일용 시스템 계정)
        Member systemMember = Member.builder()
                .memberId("system")
                .memberPwd("system")
                .nickname("시스템")
                .email("system@cocktaillab.com")
                .build();
        
        Member savedMember = memberRepository.save(systemMember);
        log.info("시스템 계정 생성 완료: {}", savedMember.getMemberId());

        // 2. 일반 칵테일 레시피 데이터 생성 (텍스트 파일에서 읽기)
        List<Cocktail> defaultCocktails = createDefaultCocktailsFromFile(savedMember);
        cocktailRepository.saveAll(defaultCocktails);
        
        log.info("초기 칵테일 데이터 {}개 삽입 완료", defaultCocktails.size());
    }

    /**
     * 마크다운 파일에서 칵테일 데이터를 읽어서 생성
     * 파일 형식:
     * - 칵테일 이름 (한글명 (영문명))
     * - https://... (이미지 URL)
     * - 재료: ...
     * - 제조법: ...
     */
    private List<Cocktail> createDefaultCocktailsFromFile(Member member) {
        List<Cocktail> cocktails = new ArrayList<>();
        
        try {
            // React 프로젝트의 마크다운 파일 경로
            Path markdownPath = Paths.get("../react-cocktailLab-project/src/resources/defaultcocktails.md");
            
            // 상대 경로로 파일이 없으면 절대 경로 시도
            if (!Files.exists(markdownPath)) {
                // 현재 프로젝트의 resources 폴더에서도 시도
                InputStream inputStream = getClass().getClassLoader()
                        .getResourceAsStream("defaultcocktails.md");
                if (inputStream != null) {
                    return parseMarkdownFile(inputStream, member);
                }
                log.warn("defaultcocktails.md 파일을 찾을 수 없습니다. 기본 데이터를 사용합니다.");
                return createDefaultCocktails(member);
            }
            
            BufferedReader reader = Files.newBufferedReader(markdownPath, StandardCharsets.UTF_8);
            List<Cocktail> result = parseMarkdownFile(reader, member);
            reader.close();
            
            return result;
            
        } catch (Exception e) {
            log.error("마크다운 파일 읽기 실패: {}", e.getMessage(), e);
            log.info("기본 데이터를 사용합니다.");
            return createDefaultCocktails(member);
        }
    }
    
    /**
     * 마크다운 파일 내용을 파싱하여 칵테일 리스트 생성
     */
    private List<Cocktail> parseMarkdownFile(Object input, Member member) throws Exception {
        List<Cocktail> cocktails = new ArrayList<>();
        BufferedReader reader;
        
        if (input instanceof BufferedReader) {
            reader = (BufferedReader) input;
        } else if (input instanceof InputStream) {
            reader = new BufferedReader(
                    new InputStreamReader((InputStream) input, StandardCharsets.UTF_8));
        } else {
            throw new IllegalArgumentException("지원하지 않는 입력 타입입니다.");
        }
        
        String line;
        String cocktailName = null;
        String imageUrl = null;
        List<String> ingredients = new ArrayList<>();
        String instructions = null;
        String description = null;
        boolean expectingDescription = false; // 설명을 기대하는 상태인지 추적
        
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            
            // 빈 줄 처리
            if (line.isEmpty()) {
                // 설명을 기대하는 상태였다면 설명 수집 종료
                if (expectingDescription && description != null) {
                    expectingDescription = false;
                }
                continue;
            }
            
            // 칵테일 이름인지 확인 (http로 시작하지 않고, 재료/제조법/설명으로 시작하지 않음)
            boolean isCocktailName = !line.startsWith("http://") && 
                                     !line.startsWith("https://") &&
                                     !line.startsWith("재료:") && 
                                     !line.startsWith("제조법:") && 
                                     !line.startsWith("설명:");
            
            // 새로운 칵테일 이름을 만나면 이전 칵테일 저장
            if (isCocktailName && cocktailName != null) {
                // 이전 칵테일 저장
                if (!ingredients.isEmpty()) {
                    Cocktail cocktail = Cocktail.builder()
                            .cocktailName(cocktailName)
                            .description(description != null ? description : "")
                            .ingredients(new ArrayList<>(ingredients))
                            .instructions(instructions != null ? instructions : "")
                            .cocktailImagePath(imageUrl != null ? imageUrl : "")
                            .cocktailType(CocktailType.DEFAULT)
                            .member(member)
                            .build();
                    cocktails.add(cocktail);
                }
                // 초기화
                cocktailName = null;
                imageUrl = null;
                ingredients.clear();
                instructions = null;
                description = null;
                expectingDescription = false;
            }
            
            // 칵테일 이름
            if (isCocktailName && cocktailName == null) {
                // 괄호 제거 (한글명만 사용)
                cocktailName = line.replaceAll("\\(.*\\)", "").trim();
                continue;
            }
            
            // 이미지 URL (https:// 또는 http://로 시작)
            if (line.startsWith("http://") || line.startsWith("https://")) {
                imageUrl = line;
                expectingDescription = true; // 이미지 URL 다음에는 설명이 올 수 있음
                continue;
            }
            
            // 재료
            if (line.startsWith("재료:")) {
                expectingDescription = false; // 재료를 만나면 설명 수집 종료
                String ingredientsStr = line.substring(3).trim();
                // 쉼표로 분리
                String[] ingredientArray = ingredientsStr.split(",");
                for (String ing : ingredientArray) {
                    String trimmed = ing.trim();
                    if (!trimmed.isEmpty()) {
                        ingredients.add(trimmed);
                    }
                }
                continue;
            }
            
            // 제조법
            if (line.startsWith("제조법:")) {
                expectingDescription = false; // 제조법을 만나면 설명 수집 종료
                instructions = line.substring(4).trim();
                continue;
            }
            
            // 설명 (선택적) - "설명:" 접두사가 있는 경우
            if (line.startsWith("설명:")) {
                expectingDescription = false;
                description = line.substring(3).trim();
                continue;
            }
            
            // 설명이 칵테일 이름과 이미지 URL 다음에 바로 오는 경우 (재료나 제조법 전에)
            // 이미지 URL을 읽은 후, 재료나 제조법이 아닌 텍스트는 설명으로 처리
            if (expectingDescription && cocktailName != null && imageUrl != null && 
                ingredients.isEmpty() && instructions == null && 
                !line.startsWith("재료:") && !line.startsWith("제조법:")) {
                // 설명이 여러 줄일 수 있으므로 계속 추가
                if (description == null) {
                    description = line;
                } else {
                    description += " " + line;
                }
                continue;
            }
        }
        
        // 마지막 칵테일 저장
        if (cocktailName != null && !ingredients.isEmpty()) {
            Cocktail cocktail = Cocktail.builder()
                    .cocktailName(cocktailName)
                    .description(description != null ? description : "")
                    .ingredients(new ArrayList<>(ingredients))
                    .instructions(instructions != null ? instructions : "")
                    .cocktailImagePath(imageUrl != null ? imageUrl : "")
                    .cocktailType(CocktailType.DEFAULT)
                    .member(member)
                    .build();
            cocktails.add(cocktail);
        }
        
        if (input instanceof InputStream) {
            reader.close();
        }
        
        log.info("마크다운 파일에서 {}개의 칵테일 데이터를 읽었습니다.", cocktails.size());
        
        return cocktails;
    }
    
    
    /**
     * 기본 칵테일 레시피 목록 생성 (폴백용)
     * 이미지 경로는 resources/static/images/cocktails/ 폴더에 있다고 가정
     */
    private List<Cocktail> createDefaultCocktails(Member member) {
        return Arrays.asList(
                // 마티니
                Cocktail.builder()
                        .cocktailName("마티니")
                        .description("클래식한 칵테일의 대표주자. 진과 드라이 베르무트의 조화")
                        .ingredients(Arrays.asList(
                                "진 60ml",
                                "드라이 베르무트 10ml",
                                "올리브"
                        ))
                        .instructions("1. 믹싱 글라스에 얼음을 넣고 진과 드라이 베르무트를 넣습니다.\n" +
                                "2. 바 스푼으로 저어가며 차갑게 만듭니다.\n" +
                                "3. 마티니 글라스에 스트레이너로 걸러 부어줍니다.\n" +
                                "4. 올리브를 장식으로 넣어줍니다.")
                        .cocktailImagePath("/images/cocktails/martini.jpg")
                        .cocktailType(CocktailType.DEFAULT)
                        .member(member)
                        .build(),

                // 모히토
                Cocktail.builder()
                        .cocktailName("모히토")
                        .description("상큼하고 시원한 민트 칵테일")
                        .ingredients(Arrays.asList(
                                "화이트 럼 50ml",
                                "라임 주스 30ml",
                                "민트 잎 10장",
                                "설탕 2티스푼",
                                "소다수"
                        ))
                        .instructions("1. 하이볼 글라스에 민트 잎과 설탕을 넣고 민트 향이 날 때까지 으깹니다.\n" +
                                "2. 라임 주스를 넣고 얼음을 채웁니다.\n" +
                                "3. 화이트 럼을 부어줍니다.\n" +
                                "4. 소다수로 채우고 바 스푼으로 저어줍니다.\n" +
                                "5. 민트 잎으로 장식합니다.")
                        .cocktailImagePath("/images/cocktails/mojito.jpg")
                        .cocktailType(CocktailType.DEFAULT)
                        .member(member)
                        .build(),

                // 마가리타
                Cocktail.builder()
                        .cocktailName("마가리타")
                        .description("테킬라 기반의 클래식 칵테일")
                        .ingredients(Arrays.asList(
                                "테킬라 50ml",
                                "트리플 섹 20ml",
                                "라임 주스 20ml",
                                "소금"
                        ))
                        .instructions("1. 마가리타 글라스 가장자리에 소금을 발라줍니다.\n" +
                                "2. 셰이커에 얼음, 테킬라, 트리플 섹, 라임 주스를 넣습니다.\n" +
                                "3. 잘 흔들어줍니다.\n" +
                                "4. 소금이 발라진 글라스에 부어줍니다.\n" +
                                "5. 라임 슬라이스로 장식합니다.")
                        .cocktailImagePath("/images/cocktails/margarita.jpg")
                        .cocktailType(CocktailType.DEFAULT)
                        .member(member)
                        .build(),

                // 올드 패션드
                Cocktail.builder()
                        .cocktailName("올드 패션드")
                        .description("위스키 기반의 클래식 칵테일")
                        .ingredients(Arrays.asList(
                                "버번 위스키 60ml",
                                "설탕 큐브 1개",
                                "앙고스투라 비터스 2-3 dash",
                                "오렌지 껍질"
                        ))
                        .instructions("1. 올드 패션드 글라스에 설탕 큐브를 넣습니다.\n" +
                                "2. 비터스를 몇 방울 떨어뜨립니다.\n" +
                                "3. 바 스푼으로 설탕을 으깹니다.\n" +
                                "4. 위스키를 넣고 얼음을 추가합니다.\n" +
                                "5. 바 스푼으로 저어가며 차갑게 만듭니다.\n" +
                                "6. 오렌지 껍질로 장식합니다.")
                        .cocktailImagePath("/images/cocktails/old_fashioned.jpg")
                        .cocktailType(CocktailType.DEFAULT)
                        .member(member)
                        .build(),

                // 네그로니
                Cocktail.builder()
                        .cocktailName("네그로니")
                        .description("진, 캄파리, 스위트 베르무트의 완벽한 조화")
                        .ingredients(Arrays.asList(
                                "진 30ml",
                                "캄파리 30ml",
                                "스위트 베르무트 30ml",
                                "오렌지 껍질"
                        ))
                        .instructions("1. 올드 패션드 글라스에 얼음을 넣습니다.\n" +
                                "2. 진, 캄파리, 스위트 베르무트를 모두 넣습니다.\n" +
                                "3. 바 스푼으로 저어가며 차갑게 만듭니다.\n" +
                                "4. 오렌지 껍질을 비틀어 향을 내고 장식으로 넣습니다.")
                        .cocktailImagePath("/images/cocktails/negroni.jpg")
                        .cocktailType(CocktailType.DEFAULT)
                        .member(member)
                        .build()
        );
    }
}
