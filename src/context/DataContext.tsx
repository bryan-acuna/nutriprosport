import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { type Product, products } from '../data/products';

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
    () => ['Todo', ...new Set(products.map((p) => p.category))],
    []
  );
  const [searchWord, setSearchWord] = useState<string>('');
  const [category, setCategory] = useState<string>('Todo');
  const [sortBy, setSortBy] = useState<SortBy>(null);

  const filteredProducts = useMemo(() => {
    const byCategory =
      category === 'Todo'
        ? products
        : products.filter((p) => p.category === category);

    const bySearch = byCategory.filter((p) =>
      p.name.toLowerCase().includes(searchWord.toLowerCase())
    );

    return bySearch.toSorted((a, b) => {
      switch (sortBy) {
        case 'Precio':
          return a.price - b.price;
        case 'Nombre':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchWord, sortBy, category]);

  const searchProduct = useCallback((word: string) => setSearchWord(word), []);

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
    [filteredProducts, sortBy, category, categories, searchWord, searchProduct]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
