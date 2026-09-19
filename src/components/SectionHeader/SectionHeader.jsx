export default function SectionHeader({ eyebrow, title, description, align = 'center', children }) {
  return (
    <div className={`section-head ${align === 'left' ? 'section-head--left' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {description && <p className="lead">{description}</p>}
      {children}
    </div>
  )
}
