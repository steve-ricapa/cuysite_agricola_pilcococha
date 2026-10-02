import React, { useEffect, useState, useRef } from 'react'

export interface AnimatedCounterProps {
  value: string | number
  duration?: number // ms
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  className = '',
}) => {
  const [current, setCurrent] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  // Extraer prefijo, número y sufijo (ej: "80+" -> prefix: "", num: 80, suffix: "+")
  // Ej: "+500t" -> prefix: "+", num: 500, suffix: "t"
  // Ej: "100%" -> prefix: "", num: 100, suffix: "%"
  const rawString = String(value).replace(/,/g, '')
  const match = rawString.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)

  const prefix = match ? match[1] : ''
  const targetNumber = match ? parseFloat(match[2]) : 0
  const suffix = match ? match[3] : ''
  const isFloat = match ? match[2].includes('.') : false

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    )

    observer.observe(elementRef.current)

    // Check if already in viewport on mount
    const rect = elementRef.current.getBoundingClientRect()
    const inView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0

    if (inView) {
      setHasStarted(true)
      observer.disconnect()
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted || targetNumber === 0) return

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing cúbico suave: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentVal = targetNumber * easeOut

      setCurrent(currentVal)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCurrent(targetNumber)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [hasStarted, targetNumber, duration])

  // Formatear con separadores de miles
  const formattedNumber = isFloat
    ? current.toFixed(1)
    : Math.round(current).toLocaleString('es-PE')

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {hasStarted ? `${prefix}${formattedNumber}${suffix}` : `${prefix}0${suffix}`}
    </span>
  )
}

