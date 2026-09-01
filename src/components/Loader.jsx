import './Loader.css';

const Loader = ({ message }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner">
        <div className="spinner-ring"></div>
      </div>
      <p className="loader-text">{message || 'Loading...'}</p>
    </div>
  );
};

export default Loader;
