import { NavLink, Link } from 'react-router-dom'
import {
  LayoutGrid,
  LineChart,
  CircleDollarSign,
  ArrowUpRight,
  Hexagon,
} from 'lucide-react'
import './AppSidebar.css'

const WORKSPACE_NAV = [
  { to: '/dashboard', label: 'Portfolio', icon: LayoutGrid },
  { to: '/forecaster', label: 'Forecaster', icon: LineChart },
  { to: '/pricing', label: 'Pricing', icon: CircleDollarSign },
]

export default function AppSidebar({ open = false, onNavigate }) {
  return (
    <aside className={`app-sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
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
        <Link to="/" className="sidebar-link sidebar-link--muted">
          <ArrowUpRight size={16} strokeWidth={1.5} />
          crucible.dev
        </Link>
        <div className="sidebar-user">
          <span className="sidebar-avatar">JD</span>
          <div>
            <span className="sidebar-user-name">James Developer</span>
            <span className="sidebar-user-role">CEO · Demo</span>
          </div>
        </div>
      </div>
    </aside>
  )
}