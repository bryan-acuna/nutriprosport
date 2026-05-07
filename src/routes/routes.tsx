import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AddProduct } from '@/pages/AddProduct';
import { Cart } from '@/pages/Cart';
import { Address, Payment } from '@/pages/Checkout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Product } from '@/pages/Product';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout/address', element: <Address /> },
      { path: '/checkout/payment', element: <Payment /> },
      { path: '/login', element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: '/add-product', element: <AddProduct /> }],
      },
    ],
  },

  { path: '*', element: <div>Error</div> },
]);
