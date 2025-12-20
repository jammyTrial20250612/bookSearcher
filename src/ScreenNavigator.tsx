import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import MenuScreen from "./components/MenuScreen";
import { useAuth } from "./context/AuthContext";
import type { UserScreen } from "./types";


const ScreenNavigator: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  function isPage(value: any): value is UserScreen { return ['login', 'signup', 'userList', 'userDetail'].includes(value); }


// 　 useEffect(()=>{
//     // ログイン成功時
//     localStorage.setItem('isLoggedIn', 'true');
//     const loadedScreen = localStorage.getItem("currentScreen");
//     if (isPage(loadedScreen)){
//     setloadedCurrentScreen(loadedScreen);
//     }
//     setCurrentScreen(loadedCurrentScreen);
//     console.log(loadedCurrentScreen);
//   },[ ])

    const handleLoginSuccess = () => {
    localStorage.setItem("currentScreen",'userList');
  };

  const handleSignupSuccess = () => {
    localStorage.setItem("currentScreen",'userList');
  };

//   const handleSelectUser = (userId: string) => {
//     setSelectedUserId(userId);
//     setCurrentScreen('userDetail');
//     localStorage.setItem("currentScreen",'userDetail');
//   };

//   const handleBackToList = () => {
//     setSelectedUserId(null);
//     setCurrentScreen('userList');
//     localStorage.setItem("currentScreen",'userList');
//   };

//   const handleLogout = () => {
//     logout();
//     setCurrentScreen('login');
//     localStorage.setItem("currentScreen",'login');
//     localStorage.setItem('isLoggedIn', 'false');
//   };

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

  // 画面のレンダリング
  switch (currentScreen) {
    case 'login':
      return <LoginScreen
        onSwitchToSignup={() => setCurrentScreen('signup')}
        onLoginSuccess={handleLoginSuccess}/>;
    // case 'signup':
    //   return <SignupScreen />;
    case 'menu':
      return <MenuScreen />;
    case 'userList':
      return <div>UserListScreen（前のコードを使用）</div>;
    case 'userDetail':
      return <div>UserDetailScreen（前のコードを使用）</div>;
    // case 'bookList':
    //   return <BookListScreen />;
    // case 'bookSearch':
    //   return <BookSearchScreen />;
    default:
      return <LoginScreen
        onSwitchToSignup={() => setCurrentScreen('signup')}
        onLoginSuccess={handleLoginSuccess}/>;
  }
};

export default ScreenNavigator;