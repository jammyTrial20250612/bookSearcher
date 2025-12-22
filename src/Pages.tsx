import "./index.css";
import App from "./App.tsx";
import { useState, useEffect } from "react";
import { useLocation, Routes,Route } from "react-router-dom";
import axios from "axios";
import { setupMock } from "./mocks/api";
import ProtectedRoute from "./ProtectedRoot";
import MenuScreen from "./components/MenuScreen";
import UserDetailScreen from "./components/user/UserDetailScreen";
import SignupScreen from "./components/SignupScreen.tsx";
import { useAuth } from "./context/AuthContext";
import ProtectedLayout from "./ProtectedLayout.tsx";
import PublicOnlyRoute from "./PublicOnlyRoute.tsx";
import PublicOnlyLayout from "./PublicOnlyLayout.tsx";
import BookSearch from "./components/books/BookSearch.tsx";
import BookAPI from "./components/books/BookAPI.tsx";
import UserListScreen from "./components/user/UserListScreen.tsx";

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
  }

  useEffect(()=>{

  },[location.search])

  return (
    <>
    <div className="min-h-screen overflow-y-scroll">
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
                <Route path="/loggedIn/menu" element={<MenuScreen />}/>
                <Route path="/loggedIn/books" element={<BookSearch
                  reviewInfo={[{ id: 1, userId: 4, userName: "Mike", review: "森の描写が美しかった" }]} onLogout={() =>{}}
                />}/>
                <Route path="/loggedIn/users" element={<UserListScreen />}/>
                {selectedUserId!==null ?<Route path={`/loggedIn/users/detail`} element={<UserDetailScreen />}/>:<></>}
                <Route path="/loggedIn/api" element={<BookAPI />}/>
              </Route>
            </Routes>
      </div>
    </>
   );
}

export default Pages;
