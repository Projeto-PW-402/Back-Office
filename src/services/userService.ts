import { User } from '@/models/User'

const API_URL = 'http://127.0.0.1:5000'

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL + '/user/get')
    if (!response.ok) throw new Error('Erro ao buscar usuários')
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

export const createUser = async (data: User) => {
  const response = await fetch(API_URL + '/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar usuário')
  }
  return response.json()
}

export const deleteUser = async (id: number) => {
  const response = await fetch(API_URL + `/user/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao remover usuário')
  }
  return response.json()
}
