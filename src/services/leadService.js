import { request, USER_API_URL } from './api'

// Lead capture from the on-site chat widget.
// Persisted by the Spring Boot user-service at POST /api/leads.
export async function submitLead(payload) {
  return request('/api/leads', { method: 'POST', body: payload, baseUrl: USER_API_URL })
}
