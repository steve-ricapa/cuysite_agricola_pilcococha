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
  const [isPaused, setIsPaused] = useState(false)

  // Duración por etapa: 5.5 segundos para lectura cómoda y transición armónica
  const STAGE_DURATION_MS = 5500

  // Temporizador auto-play sin re-renders continuos a 60fps
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STAGES.length)
    }, STAGE_DURATION_MS)

    return () => clearInterval(timer)
  }, [isPaused, activeStepIndex])

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index)
  }

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev + 1) % STAGES.length)
  }

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev - 1 + STAGES.length) % STAGES.length)
  }

  const currentStage = STAGES[activeStepIndex]

  // FÓRMULA MAESTRA DE COORDENADAS:
  // Node 0: 8%, Node 1: 29%, Node 2: 50%, Node 3: 71%, Node 4: 92%
  // El riel, los 5 nodos, la línea láser y la palta comparten EXACTAMENTE este mismo cálculo.
  const getNodePercent = (index: number) => 8 + (index / (STAGES.length - 1)) * 84
  const currentPositionPercent = getNodePercent(activeStepIndex)

  return (
    <div className="w-full select-none">
      {/* ============================================================== */}
      {/* 1. CINTA TRANSPORTADORA CONTINUA DE PROCESO                     */}
      {/* ============================================================== */}
      <div className="liquid-glass-panel rounded-3xl p-5 sm:p-7 mb-8 relative overflow-hidden shadow-2xl">
        {/* Cabecera del control con barra de progreso de tiempo y estado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shadow-xs">
              <Activity className="w-4 h-4 animate-pulse text-avocado-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-avocado-300 font-bold block">
                  Cinta Transportadora Continua de Proceso
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
              </div>
              <p className="text-[11px] text-cream/70 font-light hidden sm:block">
                Flujo ininterrumpido en tiempo real: desde el huerto interandino hasta el contenedor en alta mar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 self-end sm:self-auto">
            {/* Barra de progreso de ciclo de tiempo continuo */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cream/80 bg-forest-950/90 px-3 py-1 rounded-full border border-white/10 shadow-xs">
                Etapa <strong className="text-avocado-300 font-black">{activeStepIndex + 1}</strong> de {STAGES.length}
              </span>

              {/* Barra de cuenta regresiva gráfica */}
              <div className="w-20 sm:w-28 h-1.5 bg-forest-950 rounded-full border border-white/15 overflow-hidden">
                <motion.div
                  key={`${activeStepIndex}-${isPaused}`}
                  className="h-full bg-gradient-to-r from-emerald-500 to-avocado-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '0%' : '100%' }}
                  transition={{
                    duration: isPaused ? 0 : STAGE_DURATION_MS / 1000,
                    ease: 'linear'
                  }}
                />
              </div>
            </div>

            {/* Botón explícito de Pausa / Reproducción */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/90 hover:bg-forest-900 border border-white/20 text-xs text-cream/90 hover:text-white transition-all shadow-xs cursor-pointer hover:border-avocado-400/50"
              title={isPaused ? 'Reanudar flujo continuo' : 'Pausar flujo continuo'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-avocado-400 fill-avocado-400" />
                  <span className="font-medium text-xs">Reanudar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-avocado-400 fill-avocado-400" />
                  <span className="font-medium text-xs">Pausar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PISTA MECÁNICA Y ESTACIONES DE PROCESO (COORDINADAS AL 100%)    */}
        {/* ============================================================== */}
        <div className="relative pt-16 pb-12 my-2 max-w-5xl mx-auto px-2 sm:px-4">
          
          {/* Riel mecánico inferior con estrías en movimiento continuo */}
          <div 
            className="absolute top-1/2 left-[8%] right-[8%] h-3.5 -translate-y-1/2 rounded-full border border-white/20 z-0 shadow-inner overflow-hidden"
            style={{
              backgroundColor: '#0a1d14',
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(164,227,71,0.12) 0px, rgba(164,227,71,0.12) 8px, transparent 8px, transparent 16px)',
              backgroundSize: '32px 32px',
            }}
          >
            {/* Animación continua de la cinta de rodillos */}
            <div 
              className="w-full h-full animate-conveyor-scroll"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 8px, transparent 8px, transparent 16px)',
                backgroundSize: '32px 32px',
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            />
          </div>

          {/* Haz láser de progreso continuo iluminado que une las estaciones visitadas */}
          <div 
            className="absolute top-1/2 left-[8%] h-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-600 via-avocado-400 to-emerald-300 shadow-[0_0_16px_rgba(164,227,71,0.9)] z-10 transition-all duration-700 ease-out"
            style={{ 
              width: `${(activeStepIndex / (STAGES.length - 1)) * 84}%` 
            }}
          />

          {/* ============================================================ */}
          {/* VIAJERO ACTIVO: PALTA 🥑 DESPLAZÁNDOSE SOBRE EL RIEL        */}
          {/* ============================================================ */}
          <div 
            className="absolute top-1/2 -translate-y-[calc(50%+26px)] -translate-x-1/2 pointer-events-none z-30 transition-all duration-700 ease-out flex flex-col items-center"
            style={{ left: `${currentPositionPercent}%` }}
          >
            {/* Partícula flotante con chispa de monitoreo */}
            <div className="flex items-center gap-1 mb-1">
              {activeStepIndex >= 3 ? (
                <span className="text-xs drop-shadow animate-pulse">❄️</span>
              ) : (
                <span className="text-xs drop-shadow animate-pulse">✨</span>
              )}
            </div>

            {/* Cápsula de la palta con aura de energía */}
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-forest-950 border-2 border-avocado-400 shadow-[0_0_20px_rgba(164,227,71,0.95)] flex items-center justify-center">
                <span className="text-lg select-none">🥑</span>
              </div>
              <div className="absolute -inset-1 rounded-full bg-avocado-400/40 blur-xs -z-10 animate-ping opacity-75" />
            </div>

            {/* Puntero láser que conecta verticalmente la palta con la estación */}
            <div className="w-1 h-3 bg-gradient-to-b from-avocado-400 to-transparent mt-0.5 rounded-full" />
          </div>

          {/* ============================================================ */}
          {/* 5 ESTACIONES DE PROCESO (Nodos Anclados a Coordenadas Fijas)  */}
          {/* ============================================================ */}
          {STAGES.map((s, index) => {
            const isActive = index === activeStepIndex
            const isCompleted = index < activeStepIndex
            const Icon = s.icon
            const nodeLeft = getNodePercent(index)

            return (
              <button
                key={s.step}
                onClick={() => handleSelectStep(index)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group focus:outline-none"
                style={{ left: `${nodeLeft}%` }}
              >
                {/* Caja de Icono de la Estación */}
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl relative ${
                    isActive
                      ? 'bg-avocado-500 text-forest-950 ring-4 ring-avocado-400/80 scale-110 shadow-[0_0_22px_rgba(164,227,71,0.7)] font-black'
                      : isCompleted
                      ? 'bg-emerald-950 text-avocado-300 border-2 border-emerald-500/80 shadow-md hover:border-avocado-400'
                      : 'bg-forest-950/95 text-cream/50 border border-white/15 hover:border-white/40 hover:text-cream'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />

                  {/* Badge de número de paso (01, 02, etc.) */}
                  <span className={`absolute -top-2 -right-1.5 text-[9px] font-mono font-black px-1.5 py-0.5 rounded-full shadow-xs leading-none transition-colors ${
                    isActive 
                      ? 'bg-forest-950 text-avocado-300 border border-avocado-400 shadow-[0_0_8px_rgba(164,227,71,0.5)]' 
                      : isCompleted
                      ? 'bg-emerald-900 text-emerald-200 border border-emerald-500/60'
                      : 'bg-forest-900 text-cream/70 border border-white/10'
                  }`}>
                    {s.step}
                  </span>
                </div>

                {/* Título de la etapa con salto de línea natural (Sin cortes '...') */}
                <span className={`text-[10px] sm:text-xs font-bold mt-2.5 leading-tight text-center max-w-[70px] sm:max-w-[105px] transition-colors break-words line-clamp-2 ${
                  isActive 
                    ? 'text-avocado-300 font-extrabold drop-shadow-[0_0_8px_rgba(164,227,71,0.4)]' 
                    : isCompleted
                    ? 'text-emerald-300/80 font-medium'
                    : 'text-cream/60 group-hover:text-cream'
                }`}>
                  {s.shortTitle}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TEATRO MAESTRO DE LA ETAPA SELECCIONADA                     */}
      {/* ============================================================== */}
      <div className="matucana-card rounded-3xl p-5 sm:p-7 lg:p-9 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-avocado-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9 items-center">
          
          {/* Marco de Imagen de la Etapa con Transición Ken-Burns & Crossfade */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden h-60 sm:h-72 lg:h-80 shadow-2xl border border-white/20 group bg-forest-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.step}
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentStage.image}
                    alt={currentStage.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradiente de contraste inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Línea animada de escáner fotométrico */}
              <div 
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-avocado-400 to-transparent opacity-85 shadow-[0_0_12px_rgba(164,227,71,1)] animate-bounce pointer-events-none z-10" 
                style={{ animationDuration: '3.5s' }} 
              />

              {/* Badges superiores sobre la imagen */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                <span className="matucana-pill matucana-pill-emerald text-[10px] shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Fase {currentStage.step} / 05</span>
                </span>
                <span className="matucana-pill text-[10px] shadow-md">
                  <span>{currentStage.badge}</span>
                </span>
              </div>

              {/* Subtítulo / KPI flotante en la base de la imagen */}
              <div className="absolute bottom-3 inset-x-3 z-20">
                <div className="liquid-glass-panel rounded-xl px-3.5 py-2.5 backdrop-blur-xl flex items-center justify-between border border-white/25 shadow-lg">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-avocado-400 block tracking-wider">
                      {currentStage.kpis[0].label}
                    </span>
                    <p className="font-serif font-bold text-sm sm:text-base text-cream">
                      {currentStage.subtitle}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-black text-avocado-300 bg-forest-950/60 px-2 py-0.5 rounded-lg border border-avocado-400/30">
                    {currentStage.kpis[0].val}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Inspector Técnico y KPIs de la Etapa */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
            
            {/* Header con Badge de Paso y Controles Prev/Next */}
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

            {/* Contenido animado con Cross-Slide suave */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.step}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
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
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  )
}