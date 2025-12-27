// ============================================================================
// 認証コンテキスト
// ============================================================================
import { useState, useContext, createContext, type ReactNode } from "react";
import type { UserContextType } from "../types";
import { useAuth } from "./AuthContext";
import { saveUsers } from "../mocks/storage";
// import { mockUsers } from "../mocks/Users";

const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { users, setUsers } = useAuth();

  const UserFunc: UserContextType = {
    updateUser: (
      id: number,
      bio: string,
      role: string,
      location: string,
      skills: string[]
    ) => {
      setUsers(
        users.map((u) =>
          u.id === id
            ? { ...u, bio: bio, role: role, location: location, skills: skills }
            : u
        )
      );
      saveUsers(users);
    },
  };

  return (
    <UserContext.Provider value={{ ...UserFunc }}>
      {children}
    </UserContext.Provider>
  );
};
