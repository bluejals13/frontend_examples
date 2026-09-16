// 전역 변수
const API_BASE_URL = 'http://localhost:8080';
let editingBookId = null; // 현재 수정 중인 도서 ID

// DOM 요소 참조
const bookForm = document.getElementById('bookForm');
const bookTableBody = document.getElementById('bookTableBody');
const submitButton = bookForm.querySelector('button[type="submit"]');

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지 로드 완료');
    loadBooks();
});

// 폼 제출 이벤트 핸들러
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(bookForm);
    
    // 백엔드 BookDTO.Request 구조에 맞게 바인딩
    const bookData = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
        isbn: formData.get('isbn').trim(),
        price: formData.get('price') ? parseInt(formData.get('price')) : null,
        publishDate: formData.get('publishDate') || null,
        publisherId: formData.get('publisherId') ? parseInt(formData.get('publisherId')) : 1, 
        detailRequest: {
            description: formData.get('description') ? formData.get('description').trim() : null,
            language: formData.get('language') ? formData.get('language').trim() : null,
            pageCount: formData.get('pageCount') ? parseInt(formData.get('pageCount')) : null,
            publisher: formData.get('publisher') ? formData.get('publisher').trim() : null,
            coverImageUrl: formData.get('coverImageUrl') ? formData.get('coverImageUrl').trim() : null,
            edition: formData.get('edition') ? formData.get('edition').trim() : null
        }
    };

    // 유효성 검사
    if (!validateBook(bookData)) {
        return;
    }

    // 수정 모드인지 확인
    if (editingBookId) {
        updateBook(editingBookId, bookData);
    } else {
        createBook(bookData);
    }
});

// 도서 생성 함수
function createBook(bookData) {
    fetch(`${API_BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || '도서 등록에 실패했습니다.');
            });
        }
        return response.json();
    })
    .then(result => {
        alert('도서가 성공적으로 등록되었습니다.');
        resetForm();
        loadBooks(); // 목록 새로고침
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`도서 등록 실패: ${error.message}`);
    });
}

// 도서 데이터 유효성 검사
function validateBook(book) {
    // 필수 필드 검사
    if (!book.title) {
        alert('제목을 입력해주세요.');
        return false;
    }

    if (!book.author) {
        alert('저자를 입력해주세요.');
        return false;
    }

    if (!book.isbn) {
        alert('ISBN을 입력해주세요.');
        return false;
    }

    // ISBN 자릿수 검사 (하이픈 제외 숫자 10자리 또는 13자리)
    const isbnDigits = book.isbn.replace(/\D/g, '');
    if (isbnDigits.length !== 10 && isbnDigits.length !== 13) {
        alert('ISBN은 하이픈 제외 숫자가 10자리 또는 13자리여야 합니다.');
        return false;
    }

    // 가격 유효성 검사
    if (book.price !== null && book.price < 0) {
        alert('가격은 0 이상이어야 합니다.');
        return false;
    }

    // 페이지 수 유효성 검사
    if (book.detailRequest.pageCount !== null && book.detailRequest.pageCount < 0) {
        alert('페이지 수는 0 이상이어야 합니다.');
        return false;
    }

    // URL 형식 검사 (입력된 경우에만)
    if (book.detailRequest.coverImageUrl && !isValidUrl(book.detailRequest.coverImageUrl)) {
        alert('올바른 이미지 URL 형식이 아닙니다.');
        return false;
    }

    return true;
}

// URL 유효성 검사
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// 도서 목록 로드 함수
function loadBooks() {
    fetch(`${API_BASE_URL}/api/books`)
        .then(response => {
            if (!response.ok) {
                throw new Error('도서 목록을 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(books => {
            renderBookTable(books);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 목록을 불러오는데 실패했습니다.');
        });
}

// 도서 테이블 렌더링
function renderBookTable(books) {
    bookTableBody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');

        const formattedPrice = book.price ? `₩${book.price.toLocaleString()}` : '-';
        const formattedDate = book.publishDate || '-';
        const detail = book.detail;
        
        // 출판사 이름 우선순위: publisher 객체의 name > detail의 publisher 텍스트 > '-'
        const publisherName = book.publisher ? book.publisher.name : (detail ? detail.publisher : '-');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${formattedPrice}</td>
            <td>${formattedDate}</td>
            <td>${publisherName}</td>
            <td>
                <button class="edit-btn" onclick="editBook(${book.id})">수정</button>
                <button class="delete-btn" onclick="deleteBook(${book.id})">삭제</button>
                <button class="detail-btn" onclick="showBookDetail(${book.id})">상세</button>
            </td>
        `;

        bookTableBody.appendChild(row);
    });
}

// 도서 삭제 함수
function deleteBook(bookId) {
    if (!confirm('정말로 이 도서를 삭제하시겠습니까?')) {
        return;
    }

    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('도서 삭제에 실패했습니다.');
        }
        alert('도서가 성공적으로 삭제되었습니다.');
        loadBooks(); // 목록 새로고침
    })
    .catch(error => {
        console.error('Error:', error);
        alert('도서 삭제에 실패했습니다.');
    });
}

// 도서 수정 함수
function editBook(bookId) {
    fetch(`${API_BASE_URL}/api/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('도서 정보를 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(book => {
            // 폼에 기본 도서 정보 채우기
            bookForm.title.value = book.title;
            bookForm.author.value = book.author;
            bookForm.isbn.value = book.isbn;
            bookForm.price.value = book.price || '';
            bookForm.publishDate.value = book.publishDate || '';
            
            if (bookForm.publisherId) {
                bookForm.publisherId.value = book.publisher ? book.publisher.id : 1;
            }

            // 폼에 상세 정보 채우기
            const detail = book.detail;
            if (detail) {
                bookForm.description.value = detail.description || '';
                bookForm.language.value = detail.language || '';
                bookForm.pageCount.value = detail.pageCount || '';
                bookForm.publisher.value = detail.publisher || '';
                bookForm.coverImageUrl.value = detail.coverImageUrl || '';
                bookForm.edition.value = detail.edition || '';
            }

            // 수정 모드로 설정
            editingBookId = bookId;
            submitButton.textContent = '도서 수정';

            // 폼으로 스크롤
            bookForm.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 정보를 불러오는데 실패했습니다.');
        });
}

// 도서 업데이트 함수
function updateBook(bookId, bookData) {
    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || '도서 정보 수정에 실패했습니다.');
            });
        }
        return response.json();
    })
    .then(result => {
        alert('도서 정보가 성공적으로 수정되었습니다.');
        resetForm();
        loadBooks(); // 목록 새로고침
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`도서 정보 수정 실패: ${error.message}`);
    });
}

// 도서 상세보기 함수
function showBookDetail(bookId) {
    fetch(`${API_BASE_URL}/api/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('도서 정보를 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(book => {
            let detailInfo = `제목: ${book.title}\n`;
            detailInfo += `저자: ${book.author}\n`;
            detailInfo += `ISBN: ${book.isbn}\n`;
            detailInfo += `가격: ${book.price ? '₩' + book.price.toLocaleString() : '-'}\n`;
            detailInfo += `출판일: ${book.publishDate || '-'}\n`;
            detailInfo += `출판사명: ${book.publisher ? book.publisher.name : '-'}\n\n`;

            const detail = book.detail;
            if (detail) {
                detailInfo += `설명: ${detail.description || '-'}\n`;
                detailInfo += `언어: ${detail.language || '-'}\n`;
                detailInfo += `페이지 수: ${detail.pageCount || '-'}\n`;
                detailInfo += `에디션: ${detail.edition || '-'}\n`;
                detailInfo += `표지 이미지: ${detail.coverImageUrl || '-'}`;
            }

            alert(detailInfo);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 정보를 불러오는데 실패했습니다.');
        });
}

// 폼 초기화 함수
function resetForm() {
    bookForm.reset();
    editingBookId = null;
    submitButton.textContent = '도서 등록';
}