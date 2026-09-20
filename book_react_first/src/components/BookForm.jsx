
// 과제 6번. 폼 제어 컴포넌트 실제 렌더 부분

import MessageBox from "./MessageBox.jsx";
import BookFormField from "./BookFormField";
function BookForm({form, isEditing, message, onChange, onSubmit, onCancel, containerRef}) {


  return (
    <div className="form-card">
      <form onSubmit={onSubmit}>
        
        {/* 1. 기본 정보 (제목, 저자, ISBN, 가격, 출판일) */}
        <div className="form-section">
          <div className="form-section-title">📌 기본 정보</div>
          <div className="field-grid">
            <BookFormField label="제목" name="title" required value={form.title} onChange={onChange} />
            <BookFormField label="저자" name="author" required value={form.author} onChange={onChange} />
            <BookFormField label="ISBN" name="isbn" required value={form.isbn} onChange={onChange} />
            <BookFormField label="가격" name="price" type="number" value={form.price} onChange={onChange} />
            <BookFormField label="출판일" name="publishDate" type="date" value={form.publishDate} onChange={onChange} />
          </div>
        </div>

        {/* 2. 출판사 정보 (출판사) */}
        <div className="form-section">
          <div className="form-section-title">🏢 출판사 정보</div>
          <div className="field-grid">
            <BookFormField label="출판사" name="publisher" value={form.publisher} onChange={onChange} />
          </div>
        </div>

        {/* 3. 상세 정보 (언어, 페이지 수, 에디션, 표지 URL, 설명) */}
        <div className="form-section">
          <div className="form-section-title">📖 상세 정보</div>
          <div className="field-grid">
            <BookFormField label="언어" name="language" value={form.language} onChange={onChange} />
            <BookFormField label="페이지 수" name="pageCount" type="number" value={form.pageCount} onChange={onChange} />
            <BookFormField label="에디션" name="edition" value={form.edition} onChange={onChange} />
            <BookFormField label="표지 이미지 URL" name="coverImageUrl" type="url" value={form.coverImageUrl} onChange={onChange} fullWidth />
            <BookFormField label="설명" name="description" type="textarea" value={form.description} onChange={onChange} fullWidth />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="button-group">
          <button type="submit">{isEditing ? "도서 수정" : "도서 등록"}</button>
          {isEditing && (
            <button type="button" onClick={onCancel}>취소</button>
          )}
        </div>

      </form>
    </div>
  );
}

export default BookForm;
