import { Search as SearchIcon } from 'lucide-react';
import { useData } from '@/context';

const Search = () => {
  const { searchWord, searchProduct } = useData();

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-auto">
      <div className="relative w-full">
        <SearchIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
        <input
          onChange={(e) => searchProduct(e.target.value)}
          value={searchWord}
          type="text"
          placeholder="Buscar productos..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-neutral-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-full focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default Search;
