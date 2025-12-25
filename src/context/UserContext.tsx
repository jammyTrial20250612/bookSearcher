// ============================================================================
// 認証コンテキスト
// ============================================================================
import { useState, useContext, createContext, type ReactNode } from "react";
import type User from "../types";
import type { UserContextType } from "../types";
import { useAuth } from "./AuthContext";
// import { mockUsers } from "../mocks/Users";

const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [users, setUsers] = useStatenewUser<User[]>(mockUsers);
  const loginUser = useAuth();
  const [user, setUser] = useState<User | null>(null);

  // // ユーザー全体を更新
  // const newUser: User = {
  //     id: String(users.length + 1),
  //     email,
  //     name,
  //     avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
  //     bio: 'よろしくお願いします！',
  //     role: 'Member',
  //     joinedDate: new Date().toISOString().split('T')[0],
  //     location: '未設定',
  //     skills: [],
  //     password: "default000"
  //   };



  // const updateUser = (newUser: User) => {
  //   setUser(newUser);
  // };
  
//   const login = async (email: string, password: string): Promise<boolean> => {
//     // 簡易的な認証ロジック
//     const user = users.find(u => u.email === email);
//     const userPassword = users.find(p => p.password === password);
//     if (user && userPassword) {
//       setCurrentUser(user);
//       setIsAuthenticated(true);
//       return true;
//     }
//     return false;
//   };

//   const signup = async (email: string, password: string, name: string): Promise<boolean> => {
//     // メールアドレスの重複チェック
//     if (users.some(u => u.email === email)) {
//       return false;
//     }

    // const newUser: User = {
    //   id: String(users.length + 1),
    //   email,
    //   name,
    //   avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    //   bio: 'よろしくお願いします！',
    //   role: 'Member',
    //   joinedDate: new Date().toISOString().split('T')[0],
    //   location: '未設定',
    //   skills: [],
    //   password: "default000"
    // };

    // export interface UserContextType {
    //   user: User | null;
    //   updateUser: (user: User) => void;
    //   updateUserField: (field: keyof User, value: string) => void;
    // }
    const UserFunc: UserContextType = {
      user : user,
      updateUser: () => {
        if(loginUser.currentUser != null){
          setUser({
          id: loginUser.currentUser?.id,
          email: loginUser.currentUser?.email,
          name: loginUser.currentUser?.name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginUser.currentUser?.name}`,
          bio: loginUser.currentUser?.bio,
          role: loginUser.currentUser?.role,
          joinedDate: new Date().toISOString().split('T')[0],
          location: loginUser.currentUser?.role,
          skills: loginUser.currentUser?.skills,
          books: loginUser.currentUser?.books,
          password: "secret, no password"
          });
        };
      },
      updateUserField: (field: keyof User, value: string)=>{
        setUser(prev => prev ? { ...prev, [field]: value } : null);
      }
    }
    
  return (
    <UserContext.Provider value={{ ...UserFunc }}>
      {children}
    </UserContext.Provider>
  );
};




