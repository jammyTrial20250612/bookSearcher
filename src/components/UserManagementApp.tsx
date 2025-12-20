// ============================================================================
// メインアプリケーション
// ============================================================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import UserDetailScreen from './UserDetailScreen';
import UserListScreen from "./UserListScreen"
import type { UserScreen } from '../types';

const UserManagementApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<UserScreen>('login');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();

  const handleLoginSuccess = () => {
    setCurrentScreen('userList');
  };

  const handleSignupSuccess = () => {
    setCurrentScreen('userList');
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentScreen('userDetail');
  };

  const handleBackToList = () => {
    setSelectedUserId(null);
    setCurrentScreen('userList');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('login');
  };

  if (!isAuthenticated) {
    return currentScreen === 'login' ? (
      <LoginScreen
        onSwitchToSignup={() => setCurrentScreen('signup')}
        onLoginSuccess={handleLoginSuccess}
      />
    ) : (
      <SignupScreen
        onSwitchToLogin={() => setCurrentScreen('login')}
        onSignupSuccess={handleSignupSuccess}
      />
    );
  }

  if (currentScreen === 'userDetail' && selectedUserId) {
    return <UserDetailScreen userId={selectedUserId} onBack={handleBackToList} />;
  }

  return <UserListScreen onSelectUser={handleSelectUser} onLogout={handleLogout} />;
};

export default UserManagementApp;
