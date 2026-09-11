const API_BASE_URL =
    "http://localhost:8081/api/students";


// ================================
// 전체 학생 조회
// ================================

async function getStudents() {

    const response = await fetch(API_BASE_URL);

    const data = await response.json();

    if (!response.ok) {

        const error = new Error(
            data.message || "학생 목록 조회에 실패했습니다."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


// ================================
// ID로 학생 조회
// ================================

async function getStudentById(id) {

    const response = await fetch(
        `${API_BASE_URL}/${id}`
    );

    const data = await response.json();

    if (!response.ok) {

        const error = new Error(
            data.message || "학생 조회에 실패했습니다."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


// ================================
// 학번으로 학생 조회
// ================================

async function getStudentByNumber(studentNumber) {

    const response = await fetch(
        `${API_BASE_URL}/number/${encodeURIComponent(studentNumber)}`
    );

    const data = await response.json();

    if (!response.ok) {

        const error = new Error(
            data.message || "학생 조회에 실패했습니다."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


// ================================
// 학생 등록
// ================================

async function createStudent(studentData) {

    const response = await fetch(
        API_BASE_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        const error = new Error(
            data.message || "학생 등록에 실패했습니다."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


// ================================
// 학생 수정
// ================================

async function updateStudent(id, studentData) {

    const response = await fetch(
        `${API_BASE_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        const error = new Error(
            data.message || "학생 수정에 실패했습니다."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


// ================================
// 학생 삭제
// ================================

async function deleteStudentApi(id) {

    const response = await fetch(
        `${API_BASE_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {

        let data = {};

        try {
            data = await response.json();
        } catch (error) {
            // 응답 body가 없는 경우
        }

        const error = new Error(
            data.message || "학생 삭제에 실패했습니다."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }
}
