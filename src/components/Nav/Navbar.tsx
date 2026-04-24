import { useState } from 'react';
import { Search } from '../Search';

const Navbar = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  return (
    <nav className="relative flex items-center justify-between px-4 sm:px-8 py-4 border-b border-gray-100 gap-4">
      <div className="text-lg sm:text-xl font-black tracking-tight uppercase shrink-0">
        Nutripro<span className="text-red-500">Sport</span>
      </div>

      <Search />

      <div
        className="flex items-center

                  gap-2 sm:gap-4 shrink-0 relative"
      >
        <button
          onClick={() => setFilterOpen((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-full border border-gray-200 hover:border-gray-400"
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

        {filterOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-black">Filtros</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Precio
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                Limpiar
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
