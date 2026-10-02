import React from 'react'
import { SectionTitle } from '@/components/sections/SectionTitle'
import { Button } from '@/components/ui/button'

export const MercadosPage: React.FC = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Mercados" subtitle="Presencia internacional" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-12">
          <div className="bg-white/80 p-6 rounded-xl border border-charcoal/10">
            <h3 className="text-2xl font-bold text-forest-900 mb-4">Europa</h3>
            <p className="text-muted">
              Principal mercado de exportación con estrictos estándares de calidad.
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-xl border border-charcoal/10">
            <h3 className="text-2xl font-bold text-forest-900 mb-4">EE.UU.</h3>
            <p className="text-muted">
              Mercado con alta demanda de palta Hass peruana.
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-xl border border-charcoal/10">
            <h3 className="text-2xl font-bold text-forest-900 mb-4">LatAm</h3>
            <p className="text-muted">
              Crecimiento constante en mercados regionales.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Button variant="secondary">
            Ver mapa de mercados
          </Button>
        </div>
      </div>
    </section>
  )
}