export interface Product {
  id: number;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: 'red' | 'blue' | 'green';
  flavors?: string[];
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Maurten Gel 160',
    subtitle: 'Gel energético de hidrogel',
    category: 'Geles',
    price: 6,
    description:
      'El gel más avanzado del mercado. Hidrogel que reduce el malestar estomacal. 40g de carbohidratos por gel.',
    flavors: ['Original'],
    image: '/maurten_160.png',
  },
  {
    id: 2,
    name: 'Maurten Gel 160 (12 unidades)',
    subtitle: 'Caja de 12 geles de hidrogel',
    category: 'Geles',
    price: 66,
    badge: 'Ahorra',
    badgeColor: 'blue',
    description:
      'Caja de 12 unidades del Maurten Gel 160. 40g de carbohidratos por gel con tecnología de hidrogel para una digestión suave.',
    flavors: ['Original'],
    image: '/maurten_160_box.png',
  },
  {
    id: 3,
    name: 'Maurten Gel 100',
    subtitle: 'Gel energético de hidrogel',
    category: 'Geles',
    price: 5,
    description:
      'Gel de hidrogel con 25g de carbohidratos. Tecnología que encapsula los carbohidratos para una digestión suave durante el ejercicio.',
    flavors: ['Original'],
    image: '/maurten_100.png',
  },
  {
    id: 4,
    name: 'Maurten Gel 100 Caf 100',
    subtitle: 'Gel energético con 100mg de cafeína',
    category: 'Geles',
    price: 5.5,
    badge: 'Con cafeína',
    badgeColor: 'red',
    description:
      'Igual que el 160 pero con 100mg de cafeína para un boost extra en los últimos kilómetros.',
    flavors: ['Original'],
    image: '/maurten_caf.png',
  },
  {
    id: 5,
    name: 'Tailwind Carb (30 servings)',
    subtitle: 'Mezcla de hidratación y electrolitos',
    category: 'Hidratación',
    price: 35,
    badge: 'Sale',
    badgeColor: 'red',
    description:
      'Todo lo que necesitas en una sola mezcla: carbohidratos, electrolitos y calorías. Sin malestar estomacal.',
    flavors: ['Limón', 'Naranja', 'Fresa', 'Neutro', 'Matcha'],
    image: '/tailwind_30.png',
  },
  {
    id: 6,
    name: 'Tailwind Carb (50 servings)',
    subtitle: 'Combustible de carbohidratos puro',
    category: 'Hidratación',
    price: 65,
    badge: 'Nuevo',
    badgeColor: 'blue',
    description:
      'Carbohidratos de fácil digestión para esfuerzos de alta intensidad. Sin sabor artificial.',
    flavors: ['Neutro', 'Limón'],
    image: '/tailwind_50.png',
  },
  {
    id: 7,
    name: 'Beet It Sport',
    subtitle: 'Shot de nitrato de remolacha',
    category: 'Shots',
    price: 4,
    badge: 'Natural',
    badgeColor: 'green',
    description:
      'Shot concentrado de remolacha con 400mg de nitrato. Mejora el VO2 max y la resistencia.',
    flavors: ['Remolacha', 'Remolacha + Jengibre'],
    image: '/beet_it.png',
  },
  {
    id: 8,
    name: 'Pickle Juice Extra Strength',
    subtitle: 'Shot para calambres musculares',
    category: 'Shots',
    price: 3,
    badge: 'Más vendido',
    badgeColor: 'red',
    description:
      'Detiene los calambres en 35 segundos. 100% natural, probado científicamente. Sin agua extra necesaria.',
    flavors: ['Original'],
    image: '/pickle.png',
  },
  {
    id: 9,
    name: 'LMNT Electrolyte',
    subtitle: 'Mezcla de electrolitos sin azúcar',
    category: 'Hidratación',
    price: 1.95,
    badge: 'Sin azúcar',
    badgeColor: 'green',
    description:
      '1000mg de sodio, 200mg de potasio y 60mg de magnesio por sobre. Sin azúcar, sin gluten, sin colorantes artificiales.',
    flavors: ['Citrus', 'Sandía', 'Frambuesa', 'Mango Chili', 'Piña Coco'],
    image: '/lmnt.png',
  },
  {
    id: 10,
    name: 'Honey Stinger Energy Waffle Fresa',
    subtitle: 'Waffle energético de miel y fresa',
    category: 'Waffles',
    price: 3,
    description:
      'Waffle pre y durante el entrenamiento endulzado con miel orgánica. Carbohidratos de rápida absorción con sabor a fresa.',
    flavors: ['Fresa'],
    image: '/honey_waffle.png',
  },
  {
    id: 11,
    name: 'Honey Stinger Energy Waffle Chocolate',
    subtitle: 'Waffle energético de miel y chocolate',
    category: 'Waffles',
    price: 3,
    description:
      'Waffle pre y durante el entrenamiento endulzado con miel orgánica. Carbohidratos de rápida absorción con sabor a chocolate.',
    flavors: ['Chocolate'],
    image: '/chocolate_waffle.png',
  },
];
