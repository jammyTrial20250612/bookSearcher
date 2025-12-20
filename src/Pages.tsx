import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { useEffect } from "react";
import { useLocation, Routes,Route } from "react-router-dom";
import UserManagementApp from "./components/user/UserManagementApp";
import axios from "axios";
import { setupMock } from "./mocks/api";
import ProtectedRoute from "./ProtectedRoot";
import MenuScreen from "./components/MenuScreen";
import UserDetailScreen from "./components/user/UserDetailScreen";
import UserListScreen from "./components/user/UserListScreen";
import UserEditScreen from "./components/user/UserEditScreen";
import LoginScreen from "./components/LoginScreen";
import Menu from "./components/Menu.tsx";
import SignupScreen from "./components/SignupScreen.tsx";
import { useAuth } from "./context/AuthContext";

setupMock();

const Pages=()=>{
  const location = useLocation();
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
    });
  }, []);

  const handleLoginSuccess=()=>{
    console.log("login success");
  };

  const { selectedUserId } = useAuth();
  if(selectedUserId!==null){
    selectedUserId
  } else {

  }

  useEffect(()=>{
    console.log("change url");
    console.log(selectedUserId);
  },[location.search])

  return (
    <>
            <Routes>
              <Route path="/" element={<App />}/>
              <Route path="/signup" element={<SignupScreen/>}/>
              <Route path="/menu" element={<ProtectedRoute><MenuScreen /></ProtectedRoute>}/>
              <Route path="/users" element={<UserManagementApp />}/>
              <Route path={`/users?id=${selectedUserId}`} element={<UserListScreen onSelectUser={()=>selectedUserId} onLogout={()=>{}}/>}/>
              {selectedUserId!==null ?<Route path={`/users/detail`} element={<UserDetailScreen userId={selectedUserId} onBack={()=>{}}/>}/>:<></>}
              <Route path="/user/edit" element={<UserEditScreen />}/>
            </Routes>
    </>
   );
}

export default Pages;
