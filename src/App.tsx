import { PackageSearch } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Navbar } from './components/Nav';
import { useData } from './context';
import CategoryFilter from './components/CategoryFilters/CategoryFilter';

export default function App() {
  const { filteredProducts, setCategory, searchProduct } = useData();
  const isEmpty = filteredProducts.length === 0;

  const resetFilters = () => {
    setCategory('Todo');
    searchProduct('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 font-sans transition-colors">
      <Navbar />

      <div className="px-4 sm:px-8 pt-10 sm:pt-14 pb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
            Colección 2026
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black dark:text-white">
            Productos disponibles
          </h1>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 pb-1">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      <CategoryFilter />

      <main className="flex-1">
        {isEmpty ? (
          <div className="px-4 sm:px-8 py-20 flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-neutral-900 mb-4">
              <PackageSearch
                size={28}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <h2 className="text-lg font-bold text-black dark:text-white mb-1">
              No encontramos productos
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              Probá con otra categoría o ajustá tu búsqueda.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm font-semibold text-white dark:text-black bg-black dark:bg-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="px-4 sm:px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 dark:border-neutral-800 px-4 sm:px-8 py-6 text-xs text-gray-400 dark:text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} Nutripro
          <span className="text-red-500">Sport</span>
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
            Envíos
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
            Contacto
          </a>
        </div>
      </footer>
    </div>
  );
}
