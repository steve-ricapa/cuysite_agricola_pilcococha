import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, ArrowUpRight, ShieldCheck } from 'lucide-react'

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-cream/80 pt-16 pb-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8 items-center pb-16 border-b border-forest-800/60">
          {/* Columna 1: Marca & Identidad */}
          <div className="space-y-4">
            <div>
              <span className="block text-xl font-bold font-serif text-cream tracking-tight">
                Agrícola Pilcococha
              </span>
              <span className="text-[10px] uppercase tracking-widest text-avocado-400 font-semibold block mt-0.5">
                Valle Sagrado de los Incas
              </span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Fundo agroexportador peruano especializado en el cultivo sostenible, selección y exportación de Palta Hass de la más alta calidad para los mercados internacionales más exigentes.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-avocado-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-avocado-400 animate-pulse"></span>
              <span>Origen Perú • Calidad de Exportación</span>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-cream font-semibold text-sm tracking-wider uppercase mb-5">Navegación</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-avocado-400 transition-colors flex items-center gap-1">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="hover:text-avocado-400 transition-colors flex items-center gap-1">
                  Nuestra Empresa
                </Link>
              </li>
              <li>
                <Link to="/nuestra-palta" className="hover:text-avocado-400 transition-colors flex items-center gap-1">
                  Nuestra Palta Hass
                </Link>
              </li>
              <li>
                <Link to="/proceso-calidad" className="hover:text-avocado-400 transition-colors flex items-center gap-1">
                  Proceso y Calidad
                </Link>
              </li>
              <li>
                <Link to="/mercados" className="hover:text-avocado-400 transition-colors flex items-center gap-1">
                  Mercados y Destinos
                </Link>
              </li>
              <li>
                <Link to="/cotizar" className="text-avocado-400 hover:text-white transition-colors flex items-center gap-1 font-semibold">
                  Solicitar Cotización B2B <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ================================================================= */}
          {/* COLUMNA 3 (CENTRO): LOGO PRINCIPAL DESTACADO CON ANIMACIÓN DE AURA */}
          {/* ================================================================= */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center justify-center text-center order-first lg:order-none py-6 lg:py-0">
            <div className="relative flex items-center justify-center">
              
              {/* Capa 1: Aura Ambiental Giratoria Especular (Verde Esmeralda + Sol Dorado) */}
              <div 
                className="absolute -inset-10 sm:-inset-12 rounded-full opacity-70 animate-aura-spin pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.35) 0deg, rgba(245, 158, 11, 0.4) 90deg, rgba(164, 227, 71, 0.45) 180deg, rgba(34, 211, 238, 0.3) 270deg, rgba(16, 185, 129, 0.35) 360deg)',
                  filter: 'blur(36px)',
                }}
              />

              {/* Capa 2: Aura Pulsante Respirante (Lime + Oro Solar) */}
              <div 
                className="absolute -inset-6 sm:-inset-8 rounded-full opacity-80 animate-aura-pulse pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(164, 227, 71, 0.45) 0%, rgba(245, 158, 11, 0.3) 40%, rgba(16, 185, 129, 0.2) 70%, transparent 100%)',
                  filter: 'blur(28px)',
                }}
              />

              {/* Capa 3: Halo Solar Central Detrás de la Cumbre y el Sol */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-amber-400/35 blur-xl animate-pulse pointer-events-none" />

              {/* Logo Principal Grande (Sin Card, Pure Logo) */}
              <Link to="/" className="relative z-10 group block" title="Agrícola Pilcococha - Volver al Inicio">
                <img 
                  src="/images/fundo/logopilcococha.png" 
                  alt="Agrícola Pilcococha - Palta Hass de Exportación" 
                  className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto object-contain select-none transition-all duration-500 ease-out group-hover:scale-110 drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_28px_rgba(164,227,71,0.5)]"
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Badges / Etiqueta de procedencia */}
            <div className="mt-4 flex flex-col items-center gap-1 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/90 text-avocado-300 font-mono text-[10px] font-bold uppercase tracking-widest border border-avocado-400/30 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-avocado-400 animate-pulse" />
                Valle Sagrado • Cusco
              </span>
              <span className="text-[9.5px] text-cream/50 font-mono tracking-wider">
                Fundo Productor & Empaque
              </span>
            </div>
          </div>

          {/* Columna 4: Estándares y Calidad */}
          <div>
            <h4 className="text-cream font-semibold text-sm tracking-wider uppercase mb-5">Estándares y Calidad</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                <span>Buenas Prácticas Agrícolas (BPA) y control fitosanitario</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                <span>Materia seca óptima (&gt;21.5% a 24%) para maduración uniforme</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                <span>Trazabilidad completa de lote desde el fundo hasta destino</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                <span>Cadena de frío ininterrumpida</span>
              </li>
            </ul>
          </div>

          {/* Columna 5: Contacto */}
          <div>
            <h4 className="text-cream font-semibold text-sm tracking-wider uppercase mb-5">Contacto Comercial</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                <span>Fundo Pilcococha, Valle Interandino / Costa, Perú</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-avocado-400 shrink-0" />
                <a href="mailto:comercial@agricolapilcococha.com" className="hover:text-white transition-colors">
                  comercial@agricolapilcococha.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-avocado-400 shrink-0" />
                <a href="tel:+51999999999" className="hover:text-white transition-colors">
                  +51 987 654 321
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream text-xs font-semibold tracking-wide transition-all border border-forest-700/50 hover:scale-105"
              >
                Escríbenos directamente <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>© {new Date().getFullYear()} Agrícola Pilcococha S.A.C. Todos los derechos reservados.</p>

          {/* Créditos de autor */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 border border-forest-800 text-cream/80 text-[11px] shadow-xs hover:border-avocado-400/50 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-avocado-400 animate-pulse" />
            <span>Desarrollado por <strong className="text-cream font-semibold hover:text-avocado-300 transition-colors">Diego Ramos Gonzales</strong></span>
          </div>

          <div className="flex gap-6 text-cream/50">
            <span className="hover:text-cream cursor-pointer transition-colors">Términos y Condiciones</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Política de Privacidad</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Responsabilidad Social</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
