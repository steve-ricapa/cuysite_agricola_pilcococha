import React, { useState } from 'react'
import { SectionTitle } from '@/components/sections/SectionTitle'
import { Button } from '@/components/ui/button'
import { SedesMap } from '@/components/maps/SedesMap'
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react'

export const ContactoPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="py-12 md:py-16">
      {/* Banner Superior */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-forest-950 text-cream rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Resplandor decorativo de fondo */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-avocado-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-forest-800/40 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Texto a la izquierda */}
            <div className="lg:col-span-7 xl:col-span-7">
              <span className="ebrow text-avocado-400 mb-3 block">Contacto Directo B2B</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
                Hablemos de negocios agrícolas.
              </h1>
              <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Estamos a su disposición para coordinar programas de exportación, visitas técnicas a nuestros fundos en el Valle Sagrado de Cusco o solicitudes de muestras comerciales.
              </p>
            </div>

            {/* Imagen a la derecha: sin card, sin marco, integrada naturalmente */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <img 
                src="/images/gallery/paltacontacto.png" 
                alt="Hablemos de negocios agrícolas - Agrícola Pilcococha" 
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formulario e Información de Contacto */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Tarjeta de Información */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-highlight-white bg-white rounded-3xl p-8 shadow-xs border border-charcoal/10">
              <h3 className="text-2xl font-bold font-serif text-forest-950 mb-6">Canales de Atención</h3>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal font-semibold">Correo Comercial</strong>
                    <a href="mailto:comercial@agricolapacocha.com" className="text-muted hover:text-forest-800 transition-colors">
                      comercial@agricolapacocha.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal font-semibold">Teléfono / WhatsApp Comercial</strong>
                    <a href="tel:+51987654321" className="text-muted hover:text-forest-800 transition-colors">
                      +51 987 654 321
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal font-semibold">Ubicación del Fundo</strong>
                    <p className="text-muted">
                      Valle Sagrado de los Incas (Sede Calca - Pisac), Cusco, Perú
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-charcoal font-semibold">Horario Comercial B2B</strong>
                    <p className="text-muted">
                      Lunes a Viernes: 08:00 - 18:00 (UTC-5)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-highlight-sand bg-sand/60 rounded-3xl p-6 border border-charcoal/5">
              <p className="text-xs uppercase tracking-widest text-forest-800 font-bold mb-1">Visitas al Fundo</p>
              <p className="text-xs text-muted leading-relaxed">
                Coordinamos visitas de inspección técnica previa cita para compradores y misiones comerciales internacionales durante la campaña de cosecha.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7">
            <div className="card-highlight-white bg-white rounded-3xl p-8 sm:p-10 shadow-xs border border-charcoal/10">
              <h3 className="text-2xl font-bold font-serif text-forest-950 mb-2">Envíenos un Mensaje</h3>
              <p className="text-muted text-sm mb-8">
                Complete el siguiente formulario y un ejecutivo comercial responderá en menos de 24 horas hábiles.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-avocado-400/20 border border-avocado-600/40 text-center animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-forest-800 mx-auto mb-3" />
                  <h4 className="text-2xl font-serif font-bold text-forest-950">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-sm text-muted mt-2">
                    Gracias por comunicarse con Agrícola Pacocha / Pilcococha. Nos pondremos en contacto a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-2 uppercase tracking-wider">
                      Nombre *
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-xl border border-charcoal/20 px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-forest-600 bg-cream/40"
                      required
                      placeholder="Su nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-2 uppercase tracking-wider">
                      Empresa *
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-xl border border-charcoal/20 px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-forest-600 bg-cream/40"
                      required
                      placeholder="Nombre de empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-2 uppercase tracking-wider">
                      Correo Corporativo *
                    </label>
                    <input 
                      type="email" 
                      className="w-full rounded-xl border border-charcoal/20 px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-forest-600 bg-cream/40"
                      required
                      placeholder="correo@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-2 uppercase tracking-wider">
                      Teléfono / WhatsApp
                    </label>
                    <input 
                      type="tel" 
                      className="w-full rounded-xl border border-charcoal/20 px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-forest-600 bg-cream/40"
                      placeholder="+51..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-2 uppercase tracking-wider">
                      País de Destino / Procedencia *
                    </label>
                    <select className="w-full rounded-xl border border-charcoal/20 px-3.5 py-2.5 text-sm appearance-none focus:outline-none focus:border-forest-600 bg-cream/40" required>
                      <option value="">Seleccione un país</option>
                      <option value="PE">Perú</option>
                      <option value="US">Estados Unidos</option>
                      <option value="NL">Países Bajos</option>
                      <option value="ES">España</option>
                      <option value="DE">Alemania</option>
                      <option value="GB">Reino Unido</option>
                      <option value="CL">Chile</option>
                      <option value="OT">Otro país</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-2 uppercase tracking-wider">
                      Mensaje o Consulta *
                    </label>
                    <textarea 
                      className="w-full rounded-xl border border-charcoal/20 px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-forest-600 h-[120px] resize-y bg-cream/40"
                      rows={4}
                      required
                      placeholder="Describa su requerimiento o consulta sobre Palta Hass..."
                    ></textarea>
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <Button type="submit" variant="primary">
                      Enviar Mensaje
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAPA INTERACTIVO DE LA SEDE CALCA - PISAC */}
      <SedesMap />
    </div>
  )
}