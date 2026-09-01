// Category metadata and mapping for the shop.
// Products come from the DummyJSON API; this file holds the display labels,
// emojis, and the mapping from DummyJSON's fine-grained categories into the
// app's familiar category buckets.

// Map each DummyJSON category slug into one of the app's display buckets.
export const CATEGORY_MAP = {
  beauty: 'beauty',
  fragrances: 'beauty',
  'skin-care': 'beauty',
  furniture: 'home',
  'home-decoration': 'home',
  'kitchen-accessories': 'home',
  groceries: 'home',
  laptops: 'electronics',
  smartphones: 'electronics',
  tablets: 'electronics',
  'mobile-accessories': 'electronics',
  'mens-shirts': "men's clothing",
  tops: "women's clothing",
  'womens-dresses': "women's clothing",
  'mens-shoes': 'shoes',
  'womens-shoes': 'shoes',
  'mens-watches': 'accessories',
  'womens-watches': 'accessories',
  sunglasses: 'accessories',
  motorcycle: 'automotive',
  vehicle: 'automotive',
  'sports-accessories': 'sports',
  'womens-bags': 'bags',
  'womens-jewellery': 'jewelery',
};

export const categoryMeta = {
  shoes: { emoji: '👟', label: 'Shoes' },
  bags: { emoji: '👜', label: 'Bags' },
  accessories: { emoji: '🕶️', label: 'Accessories' },
  beauty: { emoji: '💄', label: 'Beauty' },
  home: { emoji: '🏠', label: 'Home' },
  electronics: { emoji: '💻', label: 'Electronics' },
  "men's clothing": { emoji: '👔', label: "Men's Clothing" },
  "women's clothing": { emoji: '👗', label: "Women's Clothing" },
  jewelery: { emoji: '💎', label: 'Jewelery' },
  sports: { emoji: '⚽', label: 'Sports' },
  toys: { emoji: '🧸', label: 'Toys & Games' },
  automotive: { emoji: '🚗', label: 'Automotive' },
  office: { emoji: '🖥️', label: 'Office' },
  pet: { emoji: '🐾', label: 'Pet Supplies' },
};

export const formatCategory = (cat) =>
  categoryMeta[cat]?.label ||
  cat.charAt(0).toUpperCase() + cat.slice(1);
