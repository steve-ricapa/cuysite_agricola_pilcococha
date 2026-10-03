import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { PeruLogisticsMap } from '@/components/maps/PeruLogisticsMap'
import { MaritimeFreightSimulator } from '@/components/sections/MaritimeFreightSimulator'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'
import { 
  Globe2, 
  Ship, 
  Truck, 
  ThermometerSnowflake, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Anchor, 
  Award,
  Layers,
  MapPin,
  Sparkles,
  Radio,
  Activity,
  MessageSquare,
  Download,
  Calculator
} from 'lucide-react'

export const MercadosPage: React.FC = () => {

  return (
    <div className="text-cream font-sans transition-colors duration-700 min-h-screen relative overflow-hidden">
      {/* Transición suave de color de fondo al hacer scroll */}
      <ScrollColorTransition showProgressBar={true} />

      {/* ===================================================================== */}
      {/* 1. HERO BANNER: RED LOGÍSTICA & MERCADOS GLOBALES                     */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#091E16" 
        className="pt-6 sm:pt-8 md:pt-12 pb-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="liquid-glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Esferas luminosas de fondo */}
            <div className="absolute -right-24 -bottom-24 w-[480px] h-[480px] bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Texto Editorial */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div className="section-badge">
                  <span className="section-badge-dot" />
                  <span>Red Logística Nacional & Presencia Internacional</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-cream leading-[1.12] tracking-tight">
                  Del Valle Sagrado a las Provincias del Perú y el Mundo.
                </h1>

                <p className="text-cream/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                  Nuestra sede agrícola en Cusco (<strong className="text-white font-semibold">Sede Fundo Calca - Pisac</strong>) opera como el corazón de nuestra red. Desde aquí conectamos las principales regiones del Perú y los megapuertos de exportación marítima con camiones refrigerados a 5°C ininterrumpidos.
                </p>

                {/* 3 Pills de Atributos */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Sede Calca · 2,850 msnm</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Cadena de Frío 5°C Continua</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <Anchor className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Callao, Chancay & Paita</span>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href="#mapa-logistica"
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-avocado-900/30 hover:shadow-avocado-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Explorar Mapa de Rutas</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#simulador-flete"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream font-bold text-sm border border-avocado-400/40 hover:border-avocado-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Calculator className="w-4 h-4 text-avocado-400" />
                    <span>Simulador de Flete & Reefer</span>
                  </a>

                  <a
                    href="#destinos-globales"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream font-bold text-sm border border-white/25 hover:border-avocado-400/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Destinos Internacionales</span>
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Mascota con Globo y Contenedor */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-avocado-500/20 to-emerald-400/20 rounded-full blur-3xl" />
                </div>

                <div className="self-start sm:self-center mb-3 z-20">
                  <span className="matucana-pill matucana-pill-emerald shadow-xl">
                    <Globe2 className="w-3.5 h-3.5" />
                    Exportación Multimodal
                  </span>
                </div>

                <div className="relative group select-none flex justify-center">
                  <img 
                    src="/images/gallery/paltamercados.png" 
                    alt="Del Perú al mundo - Logística Agrícola Pilcococha" 
                    className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Micro-chip de diálogo flotante */}
                  <div className="absolute -bottom-4 sm:-bottom-2 inset-x-2 sm:inset-x-6 z-20">
                    <div className="liquid-glass-card rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl border border-white/25 shadow-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-avocado-500/20 border border-avocado-400/50 flex items-center justify-center text-avocado-300 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-[13px] text-cream font-medium leading-snug">
                        "Conexión directa desde nuestros huertos andinos hacia Rotterdam, Filadelfia y Shanghái a 5°C continuo."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. MAPA INTERACTIVO DEL PERÚ CON SEDE, RUTAS Y TELEMETRÍA             */}
      {/* ===================================================================== */}
      <section 
        id="mapa-logistica"
        data-bg-color="#0D271D" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl space-y-3">
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>Monitoreo Logístico Nacional en Tiempo Real</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
                Corredores Logísticos del Perú
              </h2>
              <p className="text-cream/80 text-base font-light leading-relaxed">
                Visualice las rutas directas que parten desde nuestra sede andina en Calca hacia los principales megapuertos marítimos y centros de distribución de todo el país con control de frío ininterrumpido.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-end">
              <div className="liquid-glass-panel rounded-2xl px-4 py-2.5 flex items-center gap-3 border border-white/20">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-avocado-300 font-bold block">Flota Satelital</span>
                  <span className="text-xs font-bold text-cream">7 Corredores Activos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Marco Liquid Glass envolvente para el Mapa */}
          <div className="matucana-card p-3 sm:p-5 rounded-3xl shadow-2xl">
            <PeruLogisticsMap />
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. MERCADOS DE EXPORTACIÓN INTERNACIONAL                              */}
      {/* ===================================================================== */}
      <section 
        id="destinos-globales"
        data-bg-color="#0B241A" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-badge mx-auto">
              <span className="section-badge-dot" />
              <span>Destinos de Ultramar & Capacidad de Despacho</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
              Nuestros Principales Mercados Globales
            </h2>
            <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed">
              Conexión marítima semanal desde el Megapuerto del Callao, Chancay y Paita hacia los principales hubs de fruta fresca del planeta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Europa */}
            <div className="matucana-card group p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-avocado-500 text-forest-950 shadow-xs">
                    60% Volumen
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-2 group-hover:text-avocado-300 transition-colors">
                  Europa
                </h3>
                <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-5 font-light">
                  Principal destino de nuestra Palta Hass. Exigentes especificaciones de materia seca, certificación GlobalG.A.P. y empaque en cajas plató de 4kg.
                </p>

                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex justify-between items-start text-cream/70">
                    <span className="text-cream/50">Puertos:</span>
                    <span className="font-semibold text-cream text-right">Rotterdam, Algeciras, Hamburgo</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Tránsito:</span>
                    <span className="font-mono font-bold text-avocado-300">24 – 28 días</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Calibres:</span>
                    <span className="font-mono font-bold text-cream">12, 14, 16, 18</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10">
                <span className="text-[11px] font-mono font-bold text-avocado-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  Certificación SMETA & GRASP
                </span>
              </div>
            </div>

            {/* 2. Estados Unidos */}
            <div className="matucana-card group p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Ship className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-avocado-500 text-forest-950 shadow-xs">
                    25% Volumen
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-2 group-hover:text-avocado-300 transition-colors">
                  EE.UU.
                </h3>
                <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-5 font-light">
                  Consumo masivo en retail y foodservice. Cumplimiento fitosanitario estricto USDA-APHIS y cajas master de 10kg o formato plató retail.
                </p>

                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex justify-between items-start text-cream/70">
                    <span className="text-cream/50">Puertos:</span>
                    <span className="font-semibold text-cream text-right">Philadelphia, Miami, Long Beach</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Tránsito:</span>
                    <span className="font-mono font-bold text-avocado-300">14 – 18 días</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Calibres:</span>
                    <span className="font-mono font-bold text-cream">16, 18, 20, 22</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10">
                <span className="text-[11px] font-mono font-bold text-avocado-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  Aprobación USDA / FSMA
                </span>
              </div>
            </div>

            {/* 3. Asia / Pacífico */}
            <div className="matucana-card group p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Anchor className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500 text-slate-950 shadow-xs">
                    En Expansión
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-2 group-hover:text-cyan-300 transition-colors">
                  Asia / Pacífico
                </h3>
                <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-5 font-light">
                  Mercado premium con alta valoración del contenido de aceites. Conexión directa hacia el continente asiático a través del Megapuerto de Chancay.
                </p>

                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex justify-between items-start text-cream/70">
                    <span className="text-cream/50">Puertos:</span>
                    <span className="font-semibold text-cream text-right">Shanghái, Yokohama, Singapur</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Tránsito:</span>
                    <span className="font-mono font-bold text-cyan-300">22 – 26 días directos</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Calibres:</span>
                    <span className="font-mono font-bold text-cream">14, 16, 18</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10">
                <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Atmósfera Controlada O₂ 4%
                </span>
              </div>
            </div>

            {/* 4. Latinoamérica */}
            <div className="matucana-card group p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-forest-950 text-cream border border-white/20">
                    Regional
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-2 group-hover:text-avocado-300 transition-colors">
                  LatAm & Cono Sur
                </h3>
                <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-5 font-light">
                  Abastecimiento terrestre refrigerado directo en contraestación hacia mercados del sur y distribución nacional estratégica interprovincial.
                </p>

                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex justify-between items-start text-cream/70">
                    <span className="text-cream/50">Entrada:</span>
                    <span className="font-semibold text-cream text-right">Santiago, Buenos Aires, Tacna</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Tránsito:</span>
                    <span className="font-mono font-bold text-avocado-300">3 – 6 días terrestres</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span className="text-cream/50">Calibres:</span>
                    <span className="font-mono font-bold text-cream">18, 20, 22, 24</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10">
                <span className="text-[11px] font-mono font-bold text-avocado-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  Despacho Terrestre Directo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. SIMULADOR DE EMBARQUE & TIEMPOS DE TRÁNSITO REEFER                */}
      {/* ===================================================================== */}
      <section 
        id="simulador-flete"
        data-bg-color="#082017" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <MaritimeFreightSimulator />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. PILARES LOGÍSTICOS & CONTROL DE CADENA DE FRÍO                    */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#0A2218" 
        className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="liquid-glass-card p-6 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-serif text-cream text-base mb-1.5 group-hover:text-avocado-300 transition-colors">
                Cadena de Frío 5°C
              </h4>
              <p className="text-xs text-cream/75 leading-relaxed font-light">
                Túneles de pre-frío forzado inmediato post-cosecha y transporte refrigerado con monitoreo continuo.
              </p>
            </div>

            <div className="liquid-glass-card p-6 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-serif text-cream text-base mb-1.5 group-hover:text-avocado-300 transition-colors">
                Atmósfera Controlada
              </h4>
              <p className="text-xs text-cream/75 leading-relaxed font-light">
                Contenedores Reefer con inyección de O₂ al 4% y CO₂ al 5% para suspender la respiración del fruto.
              </p>
            </div>

            <div className="liquid-glass-card p-6 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-serif text-cream text-base mb-1.5 group-hover:text-avocado-300 transition-colors">
                Dataloggers Satelitales
              </h4>
              <p className="text-xs text-cream/75 leading-relaxed font-light">
                Sensores de temperatura y humedad en cada pallet con alertas en tiempo real vía GPS satelital.
              </p>
            </div>

            <div className="liquid-glass-card p-6 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-serif text-cream text-base mb-1.5 group-hover:text-avocado-300 transition-colors">
                SENASA & Certificaciones
              </h4>
              <p className="text-xs text-cream/75 leading-relaxed font-light">
                Inspección fitosanitaria en origen y sellos GlobalG.A.P., SMETA Sedex para ingreso sin trabas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. MASTER CTA B2B                                                     */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#071811" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="liquid-glass-panel rounded-3xl p-10 sm:p-14 lg:p-16 relative overflow-hidden border border-avocado-400/30">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-avocado-500/15 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="section-badge mx-auto">
                <span className="section-badge-dot" />
                <span>Abastecimiento B2B Global</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight">
                ¿Desea coordinar un embarque o programa de suministro?
              </h2>

              <p className="text-cream/85 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Consulte nuestra disponibilidad por calibres, fechas estimadas de cosecha y cotización CIF / FOB según su puerto de destino.
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  to="/cotizar"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-avocado-900/40 hover:shadow-avocado-500/50 hover:scale-105 active:scale-100"
                >
                  <span>Solicitar Cotización de Embarque</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream font-bold text-sm border border-white/25 hover:border-avocado-400/60 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-100"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar a Operaciones</span>
                </Link>
              </div>

              {/* Reaseguros Comerciales */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-cream/70 border-t border-white/10 max-w-xl mx-auto">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  <span>Salidas Semanales Callao / Chancay</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  <span>Contenedores Reefer Certificados</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  <span>Contratos FOB / CIF Globales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}