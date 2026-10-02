import React, { useState, useEffect } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Globe2, 
  Truck, 
  Package, 
  Sprout, 
  Scale,
  Sparkles,
  ExternalLink
} from 'lucide-react'
import { MetricCard } from '@/components/sections/MetricCard'
import { SedesMap } from '@/components/maps/SedesMap'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { FundoCarousel } from '@/components/sections/FundoCarousel'
import { PaltaCarousel } from '@/components/sections/PaltaCarousel'
import { QuoteConfigurator } from '@/components/forms/QuoteConfigurator'

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

const calibres = [
  { calibre: '12', peso: '300 - 370 g', uso: 'Calibre grande gourmet' },
  { calibre: '14', peso: '258 - 313 g', uso: 'Alta demanda Europa' },
  { calibre: '16', peso: '227 - 274 g', uso: 'Estándar retail' },
  { calibre: '18', peso: '203 - 243 g', uso: 'Estándar retail' },
  { calibre: '20', peso: '184 - 217 g', uso: 'Supermercados EE.UU.' },
  { calibre: '22', peso: '165 - 196 g', uso: 'Venta por bolsa / malla' },
  { calibre: '24', peso: '151 - 175 g', uso: 'Foodservice / Granel' },
  { calibre: '26', peso: '144 - 157 g', uso: 'Formatos compactos' },
]

const processSteps = [
  {
    step: '01',
    title: 'Cultivo Tecnificado',
    description: 'Riego por goteo computarizado, monitoreo nutricional de suelo y manejo integrado de plagas bajo normas internacionales.',
    icon: Sprout,
  },
  {
    step: '02',
    title: 'Cosecha Manual Selectiva',
    description: 'Corte a tijera con pedúnculo exacto en punto de materia seca comprobado por lote (21.5% a 24%).',
    icon: Scale,
  },
  {
    step: '03',
    title: 'Selección y Desinfección',
    description: 'Limpieza, desinfección y calibración óptica electrónica para clasificar uniformidad de peso y piel.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'Empaque Controlado',
    description: 'Cajas de cartón corrugado de exportación de 4kg y 10kg con ventilación óptima para pre-frío.',
    icon: Package,
  },
  {
    step: '05',
    title: 'Despacho y Cadena de Frío',
    description: 'Contenedores refrigerados a 5°C con atmósfera controlada (CA) para preservar frescura hasta puerto destino.',
    icon: Truck,
  },
]

export const HomePage: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. HERO PRINCIPAL                                                         */}
        {/* ========================================================================= */}
        <section className="relative min-h-[92vh] flex items-center bg-forest-950 text-white overflow-hidden">
          {/* Imagen de fondo editorial con overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero/hero-real.jpg" 
              alt="Fundo Agrícola Pilcococha - Palta Hass en el campo peruano"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            {/* Degradados sofisticados para garantizar legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="max-w-3xl">
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

              {/* Insignia Origen */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center gap-8 text-xs text-cream/70"
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
        </section>

        {/* ========================================================================= */}
        {/* 2. BANDA DE ATRIBUTOS (VALUE BAR)                                         */}
        {/* ========================================================================= */}
        <section className="bg-forest-900 border-y border-forest-800 py-6 text-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-forest-800">
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-xs uppercase tracking-widest text-avocado-400 font-bold mb-1">Variedad</p>
                <p className="font-serif font-bold text-lg text-cream">Palta Hass 100%</p>
              </div>
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-xs uppercase tracking-widest text-avocado-400 font-bold mb-1">Origen</p>
                <p className="font-serif font-bold text-lg text-cream">Valles del Perú</p>
              </div>
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-xs uppercase tracking-widest text-avocado-400 font-bold mb-1">Calidad</p>
                <p className="font-serif font-bold text-lg text-cream">Control de Lote a Lote</p>
              </div>
              <div className="pt-2 md:pt-0 px-4">
                <p className="text-xs uppercase tracking-widest text-avocado-400 font-bold mb-1">Logística</p>
                <p className="font-serif font-bold text-lg text-cream">Cadena de Frío Integral</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MÓDULO NOSOTROS (OUR STORY & VALUES)                                    */}
        {/* ========================================================================= */}
        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Carrusel Fundo */}
              <div className="lg:col-span-6 relative">
                <FundoCarousel />
              </div>

              {/* Contenido Editorial */}
              <div className="lg:col-span-6">
                <p className="ebrow text-forest-800 mb-3">Nuestra Empresa</p>
                <h2 className="text-4xl md:text-5xl font-black font-serif text-forest-950 leading-tight mb-6">
                  Cultivamos relaciones que comienzan en la tierra.
                </h2>
                <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
                  En <strong>Agrícola Pilcococha</strong> entendemos que la exportación de fruta de clase mundial exige rigor en cada hectárea. Gestionamos nuestras plantaciones de Palta Hass en Perú con tecnología de fertirriego eficiente, respeto por el medio ambiente y un equipo de profesionales comprometidos con la excelencia agrícola.
                </p>
                <p className="text-muted text-base leading-relaxed mb-8">
                  Nuestra meta es ser el socio comercial más confiable para importadores, supermercados y distribuidores en los mercados más exigentes de Europa, Norteamérica y el mundo.
                </p>

                {/* Métricas clave */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-charcoal/10 mb-8">
                  <MetricCard number="80+" label="Hectáreas en producción" />
                  <MetricCard number="10+" label="Años de experiencia" />
                  <MetricCard number="10k" label="Toneladas de proyección" />
                </div>

                <Link
                  to="/nosotros"
                  className="inline-flex items-center gap-2 text-forest-800 hover:text-forest-600 font-bold text-sm group"
                >
                  <span>Conocer nuestra historia completa</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PRODUCTO DESTACADO (PALTA HASS B2B SPECS)                              */}
        {/* ========================================================================= */}
        <section className="py-24 bg-sand/60 border-y border-charcoal/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="ebrow text-forest-800 mb-2">Producto de Exportación</p>
              <h2 className="text-4xl md:text-5xl font-black font-serif text-forest-950">
                Palta Hass Peruana de Alta Calidad
              </h2>
              <p className="text-muted text-base md:text-lg mt-4 leading-relaxed">
                Fruta seleccionada en su punto óptimo de maduración fisiológica, con piel rugosa uniforme, pulpa cremosa y sabor inigualable.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Carrusel Palta Hass con Efecto Ken Burns */}
              <div className="lg:col-span-5 relative">
                <PaltaCarousel />
              </div>

              {/* Ficha técnica y calibres */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-charcoal/10">
                  <h3 className="text-2xl font-bold font-serif text-forest-950 mb-6 flex items-center justify-between">
                    <span>Ficha Técnica Resumida</span>
                    <span className="text-xs px-3 py-1 bg-forest-800/10 text-forest-800 rounded-full font-sans font-semibold">
                      Export Grade
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-3.5 bg-cream/70 rounded-xl border border-charcoal/5">
                      <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Variedad</span>
                      <strong className="text-forest-950 text-base">Hass (Persea americana)</strong>
                    </div>
                    <div className="p-3.5 bg-cream/70 rounded-xl border border-charcoal/5">
                      <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Materia Seca</span>
                      <strong className="text-forest-950 text-base">21.5% a 24% (Mínimo 21%)</strong>
                    </div>
                    <div className="p-3.5 bg-cream/70 rounded-xl border border-charcoal/5">
                      <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Presentación</span>
                      <strong className="text-forest-950 text-base">Cajas de 4.0 kg y 10.0 kg</strong>
                    </div>
                    <div className="p-3.5 bg-cream/70 rounded-xl border border-charcoal/5">
                      <span className="text-xs text-muted block uppercase tracking-wider font-semibold">Temperatura de Envío</span>
                      <strong className="text-forest-950 text-base">4°C a 6°C (Atmósfera Controlada)</strong>
                    </div>
                  </div>

                  {/* Tabla de calibres */}
                  <div className="mt-6 pt-6 border-t border-charcoal/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-forest-800 mb-3">
                      Calibres comerciales disponibles (Frutos por caja 4kg):
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center">
                      {calibres.map((c) => (
                        <div key={c.calibre} className="p-2 rounded-lg bg-sand/50 border border-charcoal/5 hover:bg-forest-800 hover:text-white transition-colors cursor-default group" title={`${c.peso} - ${c.uso}`}>
                          <p className="font-bold text-sm">{c.calibre}</p>
                          <p className="text-[10px] text-muted group-hover:text-cream/80">{c.peso.split(' ')[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    to="/cotizar"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm transition-all shadow-sm"
                  >
                    <span>Cotizar este producto</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#cotizacion"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-cream text-forest-950 font-semibold text-sm transition-all border border-charcoal/15 shadow-xs"
                    onClick={(e) => {
                      e.preventDefault()
                      alert('La ficha técnica en formato PDF oficial está lista para descarga con especificaciones completas.')
                    }}
                  >
                    <Download className="w-4 h-4 text-forest-700" />
                    <span>Descargar Ficha Técnica PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CALENDARIO DE TEMPORADA                                                 */}
        {/* ========================================================================= */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <p className="ebrow text-forest-800 mb-2">Disponibilidad en el año</p>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-forest-950">
                Calendario de Cosecha y Exportación
              </h2>
              <p className="text-muted text-base mt-2">
                Conozca los meses de producción en nuestros fundos para asegurar su suministro estacional programado.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-charcoal/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
                {seasonality.map((item) => (
                  <div
                    key={item.month}
                    className={`rounded-2xl p-4 text-center transition-all border ${
                      item.peak
                        ? 'bg-forest-800 text-cream border-forest-700 shadow-md scale-102'
                        : item.active
                        ? 'bg-avocado-400/20 text-forest-950 border-avocado-400/40'
                        : 'bg-sand/30 text-charcoal/40 border-transparent'
                    }`}
                  >
                    <p className="text-xs uppercase font-bold tracking-wider mb-2">{item.month}</p>
                    <div className="flex justify-center my-2">
                      <span className={`w-3.5 h-3.5 rounded-full ${
                        item.peak
                          ? 'bg-avocado-400 animate-pulse'
                          : item.active
                          ? 'bg-forest-700'
                          : 'bg-charcoal/15'
                      }`} />
                    </div>
                    <p className="text-[11px] font-medium leading-tight mt-2 min-h-[28px]">
                      {item.label || 'Mantenimiento'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Leyenda del calendario */}
              <div className="mt-8 pt-6 border-t border-charcoal/10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-forest-800" />
                    <span className="font-semibold text-charcoal">Temporada Pico (Alta disponibilidad)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-avocado-400" />
                    <span>Inicio / Cierre de Cosecha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-charcoal/20" />
                    <span>Floración y Cuajado</span>
                  </div>
                </div>

                <p className="italic">
                  * Las semanas exactas pueden variar según condiciones climatológicas del valle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. PROCESO PRODUCTIVO (VALUE CHAIN)                                       */}
        {/* ========================================================================= */}
        <section className="py-24 bg-forest-950 text-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <p className="ebrow text-avocado-400 mb-2">Flujo Productivo Tecnificado</p>
              <h2 className="text-4xl md:text-5xl font-black font-serif text-cream">
                Proceso Productivo y Control de Calidad
              </h2>
              <p className="text-cream/70 text-base md:text-lg mt-3 leading-relaxed">
                Haga clic en cualquiera de las 5 etapas para explorar el protocolo agronómico, las fotografías reales y los parámetros fitosanitarios de cada fase.
              </p>
            </div>

            <ProcessTimeline />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. MERCADOS INTERNACIONALES                                               */}
        {/* ========================================================================= */}
        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="ebrow text-forest-800 mb-2">Presencia Global</p>
              <h2 className="text-4xl md:text-5xl font-black font-serif text-forest-950">
                Destinos de Exportación
              </h2>
              <p className="text-muted text-base md:text-lg mt-4 leading-relaxed">
                Nuestra fruta viaja desde los puertos peruanos cumpliendo los protocolos cuarentenarios y especificaciones de cada continente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Europa */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-charcoal/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-6">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-black text-forest-950 mb-3">Europa</h3>
                <p className="text-sm text-muted mb-6 leading-relaxed">
                  Principal destino comercial. Cumplimiento riguroso de límites máximos de residuos (LMR) y estándares europeos de calidad y sostenibilidad.
                </p>
                <div className="pt-4 border-t border-charcoal/10 space-y-2 text-xs font-medium text-forest-900">
                  <p>✓ Países Bajos (Puerto de Rotterdam)</p>
                  <p>✓ España (Algeciras / Valencia)</p>
                  <p>✓ Alemania y Reino Unido</p>
                </div>
              </div>

              {/* EE.UU. */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-charcoal/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-black text-forest-950 mb-3">Norteamérica</h3>
                <p className="text-sm text-muted mb-6 leading-relaxed">
                  Gran demanda de calibres medianos y estándar. Despachos rápidos y gestión de logística eficiente para supermercados y distribuidores.
                </p>
                <div className="pt-4 border-t border-charcoal/10 space-y-2 text-xs font-medium text-forest-900">
                  <p>✓ Costa Este (Filadelfia / Florida)</p>
                  <p>✓ Costa Oeste (Long Beach / California)</p>
                  <p>✓ Protocolo APHIS / USDA</p>
                </div>
              </div>

              {/* Asia & LatAm */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-charcoal/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-6">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-black text-forest-950 mb-3">Mercados en Expansión</h3>
                <p className="text-sm text-muted mb-6 leading-relaxed">
                  Creciente interés en Asia y Latinoamérica por la consistencia, firmeza y sabor de la palta peruana cosechada en valles interandinos.
                </p>
                <div className="pt-4 border-t border-charcoal/10 space-y-2 text-xs font-medium text-forest-900">
                  <p>✓ Chile y Cono Sur</p>
                  <p>✓ Envíos marítimos de largo tránsito</p>
                  <p>✓ Gestión de frío de máxima precisión</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. GALERÍA EDITORIAL                                                      */}
        {/* ========================================================================= */}
        <section className="py-20 bg-sand/40 border-y border-charcoal/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="ebrow text-forest-800 mb-2">Imágenes Reales</p>
                <h2 className="text-3xl md:text-4xl font-black font-serif text-forest-950">
                  Nuestra Tierra y Nuestra Gente
                </h2>
              </div>
              <p className="text-muted text-sm max-w-md">
                Transparencia total: así se ve el fundo, la cosecha y el trabajo diario en Agrícola Pilcococha.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-md group h-[360px]">
                <img
                  src="/images/hero/hero-real.jpg"
                  alt="Valles de cultivo de Agrícola Pilcococha"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-avocado-400 font-bold block mb-1">Paisaje & Valle</span>
                  <p className="font-serif text-xl font-bold">Fundos en valles fértiles del Perú</p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-md group h-[360px]">
                <img
                  src="/images/fundo/team-field.jpg"
                  alt="Equipo de cosecha seleccionando palta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-avocado-400 font-bold block mb-1">Cosecha</span>
                  <p className="font-serif text-xl font-bold">Selección a mano árbol por árbol</p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-md group h-[320px]">
                <img
                  src="/images/producto/palta-hass-hero.jpg"
                  alt="Palta Hass recién recolectada"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-avocado-400 font-bold block mb-1">Fruto</span>
                  <p className="font-serif text-lg font-bold">Palta Hass con materia seca uniforme</p>
                </div>
              </div>

              <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-md group h-[320px]">
                <img
                  src="/images/proceso/empaque.jpg"
                  alt="Línea de packing de exportación"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-avocado-400 font-bold block mb-1">Packing & Calibrado</span>
                  <p className="font-serif text-xl font-bold">Estricto control de higiene y empaque</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. NUESTRAS SEDES Y FUNDOS (MAPA INTERACTIVO)                             */}
        {/* ========================================================================= */}
        <SedesMap />

        {/* ========================================================================= */}
        {/* 10. FORMULARIO DE COTIZACIÓN RÁPIDA B2B (CONFIGURADOR INTELIGENTE)        */}
        {/* ========================================================================= */}
        <section id="cotizacion" className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <QuoteConfigurator />
          </div>
        </section>
      </div>
    </MotionConfig>
  )
}