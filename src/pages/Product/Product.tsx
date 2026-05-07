import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '@/context';
import { useCart } from '@/context';
import { Loader } from '@/components/loader';

const badgeStyles: Record<string, string> = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-600 text-white',
  green: 'bg-green-600 text-white',
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useData();
  const { add, items, remove } = useCart();
  const [openSection, setOpenSection] = useState<
    'description' | 'usage' | null
  >('description');

  const toggle = (section: 'description' | 'usage') =>
    setOpenSection((prev) => (prev === section ? null : section));

  // We search the *unfiltered* set so a sorted/searched home doesn't break deep links.
  // To do that properly, expose the raw list from context too — see DataContext rev below.
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="px-4 sm:px-8 py-16 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Producto no encontrado
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const inCart = items.some((i) => i.productId === product.id);

  return loading ? (
    <div>
      <Loader size="lg" label="Cargando producto" />
    </div>
  ) : (
    <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-12 sm:pb-16 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-4 sm:mb-6 -ml-1 px-2 py-2 rounded-lg"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 dark:border-neutral-800 aspect-square flex items-center justify-center">
          {product.badge && (
            <span
              className={`absolute top-3 left-3 sm:top-4 sm:left-4 text-xs font-semibold px-2.5 py-1 rounded-md z-10 ${badgeStyles[product.badgeColor ?? 'red']}`}
            >
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 sm:p-10"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-widest mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white mb-2">
            {product.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
            {product.subtitle}
          </p>

          <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-base sm:text-lg text-gray-400 dark:text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-red-500">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <div className="mb-6 border-t border-gray-200 dark:border-neutral-800">
            <div className="border-b border-gray-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => toggle('description')}
                aria-expanded={openSection === 'description'}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
                  Descripción
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    openSection === 'description' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  openSection === 'description'
                    ? 'grid-rows-[1fr] opacity-100 pb-4'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {product.usage && product.usage.length > 0 && (
              <div className="border-b border-gray-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => toggle('usage')}
                  aria-expanded={openSection === 'usage'}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
                    Cómo tomarlo
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      openSection === 'usage' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openSection === 'usage'
                      ? 'grid-rows-[1fr] opacity-100 pb-4'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2">
                      {product.usage.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {product.flavors && product.flavors.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
                Sabores
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-800"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {inCart ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/cart"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-green-600 text-white hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-150"
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
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                En el carrito
              </Link>
              <button
                onClick={() => remove(product.id)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-500 active:scale-95 transition-all duration-150"
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
                Quitar del carrito
              </button>
            </div>
          ) : (
            <button
              onClick={() => add(product.id, 1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-inner active:bg-gray-800 dark:active:bg-gray-200 transition-all duration-150"
            >
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
