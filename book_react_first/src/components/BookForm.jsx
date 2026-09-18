
// 과제 6번. 폼 제어 컴포넌트 실제 렌더 부분

import MessageBox from "./MessageBox.jsx";

function BookForm({form, isEditing, message, onChange, onSubmit, onCancel, containerRef}) {


  return (
    <div ref={containerRef}>
      <form id="bookForm" onSubmit={onSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>저자:</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>가격:</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
          />
        </div>

        <div>
          <label>페이지 수:</label>
          <input
            type="number"
            name="pageCount"
            value={form.pageCount}
            onChange={onChange}
          />
        </div>

        <div>
          <label>출판일:</label>
          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={onChange}
          />
        </div>

        <div>
          <label>언어:</label>
          <input
            type="text"
            name="language"
            value={form.language}
            onChange={onChange}
          />
        </div>

        <div>
          <label>출판사:</label>
          <input
            type="text"
            name="publisher"
            value={form.publisher}
            onChange={onChange}
          />
        </div>

        <div>
          <label>에디션:</label>
          <input
            type="text"
            name="edition"
            value={form.edition}
            onChange={onChange}
          />
        </div>

        <div>
          <label>표지 이미지 URL:</label>
          <input
            type="url"
            name="coverImageUrl"
            value={form.coverImageUrl}
            onChange={onChange}
          />
        </div>

        <div>
          <label>설명:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </div>

        <div className="button-group">
          <button type="submit">
            {isEditing ? "도서 수정" : "도서 등록"}
          </button>

          {isEditing && (
            <button type="button" onClick={onCancel}>
              취소
            </button>
          )}
        </div>

        <MessageBox message={message} />
      </form>
    </div>
  );
}

export default BookForm;
