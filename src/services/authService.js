import { request, USER_API_URL } from './api'

// Auth service client — talks to the Spring Boot user-service.
// No credentials are stored client-side.

export async function login(credentials) {
  return request('/api/auth/login', { method: 'POST', body: credentials, baseUrl: USER_API_URL })
}

export async function logout() {
  return request('/api/auth/logout', { method: 'POST', baseUrl: USER_API_URL })
}

export async function getCurrentUser(email) {
  const query = email ? `?email=${encodeURIComponent(email)}` : ''
  return request(`/api/auth/me${query}`, { baseUrl: USER_API_URL })
}

export async function register(payload) {
  return request('/api/auth/register', { method: 'POST', body: payload, baseUrl: USER_API_URL })
}

export async function forgotPassword(email) {
  return request('/api/auth/forgot-password', {
    method: 'POST',
    body: { email },
    baseUrl: USER_API_URL,
  })
}
