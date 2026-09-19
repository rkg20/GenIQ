// Central API abstraction layer.
// Base URLs are read from PUBLIC Vite env vars. Never place secrets here.

// Legacy single base URL, kept as a fallback for every service.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Per-microservice base URLs (Spring Boot backend under /backend).
export const CONTENT_API_URL = import.meta.env.VITE_CONTENT_API_URL || API_BASE_URL
export const USER_API_URL = import.meta.env.VITE_USER_API_URL || API_BASE_URL
export const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL || API_BASE_URL

/**
 * Thin fetch wrapper. When no base URL is configured, calls resolve to a
 * clearly-marked development placeholder so the UI never pretends data was
 * persisted to a server. Pass `baseUrl` to target a specific microservice.
 */
export async function request(path, { method = 'GET', body, headers, baseUrl } = {}) {
  const base = baseUrl || API_BASE_URL

  if (!base) {
    return {
      ok: false,
      placeholder: true,
      message: 'API not configured yet. This is a frontend-only preview.',
      path,
      method,
    }
  }

  try {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    return { ok: false, error: true, message: err?.message || 'Network error', path, method }
  }
}

export const isApiConfigured = () => Boolean(API_BASE_URL)
export const isContentApiConfigured = () => Boolean(CONTENT_API_URL)
