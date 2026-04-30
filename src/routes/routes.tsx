import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AddProduct } from '@/pages/AddProduct';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: '/add-product', element: <AddProduct /> }],
      },
    ],
  },

  { path: '*', element: <div>Error</div> },
]);
