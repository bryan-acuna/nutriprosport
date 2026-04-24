import { createContext, useContext, useMemo, useState } from 'react';
import { type Product, products } from '../data/products';

interface DataContextI {
  filteredProducts: Product[];
  searchProduct: (word: string) => void;
}

interface DataProviderProps {
  children: React.ReactNode;
}
const DataContext = createContext<DataContextI | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const filteredProducts = useMemo(
    () =>
      products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchWord.toLowerCase())
      ),
    [searchWord]
  );

  const searchProduct = setSearchWord;

  return (
    <DataContext.Provider value={{ filteredProducts, searchProduct }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error('useData must be used within a DataProvider');

  return context;
};
