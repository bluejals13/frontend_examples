# ② Frontend 전용 검증 문서

 ## 1\. 목적

 React + Vite 프론트엔드의 **UI → State → Hook → API → Browser → Build** 전체 동작을 검증한다.

```
React
 ↓
Component
 ↓
State
 ↓
Hook
 ↓
API Module
 ↓
HTTP
 ↓
Browser
```

 ## 2\. 검증 기준

 | 상태 | 의미 |
| --- | --- |
| 🟢 | 검증 완료 |
| 🟡 | 일부 확인 / 추가 검증 필요 |
| 🔴 | 실패 |
| ⬜ | 미검증 |
| ⚪ | 해당 없음 |

## 3\. Frontend 검증 체크리스트

 | 영역 | 검증 항목 | 결과 |
| --- | --- | --- |
| Component | 화면 렌더링 | 🟢 |
| Component | 사용자 입력 / 이벤트 | 🟢 |
| State | 상태 변경 | 🟡 |
| Hook | Hook 실행 및 상태 관리 | 🟡 |
| API Module | API 호출 및 응답 처리 | 🟢 |
| Loading | 로딩 상태 표시 | 🟡 |
| Success | 성공 응답 처리 | 🟢 |
| Error | API/Network 오류 처리 | 🟡 |
| Validation | Form 입력값 검증 | 🟡 |
| CRUD UI | 조회/등록/수정/삭제 | 🟢 |
| Rendering | API 응답 → 화면 반영 | 🟢 |
| Console | Runtime 오류 확인 | ⬜ |
| Network | HTTP/Status/CORS 확인 | 🟢 |
| Vite | HMR 정상 동작 | 🟢 |
| Routing | SPA Routing 정상 동작 | ⬜ |
| Static | 정적 파일/Asset 로딩 | 🟢 |
| Build | Production Build 성공 | ⬜ |
| Deploy | `dist/` 정상 서빙 | ⬜ |

## 4\. 핵심 검증 흐름

 ### UI → API

```
사용자 입력
 ↓
Component
 ↓
State
 ↓
Hook
 ↓
studentApi.js
 ↓
fetch()
 ↓
HTTP API
```

 ### API → UI

```
Spring Boot API
 ↓
JSON Response
 ↓
API Module
 ↓
Hook
 ↓
State 업데이트
 ↓
Component 재렌더링
 ↓
화면 반영
```

 ## 5\. CRUD 화면 검증

 | 기능 | UI | API 호출 | 상태 반영 | 화면 반영 |
| --- | --- | --- | --- | --- |
| 조회 | 🟢 | 🟢 | 🟢 | 🟢 |
| 등록 | 🟢 | 🟢 | 🟢 | 🟢 |
| 수정 | 🟢 | 🟢 | 🟢 | 🟢 |
| 삭제 | 🟢 | 🟢 | 🟡 | 🟢 |

즉 단순히 **API가 200을 반환하는 것**이 아니라,

```
사용자 동작
 → API 요청
 → API 응답
 → React State 변경
 → UI 갱신
```

 까지 확인한다.

 ## 6\. Browser 검증

```
Browser
 ├─ Console
 │    └─ Runtime Error
 │
 └─ Network
      ├─ Request
      ├─ Response
      ├─ Status
      ├─ CORS
      └─ Timing
```

 Vite의

```
101 Switching Protocols
Pending
```

 WebSocket 요청은 개발환경의 **HMR 연결**로 구분하며 일반 API 오류와 혼동하지 않는다.

 ## 7\. Production Build 검증

```
React Source
    ↓
npm run build
    ↓
dist/
    ↓
index.html
+ assets/
    ↓
Static Server / Nginx
    ↓
Browser
```

 확인 항목:

 - `npm run build` 성공
- `dist/` 생성
- `index.html` 정상
- JS/CSS/Asset 정상 로딩
- SPA Routing 정상
- Production 환경 API URL 정상
- 브라우저 Console 오류 없음

 ## 8\. 최종 Frontend 판정

```
Component       🟢
State           🟡
Hook            🟡
API Module      🟢
Loading         🟡
Success         🟢
Error           🟡
Validation      🟡
CRUD UI         🟢
Data Rendering  🟢
Console         ⬜
Network         🟢
Vite HMR        🟢
Routing         ⬜
Static Asset    🟢
Build           ⬜
dist/           ⬜
Deploy          ⬜

```

 ### 현재 문서의 핵심 기준

 > **React 화면에서 발생한 사용자 동작이 Hook → API → Backend로 전달되고, 응답이 다시 State → Component → UI까지 정상적으로 반영되는지를 검증한다.**

 이렇게 구성하면 **① 공통 검증은 중복하지 않고**, 이 문서는 순수하게 **React/Vite/Browser에 특화된 검증**만 담당하게 됩니다.