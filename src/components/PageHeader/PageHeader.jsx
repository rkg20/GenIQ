import Reveal from '../Reveal/Reveal'

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="page-header">
      <div className="container">
        <Reveal>
          <div className="stack">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {description && (
              <p className="lead" style={{ maxWidth: 680 }}>
                {description}
              </p>
            )}
            {children}
          </div>
        </Reveal>
      </div>
    </header>
  )
}
