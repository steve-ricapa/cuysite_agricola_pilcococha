import React from 'react'
import { Link } from 'react-router-dom'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { ShieldCheck, CheckCircle2, ArrowRight, ThermometerSnowflake, FileCheck, Award, Microscope } from 'lucide-react'

export const ProcesoCalidadPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-forest-950 text-cream rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Resplandor decorativo de fondo */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-avocado-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-forest-800/40 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Texto a la izquierda */}
            <div className="lg:col-span-7 xl:col-span-7">
              <span className="ebrow text-avocado-400 mb-3 block">Estándares Internacionales</span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
                Proceso y Calidad de la Tierra a la Mesa.
              </h1>
              <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Desde el cultivo tecnificado en el Valle Sagrado hasta el arribo en los puertos de Europa y América, cada lote de palta Hass de Agrícola Pilcococha pasa por rigurosos controles fitosanitarios y de inocuidad.
              </p>
            </div>

            {/* Imagen a la derecha: sin card, sin marco, integrada naturalmente */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <img 
                src="/images/gallery/paltaclaidad.png" 
                alt="Control de calidad de la tierra a la mesa - Agrícola Pilcococha" 
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flujo Productivo Interactivo */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="ebrow text-forest-800 mb-2 block">Trazabilidad en 5 Etapas</span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
            Cadena de Valor Integral
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Haga clic en cada fase de la cinta para visualizar las operaciones, KPIs y fotografías reales de campo y planta.
          </p>
        </div>

        <ProcessTimeline />
      </section>

      {/* Protocolos de Inocuidad y Certificaciones */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="ebrow text-forest-800">Inocuidad y Fitosanidad</span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950 leading-tight">
              Control analítico lote a lote para mercados exigentes
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Trabajamos en estricto cumplimiento de las regulaciones fitosanitarias de SENASA (Perú), USDA-APHIS (Estados Unidos) y la Unión Europea. Realizamos análisis multiresiduos en laboratorios acreditados antes de autorizar cualquier corte de exportación.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm text-forest-950 block">Límites Máximos de Residuos (LMR)</strong>
                  <p className="text-xs text-muted mt-0.5">Cumplimiento al 100% de la legislación europea y estadounidense.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0 mt-0.5">
                  <ThermometerSnowflake className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm text-forest-950 block">Monitoreo de Frío Continuo</strong>
                  <p className="text-xs text-muted mt-0.5">Data loggers independientes en cada contenedor refrigerado con registro cada 15 minutos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm text-forest-950 block">Trazabilidad Total de Lote</strong>
                  <p className="text-xs text-muted mt-0.5">Cada caja lleva impreso el código de trazabilidad que vincula el sector del fundo, fecha de cosecha y línea de empaque.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/proceso/empaque.jpg"
                alt="Control de calidad en línea de empaque"
                className="w-full h-[460px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA a cotizar */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="card-highlight-green text-cream rounded-3xl p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-cream mb-4">
            ¿Desea solicitar especificaciones técnicas para su mercado?
          </h2>
          <p className="text-cream/80 text-base max-w-xl mx-auto mb-8 font-light">
            Nuestro equipo de calidad y exportaciones le enviará los certificados de inocuidad y reportes de materia seca.
          </p>
          <Link
            to="/cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all shadow-md"
          >
            <span>Configurar Cotización B2B</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}