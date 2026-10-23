import React from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export interface ScrollColorTransitionProps {
  className?: string
  showProgressBar?: boolean
}

/** Indicador de progreso; cada sección conserva su propio fondo. */
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
