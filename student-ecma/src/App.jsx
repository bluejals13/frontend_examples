import { useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import { useStudents } from './hooks/useStudents'

function App() {
  const {
    students,
    loading,
    error,
    addStudent,
    editStudent,
    removeStudent,
  } = useStudents()

  const [editingStudent, setEditingStudent] = useState(null)

  const handleSubmit = async (data) => {
    if (editingStudent) {
      await editStudent(editingStudent.id, data)
      setEditingStudent(null)
      return
    }

    await addStudent(data)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return
    }

    await removeStudent(id)
  }

  return (
    <main className="container">
      <h1>학생 관리 시스템</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <StudentForm
        onSubmit={handleSubmit}
        editingStudent={editingStudent}
        onCancel={() => setEditingStudent(null)}
      />

      <StudentTable
        students={students}
        loading={loading}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default App
