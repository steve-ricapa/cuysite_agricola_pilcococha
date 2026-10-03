import React from 'react'
import { Link } from 'react-router-dom'
import { QuoteConfigurator } from '@/components/forms/QuoteConfigurator'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'
import { 
  ShieldCheck, 
  HelpCircle, 
  Anchor, 
  Clock, 
  FileCheck, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Globe2, 
  Truck, 
  Sparkles,
  PhoneCall
} from 'lucide-react'

export const CotizarPage: React.FC = () => {
  return (
    <div className="text-cream font-sans transition-colors duration-700 min-h-screen relative overflow-hidden">
      {/* Transición suave de color de fondo al hacer scroll */}
      <ScrollColorTransition showProgressBar={true} />

      {/* ===================================================================== */}
      {/* 1. HERO BANNER: COTIZACIÓN B2B Y PROGRAMAS DE SUMINISTRO               */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#091E16" 
        className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="liquid-glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Esferas luminosas de fondo */}
            <div className="absolute -right-24 -bottom-24 w-[480px] h-[480px] bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Columna Izquierda: Texto y Botón */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div className="section-badge">
                  <span className="section-badge-dot" />
                  <span>Exportación Mayorista & Programas de Abastecimiento 2026</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-cream leading-[1.12] tracking-tight">
                  Solicitud de Cotización y Programas B2B.
                </h1>

                <p className="text-cream/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                  Configure los calibres, el volumen y las condiciones de entrega deseadas para su mercado. Nuestro departamento de exportaciones responderá con disponibilidades de cosecha y precios <strong className="text-white font-semibold">FOB / CIF</strong> competitivos en menos de 24 horas.
                </p>

                {/* 3 Pills de Atributos */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Campaña 2026 Abierta</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <Anchor className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Embarques Callao, Chancay & Paita</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Contratos FOB / CIF con Certificación Global</span>
                  </div>
                </div>

                {/* Botón de anclaje directo al cotizador */}
                <div className="pt-3">
                  <a
                    href="#cotizador-interactivo"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-avocado-900/30 hover:shadow-avocado-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Configurar Pedido en Línea</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Mascota paltacotizacion.png con Checklist y Diálogo */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-avocado-500/20 to-emerald-400/20 rounded-full blur-3xl" />
                </div>

                <div className="self-start sm:self-center mb-3 z-20">
                  <span className="matucana-pill matucana-pill-emerald shadow-xl">
                    <FileCheck className="w-3.5 h-3.5" />
                    Cotización Oficial en Línea
                  </span>
                </div>

                <div className="relative group select-none flex justify-center">
                  <img 
                    src="/images/gallery/paltacotizacion.png" 
                    alt="Solicitud de Cotización - Agrícola Pilcococha" 
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
                        "¡Llevamos lo mejor del Perú al mundo! Cotizaciones inmediatas FOB y CIF con reporte de materia seca."
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
      {/* 2. COTIZADOR INTERACTIVO CONFIGURABLE                                */}
      {/* ===================================================================== */}
      <section 
        id="cotizador-interactivo"
        data-bg-color="#0A2218" 
        className="py-12 sm:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <QuoteConfigurator />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. CONDICIONES COMERCIALES & GARANTÍAS PARA IMPORTADORES            */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#071811" 
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-badge mx-auto">
              <span className="section-badge-dot" />
              <span>Garantías y Procedimientos para Importadores</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-cream leading-tight">
              Condiciones Comerciales de Exportación
            </h2>
            <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed">
              Estándares operativos de despacho marítimo y terrestre diseñados para garantizar predictibilidad, calidad y cumplimiento contractual en cada contenedor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tarjeta 1: Puertos de Salida */}
            <div className="liquid-glass-card p-6 sm:p-7 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Anchor className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-cream text-lg mb-2 group-hover:text-avocado-300 transition-colors">
                Puertos de Salida
              </h4>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light mb-4">
                Embarques regulares desde el Megapuerto del Callao (Lima), el Megapuerto de Chancay (ruta directa a Asia) y Paita (Piura) hacia los principales hubs del mundo.
              </p>
              <span className="text-[11px] font-mono text-avocado-400 font-bold block">
                Salidas Semanales Fijas
              </span>
            </div>

            {/* Tarjeta 2: Tiempos de Tránsito */}
            <div className="liquid-glass-card p-6 sm:p-7 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-cream text-lg mb-2 group-hover:text-avocado-300 transition-colors">
                Tiempos de Tránsito
              </h4>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light mb-4">
                Europa (22 a 25 días), EE.UU. Costa Este (14 a 16 días), Asia vía Chancay (22 a 25 días directos) y Cono Sur (3 a 5 días terrestres) con atmósfera controlada CA.
              </p>
              <span className="text-[11px] font-mono text-avocado-400 font-bold block">
                Atmósfera Controlada O₂ 4%
              </span>
            </div>

            {/* Tarjeta 3: Documentación SENASA */}
            <div className="liquid-glass-card p-6 sm:p-7 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-cream text-lg mb-2 group-hover:text-avocado-300 transition-colors">
                Documentación Oficial
              </h4>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light mb-4">
                Certificado Fitosanitario SENASA en origen, Bill of Lading (BL), Factura Comercial, Packing List, Certificado de Origen EUR.1 / Form A y reporte de materia seca calibrado.
              </p>
              <span className="text-[11px] font-mono text-avocado-400 font-bold block">
                Trámite VUCE Inmediato
              </span>
            </div>

            {/* Tarjeta 4: Términos de Pago */}
            <div className="liquid-glass-card p-6 sm:p-7 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-cream text-lg mb-2 group-hover:text-avocado-300 transition-colors">
                Términos de Pago
              </h4>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light mb-4">
                Cartas de Crédito Irrevocables (L/C at sight), transferencias bancarias internacionales anticipadas y esquemas CAD para clientes recurrentes calificados.
              </p>
              <span className="text-[11px] font-mono text-avocado-400 font-bold block">
                Operaciones Bancarias Seguras
              </span>
            </div>
          </div>

          {/* Banner de Contacto Comercial Adicional */}
          <div className="mt-16 liquid-glass-panel rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-avocado-400/30">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-cream">
                ¿Prefiere una llamada de coordinación técnica con nuestra gerencia?
              </h4>
              <p className="text-xs sm:text-sm text-cream/70 font-light">
                Podemos agendar una videoconferencia o coordinar directamente por WhatsApp con nuestro equipo de exportaciones.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900/90 hover:bg-forest-800 text-cream text-xs font-bold border border-white/20 transition-all hover:scale-105"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ir a Canales de Contacto</span>
              </Link>

              <a
                href="https://wa.me/51987654321?text=Hola%20Agr%C3%ADcola%20Pilcococha%2C%20deseo%20coordinar%20una%20reuni%C3%B3n%20para%20un%20programa%20de%20exportaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 text-xs font-bold transition-all shadow-md hover:scale-105"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp Comercial</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}