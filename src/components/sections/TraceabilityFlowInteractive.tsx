import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Sprout, 
  Clock, 
  FileCheck, 
  ThermometerSnowflake, 
  CheckCircle2, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Sparkles, 
  Scan,
  Activity
} from 'lucide-react'

export interface FlowStepItem {
  id: string
  number: string
  title: string
  shortTitle: string
  badgeLabel: string
  tag: string
  image: string
  location: string
  description: string
  telemetry: {
    label: string
    value: string
  }[]
  checkpoints: string[]
}

const FLOW_STEPS: FlowStepItem[] = [
  {
    id: 'nutricion',
    number: '01',
    title: 'Nutrición Agronómica & Terroir Andino',
    shortTitle: '01. Nutrición & Fundo',
    badgeLabel: 'FASE 01 · CAMPO & RIEGO',
    tag: 'Origen 2,850 msnm',
    image: '/images/hero/slide-valle.jpg',
    location: 'Valle Calca - Pisac, Cusco',
    description: 'Fertirriego por microgoteo a 2,850 msnm con agua pura de deshielos. Telemetría de humedad continua y bioestimulación orgánica para un cuajado homogéneo de palta Hass.',
    telemetry: [
      { label: 'Altitud de Cultivo', value: '2,850 msnm' },
      { label: 'Eficiencia Hídrica', value: '95% Goteo' },
      { label: 'Manejo Fitotécnico', value: 'Bio-Insumos' },
    ],
    checkpoints: [
      'Telemetría de humedad en raíz cada 30 minutos.',
      'Mapeo satelital foliar (NDVI) por terrazas.',
    ],
  },
  {
    id: 'cosecha',
    number: '02',
    title: 'Cosecha Manual Selectiva a Tijera',
    shortTitle: '02. Cosecha a Tijera',
    badgeLabel: 'FASE 02 · RECOLECCIÓN',
    tag: 'Materia Seca >21.5%',
    image: '/images/hero/slide-cosecha.jpg',
    location: 'Huertos Agrícola Pilcococha',
    description: 'Corte individual con tijeras esterilizadas para proteger el pedúnculo íntegro. La cosecha inicia únicamente tras certificar en laboratorio un contenido de materia seca superior al 21.5%.',
    telemetry: [
      { label: 'Materia Seca', value: '>21.5% Cert.' },
      { label: 'Técnica de Corte', value: 'Tijera Sellada' },
      { label: 'Traslado a Sombra', value: '<20 minutos' },
    ],
    checkpoints: [
      'Pedúnculo sellado para evitar deshidratación y patógenos.',
      'Canastillas ventiladas grado exportación.',
    ],
  },
  {
    id: 'packing',
    number: '03',
    title: 'Packing, Selección Óptica & Pre-Frío',
    shortTitle: '03. Packing & Selección',
    badgeLabel: 'FASE 03 · PROCESAMIENTO',
    tag: 'Calibración Óptica',
    image: '/images/proceso/empaque.jpg',
    location: 'Planta de Empaque Certificada',
    description: 'Lavado con agua ozonizada, calibración electrónica por cámaras ópticas (calibres 12 al 26) y túnel de pre-frío rápido para quebrar la temperatura de campo en menos de 2 horas.',
    telemetry: [
      { label: 'Calibres Clasificados', value: '12 al 26 Óptico' },
      { label: 'Túnel de Pre-Frío', value: '<2 Horas' },
      { label: 'Inocuidad Fitosanitaria', value: 'Ozono Orgánico' },
    ],
    checkpoints: [
      'Lectura fotométrica de defectos y firmeza superficial.',
      'Trazabilidad digital QR por caja y pallet.',
    ],
  },
  {
    id: 'frio',
    number: '04',
    title: 'Embarque Reefer & Cadena de Frío a 5°C',
    shortTitle: '04. Tránsito Reefer 5°C',
    badgeLabel: 'FASE 04 · EXPORTACIÓN',
    tag: 'Cadena de Frío 5°C',
    image: '/images/proceso/cadena-frio.jpg',
    location: 'Puerto del Callao / Ultramar',
    description: 'Consolidación en contenedores de atmósfera controlada (O₂ 4% / CO₂ 6%) a 5°C ininterrumpido. Termógrafos satelitales GPS en tiempo real aseguran más de 28 días de vida útil.',
    telemetry: [
      { label: 'Temperatura Reefer', value: '5.0°C Continuo' },
      { label: 'Atmósfera Controlada', value: 'O₂ 4% / CO₂ 6%' },
      { label: 'Vida en Percha', value: '28+ Días' },
    ],
    checkpoints: [
      'Doble termógrafo digital con monitoreo satelital 24/7.',
      'Precinto oficial SENASA para puertos internacionales.',
    ],
  },
]

export const TraceabilityFlowInteractive: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [timerKey, setTimerKey] = useState(0)

  const current = FLOW_STEPS[activeStep]
  const STEP_DURATION_MS = 5500

  // Temporizador robusto de paso a paso: avanza estrictamente 0 -> 1 -> 2 -> 3 -> 0
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % FLOW_STEPS.length)
      setTimerKey((k) => k + 1)
    }, STEP_DURATION_MS)

    return () => clearTimeout(timer)
  }, [isAutoPlaying, activeStep, timerKey])

  const goToStep = (index: number) => {
    setActiveStep(index)
    setTimerKey((k) => k + 1)
  }

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % FLOW_STEPS.length)
    setTimerKey((k) => k + 1)
  }

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + FLOW_STEPS.length) % FLOW_STEPS.length)
    setTimerKey((k) => k + 1)
  }

  return (
    <div className="w-full">
      {/* Contenedor Maestro Unificado y de Altura Optimizada */}
      <div className="matucana-card rounded-3xl p-5 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl">
        {/* Resplandor sutil de fondo */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-avocado-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ================================================================= */}
        {/* CABECERA COMPACTA: PIPELINE CONECTOR Y CONTROLES                 */}
        {/* ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-avocado-300 font-bold">
              Flujo Operativo de Exportación en Vivo
            </span>
          </div>

          {/* Selector de Play/Pausa & Contador */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-[11px] font-mono text-cream/70">
              Paso <strong className="text-avocado-300">{activeStep + 1}</strong> de {FLOW_STEPS.length}
            </span>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/80 hover:bg-forest-900 border border-white/20 text-[11px] text-cream/90 hover:text-white transition-all shadow-xs"
              title={isAutoPlaying ? 'Pausar avance automático' : 'Reanudar avance automático'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-avocado-400" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-avocado-400" />
                  <span>Animar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Nodos del Pipeline Superior (Compactos con Barra de Progreso) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 mb-6">
          {FLOW_STEPS.map((step, idx) => {
            const isActive = activeStep === idx
            const isPassed = activeStep > idx

            return (
              <button
                key={step.id}
                onClick={() => goToStep(idx)}
                className={`text-left p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'liquid-glass-card-active ring-1.5 ring-avocado-400/90 shadow-md'
                    : isPassed
                    ? 'liquid-glass-card border-avocado-500/30 hover:border-white/40'
                    : 'liquid-glass-card hover:border-white/30 opacity-75 hover:opacity-100'
                }`}
              >
                {/* Barra de progreso fluida en la tarjeta activa */}
                {isActive && (
                  <div
                    key={`${timerKey}-${isAutoPlaying}`}
                    className={`absolute bottom-0 left-0 h-1 bg-avocado-400 shadow-[0_0_8px_rgba(164,227,71,0.9)] ${
                      isAutoPlaying ? 'animate-progress-fill' : ''
                    }`}
                    style={{
                      animationDuration: `${STEP_DURATION_MS}ms`,
                      animationTimingFunction: 'linear',
                      animationFillMode: 'forwards',
                      animationPlayState: isAutoPlaying ? 'running' : 'paused',
                      width: isAutoPlaying ? undefined : '100%',
                    }}
                  />
                )}

                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-avocado-400 text-forest-950 font-black'
                      : isPassed
                      ? 'bg-emerald-500/20 text-avocado-300'
                      : 'bg-white/10 text-cream/70'
                  }`}>
                    {step.number}
                  </span>

                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-avocado-400 shadow-[0_0_8px_rgba(164,227,71,1)] animate-ping" />
                  ) : isPassed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  )}
                </div>

                <p className={`text-xs font-bold truncate ${
                  isActive ? 'text-cream' : 'text-cream/80'
                }`}>
                  {step.shortTitle}
                </p>
              </button>
            )
          })}
        </div>

        {/* ================================================================= */}
        {/* CONTENIDO INTERACTIVO (TEATRO COMPACTO DE ALTURA CONTROLADA)     */}
        {/* ================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center"
          >
            {/* Fotografía de la Fase con Escáner y Telemetría */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-60 lg:h-68 shadow-xl border border-white/20 group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradiente de fondo */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-transparent" />

                {/* Línea animada de escaneo fitosanitario */}
                <div 
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-avocado-400 to-transparent opacity-85 shadow-[0_0_12px_rgba(164,227,71,1)] animate-bounce pointer-events-none" 
                  style={{ animationDuration: '3.5s' }} 
                />

                {/* Badges superiores sobre la imagen */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="matucana-pill matucana-pill-emerald shadow-md text-[10px]">
                    <Sparkles className="w-3 h-3" />
                    <span>Fase {current.number} / 04</span>
                  </span>
                  <span className="matucana-pill shadow-md text-[10px] hidden sm:inline-flex">
                    <MapPin className="w-2.5 h-2.5 text-avocado-400" />
                    <span>{current.location}</span>
                  </span>
                </div>

                {/* Chip inferior de parámetro auditado */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  <div className="liquid-glass-panel rounded-xl px-3 py-2 backdrop-blur-xl flex items-center justify-between border border-white/25">
                    <span className="text-[10px] uppercase font-bold text-avocado-400 tracking-wider">
                      {current.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-cream">
                      {current.telemetry[0].value}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector Técnico y Métricas (Ultra Compacto y Nítido) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Eyebrow de la Etapa */}
              <div className="flex items-center justify-between">
                <div className="section-badge py-1 px-3 text-[10px]">
                  <span className="section-badge-dot w-1.5 h-1.5" />
                  <span>{current.badgeLabel}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg bg-forest-950/80 hover:bg-forest-900 border border-white/15 text-cream hover:text-avocado-300 transition-colors"
                    aria-label="Paso anterior"
                    title="Etapa anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold transition-all shadow-xs hover:scale-105"
                    aria-label="Siguiente paso"
                    title="Siguiente etapa"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Título de la Fase */}
              <h3 className="text-xl sm:text-2xl font-black font-serif text-cream leading-snug">
                {current.title}
              </h3>

              {/* Descripción Concisa */}
              <p className="text-cream/85 text-xs sm:text-sm leading-relaxed font-light">
                {current.description}
              </p>

              {/* 3 Cápsulas de Telemetría */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {current.telemetry.map((t, i) => (
                  <div key={i} className="liquid-glass-card rounded-xl p-2.5 text-center">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider text-avocado-300/90 block mb-0.5 truncate">
                      {t.label}
                    </span>
                    <p className="text-xs sm:text-sm font-bold font-mono text-cream truncate">
                      {t.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Checkpoints de Calidad */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                {current.checkpoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-cream/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400 shrink-0" />
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
