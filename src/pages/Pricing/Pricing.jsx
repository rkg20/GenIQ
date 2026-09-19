import { useEffect, useState } from 'react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import PricingCard from '../../components/PricingCard/PricingCard'
import Reveal from '../../components/Reveal/Reveal'
import FAQ from '../../components/FAQ/FAQ'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import CTASection from '../../components/CTASection/CTASection'
import { pricingPlans as staticPlans } from '../../data/pricing'
import { getPricingPlans } from '../../services/contentService'
import './Pricing.css'

const faqs = [
  { q: 'Can I change plans later?', a: 'Yes — you can start small and extend your journey as your family grows.' },
  { q: 'Is there a refund policy?', a: 'Refund terms will be shared at checkout once payments are enabled.' },
  { q: 'Do both parent and student need separate plans?', a: 'No. Each plan is designed to support the family together.' },
]

export default function Pricing() {
  const [pricingPlans, setPricingPlans] = useState(staticPlans)

  useEffect(() => {
    let active = true
    getPricingPlans(staticPlans).then((data) => {
      if (active) setPricingPlans(data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <Seo
        title="Pricing"
        description="Choose the GenIQ journey that fits your family — Starter, Grow, or Complete."
        path="/pricing"
      />
      <PageHeader
        eyebrow="Pricing"
        title="Choose Your Journey"
        description="Every plan includes structured sessions, weekly assessments and progress tracking. Pick the depth that fits your family."
      />

      <section className="section container">
        <div className="grid grid-3 pricing-grid">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.06}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
        <p className="center-text text-muted pricing-note">
          Payments are not enabled yet — you can explore the full checkout experience today.
        </p>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader eyebrow="Questions" title="Pricing FAQ" />
          <FAQ items={faqs} />
        </div>
      </section>

      <CTASection />
    </>
  )
}
