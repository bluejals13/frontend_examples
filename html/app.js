// html/app.js
$(document).ready(function() {
    // 1. 초기 렌더링 (React의 useEffect 빈 배열과 동일)
    loadBooks();

    let messageTimer = null;

    // 메시지 출력 함수 (React의 MessageBox 컴포넌트 + useEffect 타이머 역할)
    function showMessage(msg, type) {
        const $msgBox =$('#messageBox');
        $msgBox.text(msg).removeClass('error-text success-text').addClass(type + '-text').show();
        
        clearTimeout(messageTimer);
        messageTimer = setTimeout(() => { $msgBox.fadeOut(); }, 3000);
    }

    // 2. 도서 목록 불러오기 (React의 loadBooks 및 BookTable 렌더링)
    function loadBooks() {
        const $tbody =$('#bookListBody');
        $tbody.html('<tr><td colspan="7">로딩 중...</td></tr>');

        $.ajax({
            url: 'api/books.php',
            type: 'GET',
            dataType: 'json',
            success: function(books) {
                if(books.length === 0) {
                    $tbody.html('<tr><td colspan="7">등록된 도서가 없습니다.</td></tr>');
                    return;
                }

                let html = '';
                // React의 books.map() 역할을 개발자가 직접 HTML 텍스트로 조립
                $.each(books, function(index, book) {
                    const priceStr = book.price ? `₩${Number(book.price).toLocaleString()}` : '-';
                    html += `
                        <tr data-id="${book.id}">
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td>${priceStr}</td>
                            <td>${book.pageCount || '-'}</td>
                            <td>${book.publishDate || '-'}</td>
                            <td>
                                <button type="button" class="edit-btn">수정</button>
                                <button type="button" class="delete-btn">삭제</button>
                            </td>
                        </tr>
                    `;
                });
                $tbody.html(html); // 조립한 HTML을 DOM에 꽂아 넣음
            },
            error: function() {
                $tbody.html('<tr><td colspan="7">데이터를 불러오는데 실패했습니다.</td></tr>');
            }
        });
    }

    // 3. 폼 초기화 함수 (React의 setForm(EMPTY_FORM))
    function resetForm() {
        $('#bookForm')[0].reset();
        $('#editingId').val('');
        $('#submitBtn').text('도서 등록');
        $('#cancelBtn').hide();
    }

    $('#cancelBtn').on('click', resetForm);

    // 4. 도서 등록/수정 전송 (React의 onSubmit)
    $('#bookForm').on('submit', function(e) {
        e.preventDefault();
        
        // 입력된 모든 input 값을 name=value 형태의 쿼리스트링으로 변환
        const formData = $(this).serialize();
        const editingId = $('#editingId').val();

        $.ajax({
            url: 'api/books.php',
            type: 'POST', // 편의상 POST로 통일하고 API에서 id 유무로 판단
            data: formData,
            success: function(response) {
                showMessage(editingId ? "수정되었습니다." : "등록되었습니다.", "success");
                resetForm();
                loadBooks(); // 데이터가 바뀌었으니 화면 전체를 다시 그리도록 지시
            }
        });
    });

    // 5. 수정 버튼 클릭 (동적 생성 요소이므로 이벤트 위임 사용)
    $('#bookTable').on('click', '.edit-btn', function() {
        const bookId = $(this).closest('tr').data('id');
        
        // 서버에서 단건 정보를 가져와서 폼에 채워 넣음
        $.get(`api/books.php?id=${bookId}`, function(book) {
            // 가져온 JSON 데이터를 기반으로 DOM의 value를 직접 조작
            $.each(book, function(key, value) {
                $(`[name="${key}"]`).val(value);
            });
            $('#editingId').val(book.id);
            $('#submitBtn').text('도서 수정');
            $('#cancelBtn').show();
        }, 'json');
    });

    // 6. 삭제 버튼 클릭
    $('#bookTable').on('click', '.delete-btn', function() {
        if(confirm("정말 삭제하시겠습니까?")) {
            const bookId = $(this).closest('tr').data('id');$.ajax({
                url: `api/books.php?action=delete&id=${bookId}`,
                type: 'GET', // RESTful 원칙 대신 간단한 GET으로 처리
                success: function() {
                    showMessage("삭제되었습니다.", "success");
                    loadBooks();
                }
            });
        }
    });
});
