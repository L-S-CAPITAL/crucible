import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import './AppTopBar.css'

const PAGE_TITLES = {
  '/dashboard': 'Portfolio',
  '/forecaster': 'Forecaster',
  '/pricing': 'Pricing',
}

export default function AppTopBar({ onMenuToggle }) {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] || 'Workspace'

  return (
    <header className="app-topbar">
      <button
        type="button"
        className="app-topbar-menu"
        onClick={onMenuToggle}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>
      <div className="app-topbar-crumb">
        <span className="app-topbar-org">Brisbane Ops</span>
        <span className="app-topbar-sep">/</span>
        <span className="app-topbar-page">{title}</span>
      </div>
      <div className="app-topbar-actions">
        <span className="app-topbar-status">
          <span className="status-dot" />
          LME Copper · $13,542/T
        </span>
      </div>
    </header>
  )
}