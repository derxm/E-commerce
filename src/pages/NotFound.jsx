import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-code" aria-hidden="true">
        4<span className="not-found-zero">0</span>4
      </div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-text">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
        <Link to="/products" className="not-found-link">
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;