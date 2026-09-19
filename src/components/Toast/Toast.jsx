import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function Toast({ message, onDone, duration = 3200 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDone, duration)
    return () => clearTimeout(t)
  }, [message, onDone, duration])

  if (!message) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckCircle2 size={18} aria-hidden="true" />
      {message}
    </div>
  )
}
