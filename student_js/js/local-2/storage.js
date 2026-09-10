// ================================
// Local Storage
// ================================

const STORAGE_KEY = "students";


// 학생 목록 조회
function loadStudents() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        const students = JSON.parse(data);

        return Array.isArray(students)
            ? students
            : [];

    } catch (error) {

        console.error(
            "학생 데이터 불러오기 실패:",
            error
        );

        return [];
    }
}


// 학생 목록 저장
function saveStudents(students) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );
}


// 학생 목록 삭제
function clearStudents() {
    localStorage.removeItem(STORAGE_KEY);
}
