import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { ScrollToTop } from './components/motion/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { NuestraPaltaPage } from './pages/NuestraPaltaPage'
import { AboutPage } from './pages/AboutPage'
import { ContactoPage } from './pages/ContactoPage'
import { MercadosPage } from './pages/MercadosPage'
import { CotizarPage } from './pages/CotizarPage'
import { ProcesoCalidadPage } from './pages/ProcesoCalidadPage'

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/nuestra-palta" element={<NuestraPaltaPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/proceso-calidad" element={<ProcesoCalidadPage />} />
          <Route path="/mercados" element={<MercadosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/cotizar" element={<CotizarPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans selection:bg-forest-800 selection:text-white">
        <SiteHeader />
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}