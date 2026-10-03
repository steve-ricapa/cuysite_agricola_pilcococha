import React, { useState, useEffect, useRef } from 'react'
import { motion, MotionConfig, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Globe2, 
  Truck, 
  Package, 
  Sprout, 
  Scale,
  CheckCircle2,
  Calendar,
  ThermometerSnowflake,
  ExternalLink,
  Star,
  Award,
  Droplets,
  Clock,
  Leaf,
  Anchor,
  BarChart3
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'

const heroSlides = [
  {
    id: 'fundo',
    title: 'Fundos de Altura',
    subtitle: 'Valles Interandinos del Perú',
    tag: 'Origen Certificado',
    image: '/images/hero/hero-real.jpg',
    metric: '2,800 msnm',
  },
  {
    id: 'valle',
    title: 'Plantaciones Tecnificadas',
    subtitle: 'Terrazas y Manejo Agronómico',
    tag: 'Alta Eficiencia',
    image: '/images/hero/slide-valle.jpg',
    metric: '80+ Has',
  },
  {
    id: 'cosecha',
    title: 'Cosecha Selectiva',
    subtitle: 'Palta Hass Calibre de Exportación',
    tag: 'Corte Manual',
    image: '/images/hero/slide-cosecha.jpg',
    metric: '>21.5% M.S.',
  },
  {
    id: 'riego',
    title: 'Sustentabilidad Hídrica',
    subtitle: 'Riego Tecnificado & Cuencas',
    tag: 'Agro Sostenible',
    image: '/images/fundo/riego-tecnificado.jpg',
    metric: 'Cadena 5°C',
  },
]

const rotatingWords = ['CALIDAD', 'TRAZABILIDAD', 'ORIGEN', 'CONFIANZA']

export interface SeasonMonthData {
  month: string
  fullName: string
  status: 'peak' | 'harvest' | 'pre-harvest' | 'dormant'
  statusLabel: string
  volumePercentage: number
  dryMatter: string
  containersPerWeek: string
  calibers: string
  primaryMarkets: string
  description: string
  phase: string
}

const seasonalityData: SeasonMonthData[] = [
  {
    month: 'ENE',
    fullName: 'Enero',
    status: 'pre-harvest',
    statusLabel: 'Cuaja de Fruto',
    volumePercentage: 8,
    dryMatter: '18.0% - 19.0%',
    containersPerWeek: 'Manejo en Campo',
    calibers: 'Crecimiento Inicial',
    primaryMarkets: 'Supervisión Agronómica',
    description: 'Monitoreo de fertirriego por goteo computarizado y evaluación de cuaja en los valles interandinos.',
    phase: 'Floración & Cuaja',
  },
  {
    month: 'FEB',
    fullName: 'Febrero',
    status: 'pre-harvest',
    statusLabel: 'Pre-Cosecha',
    volumePercentage: 18,
    dryMatter: '19.5% - 20.5%',
    containersPerWeek: 'Muestreo de Lotes',
    calibers: 'Engorde en Árbol',
    primaryMarkets: 'Auditoría SENASA',
    description: 'Análisis fenológicos y primeras pruebas de materia seca en laboratorio antes de iniciar el corte comercial.',
    phase: 'Pre-Cosecha',
  },
  {
    month: 'MAR',
    fullName: 'Marzo',
    status: 'harvest',
    statusLabel: 'Inicio Cosecha',
    volumePercentage: 45,
    dryMatter: '21.5% - 22.0%',
    containersPerWeek: '4 - 6 Contenedores / sem',
    calibers: '12, 14, 16 (Grandes)',
    primaryMarkets: 'Rotterdam, Algeciras',
    description: 'Apertura de cosecha selectiva a tijera. Fruta temprana con 21.5%+ de materia seca garantizada para despachos tempranos.',
    phase: 'Cosecha Activa',
  },
  {
    month: 'ABR',
    fullName: 'Abril',
    status: 'peak',
    statusLabel: 'Pico Exportación',
    volumePercentage: 85,
    dryMatter: '22.0% - 23.0%',
    containersPerWeek: '10 - 12 Contenedores / sem',
    calibers: '14, 16, 18, 20 (Equilibrado)',
    primaryMarkets: 'Europa (Rotterdam, UK), USA',
    description: 'Aceleración del ritmo de cosecha. Excelente relación pulpa/semilla y alta firmeza para programas marítimos continuos.',
    phase: 'Pico de Exportación',
  },
  {
    month: 'MAY',
    fullName: 'Mayo',
    status: 'peak',
    statusLabel: 'Pico Exportación',
    volumePercentage: 100,
    dryMatter: '22.5% - 23.5%',
    containersPerWeek: '14 - 16 Contenedores / sem',
    calibers: '14, 16, 18, 22 (Premium)',
    primaryMarkets: 'Europa, USA & Asia',
    description: 'Cénit de campaña: máximo volumen de despacho con porcentaje óptimo de grasa vegetal y textura mantecosa insuperable.',
    phase: 'Pico de Exportación',
  },
  {
    month: 'JUN',
    fullName: 'Junio',
    status: 'peak',
    statusLabel: 'Pico Exportación',
    volumePercentage: 100,
    dryMatter: '23.0% - 24.0%',
    containersPerWeek: '14 - 16 Contenedores / sem',
    calibers: '16, 18, 20, 24',
    primaryMarkets: 'Rotterdam, Long Beach, Shanghái',
    description: 'Plena disponibilidad de calibres comerciales estándar. Contenedores reefer con atmósfera controlada hacia ultramar.',
    phase: 'Pico de Exportación',
  },
  {
    month: 'JUL',
    fullName: 'Julio',
    status: 'peak',
    statusLabel: 'Pico Exportación',
    volumePercentage: 90,
    dryMatter: '23.5% - 24.5%',
    containersPerWeek: '10 - 12 Contenedores / sem',
    calibers: '16, 18, 20, 24',
    primaryMarkets: 'Europa, Cono Sur, Asia',
    description: 'Sabor a nuez pronunciado y piel de alta resistencia. Ventana ideal para contratos de abastecimiento de verano boreal.',
    phase: 'Pico de Exportación',
  },
  {
    month: 'AGO',
    fullName: 'Agosto',
    status: 'harvest',
    statusLabel: 'Cosecha Tardía',
    volumePercentage: 55,
    dryMatter: '24.0% - 25.0%',
    containersPerWeek: '5 - 7 Contenedores / sem',
    calibers: '18, 20, 24, 28',
    primaryMarkets: 'Mercados Gourmet Europa / Latam',
    description: 'Fruta de parcelas de mayor altitud con máxima concentración de aceites y perfiles sensoriales excepcionales.',
    phase: 'Cosecha Tardía',
  },
  {
    month: 'SET',
    fullName: 'Setiembre',
    status: 'harvest',
    statusLabel: 'Cierre Campaña',
    volumePercentage: 35,
    dryMatter: '24.5% - 25.5%',
    containersPerWeek: '2 - 4 Contenedores / sem',
    calibers: '20, 24, 28',
    primaryMarkets: 'Despachos Finales Ultramar',
    description: 'Últimos despachos de exportación del año. Cuarentena y balance de trazabilidad de los fundos certificados.',
    phase: 'Cierre Campaña',
  },
  {
    month: 'OCT',
    fullName: 'Octubre',
    status: 'dormant',
    statusLabel: 'Post-Cosecha',
    volumePercentage: 8,
    dryMatter: 'Descanso Fisiológico',
    containersPerWeek: 'Poda y Sanidad',
    calibers: '—',
    primaryMarkets: 'Mantenimiento de Fundos',
    description: 'Poda selectiva de copas, desinfección de herramientas y aplicación de bioestimulantes para la siguiente floración.',
    phase: 'Mantenimiento & Poda',
  },
  {
    month: 'NOV',
    fullName: 'Noviembre',
    status: 'dormant',
    statusLabel: 'Floración',
    volumePercentage: 8,
    dryMatter: 'Brotación y Floración',
    containersPerWeek: 'Manejo Hídrico',
    calibers: '—',
    primaryMarkets: 'Polinización Asistida',
    description: 'Apertura de yemas florales en los valles y colocación de colmenas de polinización natural en todos los sectores.',
    phase: 'Floración',
  },
  {
    month: 'DIC',
    fullName: 'Diciembre',
    status: 'dormant',
    statusLabel: 'Cuaja Inicial',
    volumePercentage: 8,
    dryMatter: 'Formación de Fruto',
    containersPerWeek: 'Monitoreo Preventivo',
    calibers: '—',
    primaryMarkets: 'Auditorías GlobalG.A.P.',
    description: 'Auditorías anuales de certificación sanitaria y ajuste milimétrico de los sistemas de fertirriego computarizado.',
    phase: 'Cuaja Inicial',
  },
]

// Diálogos sincronizados con el video de la palta (video de 10s)
const paltaDialogues: { start: number; end: number; text: string }[] = [
  { start: 5.5, end: 6.8, text: '¡Hola!' },
  { start: 7.2, end: 9.5, text: '¡Bienvenidos a Agrícola Pilcococha!' },
]

export const HomePage: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [dialogueText, setDialogueText] = useState('')
  const [showDialogue, setShowDialogue] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<number>(4) // Mayo por defecto (pico)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  // Rotación automática del carrusel cada 6.5 segundos
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6500)
    return () => clearInterval(slideTimer)
  }, [])

  // Sincronizar diálogos con requestAnimationFrame
  useEffect(() => {
    const syncDialogue = () => {
      const video = videoRef.current
      if (video && !video.paused) {
        const t = video.currentTime
        const active = paltaDialogues.find(d => t >= d.start && t <= d.end)
        if (active) {
          setDialogueText(active.text)
          setShowDialogue(true)
        } else {
          setShowDialogue(false)
        }
      }
      rafRef.current = requestAnimationFrame(syncDialogue)
    }
    rafRef.current = requestAnimationFrame(syncDialogue)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden relative">
        <ScrollColorTransition />

        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL: CAROUSEL + MATUCANA HALF BLUR + MASCOTA 3D GRANDE & B2B */}
        {/* ========================================================================= */}
        <section 
          data-bg-color="#0E2C20" 
          className="relative min-h-screen flex items-center text-white overflow-hidden pt-18 pb-6 md:pt-20 md:pb-8 transition-colors duration-700"
        >
          {/* Carrusel de Fondo Panorámico de Pantalla Completa */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={heroSlides[activeSlide].id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={heroSlides[activeSlide].image} 
                  alt={heroSlides[activeSlide].title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>

            {/* Viñeta general sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-forest-950/40" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-forest-950/10 to-forest-950/50" />
          </div>

          {/* Overlay Matucana: Mitad izquierda con efecto agua / desenfoque integrado (Estilo Imagen 4) */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] xl:w-[47%] z-1 matucana-blur-overlay pointer-events-none" />

          <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 w-full py-2 lg:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
              
              {/* =================================================================== */}
              {/* MITAD IZQUIERDA: TEXTO INTEGRADO SOBRE DESENFOQUE (ESTILO MATUCANA) */}
              {/* =================================================================== */}
              <div className="lg:col-span-5 xl:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 lg:space-y-5 max-w-xl"
                >
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-avocado-400/20 border border-avocado-400/35 text-avocado-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-xs shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-avocado-400 animate-pulse shadow-[0_0_8px_rgba(164,227,71,1)]" />
                    <span>Del campo peruano al mercado global</span>
                  </div>

                  {/* Título Principal */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-serif text-cream leading-[1.08] tracking-tight drop-shadow-md">
                    Palta cultivada para llegar más lejos.
                  </h1>

                  {/* Dinámica de palabras */}
                  <div className="flex items-center gap-2.5 text-base sm:text-lg text-cream/90 font-medium font-sans">
                    <span className="text-avocado-400 font-bold">Cultivamos</span>
                    <span className="inline-block min-w-[130px] px-3.5 py-1 bg-white/10 rounded-xl text-cream font-bold tracking-wider text-sm sm:text-base border border-white/20 text-center backdrop-blur-xs shadow-xs">
                      {rotatingWords[wordIndex]}
                    </span>
                    <span className="hidden sm:inline text-cream/65 text-xs sm:text-sm">• Fundo Agrícola Pilcococha</span>
                  </div>

                  {/* Descripción editorial */}
                  <p className="text-sm sm:text-base md:text-base lg:text-lg text-cream/85 leading-relaxed font-light">
                    Palta Hass peruana de exportación cultivada bajo estrictos estándares fitosanitarios, con materia seca garantizada y trazabilidad integral desde nuestros árboles hasta el consumidor final.
                  </p>

                  {/* Indicadores de métricas B2B (Estilo Matucana) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/15">
                    <div>
                      <p className="text-xl sm:text-2xl font-black font-serif text-cream">80+</p>
                      <p className="text-[10.5px] text-cream/70 uppercase tracking-wider font-mono">Has en Prod.</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black font-serif text-avocado-300">&gt;21.5%</p>
                      <p className="text-[10.5px] text-cream/70 uppercase tracking-wider font-mono">Materia Seca</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black font-serif text-cream">100%</p>
                      <p className="text-[10.5px] text-cream/70 uppercase tracking-wider font-mono">Hass Selección</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black font-serif text-avocado-300">5°C</p>
                      <p className="text-[10.5px] text-cream/70 uppercase tracking-wider font-mono">Frío Export.</p>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                    <Link
                      to="/cotizar"
                      className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-avocado-600/35 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Solicitar Cotización B2B</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>

                    <Link
                      to="/nuestra-palta"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-sm sm:text-base transition-all border border-white/20 backdrop-blur-xs"
                    >
                      <span>Conocer Nuestra Palta</span>
                    </Link>
                  </div>

                  {/* Ficha técnica resumida al pie de la columna izquierda (Estilo Información General de Matucana) */}
                  <div className="p-3.5 rounded-2xl liquid-glass-panel mt-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-cream/80">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-avocado-400 shrink-0" />
                        <span><strong>2,800 msnm</strong> — Altitud Valle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-avocado-400 shrink-0" />
                        <span><strong>Mar – Sep</strong> — Temporada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-avocado-400 shrink-0" />
                        <span><strong>SENASA</strong> Certificado</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* =================================================================== */}
              {/* MITAD DERECHA: MASCOTA 3D PALTA + CARDS PILARES B2B ANCHAS         */}
              {/* =================================================================== */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center relative w-full">
                
                {/* 1. Mascota Animada de la Palta GRANDE y PROTAGÓNICA */}
                <div className="flex flex-col items-center relative w-full">
                  {/* Video 3D de la Palta - TAMAÑO GRANDE Y ALTO */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-72 sm:w-84 md:w-96 lg:w-[440px] xl:w-[500px] relative flex justify-center"
                  >
                    {/* Globo de diálogo flotante sincronizado: ANCLADO DIRECTAMENTE SOBRE EL VIDEO/SOMBRERO */}
                    <motion.div
                      animate={{ 
                        opacity: showDialogue ? 1 : 0, 
                        y: showDialogue ? 0 : 6, 
                        scale: showDialogue ? 1 : 0.92 
                      }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                    >
                      <div className="relative bg-white/95 backdrop-blur-md text-forest-950 px-4 sm:px-5 py-2 rounded-2xl shadow-2xl border border-avocado-400/40">
                        <p className="text-xs sm:text-sm font-bold text-center leading-snug whitespace-nowrap">
                          {dialogueText}
                        </p>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-avocado-400/40" />
                      </div>
                    </motion.div>

                    {/* Aura verde esmeralda detrás del personaje */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-avocado-400/25 blur-3xl animate-pulse" />
                    </div>

                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px] xl:h-[530px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative z-20"
                    >
                      <source src="/videopalta/palta-animada.webm" type="video/webm" />
                      <source src="/videopalta/gemini_generated_video_8b2dc77d.mp4" type="video/mp4" />
                    </video>
                  </motion.div>
                </div>

                {/* 2. Tarjetas Flotantes del Carrusel: SUPERPUESTAS EN PRIMER PLANO (SUBEN Y NO SE CORTAN) */}
                <div className="w-full relative z-30 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 xl:-mt-32">
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-avocado-400 animate-pulse shadow-[0_0_8px_rgba(164,227,71,0.8)]" />
                      <span className="text-xs uppercase tracking-wider text-cream font-bold font-mono">
                        Pilares de Exportación ({activeSlide + 1}/4)
                      </span>
                    </div>

                    {/* Indicadores de diapositiva */}
                    <div className="flex items-center gap-2">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeSlide === idx 
                              ? 'w-7 bg-avocado-400 shadow-[0_0_10px_rgba(164,227,71,0.9)]' 
                              : 'w-2.5 bg-white/30 hover:bg-white/60'
                          }`}
                          aria-label={`Ir a pilar ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Grid de 4 Cards Espaciosas y Anchas (sin límites artificiales) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-4 xl:gap-5 w-full">
                    {heroSlides.map((slide, idx) => {
                      const isActive = activeSlide === idx
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setActiveSlide(idx)}
                          className={`text-left p-3 sm:p-3.5 xl:p-4 rounded-2xl cursor-pointer transition-all duration-300 relative group overflow-hidden w-full ${
                            isActive 
                              ? 'liquid-glass-card-active ring-2 ring-avocado-400/95 shadow-xl scale-[1.02]' 
                              : 'liquid-glass-card hover:border-white/50 hover:-translate-y-1'
                          }`}
                        >
                          {/* Miniatura panorámica amplia */}
                          <div className="aspect-16/10 h-22 sm:h-24 lg:h-26 xl:h-28 rounded-xl overflow-hidden mb-2.5 relative w-full">
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
                            <span className="absolute bottom-1.5 right-1.5 text-[9.5px] sm:text-[10px] xl:text-[11px] font-mono text-avocado-300 font-bold bg-forest-950/95 px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/10 shadow-xs whitespace-nowrap">
                              {slide.metric}
                            </span>
                          </div>

                          {/* Título en dos líneas sin cortes raros */}
                          <p className="text-xs sm:text-[13px] xl:text-[14px] font-bold text-cream line-clamp-2 leading-snug group-hover:text-avocado-300 transition-colors min-h-[2rem]">
                            {slide.title}
                          </p>
                          <p className="text-[10px] sm:text-[11px] xl:text-xs text-cream/70 truncate mt-1 font-light">
                            {slide.tag}
                          </p>

                          {/* Punto indicador de diapositiva activa */}
                          {isActive && (
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-avocado-400 shadow-[0_0_10px_rgba(164,227,71,1)]" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. BANDA DE ATRIBUTOS (VALUE STRIP FLOTANTE ACUÁTICO)                     */}
        {/* ========================================================================= */}
        <section data-bg-color="#0B241A" className="relative z-20 py-8 px-6 transition-colors duration-700">
          <div className="max-w-[1720px] mx-auto">
            <div className="liquid-glass-panel rounded-3xl p-6 sm:p-8 backdrop-blur-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="pt-3 md:pt-0 md:px-6 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 flex items-center justify-center text-avocado-300 shrink-0 group-hover:scale-110 group-hover:bg-avocado-500/30 transition-all duration-300 shadow-md shadow-avocado-500/10">
                    <Sprout className="w-6 h-6 text-avocado-300" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-avocado-300 font-extrabold block mb-0.5">
                      Variedad
                    </span>
                    <p className="font-serif font-bold text-lg sm:text-xl text-cream group-hover:text-avocado-300 transition-colors">
                      Palta Hass 100%
                    </p>
                    <p className="text-xs text-cream/80">Grasas saludables & perfil extra creamy</p>
                  </div>
                </div>

                <div className="pt-3 md:pt-0 md:px-6 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 flex items-center justify-center text-avocado-300 shrink-0 group-hover:scale-110 group-hover:bg-avocado-500/30 transition-all duration-300 shadow-md shadow-avocado-500/10">
                    <MapPin className="w-6 h-6 text-avocado-300" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-avocado-300 font-extrabold block mb-0.5">
                      Origen Andino
                    </span>
                    <p className="font-serif font-bold text-lg sm:text-xl text-cream group-hover:text-avocado-300 transition-colors">
                      Valles del Perú
                    </p>
                    <p className="text-xs text-cream/80">Cusco & valles interandinos fértiles</p>
                  </div>
                </div>

                <div className="pt-3 md:pt-0 md:px-6 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 flex items-center justify-center text-avocado-300 shrink-0 group-hover:scale-110 group-hover:bg-avocado-500/30 transition-all duration-300 shadow-md shadow-avocado-500/10">
                    <ShieldCheck className="w-6 h-6 text-avocado-300" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-avocado-300 font-extrabold block mb-0.5">
                      Certificación
                    </span>
                    <p className="font-serif font-bold text-lg sm:text-xl text-cream group-hover:text-avocado-300 transition-colors">
                      Control Lote a Lote
                    </p>
                    <p className="text-xs text-cream/80">SENASA fitosanitario & GlobalG.A.P.</p>
                  </div>
                </div>

                <div className="pt-3 md:pt-0 md:px-6 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 flex items-center justify-center text-avocado-300 shrink-0 group-hover:scale-110 group-hover:bg-avocado-500/30 transition-all duration-300 shadow-md shadow-avocado-500/10">
                    <ThermometerSnowflake className="w-6 h-6 text-avocado-300" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-avocado-300 font-extrabold block mb-0.5">
                      Cadena de Frío
                    </span>
                    <p className="font-serif font-bold text-lg sm:text-xl text-cream group-hover:text-avocado-300 transition-colors">
                      5°C Continuo
                    </p>
                    <p className="text-xs text-cream/80">28 días de vida útil en ultramar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. NUESTRA IDENTIDAD: FUNDOS DE ALTURA Y TECNOLOGÍA AGRONÓMICA             */}
        {/* ========================================================================= */}
        <section id="identidad" data-bg-color="#0D271D" className="py-20 md:py-28 relative z-10 transition-colors duration-700">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-avocado-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Imagen con composición estilo Matucana */}
              <div className="lg:col-span-6 relative">
                <div className="matucana-card p-3 sm:p-4 group">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3">
                    <img
                      src="/images/fundo/riego-tecnificado.jpg"
                      alt="Fundos tecnificados de Agrícola Pilcococha en valles del Perú"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />

                    {/* Badges superiores estilo Matucana */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      <span className="matucana-pill matucana-pill-emerald shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        Fundo Certificado
                      </span>
                      <span className="matucana-pill shadow-lg">
                        <MapPin className="w-3.5 h-3.5 text-avocado-400" />
                        Cusco & Valles Andinos
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="w-9 h-9 rounded-full bg-forest-950/70 backdrop-blur-md border border-white/20 text-avocado-400 flex items-center justify-center shadow-lg">
                        <Award className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Overlay inferior con métricas flotantes */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="liquid-glass-panel rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-avocado-400 font-bold block">
                            Manejo Hídrico de Precisión
                          </span>
                          <p className="font-serif text-base sm:text-lg font-bold text-cream">
                            Fertirriego Computarizado por Goteo
                          </p>
                        </div>
                        <div className="text-right pl-3 border-l border-white/10 shrink-0">
                          <span className="text-sm sm:text-base font-bold text-cream block font-mono">2,850 m</span>
                          <span className="text-[10px] text-cream/60 uppercase">Altitud</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido Editorial con tarjetas translúcidas */}
              <div className="lg:col-span-6 space-y-7">
                <div className="section-badge mb-3">
                  <span className="section-badge-dot" />
                  <span>Nuestra Identidad & Fundo</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight">
                  Cultivamos relaciones que comienzan en la tierra.
                </h2>

                <p className="text-cream/80 text-base md:text-lg leading-relaxed font-light">
                  En <strong className="text-cream font-semibold">Agrícola Pilcococha</strong> gestionamos plantaciones de Palta Hass en los valles interandinos más fértiles del Perú. Combinamos agronomía de precisión, manejo hídrico regenerativo y alianzas sostenibles con productores y comunidades locales.
                </p>

                {/* 3 Métricas en cards translúcidas acuáticas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center text-xs">
                        <Sprout className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono text-avocado-300 font-bold px-2 py-0.5 rounded-md bg-forest-950/80 border border-white/10">
                        Tecnificado
                      </span>
                    </div>
                    <span className="block text-3xl sm:text-4xl font-black font-serif text-cream group-hover:text-avocado-300 transition-colors">
                      <AnimatedCounter value="80+" duration={2000} />
                    </span>
                    <span className="text-xs text-cream/70 font-medium mt-1 block">
                      Hectáreas en producción
                    </span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center text-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono text-avocado-300 font-bold px-2 py-0.5 rounded-md bg-forest-950/80 border border-white/10">
                        Solidez
                      </span>
                    </div>
                    <span className="block text-3xl sm:text-4xl font-black font-serif text-cream group-hover:text-avocado-300 transition-colors">
                      <AnimatedCounter value="10+" duration={1600} />
                    </span>
                    <span className="text-xs text-cream/70 font-medium mt-1 block">
                      Años de experiencia
                    </span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono text-avocado-300 font-bold px-2 py-0.5 rounded-md bg-forest-950/80 border border-white/10">
                        Auditable
                      </span>
                    </div>
                    <span className="block text-3xl sm:text-4xl font-black font-serif text-cream group-hover:text-avocado-300 transition-colors">
                      <AnimatedCounter value="100%" duration={2200} />
                    </span>
                    <span className="text-xs text-cream/70 font-medium mt-1 block">
                      Trazabilidad de lote
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    to="/nosotros"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 backdrop-blur-md font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 group"
                  >
                    <span>Conocer nuestra historia y filosofía</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PRODUCTO: PALTA HASS DE EXPORTACIÓN (CARDS ESTILO MATUCANA)             */}
        {/* ========================================================================= */}
        <section id="palta-hass" data-bg-color="#092218" className="py-20 md:py-28 relative z-10 transition-colors duration-700">
          <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <div className="section-badge mb-3">
                  <span className="section-badge-dot" />
                  <span>Fruta de Exportación</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight">
                  Palta Hass Peruana: Calidad de Exportación.
                </h2>
              </div>
              <p className="text-cream/70 text-sm sm:text-base max-w-xl font-light leading-relaxed">
                Cosechada selectivamente en punto óptimo de materia seca (21.5% a 24%). Ofrece textura cremosa superior, piel rugosa resistente a largas travesías y calibres calibrados electrónicamente.
              </p>
            </div>

            {/* Grid de 3 Cards estilo Matucana Perú */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Palta Hass Calibre Premium */}
              <div className="matucana-card p-5 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4.5">
                  <img
                    src="/images/producto/palta-hass-hero.jpg"
                    alt="Palta Hass Calibre Premium de Exportación"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />

                  {/* Badges superiores flotantes */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="matucana-pill matucana-pill-emerald shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      Calibre 12 - 28
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="w-8 h-8 rounded-full bg-forest-950/70 backdrop-blur-md border border-white/20 text-cream flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4 text-avocado-400" />
                    </span>
                  </div>

                  {/* Chips inferiores sobre la foto */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                    <span className="bg-forest-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-cream/90 flex items-center gap-1.5 shadow-sm">
                      <Package className="w-3.5 h-3.5 text-avocado-400" />
                      Cajas 4kg / 10kg
                    </span>
                    <span className="bg-forest-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-avocado-300 font-bold shadow-sm">
                      Pre-frío Inmediato
                    </span>
                  </div>
                </div>

                {/* Título & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-cream group-hover:text-avocado-300 transition-colors">
                    Palta Hass Premium
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Calidad Extra
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-3 font-semibold">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-cream/80 ml-1">5.0 (Estándar GlobalG.A.P.)</span>
                </div>

                <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed mb-6 line-clamp-3">
                  Piel rugosa flexible de óptimo grosor, pulpa cremosa con alta concentración de ácido oleico, libre de defectos y maduración controlada.
                </p>

                {/* Metadata y Botón circular estilo Matucana */}
                <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-cream font-mono">21.5% - 24%</span>
                      <span className="block text-[10px] text-cream/50 uppercase tracking-wider">Materia Seca</span>
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-cream font-mono">Cal. 12 a 28</span>
                      <span className="block text-[10px] text-cream/50 uppercase tracking-wider">Calibres</span>
                    </div>
                  </div>

                  <Link
                    to="/nuestra-palta"
                    className="matucana-circle-btn group-hover:scale-110"
                    title="Ver ficha técnica completa"
                  >
                    <ArrowRight className="w-4 h-4 text-forest-950" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Cosecha Selectiva en Fundo */}
              <div className="matucana-card p-5 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4.5">
                  <img
                    src="/images/hero/slide-cosecha.jpg"
                    alt="Cosecha manual asistida en plantaciones de altura"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />

                  {/* Badges superiores */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="matucana-pill matucana-pill-emerald shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Corte a Tijera
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="w-8 h-8 rounded-full bg-forest-950/70 backdrop-blur-md border border-white/20 text-cream flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-4 h-4 text-avocado-400" />
                    </span>
                  </div>

                  {/* Chips inferiores sobre la foto */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                    <span className="bg-forest-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-cream/90 flex items-center gap-1.5 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-avocado-400" />
                      Pedúnculo 5mm
                    </span>
                    <span className="bg-forest-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-avocado-300 font-bold shadow-sm">
                      0 Micro-fisuras
                    </span>
                  </div>
                </div>

                {/* Título & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-cream group-hover:text-avocado-300 transition-colors">
                    Cosecha Selectiva
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    SENASA OK
                  </span>
                </div>

                <div className="text-xs text-cream/60 mb-3 font-medium">
                  Análisis fenológico y de aceites previos por lote
                </div>

                <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed mb-6 line-clamp-3">
                  Corte manual selectivo con tijeras desinfectadas, protegiendo las lenticelas y evitando rozamientos para conservar la cera natural protectora.
                </p>

                {/* Metadata y Botón circular */}
                <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-cream font-mono">0 Residuos</span>
                      <span className="block text-[10px] text-cream/50 uppercase tracking-wider">Químicos LMR</span>
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-cream font-mono">100% Lote</span>
                      <span className="block text-[10px] text-cream/50 uppercase tracking-wider">Trazabilidad</span>
                    </div>
                  </div>

                  <Link
                    to="/proceso-calidad"
                    className="matucana-circle-btn group-hover:scale-110"
                    title="Conocer proceso fitosanitario"
                  >
                    <ArrowRight className="w-4 h-4 text-forest-950" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Cadena de Frío & Tránsito Ultramar */}
              <div className="matucana-card p-5 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4.5">
                  <img
                    src="/images/proceso/empaque.jpg"
                    alt="Packing y selección electrónica para exportación"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />

                  {/* Badges superiores */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="matucana-pill matucana-pill-emerald shadow-lg">
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      5°C Continuo
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="w-8 h-8 rounded-full bg-forest-950/70 backdrop-blur-md border border-white/20 text-cream flex items-center justify-center shadow-lg">
                      <Globe2 className="w-4 h-4 text-avocado-400" />
                    </span>
                  </div>

                  {/* Chips inferiores sobre la foto */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                    <span className="bg-forest-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-cream/90 flex items-center gap-1.5 shadow-sm">
                      <Truck className="w-3.5 h-3.5 text-avocado-400" />
                      Callao & Chancay
                    </span>
                    <span className="bg-forest-950/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-avocado-300 font-bold shadow-sm">
                      Atmósfera Controlada
                    </span>
                  </div>
                </div>

                {/* Título & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-cream group-hover:text-avocado-300 transition-colors">
                    Vida Útil Ultramar
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    28 Días
                  </span>
                </div>

                <div className="text-xs text-cream/60 mb-3 font-medium">
                  Monitoreo satelital continuo de temperatura en contenedores
                </div>

                <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed mb-6 line-clamp-3">
                  Pre-frío forzado inmediato tras el packing y despacho en contenedores de atmósfera controlada para asegurar firmeza intacta y color perfecto en destino.
                </p>

                {/* Metadata y Botón circular */}
                <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-cream font-mono">5°C ± 0.5°C</span>
                      <span className="block text-[10px] text-cream/50 uppercase tracking-wider">Cadena de Frío</span>
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-cream font-mono">28 Días</span>
                      <span className="block text-[10px] text-cream/50 uppercase tracking-wider">Autonomía</span>
                    </div>
                  </div>

                  <Link
                    to="/mercados"
                    className="matucana-circle-btn group-hover:scale-110"
                    title="Ver rutas marítimas y mercados"
                  >
                    <ArrowRight className="w-4 h-4 text-forest-950" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RESUMEN: PROCESO & TRAZABILIDAD (GRID 4 CARDS MATUCANA)                */}
        {/* ========================================================================= */}
        <section id="proceso" data-bg-color="#071C14" className="py-24 md:py-28 text-cream relative z-10 transition-colors duration-700">
          <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="section-badge mb-3">
                  <span className="section-badge-dot" />
                  <span>Trazabilidad Total</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream">
                  De la tierra al puerto de destino.
                </h2>
              </div>
              <p className="text-cream/70 text-sm sm:text-base max-w-md font-light leading-relaxed">
                Supervisión milimétrica bajo los más exigentes protocolos fitosanitarios de SENASA, USDA-APHIS y la Unión Europea.
              </p>
            </div>

            {/* Pipeline de 4 Cards estilo Matucana */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Paso 1: Cultivo */}
              <div className="matucana-card p-4 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-3.5">
                  <img
                    src="/images/fundo/riego-tecnificado.jpg"
                    alt="Cultivo tecnificado de Palta Hass"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 matucana-pill matucana-pill-emerald shadow-md">
                    01 / CULTIVO
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-avocado-300 bg-forest-950/90 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                    Fertirriego IoT
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-cream mb-1 group-hover:text-avocado-300 transition-colors">
                  Manejo Tecnificado
                </h3>
                <p className="text-cream/70 text-xs leading-relaxed mb-4 flex-1">
                  Fertirriego computarizado y monitoreo de humedad para optimizar nutrientes en cada árbol.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-cream font-mono">24/7</span>
                    <span className="block text-[9.5px] text-cream/50 uppercase">Monitoreo</span>
                  </div>
                  <Link to="/proceso-calidad" className="matucana-circle-btn !w-8 !h-8">
                    <ArrowRight className="w-3.5 h-3.5 text-forest-950" />
                  </Link>
                </div>
              </div>

              {/* Paso 2: Cosecha */}
              <div className="matucana-card p-4 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-3.5">
                  <img
                    src="/images/fundo/acopio-cosecha.jpg"
                    alt="Corte selectivo de palta de exportación"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 matucana-pill matucana-pill-emerald shadow-md">
                    02 / COSECHA
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-avocado-300 bg-forest-950/90 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                    Corte a Mano
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-cream mb-1 group-hover:text-avocado-300 transition-colors">
                  Corte Selectivo
                </h3>
                <p className="text-cream/70 text-xs leading-relaxed mb-4 flex-1">
                  Corte a tijera con pedúnculo exacto tras verificar materia seca por lote analizado.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-cream font-mono">&gt;21.5%</span>
                    <span className="block text-[9.5px] text-cream/50 uppercase">M.S. Mínima</span>
                  </div>
                  <Link to="/proceso-calidad" className="matucana-circle-btn !w-8 !h-8">
                    <ArrowRight className="w-3.5 h-3.5 text-forest-950" />
                  </Link>
                </div>
              </div>

              {/* Paso 3: Empaque */}
              <div className="matucana-card p-4 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-3.5">
                  <img
                    src="/images/proceso/empaque.jpg"
                    alt="Línea de packing y selección electrónica"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 matucana-pill matucana-pill-emerald shadow-md">
                    03 / EMPAQUE
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-avocado-300 bg-forest-950/90 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                    Packing Óptico
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-cream mb-1 group-hover:text-avocado-300 transition-colors">
                  Calibrado Digital
                </h3>
                <p className="text-cream/70 text-xs leading-relaxed mb-4 flex-1">
                  Clasificación electrónica por peso y descarte óptico en cajas de 4kg y 10kg de exportación.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-cream font-mono">Cal. 12-28</span>
                    <span className="block text-[9.5px] text-cream/50 uppercase">Selección</span>
                  </div>
                  <Link to="/proceso-calidad" className="matucana-circle-btn !w-8 !h-8">
                    <ArrowRight className="w-3.5 h-3.5 text-forest-950" />
                  </Link>
                </div>
              </div>

              {/* Paso 4: Logística */}
              <div className="matucana-card p-4 flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-3.5">
                  <img
                    src="/images/proceso/cadena-frio.jpg"
                    alt="Contenedor reefer y cadena de frío de exportación"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 matucana-pill matucana-pill-emerald shadow-md">
                    04 / LOGÍSTICA
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-avocado-300 bg-forest-950/90 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                    Reefer 5°C
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-cream mb-1 group-hover:text-avocado-300 transition-colors">
                  Cadena de Frío a 5°C
                </h3>
                <p className="text-cream/70 text-xs leading-relaxed mb-4 flex-1">
                  Pre-frío inmediato y contenedores de atmósfera controlada monitoreados hasta destino.
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-cream font-mono">28 Días</span>
                    <span className="block text-[9.5px] text-cream/50 uppercase">Autonomía</span>
                  </div>
                  <Link to="/proceso-calidad" className="matucana-circle-btn !w-8 !h-8">
                    <ArrowRight className="w-3.5 h-3.5 text-forest-950" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-white/10 flex justify-center">
              <Link
                to="/proceso-calidad"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-sm transition-all border border-white/20 backdrop-blur-md shadow-lg group"
              >
                <span>Conocer el proceso de calidad y certificaciones</span>
                <ArrowRight className="w-4 h-4 text-avocado-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. RESUMEN: MERCADOS Y LOGÍSTICA (GLOBAL MARITIME EMERALD)                */}
        {/* ========================================================================= */}
        <section id="mercados" data-bg-color="#0A2419" className="py-20 md:py-28 relative z-10 transition-colors duration-700">
          <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Columna Izquierda: Información de Rutas */}
              <div className="lg:col-span-6 space-y-7">
                <div className="section-badge mb-3">
                  <span className="section-badge-dot" />
                  <span>Presencia Global & Logística</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight">
                  Conectando los Valles del Perú con el mundo.
                </h2>

                <p className="text-cream/80 text-base md:text-lg leading-relaxed font-light">
                  Despachamos desde nuestra planta en Calca, Cusco hacia los terminales portuarios de <strong className="text-cream font-semibold">Callao, Chancay y Pisco</strong>, conectando las principales rutas comerciales marítimas con trazabilidad satelital en tiempo real.
                </p>

                {/* 3 Rutas en cards translúcidas */}
                <div className="space-y-3.5 pt-2">
                  <div className="liquid-glass-card rounded-2xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center shrink-0">
                        <Globe2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-cream group-hover:text-avocado-300 transition-colors block">
                          Europa: Países Bajos, España y Reino Unido
                        </span>
                        <span className="text-xs text-cream/60">Rotterdam, Algeciras y Tilbury • 18-22 días de tránsito</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Activo
                    </span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-cream group-hover:text-avocado-300 transition-colors block">
                          Norteamérica: Costa Este y Costa Oeste
                        </span>
                        <span className="text-xs text-cream/60">Protocolo USDA-APHIS • 14-16 días • Atmósfera controlada</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Activo
                    </span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center shrink-0">
                        <Anchor className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-cream group-hover:text-avocado-300 transition-colors block">
                          Asia y Mercados Emergentes
                        </span>
                        <span className="text-xs text-cream/60">Cold Treatment cuarentenario • 24-28 días hacia Shanghái</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Expansión
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/mercados"
                    className="inline-flex items-center gap-3 text-avocado-400 hover:text-avocado-300 font-bold text-sm group transition-colors"
                  >
                    <span>Ver mapa interactivo y red de transporte en vivo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Columna Derecha: Showcase Matucana Card con Packing & Despacho */}
              <div className="lg:col-span-6">
                <div className="matucana-card p-4 sm:p-5 group">
                  <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4">
                    <img
                      src="/images/proceso/cadena-frio.jpg"
                      alt="Línea de packing y despacho de palta de exportación"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      <span className="matucana-pill matucana-pill-emerald shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        Despachos Marítimos
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="matucana-pill shadow-lg">
                        <ThermometerSnowflake className="w-3.5 h-3.5 text-avocado-400" />
                        5°C Constante
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <div className="liquid-glass-panel rounded-xl p-3 flex items-center justify-between text-xs text-cream">
                        <div>
                          <span className="text-[10px] text-avocado-300 uppercase font-bold block">Flota Refrigerada</span>
                          <span className="font-semibold">Monitoreo GPS & Telemetría en Vivo</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-avocado-400 bg-forest-950/80 px-2 py-1 rounded border border-white/10">
                          100% OK
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center pt-2">
                    <div className="liquid-glass-card rounded-xl p-3">
                      <span className="block font-mono font-bold text-base text-cream">Callao / Chancay</span>
                      <span className="text-[10px] text-cream/60 uppercase">Puertos de Salida</span>
                    </div>
                    <div className="liquid-glass-card rounded-xl p-3">
                      <span className="block font-mono font-bold text-base text-cream">28 Días</span>
                      <span className="text-[10px] text-cream/60 uppercase">Vida de Anaquel</span>
                    </div>
                    <div className="liquid-glass-card rounded-xl p-3">
                      <span className="block font-mono font-bold text-base text-cream">SENASA</span>
                      <span className="text-[10px] text-cream/60 uppercase">Inspección Fitosanitaria</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CALENDARIO DE TEMPORADA INTERACTIVO B2B (DISEÑO WOW & FICHA EN VIVO)   */}
        {/* ========================================================================= */}
        <section id="temporada" data-bg-color="#0D2A1E" className="py-20 md:py-28 border-y border-white/10 relative z-10 transition-colors duration-700">
          <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            {/* Cabecera con Badge de Alto Contraste */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
              <div>
                <div className="section-badge mb-3">
                  <span className="section-badge-dot" />
                  <span>Disponibilidad Anual & Cosecha</span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight">
                  Calendario Anual de Cosecha y Despacho
                </h3>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-950/90 border border-white/20 text-cream font-semibold backdrop-blur-md shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span><strong>7 Meses</strong> Cosecha Activa (Mar - Set)</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-avocado-400/25 border border-avocado-400/60 text-white font-extrabold backdrop-blur-md shadow-md shadow-black/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-avocado-400 animate-pulse shadow-[0_0_10px_rgba(164,227,71,1)]" />
                  <span><strong>Pico Exportación:</strong> Abril a Julio</span>
                </div>
              </div>
            </div>

            {/* Píldoras de Filtro Rápido de Fase */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 text-xs">
              <span className="text-cream/80 font-bold mr-1 uppercase tracking-wider text-[11px]">Filtrar Etapa:</span>
              <button
                type="button"
                onClick={() => setSelectedMonth(4)} // Mayo
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  selectedMonth >= 3 && selectedMonth <= 6
                    ? 'bg-avocado-400 text-forest-950 shadow-lg shadow-avocado-400/30 ring-2 ring-avocado-400/80 font-black'
                    : 'bg-forest-950/90 text-cream/90 border border-white/20 hover:border-avocado-400/50 hover:text-white'
                }`}
              >
                🔥 Pico de Exportación (Abr - Jul)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMonth(2)} // Marzo
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  (selectedMonth === 2 || selectedMonth === 7 || selectedMonth === 8)
                    ? 'bg-emerald-500 text-forest-950 shadow-lg shadow-emerald-500/30 font-black'
                    : 'bg-forest-950/90 text-cream/90 border border-white/20 hover:border-emerald-400/50 hover:text-white'
                }`}
              >
                🥑 Campaña Activa (Mar - Set)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMonth(0)} // Enero
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  selectedMonth < 2 || selectedMonth > 8
                    ? 'bg-white/30 text-white font-black shadow-sm ring-1 ring-white/50'
                    : 'bg-forest-950/90 text-cream/90 border border-white/20 hover:border-white/40 hover:text-white'
                }`}
              >
                🌿 Floración & Manejo (Oct - Feb)
              </button>
            </div>

            {/* Grid Interactivo de los 12 Meses con Barra de Volumen e Indicadores */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2.5 sm:gap-3 mb-6">
              {seasonalityData.map((item, idx) => {
                const isSelected = selectedMonth === idx
                return (
                  <button
                    type="button"
                    key={item.month}
                    onClick={() => setSelectedMonth(idx)}
                    onMouseEnter={() => setSelectedMonth(idx)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl cursor-pointer text-left transition-all duration-300 flex flex-col justify-between h-38 sm:h-42 group ${
                      isSelected
                        ? 'matucana-card !border-avocado-400 shadow-[0_0_28px_rgba(164,227,71,0.55)] -translate-y-2 scale-102 z-20 ring-2 ring-avocado-400/80'
                        : item.status === 'peak'
                        ? 'liquid-glass-card border-avocado-400/40 hover:border-avocado-400/80 hover:-translate-y-1'
                        : item.status === 'harvest'
                        ? 'liquid-glass-card border-emerald-400/30 hover:border-emerald-400/60 hover:-translate-y-1'
                        : 'bg-forest-950/70 border border-white/10 opacity-80 hover:opacity-100 hover:border-white/30 hover:-translate-y-1'
                    }`}
                  >
                    {/* Flecha indicadora hacia la ficha técnica activa */}
                    {isSelected && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-forest-900 border-r border-b border-avocado-400 rotate-45 z-30 shadow-md" />
                    )}

                    {/* Cabecera del Mes */}
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-base font-black tracking-wider transition-colors ${
                        isSelected 
                          ? 'text-avocado-300 scale-110' 
                          : item.status === 'peak' 
                          ? 'text-white font-extrabold' 
                          : 'text-cream'
                      }`}>
                        {item.month}
                      </span>

                      {/* Pill de estado de alto contraste */}
                      <span className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.status === 'peak'
                          ? 'bg-avocado-400 text-forest-950 shadow-md shadow-avocado-400/40'
                          : item.status === 'harvest'
                          ? 'bg-emerald-500/40 text-emerald-100 border border-emerald-400/50'
                          : 'bg-white/15 text-cream font-bold'
                      }`}>
                        {item.status === 'peak' ? 'Pico' : item.status === 'harvest' ? 'Cosecha' : 'Campo'}
                      </span>
                    </div>

                    {/* Barra visual de volumen relativo */}
                    <div className="my-2">
                      <div className="flex items-center justify-between text-[9.5px] font-mono text-cream/90 mb-1">
                        <span className="font-medium">Volumen</span>
                        <span className="font-extrabold text-white">{item.volumePercentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-forest-950/90 overflow-hidden border border-white/15">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'peak'
                              ? 'bg-gradient-to-r from-emerald-400 to-avocado-400 shadow-[0_0_10px_rgba(164,227,71,0.9)]'
                              : item.status === 'harvest'
                              ? 'bg-emerald-400'
                              : 'bg-white/30'
                          }`}
                          style={{ width: `${item.volumePercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Materia Seca en píldora legible de alto contraste */}
                    <div className="pt-2 border-t border-white/15 text-[10px] truncate">
                      <span className="text-cream/70 block text-[8.5px] uppercase font-bold tracking-wider">Materia Seca</span>
                      <span className={`font-bold font-mono ${
                        item.status === 'peak' ? 'text-avocado-300 font-extrabold' : 'text-cream'
                      }`}>
                        {item.dryMatter.includes('%') ? item.dryMatter.split('-')[0].trim() : 'En cuaja'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* FICHA TÉCNICA OPERATIVA EN VIVO DEL MES SELECCIONADO */}
            <div className="liquid-glass-panel rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border border-white/20 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Cabecera del Inspector de Mes */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-avocado-400 text-forest-950 font-black flex flex-col items-center justify-center font-mono shadow-xl shadow-avocado-400/40 shrink-0">
                      <span className="text-[10px] uppercase tracking-wider leading-none">MES</span>
                      <span className="text-2xl font-black leading-none mt-1">{seasonalityData[selectedMonth].month}</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <h4 className="font-serif font-black text-2xl sm:text-3xl text-cream">
                          {seasonalityData[selectedMonth].fullName}
                        </h4>
                        <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full ${
                          seasonalityData[selectedMonth].status === 'peak'
                            ? 'bg-avocado-400 text-forest-950 shadow-md shadow-avocado-400/40'
                            : seasonalityData[selectedMonth].status === 'harvest'
                            ? 'bg-emerald-500/40 text-emerald-100 border border-emerald-400/50'
                            : 'bg-white/20 text-white'
                        }`}>
                          {seasonalityData[selectedMonth].statusLabel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-cream/80 font-light">
                        Etapa Agronómica: <strong className="text-avocado-300 font-bold">{seasonalityData[selectedMonth].phase}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Indicador de Capacidad Operativa */}
                  <div className="bg-forest-950/90 border border-white/20 rounded-2xl px-5 py-3.5 flex items-center gap-4 shrink-0 shadow-lg">
                    <div>
                      <span className="text-[10px] text-cream/70 uppercase font-bold tracking-wider block">Capacidad Operativa</span>
                      <span className="text-base sm:text-lg font-bold text-white font-mono">
                        {seasonalityData[selectedMonth].volumePercentage}% del Pico Anual
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-forest-900 border border-white/10 flex items-center justify-center text-avocado-400">
                      <BarChart3 className="w-6 h-6 text-avocado-400" />
                    </div>
                  </div>
                </div>

                {/* Descripción Técnica del Mes */}
                <p className="text-cream/90 text-sm sm:text-base font-light leading-relaxed my-6 max-w-4xl">
                  {seasonalityData[selectedMonth].description}
                </p>

                {/* 4 Métricas de Ficha Técnica */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="liquid-glass-card rounded-2xl p-4.5 group">
                    <div className="flex items-center gap-2 text-avocado-400 mb-2">
                      <Droplets className="w-4 h-4" />
                      <span className="text-[10.5px] uppercase font-bold tracking-wider text-cream/80">Materia Seca</span>
                    </div>
                    <span className="block font-mono font-bold text-lg sm:text-xl text-white">
                      {seasonalityData[selectedMonth].dryMatter}
                    </span>
                    <span className="text-[11px] text-cream/70 mt-1 block">Textura cremosa & aceites</span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4.5 group">
                    <div className="flex items-center gap-2 text-avocado-400 mb-2">
                      <Truck className="w-4 h-4" />
                      <span className="text-[10.5px] uppercase font-bold tracking-wider text-cream/80">Despacho Semanal</span>
                    </div>
                    <span className="block font-mono font-bold text-lg sm:text-xl text-white">
                      {seasonalityData[selectedMonth].containersPerWeek}
                    </span>
                    <span className="text-[11px] text-cream/70 mt-1 block">Cadena de frío continua a 5°C</span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4.5 group">
                    <div className="flex items-center gap-2 text-avocado-400 mb-2">
                      <Award className="w-4 h-4" />
                      <span className="text-[10.5px] uppercase font-bold tracking-wider text-cream/80">Calibres Disponibles</span>
                    </div>
                    <span className="block font-mono font-bold text-lg sm:text-xl text-white">
                      {seasonalityData[selectedMonth].calibers}
                    </span>
                    <span className="text-[11px] text-cream/70 mt-1 block">Cajas estándar 4kg y 10kg</span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4.5 group">
                    <div className="flex items-center gap-2 text-avocado-400 mb-2">
                      <Globe2 className="w-4 h-4" />
                      <span className="text-[10.5px] uppercase font-bold tracking-wider text-cream/80">Mercados de Destino</span>
                    </div>
                    <span className="block font-serif font-bold text-base sm:text-lg text-white truncate">
                      {seasonalityData[selectedMonth].primaryMarkets}
                    </span>
                    <span className="text-[11px] text-cream/70 mt-1 block">Puertos Callao & Chancay</span>
                  </div>
                </div>

                {/* Barra de Reserva y Cotización Directa */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-cream/90">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>Programa de exportación FOB Callao / Chancay y CIF auditado bajo protocolo SENASA.</span>
                  </div>

                  <Link
                    to={`/cotizar?mes=${seasonalityData[selectedMonth].fullName.toLowerCase()}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-avocado-400 hover:bg-avocado-300 text-forest-950 font-bold text-sm transition-all shadow-lg hover:shadow-avocado-400/40 hover:scale-105 active:scale-95 duration-200"
                  >
                    <span>Reservar Cupos para {seasonalityData[selectedMonth].fullName}</span>
                    <ArrowRight className="w-4 h-4 text-forest-950" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CTA CONVERSIÓN B2B (MASTER LIQUID GLASS PANEL)                         */}
        {/* ========================================================================= */}
        <section id="cotizar-cta" data-bg-color="#081E15" className="py-20 md:py-28 relative z-10 transition-colors duration-700">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="liquid-glass-panel text-cream rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-2xl border border-white/20 backdrop-blur-2xl">
              {/* Glows ambientales multicapa */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-avocado-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -top-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="section-badge mb-6">
                  <span className="section-badge-dot" />
                  <span>Campaña Palta Hass 2026</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight mb-6">
                  Planifique su programa de suministro con nosotros.
                </h2>

                <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed mb-8">
                  Asegure cupos de exportación en calibres seleccionados (12 al 28) y reciba nuestra cotización FOB / CIF adaptada a las especificaciones de su mercado.
                </p>

                {/* 3 Badges de garantía comercial */}
                <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs text-cream/90 font-medium">
                  <span className="px-3.5 py-1.5 rounded-full bg-forest-950/70 border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                    FOB Callao & Chancay
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-forest-950/70 border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-avocado-400" />
                    Inspección Pre-Embarque SENASA
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-forest-950/70 border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-avocado-400" />
                    Cajas 4kg y 10kg
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/cotizar"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-avocado-400 hover:bg-avocado-300 text-forest-950 font-bold text-base transition-all shadow-lg hover:shadow-avocado-400/40 hover:scale-105 active:scale-95 duration-200"
                  >
                    <span>Configurar Cotización Online</span>
                    <ArrowRight className="w-5 h-5 text-forest-950" />
                  </Link>

                  <Link
                    to="/contacto"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-base transition-all border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 duration-200"
                  >
                    <span>Contactar Equipo Comercial</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  )
}