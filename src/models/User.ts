export class User {
  id: number = 0
  nome: string = ''
  morada: string = ''
  dataNascimento: string = ''
  especialidade: string = ''
  email: string = ''
  telemovel: number = 0
  listaAuditorias: number[] = []
  allowed: boolean = true

  constructor(data?: Partial<User>) {
    Object.assign(this, data)
  }
}
