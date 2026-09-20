import { useEffect, useState } from "react";
import { fetchBooks, createBook, updateBook, deleteBook, fetchBookById } from "./api/bookApi.js";
import { EMPTY_FORM, toRequest, toFormValues } from "./lib/bookData.jsx";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    author: "",
    isbn: "",
    price: "",
    publishDate: "",
    publisherId: "",
    description: "",
    language: "",
    pageCount: "",
    detailPublisher: "",
    coverImageUrl: "",
    edition: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function collectBookData() {
    return {
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      price: form.price === "" ? null : Number(form.price),
      publishDate: form.publishDate || null,

      publisherId:
        form.publisherId === ""
          ? null
          : Number(form.publisherId),

      detailRequest: {
        description: form.description.trim(),
        language: form.language.trim(),
        pageCount:
          form.pageCount === ""
            ? null
            : Number(form.pageCount),
        publisher: form.detailPublisher.trim(),
        coverImageUrl: form.coverImageUrl.trim(),
        edition: form.edition.trim(),
      },
    };
  }

  function fillForm(book) {
    setForm({
      title: book.title ?? "",
      author: book.author ?? "",
      isbn: book.isbn ?? "",
      price: book.price ?? "",
      publishDate: book.publishDate ?? "",
      publisherId: book.publisher?.id ?? "",

      description: book.detail?.description ?? "",
      language: book.detail?.language ?? "",
      pageCount: book.detail?.pageCount ?? "",
      detailPublisher: book.detail?.publisher ?? "",
      coverImageUrl: book.detail?.coverImageUrl ?? "",
      edition: book.detail?.edition ?? "",
    });
  }

// 과제 8번. 폼 초기화
  function resetForm() {
    setForm(EMPTY_FORM); // 대문자로 수정
    setEditingId(null);
    setMessage(null);
  }

  // 과제 8번. 도서 등록/수정
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const requestData = toRequest(form);

      if (editingId) {
        await updateBook(editingId, requestData);
        setMessage({ type: "success", text: "도서가 성공적으로 수정되었습니다." });
      } else {
        await createBook(requestData);
        setMessage({ type: "success", text: "도서가 성공적으로 등록되었습니다." });
      }

      resetForm();
      await loadBooks();
    } catch (error) {
      setMessage({ type: "error", text: error.message }); // 객체 형태로 수정
    } finally {
      setLoading(false);
    }
  }

  // 도서 수정 모드 진입 (Form에 값 채우기)
  async function handleEdit(id) {
    try {
      const book = await fetchBook(id); // bookApi.js의 함수명과 일치하는지 확인

      setEditingId(id);
      setForm(toFormValues(book)); // fillForm 대신 변환 함수와 setForm 사용

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }

  // 과제 9번. 도서 삭제
  async function handleDelete(id) {
    if (!window.confirm("정말 이 도서를 삭제하시겠습니까?")) {
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      await deleteBook(id);
      setMessage({ type: "success", text: "도서가 삭제되었습니다." });
      
      // 삭제한 도서를 현재 폼에서 수정 중이었다면 폼 초기화
      if (editingId === id) {
        resetForm();
      }

      await loadBooks(); // 중복 호출 제거
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }

  // 과제 10번. 도서 상세 조회 (Alert)
  async function handleDetail(id) {
    setLoading(true);
    setMessage(null);

    try {
      const book = await fetchBook(id);

      const detail = [
        `제목: ${book.title ?? "-"}`,
        `저자: ${book.author ?? "-"}`,
        `ISBN: ${book.isbn ?? "-"}`,
        `가격: ${book.price == null ? "-" : `₩${book.price.toLocaleString()}`}`,
        `출판일: ${book.publishDate ?? "-"}`,
        "",
        `출판사 ID: ${book.publisher?.id ?? "-"}`,
        `출판사명: ${book.publisher?.name ?? "-"}`,
        "",
        `설명: ${book.detail?.description ?? "-"}`,
        `언어: ${book.detail?.language ?? "-"}`,
        `페이지 수: ${book.detail?.pageCount ?? "-"}`,
        `상세 출판사: ${book.detail?.publisher ?? "-"}`,
        `에디션: ${book.detail?.edition ?? "-"}`,
        `표지 이미지: ${book.detail?.coverImageUrl ?? "-"}`,
      ].join("\n");

      window.alert(detail);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false); // 상세 조회 완료 후 로딩 해제 추가
    }
  }

  return (
    <div className="app">
      <h1>도서 관리 시스템</h1>

      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <section className="form-container">
        <h2>
          {editingId ? "도서 수정" : "도서 등록"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>제목</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>저자</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ISBN</label>
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>가격</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>출판일</label>
              <input
                type="date"
                name="publishDate"
                value={form.publishDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>출판사 ID</label>
              <input
                type="number"
                name="publisherId"
                value={form.publisherId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>언어</label>
              <input
                name="language"
                value={form.language}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>페이지 수</label>
              <input
                type="number"
                name="pageCount"
                value={form.pageCount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>상세 출판사</label>
              <input
                name="detailPublisher"
                value={form.detailPublisher}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>에디션</label>
              <input
                name="edition"
                value={form.edition}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>표지 이미지 URL</label>
              <input
                type="url"
                name="coverImageUrl"
                value={form.coverImageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>설명</label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit">
              {editingId ? "도서 수정" : "도서 등록"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
              >
                취소
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="table-container">
        <h2>도서 목록</h2>

        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>저자</th>
                <th>ISBN</th>
                <th>가격</th>
                <th>출판일</th>
                <th>출판사</th>
                <th>액션</th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    등록된 도서가 없습니다.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>
                      {book.price == null
                        ? "-"
                        : `₩${book.price.toLocaleString()}`}
                    </td>
                    <td>{book.publishDate ?? "-"}</td>
                    <td>
                      {book.publisher?.name ?? "-"}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(book.id)}
                      >
                        수정
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(book.id)}
                      >
                        삭제
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDetail(book.id)}
                      >
                        상세
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
