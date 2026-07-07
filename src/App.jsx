import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppSidebar from './components/AppSidebar'
import AppTopBar from './components/AppTopBar'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Forecaster from './pages/Forecaster'
import Pricing from './pages/Pricing'
import './App.css'

function MarketingLayout() {
  return (
    <div className="app-shell app-shell--marketing">
      <Navbar variant="dark" />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="app-shell app-shell--workspace">
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />
      <AppSidebar open={sidebarOpen} onNavigate={closeSidebar} />
      <div className="app-frame">
        <AppTopBar onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="app-main app-main--workspace">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="forecaster" element={<Forecaster />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  )
}

export default App