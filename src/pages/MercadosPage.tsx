import React from 'react'
import { Link } from 'react-router-dom'
import { PeruLogisticsMap } from '@/components/maps/PeruLogisticsMap'
import { 
  Globe2, 
  Ship, 
  Truck, 
  Thermometer, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Anchor, 
  Award,
  Layers,
  MapPin
} from 'lucide-react'

export const MercadosPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16 bg-cream">
      {/* ===================================================================== */}
      {/* 1. HERO HEADER                                                        */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16">
        <div className="bg-forest-950 text-cream rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Resplandor decorativo */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-avocado-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-forest-800/40 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Texto a la izquierda */}
            <div className="lg:col-span-7 xl:col-span-7">
              <span className="ebrow text-avocado-400 mb-3 block">
                Red Logística Nacional & Presencia Internacional
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
                Del Valle Sagrado a las Provincias del Perú y el Mundo.
              </h1>
              <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Nuestra sede agrícola en Cusco (<strong className="text-avocado-400 font-medium">Sede Fundo Calca - Pisac</strong>) opera como el corazón de nuestra red.
                Desde aquí conectamos todas las provincias peruanas y los megapuertos de exportación con camiones refrigerados a 5°C
                ininterrumpidos.
              </p>
            </div>

            {/* Imagen a la derecha: sin card, sin marco, integrada naturalmente */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <img 
                src="/images/gallery/paltamercados.png" 
                alt="Del Perú al mundo - Logística Agrícola Pilcococha" 
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. MAPA INTERACTIVO DEL PERÚ CON SEDE, RUTAS Y CARRITO REFRIGERADO     */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="ebrow text-forest-800 mb-2 block">Monitoreo en Tiempo Real</span>
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
                Corredores Logísticos del Perú
              </h2>
            </div>
            <p className="text-muted text-sm sm:text-base max-w-xl">
              Visualice las rutas directas que parten desde nuestra sede andina en Calca hacia los principales puertos marítimos y
              centros de distribución de todo el país.
            </p>
          </div>
        </div>

        {/* Mapa interactivo Leaflet con animación del camioncito recorriendo las rutas */}
        <PeruLogisticsMap />
      </section>

      {/* ===================================================================== */}
      {/* 3. MERCADOS DE EXPORTACIÓN INTERNACIONAL                                */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="ebrow text-forest-800 mb-2 block">Destinos de Ultramar</span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
            Nuestros Principales Mercados Globales
          </h2>
          <p className="text-muted text-sm sm:text-base mt-3">
            Conexión marítima desde el Megapuerto del Callao, Chancay y Paita hacia los principales hubs de fruta fresca del
            planeta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Europa */}
          <div className="card-highlight-white group relative bg-white p-6 sm:p-7 rounded-3xl border border-charcoal/10 shadow-xs cursor-pointer overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-avocado-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-forest-800 group-hover:text-avocado-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-forest-900/20">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold font-serif text-forest-950 group-hover:text-forest-900 transition-colors">Europa</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-800 text-cream">
                  60% Volumen
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Principal destino de nuestra Palta Hass. Exigentes especificaciones de materia seca, certificación GlobalG.A.P. y
                empaque en cajas plató de 4kg.
              </p>

              <div className="space-y-2 text-xs border-t border-charcoal/10 pt-3">
                <div className="flex justify-between text-muted">
                  <span>Puertos Destino:</span>
                  <span className="font-semibold text-forest-950 text-right">Rotterdam, Algeciras, Hamburgo</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Tránsito Marítimo:</span>
                  <span className="font-semibold text-forest-950">24 &ndash; 28 días</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Calibres Demandados:</span>
                  <span className="font-semibold text-forest-950">12, 14, 16, 18</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-charcoal/10">
              <span className="text-[11px] font-bold text-forest-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-avocado-600" />
                Certificación SMETA & GRASP
              </span>
            </div>
          </div>

          {/* 2. Estados Unidos */}
          <div className="card-highlight-white group relative bg-white p-6 sm:p-7 rounded-3xl border border-charcoal/10 shadow-xs cursor-pointer overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-avocado-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-forest-800 group-hover:text-avocado-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-forest-900/20">
                <Ship className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold font-serif text-forest-950 group-hover:text-forest-900 transition-colors">EE.UU.</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-800 text-cream">
                  25% Volumen
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Consumo masivo en retail y foodservice. Cumplimiento fitosanitario estricto USDA-APHIS y cajas de 10kg o formato
                plató.
              </p>

              <div className="space-y-2 text-xs border-t border-charcoal/10 pt-3">
                <div className="flex justify-between text-muted">
                  <span>Puertos Destino:</span>
                  <span className="font-semibold text-forest-950 text-right">Philadelphia, Miami, Long Beach</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Tránsito Marítimo:</span>
                  <span className="font-semibold text-forest-950">14 &ndash; 18 días</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Calibres Demandados:</span>
                  <span className="font-semibold text-forest-950">16, 18, 20, 22</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-charcoal/10">
              <span className="text-[11px] font-bold text-forest-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-avocado-600" />
                Aprobación USDA / FSMA
              </span>
            </div>
          </div>

          {/* 3. Asia & Transpacífico */}
          <div className="card-highlight-white group relative bg-white p-6 sm:p-7 rounded-3xl border border-charcoal/10 shadow-xs cursor-pointer overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-avocado-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-forest-800 group-hover:text-avocado-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-forest-900/20">
                <Anchor className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold font-serif text-forest-950 group-hover:text-forest-900 transition-colors">Asia / Pacífico</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-avocado-600 text-forest-950">
                  En Expansión
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Mercado premium con alta valoración del contenido de aceites. Conexión rápida gracias al nuevo Megapuerto de
                Chancay.
              </p>

              <div className="space-y-2 text-xs border-t border-charcoal/10 pt-3">
                <div className="flex justify-between text-muted">
                  <span>Puertos Destino:</span>
                  <span className="font-semibold text-forest-950 text-right">Shanghái, Yokohama, Singapur</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Tránsito Marítimo:</span>
                  <span className="font-semibold text-forest-950">22 &ndash; 26 días directos</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Calibres Demandados:</span>
                  <span className="font-semibold text-forest-950">14, 16, 18</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-charcoal/10">
              <span className="text-[11px] font-bold text-forest-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-avocado-600" />
                Atmósfera Controlada O₂ 4%
              </span>
            </div>
          </div>

          {/* 4. Latinoamérica */}
          <div className="card-highlight-white group relative bg-white p-6 sm:p-7 rounded-3xl border border-charcoal/10 shadow-xs cursor-pointer overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-avocado-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-forest-800 group-hover:text-avocado-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-forest-900/20">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold font-serif text-forest-950 group-hover:text-forest-900 transition-colors">LatAm & Cono Sur</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-800 text-cream">
                  Regional
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Abastecimiento terrestre refrigerado directo en contraestación hacia mercados del sur y distribución nacional
                estratégica.
              </p>

              <div className="space-y-2 text-xs border-t border-charcoal/10 pt-3">
                <div className="flex justify-between text-muted">
                  <span>Puntos de Entrada:</span>
                  <span className="font-semibold text-forest-950 text-right">Santiago, Buenos Aires, Tacna</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Tránsito Terrestre:</span>
                  <span className="font-semibold text-forest-950">3 &ndash; 6 días</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Calibres Demandados:</span>
                  <span className="font-semibold text-forest-950">18, 20, 22, 24</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-charcoal/10">
              <span className="text-[11px] font-bold text-forest-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-avocado-600" />
                Despacho Terrestre Directo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. PILARES LOGÍSTICOS & CONTROL DE CALIDAD                            */}
      {/* ===================================================================== */}
      <section className="bg-sand/40 py-16 border-y border-charcoal/5 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-highlight-white p-6 rounded-3xl bg-white shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold font-serif text-forest-950 text-base mb-1">Cadena de Frío 5°C</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Túneles de pre-frío forzado inmediato post-cosecha y transporte refrigerado con monitoreo permanente.
                </p>
              </div>
            </div>

            <div className="card-highlight-white p-6 rounded-3xl bg-white shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold font-serif text-forest-950 text-base mb-1">Atmósfera Controlada</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Contenedores Reefer con inyección de O₂ al 4% y CO₂ al 5% para suspender la respiración del fruto.
                </p>
              </div>
            </div>

            <div className="card-highlight-white p-6 rounded-3xl bg-white shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold font-serif text-forest-950 text-base mb-1">Dataloggers Satelitales</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Sensores de temperatura y humedad en cada palet con alertas en tiempo real vía GPS satelital.
                </p>
              </div>
            </div>

            <div className="card-highlight-white p-6 rounded-3xl bg-white shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold font-serif text-forest-950 text-base mb-1">SENASA & Certificaciones</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Inspección fitosanitaria en origen y sellos GlobalG.A.P., SMETA Sedex para ingreso sin trabas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. CTA FINAL                                                          */}
      {/* ===================================================================== */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="card-highlight-green text-cream rounded-3xl p-10 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="ebrow text-avocado-400 mb-3 block">Abastecimiento B2B</span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-cream mb-4">
              ¿Desea coordinar un embarque o programa de suministro?
            </h2>
            <p className="text-cream/80 text-base mb-8 font-light leading-relaxed">
              Consulte nuestra disponibilidad por calibres, fechas estimadas de cosecha y cotización CIF / FOB según su puerto
              de destino.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/cotizar"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all shadow-md hover:scale-105"
              >
                <span>Solicitar Cotización de Embarque</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-forest-800 hover:bg-forest-700 text-cream font-semibold text-sm transition-all border border-forest-700"
              >
                <span>Contactar a Operaciones</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}