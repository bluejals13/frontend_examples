// ========================================
// Integration Test
// ========================================

console.log(
    "===== INTEGRATION TEST START ====="
);


function test(name, condition) {

    if (condition) {
        console.log(`✅ PASS: ${name}`);
    } else {
        console.error(`❌ FAIL: ${name}`);
    }
}


// ========================================
// 테스트 데이터
// ========================================

const integrationTestStudent = {
    name: "Fallback 테스트",
    studentNumber: "FB001",
    address: "서울",
    phoneNumber: "010-1111-2222",
    email: "fallback@test.com",
    dateOfBirth: "2000-01-01"
};



// ========================================
// Local 초기화
// ========================================

clearStudents();


// ========================================
// API 장애 상황 시뮬레이션
// ========================================

async function simulateApiFailure() {

    try {

        // 존재하지 않는 주소
        await fetch(
            "http://localhost:9999/api/students"
        );

        return false;

    } catch (error) {

        return true;
    }
}


// ========================================
// Fallback 테스트
// ========================================

async function testFallback() {

    const apiFailed =
        await simulateApiFailure();


    test(
        "API 장애 감지",
        apiFailed === true
    );


    if (apiFailed) {

        saveStudents([
            integrationTestStudent
        ]);
    }


    const localStudents =
        loadStudents();


    test(
        "API 장애 후 로컬 저장",
        localStudents.length === 1
    );


    test(
        "로컬 데이터 보존",
        localStudents[0].studentNumber
        === "FB001"
    );
}


// ========================================
// 실행
// ========================================

async function runIntegrationTest() {

    await testFallback();

    clearStudents();

    console.log(
        "===== INTEGRATION TEST END ====="
    );
}


runIntegrationTest();
