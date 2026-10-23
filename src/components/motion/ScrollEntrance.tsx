import { useLayoutEffect } from 'react'

export function ScrollEntrance() {
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    if (!main || !footer) return

    const registered = new WeakSet<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('scroll-enter-visible')
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 })

    const add = (element: Element) => {
      if (registered.has(element) || element.closest('.scroll-enter')) return
      registered.add(element)
      if (element.matches('.absolute, .fixed') || element instanceof HTMLElement && (element.style.opacity || element.style.transform)) return

      // Leave content already visible (and content above a restored scroll
      // position) alone. Only upcoming content enters as the visitor scrolls.
      const bounds = element.getBoundingClientRect()
      if (bounds.top < window.innerHeight * 0.85) return

      element.classList.add('scroll-enter')
      observer.observe(element)
    }

    const scan = () => {
      const sections = main.querySelectorAll('section')
      sections.forEach((section, index) => {
        if (index === 0) return // The first hero already has its own entrance.
        section.querySelectorAll('h2, h3, p, article, figure, .grid > *').forEach(add)
      })
      footer.querySelectorAll(':scope > div:first-child > div, .grid > *').forEach(add)
    }

    scan()
    const changes = new MutationObserver(scan)
    changes.observe(main, { childList: true, subtree: true })
    changes.observe(footer, { childList: true, subtree: true })

    const revealFocused = (event: FocusEvent) => {
      const hidden = (event.target as Element).closest('.scroll-enter')
      if (hidden) {
        hidden.classList.add('scroll-enter-visible')
        observer.unobserve(hidden)
      }
    }
    document.addEventListener('focusin', revealFocused)
    return () => {
      changes.disconnect()
      observer.disconnect()
      document.removeEventListener('focusin', revealFocused)
      document.querySelectorAll('.scroll-enter').forEach((element) => element.classList.remove('scroll-enter', 'scroll-enter-visible'))
    }
  }, [])

  return null
}
