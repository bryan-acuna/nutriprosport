import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context';

export default function CartToast() {
  const { toast, dismissToast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) {
      setVisible(false);
      return;
    }
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [toast]);

  if (!toast) return null;

  const { product, qty } = toast;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-3 transition-all duration-300 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-1.5"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <svg
              className="w-3.5 h-3.5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              Añadido al carrito
            </p>
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {product.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {qty} × ${product.price.toFixed(2)}
          </p>
          <Link
            to="/cart"
            onClick={dismissToast}
            className="inline-block mt-2 text-xs font-semibold text-black dark:text-white underline underline-offset-2 hover:opacity-70"
          >
            Ver carrito
          </Link>
        </div>
        <button
          onClick={dismissToast}
          aria-label="Cerrar"
          className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
