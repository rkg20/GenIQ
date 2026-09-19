import { Quote } from 'lucide-react'
import './TestimonialCard.css'

export default function TestimonialCard({ testimonial }) {
  return (
    <figure className="testimonial-card">
      <Quote className="testimonial-card__icon" size={28} aria-hidden="true" />
      <blockquote>{testimonial.quote}</blockquote>
      <figcaption>
        <span className="testimonial-card__name">{testimonial.name}</span>
        <span className="testimonial-card__role">{testimonial.role}</span>
      </figcaption>
    </figure>
  )
}
