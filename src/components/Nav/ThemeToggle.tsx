import { useTheme } from '@/context';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Cambiar tema"
      className={`relative inline-flex shrink-0 items-center w-14 h-7 rounded-full transition-colors duration-300 border ${
        isDark
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-gray-200 border-gray-300'
      }`}
    >
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? 'translate-x-7 text-neutral-800' : 'translate-x-0.5 text-yellow-500'
        }`}
      >
        {isDark ? (
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4 13H3a1 1 0 110-2h1a1 1 0 110 2zm17 0h-1a1 1 0 110-2h1a1 1 0 110 2zM5.64 6.05l-.7-.7a1 1 0 011.41-1.42l.71.71A1 1 0 015.64 6.05zm12.02 12.02l-.71-.71a1 1 0 011.41-1.41l.71.7a1 1 0 01-1.41 1.42zM6.34 17.66l-.7.71A1 1 0 014.22 17l.71-.71a1 1 0 011.41 1.37zM18.36 5.64l-.71.71A1 1 0 0116.24 4.93l.71-.71a1 1 0 011.41 1.42z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
