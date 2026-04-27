import { useData } from '@/context';
import { useState } from 'react';

interface FilterI {
  handleFiler: (close: boolean) => void;
}

const sortOptions: string[] = ['Precio', 'Nombre'];

const Filter = ({ handleFiler }: FilterI) => {
  const [sortSelected, setSortSelected] = useState<string | null>(null);
  const { setFilter } = useData();

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-black dark:text-white">
          Filtros
        </h3>
        <button
          onClick={() => handleFiler(false)}
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
        <label
          className="block text-xs font-semibold text-gray-500
        dark:text-gray-400 uppercase tracking-wider mb-2"
        >
          Nombre
        </label>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-neutral-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Ordernar por
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
              <svg
                className="w-3.5 h-3.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter(sortSelected)}
          className="flex-1 px-3 py-2 text-sm font-semibold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default Filter;
