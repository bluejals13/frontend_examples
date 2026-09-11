// ================================
// DOM
// ================================

const searchType =
    document.getElementById("searchType");

const searchKeyword =
    document.getElementById("searchKeyword");

const searchButton =
    document.getElementById("searchButton");

const resetSearchButton =
    document.getElementById(
        "resetSearchButton"
    );


// ================================
// 조회
// ================================

searchButton.addEventListener(
    "click",
    async () => {

        const type =
            searchType.value;

        const keyword =
            searchKeyword.value.trim();


        // 전체 조회
        if (type === "all") {

            await loadStudents();

            return;
        }


        // 검색어 확인
        if (!keyword) {

            alert(
                "조회할 값을 입력해주세요."
            );

            return;
        }


        try {

            let student;


            // ID 조회
            if (type === "id") {

                if (!/^\d+$/.test(keyword)) {

                    alert(
                        "ID는 숫자로 입력해주세요."
                    );

                    return;
                }

                student =
                    await getStudentById(
                        keyword
                    );
            }


            // 학번 조회
            else if (
                type === "studentNumber"
            ) {

                student =
                    await getStudentByNumber(
                        keyword
                    );
            }


            renderStudents([student]);

        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "학생을 찾을 수 없습니다."
            );
        }
    }
);


// ================================
// 전체 조회
// ================================

resetSearchButton.addEventListener(
    "click",
    async () => {

        searchType.value =
            "all";

        searchKeyword.value =
            "";

        await loadStudents();
    }
);


// ================================
// 조회 방식 변경
// ================================

searchType.addEventListener(
    "change",
    () => {

        if (searchType.value === "all") {

            searchKeyword.value = "";

            searchKeyword.style.display =
                "none";

        } else {

            searchKeyword.style.display =
                "inline-block";
        }
    }
);


// 초기 상태
if (searchType.value === "all") {

    searchKeyword.style.display =
        "none";
}
