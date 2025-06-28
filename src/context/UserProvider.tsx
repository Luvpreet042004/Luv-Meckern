import { useEffect,useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { UserContext } from "@/context/UserContext";
import type { User } from "firebase/auth";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // ✅ Only render app when auth is ready
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser,loading }}>
      {children}
    </UserContext.Provider>
  );
};