import { Material } from '@/models/Material'
const API_URL = 'http://127.0.0.1:5000'

export const fetchMaterials = async () => {
  try {
    const response = await fetch(API_URL + '/material/get')
    if (!response.ok) throw new Error('Erro ao buscar materiais')
    const data = await response.json()
    if (!data) {
      return []
    }
    return data
  } catch (error) {
    console.error('Erro ao buscar materiais:', error)
    throw error
  }
}

export const createMaterial = async (data: Material) => {
  const response = await fetch(API_URL + '/material/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar material')
  }
  return response.json()
}

export const updateMaterial = async (id: number, data: Material) => {
  const response = await fetch(API_URL + `/material/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao editar material')
  }
  return response.json()
}
