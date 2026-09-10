// ========================================
// API Test
// ========================================

console.log("===== API TEST START =====");


function test(name, condition) {

    if (condition) {
        console.log(`✅ PASS: ${name}`);
    } else {
        console.error(`❌ FAIL: ${name}`);
    }
}


// ========================================
// 테스트 학생
// ========================================

const apiTestStudent = {
    name: "API 테스트",
    studentNumber: "ZZ999",
    detailRequest: {
        address: "서울",
        phoneNumber: "010-9999-9999",
        email: "api@test.com",
        dateOfBirth: "2000-01-01"
    }
};



// ========================================
// 학생 목록 조회
// ========================================

async function testGetStudents() {

    try {

        const students =
            await getStudents();


        test(
            "학생 목록 API 호출",
            Array.isArray(apiTestStudent)
        );


        console.log(
            "현재 학생 수:",
            students.length
        );


    } catch (error) {

        console.error(
            "❌ API 연결 실패:",
            error
        );
    }
}


// ========================================
// 학생 등록
// ========================================

async function testCreateStudent() {

    try {

        const result =
            await createStudent(
                apiTestStudent
            );


        test(
            "학생 등록 API",
            result !== null
        );


        console.log(
            "등록 결과:",
            result
        );


    } catch (error) {

        console.error(
            "❌ 학생 등록 실패:",
            error
        );
    }
}


// ========================================
// 실행
// ========================================

async function runApiTests() {

    await testGetStudents();

    await testCreateStudent();

    console.log(
        "===== API TEST END ====="
    );
}


runApiTests();
