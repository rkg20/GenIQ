import './ProgressCard.css'

export function ProgressBar({ value, label }) {
  return (
    <div className="progress-block">
      {label && (
        <div className="progress-block__top">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="progress-bar">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export function ProgressRing({ value, label, color = 'var(--color-primary)' }) {
  const r = 40
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="progress-ring">
      <svg viewBox="0 0 100 100" width="104" height="104">
        <circle cx="50" cy="50" r={r} className="progress-ring__track" />
        <circle
          cx="50"
          cy="50"
          r={r}
          className="progress-ring__value"
          style={{ strokeDasharray: c, strokeDashoffset: offset, stroke: color }}
        />
      </svg>
      <div className="progress-ring__center">
        <strong>{value}%</strong>
        {label && <span>{label}</span>}
      </div>
    </div>
  )
}
