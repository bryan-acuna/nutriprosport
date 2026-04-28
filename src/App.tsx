import { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { Navbar } from './components/Nav';
import { useData } from './context';
import CategoryFilter from './components/CategoryFilters/CategoryFilter';
import { AddProduct } from './pages/AddProduct';

export default function App() {
  const { filteredProducts } = useData();
  const [page, setPage] = useState<'home' | 'add-product'>('home');

  if (page === 'add-product') {
    return <AddProduct onBack={() => setPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans transition-colors">
      {/* Nav */}
      <Navbar />

      {/* Page header + filters */}
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
            Colección 2026
          </p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white">
            Productos disponibles
          </h1>
        </div>
        <div className="flex items-center gap-3 pb-1">
          <p className="text-sm text-gray-400 dark:text-gray-500 hidden sm:block">
            {filteredProducts.length} productos
          </p>
          <button
            onClick={() => setPage('add-product')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:opacity-90 transition-opacity shrink-0"
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
            Agregar producto
          </button>
        </div>
      </div>

      <CategoryFilter />

      {/* Product grid */}
      <div className="px-4 sm:px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
