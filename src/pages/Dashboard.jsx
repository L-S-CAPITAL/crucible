import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import MetricCard from '../components/MetricCard'
import ProjectCard from '../components/ProjectCard'
import {
  loadProjects,
  saveProjects,
  getPortfolioKPIs,
  enrichProject,
  ACTIVITY_FEED,
  MOCK_COPPER_PRICE,
  MOCK_COPPER_CHANGE,
} from '../utils/sampleData'
import { formatAUD, formatPercent } from '../utils/formatters'
import './Dashboard.css'

export default function Dashboard() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [showForm, setShowForm] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    suburb: '',
    apartments: 40,
    supplier: 'Lawrence & Hanson',
  })

  const kpis = getPortfolioKPIs(projects)

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newProject.name.trim()) return

    const project = enrichProject({
      id: `custom-${Date.now()}`,
      name: newProject.name,
      suburb: newProject.suburb || 'Brisbane',
      status: 'draft',
      apartments: newProject.apartments,
      copperSource: 'apartments',
      copperPerApartment: 150,
      lockedPrice: MOCK_COPPER_PRICE,
      currentMarketPrice: MOCK_COPPER_PRICE,
      lockDate: null,
      fitOutMonth: 9,
      supplier: newProject.supplier,
    })

    const updated = [...projects, project]
    setProjects(updated)
    saveProjects(updated)
    setNewProject({ name: '', suburb: '', apartments: 40, supplier: 'Lawrence & Hanson' })
    setShowForm(false)
  }

  return (
    <div className="page dashboard-page animate-fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="page-title">Your copper locks</h1>
          <p className="page-subtitle">Track hedged positions, savings, and market exposure across Brisbane developments.</p>
        </div>
        <button type="button" className="navbar-cta dashboard-new-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="metrics-row dashboard-kpis">
        <MetricCard label="Total Projects" value={kpis.totalProjects} subtext={`${kpis.activeLocks} active locks`} />
        <MetricCard label="Copper Locked" value={`${kpis.totalTonnes.toFixed(1)}T`} subtext="Across portfolio" variant="roi" />
        <MetricCard label="Aggregate Savings" value={formatAUD(kpis.aggregateSavings)} subtext="Mark-to-market" variant="savings" />
        <MetricCard label="Avg Hedge ROI" value={formatPercent(kpis.avgRoi)} subtext="At 2x scenario" variant="time" />
      </div>

      {showForm && (
        <form className="new-project-form glass-card" onSubmit={handleCreate}>
          <h3>Create New Project</h3>
          <div className="form-row">
            <input
              className="form-input"
              placeholder="Project name"
              value={newProject.name}
              onChange={(e) => setNewProject((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <input
              className="form-input"
              placeholder="Suburb"
              value={newProject.suburb}
              onChange={(e) => setNewProject((p) => ({ ...p, suburb: e.target.value }))}
            />
            <input
              className="form-input"
              type="number"
              placeholder="Apartments"
              min={5}
              value={newProject.apartments}
              onChange={(e) => setNewProject((p) => ({ ...p, apartments: Number(e.target.value) }))}
            />
            <button type="submit" className="navbar-cta">Save Draft</button>
          </div>
        </form>
      )}

      <div className="dashboard-layout">
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <aside className="dashboard-sidebar">
          <div className="market-pulse glass-card">
            <h3>Market pulse</h3>
            <div className="pulse-price">
              <span className="pulse-label">LME Copper (AUD)</span>
              <span className="pulse-value">{formatAUD(MOCK_COPPER_PRICE)}/T</span>
              <span className="pulse-change positive">+{MOCK_COPPER_CHANGE}% this week</span>
            </div>
            <div className="sparkline">
              {[40, 45, 42, 48, 52, 50, 55, 58, 54, 60, 62, 58, 65, 68, 64, 70, 72, 68, 75, 78, 74, 80, 82, 78, 85, 88, 84, 90, 92, 88].map((h, i) => (
                <div key={i} className="spark-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="pulse-note">Mock 30-day trend. Live LME feed available on Enterprise.</p>
          </div>

          <div className="activity-feed glass-card">
            <h3>Recent activity</h3>
            <ul>
              {ACTIVITY_FEED.map((item) => (
                <li key={item.id}>
                  <span className="activity-text">{item.text}</span>
                  <span className="activity-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/forecaster" className="sidebar-cta glass-card">
            Run full scenario analysis
          </Link>
        </aside>
      </div>
    </div>
  )
}