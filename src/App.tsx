import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagementApp from "./components/user/UserManagementApp";
import { setupMock } from "./mocks/api";
import ProtectedRoute from "./ProtectedRoot";
import MenuScreen from "./components/MenuScreen";
import UserDetailScreen from "./components/user/UserDetailScreen";
import UserListScreen from "./components/user/UserListScreen";
import UserEditScreen from "./components/user/UserEditScreen";
import LoginScreen from "./components/LoginScreen";

setupMock();

function App() {
  return (
    <>
        <LoginScreen />
    </>
  );
}

export default App;
