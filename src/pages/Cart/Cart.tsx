import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart, useCheckout, useAuth } from '@/context';
import CheckoutSteps from '../Checkout/CheckoutSteps';

const Cart = () => {
  const { items, total, count, update, remove, clear } = useCart();
  const { deliveryMethod, setDeliveryMethod } = useCheckout();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const nextPath =
    deliveryMethod === 'shipping' ? '/checkout/address' : '/checkout/payment';

  const handleContinue = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    navigate(nextPath);
  };

  const continueAsGuest = () => {
    setShowAuthPrompt(false);
    navigate(nextPath);
  };

  const goToLogin = () => {
    setShowAuthPrompt(false);
    navigate(`/login?next=${encodeURIComponent(nextPath)}`);
  };

  if (items.length === 0) {
    return (
      <div className="px-4 sm:px-8 py-16 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white mb-3">
          Tu carrito está vacío
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Aún no has añadido ningún producto.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-12 sm:pb-16 max-w-5xl mx-auto">
      <CheckoutSteps current={1} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white">
          Carrito
          <span className="ml-2 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400">
            ({count} {count === 1 ? 'producto' : 'productos'})
          </span>
        </h1>
        <button
          onClick={clear}
          className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          Vaciar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <ul className="lg:col-span-2 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            >
              <Link
                to={`/product/${item.productId}`}
                className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain p-2"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-sm sm:text-base font-semibold text-black dark:text-white truncate hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => remove(item.productId)}
                    aria-label="Eliminar"
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
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
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                  {item.product.category}
                </p>

                <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-neutral-700">
                    <button
                      onClick={() => update(item.productId, item.qty - 1)}
                      aria-label="Disminuir"
                      className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-black dark:text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => update(item.productId, item.qty + 1)}
                      aria-label="Aumentar"
                      className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-black dark:text-white">
                    ${item.lineTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-24 h-fit p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <h2 className="text-base font-bold text-black dark:text-white mb-4">
            Resumen
          </h2>

          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
            Entrega
          </p>
          <div className="flex flex-col gap-2 mb-4">
            <label
              className={[
                'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                deliveryMethod === 'shipping'
                  ? 'border-black dark:border-white'
                  : 'border-gray-200 dark:border-neutral-800 hover:border-gray-400 dark:hover:border-neutral-600',
              ].join(' ')}
            >
              <input
                type="radio"
                name="delivery"
                value="shipping"
                checked={deliveryMethod === 'shipping'}
                onChange={() => setDeliveryMethod('shipping')}
                className="mt-0.5 accent-black dark:accent-white"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-black dark:text-white">
                  Envío a domicilio
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recibe tu pedido en la dirección que indiques.
                </p>
              </div>
            </label>

            <label
              className={[
                'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                deliveryMethod === 'pickup'
                  ? 'border-black dark:border-white'
                  : 'border-gray-200 dark:border-neutral-800 hover:border-gray-400 dark:hover:border-neutral-600',
              ].join(' ')}
            >
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={() => setDeliveryMethod('pickup')}
                className="mt-0.5 accent-black dark:accent-white"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-black dark:text-white">
                  Retiro en tienda
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recoge tu pedido sin costo adicional.
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{deliveryMethod === 'shipping' ? 'Envío' : 'Retiro'}</span>
            <span>
              {deliveryMethod === 'shipping' ? 'Calculado al pagar' : 'Gratis'}
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-neutral-800 my-3" />
          <div className="flex items-center justify-between text-base font-bold text-black dark:text-white mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleContinue}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
          >
            {deliveryMethod === 'shipping'
              ? 'Continuar a dirección'
              : 'Continuar al pago'}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </aside>
      </div>

      {showAuthPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-prompt-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAuthPrompt(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="auth-prompt-title"
              className="text-lg font-black tracking-tight text-black dark:text-white mb-1"
            >
              ¿Cómo deseas continuar?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Inicia sesión para guardar tu pedido o continúa como invitado.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={goToLogin}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-150"
              >
                Iniciar sesión
              </button>
              <button
                onClick={continueAsGuest}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 dark:border-neutral-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Continuar como invitado
              </button>
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="w-full px-6 py-2 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
