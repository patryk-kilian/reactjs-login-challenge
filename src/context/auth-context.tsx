import { ReactNode, createContext, useState, useContext } from 'react';
import api from '../api/index';
import Cookies from 'universal-cookie';

type LoginData = {
  username: string;
  password: string;
};

type AuthContextTypes = {
  token: string | null;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  errorMessage: string | null;
};

const AuthContext = createContext<AuthContextTypes | null>(null);

const cookies = new Cookies();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(cookies.get('token'));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const login = async (loginData: LoginData) => {
    try {
      setLoading(true);

      const response = await api.post('/login', {
        username: loginData.username,
        password: loginData.password,
      });

      setToken(response.data.token);
      cookies.set('token', response.data.token);
      setLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.response.data);
      setLoading(false);
    }
  };

  const logout = () => {
    cookies.remove('token');
    setToken(null);
  };

  const value: AuthContextTypes = {
    token,
    login,
    logout,
    isLoading,
    errorMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
