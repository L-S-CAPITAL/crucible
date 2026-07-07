import { Info } from 'lucide-react'

export default function SliderInput({
  id,
  label,
  value,
  displayValue,
  min,
  max,
  step = 1,
  scaleLabels,
  tooltip,
  valueColor,
  onChange,
  icon: Icon,
}) {
  return (
    <div className="input-group">
      <div className="input-label-row">
        <label className="input-label" htmlFor={id}>
          {Icon && <Icon size={15} />}
          {label}
          {tooltip && (
            <span className="info-tooltip">
              <Info size={13} />
              <span className="info-tooltip-content">{tooltip}</span>
            </span>
          )}
        </label>
        <span className="input-value" style={valueColor ? { color: valueColor } : undefined}>
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        className="range-slider"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {scaleLabels && (
        <div className="slider-scale">
          {scaleLabels.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
    </div>
  )
}