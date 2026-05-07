import { useAuth } from '@/context';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-black dark:border-neutral-700 dark:border-t-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    // Preserve intended destination so we can redirect back after login.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
