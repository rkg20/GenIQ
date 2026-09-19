import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import Toast from '../../components/Toast/Toast'
import { pricingPlans } from '../../data/pricing'
import { createCheckout, openRazorpayCheckout } from '../../services/paymentService'
import './Checkout.css'

const ageGroups = ['Under 12', '12–14', '15–17', '18+']

export default function Checkout() {
  const location = useLocation()
  const requestedPlan = location.state?.planId

  const [planId, setPlanId] = useState(requestedPlan || 'grow')
  const plan = useMemo(() => pricingPlans.find((p) => p.id === planId), [planId])

  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Parent',
    ageGroup: '15–17',
  })
  const [toast, setToast] = useState('')
  const update = (key) => (e) => setDetails((d) => ({ ...d, [key]: e.target.value }))

  const handleContinue = async (e) => {
    e.preventDefault()
    // Create the order on the payment-service, which creates a matching order
    // with the gateway (Razorpay/Stripe test mode) and returns its details.
    const result = await createCheckout({ plan: plan.id, price: plan.price, ...details })

    if (result.status === 'placeholder') {
      setToast('Payment integration coming soon.')
      return
    }
    if (result.status === 'error') {
      setToast(result.message || 'Something went wrong. Please try again.')
      return
    }

    // Razorpay flow: open the hosted checkout modal, then verify server-side.
    if (result.provider === 'razorpay' && result.gatewayOrderId) {
      setToast('Opening secure payment…')
      const outcome = await openRazorpayCheckout(result, details)
      if (outcome.status === 'paid') {
        setToast(`Payment successful! Reference: ${outcome.reference}`)
      } else if (outcome.status === 'cancelled') {
        setToast('Payment cancelled.')
      } else {
        setToast(outcome.message || 'Payment could not be verified.')
      }
      return
    }

    // Other providers (e.g. Stripe/mock): surface the created reference.
    if (result.reference) {
      setToast(`Order created (${result.reference}).`)
    } else {
      setToast('Order created.')
    }
  }

  return (
    <>
      <Seo title="Checkout" description="Review your GenIQ plan and details." path="/checkout" />
      <PageHeader
        eyebrow="Almost there"
        title="Review & Continue"
        description="Confirm your plan and details. Payment is not enabled yet — this is a preview of the flow."
      />

      <section className="section container">
        <div className="checkout">
          {/* Left: plan summary */}
          <aside className="checkout__summary card">
            <h3>Your Plan</h3>
            <div className="field">
              <label htmlFor="plan-select">Selected plan</label>
              <select
                id="plan-select"
                className="select"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
              >
                {pricingPlans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.duration}
                  </option>
                ))}
              </select>
            </div>

            <ul className="checkout__features">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check size={16} /> {f}
                </li>
              ))}
            </ul>

            <div className="checkout__total">
              <span>Total</span>
              <strong>{plan.price}</strong>
            </div>
          </aside>

          {/* Right: details */}
          <form className="checkout__details card" onSubmit={handleContinue}>
            <h3>Your Details</h3>
            <div className="field">
              <label htmlFor="co-name">Full Name</label>
              <input id="co-name" className="input" required value={details.name} onChange={update('name')} />
            </div>
            <div className="field">
              <label htmlFor="co-email">Email</label>
              <input id="co-email" type="email" className="input" required value={details.email} onChange={update('email')} />
            </div>
            <div className="field">
              <label htmlFor="co-phone">Phone</label>
              <input id="co-phone" type="tel" className="input" required value={details.phone} onChange={update('phone')} />
            </div>
            <div className="checkout__row">
              <div className="field">
                <label htmlFor="co-role">Parent / Student</label>
                <select id="co-role" className="select" value={details.role} onChange={update('role')}>
                  <option>Parent</option>
                  <option>Student</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="co-age">Age Group</label>
                <select id="co-age" className="select" value={details.ageGroup} onChange={update('ageGroup')}>
                  {ageGroups.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Continue to Payment
            </button>
            <p className="checkout__note text-muted">
              Secure payment powered by Razorpay. You’ll be redirected to complete your payment.
            </p>
          </form>
        </div>
      </section>

      <Toast message={toast} onDone={() => setToast('')} />
    </>
  )
}
