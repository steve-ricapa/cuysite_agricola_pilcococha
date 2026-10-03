import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FundoCarousel } from '@/components/sections/FundoCarousel'
import { TraceabilityFlowInteractive } from '@/components/sections/TraceabilityFlowInteractive'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  MapPin, 
  Droplets, 
  Sun, 
  CheckCircle2, 
  Globe2, 
  Sprout, 
  Clock, 
  ChevronRight, 
  FileCheck, 
  Phone, 
  MessageSquare, 
  Layers,
  ThermometerSnowflake,
  ExternalLink
} from 'lucide-react'

export const NosotrosPage: React.FC = () => {
  return (
    <div className="text-cream font-sans transition-colors duration-700 min-h-screen relative overflow-hidden">
      {/* Transición suave de color de fondo al hacer scroll */}
      <ScrollColorTransition showProgressBar={true} />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER: NUESTRA IDENTIDAD & RAÍCES ANDINAS                       */}
      {/* ========================================================================= */}
      <section 
        data-bg-color="#091E16" 
        className="pt-6 sm:pt-8 md:pt-12 pb-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="liquid-glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Esferas de resplandor ambiental */}
            <div className="absolute -right-24 -bottom-24 w-[480px] h-[480px] bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-forest-700/20 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Texto Editorial a la Izquierda */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div className="section-badge">
                  <span className="section-badge-dot" />
                  <span>Nuestra Identidad & Raíces Andinas</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-cream leading-[1.12] tracking-tight">
                  Cultivando confianza, ciencia agrícola y legado desde los valles del Perú.
                </h1>

                <p className="text-cream/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                  En <strong className="text-white font-semibold">Agrícola Pilcococha</strong> unimos la riqueza natural de los microclimas interandinos con tecnología agronómica de vanguardia para producir Palta Hass de clase mundial, forjando alianzas de largo plazo con importadores que exigen calidad, trazabilidad y cumplimiento inquebrantable.
                </p>

                {/* 3 Pills de Atributos Clave */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Valles de Altura a 2,850 msnm</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <Droplets className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Fertirriego Tecnificado</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-avocado-400" />
                    <span>GlobalG.A.P. & SENASA</span>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#fundo"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-avocado-900/30 hover:shadow-avocado-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Explorar Nuestro Fundo</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    to="/cotizar"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream font-bold text-sm border border-white/25 hover:border-avocado-400/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Iniciar Diálogo Comercial</span>
                  </Link>
                </div>
              </div>

              {/* Columna Derecha: Mascota Integrada con Aura y Diálogo Flotante */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative">
                {/* Aura luminosa detrás del personaje */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-avocado-500/20 to-emerald-400/20 rounded-full blur-3xl" />
                </div>

                {/* Badge Superior Flotante */}
                <div className="self-start sm:self-center mb-3 z-20">
                  <span className="matucana-pill matucana-pill-emerald shadow-xl">
                    <Sparkles className="w-3.5 h-3.5" />
                    Fundo Modelo Sostenible
                  </span>
                </div>

                {/* Personaje Agrícola */}
                <div className="relative group select-none flex justify-center">
                  <img 
                    src="/images/gallery/paltacultivando.png" 
                    alt="Cultivando confianza - Agrícola Pilcococha" 
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
                        "Del árbol al contenedor en menos de 24 horas: garantizamos frescura y materia seca óptima."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FRANJA DE MÉTRICAS AUDITABLES (LIQUID GLASS CAPSULES)                  */}
      {/* ========================================================================= */}
      <section 
        data-bg-color="#0B241A" 
        className="py-12 sm:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-20"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Hectáreas */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 relative group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/35 flex items-center justify-center text-avocado-300 group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-full border border-white/10">
                  Valles Andinos
                </span>
              </div>
              <p className="text-4xl sm:text-5xl font-black font-serif text-cream tracking-tight group-hover:text-avocado-300 transition-colors">
                <AnimatedCounter value="80+" duration={2000} />
              </p>
              <p className="text-sm font-bold text-cream mt-2">Hectáreas Bajo Cultivo</p>
              <p className="text-xs text-cream/70 font-light mt-1">Huertos de palta Hass en terrazas tecnificadas de alta densidad.</p>
            </div>

            {/* Card 2: Trayectoria */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 relative group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/35 flex items-center justify-center text-avocado-300 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-full border border-white/10">
                  Solidez B2B
                </span>
              </div>
              <p className="text-4xl sm:text-5xl font-black font-serif text-cream tracking-tight group-hover:text-avocado-300 transition-colors">
                <AnimatedCounter value="10+" duration={1600} />
              </p>
              <p className="text-sm font-bold text-cream mt-2">Años de Trayectoria</p>
              <p className="text-xs text-cream/70 font-light mt-1">Know-how agronómico y exportaciones continuas a mercados mundiales.</p>
            </div>

            {/* Card 3: Trazabilidad */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 relative group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/35 flex items-center justify-center text-avocado-300 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-full border border-white/10">
                  QR & Lote
                </span>
              </div>
              <p className="text-4xl sm:text-5xl font-black font-serif text-cream tracking-tight group-hover:text-avocado-300 transition-colors">
                <AnimatedCounter value="100%" duration={2200} />
              </p>
              <p className="text-sm font-bold text-cream mt-2">Trazabilidad por Lote</p>
              <p className="text-xs text-cream/70 font-light mt-1">Identificación precisa de árbol, fecha de corte y cadena térmica.</p>
            </div>

            {/* Card 4: Capacidad */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 relative group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/35 flex items-center justify-center text-avocado-300 group-hover:scale-110 transition-transform duration-300">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-full border border-white/10">
                  Reefer FCL
                </span>
              </div>
              <p className="text-4xl sm:text-5xl font-black font-serif text-cream tracking-tight group-hover:text-avocado-300 transition-colors">
                <AnimatedCounter value="+500t" duration={1800} />
              </p>
              <p className="text-sm font-bold text-cream mt-2">Capacidad Exportadora</p>
              <p className="text-xs text-cream/70 font-light mt-1">Volumen anual garantizado en programas de despacho semanal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EL FUNDO: TERROIR ANDINO Y AGRONOMÍA DE PRECISIÓN                     */}
      {/* ========================================================================= */}
      <section 
        id="fundo"
        data-bg-color="#0D271D" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Carrusel de Fotografías del Fundo */}
            <div className="lg:col-span-6 relative">
              <div className="matucana-card p-3 sm:p-4">
                <FundoCarousel />
              </div>
            </div>

            {/* Narrativa Técnica y Diferencial Geográfico */}
            <div className="lg:col-span-6 space-y-7">
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>El Fundo & Terroir de Altura</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
                Tierra fértil, noches frescas y abundante radiación solar andina.
              </h2>

              <p className="text-cream/85 text-base sm:text-lg leading-relaxed font-light">
                Ubicados en valles interandinos protegidos a más de <strong className="text-white font-semibold">2,850 msnm</strong>, nuestros huertos se benefician de una amplitud térmica singular. La alta radiación solar diurna activa la fotosíntesis vigorosa, mientras que las noches frescas ralentizan la respiración del árbol.
              </p>

              <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-light">
                Este fenómeno natural favorece una concentración extraordinaria de aceites monoinsaturados saludables (ácido oleico), otorgándole a nuestra palta una pulpa firme, sedosa y un porcentaje de materia seca que supera con soltura el 22%, perfecto para largas travesías oceánicas.
              </p>

              {/* 3 Especificaciones en Cards Translúcidas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-cream group-hover:text-avocado-300 transition-colors">
                      Riego Tecnificado por Goteo
                    </h4>
                    <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                      Dosificación hídrica milimétrica con agua de deshielos andinos, logrando hasta un 40% de ahorro hídrico.
                    </p>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-cream group-hover:text-avocado-300 transition-colors">
                      Alta Luminosidad Solar
                    </h4>
                    <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                      Más de 10 horas de luz diurna continua para calibres homogéneos y maduración uniforme en rama.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PILARES CORPORATIVOS & VALORES DE COSECHA                              */}
      {/* ========================================================================= */}
      <section 
        data-bg-color="#0A2218" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-badge mx-auto">
              <span className="section-badge-dot" />
              <span>Filosofía Operativa & Ética</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
              Los Tres Pilares que Rigen Cada Campaña
            </h2>
            <p className="text-cream/80 text-base sm:text-lg font-light">
              Nuestra reputación internacional se sustenta en tres principios fundamentales que guían cada decisión agronómica, logística y comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1: Rigor y Calidad */}
            <div className="matucana-card group p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Imagen del Pilar */}
                <div className="aspect-16/10 rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src="/images/proceso/empaque.jpg"
                    alt="Rigor de Calidad y Selección Óptica"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 matucana-pill matucana-pill-emerald">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Auditoría Continua
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-3 group-hover:text-avocado-300 transition-colors">
                  Rigor de Calidad & Cero Defectos
                </h3>
                <p className="text-sm text-cream/80 leading-relaxed font-light">
                  No embarcamos fruta que no cumpla con los parámetros exactos acordados contractualmente: materia seca superior al 21.5%, calibración milimétrica y ausencia total de daños mecánicos o fitosanitarios.
                </p>
              </div>

              {/* Tags Técnicos */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/10">
                <span className="text-[11px] font-mono text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  M.S. &gt;21.5%
                </span>
                <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Laboratorio Pre-Corte
                </span>
                <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Control Óptico
                </span>
              </div>
            </div>

            {/* Pilar 2: Alianzas Plurianuales B2B */}
            <div className="matucana-card group p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Imagen del Pilar */}
                <div className="aspect-16/10 rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src="/images/fundo/team-field.jpg"
                    alt="Alianzas y Trabajo en Equipo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 matucana-pill">
                    <HeartHandshake className="w-3.5 h-3.5 text-avocado-400" />
                    Confianza B2B
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-3 group-hover:text-avocado-300 transition-colors">
                  Relaciones Comerciales Plurianuales
                </h3>
                <p className="text-sm text-cream/80 leading-relaxed font-light">
                  Priorizamos programas de suministro a largo plazo con importadores y cadenas de distribución que valoran la transparencia de costos, la estabilidad de volúmenes semanales y la comunicación honesta.
                </p>
              </div>

              {/* Tags Técnicos */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/10">
                <span className="text-[11px] font-mono text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Contratos FCL
                </span>
                <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Transparencia FOB/CIF
                </span>
                <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Soporte 24/7
                </span>
              </div>
            </div>

            {/* Pilar 3: Innovación en Campo y Suelo */}
            <div className="matucana-card group p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Imagen del Pilar */}
                <div className="aspect-16/10 rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src="/images/fundo/acopio-cosecha.jpg"
                    alt="Acopio y Cuidado Agronómico"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 matucana-pill matucana-pill-emerald">
                    <Sparkles className="w-3.5 h-3.5" />
                    Agrotecnología
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold font-serif text-cream mb-3 group-hover:text-avocado-300 transition-colors">
                  Innovación en Campo & Suelo Vivo
                </h3>
                <p className="text-sm text-cream/80 leading-relaxed font-light">
                  Cosecha selectiva exclusivamente a tijera para preservar el pedúnculo íntegro, recolección en canastillas ventiladas, protección térmica en sombra y pre-enfriado rápido antes de las dos horas post-corte.
                </p>
              </div>

              {/* Tags Técnicos */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/10">
                <span className="text-[11px] font-mono text-avocado-300 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Corte a Tijera
                </span>
                <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Pre-Frío &lt;2 Horas
                </span>
                <span className="text-[11px] font-mono text-cream/80 bg-forest-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  Atmósfera Controlada
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NUESTRA GENTE & SOSTENIBILIDAD SOCIAL                                  */}
      {/* ========================================================================= */}
      <section 
        data-bg-color="#0B241A" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="liquid-glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>Responsabilidad Social & Ambiental</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
                El valor humano y ambiental que hace florecer cada valle.
              </h2>
              <p className="text-cream/85 text-base sm:text-lg font-light leading-relaxed">
                Nuestra agroexportación está profundamente enraizada en el bienestar de las comunidades locales y la custodia responsable de los recursos naturales del Perú.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Módulo 1: Empleo Formal & Desarrollo Comunitario */}
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-cream">
                      Empleo Digno & Cuadrillas Locales
                    </h3>
                    <p className="text-xs text-avocado-300 font-mono">Impacto en Familias Andinas</p>
                  </div>
                </div>

                <p className="text-sm text-cream/80 leading-relaxed font-light">
                  Colaboramos directamente con familias de los valles del Cusco y zonas adyacentes. Aseguramos empleo formal, remuneración justa por encima de la media del sector, seguro de salud y continua capacitación técnica en podas, injertos y corte exportador.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-cream/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>100% de colaboradores con contrato formal y cobertura médica integral.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-cream/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>Programas anuales de certificación técnica en manejo agronómico y BPA.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-cream/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>Igualdad de oportunidades y liderazgo femenino en áreas de selección y calidad.</span>
                  </div>
                </div>
              </div>

              {/* Módulo 2: Custodia del Agua & Biodiversidad */}
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-cream">
                      Eficiencia Hídrica & Suelo Regenerativo
                    </h3>
                    <p className="text-xs text-avocado-300 font-mono">Compromiso Ecológico Activo</p>
                  </div>
                </div>

                <p className="text-sm text-cream/80 leading-relaxed font-light">
                  El agua es el recurso más preciado de la cordillera. Por ello operamos con reservorios impermeabilizados y fertirriego por microgoteo compensado que suministra el agua y los biofertilizantes en el punto exacto de absorción de la raíz, evitando cualquier desperdicio.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-cream/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>Reducción de consumo hídrico de hasta 40% con respecto al riego por surcos.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-cream/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>Cercos vivos con flora nativa para proteger polinizadores y fauna local.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-cream/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0" />
                    <span>Cero vertimientos residuales en las fuentes de agua y ríos interandinos.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Manifiesto Agrícola Destacado */}
            <div className="matucana-card p-6 sm:p-8 border-l-4 border-l-avocado-400 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-avocado-300 font-bold block">
                  Manifiesto de Campo
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-cream font-medium leading-relaxed">
                  "La excelencia de nuestra palta no es un logro fortuito; es el testimonio del respeto a la tierra y del esfuerzo diario de hombres y mujeres andinos que ponen el corazón en cada árbol."
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-avocado-500/20 border border-avocado-400/40 flex items-center justify-center text-avocado-300">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-cream block">Gerencia Agrícola</span>
                  <span className="text-xs text-cream/60">Agrícola Pilcococha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EL CAMINO DE LA CALIDAD (FLUJO INTERACTIVO ANIMADO)                   */}
      {/* ========================================================================= */}
      <section 
        data-bg-color="#091E16" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
            <div className="section-badge mx-auto">
              <span className="section-badge-dot" />
              <span>Trazabilidad Total de Punta a Punta</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
              De Nuestra Tierra a su Mesa: 4 Pasos de Rigor
            </h2>
            <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed">
              Un viaje agronómico y logístico continuo en tiempo real: desde la nutrición del árbol en los Andes peruanos hasta el contenedor reefer rumbo a ultramar.
            </p>
          </div>

          {/* Componente Dinámico con Pipeline Láser, Reproducción Automática y Teatro Visual */}
          <TraceabilityFlowInteractive />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. MASTER CTA COMERCIAL B2B                                              */}
      {/* ========================================================================= */}
      <section 
        data-bg-color="#071811" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="liquid-glass-panel rounded-3xl p-10 sm:p-14 lg:p-16 relative overflow-hidden border border-avocado-400/30">
            {/* Resplandor central esmeralda */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-avocado-500/15 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="section-badge mx-auto">
                <span className="section-badge-dot" />
                <span>Campaña Palta Hass Perú 2026</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-cream leading-tight">
                ¿Desea planificar su programa de suministro con nosotros?
              </h2>

              <p className="text-cream/85 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Establezcamos ventanas de embarque, calibres prioritarios y especificaciones contractuales para abastecer a su mercado con la máxima confiabilidad.
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  to="/cotizar"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-avocado-900/40 hover:shadow-avocado-500/50 hover:scale-105 active:scale-100"
                >
                  <span>Solicitar Cotización & Ficha Técnica</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-cream font-bold text-sm border border-white/25 hover:border-avocado-400/60 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-100"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar con Gerencia Agrícola</span>
                </Link>
              </div>

              {/* Reaseguros Comerciales */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-cream/70 border-t border-white/10 max-w-xl mx-auto">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  <span>Respuesta B2B en &lt;24 horas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  <span>Fichas Técnicas Oficiales SENASA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                  <span>Muestras Comerciales Disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const AboutPage = NosotrosPage
export const AboutSection = NosotrosPage