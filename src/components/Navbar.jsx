import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Portfolio' },
  { to: '/forecaster', label: 'Forecaster' },
  { to: '/pricing', label: 'Pricing' },
]

export default function Navbar({ variant = 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = variant === 'dark'

  return (
    <header className={`navbar ${isDark ? 'navbar--dark' : ''}`}>
      <div className="navbar-inner navbar-inner--wide">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          Crucible
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/forecaster" className="navbar-cta mobile-cta" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/forecaster" className="navbar-cta">
            <span className="cta-arrow">↖</span> Get Started
          </Link>
          <button
            type="button"
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}