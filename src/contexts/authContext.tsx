import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { signIn, signOut, signUp } from "../services/auth/authService";
import api from "../utils/api";
import * as localStorage from "../utils/localStorage";

interface AuthContextProps {}

interface AuthenticateProps {
  token: string | null;
  authenticated: boolean | null;
}

//Tipando por causa do typescript
type AuthProviderProps = {
  children: ReactNode;
};

const TOKEN_KEY = "acess-token";

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthenticateProps>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const loadToken = async () => {
        const token = await localStorage.getStorageItem(TOKEN_KEY);

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
    password: string,
    confirmPassword: string
  ) => {
    try {
      await signUp({ name, email, password, confirmPassword });
    } catch (error) {
      console.error("Erro ao registrar", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn(email, password);

      setAuthState({
        authenticated: true,
        token: result.token,
      });

      // todas as requisições que forem feitas depois disso vão ter o token no header
      api.defaults.headers.common["Authorization"] = `${result.token}`;

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
