export default function MetricCard({ label, value, subtext, variant = 'default' }) {
  return (
    <div className={`metric-card ${variant}`}>
      <span className="metric-label">{label}</span>
      <div className={`metric-value ${variant === 'savings' ? 'green' : variant === 'time' ? 'blue' : variant === 'roi' ? 'copper-color' : ''}`}>
        {value}
      </div>
      {subtext && <span className="metric-subtext">{subtext}</span>}
    </div>
  )
}