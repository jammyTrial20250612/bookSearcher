// ============================================================================
// メインアプリケーション
// ============================================================================

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginScreen from '../LoginScreen';
import SignupScreen from '../SignupScreen';
import UserDetailScreen from './UserDetailScreen';
import UserListScreen from "./UserListScreen"
import type { UserScreen } from '../../types';

const UserManagementApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<UserScreen>('login');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { isAuthenticated, logout } = useAuth();
  // const [loadedCurrentScreen, setloadedCurrentScreen]=useState<UserScreen>("login");
  // function isPage(value: any): value is UserScreen { return ['login', 'signup', 'userList', 'userDetail'].includes(value); }

  useEffect(()=>{
    localStorage.setItem('isLoggedIn', 'true');
    // const loadedScreen = localStorage.getItem("currentScreen");
    // if (isPage(loadedScreen)){
    // setloadedCurrentScreen(loadedScreen);
    // }
    // console.log(loadedCurrentScreen);
  },[ ])

  const handleLoginSuccess = () => {
    localStorage.setItem("currentScreen",'userList');
  };

  const handleSignupSuccess = () => {
    localStorage.setItem("currentScreen",'userList');
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    localStorage.setItem("currentScreen",'userDetail');
  };

  const handleBackToList = () => {
    setSelectedUserId(null);
    localStorage.setItem("currentScreen",'userList');
  };

  const handleLogout = () => {
    logout();
    localStorage.setItem("currentScreen",'login');
    localStorage.setItem('isLoggedIn', 'false');
  };

  if (!isAuthenticated) {
    return currentScreen === 'login' ? (
      <LoginScreen/>
    ) : (
      <SignupScreen
        onSwitchToLogin={() => setCurrentScreen('login')}
        onSignupSuccess={handleSignupSuccess}
      />
    );
  }

  // if (currentScreen === 'userDetail' && selectedUserId) {
  //   return <UserDetailScreen userId={selectedUserId} onBack={handleBackToList} />;
  // }

  return <UserListScreen onSelectUser={handleSelectUser} onLogout={handleLogout} />;
};

export default UserManagementApp;
