// ============================================================================
// 認証コンテキスト
// ============================================================================
import {
  useState,
  useEffect,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import type User from "../types";
import type { AuthContextType } from "../types";
import type { Book } from "../types";
import { loadUsers } from "../mocks/storage";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useBook } from "./BookContext";
import type { UserFavorite } from "../types";

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
      localStorage.setItem("loginUser", JSON.stringify(user));
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
      books: [],
      password: password,
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem("loginUser", JSON.stringify(newUser));
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
    localStorage.setItem('auth', 'false');
    localStorage.removeItem('loginUser');
  };

  // // 画面遷移関数
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
    const sessionInfo = localStorage.getItem("auth");
    if(sessionInfo ==="true"){
      console.log("auth :",sessionInfo);
      return true;
    }else{
      console.log("not session");
      return false;
    }
  }

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    localStorage.setItem("currentScreen",'userDetail');
  };

  const navigateTo = useNavigate();
  const handleMoveToMyDetail = () => {
      navigateTo(`/loggedIn/users/detail?id=${currentUser?.id}`,{
      state: { currentUserId: currentUser?.id, from: "ownButton" }
    })
    if(currentUser){
    setSelectedUserId(currentUser.id);
    }
  }

  const { localBooks, favoriteBookTitle, setLocalBooks, setfavoriteBookTitle } = useBook();

  const handleAddFavorite = (
    title: string,
    author: string,
    itemCaption: string,
    mediumImageUrl: string,
    itemUrl: string,
    isbn: string,
    publisherName: string) => {

      if(currentUser != null){
        const newBook: Book = {
          id: localBooks.length + 1,
          title: title,
          itemUrl: itemUrl,
          imageUrl: mediumImageUrl,
          author: author,
          isbn: isbn,
          content: itemCaption,
          publisherName: publisherName
        }
        setLocalBooks([...localBooks, newBook]);
        console.log("Added favorite book:", newBook);
        localStorage.setItem("localBooks", JSON.stringify([...localBooks, newBook]));
        setfavoriteBookTitle([...favoriteBookTitle, title]);
        users.filter((u) => u.id === currentUser.id).forEach((u) => {
          u.books.push(newBook);
        })
        localStorage.setItem("mockUsers", JSON.stringify([...users]));

        const favoriteData:UserFavorite = {
          id: localBooks.length + 1,
          userId: currentUser.id,
          bookId: newBook.id,
          addedAt: new Date()
        }
        localStorage.setItem("favoriteData", JSON.stringify([favoriteData]));
      }  
  }

  const handleReadFavorite = () => {
    const storedFavorites = localStorage.getItem("favoriteData");
    if (storedFavorites) {
      const favoriteList: UserFavorite[] = JSON.parse(storedFavorites);
      return favoriteList;
    }
  };

  const handleRemoveFavorite = () => {};

  useEffect(() => {
    const storedLoginUser = localStorage.getItem('loginUser');
    setCurrentUser(storedLoginUser ? JSON.parse(storedLoginUser) : null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        login,
        signup,
        logout,
        showLogoutModal,
        openLogoutModal,
        selectedUserId,
        setSelectedUserId,
        checkLoggedIn,
        handleSelectUser,
        handleMoveToMyDetail,
        handleAddFavorite,
        handleReadFavorite,
        handleRemoveFavorite,
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