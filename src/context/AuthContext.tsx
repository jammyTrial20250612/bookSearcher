// ============================================================================
// 認証コンテキスト
// ============================================================================
import { useState, useContext, createContext, type ReactNode } from "react";
import type User from "../types";
import type { AuthContextType } from "../types";
import { mockUsers } from "../mocks/Users";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = async (email: string, password: string): Promise<boolean> => {
    // 簡易的な認証ロジック
    const user = users.find(u => u.email === email);
    if (user && password === 'password123') {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // メールアドレスの重複チェック
    if (users.some(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: String(users.length + 1),
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: 'よろしくお願いします！',
      role: 'Member',
      joinedDate: new Date().toISOString().split('T')[0],
      location: '未設定',
      skills: []
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

