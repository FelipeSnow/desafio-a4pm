/* eslint-disable react/jsx-no-constructed-context-values */
import { UserModel, useUserDatabase } from "@/database/useUser";
import { router } from "expo-router";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContext {
  user: UserModel | undefined;
  setUser: (user: UserModel) => void;
  login: (login: string, password: string) => void;
  logout: () => void;
}

const Context = createContext<AuthContext>({} as AuthContext);

interface ChildrenProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<UserModel>();
  const { findByLogin } = useUserDatabase();

  const login = async (login: string, password: string) => {
    const user = await findByLogin(login, password);

    if (!user) {
      return alert("Usuário ou senha inválidos");
    }

    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };

  useEffect(() => {
    if (user?.id) {
      router.push("/recipes");
    } else {
      router.push("/");
    }
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
