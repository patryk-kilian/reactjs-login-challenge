import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import api from '../api/index';
import { useAuth } from './auth-context';

type UserContextTypes = {
  user: {
    username: string;
    firstName: string;
    lastName: string;
  } | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextTypes | null>(null);

export function useUser() {
  return useContext<UserContextTypes | null>(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { token } = useAuth()!;

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      try {
        const response = await api.get('/user');

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (token) {
      getUser();
    } else {
      setUser(null);
    }
  }, [token]);

  const value: UserContextTypes = {
    user,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
