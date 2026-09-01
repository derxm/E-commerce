import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { categoryMeta } from '../data/products';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromQuery = searchParams.get('category') || 'all';
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(categoryFromQuery);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, sort]);

  if (loading) return <Loader message="Loading products..." />;
  if (error) return <div className="error-state"><h2>Failed to load products</h2><p>{error}</p></div>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="page-title">All Products</h1>
        <p className="page-subtitle">{filteredProducts.length} products found</p>
      </div>

      <div className="products-toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />

        <div className="toolbar-filters">
          <select
            className="filter-select"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryMeta[cat]?.label || cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
