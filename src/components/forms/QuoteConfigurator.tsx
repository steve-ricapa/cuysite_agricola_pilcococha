import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Package, 
  Truck, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  Layers,
  MessageCircle,
  ShieldCheck
} from 'lucide-react'

const CALIBRES_OPTIONS = [
  { cal: '12', peso: '300-370g', desc: 'Jumbo' },
  { cal: '14', peso: '258-313g', desc: 'Grande' },
  { cal: '16', peso: '227-274g', desc: 'Estándar' },
  { cal: '18', peso: '203-243g', desc: 'Estándar' },
  { cal: '20', peso: '184-217g', desc: 'Medium' },
  { cal: '22', peso: '165-196g', desc: 'Medium' },
  { cal: '24', peso: '151-175g', desc: 'Small' },
  { cal: '26', peso: '144-157g', desc: 'Small' },
]

export const QuoteConfigurator: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedCalibres, setSelectedCalibres] = useState<string[]>(['16', '18', '20'])
  const [presentacion, setPresentacion] = useState<'4kg' | '10kg'>('4kg')
  const [volumenTipo, setVolumenTipo] = useState<'contenedores' | 'pallets'>('contenedores')
  const [cantidad, setCantidad] = useState<number>(2)
  const [incoterm, setIncoterm] = useState('FOB Callao')
  const [frecuencia, setFrecuencia] = useState('Semanal en campaña')

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    pais: '',
    puertoDestino: '',
    comentarios: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quoteCode, setQuoteCode] = useState<string | null>(null)

  const toggleCalibre = (cal: string) => {
    setSelectedCalibres((prev) =>
      prev.includes(cal) ? prev.filter((c) => c !== cal) : [...prev, cal]
    )
  }

  // Cálculos dinámicos
  const totalPallets = volumenTipo === 'contenedores' ? cantidad * 20 : cantidad
  const cajasPorPallet = presentacion === '4kg' ? 264 : 100
  const totalCajas = totalPallets * cajasPorPallet
  const pesoNetoKg = presentacion === '4kg' ? totalCajas * 4 : totalCajas * 10
  const pesoToneladas = (pesoNetoKg / 1000).toFixed(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      const code = `PIL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setQuoteCode(code)
    }, 1200)
  }

  const resetForm = () => {
    setQuoteCode(null)
    setStep(1)
  }

  return (
    <div className="card-highlight-green w-full text-cream rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
      {/* Luz ambiental de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-avocado-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header del cotizador */}
      <div className="relative z-10 mb-8 border-b border-forest-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="ebrow text-avocado-400 mb-1 block">Cotizador B2B Interactivo</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-cream">
              Configure su Pedido de Exportación
            </h3>
          </div>

          {/* Indicador de Pasos */}
          {!quoteCode && (
            <div className="flex items-center gap-2 bg-forest-900 p-1.5 rounded-full border border-forest-800 text-xs font-bold">
              <span className={`px-3 py-1 rounded-full transition-colors ${step === 1 ? 'bg-avocado-400 text-forest-950' : 'text-cream/60'}`}>
                1. Calibres
              </span>
              <span className={`px-3 py-1 rounded-full transition-colors ${step === 2 ? 'bg-avocado-400 text-forest-950' : 'text-cream/60'}`}>
                2. Volumen
              </span>
              <span className={`px-3 py-1 rounded-full transition-colors ${step === 3 ? 'bg-avocado-400 text-forest-950' : 'text-cream/60'}`}>
                3. Datos
              </span>
            </div>
          )}
        </div>
      </div>

      {quoteCode ? (
        /* PANTALLA DE ÉXITO DE COTIZACIÓN */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 max-w-xl mx-auto space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-avocado-600/20 text-avocado-400 border border-avocado-400/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-avocado-400 tracking-widest block mb-1">
              Cotización Generada
            </span>
            <h4 className="text-3xl font-black font-serif text-cream">
              ¡Solicitud Registrada con Éxito!
            </h4>
            <div className="inline-block mt-3 px-4 py-2 rounded-xl bg-forest-900 border border-forest-800 text-sm font-mono font-bold text-avocado-400">
              Código de Cotización: {quoteCode}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 text-left text-xs space-y-2 text-cream/80">
            <p className="flex justify-between">
              <span>Empresa:</span>
              <strong className="text-cream">{formData.empresa || 'Empresa Importadora'}</strong>
            </p>
            <p className="flex justify-between">
              <span>Volumen configurado:</span>
              <strong className="text-cream">{cantidad} {volumenTipo} (~{pesoToneladas} Toneladas)</strong>
            </p>
            <p className="flex justify-between">
              <span>Calibres:</span>
              <strong className="text-cream">{selectedCalibres.join(', ')}</strong>
            </p>
            <p className="flex justify-between">
              <span>Incoterm:</span>
              <strong className="text-cream">{incoterm}</strong>
            </p>
          </div>

          <p className="text-sm text-cream/70 leading-relaxed">
            Nuestro Gerente de Exportaciones revisará su requerimiento y le enviará la propuesta oficial CIF/FOB a <strong>{formData.email}</strong> en menos de 24 horas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/51987654321?text=${encodeURIComponent(`Hola Agrícola Pilcococha, generé la cotización ${quoteCode} para ${cantidad} ${volumenTipo} de Palta Hass (${formData.empresa}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar por WhatsApp Directo</span>
            </a>

            <button
              onClick={resetForm}
              className="text-xs text-cream/60 hover:text-white underline underline-offset-4"
            >
              Configurar otra cotización
            </button>
          </div>
        </motion.div>
      ) : (
        /* FORMULARIO DINÁMICO DE 3 PASOS + RESUMEN EN VIVO */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* PASOS PRINCIPALES */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {/* PASO 1: CALIBRES Y VARIEDAD */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-xl font-bold font-serif text-cream mb-1">
                      1. Seleccione los calibres de Palta Hass deseados:
                    </h4>
                    <p className="text-xs text-cream/60">
                      Puede seleccionar uno o varios calibres según el requerimiento de su mercado:
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CALIBRES_OPTIONS.map((c) => {
                      const isSelected = selectedCalibres.includes(c.cal)
                      return (
                        <div
                          key={c.cal}
                          onClick={() => toggleCalibre(c.cal)}
                          className={`p-4 rounded-2xl cursor-pointer transition-all border text-center relative ${
                            isSelected
                              ? 'bg-avocado-400 text-forest-950 border-avocado-400 font-bold shadow-md scale-102'
                              : 'bg-forest-900/80 hover:bg-forest-900 text-cream border-forest-800'
                          }`}
                        >
                          <span className="text-xs uppercase font-extrabold opacity-75 block">{c.desc}</span>
                          <span className="text-2xl font-black font-serif block my-1">Calibre {c.cal}</span>
                          <span className="text-[11px] block opacity-85">{c.peso}</span>

                          {isSelected && (
                            <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-forest-950 text-avocado-400 flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Presentación de empaque */}
                  <div className="pt-4 border-t border-forest-800">
                    <label className="block text-xs font-bold uppercase tracking-wider text-cream/80 mb-3">
                      Formato de empaque de exportación:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setPresentacion('4kg')}
                        className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between ${
                          presentacion === '4kg'
                            ? 'bg-forest-800 border-avocado-400 text-cream'
                            : 'bg-forest-900 border-forest-800 text-cream/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-avocado-400" />
                          <div>
                            <strong className="block text-sm">Caja 4.0 kg Neta</strong>
                            <span className="text-xs text-cream/60">264 cajas por pallet estándar (Retail)</span>
                          </div>
                        </div>
                        {presentacion === '4kg' && <Check className="w-4 h-4 text-avocado-400" />}
                      </div>

                      <div
                        onClick={() => setPresentacion('10kg')}
                        className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between ${
                          presentacion === '10kg'
                            ? 'bg-forest-800 border-avocado-400 text-cream'
                            : 'bg-forest-900 border-forest-800 text-cream/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Layers className="w-5 h-5 text-avocado-400" />
                          <div>
                            <strong className="block text-sm">Caja 10.0 kg Granel</strong>
                            <span className="text-xs text-cream/60">100 cajas por pallet (Foodservice / Mayorista)</span>
                          </div>
                        </div>
                        {presentacion === '10kg' && <Check className="w-4 h-4 text-avocado-400" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={selectedCalibres.length === 0}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm shadow-md transition-all disabled:opacity-50"
                    >
                      <span>Siguiente: Volumen y Logística</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PASO 2: VOLUMEN Y LOGÍSTICA */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-xl font-bold font-serif text-cream mb-1">
                      2. Estime el volumen y condiciones de entrega:
                    </h4>
                    <p className="text-xs text-cream/60">
                      Calculamos automáticamente pallets, peso neto y contenedores:
                    </p>
                  </div>

                  {/* Selector Contenedores vs Pallets */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVolumenTipo('contenedores')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs ${
                        volumenTipo === 'contenedores'
                          ? 'bg-avocado-400 text-forest-950 border-avocado-400'
                          : 'bg-forest-900 border-forest-800 text-cream/70'
                      }`}
                    >
                      🚢 En Contenedores de 40&apos; (Reefer CA)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVolumenTipo('pallets')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs ${
                        volumenTipo === 'pallets'
                          ? 'bg-avocado-400 text-forest-950 border-avocado-400'
                          : 'bg-forest-900 border-forest-800 text-cream/70'
                      }`}
                    >
                      📦 En Pallets Específicos
                    </button>
                  </div>

                  {/* Slider de cantidad */}
                  <div className="p-6 rounded-2xl bg-forest-900 border border-forest-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-cream/80">Cantidad requerida:</span>
                      <strong className="text-2xl font-black font-serif text-avocado-400">
                        {cantidad} {volumenTipo === 'contenedores' ? (cantidad === 1 ? 'Contenedor 40\'' : 'Contenedores 40\'') : (cantidad === 1 ? 'Pallet' : 'Pallets')}
                      </strong>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={volumenTipo === 'contenedores' ? 20 : 60}
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value))}
                      className="w-full accent-avocado-400 h-2 bg-forest-950 rounded-lg cursor-pointer"
                    />

                    <div className="flex justify-between text-[11px] text-cream/50">
                      <span>Mínimo: 1 {volumenTipo === 'contenedores' ? 'FCL' : 'Pallet'}</span>
                      <span>Volumen calculado: ~{pesoToneladas} Toneladas Netas</span>
                    </div>
                  </div>

                  {/* Incoterm y Frecuencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cream/80 mb-2">
                        Término comercial (Incoterm):
                      </label>
                      <select
                        value={incoterm}
                        onChange={(e) => setIncoterm(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400"
                      >
                        <option value="FOB Callao">FOB Callao (Puerto de Lima, Perú)</option>
                        <option value="CIF Rotterdam">CIF Rotterdam (Países Bajos)</option>
                        <option value="CIF Algeciras">CIF Algeciras (España)</option>
                        <option value="CIF Filadelfia">CIF Filadelfia (EE.UU.)</option>
                        <option value="Ex-Works Fundo Cusco">Ex-Works Fundo (Cusco, Perú)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cream/80 mb-2">
                        Frecuencia de despacho:
                      </label>
                      <select
                        value={frecuencia}
                        onChange={(e) => setFrecuencia(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400"
                      >
                        <option value="Semanal en campaña">Semanal durante campaña pico</option>
                        <option value="Quincenal programado">Quincenal programado</option>
                        <option value="Embarque único / Spot">Embarque único (Spot)</option>
                        <option value="Toda la temporada">Contrato de temporada completa</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-cream text-xs font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm shadow-md transition-all"
                    >
                      <span>Siguiente: Datos de la Empresa</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PASO 3: DATOS DEL COMPRADOR */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  className="space-y-5"
                >
                  <div>
                    <h4 className="text-xl font-bold font-serif text-cream mb-1">
                      3. Datos de contacto para envío de la cotización:
                    </h4>
                    <p className="text-xs text-cream/60">
                      Enviaremos la cotización detallada con disponibilidades y precios de campaña:
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej. Alexander Müller"
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        Empresa Importadora *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ej. Green Trade BV"
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        Correo Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="compras@empresa.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        WhatsApp / Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="+31 6 12345678"
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        País de Destino *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pais}
                        onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                        placeholder="Ej. Países Bajos, España, EE.UU."
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        Puerto de Llegada Deseado
                      </label>
                      <input
                        type="text"
                        value={formData.puertoDestino}
                        onChange={(e) => setFormData({ ...formData, puertoDestino: e.target.value })}
                        placeholder="Ej. Rotterdam, Filadelfia"
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase text-cream/80 mb-1">
                        Requerimientos Especiales o Comentarios
                      </label>
                      <textarea
                        rows={2}
                        value={formData.comentarios}
                        onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                        placeholder="Indique requerimientos específicos de atmósfera, sellos o semanas preferentes de arribo..."
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-900 border border-forest-800 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30 resize-y"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-cream text-xs font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-black text-sm shadow-xl transition-all hover:scale-105 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-forest-950 border-t-transparent rounded-full animate-spin" />
                            <span>Generando Cotización...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar Solicitud de Cotización</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TARJETA LATERAL: RESUMEN EN TIEMPO REAL */}
          <div className="lg:col-span-4 bg-forest-900/90 rounded-2xl p-6 border border-forest-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-forest-800 pb-3">
              <span className="text-xs uppercase font-extrabold text-avocado-400 tracking-wider">
                Resumen de Cotización
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-forest-950 text-cream font-mono">
                B2B Live
              </span>
            </div>

            <div className="space-y-3 text-xs text-cream/80">
              <div>
                <span className="text-[10px] uppercase text-cream/50 block">Producto</span>
                <strong className="text-sm font-serif text-cream">Palta Hass Peruana Cat. 1</strong>
              </div>

              <div>
                <span className="text-[10px] uppercase text-cream/50 block">Calibres Seleccionados</span>
                <p className="font-semibold text-avocado-400">
                  {selectedCalibres.length > 0 ? selectedCalibres.join(', ') : 'Ninguno'}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase text-cream/50 block">Presentación</span>
                <p className="font-medium text-cream">
                  {presentacion === '4kg' ? 'Caja 4.0 kg Neta (264 / pal)' : 'Caja 10.0 kg Granel (100 / pal)'}
                </p>
              </div>

              <div className="pt-2 border-t border-forest-800">
                <span className="text-[10px] uppercase text-cream/50 block">Volumen Estimado</span>
                <p className="text-base font-black text-cream font-serif">
                  {cantidad} {volumenTipo}
                </p>
                <p className="text-[11px] text-cream/60">
                  ≈ {totalPallets} Pallets | ≈ {totalCajas.toLocaleString()} Cajas
                </p>
                <p className="text-sm font-bold text-avocado-400 mt-1">
                  ≈ {pesoToneladas} Toneladas Netas
                </p>
              </div>

              <div className="pt-2 border-t border-forest-800">
                <span className="text-[10px] uppercase text-cream/50 block">Condición Comercial</span>
                <p className="font-medium text-cream">{incoterm}</p>
                <p className="text-[11px] text-cream/60">{frecuencia}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-forest-800 flex items-center gap-2 text-[11px] text-cream/60">
              <ShieldCheck className="w-4 h-4 text-avocado-400 shrink-0" />
              <span>Garantía de materia seca &gt;21.5% y cadena de frío ininterrumpida.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
