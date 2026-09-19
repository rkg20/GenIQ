import { request } from './api'

// Placeholder assessment service — wire to /api/assessments later.

export async function getAssessment(week) {
  return request(`/api/assessments?week=${week}`)
}

export async function submitAssessment(payload) {
  return request('/api/assessments', { method: 'POST', body: payload })
}
