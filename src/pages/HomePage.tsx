import React, { useState, useEffect, useRef } from 'react'
import { motion, MotionConfig } from 'motion/react'
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
  ExternalLink
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const rotatingWords = ['CALIDAD', 'TRAZABILIDAD', 'ORIGEN', 'CONFIANZA']

const seasonality = [
  { month: 'Ene', active: false, peak: false },
  { month: 'Feb', active: false, peak: false },
  { month: 'Mar', active: true, peak: false, label: 'Inicio cosecha' },
  { month: 'Abr', active: true, peak: true, label: 'Pico exportación' },
  { month: 'May', active: true, peak: true, label: 'Pico exportación' },
  { month: 'Jun', active: true, peak: true, label: 'Pico exportación' },
  { month: 'Jul', active: true, peak: true, label: 'Pico exportación' },
  { month: 'Ago', active: true, peak: false, label: 'Cosecha tardía' },
  { month: 'Set', active: true, peak: false, label: 'Cosecha tardía' },
  { month: 'Oct', active: false, peak: false },
  { month: 'Nov', active: false, peak: false },
  { month: 'Dic', active: false, peak: false },
]

// Diálogos sincronizados con el video de la palta (video de 10s)
const paltaDialogues: { start: number; end: number; text: string }[] = [
  { start: 5.5, end: 6.8, text: '¡Hola!' },
  { start: 7.2, end: 9.5, text: '¡Bienvenidos a Agrícola Pilcococha!' },
]

export const HomePage: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [dialogueText, setDialogueText] = useState('')
  const [showDialogue, setShowDialogue] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(timer)
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
      <div className="overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL                                                         */}
        {/* ========================================================================= */}
        <section className="relative min-h-[90vh] flex items-center bg-forest-950 text-white overflow-hidden">
          {/* Imagen de fondo editorial con overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero/hero-real.jpg" 
              alt="Fundo Agrícola Pilcococha - Palta Hass en el campo peruano"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/80 to-forest-950/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="max-w-3xl lg:max-w-[55%]">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-avocado-600/20 border border-avocado-400/30 text-avocado-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-avocado-400 animate-pulse" />
                <span>Del campo peruano al mercado global</span>
              </motion.div>

              {/* Título Principal */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-cream leading-[1.08] tracking-tight mb-6"
              >
                Palta cultivada para llegar más lejos.
              </motion.h1>

              {/* Dinámica de palabras */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 text-lg md:text-xl text-cream/90 font-medium mb-6 font-sans"
              >
                <span className="text-avocado-400 font-semibold">Cultivamos</span>
                <span className="inline-block min-w-[140px] px-3 py-1 bg-white/10 rounded-md text-cream font-bold tracking-wider text-base backdrop-blur-xs border border-white/10 text-center">
                  {rotatingWords[wordIndex]}
                </span>
                <span className="hidden sm:inline text-cream/60">• Fundo Agrícola Pilcococha</span>
              </motion.div>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed mb-10 max-w-2xl font-light"
              >
                Palta Hass peruana de exportación cultivada bajo estrictos estándares fitosanitarios, con materia seca garantizada y trazabilidad integral desde nuestros árboles hasta el consumidor final.
              </motion.p>

              {/* Botones CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <Link
                  to="/cotizar"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-base transition-all shadow-lg hover:shadow-avocado-600/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Solicitar Cotización B2B</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/nuestra-palta"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-base transition-all border border-white/20 backdrop-blur-sm"
                >
                  <span>Conocer Nuestra Palta</span>
                </Link>
              </motion.div>

              {/* Palta animada versión móvil */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="md:hidden flex flex-col items-center mt-8 -mb-4"
              >
                <motion.div
                  animate={{ 
                    opacity: showDialogue ? 1 : 0, 
                    y: showDialogue ? 0 : 8, 
                    scale: showDialogue ? 1 : 0.9 
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mb-2 z-10"
                >
                  <div className="relative bg-white/95 backdrop-blur-md text-forest-950 px-4 py-2 rounded-2xl shadow-xl border border-avocado-400/30">
                    <p className="text-sm font-bold text-center leading-snug whitespace-nowrap">
                      {dialogueText}
                    </p>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-avocado-400/30" />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-48 sm:w-56"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full drop-shadow-[0_10px_30px_rgba(14,44,32,0.4)]"
                  >
                    <source src="/videopalta/palta-animada.webm" type="video/webm" />
                    <source src="/videopalta/gemini_generated_video_8b2dc77d.mp4" type="video/mp4" />
                  </video>
                </motion.div>
              </motion.div>

              {/* Insignias Origen */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-cream/70"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-avocado-400" />
                  <span><strong>PERÚ</strong> — Origen de exportación</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-avocado-400" />
                  <span>Certificación fitosanitaria SENASA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-avocado-400" />
                  <span>Materia Seca &gt; 21.5%</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Video Palta Animada Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-20 pointer-events-none
              hidden md:block
              w-[40%] md:w-[38%] lg:w-[42%] xl:w-[48%]
              max-w-[600px] xl:max-w-[700px]"
            style={{ bottom: '16%' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 lg:w-80 xl:w-96 h-64 lg:h-80 xl:h-96 rounded-full bg-avocado-400/25 blur-[80px] animate-pulse" />
            </div>

            <motion.div
              animate={{ 
                opacity: showDialogue ? 1 : 0, 
                y: showDialogue ? 0 : 10, 
                scale: showDialogue ? 1 : 0.9 
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute -top-2 md:top-0 lg:top-2 left-1/2 -translate-x-1/2 z-30"
            >
              <div className="relative bg-white/95 backdrop-blur-md text-forest-950 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-2xl shadow-xl border border-avocado-400/30">
                <p className="text-sm md:text-base lg:text-lg font-bold text-center leading-snug whitespace-nowrap">
                  {dialogueText}
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-white/95 rotate-45 border-r border-b border-avocado-400/30" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full drop-shadow-[0_20px_60px_rgba(14,44,32,0.5)]"
              >
                <source src="/videopalta/palta-animada.webm" type="video/webm" />
                <source src="/videopalta/gemini_generated_video_8b2dc77d.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 2. BANDA DE ATRIBUTOS (VALUE STRIP - LIMPIA, SIN RECUADROS APILADOS)       */}
        {/* ========================================================================= */}
        <section className="bg-forest-900 border-y border-forest-800 py-6 text-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-forest-800/80">
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold mb-1">Variedad</p>
                <p className="font-serif font-bold text-lg text-cream">Palta Hass 100%</p>
              </div>
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold mb-1">Origen</p>
                <p className="font-serif font-bold text-lg text-cream">Valles del Perú</p>
              </div>
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold mb-1">Garantía</p>
                <p className="font-serif font-bold text-lg text-cream">Control Lote a Lote</p>
              </div>
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold mb-1">Logística</p>
                <p className="font-serif font-bold text-lg text-cream">Cadena de Frío a 5°C</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. RESUMEN: IDENTIDAD & FUNDOS (LAYOUT EDITORIAL, SIN CARDS SOBRE CARDS)  */}
        {/* ========================================================================= */}
        <section className="py-20 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Imagen con composición limpia */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 group">
                  <img
                    src="/images/fundo/riego-tecnificado.jpg"
                    alt="Fundos tecnificados de Agrícola Pilcococha"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold block mb-1">
                        Valle Sagrado & Valles Interandinos
                      </span>
                      <p className="font-serif text-lg font-bold">Producción sustentable y fertirriego de alta eficiencia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido Editorial con métricas tipográficas */}
              <div className="lg:col-span-6 space-y-6">
                <span className="ebrow text-forest-800">Nuestra Identidad</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-forest-950 leading-tight">
                  Cultivamos relaciones que comienzan en la tierra.
                </h2>
                <p className="text-muted text-base md:text-lg leading-relaxed">
                  En <strong>Agrícola Pilcococha</strong> gestionamos plantaciones de Palta Hass en los valles más fértiles del Perú. Unimos ciencia agronómica de precisión, respeto por los recursos hídricos y trabajo formal con las comunidades agrícolas locales.
                </p>

                {/* Métricas tipográficas fluidas (sin cajas cerradas) con animación de conteo */}
                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-charcoal/10">
                  <div>
                    <span className="block text-3xl sm:text-4xl font-black font-serif text-forest-950">
                      <AnimatedCounter value="80+" duration={2000} />
                    </span>
                    <span className="text-xs text-muted font-medium mt-1 block">Hectáreas en producción</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-black font-serif text-forest-950">
                      <AnimatedCounter value="10+" duration={1600} />
                    </span>
                    <span className="text-xs text-muted font-medium mt-1 block">Años de trayectoria</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-black font-serif text-forest-950">
                      <AnimatedCounter value="100%" duration={2200} />
                    </span>
                    <span className="text-xs text-muted font-medium mt-1 block">Trazabilidad de lote</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/nosotros"
                    className="inline-flex items-center gap-2 text-forest-900 hover:text-forest-700 font-bold text-sm group transition-colors"
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
        {/* 4. RESUMEN: NUESTRA PALTA HASS (EDITORIAL ALTERNO)                         */}
        {/* ========================================================================= */}
        <section className="py-20 md:py-24 bg-sand/30 border-y border-charcoal/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Contenido Izquierda */}
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                <span className="ebrow text-forest-800">Fruta de Exportación</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-forest-950 leading-tight">
                  Palta Hass Peruana con Materia Seca Garantizada.
                </h2>
                <p className="text-muted text-base md:text-lg leading-relaxed">
                  Cosechada selectivamente árbol por árbol en su punto óptimo fisiológico (21.5% a 24% de materia seca). Ofrece un perfil sensorial cremoso, sabor suave a nuez y piel rugosa de óptimo grosor para soportar largas travesías en ultramar.
                </p>

                {/* Lista limpia de especificaciones */}
                <div className="space-y-3 pt-2 text-sm text-charcoal/90">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest-800 shrink-0" />
                    <span><strong>Calibres disponibles:</strong> Desde el 12 (300g+) hasta el 28 (135g) según mercado.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest-800 shrink-0" />
                    <span><strong>Presentaciones:</strong> Cajas corrugadas de 4.0 kg y 10.0 kg con ventilación pre-frío.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest-800 shrink-0" />
                    <span><strong>Vida útil:</strong> Tránsito marítimo garantizado de hasta 28 días a 5°C.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to="/nuestra-palta"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm transition-all shadow-sm"
                  >
                    <span>Ver ficha técnica y calibres</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/cotizar"
                    className="inline-flex items-center gap-2 text-forest-900 hover:text-forest-700 font-bold text-sm px-4 py-3"
                  >
                    <span>Cotizar este producto</span>
                  </Link>
                </div>
              </div>

              {/* Imagen Derecha */}
              <div className="lg:col-span-6 relative order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 group">
                  <img
                    src="/images/producto/palta-hass-hero.jpg"
                    alt="Palta Hass de exportación Agrícola Pilcococha"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold block mb-1">
                      Calidad Premium
                    </span>
                    <p className="font-serif text-lg font-bold">Textura cremosa y estándar internacional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RESUMEN: PROCESO & TRAZABILIDAD (4 PASOS LINEALES, SIN CAJAS PESADAS)   */}
        {/* ========================================================================= */}
        <section className="py-20 md:py-24 bg-forest-950 text-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="ebrow text-avocado-400 mb-2 block">Trazabilidad Total</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream">
                  De la tierra al puerto de destino.
                </h2>
              </div>
              <p className="text-cream/70 text-sm sm:text-base max-w-md">
                Supervisión milimétrica bajo los más exigentes protocolos fitosanitarios de SENASA, USDA-APHIS y la Unión Europea.
              </p>
            </div>

            {/* Pipeline de 4 pasos sin cards anidadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="border-t border-forest-800 pt-6">
                <span className="text-avocado-400 font-mono text-sm font-bold block mb-3">01 / CULTIVO</span>
                <h3 className="font-serif font-bold text-xl text-cream mb-2">Manejo Tecnificado</h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  Fertirriego computarizado y monitoreo de humedad para optimizar nutrientes en cada árbol.
                </p>
              </div>

              <div className="border-t border-forest-800 pt-6">
                <span className="text-avocado-400 font-mono text-sm font-bold block mb-3">02 / COSECHA</span>
                <h3 className="font-serif font-bold text-xl text-cream mb-2">Corte Selectivo</h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  Corte a tijera con pedúnculo exacto tras verificar materia seca por lote analizado.
                </p>
              </div>

              <div className="border-t border-forest-800 pt-6">
                <span className="text-avocado-400 font-mono text-sm font-bold block mb-3">03 / EMPAQUE</span>
                <h3 className="font-serif font-bold text-xl text-cream mb-2">Calibrado y Selección</h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  Clasificación electrónica por peso y descarte óptico en cajas de 4kg y 10kg de exportación.
                </p>
              </div>

              <div className="border-t border-forest-800 pt-6">
                <span className="text-avocado-400 font-mono text-sm font-bold block mb-3">04 / LOGÍSTICA</span>
                <h3 className="font-serif font-bold text-xl text-cream mb-2">Cadena de Frío a 5°C</h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  Pre-frío inmediato y contenedores de atmósfera controlada monitoreados hasta destino.
                </p>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-forest-800 flex justify-center">
              <Link
                to="/proceso-calidad"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-sm transition-all border border-white/15"
              >
                <span>Conocer el proceso de calidad y certificaciones</span>
                <ArrowRight className="w-4 h-4 text-avocado-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. RESUMEN: MERCADOS Y LOGÍSTICA (GLOBAL REACH)                            */}
        {/* ========================================================================= */}
        <section className="py-20 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="ebrow text-forest-800">Presencia Global</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-forest-950 leading-tight">
                  Conectando Perú con el mundo.
                </h2>
                <p className="text-muted text-base leading-relaxed">
                  Despachamos desde nuestra sede en Calca, Cusco hacia los puertos de Callao, Chancay y Pisco, conectando las principales rutas comerciales marítimas con cumplimiento aduanero y cuarentenario.
                </p>

                <div className="pt-2 space-y-3 text-sm text-forest-950 font-medium">
                  <div className="flex items-center gap-3">
                    <Globe2 className="w-5 h-5 text-forest-800 shrink-0" />
                    <span><strong>Europa:</strong> Países Bajos (Rotterdam), España y Reino Unido.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-forest-800 shrink-0" />
                    <span><strong>Norteamérica:</strong> Costa Este y Costa Oeste bajo protocolo USDA.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-forest-800 shrink-0" />
                    <span><strong>Asia y Cono Sur:</strong> Mercados en constante expansión.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/mercados"
                    className="inline-flex items-center gap-2 text-forest-900 hover:text-forest-700 font-bold text-sm group"
                  >
                    <span>Ver mapa interactivo y red de transporte en vivo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Imagen representativa de packing & logística */}
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-16/10 group">
                  <img
                    src="/images/proceso/empaque.jpg"
                    alt="Línea de packing y despacho de palta de exportación"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-avocado-400 font-bold block mb-1">
                        Cadena de Exportación
                      </span>
                      <p className="font-serif text-lg font-bold">Empaque certificado y logística refrigerada ininterrumpida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CALENDARIO DE TEMPORADA RÁPIDO (VENTANA DE SUMINISTRO B2B)              */}
        {/* ========================================================================= */}
        <section className="py-16 bg-sand/30 border-y border-charcoal/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="ebrow text-forest-800 mb-1 block">Disponibilidad Anual</span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-forest-950">
                  Calendario de Cosecha y Despacho
                </h3>
              </div>
              <p className="text-muted text-xs sm:text-sm">
                Temporada activa de <strong>Marzo a Setiembre</strong> con pico de volumen entre Abril y Julio.
              </p>
            </div>

            {/* Grid horizontal limpio con efecto sobresaliente al pasar el mouse */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2.5 sm:gap-3 text-center pt-8 pb-4">
              {seasonality.map((item) => (
                <div
                  key={item.month}
                  className={`group relative py-3.5 px-2 rounded-2xl cursor-pointer select-none transition-all duration-300 ease-out transform
                    hover:-translate-y-3 hover:scale-110 hover:z-30 ${
                    item.peak
                      ? 'bg-forest-800 text-cream font-bold shadow-md hover:bg-forest-750 hover:shadow-2xl hover:shadow-forest-950/40 hover:ring-2 hover:ring-avocado-400'
                      : item.active
                      ? 'bg-avocado-400/25 text-forest-950 font-semibold shadow-xs border border-forest-800/10 hover:bg-avocado-300/60 hover:shadow-xl hover:shadow-forest-900/20 hover:ring-2 hover:ring-forest-800/30'
                      : 'bg-white/70 text-charcoal/50 border border-charcoal/5 hover:bg-white hover:text-charcoal hover:shadow-lg hover:shadow-charcoal/10 hover:ring-2 hover:ring-charcoal/15'
                  }`}
                >
                  {/* Tooltip flotante con información detallada al hacer hover */}
                  <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform group-hover:-translate-y-1 absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-forest-950 text-cream text-[10px] font-semibold rounded-lg shadow-xl whitespace-nowrap z-40 border border-avocado-400/40">
                    <span>{item.label || (item.active ? 'Cosecha Activa' : 'Sin Cosecha')}</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-forest-950 rotate-45 border-r border-b border-avocado-400/40" />
                  </div>

                  <p className="text-xs uppercase tracking-wider font-bold transition-all duration-200 group-hover:scale-105">
                    {item.month}
                  </p>

                  <div className="flex justify-center my-2">
                    <span className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-135 ${
                      item.peak
                        ? 'bg-avocado-400 animate-pulse group-hover:shadow-[0_0_8px_rgba(163,230,53,0.8)]'
                        : item.active
                        ? 'bg-forest-700 group-hover:bg-forest-900'
                        : 'bg-charcoal/20 group-hover:bg-charcoal/40'
                    }`} />
                  </div>

                  <p className={`text-[10px] leading-tight transition-colors duration-200 ${
                    item.peak 
                      ? 'text-cream/90 group-hover:text-cream font-bold' 
                      : item.active 
                      ? 'text-forest-900 group-hover:text-forest-950 font-semibold' 
                      : 'text-charcoal/50 group-hover:text-charcoal/80'
                  }`}>
                    {item.peak ? 'Pico' : item.active ? 'Cosecha' : '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CTA CONVERSIÓN B2B (BANNER ELEGANTE HACIA COTIZACIÓN Y CONTACTO)        */}
        {/* ========================================================================= */}
        <section className="py-20 md:py-24 bg-cream">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="card-highlight-green text-cream rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-2xl">
              {/* Glow decorativo sutil */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-avocado-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-forest-800/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-avocado-600/20 border border-avocado-400/30 text-avocado-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  Campaña Palta Hass
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight mb-6">
                  Planifique su programa de suministro con nosotros.
                </h2>

                <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed mb-10">
                  Asegure cupos de exportación en calibres seleccionados y reciba nuestra cotización FOB / CIF adaptada a las especificaciones de su mercado.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/cotizar"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-base transition-all shadow-lg hover:shadow-avocado-600/30"
                  >
                    <span>Configurar Cotización Online</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to="/contacto"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-base transition-all border border-white/20"
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