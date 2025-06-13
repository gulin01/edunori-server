# EduNori 서버 (edunori-server)

## 1. 프로젝트 개요

EduNori 서버는 교육 플랫폼의 백엔드 API 서버로, 강의, 영화, 도서, 장바구니, 주문, 관심사 등 다양한 기능을 제공합니다. NestJS와 TypeORM 기반으로 구축되었으며, MySQL 데이터베이스와 소셜 로그인, 결제 연동을 지원합니다.

## 2. 기술 스택

- Node.js (v18.x 이상)
- NestJS (v11.x)
- TypeScript
- MySQL (v8.x)
- TypeORM
- Passport (JWT, Local, Kakao, Google, Naver)
- Toss 결제 모듈
- Swagger (API 문서화)
- ESLint, Prettier
- Docker, Docker Compose

## 3. 주요 기능

- 사용자 인증/인가 (JWT, 소셜 로그인: Kakao, Google, Naver)
- 관리자 인증/인가
- 상품, 강의, 영화, 도서 CRUD
- 장바구니, 주문, 관심사 관리
- Toss 연동 결제
- Swagger 기반 API 문서 제공 (`/api-docs`)
- KeyEdu 및 Edunori MySQL DB 연동
- 마이그레이션 지원 (TypeORM)

## 4. 코드베이스 구조

```
📦 edunori-server
├── infra
│   ├── setup.sh          # EC2 초기 설정 스크립트
│   └── start.sh          # EC2 배포 및 Docker 실행 스크립트
├── edunori_dev_dump.sql  # 로컬 DB 초기 덤프 (SQL)
├── src
│   ├── main.ts           # 애플리케이션 진입점 및 Swagger 설정
│   ├── app.module.ts     # 전역 모듈 및 DB 연결 설정
│   ├── auth              # 인증 모듈 (JWT, Passport 전략)
│   ├── toss              # Toss 결제 모듈
│   ├── keyedu            # 외부 KeyEdu DB 연동 모듈
│   ├── user              # 사용자 관련 엔티티/서비스/컨트롤러
│   ├── interest          # 관심사 관련 엔티티/서비스/컨트롤러
│   ├── admin             # 관리자 관련 엔티티/서비스/컨트롤러
│   ├── basket            # 장바구니 관련 엔티티/서비스/컨트롤러
│   ├── movie             # 영화 관련 엔티티/서비스/컨트롤러
│   ├── lecture           # 강의 관련 엔티티/서비스/컨트롤러
│   ├── goods             # 상품 관련 엔티티/서비스/컨트롤러
│   ├── product           # 제품 관련 엔티티/서비스/컨트롤러
│   ├── category          # 카테고리 관련 엔티티/서비스/컨트롤러
│   ├── book              # 도서 관련 엔티티/서비스/컨트롤러
│   └── common            # 공통 미들웨어/필터/인터셉터 등
├── docker-compose.yml    # 로컬 Docker 환경 구성
├── Dockerfile            # 애플리케이션 Docker 이미지 빌드
├── .env.local            # 로컬 환경 변수 예시 파일
├── package.json          # npm 스크립트 및 의존성
├── tsconfig.json         # TypeScript 컴파일러 설정
├── eslint.config.mjs     # ESLint 설정
└── README.md             # 프로젝트 설명서 (본 문서)
```

## 5. 환경 변수 설정

- 프로젝트 루트에 `.env.local` 파일 생성 후 아래 예시 참고하여 설정합니다.

```dotenv
# KeyEdu DB (원격)
KEYEDU_DB_HOST=xx.x.xx.xxx
KEYEDU_DB_PORT=3306
KEYEDU_DB_USERNAME=xxxxxxxxx
KEYEDU_DB_PASSWORD=xxxxxxx
KEYEDU_DB_DATABASE=xxxxxx

# Edunori DB (로컬, Docker Compose 자동 초기화)
EDUNORI_DB_HOST=xxxxxx
EDUNORI_DB_PORT=3306
EDUNORI_DB_USERNAME=xxxx
EDUNORI_DB_PASSWORD=xxxxx
EDUNORI_DB_DATABASE=xxxxxx

# Social Login
KAKAO_CLIENT_ID=...
KAKAO_CLIENT_SECRET=...
KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback

GOOGLE_CLIENT_ID=...

# JWT 설정
JWT_SECRET=...
JWT_EXPIRES_IN=1d

# Toss 결제
TOSS_SECRET_KEY=...
```

## 6. 로컬 실행 (Docker Compose)

```bash
# Docker 컨테이너 빌드 및 실행
docker-compose up --build -d

# 실행 로그 확인
docker-compose logs -f edunori-app

# 애플리케이션 접속 (Swagger API 문서)
http://localhost:3000/api-docs
```

## 7. 개발 모드 실행 (Nest CLI)

```bash
# 의존성 설치
npm install

# 개발 모드 (핫 리로드)
npm run start:dev
```

## 8. 테스트

```bash
# 단위 테스트
npm run test

# e2e 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

## 9. 마이그레이션 (TypeORM)

```bash
# 마이그레이션 생성
npm run migration:generate -- -n <MigrationName>

# 마이그레이션 실행
npm run migration:run

# 마이그레이션 롤백
npm run migration:revert
```

## 10. 배포 (EC2)

```bash
# EC2 초기 설정 (Ubuntu on AWS EC2)
bash infra/setup.sh

# 코드 업데이트 및 컨테이너 재시작
bash infra/start.sh
```

## 11. 기타

- 코드 스타일: ESLint, Prettier 설정 포함
- Swagger 모듈: `src/main.ts`에서 `/api-docs` 엔드포인트 제공

---

_본 문서는 edunori-server 프로젝트의 인수인계(인수인계서) 용도로 작성되었습니다._
