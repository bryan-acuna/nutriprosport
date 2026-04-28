import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [favorite, setFavorite] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const badgeLabel = discount ? `-${discount}%` : product.badge;

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-900 mb-4 aspect-square flex items-center justify-center transition-all duration-300 group-hover:bg-gray-50 dark:group-hover:bg-neutral-800/80 group-hover:shadow-lg dark:group-hover:shadow-black/40">
        {badgeLabel && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500 text-white z-10">
            {badgeLabel}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />

        <button
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={favorite}
          onClick={(e) => {
            e.stopPropagation();
            setFavorite((v) => !v);
          }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full p-2 shadow-sm"
        >
          <Heart
            size={16}
            className={
              favorite ? 'fill-red-500 stroke-red-500' : 'stroke-current'
            }
          />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-[0.15em]">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug transition-colors group-hover:text-black dark:group-hover:text-white">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {product.subtitle}
        </p>
        {product.flavors && (
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            {product.flavors.length}{' '}
            {product.flavors.length === 1 ? 'sabor' : 'sabores'}
          </p>
        )}
        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
