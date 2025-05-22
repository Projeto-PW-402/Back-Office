export class Material {
  id = 0
  nome = ''
  tipo = ''
  descricao = ''
  quant = 0
  preco = 0

  constructor(data?: Partial<Material>) {
    Object.assign(this, data)
  }
}
