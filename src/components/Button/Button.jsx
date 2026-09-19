import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  block,
  icon: Icon,
  ...props
}) {
  const cls = `btn btn-${variant} ${block ? 'btn-block' : ''} ${className}`.trim()

  const content = (
    <>
      {children}
      {Icon && <Icon size={18} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} {...props}>
      {content}
    </button>
  )
}
