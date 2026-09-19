import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import Reveal from '../../components/Reveal/Reveal'
import CTASection from '../../components/CTASection/CTASection'
import './Journey.css'

const stages = [
  {
    key: 'past',
    badge: '01',
    label: 'Past',
    title: 'Understand Where We Come From',
    purpose: 'Explore experiences, beliefs, family patterns, expectations and values.',
    explore: ['Family history & values', 'Formative experiences', 'Inherited expectations', 'Beliefs that shape us'],
    parent: 'Reflect on the influences that shaped your own parenting style.',
    student: 'Discover how your background quietly shapes how you see things.',
    activities: ['Guided reflection', 'Story mapping', 'Values discovery'],
    assessments: 'A gentle reflective assessment on background and values.',
    outcomes: 'Shared understanding of where each perspective comes from.',
  },
  {
    key: 'present',
    badge: '02',
    label: 'Present',
    title: 'Understand Where We Are',
    purpose: 'Identify communication challenges, emotions, pressures, habits and expectations.',
    explore: ['Communication patterns', 'Current pressures', 'Emotional habits', 'Everyday expectations'],
    parent: 'See current dynamics clearly, without blame.',
    student: 'Name what you feel and what you need right now.',
    activities: ['Interactive sessions', 'Communication exercises', 'Awareness check-ins'],
    assessments: 'Weekly assessments tracking communication and connection.',
    outcomes: 'Honest awareness of the present relationship.',
  },
  {
    key: 'future',
    badge: '03',
    label: 'Future',
    title: 'Build Where We’re Going',
    purpose: 'Develop communication, confidence, mutual understanding and future goals.',
    explore: ['Shared goals', 'Confidence building', 'New communication habits', 'Future planning'],
    parent: 'Support your child’s growth while staying connected.',
    student: 'Build confidence and a voice you trust.',
    activities: ['1-on-1 guidance', 'Goal setting', 'Growth planning'],
    assessments: 'Progress-focused assessments toward your goals.',
    outcomes: 'A stronger, forward-looking relationship.',
  },
]

export default function Journey() {
  return (
    <>
      <Seo
        title="The 3-Stage Journey"
        description="Move through Past, Present and Future — an immersive journey from understanding to growth."
        path="/journey"
      />
      <PageHeader
        eyebrow="The 3-stage journey"
        title="Past → Present → Future"
        description="Before we change the future, we first understand the past and make sense of the present."
      />

      <div className="journey-indicator" aria-hidden="true">
        {stages.map((s) => (
          <a key={s.key} href={`#${s.key}`} className={`journey-indicator__item is-${s.key}`}>
            {s.label}
          </a>
        ))}
      </div>

      {stages.map((stage, i) => (
        <section key={stage.key} id={stage.key} className={`section stage stage--${stage.key}`}>
          <div className="container">
            <Reveal>
              <div className="stage__head">
                <span className="stage__badge">{stage.badge}</span>
                <div>
                  <span className="stage__label">{stage.label}</span>
                  <h2>{stage.title}</h2>
                  <p className="lead">{stage.purpose}</p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-3 stage__grid">
              <Reveal>
                <div className="stage__card">
                  <h4>What you’ll explore</h4>
                  <ul className="stage__list">
                    {stage.explore.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="stage__card">
                  <h4>Participation</h4>
                  <p className="stage__role"><strong>Parents:</strong> {stage.parent}</p>
                  <p className="stage__role"><strong>Students:</strong> {stage.student}</p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="stage__card">
                  <h4>Activities & Assessments</h4>
                  <ul className="stage__list">
                    {stage.activities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <p className="text-muted stage__assess">{stage.assessments}</p>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="stage__outcome">
                <strong>Outcome:</strong> {stage.outcomes}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CTASection
        title="Ready to Begin Your Journey?"
        primary={{ label: 'Start Your Journey', to: '/pricing' }}
        secondary={{ label: 'See How It Works', to: '/how-it-works' }}
      />
    </>
  )
}
