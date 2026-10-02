import React from 'react'
import { Link } from 'react-router-dom'
import { PaltaCarousel } from '@/components/sections/PaltaCarousel'
import { 
  ArrowRight, 
  Download, 
  Check, 
  Sparkles, 
  Box, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Layers, 
  Activity, 
  Radio, 
  Truck,
  Award
} from 'lucide-react'

const calibresData = [
  { calibre: '12', peso: '300 - 370 g', fr: '12 frutos / caja 4kg', count: 12, sizeLabel: 'Extra Grande', avocados: 3 },
  { calibre: '14', peso: '258 - 313 g', fr: '14 frutos / caja 4kg', count: 14, sizeLabel: 'Grande Premium', avocados: 4 },
  { calibre: '16', peso: '227 - 274 g', fr: '16 frutos / caja 4kg', count: 16, sizeLabel: 'Grande Estándar', avocados: 4 },
  { calibre: '18', peso: '203 - 243 g', fr: '18 frutos / caja 4kg', count: 18, sizeLabel: 'Mediano Superior', avocados: 5 },
  { calibre: '20', peso: '184 - 217 g', fr: '20 frutos / caja 4kg', count: 20, sizeLabel: 'Mediano Estándar', avocados: 5 },
  { calibre: '22', peso: '165 - 196 g', fr: '22 frutos / caja 4kg', count: 22, sizeLabel: 'Mediano Regular', avocados: 6 },
  { calibre: '24', peso: '151 - 175 g', fr: '24 frutos / caja 4kg', count: 24, sizeLabel: 'Compacto Retail', avocados: 6 },
  { calibre: '26', peso: '144 - 157 g', fr: '26 frutos / caja 4kg', count: 26, sizeLabel: 'Económico Pack', avocados: 7 },
  { calibre: '28', peso: '135 - 144 g', fr: '28 frutos / caja 4kg', count: 28, sizeLabel: 'Foodservice / Bolsa', avocados: 8 },
]

export const NuestraPaltaPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-forest-950 text-cream rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="ebrow text-avocado-400 mb-3 block">Nuestro Producto Estrella</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
              Palta Hass de Exportación Peruana.
            </h1>
            <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light">
              Reconocida mundialmente por su textura cremosa, alto contenido de aceites saludables y piel rugosa que cambia a un tono oscuro al madurar. Cosechada bajo estrictas normas internacionales.
            </p>
          </div>
        </div>
      </section>

      {/* Producto principal con Carrusel Ken-Burns & Thumbnails */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <PaltaCarousel />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="ebrow text-forest-800">Características Organolépticas</span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950 leading-tight">
              Sabor suave a nuez, pulpa cremosa y larga vida en anaquel.
            </h2>
            <p className="text-muted text-base leading-relaxed">
              La variedad Hass es la preferida por consumidores y cadenas de supermercados globales. Nuestra fruta se caracteriza por su maduración pareja y ausencia de fibras molestas, producto del clima templado y suelo fértil de nuestros fundos.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-avocado-600/20 text-forest-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-charcoal font-medium">Materia seca entre 21.5% y 24% para óptimo sabor.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-avocado-600/20 text-forest-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-charcoal font-medium">Pulpa verde pálida con gradiente amarillo mantecoso.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-avocado-600/20 text-forest-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-charcoal font-medium">Excelente tolerancia a tránsitos marítimos de hasta 28 días.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/cotizar"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm transition-all shadow-sm"
              >
                <span>Cotizar Palta Hass</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => alert('Ficha técnica PDF lista con especificaciones de exportación.')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-sand text-forest-950 font-semibold text-sm transition-all border border-charcoal/15 shadow-xs"
              >
                <Download className="w-4 h-4 text-forest-700" />
                <span>Ficha Técnica PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de Calibres Estilo Cajas de Exportación de Cartón Corrugado */}
      <section className="bg-sand/50 py-20 border-y border-charcoal/10 mb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="ebrow text-forest-800 mb-2 block">Clasificación Estándar de Exportación</span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
              Tabla de Calibres y Cajas Comerciales
            </h2>
            <p className="text-muted text-base mt-2">
              Cada caja es calibrada electrónicamente por peso y diámetro, garantizando homogeneidad visual y calibre uniforme para anaquel internacional.
            </p>
          </div>

          {/* Grilla con Diseño de Cajas de Exportación (Estilo Cajas Corrugadas Reales) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {calibresData.map((item) => (
              <div 
                key={item.calibre} 
                className="group relative bg-[#ecdcc5] hover:bg-[#ebd8bf] rounded-2xl p-5 border-2 border-[#c5a982] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Orejas de encastre superiores de la caja de cartón */}
                <div className="absolute top-0 left-6 w-8 h-2 bg-[#b89569] rounded-b-md" />
                <div className="absolute top-0 right-6 w-8 h-2 bg-[#b89569] rounded-b-md" />

                {/* Cabecera estampada de la caja */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#714f2e] border-b border-[#c8ad88] pb-2 mb-3">
                    <span className="flex items-center gap-1">
                      <span>📦</span>
                      <span>AGRÍCOLA PILCOCOCHA</span>
                    </span>
                    <span className="bg-[#b89569]/30 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      PERÚ
                    </span>
                  </div>

                  {/* Cuerpo Central de la Caja con Estampado de Calibre */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7e5b38] block">
                        {item.sizeLabel}
                      </span>
                      <h3 className="text-3xl font-black font-serif text-[#332212] tracking-tight">
                        CALIBRE {item.calibre}
                      </h3>
                    </div>

                    {/* Sello de peso en tinta de empaque */}
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#d8b88c] text-[#3d2716] font-mono text-xs font-black border border-[#ad8858] shadow-xs">
                        {item.peso}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ranura troquelada central de ventilación / agarradera de la caja */}
                <div className="my-3 py-1 flex items-center justify-between">
                  <div className="w-16 h-3.5 bg-[#3c2a1a] rounded-full mx-auto shadow-inner flex items-center justify-center opacity-85">
                    <div className="w-12 h-1 bg-[#23170e] rounded-full" />
                  </div>
                </div>

                {/* Visualización de Paltas adentro de la caja */}
                <div className="bg-[#dfcbaf] p-2.5 rounded-xl border border-[#cbaf8a] mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4a3421]">
                    {item.fr}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.avocados }).map((_, aIdx) => (
                      <span key={aIdx} className="text-sm drop-shadow-xs" title="Palta Hass">🥑</span>
                    ))}
                  </div>
                </div>

                {/* Pie de caja con sellos de exportación */}
                <div className="pt-2 border-t border-[#c8ad88] flex items-center justify-between text-[10px] font-bold text-[#6d4d2d]">
                  <span className="tracking-widest uppercase">CAT 1 • EXPORT GRADE</span>
                  <span className="font-mono text-[#8a633b]">4.0 KG NET WT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos de Presentación y Embarque con Diseño Fotorrealista según Tipo */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="ebrow text-forest-800 mb-2 block">Empaque & Logística Especializada</span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
            Formatos de Presentación y Embarque
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Estructuras diseñadas según la necesidad de cada comprador: desde góndola directa de supermercado hasta atmósfera controlada transoceánica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORMATO 1: CAJA 4.0 KG NETA (Plató / Display Tray de Retail) */}
          <div className="group rounded-3xl bg-[#f2e7d7] border-2 border-[#cfb591] p-6 shadow-md hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden">
            {/* Cabecera / Pestaña de Plató */}
            <div className="absolute top-0 inset-x-0 h-3 bg-[#b9986d] border-b border-[#a47f52]" />

            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#3d2716] text-[#dfc59f] font-mono text-[11px] font-black tracking-wider uppercase">
                  Plató Abierto • 4.0 kg
                </span>
                <span className="text-xs font-bold text-[#714f2e]">Retail Ready</span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[#dfcbaf] border-2 border-[#b9986d] flex items-center justify-center mb-4 text-[#3d2716] shadow-sm">
                <Box className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-black font-serif text-[#2e1d0f] mb-2">
                Caja 4.0 kg Neta
              </h3>
              <p className="text-xs text-[#5c3e24] leading-relaxed mb-4">
                Caja abierta de cartón corrugado de alta resistencia estructural (C-Flute). Diseñada para exposición directa en góndola de supermercados en Europa y EE.UU.
              </p>
            </div>

            {/* Especificaciones Técnicas de la Caja */}
            <div className="space-y-2 py-4 border-y border-[#cbaf8a] text-xs font-medium text-[#46301d]">
              <div className="flex items-center justify-between">
                <span className="text-muted">Dimensiones:</span>
                <span className="font-bold">40 × 30 × 10 cm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Palletizado:</span>
                <span className="font-bold text-forest-800">264 cajas / pallet marítimo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Ventilación:</span>
                <span className="font-bold">Orificios laterales para flujo de frío</span>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs">
              <span className="font-bold text-forest-900">Uso: Supermercados B2C</span>
              <span className="text-[11px] font-mono bg-white/70 px-2 py-0.5 rounded border border-[#b9986d]">Top Seller</span>
            </div>
          </div>

          {/* FORMATO 2: CAJA 10.0 KG GRANEL (Master Carton Industrial) */}
          <div className="group rounded-3xl bg-[#e3d0b8] border-2 border-[#b89569] p-6 shadow-md hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden">
            {/* Cinta zunchada industrial de seguridad */}
            <div className="absolute top-0 inset-x-0 h-3 bg-amber-400 border-b border-amber-600 flex items-center justify-center">
              <span className="text-[8px] font-black text-black tracking-widest uppercase">HEAVY DUTY PACK</span>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#271a0f] text-amber-300 font-mono text-[11px] font-black tracking-wider uppercase">
                  Master Box • 10.0 kg
                </span>
                <span className="text-xs font-bold text-[#5c3e24]">Granel B2B</span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[#cbaf8a] border-2 border-[#a47f52] flex items-center justify-center mb-4 text-[#2e1d0f] shadow-sm">
                <Layers className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-black font-serif text-[#271a0f] mb-2">
                Caja 10.0 kg Granel
              </h3>
              <p className="text-xs text-[#5c3e24] leading-relaxed mb-4">
                Caja telescópica reforzada con doble onda de cartón kraft. Formato de alta eficiencia logística optimizado para distribuidores mayoristas y centros de maduración.
              </p>
            </div>

            {/* Especificaciones Técnicas */}
            <div className="space-y-2 py-4 border-y border-[#b89569] text-xs font-medium text-[#46301d]">
              <div className="flex items-center justify-between">
                <span className="text-muted">Dimensiones:</span>
                <span className="font-bold">50 × 30 × 20 cm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Palletizado:</span>
                <span className="font-bold text-forest-800">100 cajas / pallet (1,000 kg netos)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Resistencia:</span>
                <span className="font-bold">Flejado perimetral antichoque</span>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs">
              <span className="font-bold text-forest-900">Uso: Maduradores y Horeca</span>
              <span className="text-[11px] font-mono bg-white/70 px-2 py-0.5 rounded border border-[#a47f52]">Económico</span>
            </div>
          </div>

          {/* FORMATO 3: CONTENEDOR REFRIGERADO 40' HIGH CUBE (Reefer Marítimo) */}
          <div className="group rounded-3xl bg-slate-900 border-2 border-slate-700 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden text-white">
            {/* Pared acanalada de contenedor marítimo */}
            <div className="absolute top-0 inset-x-0 h-3 bg-cyan-600 flex items-center justify-center">
              <span className="text-[8px] font-black text-white tracking-widest uppercase">REEFER 40&apos; HIGH CUBE</span>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Atmósfera Controlada</span>
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">CA TECH</span>
              </div>

              {/* Unidad de Refrigeración con Pantalla Digital */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 mb-4 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <ThermometerSnowflake className="w-6 h-6 text-cyan-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Temperatura Set</span>
                    <span className="text-xl font-mono font-black text-emerald-400 tracking-wider">+5.0 °C</span>
                  </div>
                </div>

                <div className="text-right border-l border-slate-800 pl-3">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Atmósfera</span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">O₂ 4% | CO₂ 5%</span>
                </div>
              </div>

              <h3 className="text-2xl font-black font-serif text-white mb-2">
                Contenedor Marítimo
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Embarque en unidades marítimas de 40 pies refrigeradas. La fruta entra en latencia vegetal durante el trayecto oceánico de 28 días hasta destino.
              </p>
            </div>

            {/* Especificaciones Técnicas */}
            <div className="space-y-2 py-4 border-y border-slate-800 text-xs font-medium text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Capacidad Total:</span>
                <span className="font-bold text-white">5,280 cajas de 4kg (20 pallets)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Monitoreo:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>GPS y T° Satelital en Vivo</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tránsito Garantizado:</span>
                <span className="font-bold text-white">Hasta 28 días sin merma</span>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-300">Rotterdam / Filadelfia</span>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Export Ready</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}