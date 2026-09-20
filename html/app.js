// html/app.js
$(document).ready(function() {
    
    // 1. 초기 목록 불러오기
    loadBooks();

    let messageTimer = null;

    function showMessage(msg, type) {
        const $msgBox =$('#messageBox');
        $msgBox.text(msg).removeClass('error-text success-text').addClass(type + '-text').show();
        
        clearTimeout(messageTimer);
        messageTimer = setTimeout(function() { $msgBox.fadeOut(); }, 3000);
    }

    // 2. 도서 목록 불러오기 (GET)
    function loadBooks() {
        const $tbody =$('#bookListBody');
        $tbody.html('<tr><td colspan="7">로딩 중...</td></tr>');

        $.ajax({
            url: 'api/books.php',
            type: 'GET',
            dataType: 'json',
            success: function(books) {
                if (!books || !Array.isArray(books) || books.length === 0) {
                    $tbody.html('<tr><td colspan="7">등록된 도서가 없습니다.</td></tr>');
                    return;
                }

                let html = '';
                $.each(books, function(index, book) {
                    // null 방어 로직 (publisher, detail 안전 검사)
                    const detailObj = book.detail || {};
                    const publisherObj = book.publisher || {};

                    const priceStr = (book.price !== null && book.price !== undefined) 
                        ? `₩${Number(book.price).toLocaleString()}` 
                        : '-';
                    
                    const pageCountStr = detailObj.pageCount || book.pageCount || '-';

                    html += `
                        <tr data-id="${book.id}">
                            <td>${book.title || '-'}</td>
                            <td>${book.author || '-'}</td>
                            <td>${book.isbn || '-'}</td>
                            <td>${priceStr}</td>
                            <td>${pageCountStr}</td>
                            <td>${book.publishDate || '-'}</td>
                            <td>
                                <button type="button" class="edit-btn">수정</button>
                                <button type="button" class="delete-btn">삭제</button>
                                <button type="button" class="detail-btn">상세</button>
                            </td>
                        </tr>
                    `;
                });
                $tbody.html(html);
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
                $tbody.html('<tr><td colspan="7">데이터를 불러오는데 실패했습니다.</td></tr>');
            }
        });
    }

    // 3. 폼 초기화
    function resetForm() {
        $('#bookForm')[0].reset();
        $('#editingId').val('');
        $('#submitBtn').text('도서 등록');
        $('#cancelBtn').hide();
    }

    $('#cancelBtn').on('click', resetForm);

    // 4. 도서 등록 및 수정 전송 (POST)
    $('#bookForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = $(this).serialize();
        const editingId = $('#editingId').val();

        $.ajax({
            url: 'api/books.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                showMessage(editingId ? "도서가 성공적으로 수정되었습니다." : "도서가 성공적으로 등록되었습니다.", "success");
                resetForm();
                loadBooks();
            },
            error: function() {
                showMessage("저장에 실패했습니다.", "error");
            }
        });
    });

    // 5. 수정 버튼 클릭
    $('#bookTable').on('click', '.edit-btn', function() {
        const bookId = $(this).closest('tr').data('id');

        $.get(`api/books.php?id=${bookId}`, function(book) {
            if (!book) return;
            
            const detailObj = book.detail || {};
            const publisherObj = book.publisher || {};

            // 폼 필드 안전하게 채우기
            $('[name="title"]').val(book.title || '');
            $('[name="author"]').val(book.author || '');
            $('[name="isbn"]').val(book.isbn || '');
            $('[name="price"]').val(book.price !== null ? book.price : '');
            $('[name="publishDate"]').val(book.publishDate || '');
            
            $('[name="publisher"]').val(publisherObj.name || detailObj.publisher || '');
            
            $('[name="language"]').val(detailObj.language || '');
            $('[name="pageCount"]').val(detailObj.pageCount || '');
            $('[name="edition"]').val(detailObj.edition || '');
            $('[name="coverImageUrl"]').val(detailObj.coverImageUrl || '');
            $('[name="description"]').val(detailObj.description || '');

            $('#editingId').val(book.id);
            $('#submitBtn').text('도서 수정');
            $('#cancelBtn').show();
            
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }, 'json');
    });

    // 6. 삭제 버튼 클릭
    $('#bookTable').on('click', '.delete-btn', function() {
        if (confirm("정말 이 도서를 삭제하시겠습니까?")) {
            const bookId = $(this).closest('tr').data('id');$.ajax({
                url: `api/books.php?action=delete&id=${bookId}`,
                type: 'GET',
                dataType: 'json',
                success: function() {
                    showMessage("도서가 삭제되었습니다.", "success");
                    if ($('#editingId').val() == bookId) {
                        resetForm();
                    }
                    loadBooks();
                }
            });
        }
    });

    // 7. 상세 보기 버튼 클릭 (과제 10번 요구사항)
    $('#bookTable').on('click', '.detail-btn', function() {
        const bookId = $(this).closest('tr').data('id');

        $.get(`api/books.php?id=${bookId}`, function(book) {
            if (!book) return;

            const detailObj = book.detail || {};
            const publisherObj = book.publisher || {};

            const priceVal = (book.price !== null && book.price !== undefined) 
                ? `₩${Number(book.price).toLocaleString()}` 
                : "-";

            const detailMsg = [
                `제목: ${book.title || "-"}`,
                `저자: ${book.author || "-"}`,
                `ISBN: ${book.isbn || "-"}`,
                `가격: ${priceVal}`,
                `출판일: ${book.publishDate || "-"}`,
                "",
                `출판사 ID: ${publisherObj.id || "-"}`,
                `출판사명: ${publisherObj.name || detailObj.publisher || "-"}`,
                "",
                `설명: ${detailObj.description || "-"}`,
                `언어: ${detailObj.language || "-"}`,
                `페이지 수: ${detailObj.pageCount || "-"}`,
                `상세 출판사: ${detailObj.publisher || "-"}`,
                `에디션: ${detailObj.edition || "-"}`,
                `표지 이미지: ${detailObj.coverImageUrl || "-"}`
            ].join("\n");

            alert(detailMsg);
        }, 'json');
    });
});