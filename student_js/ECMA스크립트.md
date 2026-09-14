# JavaScript 핵심 문법 정리

 > 객체 다루기 → `Object.keys / values / entries / fromEntries`\
>  객체 가공하기 → `filter / map`\
>  안전하게 값 가져오기 → `?.`\
>  기본값 설정하기 → `??`\
>  서버에서 데이터 가져오기 → `fetch / async / await`

---

 ## 1\. 객체(Object) 기본

 JavaScript에서 객체는 **키(key)와 값(value)의 묶음**입니다.

```
const student = {
    name: '홍길동',
    age: 20
};
```

 객체의 모습:

```
student
├── name → "홍길동"
└── age  → 20
```

---

 # 2\. `Object.keys()`

 객체의 **키만 배열로 가져옵니다.**

```
const student = {
    name: '홍길동',
    age: 20
};

console.log(Object.keys(student));
```

 결과:

```
["name", "age"]
```

 즉,

```
Object.keys(student)
```

 는

```
객체
  ↓
키만 추출
  ↓
["name", "age"]
```

 입니다.

---

 # 3\. `Object.values()`

 객체의 **값만 배열로 가져옵니다.**

```
console.log(Object.values(student));
```

 결과:

```
["홍길동", 20]
```

 즉:

```
객체
  ↓
값만 추출
  ↓
["홍길동", 20]
```

---

 # 4\. `Object.entries()`

 객체의 **키와 값을 `[키, 값]` 형태로 묶어서 배열로 가져옵니다.**

```
console.log(Object.entries(student));
```

 결과:

```
[
    ["name", "홍길동"],
    ["age", 20]
]
```

 가장 중요한 부분입니다.

 각 요소는:

```
["name", "홍길동"]
```

 처럼 **2개의 값을 가진 배열**입니다.

```
키       값
 ↓       ↓
"name"  "홍길동"
```

---

 # 5\. `Object.fromEntries()`

 `Object.entries()`와 **반대 방향**이라고 생각하면 쉽습니다.

```
const data = [
    ["name", "홍길동"],
    ["age", 20]
];

console.log(Object.fromEntries(data));
```

 결과:

```
{
    name: "홍길동",
    age: 20
}
```

 즉:

```
Object.entries()
객체
 ↓
[키, 값] 배열
```

 반대로:

```
Object.fromEntries()
[키, 값] 배열
 ↓
객체
```

---

 # 6\. `entries → fromEntries`

 이 조합은 객체를 **배열로 바꿔서 가공한 다음 다시 객체로 만들 때** 매우 중요합니다.

```
const student = {
    name: '홍길동',
    age: 20
};

const result = Object.fromEntries(
    Object.entries(student)
);

console.log(result);
```

 결과:

```
{
    name: "홍길동",
    age: 20
}
```

 변환 과정:

```
student 객체
    ↓
Object.entries()
    ↓
[["name", "홍길동"], ["age", 20]]
    ↓
가공
    ↓
Object.fromEntries()
    ↓
다시 객체
```

---

 # 7\. `filter()`로 객체에서 원하는 것만 남기기

 다음과 같은 점수가 있다고 합시다.

```
const scores = {
    korean: 90,
    english: 55,
    math: 78
};
```

 80점 이상만 남기고 싶다면:

```
const passed = Object.fromEntries(
    Object.entries(scores)
        .filter(([subject, score]) => score >= 80)
);

console.log(passed);
```

 결과:

```
{
    korean: 90
}
```

---

 ## 7-1. 어떻게 동작하는가?

 먼저:

```
Object.entries(scores)
```

 결과:

```
[
    ["korean", 90],
    ["english", 55],
    ["math", 78]
]
```

 그리고:

```
.filter(([subject, score]) => score >= 80)
```

 각 항목을 검사합니다.

```
["korean", 90]   → 90 >= 80 → 통과
["english", 55]  → 55 >= 80 → 탈락
["math", 78]     → 78 >= 80 → 탈락
```

 결과:

```
[
    ["korean", 90]
]
```

 마지막으로:

```
Object.fromEntries(...)
```

 를 실행합니다.

```
{
    korean: 90
}
```

---

 # 8\. 구조 분해 할당

 여기에서:

```
.filter(([subject, score]) => score >= 80)
```

 이 부분이 처음에는 낯설 수 있습니다.

 원래 배열이:

```
["korean", 90]
```

 라면:

```
([subject, score])
```

 는 다음과 같습니다.

```
subject = "korean"
score   = 90
```

 즉:

```
const [subject, score] = ["korean", 90];
```

 와 같은 개념입니다.

 따라서:

```
([subject, score]) => score >= 80
```

 는

 > `[키, 값]`을 받아서 `score`가 80 이상인지 검사한다.

 라는 의미입니다.

---

 # 9\. `map()`으로 객체의 모든 값 변경하기

 이번에는 모든 점수에 5점을 더해봅니다.

```
const bonus = Object.fromEntries(
    Object.entries(scores)
        .map(([subject, score]) => [subject, score + 5])
);

console.log(bonus);
```

 결과:

```
{
    korean: 95,
    english: 60,
    math: 83
}
```

---

 ## 9-1. `map()`의 동작

 기존:

```
[
    ["korean", 90],
    ["english", 55],
    ["math", 78]
]
```

 각 항목을 변경합니다.

```
["korean", 90]   → ["korean", 95]
["english", 55]  → ["english", 60]
["math", 78]     → ["math", 83]
```

 결과:

```
[
    ["korean", 95],
    ["english", 60],
    ["math", 83]
]
```

 다시:

```
Object.fromEntries(...)
```

 하면:

```
{
    korean: 95,
    english: 60,
    math: 83
}
```

---

 # 10\. `filter()`와 `map()` 차이

 둘을 확실히 구분해야 합니다.

 ### `filter()`

 **원하는 것만 골라냅니다.**

```
array.filter(...)
```

 예:

```
[90, 55, 78]
```

 에서 80 이상만:

```
[90]
```

---

 ### `map()`

 **각 요소를 변환합니다.**

```
array.map(...)
```

 예:

```
[90, 55, 78]
```

 에 5를 더하면:

```
[95, 60, 83]
```

 정리하면:

```
filter → 선택
map    → 변환
```

---

 # 11\. `Map`을 객체로 변환

 `Object.fromEntries()`는 `Map`에서도 사용할 수 있습니다.

```
const map = new Map([
    ["a", 1],
    ["b", 2]
]);

console.log(Object.fromEntries(map));
```

 결과:

```
{
    a: 1,
    b: 2
}
```

 즉 `Map`도 `[키, 값]` 구조이기 때문에 `Object.fromEntries()`로 객체로 변환할 수 있습니다.

---

 # 12\. 옵셔널 체이닝 `?.`

 객체에 원하는 속성이 없을 수도 있을 때 사용합니다.

```
const user = {
    name: '김코딩',
    age: 0,
    address: null
};
```

 `phone`은 존재하지 않습니다.

```
user.phone
```

 결과:

```
undefined
```

 그런데:

```
user.phone.home
```

 을 실행하면 오류가 발생합니다.

 왜냐하면 실제로는:

```
undefined.home
```

 을 하려고 하기 때문입니다.

 그래서:

```
user.phone?.home
```

 처럼 작성합니다.

 결과:

```
undefined
```

---

 ## 12-1. `?.`의 의미

```
user.phone?.home
```

 를 쉽게 읽으면:

 > `user.phone`이 있으면 `home`을 가져오고, 없으면 `undefined`를 반환해라.

 입니다.

 따라서:

```
console.log(user.phone?.home);
```

 결과:

```
undefined
```

 이고 오류가 발생하지 않습니다.

---

 # 13\. `||` 논리 OR

 다음 코드가 있다고 합시다.

```
const user = {
    age: 0
};
```

```
console.log(user.age || 25);
```

 결과:

```
25
```

 왜 `0`이 사라질까요?

 JavaScript에서 `0`은 **falsy 값**이기 때문입니다.

 대표적인 falsy 값:

```
false
0
''
null
undefined
NaN
```

 따라서:

```
0 || 25
```

 는:

```
25
```

 가 됩니다.

---

 # 14\. `??` 널 병합 연산자

 `??`는 `||`와 비슷해 보이지만 중요한 차이가 있습니다.

```
console.log(user.age ?? 25);
```

 현재:

```
user.age === 0
```

 이므로 결과는:

```
0
```

 입니다.

 `??`는 **`null` 또는 `undefined`일 때만** 오른쪽 값을 사용합니다.

```
0 ?? 25
// 0

false ?? true
// false

'' ?? '기본값'
// ''

null ?? '기본값'
// '기본값'

undefined ?? '기본값'
// '기본값'
```

---

 # 15\. `||`와 `??` 비교

 | 상황 | `||` | `??` |\
 |---|---:|---:|\
 | `0` | 오른쪽 값 | `0` |\
 | `false` | 오른쪽 값 | `false` |\
 | `''` | 오른쪽 값 | `''` |\
 | `null` | 오른쪽 값 | 오른쪽 값 |\
 | `undefined` | 오른쪽 값 | 오른쪽 값 |

 따라서 **0이나 false를 정상적인 값으로 인정해야 한다면 `??`가 적절합니다.**

 예:

```
const age = 0;

console.log(age || 20);
// 20

console.log(age ?? 20);
// 0
```

---

 # 16\. `fetch()` — 서버에서 데이터 가져오기

 JavaScript에서는 `fetch()`를 사용해서 서버에 데이터를 요청할 수 있습니다.

```
fetch('https://jsonplaceholder.typicode.com/posts/1')
```

 이것은:

 > 해당 주소에 데이터를 요청한다.

 는 의미입니다.

 그런데 `fetch()`는 **즉시 데이터 자체를 반환하지 않습니다.**

 비동기 작업이기 때문에 `Promise`를 반환합니다.

---

 # 17\. `.then()` 방식

 기본적인 `fetch()` 사용 방법은 다음과 같습니다.

```
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => {
        console.log('받은 데이터:', data);
    })
    .catch(error => {
        console.error('에러 발생:', error);
    });
```

 흐름은:

```
fetch()
  ↓
Promise
  ↓
response
  ↓
response.json()
  ↓
JSON 데이터
  ↓
data
```

---

 # 18\. `response.json()`도 비동기

 여기서 중요한 부분:

```
response.json()
```

 도 바로 객체를 반환하는 것이 아니라 **Promise를 반환합니다.**

 그래서:

```
.then(response => response.json())
```

 을 하고 다음 `.then()`에서 실제 데이터를 받습니다.

```
.then(data => {
    console.log(data);
})
```

---

 # 19\. `async / await`

 `.then()`이 여러 개 연결되면 코드가 복잡해질 수 있습니다.

 그래서 `async/await`를 사용할 수 있습니다.

```
async function getData() {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts/1'
        );

        const data = await response.json();

        console.log('받은 데이터:', data);

        return data;

    } catch (error) {
        console.error('에러 발생:', error);
    }
}
```

---

 # 20\. `await`의 의미

```
const response = await fetch(url);
```

 는 쉽게 말하면:

 > `fetch()`가 결과를 줄 때까지 기다린 다음 response에 넣어라.

 입니다.

 그리고:

```
const data = await response.json();
```

 는:

 > JSON 변환이 끝날 때까지 기다린 다음 data에 넣어라.

 라는 뜻입니다.

---

 # 21\. `return data`의 중요성

 다음 코드:

```
async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
```

 에서:

```
return data;
```

 가 중요합니다.

 함수 안에서 가져온 데이터를 함수 밖으로 전달하기 때문입니다.

---

 # 22\. `data`의 스코프

 다음 코드를 봅시다.

```
async function getData() {
    const data = await response.json();

    console.log(data); // ✅
}
```

 여기서 `data`는 `getData()` 함수 안에서 선언됐습니다.

 따라서:

```
console.log(data);
```

 를 함수 밖에서 작성하면:

```
ReferenceError: data is not defined
```

 가 발생합니다.

 즉:

```
async function getData() {
    const data = ...;

    console.log(data); // ✅
}

console.log(data);     // ❌
```

 입니다.

---

 # 23\. `return`으로 데이터를 밖으로 보내기

 함수 안의 데이터를 밖에서 사용하려면:

```
async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
```

 그리고:

```
async function main() {
    const data = await getData();

    console.log(data.title);
}

main();
```

 이렇게 사용합니다.

---

 # 24\. 전체적인 `async/await` 흐름

```
async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    return data;
}
```

 ↓

```
async function main() {
    const data = await getData();

    console.log(data.title);
}
```

 전체 흐름:

```
main()
  ↓
getData()
  ↓
fetch()
  ↓
response
  ↓
response.json()
  ↓
data
  ↓
return data
  ↓
main의 data
  ↓
data.title
```

 이 구조를 이해하는 것이 중요합니다.

---

 # 25\. `try / catch`

 네트워크 요청에서 오류가 발생할 수 있기 때문에 다음과 같이 처리할 수 있습니다.

```
async function getData() {
    try {
        const response = await fetch(url);

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('에러 발생:', error);
    }
}
```

 구조:

```
try
 ↓
정상적으로 실행
 ↓
return data

문제 발생
 ↓
catch
 ↓
에러 처리
```

---

 # 26\. 최종 예제

 지금까지 배운 내용을 하나로 합치면 다음과 같습니다.

```
// ================================
// 1. 객체
// ================================

const student = {
    name: '홍길동',
    age: 20
};

console.log(Object.keys(student));
console.log(Object.values(student));
console.log(Object.entries(student));

// ================================
// 2. entries → fromEntries
// ================================

const studentCopy = Object.fromEntries(
    Object.entries(student)
);

console.log(studentCopy);

// ================================
// 3. 점수 객체
// ================================

const scores = {
    korean: 90,
    english: 55,
    math: 78
};

// ================================
// 4. 80점 이상만 추출
// ================================

const passed = Object.fromEntries(
    Object.entries(scores)
        .filter(([subject, score]) => score >= 80)
);

console.log(passed);

// ================================
// 5. 모든 점수에 5점 추가
// ================================

const bonus = Object.fromEntries(
    Object.entries(scores)
        .map(([subject, score]) => [subject, score + 5])
);

console.log(bonus);

// ================================
// 6. 옵셔널 체이닝
// ================================

const user = {
    name: '김코딩',
    age: 0,
    address: null
};

console.log(user.phone?.home);

// ================================
// 7. || 와 ??
// ================================

console.log(user.age || 25);
// 25

console.log(user.age ?? 25);
// 0

console.log(user.address ?? '주소 미입력');
// 주소 미입력

// ================================
// 8. fetch + async/await
// ================================

async function getData() {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts/1'
        );

        const data = await response.json();

        console.log('받은 데이터:', data);

        return data;

    } catch (error) {
        console.error('에러 발생:', error);
    }
}

// ================================
// 9. 반환된 데이터 사용
// ================================

async function main() {
    const data = await getData();

    console.log('제목:', data.title);
}

main();
```

---

 # 27\. 반드시 기억할 핵심 요약

 ## 객체

```
Object.keys(obj)
```

 → 키

```
Object.values(obj)
```

 → 값

```
Object.entries(obj)
```

 → `[키, 값]`

```
Object.fromEntries(array)
```

 → 객체

---

 ## 배열 가공

```
filter()
```

 → **골라내기**

```
map()
```

 → **변환하기**

 따라서:

```
Object.fromEntries(
    Object.entries(obj).filter(...)
)
```

 → 객체에서 원하는 항목만 남기기

```
Object.fromEntries(
    Object.entries(obj).map(...)
)
```

 → 객체의 값을 일괄 변경하기

---

 ## 안전한 접근

```
obj?.property
```

 → 중간 값이 `null`/`undefined`이면 `undefined`

---

 ## 기본값

```
value || defaultValue
```

 → falsy면 기본값

```
value ?? defaultValue
```

 → `null` 또는 `undefined`일 때만 기본값

---

 ## 비동기

```
const response = await fetch(url);
const data = await response.json();
```

 → 서버에서 데이터 가져오기

```
return data;
```

 → 함수 밖으로 데이터 전달

```
const data = await getData();
```

 → 함수가 반환한 데이터 받기

---

 # 28\. 이번 학습에서 가장 중요한 3개의 흐름

 ### ① 객체 가공

```
객체
 ↓
Object.entries()
 ↓
filter / map
 ↓
Object.fromEntries()
 ↓
객체
```

 ### ② 안전한 데이터 접근

```
obj?.property
      ↓
없으면 undefined
```

 ### ③ 서버 데이터 처리

```
fetch()
 ↓
await
 ↓
response
 ↓
response.json()
 ↓
await
 ↓
data
 ↓
return
 ↓
다른 함수에서 await
 ↓
data.title
```

 **이 세 가지 흐름을 확실히 이해하면, 지금 공부하고 있는 JavaScript의 객체 처리와 비동기 처리 부분을 상당히 탄탄하게 잡은 것입니다.**