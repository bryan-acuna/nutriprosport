import { useData } from '@/context';
import CategoryFilter from '@/components/CategoryFilters/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';

const Home = () => {
  const { filteredProducts } = useData();
  return (
    <>
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
        </div>
      </div>

      <CategoryFilter />

      {/* Product grid */}
      <div className="px-4 sm:px-8 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
export default Home;
