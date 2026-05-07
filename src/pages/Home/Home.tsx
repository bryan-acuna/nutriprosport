import { useData } from '@/context';
import CategoryFilter from '@/components/CategoryFilters/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { Loader } from '@/components/loader';

const Home = () => {
  const { filteredProducts, loading } = useData();
  return loading ? (
    <div className="px-4 sm:px-8 py-24">
      <Loader size="lg" label="Cargando productos..." />
    </div>
  ) : (
    <>
      {/* Page header + filters */}
      <div className="px-4 sm:px-8 pt-5 sm:pt-8 pb-3 sm:pb-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
            Colección 2026
          </p>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-black dark:text-white">
            Productos disponibles
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 pb-1 shrink-0">
          {filteredProducts.length} productos
        </p>
      </div>

      <CategoryFilter />

      {/* Product grid */}
      <div className="px-4 sm:px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
export default Home;
