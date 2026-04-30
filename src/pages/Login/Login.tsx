import { useAuth } from '@/context';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router('/');
    }
  };
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans transition-colors flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black dark:bg-white mb-6">
            <svg
              className="w-6 h-6 text-white dark:text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            Bienvenido
          </p>
          <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">
            Inicia sesión
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Accede a tu cuenta para continuar
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2"
            >
              Correo electrónico
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400"
              >
                Contraseña
              </label>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 dark:border-neutral-700 text-black dark:text-white focus:ring-black dark:focus:ring-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Recordarme
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-neutral-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white dark:bg-neutral-950 text-gray-400 dark:text-gray-600 uppercase tracking-widest font-semibold">
              o continúa con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold bg-white dark:bg-neutral-900 text-black dark:text-white border border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold bg-white dark:bg-neutral-900 text-black dark:text-white border border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
