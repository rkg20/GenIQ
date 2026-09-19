import { request } from './api'

// Placeholder session/booking service — wire to /api/sessions later.

export async function getAvailability(mentorId) {
  return request(`/api/sessions/availability?mentor=${mentorId}`)
}

export async function bookSession(payload) {
  return request('/api/sessions', { method: 'POST', body: payload })
}
