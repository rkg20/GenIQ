import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import Logo from '../../components/Logo/Logo'
import { forgotPassword } from '../../services/authService'
import '../Login/Login.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotice('')
    setSubmitting(true)
    const res = await forgotPassword(email)
    setSubmitting(false)

    if (res.placeholder) {
      setNotice('Password reset is coming soon. Please contact us for help.')
    } else if (res.ok) {
      setNotice(res.data?.message || 'If an account exists for that email, a reset link has been sent.')
    } else {
      setNotice(res.message || 'Unable to process your request. Please try again.')
    }
  }

  return (
    <>
      <Seo
        title="Forgot Password"
        description="Reset your GenIQ account password."
        path="/forgot-password"
      />
      <section className="section login">
        <div className="login__card card">
          <div className="login__brand">
            <Logo />
          </div>
          <h1>Reset Your Password</h1>
          <p className="text-muted">Enter your email and we’ll send you a reset link.</p>

          <form onSubmit={handleSubmit} className="login__form" noValidate>
            <div className="field">
              <label htmlFor="fp-email">Email</label>
              <input
                id="fp-email"
                type="email"
                className="input"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>

          {notice && <p className="login__notice">{notice}</p>}

          <p className="login__signup">
            Remembered it? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </section>
    </>
  )
}
