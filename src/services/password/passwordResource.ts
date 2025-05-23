import api from "../../utils/api";

export type SenhaDTO = {
  id: string
  nome: string
  nomeSenha: string
  senha: string
}

export async function createPassword(nomeSenha: string, senha: string) {
  try {
    await api.post('/senha', {
      nomeSenha,
      senha
    })
  } catch (error) {
    throw error
  }
}

export async function getUserPasswords() {
  try {
    const { data } = await api.get('/senha/senhas')

    return data
  } catch (error) {
    throw error
  }
}

export async function deletePassword(idSenha: string) {
  try {
    await api.delete(`/senha/${idSenha}`)
  } catch (error) {
    throw error
  }
}
