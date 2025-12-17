// ============================================================================
// 型定義
// ============================================================================

export type UserState = User & AuthContextType;

export default interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  joinedDate: string;
  location: string;
  skills: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

export type Screen = 'login' | 'signup' | 'userList' | 'userDetail';