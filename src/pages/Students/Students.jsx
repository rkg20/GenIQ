import {
  Megaphone,
  Users,
  Target,
  MessageCircle,
  Sparkles,
  Compass,
  ArrowRight,
} from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard'
import Reveal from '../../components/Reveal/Reveal'
import Button from '../../components/Button/Button'
import CTASection from '../../components/CTASection/CTASection'
import { testimonials } from '../../data/testimonials'
import '../../components/FeatureCard/FeatureCard.css'
import '../Parents/AudiencePage.css'

const items = [
  { icon: Megaphone, title: 'Express yourself', text: 'Say what you feel in a way that actually lands.', tone: 'future' },
  { icon: Users, title: 'Understand your parents', text: 'See where they’re coming from — it changes everything.', tone: 'present' },
  { icon: Target, title: 'Handle expectations', text: 'Turn pressure into a conversation, not a weight.', tone: 'past' },
  { icon: MessageCircle, title: 'Build communication', text: 'Practical skills for tough conversations at home.', tone: 'present' },
  { icon: Sparkles, title: 'Build confidence', text: 'Trust your own voice and use it well.', tone: 'coral' },
  { icon: Compass, title: 'Think about your future', text: 'Explore where you want to go, on your own terms.', tone: 'future' },
]

const studentTestimonials = testimonials.filter((t) => t.audience === 'student')

export default function Students() {
  return (
    <>
      <Seo
        title="For Students"
        description="Your voice matters too. GenIQ helps you express yourself, understand your parents, and build confidence for the future."
        path="/students"
      />
      <PageHeader
        eyebrow="For students"
        title="Your Voice Matters Too."
        description="This is your space to be understood, build confidence, and shape where you’re headed."
      >
        <Button to="/pricing" variant="primary" icon={ArrowRight}>
          Start Your Journey
        </Button>
      </PageHeader>

      <section className="section container">
        <SectionHeader
          eyebrow="What you’ll gain"
          title="Real Skills for Real Life"
          description="Not lectures. Practical tools you’ll actually use — at home and beyond."
        />
        <div className="grid grid-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <FeatureCard icon={it.icon} title={it.title} description={it.text} tone={it.tone} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader eyebrow="Student stories" title="From Students Like You" />
          <div className="grid grid-2">
            {studentTestimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Be Heard?"
        copy="Growth starts the moment you feel understood."
        primary={{ label: 'Start Your Journey', to: '/pricing' }}
        secondary={{ label: 'How It Works', to: '/how-it-works' }}
      />
    </>
  )
}
