# ③ Backend 전용 검증 문서

 ## 1. 목적

 Spring Boot + JPA \+ MariaDB 백엔드의 **HTTP → Controller → Service → Repository → JPA → Database** 전체 처리 과정을 검증한다.

```
HTTP
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
```

 ## 2\. 검증 기준

 | 상태 | 의미 |
| --- | --- |
| 🟢 | 검증 완료 |
| 🟡 | 일부 확인 / 추가 검증 필요 |
| 🔴 | 실패 |
| ⬜ | 미검증 |
| ⚪ | 해당 없음 |

## 3\. Backend 검증 체크리스트

 | 영역 | 검증 항목 | 결과 |
| --- | --- | --- |
| Spring Boot | Application 기동 | 🟢 |
| HTTP | Endpoint / Status Code | 🟢 |
| Controller | Request / Response 처리 | 🟢 |
| Validation | `@Valid` / 입력값 검증 | 🟡 |
| Service | Business Logic | 🟢 |
| Exception | 예외 처리 / Error Response | 🟢 |
| Transaction | Transaction 정상 처리 | 🟡 |
| Repository | JPA CRUD / Query | 🟢 |
| JPA | Entity Mapping | 🟢 |
| JPA | Dirty Checking | 🟢 |
| JPA | Cascade | 🟢 |
| JPA | JOIN FETCH | 🟡 |
| Database | MariaDB 연결 | 🟢 |
| Database | INSERT / SELECT / UPDATE / DELETE | 🟢 |
| Database | PK / FK / UNIQUE | 🟢 |
| Connection Pool | HikariCP | 🟢 |
| Actuator | Health | 🟢 |
| Actuator | Metrics | 🟢 |
| JVM | Memory / GC / Threads | 🟢 |
| Tomcat | Session / Request | 🟢 |
| JDBC | Connection / Query 관련 Metrics | 🟢 |
| Logging | Application / Error Log | 🟢 |



## 🟡 항목의 의미
* Validation 🟡: @Valid 적용 및 구조는 확인했지만 필수값 누락, 형식 오류, 중복 학번/이메일/전화번호 등의 모든 케이스를 실제 요청으로 검증한 것은 아님.
* Transaction 🟡: Transaction 구조와 정상 CRUD는 확인했지만 실제 예외 발생 → Rollback까지 검증한 것은 아님.
* JOIN FETCH 🟡: Repository에 관련 구조가 확인되지만 실제 SQL 실행 및 결과까지 별도 검증한 증거가 부족함.


## 4\. API 처리 검증

 ### Request → Database

```
HTTP Request
    ↓
Controller
    ↓
@Valid
    ↓
Service
    ↓
Transaction
    ↓
Repository
    ↓
JPA / Hibernate
    ↓
MariaDB
```

 ### Database → Response

```
MariaDB
    ↓
JPA / Hibernate
    ↓
Repository
    ↓
Service
    ↓
Controller
    ↓
JSON Response
    ↓
HTTP Client
```

 ## 5\. CRUD 검증

 | 기능 | HTTP | Controller | Service | Repository | DB |
| --- | --- | --- | --- | --- | --- |
| 전체 조회 | GET | 🟢 | 🟢 | 🟢 | 🟢 |
| 단건 조회 | GET | 🟢 | 🟢 | 🟢 | 🟢 |
| 등록 | POST | 🟢 | 🟢 | 🟢 | 🟢 |
| 수정 | PUT | 🟢 | 🟢 | 🟢 | 🟢 |
| 삭제 | DELETE | 🟢 | 🟢 | 🟢 | 🟢 |

## 6\. JPA / Database 검증

```
Entity
 ↓
Relationship
 ↓
Repository
 ↓
Hibernate
 ↓
SQL
 ↓
MariaDB
```

 확인 항목:

 - Entity ↔ Table 매핑
- PK / FK
- 1:1 또는 관계 매핑
- UNIQUE Constraint
- CRUD SQL 정상 실행
- Transaction Commit / Rollback
- Dirty Checking
- Cascade
- JOIN FETCH
- Connection Pool

 ## 7\. Validation / Exception 검증

```
잘못된 Request
      ↓
@Valid
      ↓
Validation 실패
      ↓
Exception 처리
      ↓
HTTP Error Response
```

 | 상황 | 기대 결과 |
| --- | --- |
| 필수값 누락 | 400 |
| 잘못된 형식 | 400 |
| 중복 학번 | Business Error |
| 중복 이메일 | Business Error |
| 존재하지 않는 학생 | 404 |
| 서버 내부 오류 | 500 |

## 8\. Actuator / Monitoring 검증

 ### Health

```
/actuator/health
        ↓
      UP
```

 확인:

 - DB
- Disk Space
- Liveness
- Readiness
- Ping
- SSL

 ### Metrics

```
/actuator/metrics
```

 주요 확인 대상:

```
http.server.requests
jdbc.connections.*
hikaricp.connections.*
jvm.*
tomcat.*
process.*
system.*
```

 특히 HTTP 요청의:

```
Method
Status
Outcome
Exception
Response Time
```

 등을 확인한다.

 ## 9\. 최종 Backend 판정

```
Spring Boot        🟢
HTTP               🟢
Controller         🟢
Validation         🟡
Service            🟢
Exception          🟢
Transaction        🟡
Repository         🟢
JPA/Hibernate      🟢
Dirty Checking     🟢
Cascade            🟢
JOIN FETCH         🟡
MariaDB            🟢
CRUD               🟢
HikariCP           🟢
Actuator Health    🟢
Actuator Metrics   🟢
JVM / Tomcat       🟢
JDBC               🟢
Logging            🟢

```

 ### 핵심 판정 기준

 > **HTTP 요청이 Controller → Service → Repository → JPA → MariaDB까지 정상 처리되고, 그 결과가 다시 JSON 응답으로 반환되는 전체 Backend 처리 경로를 검증한다.**

 이렇게 하면 **① 공통 검증은 프로젝트 전반의 기본 품질**, **② Frontend는 React/Vite/Browser**, **③ Backend는 Spring Boot/JPA/MariaDB/Actuator**로 역할이 깔끔하게 분리됩니다.