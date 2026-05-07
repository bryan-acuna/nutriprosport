import { useData, type SortBy } from '@/context';
import { useState } from 'react';

interface FilterProps {
  onClose: (close: boolean) => void;
}

const sortOptions: Exclude<SortBy, null>[] = ['Precio', 'Nombre'];

const Filter = ({ onClose }: FilterProps) => {
  const { searchWord, sortBy, setSortBy, searchProduct } = useData();
  const [sortSelected, setSortSelected] = useState<SortBy>(sortBy);

  const handleApply = () => {
    setSortBy(sortSelected);
    onClose(false);
  };

  const handleClear = () => {
    setSortSelected(null);
    setSortBy(null);
    searchProduct('');
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-black dark:text-white">
          Filtros
        </h3>
        <button
          onClick={() => onClose(false)}
          aria-label="Cerrar"
          className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Nombre
        </label>
        <input
          onChange={(e) => searchProduct(e.target.value)}
          value={searchWord}
          type="text"
          placeholder="Buscar por nombre..."
          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-neutral-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Ordenar por
        </label>
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              onClick={() => setSortSelected(option)}
              key={option}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors border ${
                sortSelected === option
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="flex-1 px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 rounded-lg hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
        >
          Limpiar
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-3 py-2 text-sm font-semibold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default Filter;
