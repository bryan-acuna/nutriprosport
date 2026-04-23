const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-gray-100 gap-4">
      <div className="text-lg sm:text-xl font-black tracking-tight uppercase shrink-0">
        Nutripro<span className="text-red-500">Sport</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <span className="cursor-pointer hover:text-black transition-colors">
          Geles
        </span>
        <span className="cursor-pointer hover:text-black transition-colors">
          Hidratación
        </span>
        <span className="cursor-pointer hover:text-black transition-colors">
          Shots
        </span>
        <span className="cursor-pointer hover:text-black transition-colors">
          Proteína
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="hidden sm:inline text-sm text-gray-500 hover:text-black transition-colors">
          Buscar
        </button>
        <button className="text-sm font-semibold bg-black text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Carrito (0)
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
