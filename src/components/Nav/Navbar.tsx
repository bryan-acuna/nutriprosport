const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
      <div className="text-xl font-black tracking-tight uppercase">
        Nutripro<span className="text-red-500">Sport</span>
      </div>
      <div className="flex gap-8 text-sm font-medium text-gray-600">
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
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-500 hover:text-black transition-colors">
          Buscar
        </button>
        <button className="text-sm font-semibold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Carrito (0)
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
