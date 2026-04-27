import { useData } from '@/context';
import { useState } from 'react';

const CategoryFilter = () => {
  const { category: activeCategory, categories, setCategory } = useData();

  return (
    <div className="px-4 sm:px-8 pb-3 flex gap-2 overflow-x-auto whitespace-nowrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
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
  );
};

export default CategoryFilter;
