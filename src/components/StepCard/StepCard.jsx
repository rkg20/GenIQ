import './StepCard.css'

export default function StepCard({ number, title, description }) {
  return (
    <article className="step-card">
      <span className="step-card__num">{number}</span>
      <div className="stack" style={{ gap: 8 }}>
        <h4>{title}</h4>
        <p className="text-muted">{description}</p>
      </div>
    </article>
  )
}
