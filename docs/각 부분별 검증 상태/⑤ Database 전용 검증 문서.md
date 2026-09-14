# ⑤ Database 전용 검증 문서

 ## 1\. 목적

 MariaDB의 **연결 → Schema → Table → 관계 → Constraint → CRUD → Transaction → Data Integrity**를 독립적으로 검증한다.

```
Application
    ↓
JPA / Hibernate
    ↓
MariaDB
    ↓
Schema / Table / Constraint
    ↓
Data Integrity
```

 ## 2\. 검증 기준

 | 상태 | 의미 |
| --- | --- |
| 🟢 | 검증 완료 |
| 🟡 | 일부 확인 / 추가 검증 필요 |
| 🔴 | 실패 |
| ⬜ | 미검증 |
| ⚪ | 해당 없음 |

## 3\. Database 구조 검증

 현재 학생 관리 시스템 기준:

```
Database
 ├── students
 │     └── Student
 │
 └── student_details
       └── StudentDetail

Student
   │
   │ 1 : 1
   ▼
StudentDetail
```

 | 영역 | 검증 항목 | 결과 |
| --- | --- | --- |
| Connection | MariaDB 연결 | 🟢 |
| Schema | Database / Schema 확인 | 🟡 |
| Table | `students` | 🟢 |
| Table | `student_details` | 🟡 |
| PK | Primary Key | 🟢 |
| FK | `student_id` 관계 | 🟡 |
| Relationship | Student ↔ StudentDetail | 🟡 |
| UNIQUE | `student_number` | 🟡 |

 ## 4\. CRUD 검증

 | 기능 | 검증 내용 | 결과 |
| --- | --- | --- |
| INSERT | 학생 등록 및 DB 저장 | 🟢 |
| SELECT | 전체/단건 조회 | 🟢 |
| UPDATE | 학생 정보 수정 | 🟢 |
| DELETE | 학생 삭제 | 🟢 |
| 재조회 | 삭제 데이터 존재 여부 | 🟢 |

```
INSERT
  ↓
SELECT
  ↓
UPDATE
  ↓
SELECT
  ↓
DELETE
  ↓
SELECT → Not Found
```

 ## 5\. Data Integrity 검증

 | 검증 항목 | 기대 결과 | 결과 |
| --- | --- | --- |
| 중복 학번 | 저장 거부 | 🟡 |
| 중복 이메일 | 저장 거부/Business Error | 🟡 |
| 중복 전화번호 | 저장 거부/Business Error | 🟡 |
| 잘못된 FK | 저장 거부 | ⬜ |
| 필수값 NULL | 저장 거부 | ⬜ |
| 존재하지 않는 Student | 관계 오류/404 | 🟡 |
| 삭제 시 관계 데이터 | Cascade 정책대로 처리 | 🟡 |

 > **UNIQUE Constraint와 Service의 중복 검사는 서로 다른 검증이다.**\
>  Service 검사는 애플리케이션 수준의 검증이고, DB Constraint는 최종 데이터 무결성을 보장한다.

 ## 6\. Transaction 검증

```
Transaction 시작
      ↓
DB 작업
      ↓
정상 → COMMIT
오류 → ROLLBACK
```

 | 항목 | 결과 |
| --- | --- |
| Transaction 시작 | 🟢 |
| 정상 Commit | 🟡 |
| 예외 발생 | 🟡 |
| Rollback | ⬜ |
| 부분 저장 방지 | ⬜ |

 ## 7\. JPA ↔ Database 검증

 | 항목 | 검증 내용 | 결과 |
| --- | --- | --- |
| Entity Mapping | Entity ↔ Table | 🟢 |
| Repository | Query 정상 실행 | 🟢 |
| Dirty Checking | 수정 내용 자동 반영 | 🟢 |
| Cascade | 연관 Entity 처리 | 🟡 |
| JOIN FETCH | 연관 데이터 조회 | 🟡 |
| Connection Pool | HikariCP 연결 관리 | 🟢 |

 ## 8\. 최종 Database 판정

```
MariaDB Connection    🟢
Schema                🟡
Tables                🟢/🟡
PK / FK               🟢/🟡
1:1 Relationship      🟡
UNIQUE                🟡
INSERT                🟢
SELECT                🟢
UPDATE                🟢
DELETE                🟢
Transaction           🟡
Data Integrity        🟡
JPA Mapping           🟢
Dirty Checking        🟢
Cascade               🟡
JOIN FETCH            🟡
HikariCP              🟢

```

 ### 핵심 판정 기준

 > **MariaDB 연결뿐 아니라 Schema·Table·관계·Constraint·CRUD·Transaction·Data Integrity까지 실제 데이터 기준으로 정상 동작하는지 검증한다.**

 이렇게 하면 **③ Backend 전용 문서에서는 Spring Boot의 처리 계층**, **⑤ Database 전용 문서에서는 실제 데이터 저장소의 구조와 무결성**을 검증하게 되어 중복이 깔끔하게 줄어듭니다.