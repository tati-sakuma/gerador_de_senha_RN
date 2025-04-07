export function gerarSenha(tamanho = 8) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
      senha += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return senha;
  }
  