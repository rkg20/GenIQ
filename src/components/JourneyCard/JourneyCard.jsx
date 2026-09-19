import './JourneyCard.css'

const stageMeta = {
  past: { bg: 'var(--past-bg)', color: 'var(--past)', label: 'Past' },
  present: { bg: 'var(--present-bg)', color: 'var(--present)', label: 'Present' },
  future: { bg: 'var(--future-bg)', color: 'var(--future)', label: 'Future' },
}

export default function JourneyCard({ stage, badge, title, description, items }) {
  const meta = stageMeta[stage]
  return (
    <article className="journey-card" style={{ background: meta.bg }}>
      <div className="journey-card__top">
        <span className="journey-card__badge" style={{ color: meta.color }}>
          {badge}
        </span>
        <span className="journey-card__stage" style={{ color: meta.color }}>
          {meta.label}
        </span>
      </div>
      <h3 style={{ color: 'var(--color-navy)' }}>{title}</h3>
      <p className="text-muted">{description}</p>
      {items && (
        <ul className="journey-card__list">
          {items.map((it) => (
            <li key={it}>
              <span className="dot" style={{ background: meta.color }} />
              {it}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
