// ============================================================================
// 型定義
// ============================================================================

export type UserState = User & AuthContextType & UserContextType;

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
  password: string;
}

export interface UserContextType {
  user: User | null;
  updateUser: (user: User) => void;
  updateUserField: (field: keyof User, value: string) => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

export type Screen = 'login' | 'signup' | 'userList' | 'userDetail' | 'userEdit';

export interface LogoutConfirmationModalProps {
  isOpen: boolean;          // モーダルの表示状態
  onConfirm: () => void;    // 確認時のコールバック
  onCancel: () => void;     // キャンセル時のコールバック
  userName: string;         // 表示するユーザー名
}
