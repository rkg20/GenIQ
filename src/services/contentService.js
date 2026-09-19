import { request, CONTENT_API_URL } from './api'

// Content service client. Fetches DB-backed content from the Spring Boot
// content-service. Each call falls back to the caller-provided static data
// when the backend is not reachable, so the UI keeps working offline.

async function fetchWithFallback(path, fallback) {
  const res = await request(path, { baseUrl: CONTENT_API_URL })
  if (res.ok && Array.isArray(res.data)) return res.data
  return fallback
}

export function getMentors(fallback = [], category) {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''
  return fetchWithFallback(`/api/mentors${query}`, fallback)
}

export function getPricingPlans(fallback = []) {
  return fetchWithFallback('/api/pricing', fallback)
}

export function getTestimonials(fallback = []) {
  return fetchWithFallback('/api/testimonials', fallback)
}

export function getResources(fallback = []) {
  return fetchWithFallback('/api/resources', fallback)
}
