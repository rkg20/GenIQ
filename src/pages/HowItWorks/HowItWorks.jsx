import { ArrowDown } from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import Reveal from '../../components/Reveal/Reveal'
import FAQ from '../../components/FAQ/FAQ'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import CTASection from '../../components/CTASection/CTASection'
import './HowItWorks.css'

const flow = [
  { title: 'Assessment', text: 'A short, friendly starting assessment helps us understand how you communicate today.' },
  { title: 'Starting Point', text: 'We map your current patterns, strengths and challenges — no judgement, just clarity.' },
  { title: 'Interactive Learning', text: 'Engaging sessions led by experienced teachers introduce practical ideas you can use right away.' },
  { title: 'Weekly Reflection', text: 'Simple weekly assessments help you pause, reflect and notice what is shifting.' },
  { title: '1-on-1 Guidance', text: 'Dedicated conversations give personalised support around your family’s real situation.' },
  { title: 'Progress', text: 'Track communication, confidence and connection as they grow week by week.' },
  { title: 'Growth', text: 'Small, consistent steps add up to a genuinely stronger relationship.' },
]

const faqs = [
  { q: 'Who is GenIQ for?', a: 'GenIQ is for parents and children (pre-teens and teenagers) who want to understand each other better and communicate more openly.' },
  { q: 'Is it for parents or students?', a: 'Both. The program is designed so parents and students can grow individually and together.' },
  { q: 'Can both participate?', a: 'Yes — many families see the most benefit when both the parent and the child take part.' },
  { q: 'How long does the program take?', a: 'Programs range from 4 to 12 weeks depending on the plan you choose.' },
  { q: 'What happens during 1-on-1 guidance?', a: 'A mentor holds a focused, supportive conversation tailored to your specific needs and goals.' },
  { q: 'How do weekly assessments work?', a: 'They are short, reflective check-ins that help you notice progress and areas to work on.' },
  { q: 'Can parents see progress?', a: 'Yes, progress tracking is included so families can see growth over time.' },
  { q: 'Can students participate independently?', a: 'Students can participate on their own, though joint participation is encouraged.' },
  { q: 'Are sessions live?', a: 'Sessions are structured and interactive, designed to keep participants genuinely engaged.' },
  { q: 'How are mentors selected?', a: 'Mentors are experienced professionals in communication, parenting, and youth development.' },
]

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works"
        description="From your first assessment to lasting growth — see how the GenIQ journey works, step by step."
        path="/how-it-works"
      />
      <PageHeader
        eyebrow="How it works"
        title="A Clear Path From Confusion to Connection"
        description="Every stage builds on the last, turning small conversations into meaningful, lasting change."
      />

      <section className="section container">
        <ol className="hiw-flow">
          {flow.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.04}>
              <li className="hiw-step">
                <span className="hiw-step__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p className="text-muted">{step.text}</p>
                </div>
                {i < flow.length - 1 && (
                  <ArrowDown className="hiw-step__arrow" size={20} aria-hidden="true" />
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader eyebrow="Questions" title="Frequently Asked Questions" />
          <FAQ items={faqs} />
        </div>
      </section>

      <CTASection />
    </>
  )
}
