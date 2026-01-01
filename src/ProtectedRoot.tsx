// ProtectedRoute.tsx
import React, { useEffect, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, currentUser, setCurrentUser } = useAuth();

  const authStatus = localStorage.getItem('auth');
  const storedUser = localStorage.getItem('loginUser');

  if (!isAuthenticated && authStatus === 'false' && storedUser === null) {
    // ログインしていなければリダイレクト
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
