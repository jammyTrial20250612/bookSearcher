// PublicOnlyRoute.js
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import React, { type JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PublicOnlyRoute:React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/loggedIn/users" replace />;
  } 

  return children;
};

export default PublicOnlyRoute;
