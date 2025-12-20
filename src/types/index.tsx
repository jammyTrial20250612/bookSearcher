// ============================================================================
// 型定義
// ============================================================================

export type UserState = User & AuthContextType & UserContextType;

export default interface User {
  id: number;
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
  // navigateTo: (screen: UserScreen, userId?: string) => void;
  showLogoutModal: boolean;
  openLogoutModal: () => void;
  // closeLogoutModal: () => void;
  // confirmLogout: () => void;
  selectedUserId: number | null;
  // currentScreen: UserScreen;
  // setCurrentScreen: (currentScreen:UserScreen)=>void;
  // loadLocalSession: ()=>void;
  setSelectedUserId: (selectedUserId: number | null)=>void;
}

export type UserScreen = 'menu' | 'login' | 'signup' | 'userList' | 'userDetail' | 'bookList' | 'bookSearch';

export interface LogoutConfirmationModalProps {
  isOpen: boolean;          // モーダルの表示状態
  onConfirm: () => void;    // 確認時のコールバック
  onCancel: () => void;     // キャンセル時のコールバック
  userName: string;         // 表示するユーザー名
}
