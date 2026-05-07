import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { listProducts, type Product } from '@/lib/api/product';

export type SortBy = 'Precio' | 'Nombre' | null;

interface DataContextI {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [category, setCategory] = useState<string>('Todo');
  const [sortBy, setSortBy] = useState<SortBy>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Error al cargar productos'
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listProducts();
        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error ? error.message : 'Error al cargar productos'
          );
          setProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);
  const categories = useMemo(
    () => ['Todo', ...new Set(products.map((p) => p.category))],
    [products]
  );

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
  }, [searchWord, sortBy, category, products]);

  const searchProduct = useCallback((word: string) => setSearchWord(word), []);

  const value = useMemo(
    () => ({
      products,
      filteredProducts,
      loading,
      error,
      refresh: fetchProducts,
      searchWord,
      searchProduct,
      sortBy,
      setSortBy,
      setCategory,
      category,
      categories,
    }),
    [
      filteredProducts,
      sortBy,
      category,
      categories,
      searchWord,
      searchProduct,
      products,
      loading,
      error,
      fetchProducts,
    ]
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
