import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Globe } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Nuestra Palta', href: '/nuestra-palta' },
  { label: 'Proceso y Calidad', href: '/proceso-calidad' },
  { label: 'Mercados', href: '/mercados' },
  { label: 'Contacto', href: '/contacto' },
]

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN'>('ES')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-charcoal/10 py-3' 
          : 'bg-cream/80 backdrop-blur-xs border-b border-charcoal/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO PRINCIPAL (SIN CARD, SÓLO LOGO) */}
        <Link to="/" className="flex items-center group py-0.5">
          <img 
            src="/images/fundo/logopilcococha.png" 
            alt="Agrícola Pilcococha - Palta Hass Peruana de Exportación" 
            className="h-12 sm:h-14 md:h-16 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105"
            loading="eager"
          />
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive 
                    ? 'text-forest-950 font-semibold' 
                    : 'text-charcoal/80 hover:text-forest-700'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-800 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ACCIONES LATERALES (ES/EN + BOTÓN COTIZAR) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Selector de idioma */}
          <button 
            onClick={() => setCurrentLang(currentLang === 'ES' ? 'EN' : 'ES')}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-charcoal/15 text-charcoal hover:border-forest-700 hover:text-forest-700 transition-colors"
            title="Cambiar idioma"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{currentLang}</span>
          </button>

          {/* CTA Cotización */}
          <Link
            to="/cotizar"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Cotizar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/cotizar"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-forest-800 text-white"
          >
            Cotizar
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-charcoal/10 transition-colors text-charcoal"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-charcoal/10 bg-cream px-6 py-6 flex flex-col gap-4 shadow-xl">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base py-2 border-b border-charcoal/5 flex items-center justify-between ${
                  location.pathname === item.href 
                    ? 'font-bold text-forest-900' 
                    : 'text-charcoal hover:text-forest-700'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex items-center justify-between">
            <button 
              onClick={() => setCurrentLang(currentLang === 'ES' ? 'EN' : 'ES')}
              className="flex items-center gap-2 text-sm font-medium text-charcoal"
            >
              <Globe className="w-4 h-4" />
              <span>Idioma: <strong className="text-forest-900">{currentLang}</strong></span>
            </button>
            <Link
              to="/cotizar"
              onClick={() => setMobileMenuOpen(false)}
              className="px-5 py-2 rounded-full bg-forest-800 text-white text-sm font-semibold"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}