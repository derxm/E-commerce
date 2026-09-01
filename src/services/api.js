import { CATEGORY_MAP } from '../data/products';

const BASE_URL = 'https://dummyjson.com';

// DummyJSON returns real products with image thumbnails that match each item.
// Map its shape into the app's expected product shape.
const mapProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: CATEGORY_MAP[p.category] || p.category,
  image: p.thumbnail,
  rating: { rate: p.rating },
});

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products?limit=200`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return (data.products || []).map(mapProduct);
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  const data = await res.json();
  return mapProduct(data);
};

export const getCategories = async () => {
  const products = await getProducts();
  const ordered = [
    'shoes', 'bags', 'accessories', 'beauty', 'home', 'electronics',
    "men's clothing", "women's clothing", 'jewelery', 'sports',
    'toys', 'automotive', 'office', 'pet',
  ];
  const present = [...new Set(products.map((p) => p.category))];
  const buckets = ordered.filter((c) => present.includes(c));
  const rest = present.filter((c) => !buckets.includes(c));
  return [...buckets, ...rest];
};

export const getProductsByCategory = async (category) => {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
};
