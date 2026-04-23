export interface Product {
  id: number;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  badge?: string;
  badgeColor?: "red" | "blue" | "green";
  flavors?: string[];
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Maurten Gel 160",
    subtitle: "Gel energético de hidrogel",
    category: "Geles",
    price: 4.5,
    colors: ["#ffffff", "#eeeeee", "#cccccc"],
    description:
      "El gel más avanzado del mercado. Hidrogel que reduce el malestar estomacal. 40g de carbohidratos por gel.",
    flavors: ["Original"],
    image: "/maurte_160.png",
  },
  {
    id: 2,
    name: "Maurten Gel 100 Caf 100",
    subtitle: "Gel energético con 100mg de cafeína",
    category: "Geles",
    price: 5.0,
    colors: ["#111111", "#333333", "#555555"],
    badge: "Con cafeína",
    badgeColor: "red",
    description:
      "Igual que el 160 pero con 100mg de cafeína para un boost extra en los últimos kilómetros.",
    flavors: ["Original"],
    image: "/maurten_caf.png",
  },
  {
    id: 3,
    name: "Tailwind Hydration",
    subtitle: "Mezcla de hidratación y electrolitos",
    category: "Hidratación",
    price: 34.99,
    originalPrice: 39.99,
    colors: ["#00c87a", "#009960", "#ccf5e4"],
    badge: "Sale",
    badgeColor: "red",
    description:
      "Todo lo que necesitas en una sola mezcla: carbohidratos, electrolitos y calorías. Sin malestar estomacal.",
    flavors: ["Limón", "Naranja", "Fresa", "Neutro", "Matcha"],
    image: "/tailwind.png",
  },
  {
    id: 4,
    name: "Tailwind Carb",
    subtitle: "Combustible de carbohidratos puro",
    category: "Hidratación",
    price: 29.99,
    colors: ["#0A84FF", "#0055cc", "#d6eaff"],
    badge: "Nuevo",
    badgeColor: "blue",
    description:
      "Carbohidratos de fácil digestión para esfuerzos de alta intensidad. Sin sabor artificial.",
    flavors: ["Neutro", "Limón"],
    image: "/tailwind.png",
  },
  {
    id: 5,
    name: "Beet It Sport",
    subtitle: "Shot de nitrato de remolacha",
    category: "Shots",
    price: 3.49,
    colors: ["#8B0000", "#cc2244", "#ffaacc"],
    badge: "Natural",
    badgeColor: "green",
    description:
      "Shot concentrado de remolacha con 400mg de nitrato. Mejora el VO2 max y la resistencia.",
    flavors: ["Remolacha", "Remolacha + Jengibre"],
    image: "/beet_it.png",
  },
  {
    id: 6,
    name: "Pickle Juice Extra Strength",
    subtitle: "Shot para calambres musculares",
    category: "Shots",
    price: 3.99,
    colors: ["#c8a800", "#f5c842", "#fff8cc"],
    badge: "Más vendido",
    badgeColor: "red",
    description:
      "Detiene los calambres en 35 segundos. 100% natural, probado científicamente. Sin agua extra necesaria.",
    flavors: ["Original"],
    image: "/pickle.png",
  },
];
