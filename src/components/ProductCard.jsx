import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCategory } from '../data/products';
import { formatPrice } from '../utils/currency';
import { handleImageError } from '../utils/image';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [pulse, setPulse] = useState(false);
  const liked = isInWishlist(product.id);

  const handleWishlist = () => {
    setPulse(true);
    window.setTimeout(() => setPulse(false), 400);
    toggleWishlist(product);
    showToast(
      liked ? 'Removed from wishlist' : 'Added to wishlist',
      liked ? 'remove' : 'wishlist'
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          <img src={product.image} alt={product.title} loading="lazy" onError={handleImageError} />
        </div>
        <div className="product-card-info">
          <span className="product-card-category">{formatCategory(product.category)}</span>
          <h3 className="product-card-title">{product.title}</h3>
          <div className="product-card-bottom">
            <span className="product-card-price">{formatPrice(product.price)}</span>
            <div
              className="product-card-rating"
              role="img"
              aria-label={`Rated ${product.rating?.rate || 0} out of 5`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{product.rating?.rate || 0}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="product-card-actions">
        <button
          className={`wishlist-btn ${liked ? 'active' : ''} ${pulse ? 'pop' : ''}`}
          onClick={handleWishlist}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;