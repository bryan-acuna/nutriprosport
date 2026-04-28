import { useEffect, useState } from 'react';

export const useDebounce = <T>(searchTerm: T, time = 1000): T => {
  const [search, setSearch] = useState<T>(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchTerm);
    }, time);

    return () => clearTimeout(timeout);
  }, [searchTerm, time]);
  return search;
};
