import * as passwordResource from './passwordResource';
import { SenhaDTO } from "./passwordResource";


export function gerarSenha(tamanho = 8) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    senha += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return senha;
}

export const savePassword = async (nomeSenha: string, senha: string) => {
  await passwordResource.createPassword(nomeSenha, senha)
};

export async function getUserPasswords(): Promise<SenhaDTO[]> {
  // Se a API já retorna um array de SenhaDTO, recebemos direto:
  const items = await passwordResource.getUserPasswords();
  return items;
}

export async function deletePassword(senhaId: string) {
  await passwordResource.deletePassword(senhaId)
}
