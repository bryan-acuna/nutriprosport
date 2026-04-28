import { useMemo } from 'react';
import { useData } from '@/context';
import { products } from '@/data/products';

const CategoryFilter = () => {
  const { category: activeCategory, categories, setCategory } = useData();

  const counts = useMemo(() => {
    const map: Record<string, number> = { Todo: products.length };
    for (const p of products) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <div className="relative">
      <div className="px-4 sm:px-8 pb-3 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hidden">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`group/cat inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all shrink-0 ${
                isActive
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500'
              }`}
            >
              {cat}
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                {counts[cat] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent" />
    </div>
  );
};

export default CategoryFilter;
