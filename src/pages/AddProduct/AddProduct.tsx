interface AddProductProps {
  onBack: () => void;
}

const categories = ['Geles', 'Hidratación', 'Shots', 'Waffles'];
const badgeColors = ['red', 'blue', 'green'];

const AddProduct = ({ onBack }: AddProductProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans transition-colors">
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>

        <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
          Nuevo producto
        </p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white mb-8">
          Agregar producto
        </h1>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Maurten Gel 100"
              className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Subtítulo
            </label>
            <input
              type="text"
              placeholder="Gel energético de hidrogel"
              className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Categoría
              </label>
              <select className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors">
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Sabores
              </label>
              <input
                type="text"
                placeholder="Limón, Naranja, Fresa"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Precio
              </label>
              <input
                type="number"
                placeholder="6.00"
                step="0.01"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Precio original
              </label>
              <input
                type="number"
                placeholder="8.00"
                step="0.01"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Etiqueta
              </label>
              <input
                type="text"
                placeholder="Ahorra"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Color de etiqueta
              </label>
              <select className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors">
                <option value="">Sin color</option>
                {badgeColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Imagen
            </label>
            <input
              type="text"
              placeholder="/imagen.png"
              className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Descripción
            </label>
            <textarea
              rows={4}
              placeholder="Describe el producto..."
              className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:opacity-90 transition-opacity"
            >
              Guardar producto
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
