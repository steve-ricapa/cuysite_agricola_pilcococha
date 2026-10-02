import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react'

interface SlideItem {
  image: string
  tag: string
  title: string
  description: string
  location: string
}

const SLIDES: SlideItem[] = [
  {
    image: '/images/fundo/team-field.jpg',
    tag: 'Cosecha Manual Selectiva',
    title: 'Cuadrillas expertas del Valle Sagrado',
    description: 'Corte cuidadoso con tijeras especiales para preservar el pedúnculo y la frescura natural.',
    location: 'Sector Calca - Pisac',
  },
  {
    image: '/images/fundo/riego-tecnificado.jpg',
    tag: 'Riego Tecnificado Andino',
    title: 'Agua pura de deshielos y goteo eficiente',
    description: 'Monitoreo hídrico computarizado para un desarrollo vigoroso de árboles de Palta Hass.',
    location: 'Fundo Agrícola Pacocha',
  },
  {
    image: '/images/fundo/acopio-cosecha.jpg',
    tag: 'Recepción y Cuidados de Campo',
    title: 'Acopio ágil y protección térmica',
    description: 'Traslado inmediato en canastillas ventiladas hacia sombras y planta de empaque.',
    location: 'Sector Calca - Pisac',
  },
  {
    image: '/images/hero/hero-real.jpg',
    tag: 'Huertos en Alta Densidad',
    title: 'Microclima interandino a 2,900 msnm',
    description: 'Alta radiación solar diurna y noches frescas que favorecen aceites naturales superiores.',
    location: 'Valle Sagrado, Cusco',
  },
]

export const FundoCarousel: React.FC = () => {
  const [[current, direction], setPage] = useState<[number, number]>([0, 0])
  const [isPaused, setIsPaused] = useState(false)

  const slideIndex = ((current % SLIDES.length) + SLIDES.length) % SLIDES.length

  const paginate = (newDirection: number) => {
    setPage([current + newDirection, newDirection])
  }

  // Auto-play cada 5 segundos si no está pausado
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [current, isPaused])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  const activeSlide = SLIDES[slideIndex]

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-forest-950 h-[480px] sm:h-[500px] select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Contenedor de Diapositiva Animada */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover"
          />

          {/* Gradiente de superposición para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Badge Superior Flotante */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
        <span className="px-3.5 py-1.5 rounded-full bg-forest-950/80 backdrop-blur-md text-avocado-400 font-bold text-xs border border-white/15 shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-avocado-400" />
          <span>{activeSlide.tag}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-cream/80 text-[11px] font-medium border border-white/10">
          <MapPin className="w-3 h-3 text-avocado-400" />
          <span>{activeSlide.location}</span>
        </span>
      </div>

      {/* Contador numérico de Slide */}
      <div className="absolute top-5 right-5 z-20">
        <span className="px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-cream/90 font-mono text-xs font-bold border border-white/15 shadow-lg">
          0{slideIndex + 1} / 0{SLIDES.length}
        </span>
      </div>

      {/* Controles Laterales Anterior / Siguiente */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-forest-950/70 hover:bg-forest-900 text-cream backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-xl"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-forest-950/70 hover:bg-forest-900 text-cream backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-xl"
        aria-label="Diapositiva siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pie de Diapositiva con Texto y Paginación */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-20">
        <div className="max-w-xl mb-4">
          <h3 className="text-xl sm:text-2xl font-black font-serif text-cream drop-shadow-md leading-snug">
            {activeSlide.title}
          </h3>
          <p className="text-xs sm:text-sm text-cream/80 mt-1 line-clamp-2 drop-shadow">
            {activeSlide.description}
          </p>
        </div>

        {/* Indicadores de Barras Interactivas */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > slideIndex ? 1 : -1])}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? 'w-8 bg-avocado-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
