import './Skeletons.css';

export const ProductCardSkeleton = () => (
  <div className="product-card skeleton-card" aria-hidden="true">
    <div className="skeleton skeleton-image" />
    <div className="product-card-info">
      <div className="skeleton skeleton-line w-40" />
      <div className="skeleton skeleton-line w-90" />
      <div className="skeleton skeleton-line w-70" />
      <div className="skeleton skeleton-actions">
        <div className="skeleton skeleton-circle" />
        <div className="skeleton skeleton-button" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="products-grid">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
    <span className="sr-only" role="status">
      Loading products...
    </span>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="product-details">
    <div className="product-details-content skeleton-detail">
      <div className="skeleton skeleton-detail-image" aria-hidden="true" />
      <div className="product-details-info">
        <div className="skeleton skeleton-line w-40" />
        <div className="skeleton skeleton-detail-title" />
        <div className="skeleton skeleton-line w-50" />
        <div className="skeleton skeleton-line w-100" />
        <div className="skeleton skeleton-line w-90" />
        <div className="skeleton skeleton-line w-80" />
        <div className="skeleton skeleton-detail-actions">
          <div className="skeleton skeleton-detail-btn" />
          <div className="skeleton skeleton-detail-btn" />
        </div>
      </div>
    </div>
    <span className="sr-only" role="status">
      Loading product...
    </span>
  </div>
);