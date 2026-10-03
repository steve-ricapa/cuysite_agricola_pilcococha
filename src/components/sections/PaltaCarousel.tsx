import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Award, ShieldCheck, Check, Layers } from 'lucide-react'

interface PaltaSlide {
  id: string
  title: string
  subtitle: string
  highlight: string
  image: string
  tag: string
  badgeText: string
  detail: string
}

const PALTA_SLIDES: PaltaSlide[] = [
  {
    id: 'pulpa-cremosa',
    title: 'Pulpa Suave, Cremosa y Sin Fibras',
    subtitle: 'Gradiente verde pálido con corazón amarillo mantequilla',
    highlight: '21.5% - 24% Materia Seca',
    image: '/images/producto/palta-hass-hero.jpg',
    tag: 'Calidad Organoléptica',
    badgeText: 'Sabor Suave a Nuez',
    detail: 'Perfil sensorial balanceado con aceites saludables monoinsaturados.',
  },
  {
    id: 'en-arbol',
    title: 'Cosecha a Mano con Rocío Andino',
    subtitle: 'Cultivo interandino a 2,900 metros de altitud',
    highlight: '100% Cosecha Selectiva',
    image: '/images/producto/palta-arbol.jpg',
    tag: 'Origen Valle Sagrado',
    badgeText: 'Piel Rugosa Firme',
    detail: 'Excelente resistencia al transporte marítimo internacional de hasta 28 días.',
  },
  {
    id: 'empaque-exportacion',
    title: 'Cajas de Exportación Calidad 1',
    subtitle: 'Clasificación electrónica por peso y calibre exacto',
    highlight: 'Estándar Global G.A.P.',
    image: '/images/producto/palta-caja.jpg',
    tag: 'Presentación Premium',
    badgeText: 'Calibres 12 al 28',
    detail: 'Embalaje cuidadoso en plató de cartón corrugado de alta resistencia.',
  },
]

export const PaltaCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-play suave cada 5.5s
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PALTA_SLIDES.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [isPaused])

  const activeSlide = PALTA_SLIDES[activeIndex]

  return (
    <div
      className="relative flex flex-col space-y-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Marco de Imagen Principal con Transición Ken-Burns & Crossfade */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-forest-950 h-[460px] sm:h-[490px] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(3px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradiente cinemático */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Badge flotante de Calidad */}
        <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2">
          <span className="matucana-pill matucana-pill-emerald shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeSlide.tag}</span>
          </span>
          <span className="matucana-pill shadow-md">
            {activeSlide.badgeText}
          </span>
        </div>

        {/* Sello de Trazabilidad */}
        <div className="absolute top-5 right-5 z-20 hidden sm:block">
          <div className="w-12 h-12 rounded-2xl bg-forest-950/80 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center p-1 shadow-lg">
            <Award className="w-4 h-4 text-avocado-400" />
            <span className="text-[9px] font-black text-cream uppercase tracking-tight">Cat 1</span>
          </div>
        </div>

        {/* Tarjeta flotante en la parte inferior de la imagen */}
        <div className="absolute bottom-5 inset-x-5 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="liquid-glass-panel p-4 sm:p-5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl text-cream"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-avocado-400">
                  {activeSlide.highlight}
                </span>
                <span className="text-[11px] text-cream/70 font-mono">
                  {activeIndex + 1} / {PALTA_SLIDES.length}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-cream leading-snug">
                {activeSlide.title}
              </h3>
              <p className="text-xs text-cream/80 mt-1 line-clamp-2">
                {activeSlide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Miniaturas Interactivas Estilo Switcher de Lujo */}
      <div className="grid grid-cols-3 gap-3">
        {PALTA_SLIDES.map((slide, idx) => {
          const isCurrent = idx === activeIndex
          return (
            <button
              key={slide.id}
              onClick={() => setActiveIndex(idx)}
              className={`group flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                isCurrent
                  ? 'liquid-glass-card-active ring-2 ring-avocado-400/90 shadow-md scale-[1.02]'
                  : 'liquid-glass-card hover:border-white/40'
              }`}
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/20 relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                {isCurrent && (
                  <div className="absolute inset-0 bg-avocado-400/20 ring-1 ring-avocado-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className={`text-[10px] font-bold block truncate uppercase tracking-wider ${
                  isCurrent ? 'text-avocado-300 font-mono' : 'text-cream/70'
                }`}>
                  {slide.tag}
                </span>
                <h4 className={`text-xs font-bold font-serif truncate ${
                  isCurrent ? 'text-cream' : 'text-cream/90'
                }`}>
                  {slide.badgeText}
                </h4>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
