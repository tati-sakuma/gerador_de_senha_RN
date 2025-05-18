import { SignUpDTO } from "./authResource";

export const getSignUpDTO = (data: SignUpDTO) => {
    return {
        name: data.name,
        email: data.email,
        senha: data.senha,
        confirmarSenha: data.confirmarSenha,
    };
};

export const getSigUpResponse = (data: any) => {
    return {
        name: data.name,
        email: data.email,
        senha: data.senha,
        confirmarSenha: data.confirmarSenha,
    };
};