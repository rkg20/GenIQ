import { useState } from 'react'
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react'
import { submitLead } from '../../services/leadService'
import './ChatWidget.css'

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!/^[\d\s+()-]{7,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
    if (!form.message.trim()) next.message = 'Please add a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    const res = await submitLead({ ...form, source: 'chat-widget', createdAt: new Date().toISOString() })
    // Placeholder responses (no backend configured) are treated as accepted so
    // the visitor still gets a confirmation; the payload is ready for the DB once
    // POST /api/leads is wired up.
    if (res.ok || res.placeholder) {
      setStatus('sent')
      setForm(initialForm)
    } else {
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setErrors({})
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Contact us">
          <div className="chat-panel__header">
            <div>
              <p className="chat-panel__title">Chat with GenIQ</p>
              <p className="chat-panel__subtitle">Share your details and we’ll reach out.</p>
            </div>
            <button type="button" className="chat-panel__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="chat-panel__body">
            {status === 'sent' ? (
              <div className="chat-success">
                <CheckCircle2 size={40} className="chat-success__icon" aria-hidden="true" />
                <p className="chat-success__title">Thanks for reaching out!</p>
                <p className="chat-success__text">Our team will contact you shortly.</p>
                <button type="button" className="btn btn-secondary btn-block" onClick={reset}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="chat-form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="chat-name">Name</label>
                  <input id="chat-name" className="input" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="chat-email">Email</label>
                  <input id="chat-email" type="email" className="input" value={form.email} onChange={update('email')} aria-invalid={!!errors.email} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="chat-phone">Phone</label>
                  <input id="chat-phone" type="tel" className="input" value={form.phone} onChange={update('phone')} aria-invalid={!!errors.phone} />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
                <div className="field">
                  <label htmlFor="chat-message">Message</label>
                  <textarea id="chat-message" className="textarea" rows={3} value={form.message} onChange={update('message')} aria-invalid={!!errors.message} />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                {status === 'error' && (
                  <p className="field-error" role="alert">Something went wrong. Please try again.</p>
                )}
                <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                  <Send size={16} aria-hidden="true" />
                  {status === 'sending' ? 'Sending…' : 'Send details'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}
