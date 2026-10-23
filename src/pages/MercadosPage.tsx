import React from 'react'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'
import { 
  Globe2, 
  ThermometerSnowflake, 
  ArrowRight, 
  CheckCircle2, 
  Anchor, 
  MapPin
} from 'lucide-react'

export const MercadosPage: React.FC = () => {

  return (
    <div className="text-cream font-sans transition-colors duration-700 min-h-screen relative overflow-hidden">
      {/* Indicador de avance al desplazarse */}
      <ScrollColorTransition showProgressBar={true} />

      {/* ===================================================================== */}
      {/* 1. HERO BANNER: RED LOGÍSTICA & MERCADOS GLOBALES                     */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#091E16" 
        className="pt-24 sm:pt-28 md:pt-[136px] pb-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="liquid-glass-panel editorial-hero rounded-3xl p-0 sm:p-8 lg:p-12 relative overflow-hidden">
            {/* Esferas luminosas de fondo */}
            <div className="absolute -right-24 -bottom-24 w-[480px] h-[480px] bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Texto Editorial */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div className="section-badge">
                  <span className="section-badge-dot" />
                  <span>Mercados y destinos</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-cream leading-[1.12] tracking-tight">
                  Del Valle Sagrado a los mercados del mundo.
                </h1>

                <p className="text-cream/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                  Conozca los destinos comerciales de nuestra palta Hass y los cuidados de calidad que acompañan su exportación desde el Perú.
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
                    href="#destinos-globales"
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-avocado-400 hover:bg-avocado-300 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-avocado-900/30 hover:shadow-avocado-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Conocer los mercados</span>
                    <ArrowRight className="w-4 h-4" />
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
                        "Conversemos sobre destinos, presentación y conservación de nuestra palta Hass."
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
      {/* 2. MERCADOS DE EXPORTACIÓN INTERNACIONAL                              */}
      {/* ===================================================================== */}
      <section 
        id="destinos-globales"
        data-bg-color="#F7F4EA"
        className="editorial-light editorial-open py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-badge mx-auto">
              <span className="section-badge-dot" />
              <span>Destinos de exportación</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
              Mercados internacionales
            </h2>
            <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed">
              Cada mercado tiene requisitos diferentes. Estos son algunos de los destinos para los que preparamos nuestra oferta de palta Hass.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <article className="border-t-2 border-river pt-6">
              <h3 className="text-2xl font-serif font-bold text-cream mb-3">Europa</h3>
              <p className="text-sm text-cream/80 leading-relaxed">Un mercado que valora la trazabilidad, la calidad del fruto y el cuidado durante el transporte.</p>
            </article>
            <article className="border-t-2 border-river pt-6">
              <h3 className="text-2xl font-serif font-bold text-cream mb-3">Estados Unidos</h3>
              <p className="text-sm text-cream/80 leading-relaxed">La inocuidad y el cumplimiento de requisitos fitosanitarios son esenciales para este destino.</p>
            </article>
            <article className="border-t-2 border-river pt-6">
              <h3 className="text-2xl font-serif font-bold text-cream mb-3">Asia y Pacífico</h3>
              <p className="text-sm text-cream/80 leading-relaxed">La conservación de la frescura y la presentación del producto son claves para las travesías largas.</p>
            </article>
            <article className="border-t-2 border-river pt-6">
              <h3 className="text-2xl font-serif font-bold text-cream mb-3">Latinoamérica</h3>
              <p className="text-sm text-cream/80 leading-relaxed">Los mercados regionales requieren una logística flexible y una selección acorde con cada comprador.</p>
            </article>
          </div>
        </div>
      </section>

    </div>
  )
}
