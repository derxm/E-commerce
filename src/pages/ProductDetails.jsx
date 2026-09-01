import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCategory } from '../data/products';
import { formatPrice } from '../utils/currency';
import { handleImageError } from '../utils/image';
import { ProductDetailSkeleton } from '../components/Skeletons';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <div className="error-state"><h2>Product not found</h2><p>{error}</p><Link to="/products" className="back-link">Back to Products</Link></div>;
  if (!product) return null;

  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    showToast(
      liked ? 'Removed from wishlist' : 'Added to wishlist',
      liked ? 'remove' : 'wishlist'
    );
  };

  return (
    <div className="product-details">
      <Link to="/products" className="breadcrumb">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Products
      </Link>

      <div className="product-details-content">
        <div className="product-details-image">
          <img src={product.image} alt={product.title} onError={handleImageError} />
        </div>

        <div className="product-details-info">
          <span className="product-details-category">{formatCategory(product.category)}</span>
          <h1 className="product-details-title">{product.title}</h1>

          <div className="product-details-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(product.rating?.rate || 0) ? '#d4af37' : 'none'} stroke="#d4af37" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="rating-text">
              {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="product-details-price">{formatPrice(product.price)}</div>

          <p className="product-details-description">{product.description}</p>

          <div className="product-details-actions">
            <button className="btn-primary btn-cart btn-lg" onClick={handleAddToCart}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Add to Cart
            </button>
            <button
              className={`btn-outline btn-lg ${liked ? 'btn-wishlisted' : ''}`}
              onClick={handleWishlist}
              aria-pressed={liked}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {liked ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
