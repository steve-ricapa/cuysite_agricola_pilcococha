import React from 'react'
import { QuoteConfigurator } from '@/components/forms/QuoteConfigurator'
import { ShieldCheck, HelpCircle, Anchor, Clock, FileCheck } from 'lucide-react'

export const CotizarPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-forest-950 text-cream rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="ebrow text-avocado-400 mb-3 block">Exportación Mayorista</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
              Solicitud de Cotización y Programas B2B.
            </h1>
            <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
              Configure los calibres, el volumen y las condiciones de entrega deseadas para su mercado. Nuestro departamento de exportaciones responderá con disponibilidades de cosecha y precios FOB / CIF competitivos.
            </p>
          </div>
        </div>
      </section>

      {/* Cotizador Interactivo */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <QuoteConfigurator />
      </section>

      {/* Garantías y Preguntas Frecuentes B2B */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="ebrow text-forest-800 mb-2 block">Información para Importadores</span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
            Condiciones Comerciales de Exportación
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
              <Anchor className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base mb-2">Puertos de Salida</h4>
            <p className="text-xs text-muted leading-relaxed">
              Embarques regulares desde Puerto del Callao (Lima) y Pisco (Ica) hacia puertos principales de Europa, Norteamérica y Asia.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base mb-2">Tiempos de Tránsito</h4>
            <p className="text-xs text-muted leading-relaxed">
              Europa (18 a 22 días), EE.UU. Costa Este (12 a 15 días), Centroamérica y Cono Sur (4 a 8 días) con atmósfera controlada.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base mb-2">Documentación</h4>
            <p className="text-xs text-muted leading-relaxed">
              Certificado Fitosanitario SENASA, Factura Comercial, Packing List, Bill of Lading (BL), Certificado de Origen y reporte de calidad.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-charcoal/10 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base mb-2">Términos de Pago</h4>
            <p className="text-xs text-muted leading-relaxed">
              Cartas de Crédito Irrevocables (L/C at sight), transferencias bancarias anticipadas y esquemas CAD para clientes recurrentes calificados.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}