// 과제 3번. 화면의 상태를 DOM이 아니라 React의 state로 관리한다 7개의 useState 생성

import { fetchBooks } from "./api/bookApi.js";


import { useEffect, useState } from "react";	// 과제 4번. useEffect 추가
import "./style.css";

import BookTable from "./components/BookTable.jsx";	// 과제 5번. 도서 목록

import BookForm from "./components/BookForm.jsx";	// 과제 6번 파일
import { EMPTY_FORM } from "./lib/bookData.js";		// 과제 6번 파일

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
  const handleSubmit = () => {};
  const resetForm = () => {};
  const handleDelete = () => {};
  const handleDetail = () => {};


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
      onEdit={() => {}}
      onDelete={handleDelete}
      onDetail={handleDetail}
    />

    </div>
  );
}

export default App;
