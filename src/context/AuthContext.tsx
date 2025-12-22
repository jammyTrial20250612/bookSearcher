// ============================================================================
// 認証コンテキスト
// ============================================================================
import {
  useState,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import type User from "../types";
import type { AuthContextType } from "../types";
import { loadUsers } from "../mocks/storage";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(loadUsers());
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // 簡易的な認証ロジック
    const user = users.find((u) => u.email === email);
    const userPassword = users.find((p) => p.password === password);
    if (user && userPassword) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    // メールアドレスの重複チェック
    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: users.length + 1,
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: "よろしくお願いします！",
      role: "Member",
      joinedDate: new Date().toISOString().split("T")[0],
      location: "未設定",
      skills: [],
      password: "default000",
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userSession");
    sessionStorage.clear();

    const logoutLog = {
      userId: currentUser?.id,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    console.log("Logout:", logoutLog);

    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    setSelectedUserId(null);
  };

  // // 画面遷移関数
  // const navigateTo = (screen: UserScreen, userId?: string) => {
  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };
  const confirmLogout = () => {
    logout();
  };

  const checkLoggedIn=()=>{
    const sessionInfo = sessionStorage.getItem("auth");
    if(sessionInfo ==="true"){
      console.log("auth :",sessionInfo);
      console.log("isAuthenticated :",isAuthenticated)
      return true;
    }else{
      console.log("not session");
      console.log("isAuthenticated :",isAuthenticated);
      return false;
    }
  }

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    localStorage.setItem("currentScreen",'userDetail');
  };

  const handleLogout = () => {
    logout();
    localStorage.setItem("currentScreen",'login');
    localStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('auth', 'false');
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        users,
        login,
        signup,
        logout,
        showLogoutModal,
        openLogoutModal,
        selectedUserId,
        setSelectedUserId,
        checkLoggedIn,
        handleSelectUser,
        handleLogout
      }}
    >
      {children}

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={closeLogoutModal}
        userName={currentUser?.name || "ユーザー"}
      />
    </AuthContext.Provider>
  );
};
