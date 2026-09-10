// ========================================
// Local Storage Test
// ========================================

console.log("===== LOCAL TEST START =====");


// 테스트 결과
function test(name, condition) {

    if (condition) {
        console.log(`✅ PASS: ${name}`);
    } else {
        console.error(`❌ FAIL: ${name}`);
    }
}


// ========================================
// 초기화
// ========================================

clearStudents();


// ========================================
// 테스트 데이터
// ========================================

const localTestStudent = {
    name: "홍길동",
    studentNumber: "AB123",
    address: "서울",
    phoneNumber: "010-1234-5678",
    email: "hong@test.com",
    dateOfBirth: "2000-01-01"
};



// ========================================
// 1. 저장
// ========================================

saveStudents([localTestStudent]);

const saved =
    loadStudents();


test(
    "학생 저장",
    saved.length === 1
);


// ========================================
// 2. 데이터 확인
// ========================================

test(
    "이름 확인",
    saved[0].name === "홍길동"
);

test(
    "학번 확인",
    saved[0].studentNumber === "AB123"
);

test(
    "이메일 확인",
    saved[0].email === "hong@test.com"
);


// ========================================
// 3. 수정
// ========================================

saved[0].address = "부산";

saveStudents(saved);

const updated =
    loadStudents();


test(
    "학생 수정",
    updated[0].address === "부산"
);


// ========================================
// 4. 삭제
// ========================================

updated.splice(0, 1);

saveStudents(updated);


const afterDelete =
    loadStudents();


test(
    "학생 삭제",
    afterDelete.length === 0
);


// ========================================
// 종료
// ========================================

clearStudents();

console.log("===== LOCAL TEST END =====");
