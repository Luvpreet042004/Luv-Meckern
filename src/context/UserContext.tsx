import { createContext, useContext } from "react";
import type { User } from "firebase/auth";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useUser = () => useContext(UserContext);