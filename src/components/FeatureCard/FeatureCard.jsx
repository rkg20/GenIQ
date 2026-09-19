export default function FeatureCard({ icon: Icon, title, description, tone = 'primary' }) {
  return (
    <article className="card card--lift feature-card">
      <span className={`icon-badge tone-${tone}`}>
        {Icon && <Icon size={24} aria-hidden="true" />}
      </span>
      <h4>{title}</h4>
      <p className="text-muted">{description}</p>
    </article>
  )
}
