import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Sprout, 
  Scissors, 
  ScanEye, 
  PackageCheck, 
  Snowflake, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  CheckCircle2, 
  Activity,
  Play,
  Pause,
  Layers,
  Thermometer,
  ShieldCheck,
  Sparkles,
  MapPin
} from 'lucide-react'

export interface ProcessStage {
  step: string
  title: string
  subtitle: string
  shortTitle: string
  icon: React.ComponentType<{ className?: string }>
  image: string
  badge: string
  description: string
  kpis: { label: string; val: string }[]
  puntosClave: string[]
}

const STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Cultivo Tecnificado y Floración en Altura',
    shortTitle: 'Cultivo & Floración',
    subtitle: 'Valles Interandinos a 2,850 msnm',
    icon: Sprout,
    image: '/images/hero/hero-real.jpg',
    badge: 'Manejo Tecnificado',
    description: 'Nuestros árboles de Palta Hass crecen en valles de altura regados con agua pura de deshielos andinos y nutridos mediante fertirriego computarizado. Monitoreo constante de humedad radicular y nutrición balanceada.',
    kpis: [
      { label: 'Altitud', val: '2,850 m' },
      { label: 'Riego', val: 'Goteo 95%' },
      { label: 'Nutrición', val: 'Balance N-P-K' }
    ],
    puntosClave: [
      'Poda técnica estacional para máxima radiación solar.',
      'Uso eficiente del agua de deshielos de cuenca cordillerana.',
      'Manejo integrado sin pesticidas residuales prohibidos.'
    ]
  },
  {
    step: '02',
    title: 'Cosecha Manual Selectiva a Tijera',
    shortTitle: 'Cosecha a Tijera',
    subtitle: 'Materia Seca Certificada >21.5%',
    icon: Scissors,
    image: '/images/fundo/team-field.jpg',
    badge: 'Materia Seca Comprobada',
    description: 'Corte manual individual utilizando tijeras esterilizadas para dejar el pedúnculo exacto (4-6 mm), sellando el fruto contra deshidratación y patógenos. La recolección se autoriza tras informe de laboratorio.',
    kpis: [
      { label: 'Materia Seca', val: '>21.5% - 24%' },
      { label: 'Técnica', val: 'Tijera Quirúrgica' },
      { label: 'Selección', val: '100% en Árbol' }
    ],
    puntosClave: [
      'Cuadrillas expertas con cestas acolchadas y guantes limpios.',
      'Muestreo pre-corte en 5 cuadrantes por lote.',
      'Traslado inmediato a sombras en menos de 20 minutos.'
    ]
  },
  {
    step: '03',
    title: 'Lavado, Selección y Calibrado Óptico',
    shortTitle: 'Selección Óptica',
    subtitle: 'Visión Digital 360° y Peso Dinámico',
    icon: ScanEye,
    image: '/images/producto/palta-hass-hero.jpg',
    badge: 'Clasificación Milimétrica',
    description: 'Línea automatizada de desinfección con agua ozonizada, secado con aire tibio y calibración computarizada que pesa cada fruto y descarta microdefectos de piel mediante cámaras fotométricas de alta velocidad.',
    kpis: [
      { label: 'Tolerancia', val: '< 1% Defecto' },
      { label: 'Calibres', val: '12 al 26' },
      { label: 'Inocuidad', val: 'Ozono Orgánico' }
    ],
    puntosClave: [
      'Clasificación por balanzas dinámicas de precisión.',
      'Separación estricta de Calidad 1 para exportación ultramar.',
      'Trazabilidad asignada por código de lote y parcela.'
    ]
  },
  {
    step: '04',
    title: 'Empaque de Exportación y Pre-Frío Rápido',
    shortTitle: 'Empaque & Pre-Frío',
    subtitle: 'Túnel Forzado y Cajas Corrugadas',
    icon: PackageCheck,
    image: '/images/proceso/empaque.jpg',
    badge: 'Descenso Térmico <2h',
    description: 'Empacado cuidadoso en cajas de cartón corrugado de alta resistencia con respiraderos para flujo uniforme de frío. Los pallets son zunchados con esquineros y pasan de inmediato al túnel de frío forzado.',
    kpis: [
      { label: 'Formatos', val: 'Caja 4kg / 10kg' },
      { label: 'Palletizado', val: '264 cajas / pallet' },
      { label: 'Pre-frío', val: 'Túnel a 5°C' }
    ],
    puntosClave: [
      'Etiquetado con código QR trazable hasta el árbol de origen.',
      'Esquineros plásticos y zunchos de alta tensión para tránsito.',
      'Temperatura interna de pulpa monitoreada antes de sellar.'
    ]
  },
  {
    step: '05',
    title: 'Embarque Reefer y Cadena de Frío a 5°C',
    shortTitle: 'Tránsito Reefer 5°C',
    subtitle: 'Atmósfera Controlada & Monitoreo GPS',
    icon: Snowflake,
    image: '/images/proceso/cadena-frio.jpg',
    badge: '28+ Días en Alta Mar',
    description: 'Carga directa en contenedores refrigerados con Atmósfera Controlada (CA) que regulan oxígeno y CO₂ para inducir latencia vegetal. Data loggers satelitales reportan temperatura y posición en tiempo real hasta destino.',
    kpis: [
      { label: 'T° Tránsito', val: '5.0°C Continuo' },
      { label: 'Atmósfera', val: 'O₂: 4% | CO₂: 5%' },
      { label: 'Vida Útil', val: 'Hasta 28 días' }
    ],
    puntosClave: [
      'Sensores Data Logger en cabecera y fondo del contenedor.',
      'Embarque marítimo directo desde puertos peruanos (Callao / Pisco).',
      'Garantía de maduración uniforme (green skin) en cámaras de destino.'
    ]
  }
]

export const ProcessTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [segmentProgress, setSegmentProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Referencias para animación continua a 60fps sin bloqueos de re-render
  const stepRef = useRef(0)
  const progressRef = useRef(0)
  const isPausedRef = useRef(false)

  // Duración por etapa: 4.8 segundos para transición continua y natural
  const STAGE_DURATION_MS = 4800

  // Sincronizar referencias
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  // Loop continuo y fluido con requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now()
    let animId: number

    const tick = (now: number) => {
      const delta = now - lastTime
      lastTime = now

      if (!isPausedRef.current) {
        progressRef.current += (delta / STAGE_DURATION_MS) * 100

        if (progressRef.current >= 100) {
          progressRef.current = 0
          const nextStep = (stepRef.current + 1) % STAGES.length
          stepRef.current = nextStep
          setActiveStepIndex(nextStep)
        }

        setSegmentProgress(progressRef.current)
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  const handleSelectStep = (index: number) => {
    stepRef.current = index
    progressRef.current = 0
    setActiveStepIndex(index)
    setSegmentProgress(0)
  }

  const handleNext = () => {
    const next = (stepRef.current + 1) % STAGES.length
    handleSelectStep(next)
  }

  const handlePrev = () => {
    const prev = (stepRef.current - 1 + STAGES.length) % STAGES.length
    handleSelectStep(prev)
  }

  const currentStage = STAGES[activeStepIndex]

  // Posición continua milimétrica del viajero sobre la cinta transportadora:
  // Node 0: 10%, Node 1: 30%, Node 2: 50%, Node 3: 70%, Node 4: 90%
  const cartPositionPercent = Math.min(
    95,
    Math.max(5, 10 + activeStepIndex * 20 + (segmentProgress / 100) * 20)
  )

  return (
    <div className="w-full select-none">
      {/* ============================================================== */}
      {/* 1. CINTA TRANSPORTADORA CONTINUA CON MOVIMIENTO MECÁNICO       */}
      {/* ============================================================== */}
      <div className="liquid-glass-panel rounded-3xl p-5 sm:p-6 mb-8 relative overflow-hidden">
        {/* Cabecera del control con estado continuo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 animate-pulse text-avocado-400" />
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-avocado-300 font-bold block">
                Cinta Transportadora Continua de Proceso
              </span>
              <p className="text-[11px] text-cream/70 font-light hidden sm:block">
                Flujo ininterrumpido en tiempo real: desde el huerto hasta el contenedor en alta mar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-full border border-white/10">
              Etapa <strong className="text-avocado-300">{activeStepIndex + 1}</strong> de {STAGES.length}
            </span>

            {/* Botón explícito de Pausa / Reproducción */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/90 hover:bg-forest-900 border border-white/20 text-xs text-cream/90 hover:text-white transition-all shadow-xs cursor-pointer"
              title={isPaused ? 'Reanudar flujo continuo' : 'Pausar flujo continuo'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-avocado-400 fill-avocado-400" />
                  <span>Reanudar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-avocado-400 fill-avocado-400" />
                  <span>Pausar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pista de la Cinta con Movimiento Dinámico */}
        <div className="relative py-8 my-1 overflow-visible">
          {/* Riel mecánico inferior con estrías en movimiento continuo */}
          <div 
            className="absolute top-1/2 left-2 right-2 h-3.5 -translate-y-1/2 rounded-full border border-white/20 z-0 shadow-inner overflow-hidden"
            style={{
              backgroundColor: '#0a1d14',
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(164,227,71,0.12) 0px, rgba(164,227,71,0.12) 8px, transparent 8px, transparent 16px)',
              backgroundSize: '32px 32px',
            }}
          >
            {/* Animación continua de la cinta si no está en pausa */}
            <div 
              className={`w-full h-full animate-conveyor-scroll`}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 8px, transparent 8px, transparent 16px)',
                backgroundSize: '32px 32px',
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            />
          </div>

          {/* Haz láser de progreso continuo iluminado */}
          <div 
            className="absolute top-1/2 left-2 h-3 -translate-y-1/2 bg-gradient-to-r from-emerald-600 via-avocado-400 to-emerald-300 rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(164,227,71,0.9)] z-0"
            style={{ width: `${cartPositionPercent}%` }}
          />

          {/* ============================================================ */}
          {/* VIAJERO ACTIVO: PALTA 🥑 DESPLAZÁNDOSE EN TIEMPO REAL       */}
          {/* ============================================================ */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-30 transition-all duration-75 flex flex-col items-center"
            style={{ left: `${cartPositionPercent}%` }}
          >
            {/* Partículas flotantes que acompañan a la palta */}
            <div className="flex items-center gap-1 mb-1">
              {activeStepIndex >= 3 ? (
                <span className="text-xs drop-shadow animate-spin" style={{ animationDuration: '3s' }}>❄️</span>
              ) : (
                <span className="text-xs drop-shadow animate-bounce">✨</span>
              )}
            </div>

            {/* Cuerpo de la palta con aura pulsante continua */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-forest-950 border-2 border-avocado-400 shadow-xl flex items-center justify-center shadow-avocado-400/80">
                <span className="text-base select-none">🥑</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-avocado-400/40 blur-xs -z-10 animate-ping" />
            </div>

            {/* Puntero que roza el riel de la cinta */}
            <div className="w-1.5 h-1.5 bg-avocado-400 rounded-full shadow-xs mt-0.5" />
          </div>

          {/* 5 Nodos de Etapa Interactivos */}
          <div className="relative z-20 grid grid-cols-5 gap-1.5 sm:gap-3 max-w-5xl mx-auto px-1">
            {STAGES.map((s, index) => {
              const isActive = index === activeStepIndex
              const isCompleted = index < activeStepIndex
              const Icon = s.icon

              return (
                <button
                  key={s.step}
                  onClick={() => handleSelectStep(index)}
                  className="group flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105"
                >
                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl relative ${
                      isActive
                        ? 'bg-avocado-500 text-forest-950 ring-3 ring-avocado-400/90 scale-110 shadow-avocado-400/50 font-black'
                        : isCompleted
                        ? 'bg-emerald-600/35 text-avocado-300 border border-avocado-400/50 shadow-md'
                        : 'bg-forest-950/90 text-cream/60 border border-white/15 hover:border-white/40'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />

                    <span className={`absolute -top-2 -right-1 text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-forest-950 text-avocado-300 border border-avocado-400 shadow-xs' : 'bg-forest-900 text-cream/70'
                    }`}>
                      {s.step}
                    </span>
                  </div>

                  <span className={`text-[10px] sm:text-xs font-bold mt-2 leading-tight hidden sm:block truncate max-w-[90px] ${
                    isActive ? 'text-avocado-300 font-extrabold' : 'text-cream/70 group-hover:text-cream'
                  }`}>
                    {s.shortTitle}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TEATRO MAESTRO DE LA ETAPA SELECCIONADA                     */}
      {/* ============================================================== */}
      <div className="matucana-card rounded-3xl p-5 sm:p-7 lg:p-9 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-avocado-500/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9 items-center"
          >
            {/* Foto de la Etapa con Escáner y Telemetría */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 lg:h-76 shadow-xl border border-white/20 group">
                <img
                  src={currentStage.image}
                  alt={currentStage.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-transparent" />

                {/* Línea animada de escáner */}
                <div 
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-avocado-400 to-transparent opacity-85 shadow-[0_0_12px_rgba(164,227,71,1)] animate-bounce pointer-events-none" 
                  style={{ animationDuration: '3.5s' }} 
                />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="matucana-pill matucana-pill-emerald text-[10px] shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Fase {currentStage.step} / 05</span>
                  </span>
                  <span className="matucana-pill text-[10px] shadow-md">
                    <span>{currentStage.badge}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-3 z-10">
                  <div className="liquid-glass-panel rounded-xl px-3.5 py-2.5 backdrop-blur-xl flex items-center justify-between border border-white/25">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-avocado-400 block tracking-wider">
                        {currentStage.kpis[0].label}
                      </span>
                      <p className="font-serif font-bold text-sm sm:text-base text-cream">
                        {currentStage.subtitle}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-black text-avocado-300">
                      {currentStage.kpis[0].val}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector Técnico y KPIs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="section-badge py-1 px-3 text-[10px]">
                  <span className="section-badge-dot w-1.5 h-1.5" />
                  <span>Paso {currentStage.step} · {currentStage.badge}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream hover:text-avocado-300 transition-colors cursor-pointer"
                    aria-label="Paso anterior"
                    title="Etapa anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold transition-all shadow-xs hover:scale-105 cursor-pointer"
                    aria-label="Siguiente paso"
                    title="Siguiente etapa"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif text-cream leading-snug">
                {currentStage.title}
              </h3>

              <p className="text-cream/85 text-xs sm:text-sm leading-relaxed font-light">
                {currentStage.description}
              </p>

              {/* 3 Cápsulas de KPIs */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {currentStage.kpis.map((kpi, i) => (
                  <div key={i} className="liquid-glass-card rounded-xl p-2.5 text-center">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider text-avocado-300/90 block mb-0.5 truncate">
                      {kpi.label}
                    </span>
                    <strong className="text-xs sm:text-sm font-bold font-mono text-cream block truncate">
                      {kpi.val}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Protocolos y Puntos de Control */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cream/60 font-bold block mb-1">
                  Puntos Críticos de Control:
                </span>
                {currentStage.puntosClave.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-cream/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}