import { NavLink, Link } from 'react-router-dom'
import {
  LayoutGrid,
  LineChart,
  CircleDollarSign,
  ArrowUpRight,
  Hexagon,
  Package,
  BookOpen,
  LogIn,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './AppSidebar.css'

const WORKSPACE_NAV = [
  { to: '/dashboard', label: 'Portfolio', icon: LayoutGrid },
  { to: '/forecaster', label: 'Forecaster', icon: LineChart },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/docs/lme-forward-curve', label: 'LME Docs', icon: BookOpen },
  { to: '/pricing', label: 'Pricing', icon: CircleDollarSign },
]

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'CR'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function AppSidebar({ open = false, onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <aside className={`app-sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand" onClick={onNavigate}>
          <Hexagon size={16} strokeWidth={1.5} />
          <span>Crucible</span>
        </Link>
        <span className="sidebar-workspace">Brisbane Ops</span>
      </div>

      <nav className="sidebar-nav" aria-label="Workspace">
        <span className="sidebar-section-label">Workspace</span>
        {WORKSPACE_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link sidebar-link--muted" onClick={onNavigate}>
          <ArrowUpRight size={16} strokeWidth={1.5} />
          crucible.dev
        </Link>
        {isAuthenticated ? (
          <>
            <div className="sidebar-user">
              <span className="sidebar-avatar">{initials(user?.name)}</span>
              <div>
                <span className="sidebar-user-name">{user?.name}</span>
                <span className="sidebar-user-role">
                  {(user?.plan || 'starter').replace(/^\w/, (c) => c.toUpperCase())} plan
                </span>
              </div>
            </div>
            <button
              type="button"
              className="sidebar-link sidebar-link--muted as-button"
              onClick={() => {
                logout()
                onNavigate?.()
              }}
            >
              <LogOut size={16} strokeWidth={1.5} />
              Sign out
            </button>
          </>
        ) : (
          <Link to="/login" className="sidebar-link" onClick={onNavigate}>
            <LogIn size={16} strokeWidth={1.5} />
            Log in / Register
          </Link>
        )}
      </div>
    </aside>
  )
}
