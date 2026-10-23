import React from 'react'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ThermometerSnowflake, 
  FileCheck, 
  Award, 
  Microscope,
  Sparkles,
  MapPin,
  Globe2
} from 'lucide-react'

export const ProcesoCalidadPage: React.FC = () => {
  return (
    <div className="text-cream font-sans transition-colors duration-700 min-h-screen relative overflow-hidden">
      {/* Indicador de avance al desplazarse */}
      <ScrollColorTransition showProgressBar={true} />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER: PROCESO Y CALIDAD CERTIFICADA                             */}
      {/* ========================================================================= */}
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
                  <span>Estándares Internacionales & Fitosanidad SENASA</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-cream leading-[1.12] tracking-tight">
                  Proceso y Calidad Certificada de la Tierra a la Mesa.
                </h1>

                <p className="text-cream/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                  Desde el manejo agronómico de precisión en los valles interandinos hasta el arribo en puertos de Europa, Norteamérica y Asia, cada lote de Palta Hass de <strong className="text-white font-semibold">Agrícola Pilcococha</strong> pasa por rigurosos controles de inocuidad, materia seca y trazabilidad digital.
                </p>

                {/* 3 Pills de Atributos */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <Microscope className="w-3.5 h-3.5 text-avocado-400" />
                    <span>0% Residuos Prohibidos (LMR)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Cadena de Frío Continua 5°C</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <FileCheck className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Trazabilidad Total por Lote</span>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#certificaciones"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-avocado-400 hover:bg-avocado-300 text-forest-950 font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Ver Certificaciones</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Mascota con Sello de Calidad y Chip */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-avocado-500/20 to-emerald-400/20 rounded-full blur-3xl" />
                </div>

                <div className="self-start sm:self-center mb-3 z-20">
                  <span className="matucana-pill matucana-pill-emerald shadow-xl">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Inocuidad Verificada
                  </span>
                </div>

                <div className="relative group select-none flex justify-center">
                  <img 
                    src="/images/gallery/paltaclaidad.png" 
                    alt="Control de calidad de la tierra a la mesa - Agrícola Pilcococha" 
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
                        "Cada lote cuenta con análisis pre-corte en laboratorio: cero residuos y &gt;21.5% de materia seca."
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
      {/* 2. PROTOCOLOS DE INOCUIDAD, FITOSANIDAD Y CERTIFICACIONES               */}
      {/* ========================================================================= */}
      <section 
        id="certificaciones"
        data-bg-color="#F0E7D6"
        className="editorial-light editorial-open py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda: Protocolos y Especificaciones Analíticas */}
            <div className="lg:col-span-6 space-y-7">
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>Inocuidad, Fitosanidad & Calidad Analítica</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
                Control analítico lote a lote para mercados internacionales.
              </h2>

              <p className="text-cream/85 text-base sm:text-lg leading-relaxed font-light">
                Trabajamos en estricto cumplimiento de las normativas de SENASA (Perú), USDA-APHIS (Estados Unidos) y los reglamentos de la Unión Europea. Realizamos análisis multi-residuos en laboratorios acreditados antes de autorizar cualquier jornada de corte.
              </p>

              {/* 3 Bloques de Protocolos en Liquid Glass Cards */}
              <div className="space-y-3.5 pt-2">
                <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-cream">
                      Límites Máximos de Residuos (LMR) & Inocuidad
                    </h4>
                    <p className="text-xs sm:text-sm text-cream/75 mt-1 leading-relaxed font-light">
                      Cumplimiento al 100% de la legislación de la UE y FDA. Muestreo destructivo previo por lote certificado por laboratorios ISO/IEC 17025.
                    </p>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0 mt-0.5">
                    <ThermometerSnowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-cream">
                      Monitoreo Térmico Continuo a 5°C
                    </h4>
                    <p className="text-xs sm:text-sm text-cream/75 mt-1 leading-relaxed font-light">
                      Data loggers dobles independientes en cada contenedor refrigerado con registro cada 15 minutos y trazabilidad satelital en alta mar.
                    </p>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-cream">
                      Trazabilidad Total de Origen por Código QR
                    </h4>
                    <p className="text-xs sm:text-sm text-cream/75 mt-1 leading-relaxed font-light">
                      Cada caja y pallet lleva rotulado el código de trazabilidad que vincula la parcela del fundo, fecha de recolección y línea de empaque.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Foto de Planta y Grid de 4 Certificaciones */}
            <div className="lg:col-span-6 space-y-6">
              <div className="matucana-card p-3 sm:p-4">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-2xl border border-white/20 group">
                  <img
                    src="/images/proceso/empaque.jpg"
                    alt="Control de calidad en línea de empaque"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />

                  {/* Badges superiores sobre la imagen */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="matucana-pill matucana-pill-emerald shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Planta Certificada</span>
                    </span>
                    <span className="matucana-pill shadow-lg">
                      <MapPin className="w-3.5 h-3.5 text-avocado-400" />
                      <span>Línea Automatizada</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 z-10">
                    <div className="liquid-glass-panel rounded-2xl p-4 backdrop-blur-xl border border-white/25 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-avocado-400 block tracking-wider">
                          Capacidad de Procesamiento
                        </span>
                        <p className="font-serif font-bold text-base sm:text-lg text-cream">
                          Selección Electrónica 12 a 26 Calibres
                        </p>
                      </div>
                      <span className="text-sm font-mono font-black text-avocado-300 pl-3 border-l border-white/10">
                        &lt;2h Pre-Frío
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de 4 Sellos de Certificación Internacional */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="liquid-glass-card rounded-2xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-avocado-300 font-bold uppercase tracking-wider">
                      BPA Mundial
                    </span>
                    <Award className="w-4 h-4 text-avocado-400" />
                  </div>
                  <h5 className="font-bold text-sm text-cream font-serif">GlobalG.A.P. IFA v6</h5>
                  <p className="text-[11px] text-cream/70 font-light">Buenas prácticas agrícolas, bienestar laboral y cuidado hídrico.</p>
                </div>

                <div className="liquid-glass-card rounded-2xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-avocado-300 font-bold uppercase tracking-wider">
                      Autoridad Oficial
                    </span>
                    <ShieldCheck className="w-4 h-4 text-avocado-400" />
                  </div>
                  <h5 className="font-bold text-sm text-cream font-serif">SENASA Perú</h5>
                  <p className="text-[11px] text-cream/70 font-light">Lugar de producción y planta empacadora certificadas oficialmente.</p>
                </div>

                <div className="liquid-glass-card rounded-2xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-avocado-300 font-bold uppercase tracking-wider">
                      Mercado EE.UU.
                    </span>
                    <Globe2 className="w-4 h-4 text-avocado-400" />
                  </div>
                  <h5 className="font-bold text-sm text-cream font-serif">USDA-APHIS / FDA</h5>
                  <p className="text-[11px] text-cream/70 font-light">Protocolos de importación directa a puertos norteamericanos.</p>
                </div>

                <div className="liquid-glass-card rounded-2xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-avocado-300 font-bold uppercase tracking-wider">
                      Inocuidad
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-avocado-400" />
                  </div>
                  <h5 className="font-bold text-sm text-cream font-serif">HACCP & BPM</h5>
                  <p className="text-[11px] text-cream/70 font-light">Análisis de peligros y control estricto de puntos críticos en planta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
