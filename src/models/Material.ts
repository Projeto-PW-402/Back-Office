export class Material {
  id = 0
  nome = ''
  tipo = ''
  descricao = ''
  images: any[] = []
  files: any[] = []
  dnome = ''
  dnif = ''
  dcontacto = ''
  demail = ''
  location = ''
  status = -1
  date = ''

  constructor(data?: Partial<Material>) {
    Object.assign(this, data)
  }
}
