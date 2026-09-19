import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './FAQ.css'

export default function FAQ({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3 className="faq__q">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            {isOpen && <p className="faq__a">{item.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
