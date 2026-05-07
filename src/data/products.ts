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
      'Gel de alta carga con 40g de carbohidratos en una mezcla de glucosa y fructosa (ratio 0.8:1) que permite absorber más energía por hora sin saturar el sistema digestivo. La tecnología de hidrogel encapsula los carbohidratos y los transporta a través del estómago hasta el intestino, reduciendo el malestar gastrointestinal típico de los geles tradicionales. Listo para tomar sin necesidad de agua. Ideal para esfuerzos largos como maratón, triatlón o ciclismo de fondo.',
    flavors: ['Original'],
    image: '/maurten_160.png',
  },
  {
    id: 2,
    name: 'Maurten Gel 160 (12 unidades)',
    subtitle: 'Caja de 12 geles de hidrogel',
    category: 'Geles',
    price: 65,
    badge: 'Ahorra',
    badgeColor: 'blue',
    description:
      'Caja de 12 unidades del Maurten Gel 160 con un mejor precio por unidad. Cada gel aporta 40g de carbohidratos en formato hidrogel para una absorción eficiente y mínimo riesgo de molestias digestivas. Pensada para preparar y completar maratones, ultras o bloques largos de entrenamiento donde necesitas alta densidad calórica sostenida.',
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
      'Versión compacta del gel de hidrogel de Maurten con 25g de carbohidratos por unidad. Misma tecnología que protege la mucosa estomacal: una matriz biopolimérica de pectina y alginato encapsula los carbohidratos hasta llegar al intestino. Fórmula limpia con solo 6 ingredientes, sin colorantes ni conservantes. Perfecto para entrenamientos de 1–2 horas o como complemento entre geles más grandes en carreras largas.',
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
      'Gel de hidrogel con 25g de carbohidratos y 100mg de cafeína natural extraída del grano de café verde. La cafeína mejora el enfoque, reduce la percepción del esfuerzo y retrasa la fatiga, ideal para los kilómetros finales o ataques en carrera. Tómalo entre 30 y 45 minutos antes del momento donde necesitas el empuje extra.',
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
      'Combustible todo-en-uno: cada servicio aporta calorías (dextrosa + sacarosa), electrolitos completos (sodio, potasio, magnesio y calcio) e hidratación en una sola bebida. La mezcla de azúcares simples se absorbe directamente en el torrente sanguíneo, evitando los picos digestivos y los calambres. Puedes usarlo como única fuente de fuel en esfuerzos de más de 2 horas (mezcla 2–2.5 cucharadas en 700ml de agua, ~250 cal/h). 30 raciones.',
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
      'Formato familiar de 50 raciones del clásico Tailwind: carbohidratos de fácil digestión más electrolitos para ultradistancia, ciclismo de fondo o entrenamientos en bloque. Sin gluten, sin lácteos, sin soja, vegano y no GMO. Excelente relación coste-ración para atletas que entrenan varias veces por semana.',
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
      'Shot concentrado de zumo de remolacha con un mínimo de 400mg de nitrato dietético. En el cuerpo, el nitrato se convierte en óxido nítrico, que dilata los vasos sanguíneos, mejora la eficiencia mitocondrial y reduce el coste de oxígeno del ejercicio. Estudios respaldados por el COI muestran mejoras del 1–3% en pruebas contrarreloj de menos de 40 minutos y del 4–25% en tiempo hasta el agotamiento. Tómalo 2–3 horas antes de competir, o haz una "carga" de un shot diario durante 3–6 días previos al evento. Certificado Informed Sport.',
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
      'Shot de jugo de pepinillo de fórmula reforzada que detiene los calambres en aproximadamente 1.5 minutos. El ácido acético estimula receptores en la orofaringe, lo que activa un reflejo neural que inhibe las neuronas motoras alfa de la musculatura acalambrada y la hace relajarse. No depende de los electrolitos ni de la rehidratación: el efecto es por el reflejo nervioso, no por absorción. Llévalo en la mochila o cinturón para emergencias durante carreras largas o partidos.',
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
      'Sobre individual con 1000mg de sodio, 200mg de potasio y 60mg de magnesio en una proporción diseñada para reponer lo que pierdes en sudor abundante. Sin azúcar, sin gluten, sin colorantes y compatible con dietas keto, paleo, ayuno intermitente o low-carb. Útil al despertar, 30 min antes de entrenar, en ambientes calurosos o después de sesiones de alto volumen para evitar fatiga, dolores de cabeza y calambres por hiponatremia.',
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
      'Stroopwafel orgánico endulzado con miel real, no jarabe de maíz. 150 calorías y ~19g de carbohidratos por unidad de absorción rápida pero textura sólida que cae bien en el estómago. Funciona muy bien antes de entrenar, durante carreras largas (en trozos cada 30 minutos) o como recuperación inmediata cuando aún no toleras comida normal. Sabor a fresa.',
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
      'Misma fórmula orgánica de miel del waffle clásico, en versión chocolate. ~150 calorías y 19g de carbohidratos de digestión sencilla, ideales pre-entreno, durante esfuerzos largos o post-entreno cuando el estómago aún está cerrado a una comida completa. Ingredientes orgánicos certificados, sin jarabes de maíz alto en fructosa.',
    flavors: ['Chocolate'],
    image: '/chocolate_waffle.png',
  },
];
