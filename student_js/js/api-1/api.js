// ================================
// Student API
// ================================

// 학생 목록 조회
async function getStudents() {
    const response = await fetch(API.STUDENTS);

    if (!response.ok) {
        throw new Error("학생 목록 조회 실패");
    }

    return await response.json();
}


// 학생 등록
async function createStudent(studentData) {
    const response = await fetch(API.STUDENTS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
    });

    if (!response.ok) {
        throw new Error("학생 등록 실패");
    }

    return await response.json();
}


// 학생 수정
async function updateStudent(studentNumber, studentData) {
    const response = await fetch(
        `${API.STUDENTS}/${studentNumber}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        }
    );

    if (!response.ok) {
        throw new Error("학생 수정 실패");
    }

    return await response.json();
}


// 학생 삭제
async function deleteStudent(studentNumber) {
    const response = await fetch(
        `${API.STUDENTS}/${studentNumber}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("학생 삭제 실패");
    }

    return true;
}