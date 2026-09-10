// ================================
// DOM
// ================================

const studentForm = document.getElementById("studentForm");
const studentTableBody =
    document.querySelector("tbody");


// ================================
// 초기화
// ================================

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});


// ================================
// Form Submit
// ================================

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(studentForm);

    const studentData = {
        name: formData.get("name").trim(),

        studentNumber:
            formData.get("studentNumber").trim(),

        detailRequest: {
            address:
                formData.get("address").trim(),

            phoneNumber:
                formData.get("phoneNumber").trim(),

            email:
                formData.get("email").trim() || null,

            dateOfBirth:
                formData.get("dateOfBirth") || null
        }
    };


    // 입력값 검증
    if (!validateStudent(studentData)) {
        return;
    }


    try {
        const result =
            await createStudent(studentData);

        console.log("학생 등록 성공:", result);

        alert("학생이 등록되었습니다.");

        studentForm.reset();

        loadStudents();

    } catch (error) {

        console.error(error);

        alert(
            "학생 등록에 실패했습니다."
        );
    }
});


// ================================
// 학생 목록
// ================================

async function loadStudents() {

    try {

        const students =
            await getStudents();

        renderStudents(students);

    } catch (error) {

        console.error(
            "학생 목록 조회 실패:",
            error
        );

        alert(
            "학생 목록을 불러올 수 없습니다."
        );
    }
}


// ================================
// 화면 출력
// ================================

function renderStudents(students) {

    studentTableBody.innerHTML = "";

    students.forEach(student => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentNumber}</td>
            <td>${student.detailRequest?.address ?? ""}</td>
            <td>${student.detailRequest?.phoneNumber ?? ""}</td>
            <td>${student.detailRequest?.email ?? ""}</td>
            <td>${student.detailRequest?.dateOfBirth ?? ""}</td>
        `;

        studentTableBody.appendChild(tr);
    });
}


// ================================
// Validation
// ================================

function validateStudent(student) {

    if (!student.name) {
        alert("이름을 입력해주세요.");
        return false;
    }


    if (
        !student.studentNumber ||
        !isValidStudentNumber(
            student.studentNumber
        )
    ) {
        alert(
            "학번을 입력하지 않았거나 형식이 올바르지 않습니다."
        );

        return false;
    }


    if (!student.detailRequest.phoneNumber) {
        alert("전화번호를 입력해주세요.");
        return false;
    }


    if (
        !isValidPhoneNumber(
            student.detailRequest.phoneNumber
        )
    ) {
        alert(
            "전화번호 형식이 올바르지 않습니다."
        );

        return false;
    }


    if (
        student.detailRequest.email &&
        !isValidEmail(
            student.detailRequest.email
        )
    ) {
        alert(
            "이메일 형식이 올바르지 않습니다."
        );

        return false;
    }


    return true;
}


// ================================
// 학번
// ================================

function isValidStudentNumber(studentNumber) {

    const pattern =
        /^[A-Z]{2}\d{3}$/i;

    return pattern.test(
        studentNumber.trim()
    );
}


// ================================
// 전화번호
// ================================

function isValidPhoneNumber(phoneNumber) {

    const pattern =
        /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

    return pattern.test(
        phoneNumber.trim()
    );
}


// ================================
// 이메일
// ================================

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}