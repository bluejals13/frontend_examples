// 과제 6번. 폼 제어 컴포넌트 책 정보


export const EMPTY_FORM = {
  title: "",
  author: "",
  isbn: "",
  price: "",
  pageCount: "",
  publishDate: "",
  language: "",
  publisher: "",
  edition: "",
  coverImageUrl: "",
  description: "",
};

export function toNumberOrNull(value) {
  return value === "" ? null : Number(value);
}

export function toRequest(form) {
  return {
    title: form.title,
    author: form.author,
    isbn: form.isbn,
    price: toNumberOrNull(form.price),
    pageCount: toNumberOrNull(form.pageCount),
    publishDate: form.publishDate || null,
    language: form.language,
    publisher: form.publisher,
    edition: form.edition,
    coverImageUrl: form.coverImageUrl,
    description: form.description,
  };
}

export function toFormValues(book) {
  return {
    title: book.title ?? "",
    author: book.author ?? "",
    isbn: book.isbn ?? "",
    price: book.price ?? "",
    pageCount: book.pageCount ?? "",
    publishDate: book.publishDate ?? "",
    language: book.bookDetail?.language ?? "",
    publisher: book.bookDetail?.publisher ?? "",
    edition: book.bookDetail?.edition ?? "",
    coverImageUrl: book.bookDetail?.coverImageUrl ?? "",
    description: book.bookDetail?.description ?? "",
  };
}
