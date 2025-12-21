import "./index.css";
import App from "./App.tsx";
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
import SignupScreen from "./components/SignupScreen.tsx";
import { useAuth } from "./context/AuthContext";
import ProtectedLayout from "./ProtectedLayout.tsx";
import PublicOnlyRoute from "./PublicOnlyRoute.tsx";
import PublicOnlyLayout from "./PublicOnlyLayout.tsx";

setupMock();

const Pages=()=>{
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
    });
  }, []);

  const { selectedUserId } = useAuth();
  if(selectedUserId!==null){
    selectedUserId
  } else {

  }

  useEffect(()=>{
  },[location.search])

  return (
    <>
            <Routes>
              <Route
              element={<PublicOnlyRoute><PublicOnlyLayout/></PublicOnlyRoute>}>
                <Route path="/" element={<App />}/>
                <Route path="/signup" element={<SignupScreen/>}/>
              </Route>
              <Route
                path="/loggedIn"
                element={<ProtectedRoute><ProtectedLayout/></ProtectedRoute>}
              >
                <Route path="/loggedIn/menu" element={<ProtectedRoute><MenuScreen /></ProtectedRoute>}/>
                <Route path="/loggedIn/users" element={<UserManagementApp />}/>
                {/* <Route path={`/users?id=${selectedUserId}`} element={<UserListScreen onSelectUser={()=>selectedUserId} onLogout={()=>{}}/>}/> */}
                {selectedUserId!==null ?<Route path={`/loggedIn/users/detail`} element={<UserDetailScreen userId={selectedUserId}/>}/>:<></>}
                {/* <Route path="/user/edit" element={<UserEditScreen />}/> */}
              </Route>
            </Routes>
    </>
   );
}

export default Pages;
