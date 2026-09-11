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

// 중복 등록 방지를 위해 랜덤 학번 생성
// ========================================
// 테스트 학생
// ========================================

const randomNumber =
    Math.floor(100 + Math.random() * 900);

const apiTestStudent = {

    name: "API 테스트",

    studentNumber:
        `ZZ${randomNumber}`,

    detailRequest: {

        address: "서울",

        phoneNumber:
            `010-${randomNumber}-9999`,

        email:
            `api${randomNumber}@test.com`,

        dateOfBirth:
            "2000-01-01"
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
            Array.isArray(students)
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
            result !== null &&
            result !== undefined
        );

        console.log(
            "등록 결과:",
            result
        );


        // 테스트 데이터 삭제
        if (result && result.id) {

            await deleteStudent(
                result.id
            );

            console.log(
                "테스트 데이터 삭제 완료:",
                result.id
            );
        }

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

// ========================================
//  테스트 db 용 예시 자료 삭제
// ========================================
async function deleteStudent(id) {

    const response = await fetch(
        `${API_BASE_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(
            `학생 삭제 실패: HTTP ${response.status}`
        );
    }

    return true;
}



runApiTests();
