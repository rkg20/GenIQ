import { useEffect, useMemo, useState } from 'react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import MentorCard from '../../components/MentorCard/MentorCard'
import Reveal from '../../components/Reveal/Reveal'
import CTASection from '../../components/CTASection/CTASection'
import { mentors as staticMentors, mentorFilters } from '../../data/mentors'
import { getMentors } from '../../services/contentService'
import './Mentors.css'

export default function Mentors() {
  const [filter, setFilter] = useState('All')
  const [mentors, setMentors] = useState(staticMentors)

  useEffect(() => {
    let active = true
    getMentors(staticMentors).then((data) => {
      if (active) setMentors(data)
    })
    return () => {
      active = false
    }
  }, [])

  const visible = useMemo(
    () => (filter === 'All' ? mentors : mentors.filter((m) => m.category === filter)),
    [filter, mentors]
  )

  return (
    <>
      <Seo
        title="Mentors"
        description="Meet the experienced mentors who guide families through communication, teen development, parenting, career and life skills."
        path="/mentors"
      />
      <PageHeader
        eyebrow="Our mentors"
        title="Guided by People Who Understand People."
        description="Experienced professionals who help parents and students truly understand one another."
      />

      <section className="section container">
        <div className="mentor-filters" role="tablist" aria-label="Filter mentors">
          {mentorFilters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`mentor-filter ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-3">
          {visible.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <MentorCard mentor={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="The Right Mentor Makes All the Difference."
        primary={{ label: 'Start Your Journey', to: '/pricing' }}
        secondary={{ label: 'How It Works', to: '/how-it-works' }}
      />
    </>
  )
}
