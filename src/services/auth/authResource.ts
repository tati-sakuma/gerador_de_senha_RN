import api from '../../utils/api';

export type SignUpDTO = {
    name: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

export const signIn = (email, senha) => {
    return api.post('/auth/signin', { 
        email, 
        senha,
    });
};

export const signUp = (data: SignUpDTO) => {
    return api.post('/auth/signup', data);
};

export const signOut = () => {
    return api.get('/auth/signout');
};