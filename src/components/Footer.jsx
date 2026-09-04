import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">
            <img src="/logo.svg" alt="" width="22" height="22" style={{ verticalAlign: 'middle', marginRight: 6 }} />
            DexHub
          </span>
          <p className="footer-tagline">Your one-stop shop for everything.</p>
        </div>
        <div className="footer-links">
          <a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer">API Source</a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} DexHub. Built with React.</p>
      </div>
    </footer>
  );
};

export default Footer;
