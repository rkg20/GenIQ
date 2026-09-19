import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import Logo from '../Logo/Logo'
import './Footer.css'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'About', to: '/how-it-works' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: '3-Stage Journey', to: '/journey' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'For Parents', to: '/parents' },
      { label: 'For Students', to: '/students' },
      { label: 'Mentors', to: '/mentors' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Articles', to: '/resources' },
      { label: 'Guides', to: '/resources' },
      { label: 'FAQ', to: '/how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Terms', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo light />
          <p>
            A structured journey helping parents and children understand each other,
            communicate better, and grow together.
          </p>
          <div className="footer__social">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="footer__cols">
          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 GenIQ. All rights reserved.</span>
        <span className="footer__motto">Understand • Connect • Grow</span>
      </div>
    </footer>
  )
}
