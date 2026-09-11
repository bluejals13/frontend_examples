// ================================
// DOM
// ================================

const studentForm =
    document.getElementById("studentForm");

const studentTableBody =
    document.getElementById("studentTableBody");

const studentId =
    document.getElementById("studentId");

const formTitle =
    document.getElementById("formTitle");

const submitButton =
    document.getElementById("submitButton");

const cancelButton =
    document.getElementById("cancelButton");


// ================================
// 초기화
// ================================

document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadStudents();
    }
);


// ================================
// 학생 목록 조회
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
            error.message ||
            "학생 목록을 불러올 수 없습니다."
        );
    }
}


// ================================
// 학생 목록 출력
// ================================

function renderStudents(students) {

    studentTableBody.innerHTML = "";

    students.forEach(student => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td>${escapeHtml(student.name)}</td>

            <td>${escapeHtml(student.studentNumber)}</td>

            <td>
                ${escapeHtml(
                    student.detail?.address ?? ""
                )}
            </td>

            <td>
                ${escapeHtml(
                    student.detail?.phoneNumber ?? ""
                )}
            </td>

            <td>
                ${escapeHtml(
                    student.detail?.email ?? ""
                )}
            </td>

            <td>
                ${escapeHtml(
                    student.detail?.dateOfBirth ?? ""
                )}
            </td>

            <td class="action-buttons">

                <button
                    type="button"
                    class="edit-btn"
                    data-id="${student.id}">
                    수정
                </button>

                <button
                    type="button"
                    class="delete-btn"
                    data-id="${student.id}">
                    삭제
                </button>

            </td>
        `;

        studentTableBody.appendChild(tr);
    });
}


// ================================
// 액션 버튼
// ================================

studentTableBody.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }

        const id =
            button.dataset.id;

        if (button.classList.contains("edit-btn")) {

            await editStudent(id);
        }

        if (button.classList.contains("delete-btn")) {

            await deleteStudent(id);
        }
    }
);


// ================================
// Form Submit
// ================================

studentForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const formData =
            new FormData(studentForm);

        const studentData = {

            name:
                formData.get("name").trim(),

            studentNumber:
                formData
                    .get("studentNumber")
                    .trim(),

            detailRequest: {

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
                        .trim() || null,

                dateOfBirth:
                    formData.get("dateOfBirth")
                    || null
            }
        };


        // validation

        if (!validateStudent(studentData)) {
            return;
        }


        try {

            // 수정 모드
            if (studentId.value) {

                const result =
                    await updateStudent(
                        studentId.value,
                        studentData
                    );

                console.log(
                    "학생 수정 성공:",
                    result
                );

                alert(
                    "학생 정보가 수정되었습니다."
                );

            }

            // 등록 모드
            else {

                const result =
                    await createStudent(
                        studentData
                    );

                console.log(
                    "학생 등록 성공:",
                    result
                );

                alert(
                    "학생이 등록되었습니다."
                );
            }


            resetForm();

            await loadStudents();

        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "학생 처리에 실패했습니다."
            );
        }
    }
);


// ================================
// 학생 수정 시작
// ================================

async function editStudent(id) {

    try {

        const student =
            await getStudentById(id);

        studentId.value =
            student.id;

        document.getElementById("name").value =
            student.name ?? "";

        document.getElementById("studentNumber").value =
            student.studentNumber ?? "";

        document.getElementById("address").value =
            student.detail?.address ?? "";

        document.getElementById("phoneNumber").value =
            student.detail?.phoneNumber ?? "";

        document.getElementById("email").value =
            student.detail?.email ?? "";

        document.getElementById("dateOfBirth").value =
            student.detail?.dateOfBirth ?? "";


        formTitle.textContent =
            "학생 수정";

        submitButton.textContent =
            "학생 수정 완료";

        cancelButton.style.display =
            "inline-block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "학생 정보를 불러올 수 없습니다."
        );
    }
}


// ================================
// 학생 삭제
// ================================

async function deleteStudent(id) {

    try {

        const student =
            await getStudentById(id);

        const confirmed =
            confirm(
                `${student.name}(${student.studentNumber}) 학생을 삭제하시겠습니까?`
            );

        if (!confirmed) {
            return;
        }


        await deleteStudentApi(id);

        alert(
            "학생이 삭제되었습니다."
        );


        // 현재 수정 중인 학생이라면
        if (studentId.value === String(id)) {

            resetForm();
        }


        await loadStudents();

    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "학생 삭제에 실패했습니다."
        );
    }
}


// ================================
// 취소
// ================================

cancelButton.addEventListener(
    "click",
    () => {
        resetForm();
    }
);


// ================================
// Form 초기화
// ================================

function resetForm() {

    studentForm.reset();

    studentId.value = "";

    formTitle.textContent =
        "학생 등록";

    submitButton.textContent =
        "학생 등록";

    cancelButton.style.display =
        "none";
}


// ================================
// Validation
// ================================

function validateStudent(student) {

    if (!student.name) {

        alert(
            "이름을 입력해주세요."
        );

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


    if (
        !student.detailRequest.phoneNumber
    ) {

        alert(
            "전화번호를 입력해주세요."
        );

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

function isValidStudentNumber(
    studentNumber
) {

    const pattern =
        /^[A-Z]{2}\d{3}$/i;

    return pattern.test(
        studentNumber.trim()
    );
}


// ================================
// 전화번호
// ================================

function isValidPhoneNumber(
    phoneNumber
) {

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


// ================================
// HTML escape
// ================================

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}
