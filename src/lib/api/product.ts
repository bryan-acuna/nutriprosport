import { supabase } from '@/lib/supabase';

// ---- Public app-facing type (what components consume) ----
// Mirrors the shape currently used by the app (see src/data/products.ts).
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
  usage?: string[];
  image: string;
}

// ---- Internal DB row type (matches the products table exactly) ----
interface DbProduct {
  id: number;
  name: string;
  subtitle: string | null;
  category: string;
  price: number;
  original_price: number | null;
  badge: string | null;
  badge_color: 'red' | 'blue' | 'green' | null;
  flavors: string[];
  description: string;
  usage: string[];
  image: string;
  inventory: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const STORAGE_BUCKET = 'products';

const imgUrl = (path: string): string => {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data
    .publicUrl;
};

const mapProduct = (row: DbProduct): Product => ({
  id: row.id,
  name: row.name,
  subtitle: row.subtitle ?? '',
  category: row.category,
  price: Number(row.price),
  originalPrice:
    row.original_price != null ? Number(row.original_price) : undefined,
  badge: row.badge ?? undefined,
  badgeColor: row.badge_color ?? undefined,
  flavors: row.flavors.length > 0 ? row.flavors : undefined,
  description: row.description,
  usage: row.usage.length > 0 ? row.usage : undefined,
  image: imgUrl(row.image),
});

export const listProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true });
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
};

export const getProduct = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return mapProduct(data as DbProduct);
};
