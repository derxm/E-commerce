import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { ProductGridSkeleton } from '../components/Skeletons';
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

  const clearAllFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('default');
    const params = new URLSearchParams();
    setSearchParams(params);
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

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-header">
          <h1 className="page-title">All Products</h1>
          <p className="page-subtitle">Loading products...</p>
        </div>
        <ProductGridSkeleton count={12} />
      </div>
    );
  }
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
        <EmptyState
          icon={search ? '🔍' : '🏷️'}
          title="No products found"
          description={
            search
              ? `Nothing matches "${search}" right now. Try a different keyword or clear your filters.`
              : 'No products match your current filters. Try adjusting them to see more.'
          }
          actionText="Clear filters"
          onAction={clearAllFilters}
        />
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
