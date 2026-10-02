import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, ArrowUpRight, ShieldCheck } from 'lucide-react'

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-cream/80 pt-16 pb-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-forest-800/60">
          {/* Columna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-avocado-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M2 12h20M4.93 4.93l2.83 2.83a8 8 0 1 1-11.31 0z" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
              <span className="text-xl font-bold font-serif text-cream tracking-tight">Agrícola Pilcococha</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Fundo agroexportador peruano especializado en el cultivo sostenible, selección y exportación de Palta Hass de la más alta calidad para los mercados internacionales más exigentes.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-avocado-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-avocado-400 animate-pulse"></span>
              Origen Perú • Calidad de Exportación
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

          {/* Columna 3: Calidad y Compromiso */}
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

          {/* Columna 4: Contacto */}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-800 hover:bg-forest-700 text-cream text-xs font-semibold tracking-wide transition-all border border-forest-700/50"
              >
                Escríbenos directamente <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
          <p>© {new Date().getFullYear()} Agrícola Pilcococha S.A.C. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span className="hover:text-cream cursor-pointer transition-colors">Términos y Condiciones</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Política de Privacidad</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Responsabilidad Social</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
