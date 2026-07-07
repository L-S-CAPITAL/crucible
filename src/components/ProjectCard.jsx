import { Link } from 'react-router-dom'
import { ArrowRight, Building2 } from 'lucide-react'
import { formatAUD } from '../utils/formatters'

const STATUS_LABELS = {
  active: { label: 'Active Lock', className: 'status-active' },
  completed: { label: 'Completed', className: 'status-completed' },
  draft: { label: 'Draft', className: 'status-draft' },
}

export default function ProjectCard({ project }) {
  const status = STATUS_LABELS[project.status] || STATUS_LABELS.draft

  return (
    <div className="project-card glass-card">
      <div className="project-card-header">
        <div className="project-card-icon">
          <Building2 size={18} />
        </div>
        <span className={`project-status ${status.className}`}>{status.label}</span>
      </div>

      <h3 className="project-card-title">{project.name}</h3>
      <p className="project-card-subtitle">{project.suburb} · {project.tonnes}T copper · {project.supplier}</p>

      <div className="project-card-metrics">
        <div>
          <span className="project-metric-label">Locked Price</span>
          <span className="project-metric-value">{formatAUD(project.lockedPrice)}/T</span>
        </div>
        <div>
          <span className="project-metric-label">Market Now</span>
          <span className="project-metric-value market">{formatAUD(project.currentMarketPrice)}/T</span>
        </div>
        <div>
          <span className="project-metric-label">Savings to Date</span>
          <span className="project-metric-value savings">{formatAUD(project.savingsToDate)}</span>
        </div>
      </div>

      <Link to={`/forecaster?project=${project.id}`} className="project-card-action">
        Open Forecaster
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}