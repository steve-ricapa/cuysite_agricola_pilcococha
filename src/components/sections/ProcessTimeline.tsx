import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Sprout, 
  Scissors, 
  ScanEye, 
  PackageCheck, 
  Snowflake, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Layers,
  Thermometer,
  ShieldAlert
} from 'lucide-react'

export interface ProcessStage {
  step: string
  title: string
  subtitle: string
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
    title: 'Cultivo y Floración',
    subtitle: 'Valle Sagrado de los Incas',
    icon: Sprout,
    image: '/images/hero/hero-real.jpg',
    badge: 'Manejo Tecnificado',
    description: 'Nuestros árboles de Palta Hass crecen en los valles interandinos de Cusco, regados con agua pura de deshielos y nutridos mediante fertirriego computarizado. Monitoreo constante del suelo y prevención biológica de plagas.',
    kpis: [
      { label: 'Altitud', val: '2,900 m' },
      { label: 'Riego', val: 'Goteo automatizado' },
      { label: 'Nutrición', val: 'Balance N-P-K-B' }
    ],
    puntosClave: [
      'Poda técnica estacional para máxima radiación solar',
      'Uso eficiente del agua de deshielo de la cordillera',
      'Manejo integrado sin pesticidas residuales prohibidos'
    ]
  },
  {
    step: '02',
    title: 'Cosecha a Mano Selectiva',
    subtitle: 'En Punto Óptimo de Maduración',
    icon: Scissors,
    image: '/images/fundo/team-field.jpg',
    badge: 'Materia Seca Comprobada',
    description: 'Cada palta es cosechada manualmente usando tijeras especiales que dejan el pedúnculo exacto (4-6 mm) para prevenir deshidratación y entrada de hongos. Solo se cosecha fruta que supera el 21.5% de materia seca medido por laboratorio.',
    kpis: [
      { label: 'Materia Seca', val: '21.5% - 24%' },
      { label: 'Corte', val: 'Tijera con pedúnculo' },
      { label: 'Selección', val: '100% manual en árbol' }
    ],
    puntosClave: [
      'Cuadrillas entrenadas con guantes y cestas acolchadas',
      'Muestreo destructivo previo por lote para certificar aceites',
      'Traslado inmediato a sombras para evitar estrés térmico'
    ]
  },
  {
    step: '03',
    title: 'Lavado, Selección y Calibrado',
    subtitle: 'Visión Óptica 360° y Peso Electrónico',
    icon: ScanEye,
    image: '/images/producto/palta-hass-hero.jpg',
    badge: 'Clasificación Milimétrica',
    description: 'En la planta de empaque, las paltas pasan por una línea de desinfección con agua ozonizada, secado con aire tibio y calibración computarizada que pesa cada fruto y descarta microdefectos de piel mediante cámaras de alta velocidad.',
    kpis: [
      { label: 'Tolerancia defecto', val: '< 1%' },
      { label: 'Calibres', val: '12 al 28' },
      { label: 'Inocuidad', val: 'Ozono & UV' }
    ],
    puntosClave: [
      'Clasificación por balanzas dinámicas de alta precisión',
      'Separación por categorías: Exportación Cat. 1 vs Mercado local',
      'Trazabilidad asignada por código de lote y productor'
    ]
  },
  {
    step: '04',
    title: 'Empaque y Pre-Frío',
    subtitle: 'Cajas de Exportación de 4kg y 10kg',
    icon: PackageCheck,
    image: '/images/proceso/empaque.jpg',
    badge: 'Atmósfera Protegida',
    description: 'Empacado cuidadoso en cajas de cartón corrugado de alta resistencia estructural, diseñadas con respiraderos para flujo uniforme de frío. Los pallets son zunchados con esquineros y pasan de inmediato a túneles de enfriamiento rápido.',
    kpis: [
      { label: 'Formatos', val: 'Caja 4kg / 10kg' },
      { label: 'Palletizado', val: '264 cajas / pallet' },
      { label: 'Pre-frío', val: 'Túnel forzado a 5°C' }
    ],
    puntosClave: [
      'Etiquetado con código QR trazable hasta el árbol de origen',
      'Esquineros plásticos y zunchos de alta tensión para tránsito',
      'Temperatura interna de pulpa monitoreada antes de sellar'
    ]
  },
  {
    step: '05',
    title: 'Despacho y Cadena de Frío',
    subtitle: 'Contenedores Marítimos con Atmósfera Controlada',
    icon: Snowflake,
    image: '/images/proceso/cadena-frio.jpg',
    badge: 'Llegada Fresca a Destino',
    description: 'Carga directa en contenedores refrigerados con Atmósfera Controlada (CA) que regulan oxígeno y dióxido de carbono para poner a la fruta en estado de latencia vegetal. Monitoreo satelital de temperatura y GPS hasta el puerto de Rotterdam o Filadelfia.',
    kpis: [
      { label: 'T° Tránsito', val: '4.5°C - 5.5°C' },
      { label: 'Atmósfera', val: 'O₂: 4% | CO₂: 5%' },
      { label: 'Tránsito marítimo', val: 'Hasta 28 días' }
    ],
    puntosClave: [
      'Sensores Data Logger en cabecera y fondo del contenedor',
      'Embarque marítimo directo desde puertos peruanos (Callao / Pisco)',
      'Garantía de maduración uniforme en cámaras de maduración en destino'
    ]
  }
]

export const ProcessTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [segmentProgress, setSegmentProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const currentStage = STAGES[activeStepIndex]

  const SEGMENT_DURATION_MS = 4500 // 4.5 segundos por etapa
  const TICK_MS = 45

  // Animación continua de carga que recorre la línea y cambia de paso al llegar al siguiente nodo
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setSegmentProgress((prev) => {
        const step = (TICK_MS / SEGMENT_DURATION_MS) * 100
        const next = prev + step

        if (next >= 100) {
          // Llegó al siguiente cuadro: avanzar paso
          setActiveStepIndex((current) => (current + 1) % STAGES.length)
          return 0
        }
        return next
      })
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [isPaused, activeStepIndex])

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index)
    setSegmentProgress(0)
  }

  // Cálculo de posición precisa del viajero (10%, 30%, 50%, 70%, 90% son los centros de cada nodo)
  const startPos = 10 + activeStepIndex * 20
  const cartPositionPercent = activeStepIndex === 4
    ? startPos + (segmentProgress / 100) * 10 // En el paso final llega al extremo
    : startPos + (segmentProgress / 100) * 20

  const nextStepIndex = (activeStepIndex + 1) % STAGES.length
  const nextStage = STAGES[nextStepIndex]

  return (
    <div 
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Barra de Estado de la Cinta Transportadora */}
      <div className="flex items-center justify-between max-w-5xl mx-auto px-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span className="text-cream/90 font-mono font-bold">
            {isPaused ? '⏸️ Cinta en Pausa (Pase el ratón para leer)' : `🟢 Transportando fruta hacia Etapa ${nextStage.step}: ${nextStage.title}`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-avocado-400 font-mono text-[11px] hidden sm:inline">
            Progreso: {Math.round(segmentProgress)}%
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded-full bg-forest-900 hover:bg-forest-800 text-cream/70 hover:text-cream text-[11px] font-bold border border-forest-800 transition-colors"
          >
            {isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. LÍNEA DE FLUJO INTERACTIVA CON ANIMACIÓN DE PALTAS Y COPOS   */}
      {/* ============================================================== */}
      <div className="relative py-12 mb-10 overflow-hidden">
        {/* Pista / Cinta transportadora de fondo con textura de riel */}
        <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 bg-forest-950/80 rounded-full border-2 border-forest-800/80 shadow-inner z-0" />

        {/* Línea de progreso acumulado brillante hasta la posición del viajero */}
        <div 
          className="absolute top-1/2 left-0 h-3 -translate-y-1/2 bg-gradient-to-r from-emerald-600 via-avocado-400 to-emerald-300 rounded-full transition-all duration-75 shadow-lg shadow-avocado-400/50 z-0"
          style={{ width: `${Math.min(100, cartPositionPercent)}%` }}
        />

        {/* ========================================================== */}
        {/* CARRO VIAJERO ACTIVO: PALTAS Y COPOS RECORRIENDO LA LÍNEA   */}
        {/* ========================================================== */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-30 transition-all duration-75 flex flex-col items-center"
          style={{ left: `${cartPositionPercent}%` }}
        >
          {/* Estela flotante de partículas (copos de nieve y chispas) */}
          <div className="flex items-center gap-1 mb-1 animate-pulse">
            {activeStepIndex >= 3 ? (
              <span className="text-sm drop-shadow animate-spin" style={{ animationDuration: '3s' }}>❄️</span>
            ) : (
              <span className="text-xs drop-shadow animate-bounce">✨</span>
            )}
            {activeStepIndex === 4 && (
              <span className="text-xs drop-shadow animate-ping">❄️</span>
            )}
          </div>

          {/* Palta principal que viaja por la línea */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-forest-950/90 border-2 border-avocado-400 shadow-xl flex items-center justify-center animate-bounce shadow-avocado-400/60">
              <span className="text-lg">🥑</span>
            </div>
            {/* Halo de luz que emite la palta */}
            <div className="absolute inset-0 rounded-full bg-avocado-400/30 blur-sm -z-10 animate-pulse" />
          </div>

          {/* Indicador de flecha hacia el riel */}
          <div className="w-1.5 h-1.5 bg-avocado-400 rounded-full shadow-sm mt-0.5" />
        </div>

        {/* Pasos / Nodos numerados */}
        <div className="relative z-20 grid grid-cols-5 gap-2 sm:gap-4 max-w-5xl mx-auto px-2">
          {STAGES.map((s, index) => {
            const isActive = index === activeStepIndex
            const isCompleted = index < activeStepIndex
            const isNextTarget = index === nextStepIndex
            const Icon = s.icon

            return (
              <button
                key={s.step}
                onClick={() => handleSelectStep(index)}
                className="group flex flex-col items-center text-center focus:outline-none transition-transform hover:scale-105"
              >
                {/* Botón Circular con ícono */}
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl relative ${
                    isActive
                      ? 'bg-avocado-400 text-forest-950 ring-4 ring-avocado-400/40 scale-110 shadow-avocado-400/30'
                      : isNextTarget
                      ? 'bg-forest-900 text-avocado-400 border-2 border-avocado-400/60 ring-2 ring-avocado-400/20'
                      : isCompleted
                      ? 'bg-forest-800 text-avocado-400 border border-avocado-400/40'
                      : 'bg-forest-950 text-cream/50 border border-forest-800 hover:border-cream/30'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />

                  {/* Número de paso arriba */}
                  <span className={`absolute -top-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-forest-950 text-avocado-400 border border-avocado-400' : 'bg-forest-900 text-cream/70'
                  }`}>
                    {s.step}
                  </span>

                  {/* Onda expansiva cuando el viajero está por llegar a este nodo */}
                  {isNextTarget && segmentProgress > 75 && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-avocado-400 animate-ping opacity-75 pointer-events-none" />
                  )}
                </div>

                {/* Título de etapa */}
                <span className={`text-[11px] sm:text-xs font-bold mt-3 leading-tight hidden sm:block ${
                  isActive ? 'text-avocado-400 font-extrabold' : 'text-cream/70 group-hover:text-cream'
                }`}>
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TARJETA DETALLADA DE LA ETAPA SELECCIONADA                  */}
      {/* ============================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="bg-forest-900/90 rounded-3xl p-6 sm:p-10 border border-forest-800 shadow-2xl overflow-hidden backdrop-blur-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Foto de la etapa */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-forest-700/60 h-64 sm:h-80 group">
                <img
                  src={currentStage.image}
                  alt={currentStage.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-forest-950/90 text-avocado-400 text-xs font-bold border border-avocado-400/30 backdrop-blur-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-avocado-400 animate-ping" />
                    Etapa {currentStage.step} de 05
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase font-bold text-avocado-400 block tracking-wider">
                    {currentStage.badge}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-cream leading-tight">
                    {currentStage.subtitle}
                  </h4>
                </div>
              </div>
            </div>

            {/* Contenido Técnico y KPIs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-avocado-400 font-bold block mb-1">
                  Paso {currentStage.step} • {currentStage.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-cream">
                  {currentStage.title}
                </h3>
                <p className="text-cream/80 text-sm sm:text-base mt-3 leading-relaxed">
                  {currentStage.description}
                </p>
              </div>

              {/* KPIs de la etapa */}
              <div className="grid grid-cols-3 gap-3">
                {currentStage.kpis.map((kpi, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-forest-950/80 border border-forest-800 text-center">
                    <span className="text-[10px] uppercase font-bold text-cream/60 block">
                      {kpi.label}
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-avocado-400 mt-1 block">
                      {kpi.val}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Puntos de control fitosanitario */}
              <div className="space-y-2 pt-2 border-t border-forest-800">
                <p className="text-xs uppercase font-bold tracking-wider text-cream/70 mb-2">
                  Protocolo y Puntos de Control:
                </p>
                {currentStage.puntosClave.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-cream/90">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Navegación manual entre pasos */}
              <div className="pt-2 flex items-center justify-between text-xs text-cream/60">
                <span>Paso {activeStepIndex + 1} de {STAGES.length}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1))}
                    className="px-3 py-1.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream font-semibold transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev + 1) % STAGES.length)}
                    className="px-4 py-1.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}