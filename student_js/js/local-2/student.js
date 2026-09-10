// ================================
// Student Local Management
// ================================

const studentForm =
    document.getElementById("studentForm");

const tbody =
    document.querySelector("tbody");

const cancelButton =
    document.getElementById("cancelButton");

let editIndex = null;


// ================================
// 초기화
// ================================

document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderStudents();
    }
);


// ================================
// 등록 / 수정
// ================================

studentForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const student = getFormData();

        if (!validateStudent(student)) {
            return;
        }

        const students = loadStudents();


        // 수정
        if (editIndex !== null) {

            students[editIndex] = student;

            alert(
                "학생 정보가 수정되었습니다."
            );

        }

        // 신규 등록
        else {

            // 학번 중복 확인
            const duplicate =
                students.some(
                    item =>
                        item.studentNumber ===
                        student.studentNumber
                );

            if (duplicate) {

                alert(
                    "이미 등록된 학번입니다."
                );

                return;
            }

            students.push(student);

            alert(
                "학생이 등록되었습니다."
            );
        }


        saveStudents(students);

        renderStudents();

        resetForm();
    }
);


// ================================
// Form 데이터
// ================================

function getFormData() {

    const formData =
        new FormData(studentForm);

    return {
        name:
            formData.get("name").trim(),

        studentNumber:
            formData
                .get("studentNumber")
                .trim(),

        address:
            formData
                .get("address")
                .trim(),

        phoneNumber:
            formData
                .get("phoneNumber")
                .trim(),

        email:
            formData
                .get("email")
                .trim(),

        dateOfBirth:
            formData.get("dateOfBirth")
    };
}


// ================================
// 학생 목록 출력
// ================================

function renderStudents() {

    const students =
        loadStudents();

    tbody.innerHTML = "";


    students.forEach(
        (student, index) => {

            const tr =
                document.createElement("tr");


            addCell(tr, student.name);

            addCell(
                tr,
                student.studentNumber
            );

            addCell(
                tr,
                student.address
            );

            addCell(
                tr,
                student.phoneNumber
            );

            addCell(
                tr,
                student.email
            );

            addCell(
                tr,
                student.dateOfBirth
            );


            // 액션
            const actionTd =
                document.createElement("td");


            const editButton =
                document.createElement("button");

            editButton.type = "button";
            editButton.textContent = "수정";

            editButton.addEventListener(
                "click",
                () => editStudent(index)
            );


            const deleteButton =
                document.createElement("button");

            deleteButton.type = "button";
            deleteButton.textContent = "삭제";

            deleteButton.addEventListener(
                "click",
                () => deleteStudent(index)
            );


            actionTd.appendChild(
                editButton
            );

            actionTd.appendChild(
                deleteButton
            );

            tr.appendChild(actionTd);

            tbody.appendChild(tr);
        }
    );
}


// ================================
// Cell 생성
// ================================

function addCell(tr, value) {

    const td =
        document.createElement("td");

    // innerHTML 대신 textContent
    td.textContent = value ?? "";

    tr.appendChild(td);
}


// ================================
// 삭제
// ================================

function deleteStudent(index) {

    const students =
        loadStudents();

    const student =
        students[index];


    if (!student) {
        return;
    }


    const result =
        confirm(
            `"${student.name}" 학생을 삭제하시겠습니까?`
        );


    if (!result) {
        return;
    }


    students.splice(index, 1);

    saveStudents(students);

    renderStudents();

    alert(
        "학생이 삭제되었습니다."
    );
}


// ================================
// 수정
// ================================

function editStudent(index) {

    const students =
        loadStudents();

    const student =
        students[index];


    if (!student) {
        return;
    }


    document.getElementById("name").value =
        student.name;

    document.getElementById(
        "studentNumber"
    ).value =
        student.studentNumber;

    document.getElementById("address").value =
        student.address;

    document.getElementById(
        "phoneNumber"
    ).value =
        student.phoneNumber;

    document.getElementById("email").value =
        student.email;

    document.getElementById(
        "dateOfBirth"
    ).value =
        student.dateOfBirth;


    editIndex = index;


    studentForm.querySelector(
        "button[type='submit']"
    ).textContent = "학생 수정";


    cancelButton.style.display =
        "inline-block";
}


// ================================
// 취소
// ================================

cancelButton.addEventListener(
    "click",
    resetForm
);


// ================================
// Form 초기화
// ================================

function resetForm() {

    studentForm.reset();

    editIndex = null;


    studentForm.querySelector(
        "button[type='submit']"
    ).textContent = "학생 등록";


    cancelButton.style.display =
        "none";
}


// ================================
// Validation
// ================================

function validateStudent(student) {

    if (!student.name) {

        alert("이름을 입력해주세요.");

        return false;
    }


    if (!student.studentNumber) {

        alert("학번을 입력해주세요.");

        return false;
    }


    if (!student.address) {

        alert("주소를 입력해주세요.");

        return false;
    }


    if (!student.phoneNumber) {

        alert("전화번호를 입력해주세요.");

        return false;
    }


    if (!student.email) {

        alert("이메일을 입력해주세요.");

        return false;
    }


    if (!student.dateOfBirth) {

        alert("생년월일을 입력해주세요.");

        return false;
    }


    if (
        !isValidPhoneNumber(
            student.phoneNumber
        )
    ) {

        alert(
            "전화번호 형식이 올바르지 않습니다."
        );

        return false;
    }


    if (
        !isValidEmail(
            student.email
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
// 전화번호
// ================================

function isValidPhoneNumber(phone) {

    const pattern =
        /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

    return pattern.test(phone);
}


// ================================
// 이메일
// ================================

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}
