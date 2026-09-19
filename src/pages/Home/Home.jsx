import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  MessageCircle,
  Ear,
  Sprout,
  Users,
  ClipboardCheck,
  UserRound,
  LineChart,
  HeartHandshake,
  Scale,
  Smartphone,
  GraduationCap,
  HeartCrack,
  VolumeX,
} from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal/Reveal'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import JourneyCard from '../../components/JourneyCard/JourneyCard'
import StepCard from '../../components/StepCard/StepCard'
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard'
import CTASection from '../../components/CTASection/CTASection'
import { testimonials as staticTestimonials } from '../../data/testimonials'
import { getTestimonials } from '../../services/contentService'
import '../../components/FeatureCard/FeatureCard.css'
import './Home.css'

const challenges = [
  { icon: MessageCircle, title: 'Communication breakdown', text: 'Conversations that turn into conflict instead of connection.' },
  { icon: Scale, title: 'Different expectations', text: 'What each side hopes for quietly drifts apart.' },
  { icon: Smartphone, title: 'Technology & lifestyle', text: 'Two very different everyday worlds under one roof.' },
  { icon: GraduationCap, title: 'Academic & career pressure', text: 'Ambition and support can feel like the same thing — or opposite things.' },
  { icon: HeartCrack, title: 'Expressing emotions', text: 'Big feelings that are hard to put into words.' },
  { icon: VolumeX, title: 'Feeling unheard', text: 'The sense that no one truly gets your side of the story.' },
]

const approach = [
  { icon: Users, title: 'Interactive Sessions', text: 'Short, engaging sessions led by experienced teachers.', tone: 'present' },
  { icon: ClipboardCheck, title: 'Weekly Assessments', text: 'Simple structured assessments to understand progress.', tone: 'past' },
  { icon: UserRound, title: '1-on-1 Guidance', text: 'Dedicated conversations designed around individual needs.', tone: 'future' },
  { icon: LineChart, title: 'Personalized Growth', text: 'Track communication, confidence, relationships and future planning.', tone: 'coral' },
]

const steps = [
  { number: '01', title: 'Take the Assessment', description: 'Understand your starting point.' },
  { number: '02', title: 'Understand Your Starting Point', description: 'Identify communication patterns, challenges, and strengths.' },
  { number: '03', title: 'Attend Interactive Sessions', description: 'Learn through concise, engaging sessions.' },
  { number: '04', title: 'Complete Weekly Assessments', description: 'Reflect, track progress, and identify areas for improvement.' },
  { number: '05', title: 'Connect Through 1-on-1 Guidance', description: 'Get personalized support.' },
]

export default function Home() {
  const [testimonials, setTestimonials] = useState(staticTestimonials)

  useEffect(() => {
    let active = true
    getTestimonials(staticTestimonials).then((data) => {
      if (active) setTestimonials(data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <Seo
        title="Bridge the Gap. Grow Together."
        description="GenIQ helps parents and children understand each other, communicate better, and build a stronger future together."
        path="/"
      />

      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <Reveal className="hero__copy">
            <span className="eyebrow">A better way to understand each other</span>
            <h1>
              Bridge the Gap.
              <br />
              Understand Each Other.
              <br />
              <span className="highlight">Grow Together.</span>
            </h1>
            <p className="lead">
              A structured journey designed to help parents and children understand each
              other, communicate better, and build a stronger future together.
            </p>
            <div className="hero__actions">
              <Button to="/pricing" variant="primary" icon={ArrowRight}>
                Start Your Journey
              </Button>
              <Button to="/how-it-works" variant="secondary">
                Explore the Program
              </Button>
            </div>
            <div className="hero__trust">
              <span className="chip"><Users size={16} /> Interactive sessions</span>
              <span className="chip"><ClipboardCheck size={16} /> Weekly assessments</span>
              <span className="chip"><UserRound size={16} /> 1-on-1 guidance</span>
            </div>
          </Reveal>

          <Reveal className="hero__visual" delay={0.15}>
            <div className="hero__image-wrap">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=75"
                alt="A parent and teenager talking warmly together"
                width="900"
                height="600"
                fetchpriority="high"
              />
            </div>
            <span className="hero__bubble hero__bubble--1"><Ear size={16} /> Listen</span>
            <span className="hero__bubble hero__bubble--2"><MessageCircle size={16} /> Understand</span>
            <span className="hero__bubble hero__bubble--3"><Sprout size={16} /> Grow</span>
            <svg className="hero__curve" viewBox="0 0 400 120" aria-hidden="true">
              <path d="M10 100 C 120 10, 280 10, 390 100" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeDasharray="6 8" />
            </svg>
          </Reveal>
        </div>
      </section>

      {/* GENERATION GAP */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="The generation gap"
            title="Every Generation Sees the World Differently."
            description="Different experiences create different expectations. Sometimes the gap isn't about disagreement — it's simply about seeing the same situation differently."
          />
          <Reveal>
            <div className="gap-compare">
              <div className="gap-side gap-side--parent">
                <span className="gap-side__label">Parent</span>
                <p>“I want the best for you.”</p>
              </div>
              <div className="gap-bridge" aria-hidden="true">
                <HeartHandshake size={28} />
                <span>bridge</span>
              </div>
              <div className="gap-side gap-side--child">
                <span className="gap-side__label">Child</span>
                <p>“I want to feel understood.”</p>
              </div>
            </div>
          </Reveal>
          <div className="center-text gap-outro">
            <p className="lead">What if both sides could understand the other better?</p>
            <Button to="/how-it-works" variant="ghost" icon={ArrowRight}>
              Discover Our Approach
            </Button>
          </div>
        </div>
      </section>

      {/* COMMON CHALLENGES */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Common challenges"
            title="You're Not the Only Ones Feeling This."
            description="These are the moments almost every family recognises."
          />
          <div className="grid grid-3">
            {challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <FeatureCard icon={c.icon} title={c.title} description={c.text} tone="present" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Our approach"
            title="Not Just Advice. A Structured Journey."
            description="Real progress comes from understanding, reflection, conversation, and consistent support."
          />
          <div className="grid grid-4">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <FeatureCard icon={a.icon} title={a.title} description={a.text} tone={a.tone} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3-STAGE JOURNEY */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="The 3-stage journey"
            title="Three Stages. One Shared Journey."
            description="Before we change the future, we first understand the past and make sense of the present."
          />
          <div className="journey-flow" aria-hidden="true">
            <span>Past</span>
            <ArrowRight size={18} />
            <span>Present</span>
            <ArrowRight size={18} />
            <span>Future</span>
          </div>
          <div className="grid grid-3">
            <Reveal>
              <JourneyCard
                stage="past"
                badge="01"
                title="Understand Where We Come From"
                description="Explore experiences, beliefs, family patterns, expectations and values."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <JourneyCard
                stage="present"
                badge="02"
                title="Understand Where We Are"
                description="Identify communication challenges, emotions, pressures, habits and expectations."
              />
            </Reveal>
            <Reveal delay={0.16}>
              <JourneyCard
                stage="future"
                badge="03"
                title="Build Where We're Going"
                description="Develop communication, confidence, mutual understanding and future goals."
              />
            </Reveal>
          </div>
          <div className="center-text" style={{ marginTop: 40 }}>
            <Button to="/journey" variant="primary" icon={ArrowRight}>
              Explore the Full Journey
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="Five Simple Steps"
            description="A clear path from your first assessment to real, lasting growth."
          />
          <div className="grid grid-2 steps-grid">
            {steps.map((s, i) => (
              <Reveal key={s.number} delay={i * 0.05}>
                <StepCard {...s} />
              </Reveal>
            ))}
          </div>
          <p className="lead center-text steps-outro">
            Small conversations can create meaningful change.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Stories"
            title="Families Growing Closer, One Conversation at a Time."
          />
          <div className="grid grid-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
