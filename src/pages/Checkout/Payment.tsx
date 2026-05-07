import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart, useCheckout } from '@/context';
import CheckoutSteps from './CheckoutSteps';

type Method = 'stripe' | 'payphone';

const Payment = () => {
  const { items, total } = useCart();
  const { address, deliveryMethod } = useCheckout();
  const [method, setMethod] = useState<Method>('stripe');

  if (items.length === 0) return <Navigate to="/cart" replace />;
  if (deliveryMethod === 'shipping' && !address) {
    return <Navigate to="/checkout/address" replace />;
  }

  const handlePay = () => {
    if (method === 'stripe') {
      alert('Stripe checkout aún no conectado');
    } else {
      alert('PayPhone aún no conectado');
    }
  };

  return (
    <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-12 sm:pb-16 max-w-5xl mx-auto">
      <CheckoutSteps
        current={3}
        showAddress={deliveryMethod === 'shipping'}
      />

      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white mb-6">
        Método de pago
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {deliveryMethod === 'shipping' && address ? (
            <div className="p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-black dark:text-white">
                  Enviar a
                </h2>
                <Link
                  to="/checkout/address"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Editar
                </Link>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {address.fullName}
                <br />
                {address.street}
                <br />
                {address.city}, {address.state} {address.postalCode}
                <br />
                {address.country}
                <br />
                <span className="text-gray-500 dark:text-gray-400">
                  {address.phone} · {address.email}
                </span>
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-black dark:text-white">
                  Retiro en tienda
                </h2>
                <Link
                  to="/cart"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Cambiar
                </Link>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Recoge tu pedido en nuestra tienda. Te avisaremos por correo
                cuando esté listo.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <label
              className={[
                'flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-colors',
                method === 'stripe'
                  ? 'border-black dark:border-white'
                  : 'border-gray-200 dark:border-neutral-800 hover:border-gray-400 dark:hover:border-neutral-600',
              ].join(' ')}
            >
              <input
                type="radio"
                name="method"
                value="stripe"
                checked={method === 'stripe'}
                onChange={() => setMethod('stripe')}
                className="accent-black dark:accent-white"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#635BFF] text-white">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.42-.977 1.667 0 3.379.643 4.558 1.219l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.43.488-4.547 1.4-1.166.953-1.769 2.327-1.769 3.983 0 3.005 1.836 4.291 4.829 5.378 1.928.689 2.574 1.177 2.574 1.928 0 .73-.622 1.146-1.748 1.146-1.439 0-3.79-.708-5.337-1.62l-.666 4.16c1.323.751 3.769 1.521 6.314 1.521 1.978 0 3.624-.469 4.737-1.354 1.246-.978 1.886-2.422 1.886-4.144 0-3.078-1.876-4.353-4.915-5.549z" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-black dark:text-white">
                    Tarjeta (Stripe)
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Visa, Mastercard, Amex y más.
                </p>
              </div>
            </label>

            <label
              className={[
                'flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-colors',
                method === 'payphone'
                  ? 'border-black dark:border-white'
                  : 'border-gray-200 dark:border-neutral-800 hover:border-gray-400 dark:hover:border-neutral-600',
              ].join(' ')}
            >
              <input
                type="radio"
                name="method"
                value="payphone"
                checked={method === 'payphone'}
                onChange={() => setMethod('payphone')}
                className="accent-black dark:accent-white"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#3F2A8E] text-white">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <rect x="5" y="2" width="14" height="20" rx="3" />
                      <line x1="11" y1="18" x2="13" y2="18" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-black dark:text-white">
                    PayPhone
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Paga desde tu app PayPhone o tarjetas locales.
                </p>
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Link
              to={
                deliveryMethod === 'shipping' ? '/checkout/address' : '/cart'
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
            >
              Volver
            </Link>
            <button
              onClick={handlePay}
              className={[
                'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity flex-1',
                method === 'stripe' ? 'bg-[#635BFF]' : 'bg-[#3F2A8E]',
              ].join(' ')}
            >
              Pagar ${total.toFixed(2)}{' '}
              {method === 'stripe' ? 'con Stripe' : 'con PayPhone'}
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <h2 className="text-base font-bold text-black dark:text-white mb-4">
            Resumen
          </h2>
          <ul className="flex flex-col gap-2 mb-4">
            {items.map((i) => (
              <li
                key={i.productId}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700 dark:text-gray-300 truncate pr-2">
                  {i.product.name}{' '}
                  <span className="text-gray-400 dark:text-gray-500">
                    × {i.qty}
                  </span>
                </span>
                <span className="text-black dark:text-white font-medium shrink-0">
                  ${i.lineTotal.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 dark:border-neutral-800 my-3" />
          <div className="flex items-center justify-between text-base font-bold text-black dark:text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Payment;
