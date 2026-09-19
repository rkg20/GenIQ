import { useEffect } from 'react'

const SITE = 'GenIQ'
const BASE_URL = 'https://www.geniq.app'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Lightweight document-head manager (no extra dependency).
 * Sets title, description, canonical and Open Graph tags per page.
 */
export default function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : SITE
    const url = `${BASE_URL}${path}`
    document.title = fullTitle

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
    }
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:url', url)
    upsertLink('canonical', url)
  }, [title, description, path])

  return null
}
