import { useState } from "react";
import { products } from "./data/products";
import { ProductCard } from "./components/ProductCard";
import { Navbar } from "./components/Nav";

const categories = ["Todo", "Geles", "Hidratación", "Shots"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filtered =
    activeCategory === "Todo"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <Navbar />

      {/* Page header + filters */}
      <div className="px-8 pt-8 pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
            Colección 2026
          </p>
          <h1 className="text-3xl font-black tracking-tight">
            Productos disponibles
          </h1>
        </div>
        <p className="text-sm text-gray-400 pb-1">
          {filtered.length} productos
        </p>
      </div>

      {/* Category filters */}
      <div className="px-8 pb-6 flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeCategory === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="px-8 pb-16 grid grid-cols-3 gap-x-6 gap-y-10">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
