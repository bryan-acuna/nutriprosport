import type { Product } from '@/data/products';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks';
import { useCart } from '@/context';

interface Props {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-600 text-white',
  green: 'bg-green-600 text-white',
};

export default function ProductCard({ product }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const { add } = useCart();
  const fav = isFavorite(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group">
      <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-900 mb-3 aspect-square flex items-center justify-center">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md z-10 ${badgeStyles[product.badgeColor ?? 'red']}`}
          >
            {product.badge}
          </span>
        )}

        <Link
          to={`/product/${product.id}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          aria-pressed={fav}
          className="absolute top-3 right-3 bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full p-2 shadow-sm transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={fav ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block space-y-0.5">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {product.subtitle}
        </p>
        {product.flavors && (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {product.flavors.length} sabores
          </p>
        )}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-red-500">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          add(product.id, 1);
        }}
        aria-label={`Añadir ${product.name} al carrito`}
        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-black dark:bg-white text-white dark:text-black hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-inner active:bg-gray-800 dark:active:bg-gray-200 transition-all duration-150"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005.414 17H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Añadir al carrito
      </button>
    </div>
  );
}
