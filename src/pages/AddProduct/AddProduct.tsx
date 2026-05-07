import { useState, type FormEvent } from 'react';
import { useData } from '@/context';

const badgeColors = ['red', 'blue', 'green'] as const;

interface FormState {
  name: string;
  subtitle: string;
  category: string;
  flavors: string;
  price: string;
  originalPrice: string;
  badge: string;
  badgeColor: string;
  image: string;
  description: string;
}

const initial: FormState = {
  name: '',
  subtitle: '',
  category: '',
  flavors: '',
  price: '',
  originalPrice: '',
  badge: '',
  badgeColor: '',
  image: '',
  description: '',
};

const AddProduct = () => {
  const { categories } = useData();
  // categories[0] is "Todo" sentinel — strip it
  const realCategories = categories.filter((c) => c !== 'Todo');

  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) return;
    setSubmitting(true);
    try {
      // TODO: wire to Supabase `products` table
      const payload = {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice
          ? parseFloat(form.originalPrice)
          : null,
        flavors: form.flavors
          ? form.flavors.split(',').map((s) => s.trim())
          : [],
      };
      console.log('submit', payload);
      setForm(initial);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 max-w-2xl mx-auto">
      <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
        Nuevo producto
      </p>
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white mb-8">
        Agregar producto
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Nombre">
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
            type="text"
            placeholder="Maurten Gel 100"
            className={inputCls}
          />
        </Field>

        <Field label="Subtítulo">
          <input
            value={form.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            type="text"
            placeholder="Gel energético"
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Categoría">
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              required
              className={inputCls}
            >
              <option value="">Selecciona una categoría</option>
              {realCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Sabores (separados por coma)">
            <input
              value={form.flavors}
              onChange={(e) => update('flavors', e.target.value)}
              type="text"
              placeholder="Limón, Naranja"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Precio">
            <input
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
              required
              type="number"
              step="0.01"
              placeholder="6.00"
              className={inputCls}
            />
          </Field>
          <Field label="Precio original">
            <input
              value={form.originalPrice}
              onChange={(e) => update('originalPrice', e.target.value)}
              type="number"
              step="0.01"
              placeholder="8.00"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Etiqueta">
            <input
              value={form.badge}
              onChange={(e) => update('badge', e.target.value)}
              type="text"
              placeholder="Ahorra"
              className={inputCls}
            />
          </Field>
          <Field label="Color de etiqueta">
            <select
              value={form.badgeColor}
              onChange={(e) => update('badgeColor', e.target.value)}
              className={inputCls}
            >
              <option value="">Sin color</option>
              {badgeColors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Imagen">
          <input
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            type="text"
            placeholder="/imagen.png"
            className={inputCls}
          />
        </Field>

        <Field label="Descripción">
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            placeholder="Describe el producto..."
            className={`${inputCls} resize-none`}
          />
        </Field>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? 'Guardando...' : 'Guardar producto'}
          </button>
          <button
            type="button"
            onClick={() => setForm(initial)}
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const inputCls =
  'w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors';

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
      {label}
    </label>
    {children}
  </div>
);

export default AddProduct;
