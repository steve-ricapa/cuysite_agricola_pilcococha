import React, { useState } from 'react'
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

// Partículas ambientales para la sección de formatos
const ambientParticles = {
  caja: [
    { icon: '🥑', left: 6, top: 18, delay: 0.1, duration: 4.2, size: 26, opacity: 0.85 },
    { icon: '🍃', left: 19, top: 40, delay: 1.0, duration: 3.6, size: 22, opacity: 0.8 },
    { icon: '✨', left: 34, top: 22, delay: 0.5, duration: 3.0, size: 18, opacity: 0.9 },
    { icon: '🌱', left: 48, top: 50, delay: 1.6, duration: 4.4, size: 24, opacity: 0.75 },
    { icon: '🥑', left: 64, top: 16, delay: 0.8, duration: 3.9, size: 28, opacity: 0.9 },
    { icon: '🍃', left: 78, top: 38, delay: 1.3, duration: 3.5, size: 22, opacity: 0.8 },
    { icon: '✨', left: 91, top: 24, delay: 0.3, duration: 3.2, size: 20, opacity: 0.95 },
  ],
  master: [
    { icon: '📦', left: 8, top: 22, delay: 0.1, duration: 4.0, size: 26, opacity: 0.85 },
    { icon: '🏷️', left: 23, top: 46, delay: 1.2, duration: 3.7, size: 22, opacity: 0.8 },
    { icon: '⚡', left: 39, top: 18, delay: 0.4, duration: 3.1, size: 20, opacity: 0.9 },
    { icon: '📦', left: 54, top: 48, delay: 1.5, duration: 4.2, size: 28, opacity: 0.85 },
    { icon: '📐', left: 69, top: 28, delay: 0.7, duration: 3.6, size: 22, opacity: 0.75 },
    { icon: '📦', left: 84, top: 20, delay: 1.3, duration: 3.9, size: 26, opacity: 0.85 },
    { icon: '⚡', left: 94, top: 38, delay: 0.2, duration: 3.3, size: 18, opacity: 0.95 },
  ],
  reefer: [
    { icon: '❄️', left: 5, top: 15, delay: 0.1, duration: 3.6, size: 28, opacity: 0.95 },
    { icon: '🧊', left: 18, top: 32, delay: 0.9, duration: 4.0, size: 24, opacity: 0.85 },
    { icon: '✦', left: 33, top: 20, delay: 0.3, duration: 3.0, size: 20, opacity: 0.95 },
    { icon: '❄', left: 47, top: 44, delay: 1.4, duration: 3.7, size: 30, opacity: 0.9 },
    { icon: '🧊', left: 62, top: 12, delay: 0.7, duration: 4.1, size: 22, opacity: 0.8 },
    { icon: '❄️', left: 77, top: 26, delay: 1.1, duration: 3.5, size: 28, opacity: 0.95 },
    { icon: '✧', left: 90, top: 36, delay: 0.4, duration: 3.2, size: 22, opacity: 0.95 },
  ]
}

export const NuestraPaltaPage: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'caja' | 'master' | 'reefer'>('reefer')
  const [hoveredFormat, setHoveredFormat] = useState<'caja' | 'master' | 'reefer' | null>(null)
  const currentFormat = hoveredFormat || selectedFormat
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
              <span className="ebrow text-avocado-400 mb-3 block">Nuestro Producto Estrella</span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
                Palta Hass de Exportación Peruana.
              </h1>
              <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Reconocida mundialmente por su textura cremosa, alto contenido de aceites saludables y piel rugosa que cambia a un tono oscuro al madurar. Cosechada bajo estrictas normas internacionales.
              </p>
            </div>

            {/* Imagen a la derecha: sin card, sin marco, integrada naturalmente */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <img 
                src="/images/gallery/paltaclaidadnuestrapalta.png" 
                alt="Palta Hass Calidad Mundial - Agrícola Pilcococha" 
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
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

          {/* Grilla con Diseño de Cajas de Exportación en 3D Isométrico con Relieve */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4 pb-8">
            {calibresData.map((item) => (
              <div 
                key={item.calibre} 
                className="group/box relative transition-all duration-300 ease-out transform hover:-translate-y-3.5 hover:scale-[1.02] cursor-pointer"
                style={{
                  filter: 'drop-shadow(0 14px 14px rgba(50, 30, 10, 0.14)) drop-shadow(-6px 18px 20px rgba(40, 20, 5, 0.10))'
                }}
              >
                {/* 1. CARA SUPERIOR (TAPA EN PERSPECTIVA 3D) */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[28px] z-10 overflow-hidden border-t-2 border-l border-[#c4a57b] transition-all duration-300 group-hover/box:brightness-105"
                  style={{
                    clipPath: 'polygon(22px 0px, 100% 0px, calc(100% - 22px) 100%, 0px 100%)',
                    background: 'linear-gradient(135deg, #f7ebd9 0%, #ebd7be 50%, #dfc5a6 100%)',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160, 110, 60, 0.12) 4px)'
                  }}
                >
                  {/* Troquel superior de ventilación / agarradera de la caja */}
                  <div className="absolute inset-0 flex items-center justify-center pl-3">
                    <div className="w-24 sm:w-28 h-3.5 bg-[#3a2313] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] border border-[#211208] flex items-center justify-center">
                      <div className="w-16 h-1 bg-[#1a0c04] rounded-full opacity-60" />
                    </div>
                  </div>

                  {/* Orejas de encastre superiores (tabs) */}
                  <div className="absolute -top-1 left-7 w-7 h-2 bg-[#b89569] rounded-t-sm shadow-xs border-t border-l border-r border-[#8d693f]" />
                  <div className="absolute -top-1 right-10 w-7 h-2 bg-[#b89569] rounded-t-sm shadow-xs border-t border-l border-r border-[#8d693f]" />
                </div>

                {/* 2. CARA LATERAL DERECHA (LADO EN PERSPECTIVA 3D CON SOMBRA Y VENTILACIÓN) */}
                <div 
                  className="absolute top-0 right-0 w-[22px] bottom-0 z-10 overflow-hidden border-r-2 border-b-2 border-[#876337] transition-all duration-300 group-hover/box:brightness-105"
                  style={{
                    clipPath: 'polygon(0px 28px, 100% 0px, 100% calc(100% - 28px), 0px 100%)',
                    background: 'linear-gradient(90deg, #cfab7d 0%, #ba9363 50%, #a87f4c 100%)',
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(55, 30, 8, 0.18) 4px)'
                  }}
                >
                  {/* Orificios laterales troquelados para flujo de frío en contenedor marítimo */}
                  <div className="absolute inset-0 flex flex-col items-center justify-around py-12 pl-0.5 pointer-events-none">
                    <div className="w-2 h-7 bg-[#2d1a0d] rounded-full shadow-inner opacity-85" />
                    <div className="w-2 h-7 bg-[#2d1a0d] rounded-full shadow-inner opacity-85" />
                  </div>

                  {/* Sello vertical impreso en tinta marrón */}
                  <div className="absolute inset-y-0 right-1 flex items-center justify-center pointer-events-none">
                    <span className="text-[7px] font-mono font-black text-[#563417] rotate-90 tracking-widest whitespace-nowrap opacity-80">
                      HASS • PERÚ
                    </span>
                  </div>
                </div>

                {/* 3. CARA FRONTAL (FRENTE DE LA CAJA CON RELIEVE 3D, ESTAMPADOS Y CALIBRE) */}
                <div 
                  className="relative mr-[22px] mt-[28px] bg-gradient-to-b from-[#f3e3ce] via-[#ebd9c1] to-[#dfcbb1] rounded-bl-xl p-5 border-2 border-[#c5a982] shadow-[inset_1px_1px_0_rgba(255,255,255,0.7),inset_-2px_-2px_0_rgba(90,55,25,0.2)] flex flex-col justify-between overflow-visible transition-all duration-300 group-hover/box:bg-[#f6e9d7]"
                >
                  {/* Orejas de encastre inferiores de la base de la caja */}
                  <div className="absolute -bottom-2 left-6 w-8 h-2.5 bg-[#b89569] rounded-b-md shadow-xs border-b border-l border-r border-[#8d693f]" />
                  <div className="absolute -bottom-2 right-8 w-8 h-2.5 bg-[#b89569] rounded-b-md shadow-xs border-b border-l border-r border-[#8d693f]" />

                  {/* Cabecera estampada de la caja */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#714f2e] border-b border-[#c8ad88] pb-2 mb-3">
                      <span className="flex items-center gap-1.5">
                        <span>📦</span>
                        <span className="tracking-wider">AGRÍCOLA PILCOCOCHA</span>
                      </span>
                      <span className="bg-[#b89569]/30 border border-[#b89569]/40 px-1.5 py-0.5 rounded text-[9px] font-bold text-[#5c3917]">
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
                  <div className="my-2.5 py-0.5 flex items-center justify-center">
                    <div className="w-20 h-4 bg-[#342011] rounded-full shadow-[inset_0_3px_5px_rgba(0,0,0,0.75)] border border-[#211309] flex items-center justify-center">
                      <div className="w-14 h-1.5 bg-[#190d05] rounded-full opacity-70" />
                    </div>
                  </div>

                  {/* Visualización de Paltas adentro de la caja (Bandeja / Alvéolo interior) */}
                  <div className="bg-[#dbc3a3] p-2.5 rounded-xl border border-[#c4a57b] shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)] mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4a3421]">
                      {item.fr}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.avocados }).map((_, aIdx) => (
                        <span key={aIdx} className="text-sm drop-shadow-xs transition-transform duration-200 group-hover/box:scale-110" title="Palta Hass">🥑</span>
                      ))}
                    </div>
                  </div>

                  {/* Pie de caja con sellos de exportación */}
                  <div className="pt-2 border-t border-[#c8ad88] flex items-center justify-between text-[10px] font-bold text-[#6d4d2d]">
                    <span className="tracking-widest uppercase">CAT 1 • EXPORT GRADE</span>
                    <span className="font-mono text-[#8a633b]">4.0 KG NET WT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos de Presentación y Embarque con Diseño 3D Isométrico y Partículas Interactivas */}
      <section className="max-w-7xl mx-auto px-6 mb-24 relative">
        {/* Capa de Partículas Ambientales para todo el Layout */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl -z-10">
          {/* Ambient Glow según el formato activo */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${
            currentFormat === 'reefer' 
              ? 'opacity-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent'
              : currentFormat === 'master'
              ? 'opacity-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-transparent'
              : 'opacity-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent'
          }`} />

          {/* Partículas flotantes que vuelan por todo el layout según el formato seleccionado */}
          {ambientParticles[currentFormat].map((p, idx) => (
            <div
              key={`${currentFormat}-${idx}`}
              className={`absolute select-none pointer-events-none transition-all ${
                currentFormat === 'reefer' ? 'animate-snow-flutter' : 'animate-float-particles'
              }`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}px`,
                opacity: p.opacity,
              }}
            >
              {p.icon}
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="ebrow text-forest-800 mb-2 block">Empaque & Logística Especializada</span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
            Formatos de Presentación y Embarque
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Estructuras en 3D diseñadas según la necesidad de cada comprador: desde góndola directa de supermercado hasta atmósfera controlada transoceánica.
          </p>

          {/* Selector interactivo de formato */}
          <div className="mt-6 inline-flex p-1.5 rounded-full bg-sand/80 border border-charcoal/10 shadow-xs gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedFormat('caja')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentFormat === 'caja'
                  ? 'bg-forest-800 text-cream shadow-sm scale-105'
                  : 'text-charcoal/70 hover:text-forest-950'
              }`}
            >
              <span>🥑</span>
              <span>Caja 4.0 kg Retail</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFormat('master')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentFormat === 'master'
                  ? 'bg-amber-700 text-cream shadow-sm scale-105'
                  : 'text-charcoal/70 hover:text-forest-950'
              }`}
            >
              <span>📦</span>
              <span>Master Box 10.0 kg</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedFormat('reefer')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentFormat === 'reefer'
                  ? 'bg-cyan-800 text-white shadow-sm scale-105 ring-1 ring-cyan-400/50'
                  : 'text-charcoal/70 hover:text-forest-950'
              }`}
            >
              <span>❄️</span>
              <span>Reefer 40&apos; High Cube</span>
            </button>
          </div>
        </div>

        {/* Las 3 Cards en 3D Isométrico con relieve, perspectiva y partículas vivas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 pt-4 pb-8">
          
          {/* FORMATO 1: CAJA 4.0 KG NETA (Plató / Display Tray de Retail) en 3D */}
          <div 
            onClick={() => setSelectedFormat('caja')}
            onMouseEnter={() => setHoveredFormat('caja')}
            onMouseLeave={() => setHoveredFormat(null)}
            className={`group/format relative transition-all duration-300 ease-out transform hover:-translate-y-3.5 hover:scale-[1.02] cursor-pointer ${
              selectedFormat === 'caja' ? 'scale-[1.02] -translate-y-2' : ''
            }`}
            style={{
              filter: selectedFormat === 'caja'
                ? 'drop-shadow(0 20px 22px rgba(40, 70, 30, 0.22)) drop-shadow(-8px 24px 26px rgba(30, 50, 20, 0.16))'
                : 'drop-shadow(0 14px 14px rgba(50, 30, 10, 0.14)) drop-shadow(-6px 18px 20px rgba(40, 20, 5, 0.10))'
            }}
          >
            {/* 1. Cara Superior 3D (Tapa Abierta con visión de bandeja retail) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[28px] z-10 overflow-hidden border-t-2 border-l border-[#c4a57b] transition-all duration-300 group-hover/format:brightness-105"
              style={{
                clipPath: 'polygon(22px 0px, 100% 0px, calc(100% - 22px) 100%, 0px 100%)',
                background: 'linear-gradient(135deg, #f7ebd9 0%, #ebd7be 50%, #dfc5a6 100%)',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160, 110, 60, 0.12) 4px)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center pl-3">
                <div className="w-28 h-3.5 bg-[#dfc5a6] rounded-full border border-[#b89569] shadow-inner flex items-center justify-center gap-1.5">
                  <span className="text-[9px]">🥑</span>
                  <span className="text-[8px] font-bold text-[#5c3e24]">RETAIL DISPLAY TRAY</span>
                  <span className="text-[9px]">🥑</span>
                </div>
              </div>
              <div className="absolute -top-1 left-7 w-7 h-2 bg-[#b89569] rounded-t-sm shadow-xs border-t border-l border-r border-[#8d693f]" />
              <div className="absolute -top-1 right-10 w-7 h-2 bg-[#b89569] rounded-t-sm shadow-xs border-t border-l border-r border-[#8d693f]" />
            </div>

            {/* 2. Cara Lateral Derecha 3D (Lado de cartón C-Flute con ventilación) */}
            <div 
              className="absolute top-0 right-0 w-[22px] bottom-0 z-10 overflow-hidden border-r-2 border-b-2 border-[#876337] transition-all duration-300 group-hover/format:brightness-105"
              style={{
                clipPath: 'polygon(0px 28px, 100% 0px, 100% calc(100% - 28px), 0px 100%)',
                background: 'linear-gradient(90deg, #cfab7d 0%, #ba9363 50%, #a87f4c 100%)',
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(55, 30, 8, 0.18) 4px)'
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-around py-12 pl-0.5 pointer-events-none">
                <div className="w-2 h-7 bg-[#2d1a0d] rounded-full shadow-inner opacity-85" />
                <div className="w-2 h-7 bg-[#2d1a0d] rounded-full shadow-inner opacity-85" />
              </div>
              <div className="absolute inset-y-0 right-1 flex items-center justify-center pointer-events-none">
                <span className="text-[7px] font-mono font-black text-[#563417] rotate-90 tracking-widest whitespace-nowrap opacity-80">
                  4.0 KG • RET
                </span>
              </div>
            </div>

            {/* 3. Cara Frontal 3D con relieve */}
            <div className={`relative mr-[22px] mt-[28px] rounded-bl-2xl p-6 border-2 shadow-[inset_1px_1px_0_rgba(255,255,255,0.7),inset_-2px_-2px_0_rgba(90,55,25,0.2)] flex flex-col justify-between overflow-hidden transition-all duration-300 ${
              selectedFormat === 'caja' 
                ? 'bg-gradient-to-b from-[#fbf4ea] via-[#f2e5d3] to-[#e4d1b9] border-emerald-600/50 ring-2 ring-emerald-500/40' 
                : 'bg-gradient-to-b from-[#f5e8d7] via-[#ebdac2] to-[#dfcbb1] border-[#c5a982] hover:bg-[#fbf4ea]'
            }`}>
              {/* Partículas flotantes locales (aguacates y hojitas frescas) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-bl-xl z-20">
                <span className={`absolute bottom-6 left-6 text-xl animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'caja' ? 'opacity-90' : 'opacity-0 group-hover/format:opacity-90'
                }`} style={{ animationDelay: '0.1s' }}>🥑</span>
                <span className={`absolute bottom-16 right-10 text-lg animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'caja' ? 'opacity-85' : 'opacity-0 group-hover/format:opacity-85'
                }`} style={{ animationDelay: '0.8s' }}>🍃</span>
                <span className={`absolute bottom-28 left-1/2 text-sm animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'caja' ? 'opacity-95' : 'opacity-0 group-hover/format:opacity-95'
                }`} style={{ animationDelay: '1.5s' }}>✨</span>
                <span className={`absolute bottom-8 right-1/4 text-lg animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'caja' ? 'opacity-80' : 'opacity-0 group-hover/format:opacity-80'
                }`} style={{ animationDelay: '2.1s' }}>🥑</span>
              </div>

              {/* Orejas de encastre inferiores */}
              <div className="absolute -bottom-2 left-6 w-8 h-2.5 bg-[#b89569] rounded-b-md shadow-xs border-b border-l border-r border-[#8d693f]" />
              <div className="absolute -bottom-2 right-8 w-8 h-2.5 bg-[#b89569] rounded-b-md shadow-xs border-b border-l border-r border-[#8d693f]" />

              {/* Cabecera y badge de estado */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#3d2716] text-[#dfc59f] font-mono text-[11px] font-black tracking-wider uppercase shadow-xs">
                    Plató Abierto • 4.0 kg
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                    selectedFormat === 'caja' 
                      ? 'bg-emerald-600/20 text-emerald-800 border-emerald-600/40 flex items-center gap-1 font-mono' 
                      : 'bg-[#b89569]/30 text-[#714f2e] border-[#b89569]/40'
                  }`}>
                    {selectedFormat === 'caja' ? <><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"/>ACTIVO</> : 'Retail Ready'}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#dfcbaf] border-2 border-[#b9986d] flex items-center justify-center mb-4 text-[#3d2716] shadow-sm transition-transform duration-300 group-hover/format:scale-110 group-hover/format:rotate-3">
                  <Box className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-black font-serif text-[#2e1d0f] mb-2 group-hover/format:text-forest-950 transition-colors">
                  Caja 4.0 kg Neta
                </h3>
                <p className="text-xs text-[#5c3e24] leading-relaxed mb-4">
                  Caja abierta de cartón corrugado de alta resistencia estructural (C-Flute). Diseñada para exposición directa en góndola de supermercados en Europa y EE.UU.
                </p>
              </div>

              {/* Especificaciones Técnicas */}
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
                <span className="text-[11px] font-mono bg-white/80 px-2 py-0.5 rounded border border-[#b9986d] shadow-xs">Top Seller</span>
              </div>
            </div>
          </div>

          {/* FORMATO 2: CAJA 10.0 KG GRANEL (Master Box Industrial) en 3D */}
          <div 
            onClick={() => setSelectedFormat('master')}
            onMouseEnter={() => setHoveredFormat('master')}
            onMouseLeave={() => setHoveredFormat(null)}
            className={`group/format relative transition-all duration-300 ease-out transform hover:-translate-y-3.5 hover:scale-[1.02] cursor-pointer ${
              selectedFormat === 'master' ? 'scale-[1.02] -translate-y-2' : ''
            }`}
            style={{
              filter: selectedFormat === 'master'
                ? 'drop-shadow(0 20px 22px rgba(90, 50, 10, 0.24)) drop-shadow(-8px 24px 26px rgba(70, 40, 10, 0.18))'
                : 'drop-shadow(0 14px 14px rgba(50, 30, 10, 0.14)) drop-shadow(-6px 18px 20px rgba(40, 20, 5, 0.10))'
            }}
          >
            {/* 1. Cara Superior 3D (Tapa con cinta zunchada industrial de alta resistencia) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[28px] z-10 overflow-hidden border-t-2 border-l border-[#a47f52] transition-all duration-300 group-hover/format:brightness-105"
              style={{
                clipPath: 'polygon(22px 0px, 100% 0px, calc(100% - 22px) 100%, 0px 100%)',
                background: 'linear-gradient(135deg, #ecd6b8 0%, #dfc49f 50%, #d1b188 100%)',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(140, 95, 50, 0.14) 4px)'
              }}
            >
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-amber-400 border-y border-amber-600 flex items-center justify-center shadow-xs">
                <span className="text-[7.5px] font-black text-black tracking-widest uppercase">HEAVY DUTY PACK • B2B EXPORT</span>
              </div>
              <div className="absolute -top-1 left-7 w-7 h-2 bg-[#9c7748] rounded-t-sm shadow-xs border-t border-l border-r border-[#7a5930]" />
              <div className="absolute -top-1 right-10 w-7 h-2 bg-[#9c7748] rounded-t-sm shadow-xs border-t border-l border-r border-[#7a5930]" />
            </div>

            {/* 2. Cara Lateral Derecha 3D (Lado reforzado BC-Flute con cinta y fleje) */}
            <div 
              className="absolute top-0 right-0 w-[22px] bottom-0 z-10 overflow-hidden border-r-2 border-b-2 border-[#79542a] transition-all duration-300 group-hover/format:brightness-105"
              style={{
                clipPath: 'polygon(0px 28px, 100% 0px, 100% calc(100% - 28px), 0px 100%)',
                background: 'linear-gradient(90deg, #c49d6d 0%, #b28854 50%, #9e7440 100%)',
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(50, 25, 5, 0.20) 4px)'
              }}
            >
              <div className="absolute inset-x-0 top-1/3 h-3 bg-amber-500/80 border-y border-amber-700 pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-around py-12 pl-0.5 pointer-events-none">
                <div className="w-2.5 h-8 bg-[#241306] rounded-full shadow-inner opacity-85" />
              </div>
              <div className="absolute inset-y-0 right-1 flex items-center justify-center pointer-events-none">
                <span className="text-[7px] font-mono font-black text-[#4e2d12] rotate-90 tracking-widest whitespace-nowrap opacity-80">
                  10.0 KG • HEAVY
                </span>
              </div>
            </div>

            {/* 3. Cara Frontal 3D con relieve */}
            <div className={`relative mr-[22px] mt-[28px] rounded-bl-2xl p-6 border-2 shadow-[inset_1px_1px_0_rgba(255,255,255,0.6),inset_-2px_-2px_0_rgba(70,40,15,0.25)] flex flex-col justify-between overflow-hidden transition-all duration-300 ${
              selectedFormat === 'master'
                ? 'bg-gradient-to-b from-[#f3e3ce] via-[#ebd5bb] to-[#dcbfa3] border-amber-600/60 ring-2 ring-amber-500/40'
                : 'bg-gradient-to-b from-[#ebd7be] via-[#dfc4a2] to-[#d2b18b] border-[#b89569] hover:bg-[#f3e3ce]'
            }`}>
              {/* Partículas flotantes locales (paquetes y sellos industriales) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-bl-xl z-20">
                <span className={`absolute bottom-6 left-8 text-xl animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'master' ? 'opacity-90' : 'opacity-0 group-hover/format:opacity-90'
                }`} style={{ animationDelay: '0.1s' }}>📦</span>
                <span className={`absolute bottom-16 right-8 text-base animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'master' ? 'opacity-85' : 'opacity-0 group-hover/format:opacity-85'
                }`} style={{ animationDelay: '0.7s' }}>🏷️</span>
                <span className={`absolute bottom-28 left-1/3 text-sm animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'master' ? 'opacity-95' : 'opacity-0 group-hover/format:opacity-95'
                }`} style={{ animationDelay: '1.4s' }}>⚡</span>
                <span className={`absolute bottom-8 right-1/3 text-xl animate-float-particles transition-opacity duration-300 ${
                  currentFormat === 'master' ? 'opacity-80' : 'opacity-0 group-hover/format:opacity-80'
                }`} style={{ animationDelay: '2.0s' }}>📦</span>
              </div>

              {/* Orejas de encastre inferiores */}
              <div className="absolute -bottom-2 left-6 w-8 h-2.5 bg-[#9c7748] rounded-b-md shadow-xs border-b border-l border-r border-[#7a5930]" />
              <div className="absolute -bottom-2 right-8 w-8 h-2.5 bg-[#9c7748] rounded-b-md shadow-xs border-b border-l border-r border-[#7a5930]" />

              <div className="pt-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#271a0f] text-amber-300 font-mono text-[11px] font-black tracking-wider uppercase shadow-xs">
                    Master Box • 10.0 kg
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                    selectedFormat === 'master'
                      ? 'bg-amber-600/20 text-amber-900 border-amber-600/40 flex items-center gap-1 font-mono'
                      : 'bg-amber-400/20 text-[#5c3e24] border-amber-500/30'
                  }`}>
                    {selectedFormat === 'master' ? <><span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"/>ACTIVO</> : 'Granel B2B'}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#cbaf8a] border-2 border-[#a47f52] flex items-center justify-center mb-4 text-[#2e1d0f] shadow-sm transition-transform duration-300 group-hover/format:scale-110 group-hover/format:-rotate-3">
                  <Layers className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-black font-serif text-[#271a0f] mb-2 group-hover/format:text-amber-950 transition-colors">
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
                <span className="text-[11px] font-mono bg-white/80 px-2 py-0.5 rounded border border-[#a47f52] shadow-xs">Económico</span>
              </div>
            </div>
          </div>

          {/* FORMATO 3: CONTENEDOR REFRIGERADO 40' HIGH CUBE (Reefer Marítimo con copos de nieve y frío) */}
          <div 
            onClick={() => setSelectedFormat('reefer')}
            onMouseEnter={() => setHoveredFormat('reefer')}
            onMouseLeave={() => setHoveredFormat(null)}
            className={`group/format relative transition-all duration-300 ease-out transform hover:-translate-y-3.5 hover:scale-[1.02] cursor-pointer ${
              selectedFormat === 'reefer' ? 'scale-[1.02] -translate-y-2' : ''
            }`}
            style={{
              filter: selectedFormat === 'reefer'
                ? 'drop-shadow(0 20px 24px rgba(6, 182, 212, 0.28)) drop-shadow(-8px 24px 28px rgba(15, 23, 42, 0.35))'
                : 'drop-shadow(0 14px 16px rgba(15, 23, 42, 0.25)) drop-shadow(-6px 18px 22px rgba(6, 78, 99, 0.15))'
            }}
          >
            {/* 1. Cara Superior 3D (Techo acanalado metálico de contenedor reefer con esquineros de izaje) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[28px] z-10 overflow-hidden border-t-2 border-l border-cyan-600 transition-all duration-300 group-hover/format:brightness-110"
              style={{
                clipPath: 'polygon(22px 0px, 100% 0px, calc(100% - 22px) 100%, 0px 100%)',
                background: 'linear-gradient(135deg, #1e3a5f 0%, #0f233a 50%, #0b1a2c 100%)',
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(34, 211, 238, 0.22) 7px)'
              }}
            >
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-[7.5px] font-mono font-black text-cyan-300 tracking-widest uppercase">
                  REEFER 40&apos; HIGH CUBE • COLD CHAIN 5°C
                </span>
              </div>
              {/* Esquineros de izaje portuario (corner castings) */}
              <div className="absolute top-1 left-7 w-4 h-3 bg-cyan-900 border border-cyan-400/60 rounded-xs shadow-inner" />
              <div className="absolute top-1 right-9 w-4 h-3 bg-cyan-900 border border-cyan-400/60 rounded-xs shadow-inner" />
            </div>

            {/* 2. Cara Lateral Derecha 3D (Pared acanalada de acero naval con barras de cierre) */}
            <div 
              className="absolute top-0 right-0 w-[22px] bottom-0 z-10 overflow-hidden border-r-2 border-b-2 border-cyan-900 transition-all duration-300 group-hover/format:brightness-110"
              style={{
                clipPath: 'polygon(0px 28px, 100% 0px, 100% calc(100% - 28px), 0px 100%)',
                background: 'linear-gradient(90deg, #0f1f33 0%, #091522 50%, #040910 100%)',
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(34, 211, 238, 0.15) 5px)'
              }}
            >
              {/* Barra de cierre vertical de la puerta del contenedor */}
              <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 w-1 bg-cyan-500/40 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
              <div className="absolute inset-y-0 right-1 flex items-center justify-center pointer-events-none">
                <span className="text-[7px] font-mono font-black text-cyan-400/80 rotate-90 tracking-widest whitespace-nowrap">
                  CA-TECH • 5°C
                </span>
              </div>
            </div>

            {/* 3. Cara Frontal 3D con pantalla digital y atmósfera controlada */}
            <div className={`relative mr-[22px] mt-[28px] rounded-bl-2xl p-6 border-2 text-white shadow-[inset_1px_1px_0_rgba(34,211,238,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden transition-all duration-300 ${
              selectedFormat === 'reefer'
                ? 'bg-gradient-to-b from-[#11243c] via-[#0b1828] to-[#040912] border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                : 'bg-gradient-to-b from-[#0e1e33] via-[#091524] to-[#040a12] border-cyan-700/60 hover:border-cyan-400/60'
            }`}>
              {/* COPOS DE NIEVE Y CRISTALES DE HIELO VOLANDO POR LA CARD */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-bl-xl z-20">
                <span className={`absolute -top-1 left-8 text-2xl animate-snow-flutter transition-opacity duration-300 ${
                  currentFormat === 'reefer' ? 'opacity-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' : 'opacity-0 group-hover/format:opacity-100'
                }`} style={{ animationDelay: '0.1s' }}>❄️</span>
                <span className={`absolute top-12 right-8 text-xl animate-snow-flutter transition-opacity duration-300 ${
                  currentFormat === 'reefer' ? 'opacity-90 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]' : 'opacity-0 group-hover/format:opacity-90'
                }`} style={{ animationDelay: '0.7s' }}>🧊</span>
                <span className={`absolute top-28 left-1/3 text-lg animate-snow-flutter transition-opacity duration-300 ${
                  currentFormat === 'reefer' ? 'opacity-95 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' : 'opacity-0 group-hover/format:opacity-95'
                }`} style={{ animationDelay: '1.3s' }}>❄</span>
                <span className={`absolute top-44 right-1/4 text-sm animate-snow-flutter transition-opacity duration-300 ${
                  currentFormat === 'reefer' ? 'opacity-90 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]' : 'opacity-0 group-hover/format:opacity-90'
                }`} style={{ animationDelay: '1.9s' }}>✦</span>
                <span className={`absolute bottom-10 left-12 text-2xl animate-snow-flutter transition-opacity duration-300 ${
                  currentFormat === 'reefer' ? 'opacity-95 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]' : 'opacity-0 group-hover/format:opacity-95'
                }`} style={{ animationDelay: '2.5s' }}>❄️</span>
                <span className={`absolute bottom-24 right-10 text-lg animate-snow-flutter transition-opacity duration-300 ${
                  currentFormat === 'reefer' ? 'opacity-85' : 'opacity-0 group-hover/format:opacity-85'
                }`} style={{ animationDelay: '3.1s' }}>🧊</span>
              </div>

              {/* Patas de acero del contenedor */}
              <div className="absolute -bottom-2 left-6 w-8 h-2.5 bg-cyan-950 rounded-b-md shadow-xs border-b border-l border-r border-cyan-800" />
              <div className="absolute -bottom-2 right-8 w-8 h-2.5 bg-cyan-950 rounded-b-md shadow-xs border-b border-l border-r border-cyan-800" />

              <div className="pt-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Atmósfera Controlada</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                    selectedFormat === 'reefer'
                      ? 'bg-cyan-500/25 text-cyan-300 border-cyan-400/50 flex items-center gap-1 font-mono shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'bg-cyan-950 text-cyan-400 border-cyan-800'
                  }`}>
                    {selectedFormat === 'reefer' ? <><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"/>ACTIVO</> : 'CA TECH'}
                  </span>
                </div>

                {/* Unidad de Refrigeración con Pantalla Digital */}
                <div className="bg-slate-950/90 backdrop-blur-xs p-3.5 rounded-2xl border border-cyan-500/30 mb-4 flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ThermometerSnowflake className="w-7 h-7 text-cyan-400 animate-pulse" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Temperatura Set</span>
                      <span className="text-2xl font-mono font-black text-emerald-400 tracking-wider flex items-center gap-1 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                        +5.0 °C
                      </span>
                    </div>
                  </div>

                  <div className="text-right border-l border-slate-800 pl-3">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Atmósfera</span>
                    <span className="text-xs font-mono text-cyan-300 font-bold drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">O₂ 4% | CO₂ 5%</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black font-serif text-white mb-2 group-hover/format:text-cyan-300 transition-colors">
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
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
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
                <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-700/80 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                  Export Ready
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}