import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  ShieldCheck,
  Ship,
  Globe2,
  Copy
} from 'lucide-react'

const CALIBRES_OPTIONS = [
  { cal: '12', peso: '300-370g', desc: 'Jumbo', mercado: 'Europa / Gourmet' },
  { cal: '14', peso: '258-313g', desc: 'Grande', mercado: 'Europa / Asia' },
  { cal: '16', peso: '227-274g', desc: 'Estándar', mercado: 'EE.UU. / Europa' },
  { cal: '18', peso: '203-243g', desc: 'Estándar', mercado: 'EE.UU. / Retail' },
  { cal: '20', peso: '184-217g', desc: 'Medium', mercado: 'EE.UU. / LatAm' },
  { cal: '22', peso: '165-196g', desc: 'Medium', mercado: 'Foodservice' },
  { cal: '24', peso: '151-175g', desc: 'Small', mercado: 'Regional / Granel' },
  { cal: '26', peso: '144-157g', desc: 'Small', mercado: 'Económico' },
]

export const QuoteConfigurator: React.FC = () => {
  const [searchParams] = useSearchParams()
  const destinoParam = searchParams.get('destino') || ''
  const mercadoParam = searchParams.get('mercado') || ''

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedCalibres, setSelectedCalibres] = useState<string[]>(['14', '16', '18'])
  const [presentacion, setPresentacion] = useState<'4kg' | '10kg'>('4kg')
  const [volumenTipo, setVolumenTipo] = useState<'contenedores' | 'pallets'>('contenedores')
  const [cantidad, setCantidad] = useState<number>(2)
  const [incoterm, setIncoterm] = useState(destinoParam ? `CIF ${destinoParam}` : 'FOB Callao')
  const [frecuencia, setFrecuencia] = useState('Semanal en campaña')

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    pais: mercadoParam || '',
    puertoDestino: destinoParam || '',
    comentarios: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quoteCode, setQuoteCode] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    if (destinoParam) {
      setIncoterm(`CIF ${destinoParam}`)
      setFormData(prev => ({
        ...prev,
        puertoDestino: destinoParam,
        pais: prev.pais || mercadoParam
      }))
    }
  }, [destinoParam, mercadoParam])

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

  const copyQuoteCode = () => {
    if (quoteCode) {
      navigator.clipboard.writeText(quoteCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const resetForm = () => {
    setQuoteCode(null)
    setStep(1)
  }

  return (
    <div className="liquid-glass-panel w-full text-cream rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden border border-white/20">
      {/* Luz ambiental de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-avocado-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header del cotizador */}
      <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="section-badge">
              <span className="section-badge-dot" />
              <span>Cotizador B2B Interactivo • Temporada 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-cream">
              Configure su Pedido de Exportación
            </h3>
            {destinoParam && (
              <p className="text-xs text-avocado-300 font-mono flex items-center gap-1.5 pt-1">
                <Ship className="w-3.5 h-3.5 text-avocado-400" />
                <span>Ruta Preseleccionada desde Mercados: Puerto de {destinoParam}</span>
              </p>
            )}
          </div>

          {/* Indicador de Pasos */}
          {!quoteCode && (
            <div className="flex items-center gap-1.5 bg-forest-950/80 p-1.5 rounded-full border border-white/15 text-xs font-bold backdrop-blur-md">
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  step === 1 
                    ? 'bg-avocado-600 text-forest-950 shadow-md font-bold' 
                    : 'text-cream/60 hover:text-white'
                }`}
              >
                1. Calibres
              </button>
              <button
                onClick={() => selectedCalibres.length > 0 && setStep(2)}
                disabled={selectedCalibres.length === 0}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  step === 2 
                    ? 'bg-avocado-600 text-forest-950 shadow-md font-bold' 
                    : 'text-cream/60 hover:text-white disabled:opacity-40'
                }`}
              >
                2. Volumen
              </button>
              <button
                onClick={() => setStep(3)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  step === 3 
                    ? 'bg-avocado-600 text-forest-950 shadow-md font-bold' 
                    : 'text-cream/60 hover:text-white'
                }`}
              >
                3. Datos
              </button>
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
          <div className="w-16 h-16 rounded-full bg-avocado-500/20 text-avocado-400 border border-avocado-400/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-mono font-bold text-avocado-400 tracking-widest block mb-1">
              Cotización B2B Generada
            </span>
            <h4 className="text-3xl font-black font-serif text-cream">
              ¡Solicitud Registrada con Éxito!
            </h4>
            <div className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-xl bg-forest-950 border border-avocado-400/40 text-sm font-mono font-bold text-avocado-300">
              <span>Código: {quoteCode}</span>
              <button
                onClick={copyQuoteCode}
                className="ml-2 p-1 text-cream/70 hover:text-white transition-colors cursor-pointer"
                title="Copiar código"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-avocado-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-forest-950/80 border border-white/10 text-left text-xs space-y-2.5 text-cream/80 font-mono">
            <p className="flex justify-between">
              <span className="text-cream/50">Empresa:</span>
              <strong className="text-cream">{formData.empresa || 'Empresa Importadora'}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-cream/50">Destino / Puerto:</span>
              <strong className="text-avocado-300">{formData.puertoDestino || formData.pais || 'No especificado'}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-cream/50">Volumen configurado:</span>
              <strong className="text-cream">{cantidad} {volumenTipo} (~{pesoToneladas} TM Netas)</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-cream/50">Calibres seleccionados:</span>
              <strong className="text-cream">{selectedCalibres.join(', ')}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-cream/50">Condición Comercial:</span>
              <strong className="text-cream">{incoterm}</strong>
            </p>
          </div>

          <p className="text-sm text-cream/75 leading-relaxed font-light">
            Nuestro Gerente de Exportaciones revisará su requerimiento y le enviará la propuesta oficial CIF/FOB a <strong className="text-white font-medium">{formData.email}</strong> en menos de 24 horas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/51987654321?text=${encodeURIComponent(`Hola Agrícola Pilcococha, he configurado la cotización ${quoteCode} para ${cantidad} ${volumenTipo} de Palta Hass hacia ${formData.puertoDestino || formData.pais || 'nuestro puerto'}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar por WhatsApp Directo</span>
            </a>

            <button
              onClick={resetForm}
              className="text-xs text-cream/60 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Configurar otra cotización
            </button>
          </div>
        </motion.div>
      ) : (
        /* FORMULARIO DINÁMICO DE 3 PASOS + RESUMEN EN VIVO */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* PASOS PRINCIPALES (8 Cols) */}
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
                    <p className="text-xs text-cream/70 font-light">
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
                              ? 'bg-avocado-600/30 border-avocado-400 text-cream font-bold shadow-[0_0_15px_rgba(164,227,71,0.25)] ring-1 ring-avocado-400 scale-[1.02]'
                              : 'bg-forest-950/60 hover:bg-forest-900/60 text-cream/80 border-white/10 hover:border-white/25'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono font-bold text-avocado-400 block">{c.desc}</span>
                          <span className="text-2xl font-black font-serif block my-1 text-cream">Cal. {c.cal}</span>
                          <span className="text-[11px] font-mono block text-cream/70">{c.peso}</span>
                          <span className="text-[9px] text-cream/50 block mt-1 truncate">{c.mercado}</span>

                          {isSelected && (
                            <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-avocado-400 text-forest-950 flex items-center justify-center text-[10px] font-black">
                              ✓
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Presentación de empaque */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-xs font-bold uppercase tracking-wider text-cream/80 mb-3 font-mono">
                      Formato de empaque de exportación:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setPresentacion('4kg')}
                        className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition-all ${
                          presentacion === '4kg'
                            ? 'bg-avocado-600/20 border-avocado-400 text-cream shadow-md ring-1 ring-avocado-400'
                            : 'bg-forest-950/60 border-white/10 text-cream/70 hover:bg-forest-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-avocado-400" />
                          <div>
                            <strong className="block text-sm text-cream font-bold">Caja Plató 4.0 kg Neta</strong>
                            <span className="text-xs text-cream/60 font-light">264 cajas por pallet estándar (Retail / Supermercados)</span>
                          </div>
                        </div>
                        {presentacion === '4kg' && <Check className="w-4 h-4 text-avocado-400" />}
                      </div>

                      <div
                        onClick={() => setPresentacion('10kg')}
                        className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition-all ${
                          presentacion === '10kg'
                            ? 'bg-avocado-600/20 border-avocado-400 text-cream shadow-md ring-1 ring-avocado-400'
                            : 'bg-forest-950/60 border-white/10 text-cream/70 hover:bg-forest-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Layers className="w-5 h-5 text-avocado-400" />
                          <div>
                            <strong className="block text-sm text-cream font-bold">Caja Master 10.0 kg Granel</strong>
                            <span className="text-xs text-cream/60 font-light">100 cajas por pallet (Foodservice / Mayorista)</span>
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
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
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
                    <p className="text-xs text-cream/70 font-light">
                      Calculamos automáticamente pallets, peso neto y contenedores frigoríficos:
                    </p>
                  </div>

                  {/* Selector Contenedores vs Pallets */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVolumenTipo('contenedores')}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        volumenTipo === 'contenedores'
                          ? 'bg-avocado-600 text-forest-950 border-avocado-400 shadow-md'
                          : 'bg-forest-950/60 border-white/10 text-cream/70 hover:bg-forest-900/60'
                      }`}
                    >
                      🚢 En Contenedores de 40' (Reefer CA)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVolumenTipo('pallets')}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        volumenTipo === 'pallets'
                          ? 'bg-avocado-600 text-forest-950 border-avocado-400 shadow-md'
                          : 'bg-forest-950/60 border-white/10 text-cream/70 hover:bg-forest-900/60'
                      }`}
                    >
                      📦 En Pallets Específicos
                    </button>
                  </div>

                  {/* Slider de cantidad */}
                  <div className="p-6 rounded-2xl bg-forest-950/80 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-mono font-bold text-cream/80">Cantidad requerida:</span>
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
                      className="w-full accent-avocado-500 h-2 bg-forest-900 rounded-lg cursor-pointer"
                    />

                    <div className="flex justify-between text-[11px] text-cream/60 font-mono">
                      <span>Mínimo: 1 {volumenTipo === 'contenedores' ? 'FCL' : 'Pallet'}</span>
                      <span className="text-avocado-300 font-bold">Volumen estimado: ~{pesoToneladas} Toneladas Netas</span>
                    </div>
                  </div>

                  {/* Incoterm y Frecuencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cream/80 mb-2 font-mono">
                        Término comercial (Incoterm):
                      </label>
                      <select
                        value={incoterm}
                        onChange={(e) => setIncoterm(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/80 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 cursor-pointer"
                      >
                        <option value="FOB Callao" className="bg-forest-950 text-cream">FOB Callao (Puerto de Lima, Perú)</option>
                        <option value="FOB Chancay" className="bg-forest-950 text-cream">FOB Megapuerto de Chancay (Ruta Asia)</option>
                        <option value="CIF Rotterdam" className="bg-forest-950 text-cream">CIF Rotterdam (Países Bajos)</option>
                        <option value="CIF Algeciras" className="bg-forest-950 text-cream">CIF Algeciras (España)</option>
                        <option value="CIF Filadelfia" className="bg-forest-950 text-cream">CIF Filadelfia (EE.UU.)</option>
                        <option value="CIF Long Beach" className="bg-forest-950 text-cream">CIF Long Beach (EE.UU. Oeste)</option>
                        <option value="CIF Shanghái" className="bg-forest-950 text-cream">CIF Shanghái (China)</option>
                        <option value="Ex-Works Fundo Cusco" className="bg-forest-950 text-cream">Ex-Works Fundo (Cusco, Perú)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cream/80 mb-2 font-mono">
                        Frecuencia de despacho:
                      </label>
                      <select
                        value={frecuencia}
                        onChange={(e) => setFrecuencia(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/80 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 cursor-pointer"
                      >
                        <option value="Semanal en campaña" className="bg-forest-950 text-cream">Semanal durante campaña pico</option>
                        <option value="Quincenal programado" className="bg-forest-950 text-cream">Quincenal programado</option>
                        <option value="Embarque único / Spot" className="bg-forest-950 text-cream">Embarque único (Spot)</option>
                        <option value="Toda la temporada" className="bg-forest-950 text-cream">Contrato de temporada completa</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-cream text-xs font-semibold cursor-pointer border border-white/10"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Volver</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm shadow-md transition-all cursor-pointer"
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
                    <p className="text-xs text-cream/70 font-light">
                      Enviaremos la cotización detallada con disponibilidades y precios de campaña en menos de 24 horas:
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej. Alexander Müller"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        Empresa Importadora *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ej. Green Trade BV"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        Correo Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="compras@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        WhatsApp / Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="+31 6 12345678"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        País de Destino *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pais}
                        onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                        placeholder="Ej. Países Bajos, España, EE.UU., China"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        Puerto de Llegada Deseado
                      </label>
                      <input
                        type="text"
                        value={formData.puertoDestino}
                        onChange={(e) => setFormData({ ...formData, puertoDestino: e.target.value })}
                        placeholder="Ej. Rotterdam, Filadelfia, Shanghái"
                        className="w-full px-4 py-3 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase text-cream/90 mb-1 font-mono">
                        Requerimientos Especiales o Comentarios
                      </label>
                      <textarea
                        rows={2}
                        value={formData.comentarios}
                        onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                        placeholder="Indique requerimientos específicos de atmósfera, sellos o semanas preferentes de arribo..."
                        className="w-full px-4 py-2.5 rounded-xl bg-forest-950/70 border border-white/15 text-cream text-sm focus:outline-none focus:border-avocado-400 placeholder:text-cream/30 resize-y"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-cream text-xs font-semibold border border-white/10 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-black text-sm shadow-xl transition-all hover:scale-105 disabled:opacity-50 cursor-pointer"
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

          {/* TARJETA LATERAL: RESUMEN EN TIEMPO REAL (4 Cols) */}
          <div className="lg:col-span-4 liquid-glass-card rounded-2xl p-6 border border-white/15 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-mono font-bold text-avocado-400 tracking-wider">
                Resumen de Cotización
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-forest-950 text-avocado-300 font-mono border border-avocado-400/30">
                B2B Live
              </span>
            </div>

            <div className="space-y-3 text-xs text-cream/80">
              <div>
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Variedad / Calidad</span>
                <strong className="text-sm font-serif text-cream">Palta Hass Peruana Cat. 1 Exportación</strong>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Calibres Seleccionados</span>
                <p className="font-mono font-bold text-avocado-300 text-sm">
                  {selectedCalibres.length > 0 ? selectedCalibres.map(c => `Cal. ${c}`).join(', ') : 'Ninguno'}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Presentación</span>
                <p className="font-medium text-cream">
                  {presentacion === '4kg' ? 'Caja 4.0 kg Neta (264 / pallet)' : 'Caja 10.0 kg Granel (100 / pallet)'}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Volumen Estimado</span>
                <p className="text-base font-black text-cream font-serif">
                  {cantidad} {volumenTipo}
                </p>
                <p className="text-[11px] text-cream/60 font-mono">
                  ≈ {totalPallets} Pallets | ≈ {totalCajas.toLocaleString()} Cajas
                </p>
                <p className="text-sm font-bold text-emerald-300 font-mono mt-1">
                  ≈ {pesoToneladas} Toneladas Netas
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase font-mono text-cream/50 block">Condición Comercial</span>
                <p className="font-semibold text-cream">{incoterm}</p>
                <p className="text-[11px] text-cream/60 font-mono">{frecuencia}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-cream/70 font-light">
              <ShieldCheck className="w-4 h-4 text-avocado-400 shrink-0" />
              <span>Garantía de materia seca &gt;21.5% y cadena de frío ininterrumpida.</span>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
