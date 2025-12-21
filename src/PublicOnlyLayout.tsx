// ProtectedLayout.js
import { Outlet } from 'react-router-dom';

const PublicOnlyLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicOnlyLayout;
