// 과제 5번. 도서 목록을 표로 보여주는 컴포넌트 bookTable.jsx 생성

function BookTable({ books, loading, error, onEdit, onDelete, onDetail }) {


  if (error) {
    return (
      <table>
        <tbody>
          <tr>
            <td>{error}</td>
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
        {loading && (
          <tr>
            <td colSpan="7">로딩 중...</td>
          </tr>
        )}

        {!loading && books.length === 0 && (
          <tr>
            <td colSpan="7">등록된 도서가 없습니다.</td>
          </tr>
        )}

        {!loading &&
          books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                {book.price != null
                  ? `₩${Number(book.price).toLocaleString()}`
                  : "-"}
              </td>
              <td>{book.pageCount ?? "-"}</td>
              <td>{book.publishDate ?? "-"}</td>

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
          ))}
      </tbody>
    </table>
  );
}

export default BookTable;
