import { useState } from 'react'

const initialForm = {
  name: '',
  studentNumber: '',
  detailRequest: {
    address: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
  },
}

function StudentForm({ onSubmit, editingStudent, onCancel }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target

    if (
      ['address', 'phoneNumber', 'email', 'dateOfBirth'].includes(name)
    ) {
      setForm((prev) => ({
        ...prev,
        detailRequest: {
          ...prev.detailRequest,
          [name]: value,
        },
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await onSubmit(form)

    setForm(initialForm)
  }

  return (
    <div className="form-container">
      <h2>
        {editingStudent ? '학생 수정' : '학생 등록'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label>이름</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>학번</label>
            <input
              name="studentNumber"
              value={form.studentNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>주소</label>
            <input
              name="address"
              value={form.detailRequest.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>전화번호</label>
            <input
              name="phoneNumber"
              value={form.detailRequest.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={form.detailRequest.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>생년월일</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.detailRequest.dateOfBirth}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="button-group">
          <button type="submit">
            {editingStudent ? '수정' : '학생 등록'}
          </button>

          {editingStudent && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default StudentForm
