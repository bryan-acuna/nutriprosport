import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { type SortBy, useData } from '@/context';

interface FilterI {
  onClose: (close: boolean) => void;
}

const sortOptions: Exclude<SortBy, null>[] = ['Precio', 'Nombre'];

const Filter = ({ onClose }: FilterI) => {
  const { setSortBy, sortBy } = useData();
  const [sortSelected, setSortSelected] = useState<SortBy>(sortBy);

  const handleSubmit = () => {
    setSortBy(sortSelected);
    onClose(false);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-black dark:text-white">
          Filtros
        </h3>
        <button
          onClick={() => onClose(false)}
          aria-label="Cerrar filtros"
          className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Ordenar por
        </label>
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              onClick={() =>
                setSortSelected((curr) => (curr === option ? null : option))
              }
              key={option}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors border ${
                sortSelected === option
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500'
              }`}
            >
              {option}
              <ChevronDown size={14} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 px-3 py-2 text-sm font-semibold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default Filter;
