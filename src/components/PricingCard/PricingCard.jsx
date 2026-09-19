import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './PricingCard.css'

export default function PricingCard({ plan }) {
  const navigate = useNavigate()

  return (
    <article className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}>
      {plan.popular && <span className="pricing-card__badge">Most Popular</span>}
      <div className="pricing-card__head">
        <h3>{plan.name}</h3>
        <p className="pricing-card__duration">{plan.duration}</p>
        <p className="text-muted">{plan.tagline}</p>
      </div>
      <div className="pricing-card__price">
        <span className="pricing-card__amount">{plan.price}</span>
      </div>
      <ul className="pricing-card__features">
        {plan.features.map((f) => (
          <li key={f}>
            <Check size={18} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-block`}
        onClick={() => navigate('/checkout', { state: { planId: plan.id } })}
      >
        {plan.cta}
      </button>
    </article>
  )
}
