import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import Logo from '../../components/Logo/Logo'
import { login } from '../../services/authService'
import './Login.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotice('')
    setSubmitting(true)
    // Authenticates against the user-service. No credentials are stored here.
    const res = await login(form)
    setSubmitting(false)

    if (res.placeholder) {
      setNotice('Accounts are coming soon. Start your journey to be first in line.')
    } else if (res.ok && res.data) {
      setNotice(`Welcome back, ${res.data.name || res.data.email}!`)
    } else if (res.status === 401) {
      setNotice('Invalid email or password.')
    } else {
      setNotice(res.message || 'Unable to sign in right now. Please try again.')
    }
  }

  return (
    <>
      <Seo
        title="Login"
        description="Sign in to your GenIQ account."
        path="/login"
      />
      <section className="section login">
        <div className="login__card card">
          <div className="login__brand">
            <Logo />
          </div>
          <h1>Welcome Back</h1>
          <p className="text-muted">Sign in to continue your journey.</p>

          <form onSubmit={handleSubmit} className="login__form" noValidate>
            <div className="field">
              <label htmlFor="l-email">Email</label>
              <input
                id="l-email"
                type="email"
                className="input"
                autoComplete="username"
                value={form.email}
                onChange={update('email')}
              />
            </div>
            <div className="field">
              <label htmlFor="l-password">Password</label>
              <input
                id="l-password"
                type="password"
                className="input"
                autoComplete="current-password"
                value={form.password}
                onChange={update('password')}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Login'}
            </button>
          </form>

          {notice && <p className="login__notice">{notice}</p>}

          <Link to="/forgot-password" className="login__forgot">
            Forgot Password?
          </Link>

          <p className="login__signup">
            Don’t have an account? <Link to="/pricing">Start Your Journey</Link>
          </p>
        </div>
      </section>
    </>
  )
}
