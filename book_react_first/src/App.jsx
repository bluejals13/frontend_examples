// 과제 3번. 화면의 상태를 DOM이 아니라 React의 state로 관리한다 7개의 useState 생성

import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
  fetchBook
} from "./api/bookApi.js";


import { useEffect, useState } from "react";	// 과제 4번. useEffect 추가
import "./style.css";

import BookTable from "./components/BookTable.jsx";	// 과제 5번. 도서 목록

import BookForm from "./components/BookForm.jsx";	// 과제 6번 파일
import { EMPTY_FORM, toRequest, toFormValues } from "./lib/bookData.js";		// 과제 6번 파일

import MessageBox from "./components/MessageBox";	// 과제 7번 파일


function App() {
  const [books, setBooks] = useState([]);			// 책
  const [form, setForm] = useState(EMPTY_FORM);	// 폼 데이터 , EMPTY_FORM
  const [editingId, setEditingId] = useState(null);	// 수정 null
  const [loading, setLoading] = useState(false);		// 로딩 false
  const [listError, setListError] = useState(null);		// 목록 에러 null
  const [message, setMessage] = useState(null);	// 메세지
  const [detailBook, setDetailBook] = useState(null);	// 상세 책 null


const isEditing = editingId !== null;		// 등록 / 수정 구분

// 과제 6번. 특정 수정 자료에 대한 제네릭을 통한 갱신
const handleChange = (event) => {
  const { name, value } = event.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};



  // 과제 4번. 도서 목록을 가져오는 코드 추가
  // 도서 목록 가져오기
  const loadBooks = async () => {
    setLoading(true);
    setListError(null);

    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      setListError(error.message);
    } finally {
      setLoading(false);
    }
  };


 // 처음 한 번 목록 가져오기
  useEffect(() => {
    loadBooks();
  }, []);

  // 성공 메시지 3초 후 제거
  useEffect(() => {
  if (!message || message.type !== "success") {
    return;
  }

  const timer = setTimeout(() => {
    setMessage(null);
  }, 3000);

  return () => {
    clearTimeout(timer);
  };
  }, [message]);



  // 과제 8~10에서 실제 코드로 변경

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
    const book = await fetchBookById(id);

    setEditingId(id);
    setForm(toFormValues(book));

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
    const book = await fetchBookById(id);

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
    setLoading(false);
  }
}



  return (
    <div>
      <h1>도서 관리 시스템</h1>

    <BookForm
      form={form}
      isEditing={editingId !== null}
      message={message}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={resetForm}
    />

    <BookTable
      books={books}
      loading={loading}
      error={listError}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onDetail={handleDetail}
    />

    </div>
  );
}

export default App;
