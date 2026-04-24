import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-600 text-white',
  green: 'bg-green-600 text-white',
};

export default function ProductCard({ product }: Props) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group cursor-pointer">
      {/* Image area */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-3 aspect-square flex items-center justify-center">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md z-10 ${badgeStyles[product.badgeColor ?? 'red']}`}
          >
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist button */}
        <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="space-y-0.5">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-gray-900 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">{product.subtitle}</p>
        {product.flavors && (
          <p className="text-xs text-gray-400">
            {product.flavors.length} sabores
          </p>
        )}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-sm font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-red-500">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
