/* ---------------------------------------------------------
   도서 상세 보기
   서버에서 받은 BookDTO.Response를 사람이 읽기 좋은 글로 만든다.
   --------------------------------------------------------- */

const EMPTY = "-";

function formatPrice(price) {
    if (price == null) {
        return EMPTY;
    }

    return `₩${price.toLocaleString()}`;
}

export function formatBookDetail(book) {
    const {
        title,
        author,
        isbn,
        price,
        publishDate,
        publisher,
        detail,
    } = book;

    const lines = [
        `제목: ${title || EMPTY}`,
        `저자: ${author || EMPTY}`,
        `ISBN: ${isbn || EMPTY}`,
        `가격: ${formatPrice(price)}`,
        `출판일: ${publishDate || EMPTY}`,
    ];

    // PublisherDTO.SimpleResponse
    if (publisher) {
        lines.push(
            "",
            `출판사 ID: ${publisher.id ?? EMPTY}`,
            `출판사명: ${publisher.name || EMPTY}`,
        );
    }

    // BookDetailResponse
    if (detail) {
        lines.push(
            "",
            `설명: ${detail.description || EMPTY}`,
            `언어: ${detail.language || EMPTY}`,
            `페이지 수: ${detail.pageCount ?? EMPTY}`,
            `상세 출판사: ${detail.publisher || EMPTY}`,
            `에디션: ${detail.edition || EMPTY}`,
            `표지 이미지: ${detail.coverImageUrl || EMPTY}`,
        );
    }

    return lines.join("\n");
}
