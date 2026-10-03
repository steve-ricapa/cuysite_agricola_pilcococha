import React, { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export interface ScrollColorTransitionProps {
  className?: string
  showProgressBar?: boolean
}

/**
 * Componente que gestiona el cambio dinámico y fluido del color de fondo
 * según la sección activa en el viewport.
 * 
 * Cada sección define su color puro mediante el atributo `data-bg-color`.
 * Esto garantiza colores nítidos, luminosos y elegantes (sin tonos grisáceos u opacos intermedios),
 * animando la transición de forma ultra-suave mediante CSS cubic-bezier.
 */
export const ScrollColorTransition: React.FC<ScrollColorTransitionProps> = ({
  className = '',
  showProgressBar = true,
}) => {
  const { scrollYProgress } = useScroll()

  // Barra de progreso suave para el scroll global
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    let ticking = false

    const updateActiveColor = () => {
      const sections = document.querySelectorAll<HTMLElement>('[data-bg-color]')
      if (!sections.length) return

      // Umbral de activación: la transición se activa en cuanto la línea divisoria entra en el 72% de la ventana
      // para que el cambio fluya exactamente desde la línea inferior del value strip hasta el texto inicial
      const triggerY = window.innerHeight * 0.72
      let activeColor = sections[0].getAttribute('data-bg-color') || '#0E2C20'

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const rect = section.getBoundingClientRect()
        // Si el borde superior de la sección cruza el umbral
        if (rect.top <= triggerY && rect.bottom >= window.innerHeight * 0.15) {
          activeColor = section.getAttribute('data-bg-color') || activeColor
        }
      }

      if (document.body.style.backgroundColor !== activeColor) {
        document.body.style.backgroundColor = activeColor
        document.documentElement.style.setProperty('--page-dynamic-bg', activeColor)
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveColor)
        ticking = true
      }
    }

    // Inicializar color de la primera sección de inmediato
    updateActiveColor()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.body.style.backgroundColor = ''
      document.documentElement.style.removeProperty('--page-dynamic-bg')
    }
  }, [])

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* Barra ultrafina de progreso en la parte superior con gradiente de palta dorada */}
      {showProgressBar && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none bg-gradient-to-r from-avocado-400 via-avocado-600 to-forest-600 shadow-[0_1px_8px_rgba(154,181,93,0.4)]"
          style={{ scaleX: smoothProgress }}
        />
      )}
    </div>
  )
}
