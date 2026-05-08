import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type Product } from '@/lib/api/product';
import { useData } from './DataContext';

interface CartLine {
  productId: number;
  qty: number;
}

export interface CartItem extends CartLine {
  product: Product;
  lineTotal: number;
}

export interface CartToastState {
  product: Product;
  qty: number;
  key: number;
}

interface CartContextI {
  items: CartItem[];
  count: number;
  total: number;
  add: (productId: number, qty?: number) => void;
  remove: (productId: number) => void;
  update: (productId: number, qty: number) => void;
  clear: () => void;
  toast: CartToastState | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextI | undefined>(undefined);

const STORAGE_KEY = 'cart:v1';

const readStorage = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => typeof l?.productId === 'number' && typeof l?.qty === 'number'
    );
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { products } = useData();
  const [lines, setLines] = useState<CartLine[]>(readStorage);
  const [toast, setToast] = useState<CartToastState | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productsRef = useRef<Product[]>(products);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const add = useCallback((productId: number, qty: number = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { productId, qty }];
    });

    const product = productsRef.current.find((p) => p.id === productId);
    if (product) {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToast({ product, qty, key: Date.now() });
      toastTimerRef.current = setTimeout(() => setToast(null), 3000);
    }
  }, []);

  const remove = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const update = useCallback((productId: number, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) => (l.productId === productId ? { ...l, qty } : l));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, []);

  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        if (!product) return null;
        return {
          productId: l.productId,
          qty: l.qty,
          product,
          lineTotal: product.price * l.qty,
        };
      })
      .filter((x): x is CartItem => x !== null);
  }, [lines, products]);

  const count = useMemo(
    () => lines.reduce((sum, i) => sum + i.qty, 0),
    [lines]
  );
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.lineTotal, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      total,
      add,
      remove,
      update,
      clear,
      toast,
      dismissToast,
    }),
    [items, count, total, add, remove, update, clear, toast, dismissToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
