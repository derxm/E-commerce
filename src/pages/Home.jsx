import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { categoryMeta } from '../data/products';
import './Home.css';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        const featured = [...products.slice(0, 4), ...products.slice(-6)];
        setAllProducts(products);
        setFeaturedProducts(featured);
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const productCount = (cat) =>
    allProducts.filter((p) => p.category === cat).length;

  if (loading) return <Loader message="Loading shop..." />;
  if (error) return <div className="error-state"><h2>Something went wrong</h2><p>{error}</p></div>;

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover <span className="highlight">Amazing</span> Products
          </h1>
          <p className="hero-subtitle">
            Shop the latest trends with unbeatable prices and quality.
          </p>
          <Link to="/products" className="hero-btn">
            Shop Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-heading">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Explore our most popular collections and find exactly what you need.
          </p>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`} className="category-card">
              <div className="category-top">
                <span className="category-emoji">{categoryMeta[cat]?.emoji || '🏷️'}</span>
                <svg className="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
              <div className="category-bottom">
                <span className="category-name">{categoryMeta[cat]?.label || cat}</span>
                <span className="category-count">{productCount(cat)}+ products</span>
                <span className="category-explore">Explore products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="view-all-link">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
