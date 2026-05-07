import { useAuth } from '@/context';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Ingresa tu correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      navigate('/');
    } finally {
      setLoading(false);
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

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
              required
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2"
            >
              Contraseña
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
