import { useEffect } from 'react'

const MIN_VISIBLE_MS = 1200
const MAX_WAIT_MS = 6000
const POLL_MS = 150

// Espera a que esté listo lo que el visitante va a ver de inmediato (fuentes,
// logo, hero y primer slide) y luego despacha "pilcococha:ready" para que la
// cortina de index.html se retire. Las imágenes fuera de pantalla no frenan la
// apertura; 6 s es el tope por si algo no termina de cargar.
export function PageReady() {
  useEffect(() => {
    let announced = false
    let timer = 0
    const startedAt = performance.now()
    let fontsReady = false

    const announce = () => {
      if (announced) return
      announced = true
      window.dispatchEvent(new Event('pilcococha:ready'))
    }

    document.fonts?.ready.then(() => {
      fontsReady = true
    })

    const pendingVisibleImages = () =>
      Array.from(document.images).filter((image) => {
        if (image.complete) return false
        const bounds = image.getBoundingClientRect()
        return bounds.top < window.innerHeight * 1.1 && bounds.bottom > -window.innerHeight * 0.1
      })

    const check = () => {
      const elapsed = performance.now() - startedAt
      const ready =
        document.readyState === 'complete' &&
        fontsReady &&
        pendingVisibleImages().length === 0

      if ((ready && elapsed >= MIN_VISIBLE_MS) || elapsed >= MAX_WAIT_MS) {
        announce()
        return
      }
      timer = window.setTimeout(check, POLL_MS)
    }

    check()

    return () => window.clearTimeout(timer)
  }, [])

  return null
}
