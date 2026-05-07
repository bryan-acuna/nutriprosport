import { useEffect, useState } from 'react';
import { useData } from '../../context';
import { useDebounce } from '@/hooks';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const debounced = useDebounce(search, 300);
  const { searchProduct } = useData();

  useEffect(() => {
    searchProduct(debounced);
  }, [debounced, searchProduct]);

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-auto">
      <div className="relative w-full">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Buscar productos..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-neutral-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-full focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default Search;
