import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart, useCheckout, type ShippingAddress } from '@/context';
import CheckoutSteps from './CheckoutSteps';

const emptyAddress: ShippingAddress = {
  fullName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Ecuador',
  notes: '',
};

const fieldClass =
  'w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors';

const labelClass =
  'block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5';

const Address = () => {
  const { items, total } = useCart();
  const { address, setAddress, deliveryMethod } = useCheckout();
  const navigate = useNavigate();
  const [form, setForm] = useState<ShippingAddress>(address ?? emptyAddress);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  if (deliveryMethod === 'pickup') {
    return <Navigate to="/checkout/payment" replace />;
  }

  const update =
    (key: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(form);
    navigate('/checkout/payment');
  };

  return (
    <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-12 sm:pb-16 max-w-5xl mx-auto">
      <CheckoutSteps current={2} />

      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white mb-6">
        Dirección de envío
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="fullName">
              Nombre completo
            </label>
            <input
              id="fullName"
              required
              value={form.fullName}
              onChange={update('fullName')}
              className={fieldClass}
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              className={fieldClass}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Teléfono
            </label>
            <input
              id="phone"
              required
              value={form.phone}
              onChange={update('phone')}
              className={fieldClass}
              placeholder="+593 99 999 9999"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="street">
              Dirección
            </label>
            <input
              id="street"
              required
              value={form.street}
              onChange={update('street')}
              className={fieldClass}
              placeholder="Av. Principal 123 y Secundaria"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="city">
              Ciudad
            </label>
            <input
              id="city"
              required
              value={form.city}
              onChange={update('city')}
              className={fieldClass}
              placeholder="Quito"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="state">
              Provincia / Estado
            </label>
            <input
              id="state"
              required
              value={form.state}
              onChange={update('state')}
              className={fieldClass}
              placeholder="Pichincha"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="postalCode">
              Código postal
            </label>
            <input
              id="postalCode"
              required
              value={form.postalCode}
              onChange={update('postalCode')}
              className={fieldClass}
              placeholder="170150"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="country">
              País
            </label>
            <input
              id="country"
              required
              value={form.country}
              onChange={update('country')}
              className={fieldClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="notes">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes ?? ''}
              onChange={update('notes')}
              className={fieldClass}
              placeholder="Referencias, indicaciones para el repartidor, etc."
            />
          </div>

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 mt-2">
            <Link
              to="/cart"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
            >
              Volver al carrito
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity flex-1 sm:flex-initial"
            >
              Continuar al pago
            </button>
          </div>
        </form>

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

export default Address;
