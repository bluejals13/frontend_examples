/* ---------------------------------------------------------
   도서 API
   --------------------------------------------------------- */

import { BOOKS_URL, JSON_HEADERS } from "../config.js";

const DEFAULT_MESSAGES = {
    400: "입력한 값이 올바르지 않습니다.",
    404: "존재하지 않는 도서입니다.",
    409: "이미 등록된 ISBN 입니다.",
    500: "서버에서 오류가 발생했습니다.",
};

/**
 * 공통 HTTP 요청
 */
async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Spring Validation 오류가 있을 경우
        // errors 내용을 함께 보여줄 수 있도록 처리
        let message =
            errorData.message ??
            DEFAULT_MESSAGES[response.status] ??
            `요청에 실패했습니다. (${response.status})`;

        if (errorData.errors) {
            const validationMessages = Object.values(errorData.errors);

            if (validationMessages.length > 0) {
                message += ` ${validationMessages.join(", ")}`;
            }
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

/**
 * 전체 도서 조회
 */
export const fetchBooks = () =>
    request(BOOKS_URL);

/**
 * 도서 한 권 조회
 */
export const fetchBook = (id) =>
    request(`${BOOKS_URL}/${id}`);

/**
 * 도서 등록
 *
 * Spring BookDTO.Request와 맞는 구조:
 *
 * {
 *   title,
 *   author,
 *   isbn,
 *   price,
 *   publishDate,
 *   publisherId,
 *   detailRequest: {
 *      description,
 *      language,
 *      pageCount,
 *      publisher,
 *      coverImageUrl,
 *      edition
 *   }
 * }
 */
export const createBook = (book) =>
    request(BOOKS_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(book),
    });

/**
 * 도서 수정
 */
export const updateBook = (id, book) =>
    request(`${BOOKS_URL}/${id}`, {
        method: "PUT",
        headers: JSON_HEADERS,
        body: JSON.stringify(book),
    });

/**
 * 도서 삭제
 */
export const deleteBook = (id) =>
    request(`${BOOKS_URL}/${id}`, {
        method: "DELETE",
    });
