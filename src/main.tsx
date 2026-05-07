import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DataProvider } from './context/DataContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { CheckoutProvider } from './context/CheckoutContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <DataProvider>
          <CartProvider>
            <CheckoutProvider>
              <App />
            </CheckoutProvider>
          </CartProvider>
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
