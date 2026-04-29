import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: '/', element: <Home /> }],
  },
  { path: '/login', element: <Login /> },
  { path: '*', element: <div>Error</div> },
]);
