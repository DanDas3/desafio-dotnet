import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Auth/Auth";
import { message } from "antd";
import { RoutesPath } from "../utils/constants";
import { PropsChildrenComponent } from "../types/types";

export type GlobalContent = {
  authenticated: boolean;
  loading?: boolean;
  makeLogin: (
    emailOrUsername: string,
    emailOrUsernamePassword: string
  ) => void;
  logout: () => void;
};

export const AuthContext = createContext<GlobalContent>({
  authenticated: false,
  loading: false,
  makeLogin: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsChildrenComponent) => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [loading, setLoading] = useState(true);
  const [statusLogged, setStatusLogged] = useState(false);

  const makeLogin = async (
    emailOrUsername: string,
    emailOrUsernamePassword: string
  ) => {
    try {
      
      const { token } = await login({
        username: emailOrUsername,
        password: emailOrUsernamePassword
      }).unwrap();
      setLoading(isLoading)
      localStorage.setItem('authToken', token);
      setStatusLogged(true);
      message.success('Login bem-sucedido!');
      navigate(RoutesPath.CATEGORIAS);
    } catch (error) {
      message.success('Erro ao realizar login!');
      console.error(error)      
    }
  };
  const logout = () => {
    setStatusLogged(false);
    message.success('Logout bem-sucedido!');
  };
  return (
    <AuthContext.Provider
      value={{
        authenticated: statusLogged,
        loading,
        makeLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
