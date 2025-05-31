import { User } from '@/models/User'

const API_URL = 'http://127.0.0.1:5000'

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL + '/user/get')
    if (!response.ok) throw new Error('Erro ao buscar usuários')
    const data = await response.json()
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw error
  }
}

export const fetchUserById = async (id: number) => {
  try {
    const response = await fetch(API_URL + `/user/${id}`)
    if (!response.ok) throw new Error('Erro ao buscar usuário')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    throw error
  }
}

export const fetchUserByEmail = async (email: string) => {
  try {
    const response = await fetch(API_URL + `/user?email=${email}`)
    if (!response.ok) return null
    const data = await response.json()

    if (data['status'] == 'Error') {
      return 'Error'
    }

    const user_email = data['email']
    const user = data['nome']
    const user_id = data['id']

    let dados = {
      email: user_email,
      user: user,
      id: user_id,
    }

    return dados
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    throw error
  }
}

export const updateUser = async (id: number, data: User) => {
  const response = await fetch(API_URL + `/user/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao atualizar usuário')
  }
  return response.json()
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
export const notifyUser = async (id: number) => {
  const response = await fetch(API_URL + '/user/notification/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
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
