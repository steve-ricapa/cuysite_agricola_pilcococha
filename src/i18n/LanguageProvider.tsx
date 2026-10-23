import { useLayoutEffect, useState, type ReactNode } from 'react'
import translations from './en.json'
import { LanguageContext, type Language } from './languageContext'

const dictionary = translations as Record<string, string>
const preferenceKey = 'pilcococha-language'
const originals = new WeakMap<Text, { original: string; applied: string }>()
const attributes = new WeakMap<Element, Map<string, { original: string; applied: string }>>()

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem(preferenceKey)
    if (saved === 'ES' || saved === 'EN') return saved
  } catch { /* Storage may be unavailable in private browsing. */ }
  return (navigator.languages?.[0] ?? navigator.language ?? 'es').toLowerCase().startsWith('es') ? 'ES' : 'EN'
}

// Keep the original Spanish text so switching languages never translates an
// already translated string. The observer also handles content rendered later
// by React (menus, carousel slides, form steps and the FAQ assistant).
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useLayoutEffect(() => {
    document.documentElement.lang = language.toLowerCase()
    document.title = language === 'EN'
      ? 'Agrícola Pilcococha | Peruvian Hass Avocados for Export'
      : 'Agrícola Pilcococha | Palta Hass Peruana de Exportación'
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'EN'
      ? 'Peruvian Hass avocado cultivation and export with international quality standards, traceability and sustainable agricultural practices.'
      : 'Cultivo y exportación de Palta Hass peruana con los más altos estándares de calidad internacional, trazabilidad y manejo agrícola sostenible desde nuestros fundos.')

    const translate = (text: string) => {
      const trimmed = text.trim()
      const translated = dictionary[trimmed] ?? dictionary[trimmed.replace(/\s+/g, ' ')]
      return translated ? text.replace(trimmed, translated) : text
    }
    const visit = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node as Text
        const existing = originals.get(text)
        const original = existing && text.data === existing.applied ? existing.original : text.data
        const applied = language === 'EN' ? translate(original) : original
        originals.set(text, { original, applied })
        if (text.data !== applied) text.data = applied
      } else if (node instanceof Element) {
        if (node.matches('script, style, svg, noscript')) return
        const stored = attributes.get(node) ?? new Map<string, { original: string; applied: string }>()
        for (const name of ['alt', 'title', 'placeholder', 'aria-label']) {
          const value = node.getAttribute(name)
          if (value === null) continue
          const existing = stored.get(name)
          const original = existing && value === existing.applied ? existing.original : value
          const applied = language === 'EN' ? translate(original) : original
          stored.set(name, { original, applied })
          if (value !== applied) node.setAttribute(name, applied)
        }
        attributes.set(node, stored)
        node.childNodes.forEach(visit)
      }
    }

    visit(document.body)
    const observer = new MutationObserver((changes) => {
      for (const change of changes) {
        if (change.type === 'characterData') visit(change.target)
        else if (change.type === 'attributes') visit(change.target)
        else change.addedNodes.forEach(visit)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['alt', 'title', 'placeholder', 'aria-label'] })
    return () => observer.disconnect()
  }, [language])

  const chooseLanguage = (next: Language) => {
    try { localStorage.setItem(preferenceKey, next) } catch { /* Use this session only. */ }
    setLanguage(next)
  }

  return <LanguageContext.Provider value={{ language, setLanguage: chooseLanguage }}>{children}</LanguageContext.Provider>
}
