// Fallback shown whenever an external product image fails to load.
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&auto=format';

export const handleImageError = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMAGE) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMAGE;
  }
};
