import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

const readStorage = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'number') : [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(readStorage);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setFavorites(readStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persist = (next: number[]) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggle = useCallback((id: number) => {
    const current = readStorage();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    persist(next);
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
};
