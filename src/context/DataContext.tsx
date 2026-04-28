import { createContext, useContext, useMemo, useState } from 'react';
import { type Product, products } from '../data/products';
import { useDebounce } from '@/hooks';

export type SortBy = 'Precio' | 'Nombre' | null;

interface DataContextI {
  filteredProducts: Product[];
  searchWord: string;
  searchProduct: (word: string) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  category: string;
  categories: string[];
  setCategory: (word: string) => void;
}

interface DataProviderProps {
  children: React.ReactNode;
}
const DataContext = createContext<DataContextI | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const categories = useMemo(
    () => ['Todo', ...new Set(products.map((product) => product.category))],
    []
  );
  const [searchWord, setSearchWord] = useState<string>('');
  const debouncedValue = useDebounce(searchWord);
  const [category, setCategory] = useState<string>('Todo');
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const filteredProducts = useMemo(() => {
    const categoryFilter =
      category === 'Todo'
        ? products
        : products.filter((product: Product) => product.category === category);
    const newProducts = categoryFilter.filter((product: Product) =>
      product.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    return newProducts.toSorted((a, b) => {
      switch (sortBy) {
        case 'Precio':
          return a.price - b.price;
        case 'Nombre':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [debouncedValue, sortBy, category]);

  const searchProduct = (word: string) => setSearchWord(word);

  const value = useMemo(
    () => ({
      filteredProducts,
      searchWord,
      searchProduct,
      sortBy,
      setSortBy,
      setCategory,
      category,
      categories,
    }),
    [filteredProducts, sortBy, category, categories, searchWord]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error('useData must be used within a DataProvider');

  return context;
};
