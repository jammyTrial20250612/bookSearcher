// ProtectedRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // ログインしていなければリダイレクト
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
