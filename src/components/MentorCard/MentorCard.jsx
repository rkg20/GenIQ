import { Star } from 'lucide-react'
import './MentorCard.css'

export default function MentorCard({ mentor }) {
  return (
    <article className="mentor-card card--lift">
      <div className="mentor-card__media">
        <img src={mentor.image} alt={`Portrait of ${mentor.name}`} loading="lazy" />
      </div>
      <div className="mentor-card__body">
        <div className="mentor-card__head">
          <div>
            <h4>{mentor.name}</h4>
            <p className="mentor-card__role">{mentor.role}</p>
          </div>
          <span className="mentor-card__rating">
            <Star size={15} fill="currentColor" aria-hidden="true" />
            {mentor.rating.toFixed(1)}
          </span>
        </div>
        <p className="mentor-card__exp">{mentor.experience} experience</p>
        <p className="text-muted mentor-card__bio">{mentor.bio}</p>
        <div className="mentor-card__tags">
          {mentor.expertise.map((e) => (
            <span key={e} className="mentor-card__tag">
              {e}
            </span>
          ))}
        </div>
        <button className="btn btn-secondary btn-block" type="button">
          View Profile
        </button>
      </div>
    </article>
  )
}
