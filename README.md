# 🚀 CocktailLab - 칵테일 레시피 공유 플랫폼
> 칵테일 레시피를 탐색하고 나만의 커스텀 칵테일을 제작할 수 있는 풀스택 웹 애플리케이션

## 📘 개요 (Overview)
본 프로젝트는 **Spring Boot 기반 RESTful API 서버**와 **React 기반 SPA 프론트엔드**로 구성된 풀스택 웹 애플리케이션입니다.  
사용자는 회원가입 후 자신만의 칵테일 레시피를 등록하고, 다른 사용자들의 레시피를 탐색하며 좋아요를 누를 수 있습니다.  
**Monorepo 구조**로 Backend와 Frontend를 하나의 저장소에서 관리하며,  
**H2 Database**와 **Spring Data JPA**를 통해 데이터 연동을 수행합니다.  
서버 시작 시 마크다운 파일을 읽어 자동으로 일반 칵테일 데이터를 초기화하며,  
**PostImg 클라우드 호스팅**을 통해 이미지 URL을 관리합니다.

## 🧱 기술 스택 (Tech Stack)
| 구분 | 사용 기술 |
|------|------------|
| **Backend** | Java 17, Spring Boot 3.4.12, Spring Data JPA, Hibernate |
| **Frontend** | React 19, JavaScript (JSX), Styled Components |
| **상태 관리** | Zustand (persist middleware) |
| **라우팅** | React Router DOM v7 |
| **Database** | H2 Database |
| **빌드 도구** | Gradle (Backend), Vite (Frontend) |
| **유틸리티** | Lombok, Jakarta Validation |
| **Tools** | Git, GitHub |

## 🛠️ 설치 및 실행 (Installation & Run)

### 1. 프로젝트 클론
```bash
git clone https://github.com/jinwoojaemeon/restCocktailLab.git
cd restCocktailLab
```

### 2. Backend 실행
```bash
cd cocktailLab

# Windows
gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

**서버 주소**: `http://localhost:8888`  
**API Base URL**: `http://localhost:8888/api`

### 3. Frontend 실행
```bash
cd react-cocktailLab-project

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. 데이터베이스 접속 (H2 Console)
- 브라우저에서 접속: `http://localhost:8888/h2-console`
- JDBC URL: `jdbc:h2:tcp://localhost/C:\khWorkspace\07_RestServer\db\tdb`
- Username: `sa`
- Password: `1234`

## 📂 프로젝트 구조 (Directory Structure)
```
restCocktail/
├── cocktailLab/                    # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/kh/cocktailLab/
│   │   │   │       ├── config/         # 설정 클래스 (DataInitializer 등)
│   │   │   │       ├── controller/     # REST API 컨트롤러
│   │   │   │       │   └── dto/        # 요청/응답 DTO
│   │   │   │       ├── service/        # 비즈니스 로직
│   │   │   │       ├── repository/      # 데이터베이스 접근 계층
│   │   │   │       ├── entity/         # JPA 엔티티
│   │   │   │       └── exception/      # 예외 처리
│   │   │   └── resources/
│   │   │       ├── application.yaml    # Spring Boot 설정
│   │   │       └── defaultcocktails.md # 초기 데이터 (선택사항)
│   │   └── test/                      # 테스트 코드
│   ├── build.gradle                   # Gradle 빌드 설정
│   └── README.md                      # Backend 상세 문서
│
├── react-cocktailLab-project/      # Frontend (React)
│   ├── src/
│   │   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── pages/                  # 페이지 컴포넌트
│   │   ├── stores/                 # Zustand 상태 관리 스토어
│   │   ├── routes/                 # 라우팅 설정
│   │   └── resources/              # 리소스 파일 (이미지, 마크다운 등)
│   │       └── defaultcocktails.md # 일반 칵테일 데이터
│   ├── package.json                # npm 의존성
│   └── README.md                   # Frontend 상세 문서
│
└── README.md                       # 통합 문서 (현재 파일)
```

## 📅 ERD
<a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/hvD2gnfm/cocktail-Lab-(1).png' border='0' alt='cocktail-Lab-(1)'></a>


## 🌟 주요 기능 (Key Features)

### 1. 회원가입 / 로그인 / 로그아웃 기능

#### 📝 회원가입
새로운 사용자를 등록합니다. 아이디, 비밀번호, 닉네임, 이메일 정보가 필요합니다.

**API 엔드포인트**: `POST /api/members`

**요청 예시**:
```json
{
  "memberId": "user123",
  "userPwd": "password123",
  "nickname": "칵테일러버",
  "email": "user@example.com"
}
```

**응답 예시** (성공 시, HTTP 201):
```json
{
  "memberNo": 1,
  "memberId": "user123",
  "nickname": "칵테일러버",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/members', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    memberId: 'user123',
    userPwd: 'password123',
    nickname: '칵테일러버',
    email: 'user@example.com'
  })
});
const member = await response.json();
```

**cURL 사용 예시**:
```bash
curl -X POST http://localhost:8888/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "user123",
    "userPwd": "password123",
    "nickname": "칵테일러버",
    "email": "user@example.com"
  }'
```

#### 🔐 로그인
등록된 사용자의 아이디와 비밀번호로 로그인합니다.

**API 엔드포인트**: `POST /api/members/login`

**요청 예시**:
```json
{
  "memberId": "user123",
  "userPwd": "password123"
}
```

**응답 예시** (성공 시, HTTP 200):
```json
{
  "memberNo": 1,
  "memberId": "user123",
  "nickname": "칵테일러버",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/members/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    memberId: 'user123',
    userPwd: 'password123'
  })
});
const user = await response.json();
// 로그인 성공 시 memberNo를 로컬스토리지에 저장
localStorage.setItem('user', JSON.stringify(user));
```

---

### 2. 칵테일 레시피 CRUD (생성, 조회, 수정, 삭제)

#### ➕ 칵테일 생성
사용자가 자신만의 커스텀 칵테일 레시피를 등록합니다.

**API 엔드포인트**: `POST /api/cocktails`

**요청 예시**:
```json
{
  "memberNo": 1,
  "cocktailName": "나만의 마티니",
  "description": "특별한 레시피로 만든 마티니입니다.",
  "ingredients": ["진 60ml", "드라이 베르무트 10ml", "올리브"],
  "instructions": "진과 베르무트를 섞어서 저어주고, 올리브로 장식합니다.",
  "cocktailImagePath": "https://i.postimg.cc/example.jpg"
}
```

**응답 예시** (성공 시, HTTP 200):
```
"칵테일 등록 성공"
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/cocktails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    memberNo: 1,
    cocktailName: '나만의 마티니',
    description: '특별한 레시피로 만든 마티니입니다.',
    ingredients: ['진 60ml', '드라이 베르무트 10ml', '올리브'],
    instructions: '진과 베르무트를 섞어서 저어주고, 올리브로 장식합니다.',
    cocktailImagePath: 'https://i.postimg.cc/example.jpg'
  })
});
const result = await response.text();
```

#### 📋 칵테일 전체 조회
모든 칵테일 레시피를 조회합니다. 선택적으로 특정 회원의 칵테일만 필터링할 수 있습니다.

**API 엔드포인트**: `GET /api/cocktails?memberNo={memberNo}` (memberNo는 선택사항)

**응답 예시** (HTTP 200):
```json
[
  {
    "cocktailNo": 1,
    "cocktailName": "마티니",
    "description": "클래식한 칵테일",
    "ingredients": ["진", "드라이 베르무트"],
    "instructions": "섞어서 마십니다.",
    "cocktailImagePath": "https://i.postimg.cc/example.jpg",
    "cocktailType": "DEFAULT",
    "memberNo": null,
    "memberId": null,
    "nickname": null,
    "likeCount": 5,
    "isLiked": false,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "cocktailNo": 2,
    "cocktailName": "나만의 마티니",
    "description": "특별한 레시피로 만든 마티니입니다.",
    "ingredients": ["진 60ml", "드라이 베르무트 10ml", "올리브"],
    "instructions": "진과 베르무트를 섞어서 저어주고, 올리브로 장식합니다.",
    "cocktailImagePath": "https://i.postimg.cc/example2.jpg",
    "cocktailType": "CUSTOM",
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "likeCount": 3,
    "isLiked": true,
    "createdAt": "2024-01-16T14:20:00",
    "updatedAt": "2024-01-16T14:20:00"
  }
]
```

**JavaScript 사용 예시**:
```javascript
// 전체 조회
const response = await fetch('http://localhost:8888/api/cocktails');
const cocktails = await response.json();

// 특정 회원의 칵테일만 조회
const userCocktails = await fetch('http://localhost:8888/api/cocktails?memberNo=1')
  .then(res => res.json());
```

#### 🔍 칵테일 상세 조회
특정 칵테일의 상세 정보를 조회합니다.

**API 엔드포인트**: `GET /api/cocktails/{cocktailNo}`

**응답 예시** (HTTP 200):
```json
{
  "cocktailNo": 1,
  "cocktailName": "마티니",
  "description": "클래식한 칵테일",
  "ingredients": ["진", "드라이 베르무트"],
  "instructions": "섞어서 마십니다.",
  "cocktailImagePath": "https://i.postimg.cc/example.jpg",
  "cocktailType": "DEFAULT",
  "memberNo": null,
  "memberId": null,
  "nickname": null,
  "likeCount": 5,
  "isLiked": false,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

#### ✏️ 칵테일 수정
등록한 칵테일 레시피를 수정합니다. 작성자만 수정할 수 있습니다.

**API 엔드포인트**: `PUT /api/cocktails/{cocktailNo}`

**요청 예시**:
```json
{
  "memberNo": 1,
  "cocktailName": "수정된 마티니",
  "description": "레시피를 개선했습니다.",
  "ingredients": ["진 70ml", "드라이 베르무트 5ml", "올리브 2개"],
  "instructions": "진과 베르무트를 섞고, 올리브 2개로 장식합니다.",
  "cocktailImagePath": "https://i.postimg.cc/new-image.jpg"
}
```

**응답 예시** (성공 시, HTTP 200):
```
"칵테일 수정완료"
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/cocktails/2', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    memberNo: 1,
    cocktailName: '수정된 마티니',
    description: '레시피를 개선했습니다.',
    ingredients: ['진 70ml', '드라이 베르무트 5ml', '올리브 2개'],
    instructions: '진과 베르무트를 섞고, 올리브 2개로 장식합니다.',
    cocktailImagePath: 'https://i.postimg.cc/new-image.jpg'
  })
});
```

#### 🗑️ 칵테일 삭제
등록한 칵테일을 삭제합니다. 작성자만 삭제할 수 있습니다.

**API 엔드포인트**: `DELETE /api/cocktails/{cocktailNo}?memberNo={memberNo}`

**응답 예시** (성공 시, HTTP 200):
```
"칵테일 삭제완료"
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/cocktails/2?memberNo=1', {
  method: 'DELETE'
});
const result = await response.text();
```

---

### 3. 좋아요 기능 (토글 방식)

#### ❤️ 좋아요 토글
칵테일에 좋아요를 누르거나 취소합니다. 이미 좋아요를 눌렀다면 취소되고, 누르지 않았다면 좋아요가 추가됩니다.

**API 엔드포인트**: `POST /api/cocktails/{cocktailNo}/likes?memberNo={memberNo}`

**응답 예시** (성공 시, HTTP 200):
```
"좋아요 처리 완료"
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/cocktails/1/likes?memberNo=1', {
  method: 'POST'
});
const result = await response.text();
```

#### 📊 좋아요 개수 조회
특정 칵테일의 좋아요 개수를 조회합니다.

**API 엔드포인트**: `GET /api/cocktails/{cocktailNo}/likes`

**응답 예시** (HTTP 200):
```json
{
  "likeCount": 5
}
```

#### ✅ 좋아요 여부 확인
현재 사용자가 특정 칵테일에 좋아요를 눌렀는지 확인합니다.

**API 엔드포인트**: `GET /api/cocktails/{cocktailNo}/likes/check?memberNo={memberNo}`

**응답 예시** (HTTP 200):
```json
{
  "isLiked": true
}
```

---

### 4. 일반 레시피와 커스텀 레시피 구분

시스템에서 제공하는 **일반 레시피(DEFAULT)**와 사용자가 제작한 **커스텀 레시피(CUSTOM)**를 구분합니다.

- **DEFAULT**: 서버 시작 시 `defaultcocktails.md` 파일에서 자동으로 로드되는 기본 칵테일
- **CUSTOM**: 사용자가 직접 등록한 칵테일

**응답에서 구분**:
```json
{
  "cocktailType": "DEFAULT",  // 또는 "CUSTOM"
  "memberNo": null,           // DEFAULT는 null, CUSTOM은 작성자 번호
  "memberId": null,           // DEFAULT는 null, CUSTOM은 작성자 아이디
  "nickname": null            // DEFAULT는 null, CUSTOM은 작성자 닉네임
}
```

---

### 5. 이미지 클라우드 호스팅 지원 (PostImg)

칵테일 이미지는 **PostImg** 클라우드 호스팅 서비스를 통해 관리됩니다. 이미지 URL을 데이터베이스에 저장하여 프론트엔드에서 바로 사용할 수 있습니다.

**이미지 URL 형식**:
```
https://i.postimg.cc/xxxxx/example.jpg
```

**사용 예시**:
```javascript
// 칵테일 생성 시 이미지 URL 포함
{
  "cocktailImagePath": "https://i.postimg.cc/xxxxx/cocktail.jpg"
}

// 프론트엔드에서 이미지 표시
<img src={cocktail.cocktailImagePath} alt={cocktail.cocktailName} />
```

---

### 6. 서버 시작 시 초기 데이터 자동 로드

서버가 시작될 때 `react-cocktailLab-project/src/resources/defaultcocktails.md` 파일을 읽어 자동으로 일반 칵테일 데이터를 데이터베이스에 삽입합니다.

**마크다운 파일 형식**:
```markdown
칵테일 이름 (영문명)
https://이미지-URL.jpg

설명 (선택사항)

재료: 재료1, 재료2, 재료3

제조법: 제조 방법 설명
```

**제공되는 일반 칵테일**: 마티니, 마가리타, 모히토, 올드 패션드, 코스모폴리탄, 다이키리, 맨해튼, 네그로니, 피나 콜라다, 블러디 메리, 롱 아일랜드 아이스 티, 진 토닉, 위스키 사워, 미모사, 모스크바 뮬, 에스프레소 마티니, 데킬라 선라이즈, 화이트 러시안, 블루 하와이, 도화, 동해, 김렛, 애플 마티니, 상그리아, 갓파더

---

### 7. 회원별 칵테일 조회

특정 회원이 작성한 모든 칵테일을 조회할 수 있습니다.

**API 엔드포인트**: `GET /api/cocktails/members/{memberNo}`

**응답 예시** (HTTP 200):
```json
[
  {
    "cocktailNo": 2,
    "cocktailName": "나만의 마티니",
    "cocktailType": "CUSTOM",
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "likeCount": 3,
    "isLiked": false
  }
]
```

**JavaScript 사용 예시**:
```javascript
const response = await fetch('http://localhost:8888/api/cocktails/members/1');
const userCocktails = await response.json();
```  

## 📡 API 명세
### 인증 방식
현재는 간단한 인증 방식을 사용합니다:
- **회원 번호 전달 방식**: 
  - **요청 본문(Body)**: 칵테일 생성/수정 시 `memberNo` 필드로 전달
  - **쿼리 파라미터(Query Parameter)**: 칵테일 삭제, 좋아요 등에서 `?memberNo=1` 형식으로 전달
- ⚠️ **주의**: 실제 프로덕션 환경에서는 JWT 토큰 등의 보안 인증 방식을 사용하는 것을 권장합니다.

### 주요 엔드포인트

#### 회원 관련
- `POST /api/members` - 회원가입
- `POST /api/members/login` - 로그인
- `GET /api/members/{memberNo}` - 회원 정보 조회
- `GET /api/members/check-memberId?memberId={id}` - 아이디 중복 체크

#### 칵테일 관련
- `GET /api/cocktails` - 칵테일 전체 조회
- `GET /api/cocktails/{cocktailNo}` - 칵테일 상세 조회
- `POST /api/cocktails` - 칵테일 생성 (JSON)
- `POST /api/cocktails/with-file` - 칵테일 생성 (파일 업로드 포함)
- `PUT /api/cocktails/{cocktailNo}` - 칵테일 수정
- `DELETE /api/cocktails/{cocktailNo}` - 칵테일 삭제
- `GET /api/cocktails/members/{memberNo}` - 회원별 칵테일 조회

#### 좋아요 관련
- `POST /api/cocktails/{cocktailNo}/likes` - 좋아요 토글
- `GET /api/cocktails/{cocktailNo}/likes` - 좋아요 개수 조회
- `GET /api/cocktails/{cocktailNo}/likes/check` - 좋아요 여부 확인

자세한 API 명세는 [`cocktailLab/README.md`](./cocktailLab/README.md)를 참고하세요.

## 📝 초기 데이터

서버 시작 시 `react-cocktailLab-project/src/resources/defaultcocktails.md` 파일을 읽어 자동으로 일반 칵테일 데이터를 삽입합니다.

### 마크다운 파일 형식
```markdown
칵테일 이름 (영문명)
https://이미지-URL.jpg

설명 (선택사항)

재료: 재료1, 재료2, 재료3

제조법: 제조 방법 설명
```

현재 제공되는 일반 칵테일:
- 마티니, 마가리타, 모히토, 올드 패션드, 코스모폴리탄
- 다이키리, 맨해튼, 네그로니, 피나 콜라다, 블러디 메리
- 롱 아일랜드 아이스 티, 진 토닉, 위스키 사워, 미모사
- 모스크바 뮬, 에스프레소 마티니, 데킬라 선라이즈
- 화이트 러시안, 블루 하와이
- 도화, 동해, 김렛, 애플 마티니, 상그리아, 갓파더

## 💡 학습 포인트 (Learning Points)

- **Spring Boot RESTful API 설계 방법 학습**
  - Controller, Service, Repository 계층 구조 이해
  - Spring Data JPA를 통한 데이터베이스 연동 및 CRUD 구현
  - DTO 패턴을 활용한 데이터 전송 객체 설계

- **React SPA 구조 설계 방법 학습**
  - 컴포넌트 기반 개발 및 재사용성 향상
  - Zustand를 활용한 전역 상태 관리
  - React Router를 통한 클라이언트 사이드 라우팅

- **Monorepo 구조 이해**
  - Backend와 Frontend를 하나의 저장소에서 관리하는 방법
  - 각 프로젝트의 독립적인 빌드 및 실행 환경 구성

- **데이터 초기화 자동화**
  - 서버 시작 시 마크다운 파일 파싱을 통한 초기 데이터 삽입
  - 파일 I/O 및 문자열 파싱 로직 구현

- **이미지 클라우드 호스팅 연동**
  - 외부 이미지 URL을 데이터베이스에 저장하고 프론트엔드에서 활용

- **CORS 설정 및 프론트엔드-백엔드 통신**
  - 다른 포트에서 실행되는 서버 간 통신 설정

## ⚠️ 주의사항

1. **비밀번호 암호화**: 현재 비밀번호는 평문으로 저장됩니다. 프로덕션 환경에서는 BCrypt 등의 해시 알고리즘을 사용해야 합니다.

2. **인증 방식**: 현재는 요청 본문이나 쿼리 파라미터로 회원 번호를 전달하는 간단한 방식을 사용합니다. 실제 프로덕션 환경에서는 JWT 토큰 등의 보안 인증 방식을 사용하는 것을 권장합니다.

3. **데이터베이스**: H2 인메모리 데이터베이스를 사용하므로, 서버 재시작 시 데이터가 초기화됩니다.

4. **CORS 설정**: 프론트엔드와 백엔드가 다른 포트에서 실행되므로 CORS 설정이 필요합니다.

5. **파일 업로드 경로**: 현재 절대 경로를 사용하고 있습니다. 환경에 따라 경로를 수정해야 합니다.

## 📚 상세 문서

- **Backend 상세 문서**: [`cocktailLab/README.md`](./cocktailLab/README.md)
- **Frontend 상세 문서**: [`react-cocktailLab-project/README.md`](./react-cocktailLab-project/README.md)

## 🤝 기여하기

이슈나 개선 사항이 있으면 GitHub Issues를 통해 알려주세요.

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

**Made with ❤️ by jinwoojaemeon**


