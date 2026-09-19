import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import PageHeader from '../../components/PageHeader/PageHeader'
import Reveal from '../../components/Reveal/Reveal'
import { resources as staticResources, resourceCategories } from '../../data/resources'
import { getResources } from '../../services/contentService'
import './Resources.css'

export default function Resources() {
  const [category, setCategory] = useState('All')
  const [resources, setResources] = useState(staticResources)

  useEffect(() => {
    let active = true
    getResources(staticResources).then((data) => {
      if (active) setResources(data)
    })
    return () => {
      active = false
    }
  }, [])

  const visible = useMemo(
    () => (category === 'All' ? resources : resources.filter((r) => r.category === category)),
    [category, resources]
  )

  return (
    <>
      <Seo
        title="Resources"
        description="Articles and guides on parenting, communication, teen development, career and family connection."
        path="/resources"
      />
      <PageHeader
        eyebrow="Resource center"
        title="Ideas Worth Bringing Home"
        description="Short, practical reads to support your family between sessions."
      />

      <section className="section container">
        <div className="resource-filters">
          {resourceCategories.map((c) => (
            <button
              key={c}
              type="button"
              className={`resource-filter ${category === c ? 'is-active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-3">
          {visible.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <article className="resource-card card--lift">
                <div className="resource-card__media">
                  <img src={r.image} alt={r.title} loading="lazy" />
                  <span className="resource-card__cat">{r.category}</span>
                </div>
                <div className="resource-card__body">
                  <h4>{r.title}</h4>
                  <p className="text-muted">{r.description}</p>
                  <a href="#" className="resource-card__link">
                    Read Article <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
