import { formatAUD } from '../utils/formatters'

export default function CostChart({ projectName, scenario }) {
  const {
    chart,
    unhedgedTotalCost,
    hedgedTotalCost,
  } = scenario

  const {
    unhedgedBaseH,
    unhedgedSurgeH,
    unhedgedDelayH,
    hedgedBaseH,
    hedgedOperationalH,
    hedgedMarginH,
  } = chart

  return (
    <div className="vis-card glass-card">
      <div className="vis-title">
        <span>Scenario Cost Comparison: {projectName || 'Creative Project'}</span>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#f58220' }} />
            <span>Base Copper</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ef4444' }} />
            <span>Surge Cost</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#3b82f6' }} />
            <span>Delay Carrying</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#10b981' }} />
            <span>Operational</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#f8b500' }} />
            <span>Crucible Margin</span>
          </div>
        </div>
      </div>

      <div className="svg-chart-container">
        <svg width="460" height="280" viewBox="0 0 460 280">
          <line x1="40" y1="30" x2="420" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="40" y1="130" x2="420" y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="40" y1="230" x2="420" y2="230" stroke="rgba(255,255,255,0.1)" />

          <text x="140" y="255" textAnchor="middle" fontSize="12" fill="#8a8a8a" fontWeight="500">
            Unhedged Scenario
          </text>
          <text x="320" y="255" textAnchor="middle" fontSize="12" fill="#8a8a8a" fontWeight="500">
            Crucible Hedged
          </text>

          <rect x="100" y={230 - unhedgedBaseH} width="80" height={unhedgedBaseH} fill="#f58220" opacity="0.8" className="chart-bar-rect" />
          {unhedgedSurgeH > 0 && (
            <rect x="100" y={230 - unhedgedBaseH - unhedgedSurgeH} width="80" height={unhedgedSurgeH} fill="#ef4444" opacity="0.85" className="chart-bar-rect" />
          )}
          {unhedgedDelayH > 0 && (
            <rect x="100" y={230 - unhedgedBaseH - unhedgedSurgeH - unhedgedDelayH} width="80" height={unhedgedDelayH} fill="#3b82f6" opacity="0.8" className="chart-bar-rect" />
          )}
          <text
            x="140"
            y={Math.max(15, 230 - unhedgedBaseH - unhedgedSurgeH - unhedgedDelayH - 8)}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#ef4444"
          >
            {formatAUD(unhedgedTotalCost)}
          </text>

          <rect x="280" y={230 - hedgedBaseH} width="80" height={hedgedBaseH} fill="#f58220" opacity="0.8" className="chart-bar-rect" />
          {hedgedOperationalH > 0 && (
            <rect x="280" y={230 - hedgedBaseH - hedgedOperationalH} width="80" height={hedgedOperationalH} fill="#10b981" opacity="0.8" className="chart-bar-rect" />
          )}
          {hedgedMarginH > 0 && (
            <rect x="280" y={230 - hedgedBaseH - hedgedOperationalH - hedgedMarginH} width="80" height={hedgedMarginH} fill="#f8b500" opacity="0.9" className="chart-bar-rect" />
          )}
          <text
            x="320"
            y={Math.max(15, 230 - hedgedBaseH - hedgedOperationalH - hedgedMarginH - 8)}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#10b981"
          >
            {formatAUD(hedgedTotalCost)}
          </text>
        </svg>
      </div>
    </div>
  )
}