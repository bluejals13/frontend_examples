const ISBN_PATTERN = /^[0-9X-]+$/i;

function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

export function validateBook(book) {
    const {
        title,
        author,
        isbn,
        price,
        publisherId,
        bookDetail = {}
    } = book;

    const {
        pageCount,
        coverImageUrl
    } = bookDetail;

    if (!title) {
        return "제목을 입력해주세요.";
    }

    if (!author) {
        return "저자를 입력해주세요.";
    }

    if (!isbn || !ISBN_PATTERN.test(isbn)) {
        return "ISBN 을 입력하지 않거나 올바른 형식이 아닙니다. (숫자와 X, - 만 허용)";
    }

    if (price !== null && price !== undefined && price < 0) {
        return "가격은 0 이상이어야 합니다.";
    }

    if (pageCount !== null && pageCount !== undefined && pageCount < 0) {
        return "페이지 수는 0 이상이어야 합니다.";
    }

    if (
        publisherId === null ||
        publisherId === undefined ||
        publisherId === ""
    ) {
        return "출판사를 선택해주세요.";
    }

    if (coverImageUrl && !isValidUrl(coverImageUrl)) {
        return "올바른 이미지 URL 형식이 아닙니다. (예: https://example.com/cover.jpg)";
    }

    return null;
}
