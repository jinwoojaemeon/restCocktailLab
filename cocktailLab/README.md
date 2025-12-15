# CocktailLab API 서버

## 1. 프로젝트 개요

CocktailLab은 칵테일 레시피를 공유하고 좋아요 기능을 제공하는 RESTful API 서버입니다. 사용자는 회원가입 후 자신만의 칵테일 레시피를 등록하고, 다른 사용자들의 레시피에 좋아요를 누를 수 있습니다.

## 2. 사용 기술 스택

### Backend
- **Java 17**
- **Spring Boot 3.4.12**
- **Spring Data JPA** - 데이터베이스 ORM
- **Hibernate** - JPA 구현체
- **H2 Database** - 인메모리 데이터베이스
- **Lombok** - 보일러플레이트 코드 제거
- **Jakarta Validation** - 요청 데이터 검증
- **MyBatis** (설정만 포함, 현재 미사용)

### Build Tool
- **Gradle**

## 3. 주요 도메인 설명

### 3.1 엔티티 구조

#### Member (회원)
- 회원 번호, 아이디, 비밀번호, 닉네임, 이메일
- 생성일시, 수정일시 (BaseTimeEntity 상속)

#### Cocktail (칵테일)
- 칵테일 번호, 이름, 설명, 재료 목록, 제조법, 이미지 경로
- 작성자(Member)와 다대일 관계
- 생성일시, 수정일시 (BaseTimeEntity 상속)

#### Like (좋아요)
- 좋아요 번호
- 칵테일과 회원의 다대일 관계
- 회원-칵테일 조합에 대한 유니크 제약조건 (중복 좋아요 방지)
- 생성일시, 수정일시 (BaseTimeEntity 상속)

### 3.2 주요 기능
- 회원가입 및 로그인
- 칵테일 레시피 CRUD
- 좋아요 기능 (토글 방식)
- 회원별 칵테일 조회
- 파일 업로드 (이미지)

## 4. API 명세

### 공통 사항

#### Base URL
```
http://localhost:8888/api
```

#### 공통 헤더
- `X-Member-No`: 회원 번호 (인증이 필요한 API에서 사용)
- `Content-Type`: `application/json` (JSON 요청 시)

#### 공통 응답 형식
```json
{
  "success": true,
  "message": "성공 메시지",
  "data": { ... }
}
```

#### 에러 응답 형식
```json
{
  "success": false,
  "message": "에러 메시지",
  "data": null
}
```

---

### 4.1 회원 관련 API

#### 4.1.1 회원가입
- **Method**: `POST`
- **URL**: `/api/members`
- **Request Body**:
```json
{
  "memberId": "user123",
  "userPwd": "password123",
  "nickname": "칵테일러버",
  "email": "user@example.com"
}
```
- **Response** (201 Created):
```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "email": "user@example.com",
    "createdAt": "2025-12-15T10:00:00",
    "updatedAt": "2025-12-15T10:00:00"
  }
}
```
- **상태 코드**:
  - `201 Created`: 회원가입 성공
  - `400 Bad Request`: 유효성 검증 실패
  - `409 Conflict`: 아이디 또는 이메일 중복

#### 4.1.2 로그인
- **Method**: `POST`
- **URL**: `/api/members/login`
- **Request Body**:
```json
{
  "memberId": "user123",
  "userPwd": "password123"
}
```
- **Response** (200 OK):
```json
{
  "success": true,
  "message": "로그인 성공",
  "data": {
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "email": "user@example.com",
    "createdAt": "2025-12-15T10:00:00",
    "updatedAt": "2025-12-15T10:00:00"
  }
}
```
- **상태 코드**:
  - `200 OK`: 로그인 성공
  - `400 Bad Request`: 아이디 또는 비밀번호 오류

#### 4.1.3 아이디 중복 체크
- **Method**: `GET`
- **URL**: `/api/members/check-memberId?memberId=user123`
- **Response** (200 OK):
```json
{
  "success": true,
  "message": "사용 가능한 아이디입니다.",
  "data": {
    "available": true
  }
}
```
- **상태 코드**:
  - `200 OK`: 조회 성공

#### 4.1.4 회원 정보 조회
- **Method**: `GET`
- **URL**: `/api/members/{memberNo}`
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "email": "user@example.com",
    "createdAt": "2025-12-15T10:00:00",
    "updatedAt": "2025-12-15T10:00:00"
  }
}
```
- **상태 코드**:
  - `200 OK`: 조회 성공
  - `404 Not Found`: 회원을 찾을 수 없음

---

### 4.2 칵테일 관련 API

#### 4.2.1 칵테일 생성 (JSON)
- **Method**: `POST`
- **URL**: `/api/cocktails`
- **Headers**: `X-Member-No: 1`
- **Request Body**:
```json
{
  "cocktailName": "마티니",
  "description": "클래식한 칵테일",
  "ingredients": ["진", "드라이 베르무트", "올리브"],
  "instructions": "진과 베르무트를 5:1 비율로 섞고, 올리브를 장식합니다.",
  "cocktailImagePath": "/uploads/martini.jpg"
}
```
- **Response** (201 Created):
```json
{
  "success": true,
  "message": "칵테일이 생성되었습니다.",
  "data": {
    "cocktailNo": 1,
    "cocktailName": "마티니",
    "description": "클래식한 칵테일",
    "ingredients": ["진", "드라이 베르무트", "올리브"],
    "instructions": "진과 베르무트를 5:1 비율로 섞고, 올리브를 장식합니다.",
    "cocktailImagePath": "/uploads/martini.jpg",
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "likeCount": 0,
    "isLiked": false,
    "createdAt": "2025-12-15T10:00:00",
    "updatedAt": "2025-12-15T10:00:00"
  }
}
```
- **상태 코드**:
  - `201 Created`: 생성 성공
  - `400 Bad Request`: 유효성 검증 실패
  - `401 Unauthorized`: 로그인 필요

#### 4.2.2 칵테일 생성 (파일 업로드 포함)
- **Method**: `POST`
- **URL**: `/api/cocktails/with-file`
- **Headers**: `X-Member-No: 1`
- **Content-Type**: `multipart/form-data`
- **Request Body** (Form Data):
  - `cocktailName`: "마티니"
  - `description`: "클래식한 칵테일"
  - `ingredients[0]`: "진"
  - `ingredients[1]`: "드라이 베르무트"
  - `instructions`: "진과 베르무트를 5:1 비율로 섞습니다."
  - `upfile`: (파일)
- **Response**: 4.2.1과 동일
- **상태 코드**: 4.2.1과 동일

#### 4.2.3 칵테일 전체 조회
- **Method**: `GET`
- **URL**: `/api/cocktails`
- **Headers**: `X-Member-No: 1` (선택사항, 좋아요 상태 확인용)
- **Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "cocktailNo": 1,
      "cocktailName": "마티니",
      "description": "클래식한 칵테일",
      "ingredients": ["진", "드라이 베르무트"],
      "instructions": "만드는 방법",
      "cocktailImagePath": "/uploads/martini.jpg",
      "memberNo": 1,
      "memberId": "user123",
      "nickname": "칵테일러버",
      "likeCount": 5,
      "isLiked": true,
      "createdAt": "2025-12-15T10:00:00",
      "updatedAt": "2025-12-15T10:00:00"
    }
  ]
}
```
- **상태 코드**:
  - `200 OK`: 조회 성공

#### 4.2.4 칵테일 상세 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/{cocktailNo}`
- **Headers**: `X-Member-No: 1` (선택사항, 좋아요 상태 확인용)
- **Response** (200 OK): 4.2.3의 단일 객체와 동일
- **상태 코드**:
  - `200 OK`: 조회 성공
  - `404 Not Found`: 칵테일을 찾을 수 없음

#### 4.2.5 회원별 칵테일 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/members/{memberNo}`
- **Response** (200 OK): 4.2.3과 동일 (배열)
- **상태 코드**:
  - `200 OK`: 조회 성공

#### 4.2.6 칵테일 수정 (JSON)
- **Method**: `PUT`
- **URL**: `/api/cocktails/{cocktailNo}`
- **Headers**: `X-Member-No: 1`
- **Request Body**: 4.2.1과 동일
- **Response** (200 OK):
```json
{
  "success": true,
  "message": "칵테일이 수정되었습니다.",
  "data": {
    "cocktailNo": 1,
    "cocktailName": "수정된 마티니",
    ...
  }
}
```
- **상태 코드**:
  - `200 OK`: 수정 성공
  - `400 Bad Request`: 유효성 검증 실패
  - `401 Unauthorized`: 로그인 필요
  - `403 Forbidden`: 본인이 작성한 칵테일만 수정 가능
  - `404 Not Found`: 칵테일을 찾을 수 없음

#### 4.2.7 칵테일 수정 (파일 업로드 포함)
- **Method**: `PUT`
- **URL**: `/api/cocktails/{cocktailNo}/with-file`
- **Headers**: `X-Member-No: 1`
- **Content-Type**: `multipart/form-data`
- **Request Body**: 4.2.2와 동일
- **Response**: 4.2.6과 동일
- **상태 코드**: 4.2.6과 동일

#### 4.2.8 칵테일 삭제
- **Method**: `DELETE`
- **URL**: `/api/cocktails/{cocktailNo}`
- **Headers**: `X-Member-No: 1`
- **Response** (200 OK):
```json
{
  "success": true,
  "message": "칵테일이 삭제되었습니다.",
  "data": null
}
```
- **상태 코드**:
  - `200 OK`: 삭제 성공
  - `401 Unauthorized`: 로그인 필요
  - `403 Forbidden`: 본인이 작성한 칵테일만 삭제 가능
  - `404 Not Found`: 칵테일을 찾을 수 없음

---

### 4.3 좋아요 관련 API

#### 4.3.1 좋아요 토글
- **Method**: `POST`
- **URL**: `/api/cocktails/{cocktailNo}/likes`
- **Headers**: `X-Member-No: 1`
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "message": "좋아요가 추가되었습니다.",
    "likeCount": 5,
    "isLiked": true
  }
}
```
- **상태 코드**:
  - `200 OK`: 토글 성공
  - `401 Unauthorized`: 로그인 필요
  - `404 Not Found`: 칵테일을 찾을 수 없음

#### 4.3.2 좋아요 개수 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/{cocktailNo}/likes`
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "likeCount": 5
  }
}
```
- **상태 코드**:
  - `200 OK`: 조회 성공
  - `404 Not Found`: 칵테일을 찾을 수 없음

#### 4.3.3 좋아요 여부 확인
- **Method**: `GET`
- **URL**: `/api/cocktails/{cocktailNo}/likes/check`
- **Headers**: `X-Member-No: 1` (선택사항)
- **Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "isLiked": true
  }
}
```
- **상태 코드**:
  - `200 OK`: 조회 성공
  - `404 Not Found`: 칵테일을 찾을 수 없음

---

## 5. 실행 방법

### 5.1 사전 요구사항
- Java 17 이상
- Gradle 7.x 이상 (또는 Gradle Wrapper 사용)

### 5.2 데이터베이스 설정
1. H2 Database 서버 실행 (별도 설치 필요)
2. `application.yaml`에서 데이터베이스 경로 확인:
```yaml
spring:
  datasource:
    hikari:
      jdbc-url: jdbc:h2:tcp://localhost/C:\khWorkspace\07_RestServer\db\tdb
```

### 5.3 프로젝트 실행

#### Gradle Wrapper 사용 (권장)
```bash
# Windows
gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

#### IDE에서 실행
1. `CocktailLabApplication.java` 파일 열기
2. `main` 메서드 실행

### 5.4 서버 접속
- **서버 주소**: `http://localhost:8888`
- **H2 Console**: `http://localhost:8888/h2-console`
  - JDBC URL: `jdbc:h2:tcp://localhost/C:\khWorkspace\07_RestServer\db\tdb`
  - Username: `sa`
  - Password: `1234`

### 5.5 파일 업로드 디렉토리
- 업로드된 이미지는 `src/main/resources/uploads` 디렉토리에 저장됩니다.
- 디렉토리가 없으면 자동으로 생성됩니다.

### 5.6 빌드 및 패키징
```bash
# 빌드
gradlew.bat build

# JAR 파일 생성 후 실행
java -jar build/libs/cocktailLab-0.0.1-SNAPSHOT.jar
```

---

## 6. 주요 설정

### 6.1 application.yaml 주요 설정
- **서버 포트**: 8888
- **파일 업로드 최대 크기**: 20MB
- **JPA DDL 모드**: create (애플리케이션 시작 시 테이블 재생성)
- **SQL 로그 출력**: 활성화

### 6.2 인증 방식
- 현재는 헤더 기반 간단한 인증 방식을 사용합니다.
- `X-Member-No` 헤더로 회원 번호를 전달합니다.
- 실제 프로덕션 환경에서는 JWT 토큰 등의 보안 인증 방식을 사용하는 것을 권장합니다.

---

## 7. 주의사항

1. **비밀번호 암호화**: 현재 비밀번호는 평문으로 저장됩니다. 프로덕션 환경에서는 BCrypt 등의 해시 알고리즘을 사용해야 합니다.

2. **파일 업로드 경로**: 현재 절대 경로를 사용하고 있습니다. 환경에 따라 경로를 수정해야 합니다.

3. **데이터베이스**: H2 인메모리 데이터베이스를 사용하므로, 서버 재시작 시 데이터가 초기화됩니다.

4. **CORS 설정**: React 등 프론트엔드와 연동 시 CORS 설정이 필요할 수 있습니다.

