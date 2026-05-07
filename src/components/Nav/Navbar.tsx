import { useState } from 'react';
import { Search } from '../Search';
import { Filter } from '../Filter';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { count } = useCart();
  const handleProduct = () => {
    navigate('/add-product');
  };

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-8 py-3 sm:py-4 border-b border-gray-100 dark:border-neutral-800 gap-2 sm:gap-4 bg-white/90 dark:bg-neutral-950/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70">
      <Link
        to="/"
        aria-label="Ir al inicio"
        className="text-base sm:text-xl font-black tracking-tight uppercase shrink-0 text-black dark:text-white hover:opacity-80 transition-opacity"
      >
        Nutripro<span className="text-red-500">Sport</span>
      </Link>

      <Search />

      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 relative">
        <ThemeToggle />
        {user && (
          <button
            onClick={handleProduct}
            aria-label="Agregar producto"
            className="inline-flex items-center justify-center gap-1.5 h-10 w-10 sm:w-auto sm:px-4 sm:py-2 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:opacity-90 transition-opacity shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Agregar producto</span>
          </button>
        )}
        <button
          onClick={() => setFilterOpen((v) => !v)}
          aria-label="Filtros"
          className="inline-flex items-center justify-center gap-1.5 h-10 w-10 sm:w-auto sm:px-3 sm:py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-full border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          <span className="hidden sm:inline">Filtros</span>
        </button>

        <Link
          to="/cart"
          aria-label="Carrito"
          className="relative inline-flex items-center justify-center h-10 w-10 sm:w-auto sm:px-3 sm:py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-full border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005.414 17H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 sm:static sm:ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
              {count}
            </span>
          )}
        </Link>

        {filterOpen && <Filter handleFiler={setFilterOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
