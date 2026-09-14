# ⑥ Build 전용 검증 문서

 ## 1. 목적

 Frontend와 Backend의 **Production 빌드 생성 → 결과물 확인 → 빌드 결과물 실행**을 검증한다.

```
Frontend                         Backend
   │                                │
npm install                     mvnw clean package
   ↓                                ↓
npm run build                   target/*.jar
   ↓                                ↓
dist/                           java -jar
   ↓                                ↓
정적 파일 실행                  Spring Boot 실행
   │                                │
   └────────── Build 검증 ───────────┘
```

 ## 2\. 검증 기준

 | 상태 | 의미 |
| --- | --- |
| 🟢 | 검증 완료 |
| 🟡 | 일부 확인 / 추가 검증 필요 |
| 🔴 | 빌드 실패 |
| ⬜ | 미검증 |
| ⚪ | 해당 없음 |

---

 ## 3. Frontend Build 검증

 ### Build 실행

```
npm install
npm run build
```

 ### 결과물 확인

```
dist/
 ├── index.html
 └── assets/
      ├── *.js
      ├── *.css
      └── 기타 Asset
```

 | 검증 항목 | 결과 |
| --- | --- |
| 의존성 설치 | ⬜ |
| Production Build 실행 | ⬜ |
| Build Error 없음 | ⬜ |
| `dist/` 생성 | ⬜ |
| `index.html` 생성 | ⬜ |
| JS/CSS Asset 생성 | ⬜ |
| Asset 정상 로딩 | ⬜ |
| Production API 설정 | ⬜ |
| SPA Routing | ⬜ |
| `dist/` 실제 브라우저 실행 | ⬜ |

### 핵심 흐름

```
React Source
    ↓
npm run build
    ↓
dist/
    ↓
Static Server / Nginx
    ↓
Browser
    ↓
화면 정상 동작
```

---

 ## 4\. Backend Build 검증

 ### Build 실행

```
./mvnw clean package
```

 테스트를 포함한 일반적인 Maven Build 흐름은 다음과 같다.

```
Clean
 ↓
Compile
 ↓
Test
 ↓
Package
 ↓
JAR 생성
```

 ### 결과물 확인

```
target/
 └── *.jar
```

 | 검증 항목 | 결과 |
| --- | --- |
| Clean | ⬜ |
| Compile | ⬜ |
| Test | ⬜ |
| Package | ⬜ |
| Build Error 없음 | ⬜ |
| `target/*.jar` 생성 | ⬜ |
| 생성된 JAR 실행 | ⬜ |
| Application 기동 | ⬜ |
| API 정상 응답 | ⬜ |
| DB 연결 | ⬜ |

### JAR 실행

```
java -jar target/*.jar
```

 핵심은 **IDE에서 실행한 Spring Boot가 아니라 실제 Build 결과물인 JAR를 실행하는 것**이다.

```
Spring Boot Source
       ↓
./mvnw clean package
       ↓
target/*.jar
       ↓
java -jar
       ↓
Spring Boot
       ↓
API / DB
```

---

 ## 5\. Build 결과물 검증

 단순히 Build 명령이 성공한 것만으로 완료하지 않는다.

 | 구분 | 결과물 | 최종 확인 |
| --- | --- | --- |
| Frontend | `dist/` | 실제 브라우저 실행 |
| Backend | `*.jar` | 실제 JAR 실행 |
| Frontend | Asset | 정상 로딩 |
| Backend | API | HTTP 정상 응답 |
| Backend | DB | MariaDB 정상 연결 |

---

 ## 6\. 최종 Build 판정

```
Frontend
 ├─ npm install          🟢
 ├─ npm run build        🟢
 ├─ dist/                🟢
 ├─ Asset                🟢
 └─ Browser 실행         🟢

Backend
 ├─ mvnw clean package   🟢
 ├─ Test                 🟢
 ├─ target/*.jar         🟢
 ├─ java -jar            🟢
 ├─ API                  🟢
 └─ DB 연결              🟢
```

 ### 핵심 판정 기준

 > **Source Code의 빌드 성공뿐 아니라 실제 생성된 `dist/`와 `JAR` 결과물을 직접 실행하여 Production 실행 가능 여부까지 확인해야 Build 검증을 완료한 것으로 판정한다.**

 이렇게 하면 \*\*① 공통 검증의 "빌드 여부"\*\*와 \*\*⑥ Build 전용 문서의 "실제 빌드 결과물 검증"\*\*이 명확하게 구분됩니다.