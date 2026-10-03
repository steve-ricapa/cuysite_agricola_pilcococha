import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ScrollColorTransition } from '@/components/motion/ScrollColorTransition'
import { SedesMap } from '@/components/maps/SedesMap'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Building2, 
  Globe2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Calendar,
  Check
} from 'lucide-react'

export const ContactoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    pais: '',
    tipoRequerimiento: 'Programa de Cosecha 2026',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ticketCode, setTicketCode] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      const generatedTicket = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setTicketCode(generatedTicket)
    }, 1200)
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="text-cream font-sans transition-colors duration-700 min-h-screen relative overflow-hidden">
      {/* Transición suave de color de fondo al hacer scroll */}
      <ScrollColorTransition showProgressBar={true} />

      {/* ===================================================================== */}
      {/* 1. HERO BANNER: ATENCIÓN B2B Y MISIONES COMERCIALES                   */}
      {/* ===================================================================== */}
      <section 
        data-bg-color="#091E16" 
        className="pt-6 sm:pt-8 md:pt-12 pb-16 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="liquid-glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Esferas luminosas de fondo */}
            <div className="absolute -right-24 -bottom-24 w-[480px] h-[480px] bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Texto Editorial */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div className="section-badge">
                  <span className="section-badge-dot" />
                  <span>Atención B2B Directa & Relaciones Institucionales</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-cream leading-[1.12] tracking-tight">
                  Hablemos de negocios agrícolas y programas de exportación.
                </h1>

                <p className="text-cream/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                  Estamos a su disposición para coordinar programas de exportación marítima, visitas técnicas a nuestros fundos en el <strong className="text-white font-semibold">Valle Sagrado de Cusco</strong> o solicitudes de muestras comerciales para compradores calificados.
                </p>

                {/* 3 Pills de Atributos */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Respuesta en &lt; 24h hábiles</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <Globe2 className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Atención Multilingüe (ES / EN)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/80 border border-white/15 text-xs text-cream/90 font-medium backdrop-blur-md shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-avocado-400" />
                    <span>Sede Calca · Pisac (2,920 msnm)</span>
                  </div>
                </div>

                {/* Botones de Acción Rápida */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href="#formulario-contacto"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-avocado-900/30 hover:shadow-avocado-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Enviar Consulta Comercial</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    to="/cotizar"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream font-bold text-sm border border-white/25 hover:border-avocado-400/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Cotizador B2B Interactivo</span>
                  </Link>
                </div>
              </div>

              {/* Columna Derecha: Mascota con Portafolio & Diálogo */}
              <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-avocado-500/20 to-emerald-400/20 rounded-full blur-3xl" />
                </div>

                <div className="self-start sm:self-center mb-3 z-20">
                  <span className="matucana-pill matucana-pill-emerald shadow-xl">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Mesa de Partes & Comercio Exterior
                  </span>
                </div>

                <div className="relative group select-none flex justify-center">
                  <img 
                    src="/images/gallery/paltacontacto.png" 
                    alt="Atención Comercial - Agrícola Pilcococha" 
                    className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Micro-chip de diálogo flotante */}
                  <div className="absolute -bottom-4 sm:-bottom-2 inset-x-2 sm:inset-x-6 z-20">
                    <div className="liquid-glass-card rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl border border-white/25 shadow-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-avocado-500/20 border border-avocado-400/50 flex items-center justify-center text-avocado-300 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-[13px] text-cream font-medium leading-snug">
                        "Visite nuestros huertos en Pisac o solicite especificaciones fitosanitarias de lote en origen."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. CANALES DE ATENCIÓN + FORMULARIO B2B EN LIQUID GLASS              */}
      {/* ===================================================================== */}
      <section 
        id="formulario-contacto"
        data-bg-color="#0B2319" 
        className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-700 relative z-10"
      >
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Columna Izquierda: Canales de Atención Directos (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-avocado-400 tracking-wider block mb-1">
                    Conexión Inmediata
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-cream">
                    Canales de Atención Oficial
                  </h3>
                </div>

                <div className="space-y-5 text-sm">
                  {/* Correo Comercial */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-forest-950/60 border border-white/10 hover:border-avocado-400/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-cream font-semibold text-xs uppercase tracking-wider mb-0.5">
                        Correo Comercial B2B
                      </strong>
                      <a 
                        href="mailto:comercial@agricolapacocha.com" 
                        className="text-avocado-300 hover:text-white font-mono text-xs sm:text-sm font-semibold truncate block transition-colors"
                      >
                        comercial@agricolapacocha.com
                      </a>
                      <span className="text-[11px] text-cream/50 block mt-0.5">
                        Consultas de contratos y disponibilidad de cosecha
                      </span>
                    </div>
                    <button
                      onClick={() => copyEmail('comercial@agricolapacocha.com')}
                      className="p-2 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream/70 hover:text-cream text-xs shrink-0 cursor-pointer transition-colors"
                      title="Copiar correo"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-avocado-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Operaciones & Logística */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-forest-950/60 border border-white/10 hover:border-avocado-400/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-cream font-semibold text-xs uppercase tracking-wider mb-0.5">
                        Operaciones & Despacho
                      </strong>
                      <a 
                        href="mailto:exportaciones@agricolapacocha.com" 
                        className="text-emerald-300 hover:text-white font-mono text-xs sm:text-sm font-semibold truncate block transition-colors"
                      >
                        exportaciones@agricolapacocha.com
                      </a>
                      <span className="text-[11px] text-cream/50 block mt-0.5">
                        Trazabilidad, BL, SENASA y fletes marítimos
                      </span>
                    </div>
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-forest-950/60 border border-white/10 hover:border-avocado-400/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-cream font-semibold text-xs uppercase tracking-wider mb-0.5">
                        WhatsApp Comercial & Emergencias
                      </strong>
                      <a 
                        href="https://wa.me/51987654321?text=Hola%2C%20quisiera%20consultar%20sobre%20programas%20de%20exportaci%C3%B3n%20de%20Palta%20Hass" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-avocado-300 hover:text-white font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>+51 987 654 321</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-[11px] text-cream/50 block mt-0.5">
                        Respuesta inmediata en horario comercial
                      </span>
                    </div>
                  </div>

                  {/* Ubicación del Fundo */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-forest-950/60 border border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-forest-800/60 text-avocado-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-cream font-semibold text-xs uppercase tracking-wider mb-0.5">
                        Sede Agrícola & Planta de Acopio
                      </strong>
                      <p className="text-xs text-cream/80 leading-relaxed font-light">
                        Fundo Agrícola Pacocha SAC &bull; Sector Calca - Pisac, Valle Sagrado de los Incas, Cusco, Perú (2,920 msnm).
                      </p>
                    </div>
                  </div>

                  {/* Horario Comercial */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-forest-950/60 border border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-forest-800/60 text-avocado-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-cream font-semibold text-xs uppercase tracking-wider mb-0.5">
                        Horario de Operación
                      </strong>
                      <p className="text-xs text-cream/80 leading-relaxed font-mono">
                        Lunes a Viernes: 08:00 - 18:00 (GMT-5 / Hora de Lima)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Visitas Técnicas al Fundo */}
              <div className="liquid-glass-card rounded-3xl p-6 border border-avocado-400/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-avocado-400" />
                  <span className="text-xs uppercase tracking-widest text-avocado-300 font-bold">
                    Visitas Técnicas al Fundo
                  </span>
                </div>
                <p className="text-xs text-cream/80 leading-relaxed font-light">
                  Coordinamos visitas guiadas y auditorías de calidad en origen para jefes de importación, compradores de cadenas de supermercados e inspectores fitosanitarios durante la temporada de cosecha.
                </p>
              </div>
            </div>

            {/* Columna Derecha: Formulario B2B Liquid Glass (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
                <div className="mb-6 space-y-1">
                  <span className="text-[11px] font-mono uppercase font-bold text-avocado-400 tracking-wider block">
                    Formulario Oficial de Consulta
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-cream">
                    Envíenos un Mensaje
                  </h3>
                  <p className="text-cream/70 text-xs sm:text-sm font-light leading-relaxed">
                    Complete los campos a continuación y un ejecutivo del área comercial se comunicará en menos de 24 horas hábiles.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {ticketCode ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 sm:p-10 rounded-2xl bg-forest-950/90 border border-avocado-400/50 text-center space-y-5 my-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-avocado-500/20 text-avocado-400 border border-avocado-400/40 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs uppercase font-mono font-bold text-avocado-400 tracking-widest block">
                          Solicitud Registrada
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-serif font-black text-cream">
                          ¡Mensaje Enviado con Éxito!
                        </h4>
                        <p className="text-xs sm:text-sm text-cream/80 max-w-md mx-auto font-light leading-relaxed pt-1">
                          Gracias por contactar a <strong className="text-white">Agrícola Pilcococha</strong>. Hemos asignado un ejecutivo de cuenta para atender su requerimiento.
                        </p>
                      </div>

                      <div className="inline-block px-5 py-2.5 rounded-xl bg-forest-900 border border-white/20 text-xs font-mono font-bold text-avocado-300">
                        Código de Ticket: {ticketCode}
                      </div>

                      <div className="pt-3">
                        <button
                          onClick={() => {
                            setTicketCode(null)
                            setFormData({
                              nombre: '',
                              empresa: '',
                              cargo: '',
                              email: '',
                              telefono: '',
                              pais: '',
                              tipoRequerimiento: 'Programa de Cosecha 2026',
                              mensaje: ''
                            })
                          }}
                          className="px-6 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream text-xs font-bold transition-colors cursor-pointer"
                        >
                          Enviar Otra Consulta
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                            Nombre y Apellidos *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Ej. Roberto Sánchez"
                            className="w-full rounded-xl border border-white/15 bg-forest-950/70 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                            Empresa / Razón Social *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            placeholder="Ej. Green Imports BV"
                            className="w-full rounded-xl border border-white/15 bg-forest-950/70 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                            Correo Corporativo *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="compras@greenimports.com"
                            className="w-full rounded-xl border border-white/15 bg-forest-950/70 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                            Teléfono / WhatsApp
                          </label>
                          <input 
                            type="tel" 
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            placeholder="+31 6 12345678"
                            className="w-full rounded-xl border border-white/15 bg-forest-950/70 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                            País de Destino / Procedencia *
                          </label>
                          <select 
                            required
                            value={formData.pais}
                            onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-forest-950/80 px-4 py-3 text-sm text-cream focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors cursor-pointer"
                          >
                            <option value="" className="bg-forest-950 text-cream">Seleccione un país</option>
                            <option value="Perú" className="bg-forest-950 text-cream">Perú (Nacional)</option>
                            <option value="Países Bajos" className="bg-forest-950 text-cream">Países Bajos (Rotterdam)</option>
                            <option value="Estados Unidos" className="bg-forest-950 text-cream">Estados Unidos</option>
                            <option value="España" className="bg-forest-950 text-cream">España</option>
                            <option value="Reino Unido" className="bg-forest-950 text-cream">Reino Unido</option>
                            <option value="Alemania" className="bg-forest-950 text-cream">Alemania</option>
                            <option value="China" className="bg-forest-950 text-cream">China (Shanghái / Chancay)</option>
                            <option value="Japón" className="bg-forest-950 text-cream">Japón</option>
                            <option value="Chile" className="bg-forest-950 text-cream">Chile</option>
                            <option value="Otro" className="bg-forest-950 text-cream">Otro destino internacional</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                            Tipo de Requerimiento *
                          </label>
                          <select 
                            value={formData.tipoRequerimiento}
                            onChange={(e) => setFormData({ ...formData, tipoRequerimiento: e.target.value })}
                            className="w-full rounded-xl border border-white/15 bg-forest-950/80 px-4 py-3 text-sm text-cream focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors cursor-pointer"
                          >
                            <option value="Programa de Cosecha 2026" className="bg-forest-950 text-cream">Programa de Cosecha 2026</option>
                            <option value="Cotización FOB / CIF" className="bg-forest-950 text-cream">Cotización FOB / CIF de Contenedores</option>
                            <option value="Solicitud de Muestras" className="bg-forest-950 text-cream">Solicitud de Muestras de Fruta</option>
                            <option value="Visita Técnica a Fundo" className="bg-forest-950 text-cream">Visita Técnica al Fundo (Cusco)</option>
                            <option value="Alianza Comercial" className="bg-forest-950 text-cream">Alianza Comercial / Distribución</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-cream/90 mb-1.5 uppercase tracking-wider font-mono">
                          Mensaje o Especificaciones de Embarque *
                        </label>
                        <textarea 
                          required
                          rows={4}
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          placeholder="Indique calibres de interés, volumen proyectado, puerto de arribo o fechas estimadas de entrega..."
                          className="w-full rounded-xl border border-white/15 bg-forest-950/70 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-avocado-400 focus:ring-1 focus:ring-avocado-400 transition-colors resize-y"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 px-8 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-avocado-900/40 hover:shadow-avocado-500/50 hover:scale-[1.01] active:scale-100 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>{isSubmitting ? 'Procesando Envío...' : 'Enviar Consulta Comercial'}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-cream/50">
                        <ShieldCheck className="w-3.5 h-3.5 text-avocado-400" />
                        <span>Tratamiento confidencial de datos bajo acuerdo comercial B2B.</span>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. MAPA SATELITAL INTERACTIVO DEL FUNDO EN CUSCO                      */}
      {/* ===================================================================== */}
      <SedesMap />
    </div>
  )
}