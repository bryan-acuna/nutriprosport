import { createContext, useContext, useMemo, useState } from 'react';
import { type Product, products } from '../data/products';

interface DataContextI {
  filteredProducts: Product[];
  searchProduct: (word: string) => void;
  setFilter: (word: string | null) => void;
}

interface DataProviderProps {
  children: React.ReactNode;
}
const DataContext = createContext<DataContextI | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [filters, setFilter] = useState<string | null>(null);
  const filteredProducts = useMemo(() => {
    const newProducts = products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchWord.toLowerCase())
    );
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
  }, [searchWord, filters]);

  const searchProduct = setSearchWord;

  return (
    <DataContext.Provider
      value={{ filteredProducts, searchProduct, setFilter }}
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
