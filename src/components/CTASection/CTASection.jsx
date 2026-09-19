import Button from '../Button/Button'
import Reveal from '../Reveal/Reveal'

export default function CTASection({
  title = 'Start Understanding Each Other Better.',
  copy = 'Because closing the generation gap starts with listening.',
  primary = { label: 'Start Your Journey', to: '/pricing' },
  secondary = { label: 'Explore How It Works', to: '/how-it-works' },
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta-section">
            <h2>{title}</h2>
            <p className="lead" style={{ maxWidth: 560 }}>
              {copy}
            </p>
            <div className="cta-actions">
              {primary && (
                <Button to={primary.to} variant="primary">
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button to={secondary.to} variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
