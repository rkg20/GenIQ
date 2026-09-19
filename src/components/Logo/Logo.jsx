import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="GenIQ home">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="34" height="34">
          <path
            d="M6 27c6-9 22-9 28 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M12 30V22M20 30V17M28 30V22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </span>
      <span className="logo__text">
        <span className="logo__name">GenIQ</span>
        <span className="logo__tag">Understand • Connect • Grow</span>
      </span>
    </Link>
  )
}
