import { createContext, useContext, useMemo, useState } from 'react';
import { type Product, products } from '../data/products';

interface DataContextI {
  filteredProducts: Product[];
  searchProduct: (word: string) => void;
  setFilter: (word: string | null) => void;
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
  const [category, setCategory] = useState<string>('Todo');
  const [filters, setFilter] = useState<string | null>(null);
  const filteredProducts = useMemo(() => {
    const categoryFilter =
      category === 'Todo'
        ? products
        : products.filter((product: Product) => product.category === category);
    console.log(category);
    console.log(categoryFilter);
    const newProducts = categoryFilter.filter((product: Product) =>
      product.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    console.log(newProducts);
    return newProducts.toSorted((a, b) => {
      switch (filters) {
        case 'Precio':
          return a.price - b.price;
        case 'Nombre':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchWord, filters, category]);

  const searchProduct = setSearchWord;

  return (
    <DataContext.Provider
      value={{
        filteredProducts,
        searchProduct,
        setFilter,
        setCategory,
        category,
        categories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error('useData must be used within a DataProvider');

  return context;
};
