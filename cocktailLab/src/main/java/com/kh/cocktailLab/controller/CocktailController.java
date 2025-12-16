package com.kh.cocktailLab.controller;

import com.kh.cocktailLab.dto.request.CocktailRequest;
import com.kh.cocktailLab.dto.response.CocktailResponse;
import com.kh.cocktailLab.service.CocktailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cocktails")
@RequiredArgsConstructor
public class CocktailController {
    
    private final CocktailService cocktailService;
    
    // 칵테일 생성
    @PostMapping
    public ResponseEntity<String> createCocktail(
            CocktailRequest request,
            @RequestParam(value = "upfile", required = false) MultipartFile upfile) throws IOException {
        
        if (request == null || request.getMemberNo() == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
        }
        
        // 파일 업로드 처리
        if (upfile != null && !upfile.isEmpty()) {
            File uploadDir = new File("C:\\khWorkspace\\07_RestServer\\cocktailLab\\src\\main\\resources\\uploads");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            File file = new File(uploadDir, upfile.getOriginalFilename());
            upfile.transferTo(file);
            request.setCocktailImagePath("/uploads/" + upfile.getOriginalFilename());
        }
        
        CocktailResponse response = cocktailService.createCocktail(request, request.getMemberNo());
        
        if (response != null) {
            return new ResponseEntity<>("칵테일 등록 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("칵테일 등록 실패", HttpStatus.BAD_REQUEST);
        }
    }
    
    
    // 칵테일 전체 조회
    @GetMapping
    public ResponseEntity<List<CocktailResponse>> getCocktails() {
        List<CocktailResponse> responses = cocktailService.getAllCocktails(null);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    // 칵테일 상세 조회
    @GetMapping("/{cocktailNo}")
    public ResponseEntity<CocktailResponse> getCocktail(@PathVariable Long cocktailNo) {
        CocktailResponse response = cocktailService.getCocktail(cocktailNo, null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // 회원별 칵테일 조회
    @GetMapping("/members/{memberNo}")
    public ResponseEntity<List<CocktailResponse>> getCocktailsByMember(
            @PathVariable Long memberNo) {
        
        List<CocktailResponse> responses = cocktailService.getCocktailsByMember(memberNo);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    // 칵테일 수정
    @PutMapping("/{cocktailNo}")
    public ResponseEntity<String> updateCocktail(
            @PathVariable Long cocktailNo,
            CocktailRequest request,
            @RequestParam(value = "upfile", required = false) MultipartFile upfile) throws IOException {
        
        if (request == null || request.getMemberNo() == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.BAD_REQUEST);
        }
        
        // 파일 업로드 처리
        if (upfile != null && !upfile.isEmpty()) {
            File uploadDir = new File("C:\\khWorkspace\\07_RestServer\\cocktailLab\\src\\main\\resources\\uploads");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            File file = new File(uploadDir, upfile.getOriginalFilename());
            upfile.transferTo(file);
            request.setCocktailImagePath("/uploads/" + upfile.getOriginalFilename());
        }
        
        CocktailResponse response = cocktailService.updateCocktail(cocktailNo, request, request.getMemberNo());
        return new ResponseEntity<>("칵테일 수정완료", HttpStatus.OK);
    }
    
    
    // 칵테일 삭제
    @DeleteMapping("/{cocktailNo}")
    public ResponseEntity<String> deleteCocktail(
            @PathVariable Long cocktailNo,
            @RequestParam Long memberNo) {
        
        cocktailService.deleteCocktail(cocktailNo, memberNo);
        return new ResponseEntity<>("칵테일 삭제완료", HttpStatus.OK);
    }
}

