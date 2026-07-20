import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Portfolio' },
  { to: '/forecaster', label: 'Forecaster' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/docs/lme-forward-curve', label: 'Docs' },
  { to: '/pricing', label: 'Pricing' },
]

export default function Navbar({ variant = 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = variant === 'dark'
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const close = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  return (
    <header className={`navbar ${isDark ? 'navbar--dark' : ''}`}>
      <div className="navbar-inner navbar-inner--wide">
        <Link to="/" className="navbar-brand" onClick={close}>
          Crucible
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={close}
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <span className="navbar-user mobile-only">{user?.name}</span>
              <button type="button" className="navbar-link as-button mobile-only" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-link mobile-only" onClick={close}>
                Log in
              </NavLink>
              <Link to="/register" className="navbar-cta mobile-cta" onClick={close}>
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span className="navbar-user desktop-only">{user?.name}</span>
              <button type="button" className="navbar-cta desktop-only as-button" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link desktop-auth" onClick={close}>
                Log in
              </Link>
              <Link to="/register" className="navbar-cta">
                <span className="cta-arrow">↖</span> Register
              </Link>
            </>
          )}
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
