import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCategory } from '../data/products';
import { formatPrice } from '../utils/currency';
import { handleImageError } from '../utils/image';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love for later.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
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
