import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Search } from '../Search';
import { Filter } from '../Filter';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!filterOpen) return;

    const onClick = (e: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(e.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [filterOpen]);

  return (
    <nav
      className={`sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-4 gap-4 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 transition-colors ${
        scrolled
          ? 'border-b border-gray-100 dark:border-neutral-800'
          : 'border-b border-transparent'
      }`}
    >
      <div className="text-lg sm:text-xl font-black tracking-tight uppercase shrink-0 text-black dark:text-white">
        Nutripro<span className="text-red-500">Sport</span>
      </div>

      <Search />

      <div
        ref={filterContainerRef}
        className="flex items-center gap-2 sm:gap-4 shrink-0 relative"
      >
        <ThemeToggle />
        <button
          onClick={() => setFilterOpen((v) => !v)}
          aria-expanded={filterOpen}
          aria-haspopup="dialog"
          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-3 py-2 rounded-full border border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500"
        >
          <SlidersHorizontal size={16} />
          Filtros
        </button>

        {filterOpen && <Filter onClose={setFilterOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
