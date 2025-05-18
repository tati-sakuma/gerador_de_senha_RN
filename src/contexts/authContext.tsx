import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { signIn, signUp } from "../services/auth/authService";
import api from "../utils/api";
import * as localStorage from "../utils/localStorage";

interface AuthContextProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (
    name: string,
    email: string,
    senha: string,
    confirmarSenha: string
  ) => Promise<any>;
  onLogin?: (email: string, senha: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

interface AuthenticateProps {
  token: string | null;
  authenticated: boolean | null;
}

//Tipando por causa do typescript
type AuthProviderProps = {
  children: ReactNode;
};

const TOKEN_KEY = "acess-token";

//Responsável por criar o contexto de Auth
export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthenticateProps>({
    token: null,
    authenticated: null,
  });

  //Responsável por pegar o token inicial
  useEffect(() => {
    const loadToken = async () => {
      const loadToken = async () => {
        const token = await localStorage.getStorageItem(TOKEN_KEY);
        //adiciona ao header, se existir
        if (token) {
          api.defaults.headers.common["Authorization"] = `${token}`;

          setAuthState({
            token: token,
            authenticated: true,
          });
        }
      };
    };

    loadToken();
  }, []);

  const register = async (
    name: string,
    email: string,
    senha: string,
    confirmarSenha: string
  ) => {
    try {
      await signUp({ name, email, senha, confirmarSenha });
    } catch (error) {
      console.error("Erro ao registrar", error);
      throw error;
    }
  };

  const login = async (email: string, senha: string) => {
    try {
      const result = await signIn({email, senha});

      setAuthState({
        authenticated: true,
        token: result.token,
      });

      // todas as requisições que forem feitas depois disso vão ter o token no header
      api.defaults.headers.common["Authorization"] = `${result.token}`;

      //salva o token no localStorage
      await localStorage.setStorageItem(TOKEN_KEY, result.token);

      return result;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeStorageItem(TOKEN_KEY);
    api.defaults.headers.common["Authorization"] = "";
    setAuthState({
      authenticated: null,
      token: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
