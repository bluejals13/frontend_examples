# ④ Frontend ↔ Backend 통합 검증 문서

 ## 1\. 목적

 React + Vite 프론트엔드와 Spring Boot \+ JPA + MariaDB 백엔드 간 **실제 사용자 요청의 전체 왕복 흐름**을 검증한다.

```
React
 ↓
Hook / API Module
 ↓
HTTP / CORS
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
JPA / Hibernate
 ↓
MariaDB
 ↓
JSON Response
 ↓
HTTP
 ↓
React State
 ↓
UI
```

 > Frontend와 Backend가 각각 정상이어도 **실제 연결 경로 전체가 정상이라는 보장은 없으므로 통합 검증이 필요하다.**

---

 ## 2\. 검증 기준

 | 상태 | 의미 |
| --- | --- |
| 🟢 | 검증 완료 |
| 🟡 | 일부 확인 / 추가 검증 필요 |
| 🔴 | 실패 |
| ⬜ | 미검증 |
| ⚪ | 해당 없음 |

---

 ## 3\. 통합 연결 검증

 | 단계 | 검증 항목 | 결과 |
| --- | --- | --- |
| 1 | React 화면 실행 | 🟢 |
| 2 | 사용자 입력 처리 | 🟢 |
| 3 | Hook 실행 | 🟢 |
| 4 | API Module 호출 | 🟢 |
| 5 | HTTP Request | 🟢 |
| 6 | CORS / Preflight | 🟢 |
| 7 | Controller 수신 | 🟢 |
| 8 | Service 처리 | 🟢 |
| 9 | Repository 호출 | 🟢 |
| 10 | JPA / Hibernate 처리 | 🟢 |
| 11 | MariaDB 처리 | 🟢 |
| 12 | JSON Response 생성 | 🟢 |
| 13 | HTTP Response | 🟢 |
| 14 | React State 업데이트 | 🟢 |
| 15 | UI 데이터 반영 | 🟢 |

### 핵심 판정

```
Browser
   ↓
Frontend
   ↓
HTTP
   ↓
Backend
   ↓
Database
   ↓
Backend
   ↓
HTTP
   ↓
Frontend
   ↓
UI
```

 **처음부터 끝까지 정상 완료되어야 해당 기능의 통합 검증을 🟢로 판정한다.**

---

 # 4\. CRUD 통합 검증

 | 기능 | Frontend | HTTP/CORS | Backend | DB | State/UI | 종합 |
| --- | --- | --- | --- | --- | --- | --- |
| 전체 조회 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |
| 단건 조회 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |
| 등록 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |
| 수정 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |
| 삭제 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |
| 삭제 후 조회 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |

---

 # 5. 학생 등록 E2E 검증

 학생 등록 하나를 다음 전체 단계로 검증한다.

```
사용자 입력
 ↓
React Form
 ↓
입력값 Validation
 ↓
Hook
 ↓
studentApi.js
 ↓
POST /api/students
 ↓
CORS / HTTP
 ↓
StudentController
 ↓
@Valid
 ↓
StudentService
 ↓
StudentRepository
 ↓
JPA
 ↓
MariaDB INSERT
 ↓
JSON Response
 ↓
React
 ↓
State Update
 ↓
학생 목록 갱신
 ↓
화면 표시
```

 | 단계 | 검증 | 결과 |
| --- | --- | --- |
| Form | 입력값 정상 생성 | 🟢 |
| Validation | 입력값 검증 | 🟡 |
| Hook | 등록 함수 실행 | 🟢 |
| API | POST 요청 | 🟢 |
| CORS | Preflight / Header | 🟢 |
| Controller | Request 수신 | 🟢 |
| Service | Business Logic | 🟢 |
| Repository | DB 저장 요청 | 🟢 |
| DB | INSERT 성공 | 🟢 |
| Response | JSON 반환 | 🟢 |
| State | 목록 상태 갱신 | 🟢 |
| UI | 신규 학생 표시 | 🟢 |

---

 # 6. 수정 / 삭제 E2E 검증

 ### 수정

```
학생 선택
 ↓
Edit Form
 ↓
React State
 ↓
PUT
 ↓
CORS / HTTP
 ↓
Controller
 ↓
Service
 ↓
JPA Dirty Checking
 ↓
MariaDB UPDATE
 ↓
Response
 ↓
State Update
 ↓
UI 반영
```

 ### 삭제

```
삭제 클릭
 ↓
DELETE
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
MariaDB DELETE
 ↓
200 Response
 ↓
State Update
 ↓
목록에서 제거
 ↓
재조회
 ↓
404 확인
```

---

 # 7\. 오류 통합 검증

 정상 CRUD뿐 아니라 **Frontend가 Backend 오류를 정상적으로 처리하는지도 확인**한다.

 | 시나리오 | Backend | Frontend | 결과 |
| --- | --- | --- | --- |
| 잘못된 입력 | 400 | Validation/Error 표시 | 🟡 |
| 중복 학번 | Business Error | 오류 표시 | 🟡 |
| 존재하지 않는 학생 | 404 | Not Found 처리 | 🟢 |
| 서버 오류 | 500 | 오류 표시 | ⬜ |
| Backend 연결 실패 | Network Error | 연결 오류 표시 | ⬜ |

---

 # 8\. Browser Network 검증

 개발자 도구에서 실제 요청을 확인한다.

```
Network
 ├─ Request URL
 ├─ Request Method
 ├─ Request Payload
 ├─ Status Code
 ├─ Response
 ├─ CORS Header
 └─ Timing
```

 예:

```
OPTIONS /api/students → 200
POST    /api/students → 200
GET     /api/students → 200
DELETE  /api/students/1 → 200
GET     /api/students/1 → 404
```

 **Preflight 성공 + 실제 Request 성공 + Response 정상 처리 + UI 반영**까지 확인한다.

---

 # 9\. 최종 통합 판정

```
React / UI             🟢
Hook                   🟢
API Module             🟢
HTTP                   🟢
CORS                   🟢
Controller             🟢
Service                🟢
Repository             🟢
JPA                    🟢
MariaDB                🟢
Validation            🟡
JSON Response          🟢
React State            🟢
UI Rendering           🟢
CRUD E2E               🟢
Error E2E              🟢
Browser Network        🟢
```

 ### 핵심 판정 기준

 > **사용자의 브라우저 동작부터 React → HTTP/CORS → Spring Boot → JPA → MariaDB → 응답 → React State → UI까지 하나의 실제 요청 흐름이 완전히 성공해야 해당 기능의 통합 검증을 완료한 것으로 판정한다.**

 그리고 전체 프로젝트의 최종 상태는 **① 공통 + ② Frontend + ③ Backend \+ ④ 통합**이 모두 확인된 이후에야 종합적으로 🟢 판정하는 구조가 가장 명확합니다.