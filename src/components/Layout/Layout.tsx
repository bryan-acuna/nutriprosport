import { Outlet } from 'react-router-dom';
import { Navbar } from '../Nav';
import CartToast from '../CartToast/CartToast';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans transition-colors">
      <Navbar />
      <Outlet />
      <CartToast />
    </div>
  );
};

export default Layout;
