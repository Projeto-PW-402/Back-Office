import { Auditoria } from '@/models/Auditoria'
const API_URL = 'http://127.0.0.1:5000'

export const fetchAuditorias = async () => {
  try {
    const response = await fetch(API_URL + '/auditoria/get')
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

export const editAuditoria = async (id: number, data: Auditoria) => {
  const response = await fetch(API_URL + `/auditoria/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao editar auditoria')
  }
  return response.json()
}
