import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCategory } from '../data/products';
import { formatPrice } from '../utils/currency';
import { handleImageError } from '../utils/image';
import EmptyState from '../components/EmptyState';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
    showToast('Moved to cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <EmptyState
          icon="🤍"
          title="Your wishlist is empty"
          description="Save items you love and find them here anytime."
          actionText="Continue Shopping"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1 className="page-title">My Wishlist</h1>
      <p className="page-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist-item">
            <Link to={`/product/${product.id}`} className="wishlist-item-image">
              <img src={product.image} alt={product.title} onError={handleImageError} />
            </Link>
            <div className="wishlist-item-info">
              <Link to={`/product/${product.id}`} className="wishlist-item-title">{product.title}</Link>
              <span className="wishlist-item-category">{formatCategory(product.category)}</span>
              <span className="wishlist-item-price">{formatPrice(product.price)}</span>
            </div>
            <div className="wishlist-item-actions">
              <button className="btn-primary btn-cart btn-sm" onClick={() => handleAddToCart(product)}>
                Move to Cart
              </button>
              <button className="btn-remove" onClick={() => toggleWishlist(product)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
