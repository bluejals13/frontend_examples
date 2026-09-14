const API_BASE_URL = 'http://localhost:8081/api/students'

export async function getStudents() {
  const response = await fetch(API_BASE_URL)

  if (!response.ok) {
    throw new Error('학생 목록 조회 실패')
  }

  return response.json()
}

export async function getStudent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error('학생 조회 실패')
  }

  return response.json()
}

export async function createStudent(data) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('학생 등록 실패')
  }

  return response.json()
}

export async function updateStudent(id, data) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('학생 수정 실패')
  }

  return response.json()
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('학생 삭제 실패')
  }
}
