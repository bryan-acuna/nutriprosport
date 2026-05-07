interface CheckoutStepsProps {
  current: 1 | 2 | 3;
  showAddress?: boolean;
}

const CheckoutSteps = ({ current, showAddress = true }: CheckoutStepsProps) => {
  const labels = showAddress
    ? ['Carrito', 'Dirección', 'Pago']
    : ['Carrito', 'Pago'];

  // When address is hidden, the "Pago" step is logically step 2 of 2 — but the
  // caller still passes current=3 from Payment.tsx. Map it down for display.
  const displayCurrent = showAddress
    ? current
    : current === 3
      ? 2
      : current === 2
        ? 2
        : 1;

  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
      {labels.map((label, idx) => {
        const step = idx + 1;
        const active = step === displayCurrent;
        const done = step < displayCurrent;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={[
                  'inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold',
                  active
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : done
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-neutral-800 text-gray-500 dark:text-gray-400',
                ].join(' ')}
              >
                {done ? '✓' : step}
              </span>
              <span
                className={
                  active
                    ? 'font-semibold text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }
              >
                {label}
              </span>
            </div>
            {step < labels.length && (
              <span className="w-6 sm:w-10 h-px bg-gray-300 dark:bg-neutral-700" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default CheckoutSteps;
