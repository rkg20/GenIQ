import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/journey', label: '3-Stage Journey' },
  { to: '/parents', label: 'For Parents' },
  { to: '/students', label: 'For Students' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Primary">
        <Logo />

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className="navbar__link">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <NavLink to="/login" className="navbar__link navbar__login">
            Login
          </NavLink>
          <Button to="/contact" variant="primary">
            Contact
          </Button>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="navbar__drawer" role="dialog" aria-label="Menu">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className="navbar__drawer-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/login" className="navbar__drawer-link">
                Login
              </NavLink>
            </li>
          </ul>
          <Button to="/contact" variant="primary" block>
            Contact
          </Button>
        </div>
      )}
    </header>
  )
}
