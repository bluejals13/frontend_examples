function StudentTable({
  students,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  return (
    <div className="table-container">
      <h2>학생 목록</h2>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>학번</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>생년월일</th>
            <th>액션</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.studentNumber}</td>
              <td>{student.detail?.address ?? '-'}</td>
              <td>{student.detail?.phoneNumber ?? '-'}</td>
              <td>{student.detail?.email ?? '-'}</td>
              <td>{student.detail?.dateOfBirth ?? '-'}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(student)}
                >
                  수정
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(student.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
