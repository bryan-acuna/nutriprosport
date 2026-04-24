import { useState } from 'react';
import { useData } from '../../context';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const { searchProduct } = useData();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    searchProduct(value);
  };

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-auto">
      <div className="relative w-full">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Buscar productos..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>
    </div>
  );
};

export default Search;
