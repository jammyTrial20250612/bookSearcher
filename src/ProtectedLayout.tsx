// ProtectedLayout.js
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedLayout = () => {
  const { checkLoggedIn } = useAuth();
  checkLoggedIn();


  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
