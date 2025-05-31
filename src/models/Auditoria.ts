import type { Material } from './Material'

export class Auditoria {
  id = 0
  nome = ''
  tipo = ''
  descricao = ''
  images: any[] = []
  files: any[] = []
  materiais: { id: number; quantidade: number }[] = []
  dnome = ''
  dnif = ''
  dcontacto = ''
  demail = ''
  location = ''
  status = -1
  date = ''
  lat = ''
  lng = ''

  constructor(data?: Partial<Auditoria>) {
    Object.assign(this, data)
  }
}
