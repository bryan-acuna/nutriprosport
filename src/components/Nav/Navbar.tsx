import { useState } from 'react';
import { Search } from '../Search';
import { useTheme } from '../../context';
import { Filter } from '../Filter';

const Navbar = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="relative flex items-center justify-between px-4 sm:px-8 py-4 border-b border-gray-100 dark:border-neutral-800 gap-4 bg-white dark:bg-neutral-950">
      <div className="text-lg sm:text-xl font-black tracking-tight uppercase shrink-0 text-black dark:text-white">
        Nutripro<span className="text-red-500">Sport</span>
      </div>

      <Search />

      <div
        className="flex items-center
                  gap-2 sm:gap-4 shrink-0 relative"
      >
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex items-center justify-center w-9 h-9 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-full border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500"
        >
          {theme === 'dark' ? (
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
                d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          ) : (
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
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => setFilterOpen((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-3 py-2 rounded-full border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500"
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
          Filtros
        </button>

        {filterOpen && <Filter handleFiler={setFilterOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
