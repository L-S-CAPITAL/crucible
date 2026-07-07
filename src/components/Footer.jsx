import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">Crucible</Link>
            <p>Commodity certainty for creative property developers.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <Link to="/forecaster">Forecaster</Link>
              <Link to="/dashboard">Portfolio</Link>
              <Link to="/pricing">Pricing</Link>
            </div>
            <div>
              <h4>Company</h4>
              <span>Brisbane, QLD</span>
              <a href="mailto:hello@crucible.dev">hello@crucible.dev</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Crucible</span>
          <span className="footer-disclaimer">
            Simulated scenarios only. Not financial advice. Commodity hedging involves basis risk.
          </span>
        </div>
      </div>
    </footer>
  )
}