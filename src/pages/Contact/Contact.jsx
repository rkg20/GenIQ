import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import Toast from '../../components/Toast/Toast'
import { submitLead } from '../../services/leadService'
import './Contact.css'

const roles = ['Parent', 'Student', 'Teacher', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'Parent', message: '' })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.phone && !/^[\d\s+()-]{7,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
    if (!form.message.trim()) next.message = 'Please add a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    // Persist the enquiry as a lead in the user-service database.
    const res = await submitLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: `I am a: ${form.role}\n\n${form.message}`,
      source: 'contact-form',
    })
    setSubmitting(false)

    if (res.placeholder) {
      // Backend not configured — fall back to the user's email client.
      const subject = encodeURIComponent(`GenIQ enquiry from ${form.name} (${form.role})`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nI am a: ${form.role}\n\n${form.message}`
      )
      window.location.href = `mailto:hello@geniq.app?subject=${subject}&body=${body}`
      setToast('Thanks! Your email client is opening to send your message.')
      return
    }

    if (res.ok) {
      setForm({ name: '', email: '', phone: '', role: 'Parent', message: '' })
      setToast('Thanks! Your message has been received. We’ll be in touch soon.')
    } else {
      setToast(res.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with the GenIQ team. We’d love to help your family start its journey."
        path="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        title="Let’s Start a Conversation"
        description="Have a question about the program? We’re happy to help."
      />

      <section className="section container">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Reach us directly</h3>
            <ul>
              <li><span className="icon-badge"><Mail size={20} /></span><a href="mailto:hello@geniq.app">hello@geniq.app</a></li>
              <li><span className="icon-badge"><Phone size={20} /></span><a href="tel:+910000000000">+91 00000 00000</a></li>
              <li><span className="icon-badge"><MapPin size={20} /></span>Available online, across India</li>
            </ul>
            <p className="text-muted contact-info__note">
              We usually respond within one business day.
            </p>
          </div>

          <form className="contact-form card" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" className="input" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" className="input" value={form.email} onChange={update('email')} aria-invalid={!!errors.email} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="c-phone">Phone</label>
              <input id="c-phone" type="tel" className="input" value={form.phone} onChange={update('phone')} aria-invalid={!!errors.phone} />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="field">
              <label htmlFor="c-role">I am a</label>
              <select id="c-role" className="select" value={form.role} onChange={update('role')}>
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" className="textarea" value={form.message} onChange={update('message')} aria-invalid={!!errors.message} />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <Toast message={toast} onDone={() => setToast('')} />
    </>
  )
}
