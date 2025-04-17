"use client";
import { createContext, useContext, useState } from "react";

interface User {
  email?: string;
  first_name: string;
  last_name: string;
}

interface UserContextValue {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return { user: ctx.user, setUser: ctx.setUser };
};
