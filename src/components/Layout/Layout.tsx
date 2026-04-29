import { Outlet } from 'react-router-dom';
import { Navbar } from '../Nav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans transition-colors">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
