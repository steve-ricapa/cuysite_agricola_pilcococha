import React, { useState, useEffect } from 'react'
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
  CheckCircle2,
  Calendar,
  ThermometerSnowflake,
  Star,
  Award,
  Clock,
  Anchor
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'

const heroSlides = [
  {
    id: 'fundo',
    title: 'Fundos de Altura',
    image: '/images/hero/hero-real.jpg',
  },
  {
    id: 'valle',
    title: 'Plantaciones Tecnificadas',
    image: '/images/hero/slide-valle.jpg',
  },
  {
    id: 'cosecha',
    title: 'Cosecha Selectiva',
    image: '/images/hero/slide-cosecha.jpg',
  },
  {
    id: 'riego',
    title: 'Sustentabilidad Hídrica',
    image: '/images/fundo/riego-tecnificado.jpg',
  },
]

const rotatingWords = ['CALIDAD', 'TRAZABILIDAD', 'ORIGEN', 'CONFIANZA']

export const HomePage: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

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

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden relative">
        <ScrollColorTransition />

        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL: PAISAJES + TEXTO SOBRE DESENFOQUE */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/65 via-transparent to-forest-950/25" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-forest-950/5 to-forest-950/30" />
          </div>

          {/* Overlay Matucana: Mitad izquierda con efecto agua / desenfoque integrado (Estilo Imagen 4) */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] xl:w-[47%] z-1 matucana-blur-overlay pointer-events-none" />

          <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 w-full py-2 lg:py-4">
            <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 lg:space-y-5"
                >
                  {/* Título Principal */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-serif text-cream leading-[1.08] tracking-tight drop-shadow-md">
                    Palta cultivada para llegar más lejos.
                  </h1>

                  {/* Dinámica de palabras */}
                  <div className="flex items-center gap-2.5 text-base sm:text-lg text-cream/90 font-medium font-sans">
                    <span className="text-avocado-400 font-bold">Cultivamos</span>
                    <span className="inline-block min-w-[130px] text-avocado-300 font-bold tracking-wider text-sm sm:text-base">
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
                      className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-avocado-400 hover:bg-avocado-300 text-forest-950 font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-avocado-600/35 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Solicitar Cotización B2B</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>

                    <Link
                      to="/nuestra-palta"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-semibold text-sm sm:text-base transition-all border border-white/20 backdrop-blur-xs"
                    >
                      <span>Conocer Nuestra Palta</span>
                    </Link>
                  </div>

                  {/* Datos de origen, sin panel sobre el paisaje */}
                  <div className="mt-2 border-t border-white/20 pt-4">
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
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. NUESTRA IDENTIDAD: FUNDOS DE ALTURA Y TECNOLOGÍA AGRONÓMICA             */}
        {/* ========================================================================= */}
        <section id="identidad" data-bg-color="#F7F4EA" className="editorial-light editorial-open py-20 md:py-28 relative z-10 transition-colors duration-700">
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
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 backdrop-blur-md font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 group"
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
        <section id="palta-hass" data-bg-color="#E8EFDA" className="editorial-light editorial-open py-20 md:py-28 relative z-10 transition-colors duration-700">
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
        <section id="proceso" data-bg-color="#E7F0EE" className="editorial-light editorial-open py-24 md:py-28 relative z-10 transition-colors duration-700">
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
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-semibold text-sm transition-all border border-white/20 backdrop-blur-md shadow-lg group"
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
        <section id="mercados" data-bg-color="#0A2419" className="editorial-open py-20 md:py-28 relative z-10 transition-colors duration-700">
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

                {/* Rutas de exportación */}
                <div className="space-y-3.5 pt-2">
                  <div className="liquid-glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 group">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center shrink-0">
                        <Globe2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-cream group-hover:text-avocado-300 transition-colors block">Europa: Países Bajos, España y Reino Unido</span>
                        <span className="text-xs text-cream/60">Rotterdam, Algeciras y Tilbury • 18-22 días de tránsito</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Activo</span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 group">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-cream group-hover:text-avocado-300 transition-colors block">Norteamérica: Costa Este y Costa Oeste</span>
                        <span className="text-xs text-cream/60">Protocolo USDA-APHIS • 14-16 días • Atmósfera controlada</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Activo</span>
                  </div>

                  <div className="liquid-glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 group">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-avocado-500/20 text-avocado-400 flex items-center justify-center shrink-0">
                        <Anchor className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-cream group-hover:text-avocado-300 transition-colors block">Asia y Mercados Emergentes</span>
                        <span className="text-xs text-cream/60">Cold Treatment cuarentenario • 24-28 días hacia Shanghái</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">Expansión</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/mercados"
                    className="inline-flex items-center gap-3 text-avocado-400 hover:text-avocado-300 font-bold text-sm group transition-colors"
                  >
                    <span>Conocer mercados y destinos</span>
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

                    <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 z-10">
                      <span className="matucana-pill matucana-pill-emerald shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        Despachos Marítimos
                      </span>
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

                   <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 text-center pt-2">
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

      </div>
    </MotionConfig>
  )
}
