import {
  HeartHandshake,
  Ear,
  MessageCircle,
  ClipboardCheck,
  UserRound,
  LineChart,
  ArrowRight,
} from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard'
import Reveal from '../../components/Reveal/Reveal'
import FAQ from '../../components/FAQ/FAQ'
import Button from '../../components/Button/Button'
import CTASection from '../../components/CTASection/CTASection'
import { testimonials } from '../../data/testimonials'
import '../../components/FeatureCard/FeatureCard.css'
import './AudiencePage.css'

const changes = [
  { icon: Ear, title: 'Listen differently', text: 'Learn to hear what your child means, not just what they say.' },
  { icon: MessageCircle, title: 'Communicate calmly', text: 'Replace repeated arguments with steady, honest conversation.' },
  { icon: HeartHandshake, title: 'Stay connected', text: 'Guide with empathy while keeping your role as a parent.' },
  { icon: ClipboardCheck, title: 'Track what matters', text: 'See connection and communication improve week by week.' },
]

const journey = [
  { icon: ClipboardCheck, title: 'Sessions', text: 'Structured sessions built around real parenting situations.', tone: 'present' },
  { icon: LineChart, title: 'Assessments', text: 'Weekly reflections that reveal genuine progress.', tone: 'past' },
  { icon: UserRound, title: 'Guidance', text: 'Personal 1-on-1 support for your family’s specific needs.', tone: 'future' },
]

const faqs = [
  { q: 'Do I lose authority as a parent?', a: 'No. GenIQ helps you stay firmly in your role while connecting more deeply.' },
  { q: 'What if my child won’t participate?', a: 'Parents can begin alone — many children join once they feel the shift at home.' },
  { q: 'How much time does it take?', a: 'Sessions and assessments are short and designed to fit into busy family life.' },
]

const parentTestimonials = testimonials.filter((t) => t.audience === 'parent')

export default function Parents() {
  return (
    <>
      <Seo
        title="For Parents"
        description="Understand your child without losing your role as a parent. GenIQ helps you listen, connect and guide with empathy."
        path="/parents"
      />
      <PageHeader
        eyebrow="For parents"
        title="Understand Your Child Without Losing Your Role as a Parent."
        description="Connection and guidance aren’t opposites. GenIQ helps you hold both — with more calm and less conflict."
      >
        <Button to="/pricing" variant="primary" icon={ArrowRight}>
          Explore Parent Program
        </Button>
      </PageHeader>

      <section className="section container">
        <div className="audience-split">
          <Reveal>
            <img
              className="audience-img"
              src="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=800&q=75"
              alt="A parent and child sharing a warm moment"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="stack">
              <h2>Why parents struggle to connect</h2>
              <p className="lead">
                It’s rarely about love — it’s about translation. Different experiences make
                the same words mean different things. GenIQ gives you a shared language and a
                structured way to rebuild understanding.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader eyebrow="What changes" title="What GenIQ Changes for Parents" />
          <div className="grid grid-4">
            {changes.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <FeatureCard icon={c.icon} title={c.title} description={c.text} tone="present" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeader eyebrow="Parent journey" title="Sessions, Assessments & Guidance" />
        <div className="grid grid-3">
          {journey.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.05}>
              <FeatureCard icon={j.icon} title={j.title} description={j.text} tone={j.tone} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader eyebrow="Parent stories" title="From Parents Like You" />
          <div className="grid grid-2">
            {parentTestimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeader eyebrow="Questions" title="Parent FAQ" />
        <FAQ items={faqs} />
      </section>

      <CTASection
        title="Reconnect With Your Child, Starting Today."
        primary={{ label: 'Explore Parent Program', to: '/pricing' }}
        secondary={{ label: 'How It Works', to: '/how-it-works' }}
      />
    </>
  )
}
