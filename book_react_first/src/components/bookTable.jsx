// 과제 5번. 도서 목록을 표로 보여주는 컴포넌트 BookTable.jsx

function BookTable({ books, loading, error, onEdit, onDelete, onDetail }) {
  // 에러 발생 시 처리
  if (error) {
    return (
      <table id="bookTable">
        <tbody>
          <tr>
            <td colSpan="7" style={{ color: "red", textAlign: "center" }}>
              {error}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table id="bookTable">
      <thead>
        <tr>
          <th>제목</th>
          <th>저자</th>
          <th>ISBN</th>
          <th>가격</th>
          <th>페이지 수</th>
          <th>출판일</th>
          <th>관리</th>
        </tr>
      </thead>

      <tbody>
        {/* 1. 로딩 중일 때 */}
        {loading && (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              로딩 중...
            </td>
          </tr>
        )}

        {/* 2. 데이터가 없을 때 */}
        {!loading && (!books || books.length === 0) && (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              등록된 도서가 없습니다.
            </td>
          </tr>
        )}

        {/* 3. 데이터가 존재할 때 렌더링 */}
        {!loading &&
          books &&
          books.map((book) => {
            // pageCount는 detail 객체 내부에 존재할 수 있으므로 옵셔널 체이닝 처리
            const pageCountStr =
              book.detail?.pageCount ?? book.pageCount ?? "-";

            return (
              <tr key={book.id}>
                <td>{book.title || "-"}</td>
                <td>{book.author || "-"}</td>
                <td>{book.isbn || "-"}</td>
                <td>
                  {book.price != null
                    ? `₩${Number(book.price).toLocaleString()}`
                    : "-"}
                </td>
                <td>{pageCountStr}</td>
                <td>{book.publishDate || "-"}</td>

                <td>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => onEdit(book.id)}
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete(book.id)}
                  >
                    삭제
                  </button>

                  <button
                    type="button"
                    className="detail-btn"
                    onClick={() => onDetail(book.id)}
                  >
                    상세
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default BookTable;