import { useCallback, useEffect, useState } from 'react'
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../api/studentApi'

export function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getStudents()
      setStudents(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const addStudent = async (data) => {
    const created = await createStudent(data)
    setStudents((prev) => [...prev, created])
  }

  const editStudent = async (id, data) => {
    const updated = await updateStudent(id, data)

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? updated : student
      )
    )
  }

  const removeStudent = async (id) => {
    await deleteStudent(id)

    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    )
  }

  useEffect(() => {
    loadStudents()
  }, [loadStudents])

  return {
    students,
    loading,
    error,
    loadStudents,
    addStudent,
    editStudent,
    removeStudent,
  }
}
