import { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { Navbar } from './components/Nav';
import { useData } from './context';

const categories = ['Todo', 'Geles', 'Hidratación', 'Shots'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const { filteredProducts: products } = useData();

  const filtered =
    activeCategory === 'Todo'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans transition-colors">
      {/* Nav */}
      <Navbar />

      {/* Page header + filters */}
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
            Colección 2026
          </p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white">
            Productos disponibles
          </h1>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 pb-1">
          {filtered.length} productos
        </p>
      </div>

      {/* Category filters */}
      <div className="px-4 sm:px-8 pb-3 flex gap-2 overflow-x-auto whitespace-nowrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all shrink-0 ${
              activeCategory === cat
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                : 'bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="px-4 sm:px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
