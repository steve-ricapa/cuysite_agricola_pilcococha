import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Ship, 
  Truck, 
  Anchor, 
  Globe2, 
  ThermometerSnowflake, 
  Wind, 
  Clock, 
  Box, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  FileText, 
  X, 
  Sparkles,
  Radio,
  ExternalLink
} from 'lucide-react'

export interface RouteSimulation {
  id: string
  destino: string
  pais: string
  region: string
  puertoLlegada: string
  puertoSalida: string
  diasTransito: string
  diasMaritimosMin: number
  diasMaritimosMax: number
  frecuencia: string
  lineasNavieras: string[]
  temperatura: string
  atmosferaControlada: string
  ventilacion: string
  palletsPorContenedor: number
  cajasPlato4kg: number
  cajasMaster10kg: number
  calibresRecomendados: string
  certificacionesClave: string[]
  destacado: string
}

export const RUTAS_SIMULADOR: RouteSimulation[] = [
  {
    id: 'rotterdam',
    destino: 'Rotterdam',
    pais: 'Países Bajos',
    region: 'Europa Norte & Central',
    puertoLlegada: 'Puerto de Rotterdam (World Gateway)',
    puertoSalida: 'Megapuerto del Callao (APM Terminals / DP World)',
    diasTransito: '22 – 25 días',
    diasMaritimosMin: 22,
    diasMaritimosMax: 25,
    frecuencia: '3 salidas semanales fijas',
    lineasNavieras: ['Maersk', 'Hapag-Lloyd', 'CMA CGM'],
    temperatura: '+5.0°C a +5.5°C',
    atmosferaControlada: 'O₂: 4% | CO₂: 5% (TransFresh / Daikin CA)',
    ventilacion: '25 m³/hora cerrada en CA',
    palletsPorContenedor: 20,
    cajasPlato4kg: 5280,
    cajasMaster10kg: 2160,
    calibresRecomendados: 'Calibres 12, 14, 16 y 18',
    certificacionesClave: ['GlobalG.A.P. IFA v5.4', 'GRASP', 'SMETA Sedex', 'SENASA'],
    destacado: 'Principal hub de redistribución para toda la Unión Europea con inspección fitosanitaria rápida.'
  },
  {
    id: 'philadelphia',
    destino: 'Philadelphia',
    pais: 'Estados Unidos',
    region: 'Costa Este de EE.UU.',
    puertoLlegada: 'Port of Philadelphia (Packer Marine Terminal)',
    puertoSalida: 'Megapuerto del Callao / Paita',
    diasTransito: '14 – 16 días',
    diasMaritimosMin: 14,
    diasMaritimosMax: 16,
    frecuencia: '2 salidas semanales directas',
    lineasNavieras: ['CMA CGM', 'Maersk', 'MSC'],
    temperatura: '+4.8°C a +5.2°C',
    atmosferaControlada: 'O₂: 4% | CO₂: 4% (Control Continuo)',
    ventilacion: '15 m³/hora',
    palletsPorContenedor: 20,
    cajasPlato4kg: 5280,
    cajasMaster10kg: 2160,
    calibresRecomendados: 'Calibres 16, 18, 20 y 22',
    certificacionesClave: ['USDA-APHIS Pre-clearance', 'FSMA', 'GlobalG.A.P.', 'SENASA'],
    destacado: 'Ruta ultra rápida hacia el mayor mercado de consumo masivo con pre-inspección de origen.'
  },
  {
    id: 'longbeach',
    destino: 'Long Beach / Los Ángeles',
    pais: 'Estados Unidos',
    region: 'Costa Oeste de EE.UU.',
    puertoLlegada: 'Port of Long Beach (Pier T)',
    puertoSalida: 'Megapuerto del Callao / Puerto de Paita',
    diasTransito: '16 – 18 días',
    diasMaritimosMin: 16,
    diasMaritimosMax: 18,
    frecuencia: 'Salida semanal directa',
    lineasNavieras: ['ONE (Ocean Network Express)', 'Hapag-Lloyd'],
    temperatura: '+5.0°C Constante',
    atmosferaControlada: 'O₂: 4% | CO₂: 5%',
    ventilacion: '20 m³/hora',
    palletsPorContenedor: 20,
    cajasPlato4kg: 5280,
    cajasMaster10kg: 2160,
    calibresRecomendados: 'Calibres 14, 16, 18 y 20',
    certificacionesClave: ['USDA-APHIS', 'GlobalG.A.P. CoC', 'SENASA Certificado'],
    destacado: 'Conexión directa con la cuenca del Pacífico norteamericano y cadenas de supermercados premium.'
  },
  {
    id: 'shanghai',
    destino: 'Shanghái',
    pais: 'China',
    region: 'Asia / Pacífico (Ruta Transpacífica Directa)',
    puertoLlegada: 'Port of Shanghai (Yangshan Deep-Water Port)',
    puertoSalida: 'Megapuerto de Chancay (Cosco Shipping Ports)',
    diasTransito: '22 – 25 días (Ruta Directa Chancay)',
    diasMaritimosMin: 22,
    diasMaritimosMax: 25,
    frecuencia: 'Servicio Express Semanal Directo',
    lineasNavieras: ['Cosco Shipping Line', 'OOCL'],
    temperatura: '+5.5°C Controlada',
    atmosferaControlada: 'O₂: 3.5% | CO₂: 5.5% (Atmósfera Máxima Duración)',
    ventilacion: 'Sellado hermético CA',
    palletsPorContenedor: 21,
    cajasPlato4kg: 5544,
    cajasMaster10kg: 2268,
    calibresRecomendados: 'Calibres 14, 16 y 18 (Alta Grasa / Aceites)',
    certificacionesClave: ['GACC Protocolo China-SENASA', 'GlobalG.A.P.', 'Certificado Fitosanitario Oficial'],
    destacado: 'Ahorro de más de 10 días de navegación gracias al nuevo Megapuerto de Chancay sin transbordos.'
  },
  {
    id: 'yokohama',
    destino: 'Yokohama / Tokio',
    pais: 'Japón',
    region: 'Asia Oriental',
    puertoLlegada: 'Port of Yokohama (Honmoku Pier)',
    puertoSalida: 'Megapuerto de Chancay / Callao',
    diasTransito: '24 – 27 días',
    diasMaritimosMin: 24,
    diasMaritimosMax: 27,
    frecuencia: 'Salida quincenal / semanal programada',
    lineasNavieras: ['ONE', 'Cosco Shipping', 'NYK'],
    temperatura: '+5.0°C a +5.2°C',
    atmosferaControlada: 'O₂: 3.8% | CO₂: 5.2%',
    ventilacion: '20 m³/hora',
    palletsPorContenedor: 20,
    cajasPlato4kg: 5280,
    cajasMaster10kg: 2160,
    calibresRecomendados: 'Calibres 16 y 18 (Estándar Estricto de Piel)',
    certificacionesClave: ['MAFF Japón Protocolo', 'GlobalG.A.P. IFA', 'SENASA'],
    destacado: 'Mercado de alta exigencia estética y organoléptica con control estricto de residuos LMR.'
  },
  {
    id: 'santiago',
    destino: 'Santiago / Cono Sur',
    pais: 'Chile',
    region: 'Latinoamérica & Mercado Regional',
    puertoLlegada: 'Terminal Terrestre Pudahuel / Lo Valledor (Santiago)',
    puertoSalida: 'Despacho Terrestre Directo desde Fundo Calca (Vía Tacna - Chacalluta)',
    diasTransito: '3 – 5 días terrestres',
    diasMaritimosMin: 3,
    diasMaritimosMax: 5,
    frecuencia: 'Salidas diarias en temporada alta',
    lineasNavieras: ['Flota Propia Camiones Reefer ThermoKing'],
    temperatura: '+5.0°C Constante',
    atmosferaControlada: 'Refrigeración Mecánica Monitoreada GPS',
    ventilacion: 'Flujo estándar continuo',
    palletsPorContenedor: 22,
    cajasPlato4kg: 5808,
    cajasMaster10kg: 2376,
    calibresRecomendados: 'Calibres 18, 20, 22 y 24',
    certificacionesClave: ['SAG Chile - SENASA', 'GlobalG.A.P. LocalG.A.P.'],
    destacado: 'Ventana de contraestación inmediata con tránsito terrestre puerta a puerta sin demoras portuarias.'
  }
]

export const MaritimeFreightSimulator: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('rotterdam')
  const [selectedFormat, setSelectedFormat] = useState<'plato' | 'master'>('plato')
  const [containerCount, setContainerCount] = useState<number>(1)
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false)
  const [activeDossierTab, setActiveDossierTab] = useState<'matrix' | 'reefer' | 'customs'>('matrix')

  const currentRoute = RUTAS_SIMULADOR.find(r => r.id === selectedRouteId) || RUTAS_SIMULADOR[0]

  // Cálculos dinámicos
  const totalPallets = currentRoute.palletsPorContenedor * containerCount
  const totalCajas = selectedFormat === 'plato'
    ? currentRoute.cajasPlato4kg * containerCount
    : currentRoute.cajasMaster10kg * containerCount
  const totalKgFruta = selectedFormat === 'plato'
    ? totalCajas * 4
    : totalCajas * 10
  const totalTonFruta = (totalKgFruta / 1000).toFixed(1)

  return (
    <div className="w-full">
      {/* Marco Principal Liquid Glass */}
      <div className="liquid-glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/20 shadow-2xl">
        {/* Esferas luminosas ambientales */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-avocado-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado del Simulador */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div className="max-w-2xl space-y-3">
            <div className="section-badge">
              <span className="section-badge-dot" />
              <span>Herramienta Interactiva de Comercio Exterior B2B</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-cream leading-tight">
              Simulador de Tiempos de Tránsito & Contenedor Reefer
            </h3>
            <p className="text-cream/80 text-sm sm:text-base font-light leading-relaxed">
              Seleccione su puerto de destino para calcular la ventana de navegación, especificaciones de atmósfera controlada en contenedores Reefer 40' High Cube y volúmenes de carga.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDossierOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-forest-900/90 hover:bg-forest-800 text-cream text-xs font-bold border border-avocado-400/40 hover:border-avocado-400 transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-100"
            >
              <FileText className="w-4 h-4 text-avocado-400" />
              <span>Ver Guía Técnica & Dossier Portuario</span>
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SELECTOR DE DESTINOS / MERCADOS (PILLS INTERACTIVAS)                */}
        {/* =================================================================== */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider font-mono font-bold text-cream/70 flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-avocado-400" />
              Seleccione Puerto o Mercado de Destino:
            </label>
            <span className="text-[11px] font-mono text-avocado-300 font-medium">
              6 Terminales Internacionales
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {RUTAS_SIMULADOR.map((r) => {
              const isActive = r.id === selectedRouteId
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRouteId(r.id)}
                  className={`p-3 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-avocado-600/20 border-avocado-400 text-cream shadow-[0_0_20px_rgba(164,227,71,0.25)] ring-1 ring-avocado-400 scale-[1.02]'
                      : 'bg-forest-950/60 border-white/10 hover:border-white/30 text-cream/75 hover:text-cream hover:bg-forest-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold font-serif text-cream truncate">
                      {r.destino}
                    </span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-avocado-400 animate-ping shrink-0" />
                    ) : (
                      <span className="text-[9px] font-mono text-cream/40 uppercase shrink-0">
                        {r.pais.slice(0, 3)}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-avocado-300 font-semibold truncate">
                    {r.diasTransito.split(' ')[0]} {r.diasTransito.split(' ')[1]} d
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL SPLIT THEATER: TELEMETRÍA DE LA RUTA + VISUALIZADOR REEFER    */}
        {/* =================================================================== */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Columna Izquierda: Especificaciones de Navegación & Ruta (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="liquid-glass-card rounded-2xl p-6 sm:p-7 border border-white/15">
              
              {/* Header de la Ruta Seleccionada */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-avocado-500/20 text-avocado-300 border border-avocado-400/40">
                      {currentRoute.region}
                    </span>
                    <span className="text-xs text-cream/60 font-mono">
                      {currentRoute.frecuencia}
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black font-serif text-cream">
                    {currentRoute.destino}, {currentRoute.pais}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-cream/50 block">Tiempo de Tránsito</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-avocado-400">
                    {currentRoute.diasTransito}
                  </span>
                </div>
              </div>

              {/* Puertos de Origen y Llegada */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-forest-950/70 p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-mono text-cream/50 uppercase block mb-1 flex items-center gap-1.5">
                    <Anchor className="w-3 h-3 text-avocado-400" />
                    Terminal de Zarpe (Perú):
                  </span>
                  <p className="text-xs font-semibold text-cream leading-snug">
                    {currentRoute.puertoSalida}
                  </p>
                </div>

                <div className="bg-forest-950/70 p-3.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-mono text-cream/50 uppercase block mb-1 flex items-center gap-1.5">
                    <Ship className="w-3 h-3 text-cyan-400" />
                    Terminal de Arribo (Destino):
                  </span>
                  <p className="text-xs font-semibold text-cream leading-snug">
                    {currentRoute.puertoLlegada}
                  </p>
                </div>
              </div>

              {/* Especificaciones de Conservación Fría en Tránsito */}
              <div className="space-y-3 mb-5">
                <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-cream/60 block">
                  Parámetros Térmicos & de Atmósfera Controlada (CA):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-forest-900/80 border border-emerald-500/30">
                    <span className="text-[10px] text-cream/50 block mb-0.5">Temperatura Cero Deriva</span>
                    <span className="text-sm font-bold font-mono text-emerald-300 flex items-center gap-1.5">
                      <ThermometerSnowflake className="w-4 h-4 text-emerald-400" />
                      {currentRoute.temperatura}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-900/80 border border-cyan-500/30">
                    <span className="text-[10px] text-cream/50 block mb-0.5">Inyección de Gases</span>
                    <span className="text-xs font-bold font-mono text-cyan-300 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-cyan-400" />
                      {currentRoute.atmosferaControlada.split('(')[0]}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-900/80 border border-white/15">
                    <span className="text-[10px] text-cream/50 block mb-0.5">Ventilación Fresca</span>
                    <span className="text-xs font-bold font-mono text-cream truncate block">
                      {currentRoute.ventilacion}
                    </span>
                  </div>
                </div>
              </div>

              {/* Calibres y Certificaciones Requeridas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-cream/50 block mb-1">Calibres Predilectos:</span>
                  <span className="font-semibold text-avocado-300">{currentRoute.calibresRecomendados}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cream/50 block mb-1">Navieras de Servicio:</span>
                  <span className="font-mono text-cream/80">{currentRoute.lineasNavieras.join(' • ')}</span>
                </div>
              </div>

              {/* Nota Destacada del Mercado */}
              <div className="mt-4 p-3 rounded-xl bg-avocado-500/10 border border-avocado-400/30 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                <p className="text-xs text-cream/90 leading-relaxed font-light">
                  {currentRoute.destacado}
                </p>
              </div>

            </div>
          </div>

          {/* Columna Derecha: Calculadora de Contenedores Reefer 40' HC (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="liquid-glass-card rounded-2xl p-6 sm:p-7 border border-white/15 h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-400 flex items-center justify-center">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-cream text-base">
                        Contenedor Reefer 40' High Cube
                      </h5>
                      <span className="text-[10px] font-mono text-cream/60">Carga Frigorífica Palletizada</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-forest-950 text-avocado-400 border border-avocado-400/30">
                    FOB / CIF
                  </span>
                </div>

                {/* Selector de Formato de Empaque */}
                <div className="mb-4">
                  <label className="text-[11px] font-mono font-bold text-cream/70 uppercase block mb-1.5">
                    Formato de Presentación:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedFormat('plato')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedFormat === 'plato'
                          ? 'bg-avocado-600 text-forest-950 border-avocado-400 shadow-md'
                          : 'bg-forest-950/60 border-white/10 text-cream/70 hover:bg-forest-900/60'
                      }`}
                    >
                      Plató 4.0 kg (Retail)
                    </button>
                    <button
                      onClick={() => setSelectedFormat('master')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedFormat === 'master'
                          ? 'bg-avocado-600 text-forest-950 border-avocado-400 shadow-md'
                          : 'bg-forest-950/60 border-white/10 text-cream/70 hover:bg-forest-900/60'
                      }`}
                    >
                      Caja Master 10 kg
                    </button>
                  </div>
                </div>

                {/* Control de Cantidad de Contenedores */}
                <div className="mb-5 bg-forest-950/70 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono font-bold text-cream/70 uppercase">
                      Número de Contenedores Reefer:
                    </label>
                    <span className="text-sm font-mono font-bold text-avocado-300">
                      {containerCount} {containerCount === 1 ? 'Contenedor' : 'Contenedores'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={containerCount}
                      onChange={(e) => setContainerCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-avocado-500"
                    />
                    <div className="flex gap-1.5">
                      {[1, 2, 4, 8].map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setContainerCount(qty)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                            containerCount === qty
                              ? 'bg-avocado-500 text-forest-950'
                              : 'bg-forest-900 text-cream/60 hover:text-cream'
                          }`}
                        >
                          {qty}C
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Métricas Calculadas del Embarque */}
                <div className="space-y-2 mb-6 text-xs bg-forest-900/60 p-4 rounded-xl border border-white/10 font-mono">
                  <div className="flex justify-between items-center text-cream/70">
                    <span>Pallets Estándar:</span>
                    <span className="font-bold text-cream text-sm">{totalPallets} Pallets</span>
                  </div>
                  <div className="flex justify-between items-center text-cream/70">
                    <span>Total de Cajas ({selectedFormat === 'plato' ? '4kg' : '10kg'}):</span>
                    <span className="font-bold text-avocado-300 text-sm">{totalCajas.toLocaleString()} Cajas</span>
                  </div>
                  <div className="flex justify-between items-center text-cream/70 border-t border-white/10 pt-2">
                    <span className="text-cream/90 font-bold">Volumen Neto Fruta:</span>
                    <span className="font-black text-emerald-300 text-base">{totalTonFruta} Toneladas</span>
                  </div>
                </div>
              </div>

              {/* Botón de Acción Directo */}
              <div className="space-y-2.5">
                <Link
                  to={`/cotizar?destino=${encodeURIComponent(currentRoute.destino)}&mercado=${encodeURIComponent(currentRoute.region)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-avocado-900/40 hover:shadow-avocado-500/50 hover:scale-[1.02] active:scale-100 cursor-pointer"
                >
                  <span>Cotizar Embarque a {currentRoute.destino}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] text-cream/50 text-center font-light">
                  Precios FOB Callao/Chancay o CIF puerto convenido. Respuesta comercial en menos de 24 horas.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL / DOSSIER LOGÍSTICO Y FICHA TÉCNICA DE PUERTOS 2026            */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {isDossierOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop oscuro con blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDossierOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Contenedor del Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-forest-950 rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Header Modal */}
              <div className="p-6 sm:p-8 bg-forest-900/90 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-avocado-400 tracking-wider">
                      Agrícola Pilcococha • Ficha Técnica Oficial 2026
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-black text-cream">
                      Dossier Logístico & Tiempos de Tránsito Portuario
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="w-10 h-10 rounded-full bg-forest-800 hover:bg-forest-700 text-cream/70 hover:text-cream flex items-center justify-center transition-colors cursor-pointer"
                  title="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs de Navegación del Dossier */}
              <div className="flex border-b border-white/10 bg-forest-950/80 px-6 sm:px-8">
                <button
                  onClick={() => setActiveDossierTab('matrix')}
                  className={`py-3.5 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    activeDossierTab === 'matrix'
                      ? 'border-avocado-400 text-avocado-300'
                      : 'border-transparent text-cream/60 hover:text-cream'
                  }`}
                >
                  <Ship className="w-4 h-4" />
                  <span>Matriz de Rutas & Frecuencias</span>
                </button>
                <button
                  onClick={() => setActiveDossierTab('reefer')}
                  className={`py-3.5 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    activeDossierTab === 'reefer'
                      ? 'border-avocado-400 text-avocado-300'
                      : 'border-transparent text-cream/60 hover:text-cream'
                  }`}
                >
                  <ThermometerSnowflake className="w-4 h-4" />
                  <span>Estándar Contenedor Reefer CA</span>
                </button>
                <button
                  onClick={() => setActiveDossierTab('customs')}
                  className={`py-3.5 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    activeDossierTab === 'customs'
                      ? 'border-avocado-400 text-avocado-300'
                      : 'border-transparent text-cream/60 hover:text-cream'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Documentación SENASA & Aduanas</span>
                </button>
              </div>

              {/* Contenido Scrolleable del Modal */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-cream/80">
                {activeDossierTab === 'matrix' && (
                  <div className="space-y-4">
                    <p className="text-xs text-cream/70 leading-relaxed font-light">
                      Nuestras salidas marítimas programadas cuentan con espacios pre-reservados durante toda la temporada con las principales navieras globales. A continuación, el resumen de frecuencias y tiempos estimados:
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-white/10 rounded-xl overflow-hidden">
                        <thead className="bg-forest-900/90 text-cream uppercase font-mono text-[10px] tracking-wider border-b border-white/10">
                          <tr>
                            <th className="p-3">Destino</th>
                            <th className="p-3">Terminal Origen</th>
                            <th className="p-3">Días Tránsito</th>
                            <th className="p-3">Frecuencia</th>
                            <th className="p-3">Línea Principal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                          {RUTAS_SIMULADOR.map((r) => (
                            <tr key={r.id} className="hover:bg-forest-900/40">
                              <td className="p-3 font-serif font-bold text-cream">{r.destino} ({r.pais})</td>
                              <td className="p-3 text-cream/70">{r.puertoSalida.split('(')[0]}</td>
                              <td className="p-3 font-bold text-avocado-300">{r.diasTransito}</td>
                              <td className="p-3 text-cream/70">{r.frecuencia}</td>
                              <td className="p-3 text-cream/80">{r.lineasNavieras[0]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeDossierTab === 'reefer' && (
                  <div className="space-y-4">
                    <h5 className="font-serif font-bold text-cream text-base">
                      Protocolo de Cadena de Frío & Atmósfera Controlada (CA)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-forest-900/70 p-4 rounded-xl border border-white/10 space-y-2">
                        <h6 className="font-bold text-avocado-300 font-mono text-[11px] uppercase">
                          Pre-frío & Estibado
                        </h6>
                        <p className="text-cream/75 leading-relaxed font-light">
                          La fruta ingresa a túneles de frío forzado inmediatamente después del empaque hasta alcanzar una pulpa homogénea a +5.0°C antes de ser consolidada en el contenedor.
                        </p>
                      </div>

                      <div className="bg-forest-900/70 p-4 rounded-xl border border-white/10 space-y-2">
                        <h6 className="font-bold text-avocado-300 font-mono text-[11px] uppercase">
                          Atmósfera Controlada (CA)
                        </h6>
                        <p className="text-cream/75 leading-relaxed font-light">
                          Para tránsitos superiores a 15 días (Europa y Asia), aplicamos tecnología Daikin o Carrier Transicold con O₂ al 4% y CO₂ al 5%, ralentizando la maduración y conservando la firmeza verde.
                        </p>
                      </div>

                      <div className="bg-forest-900/70 p-4 rounded-xl border border-white/10 space-y-2">
                        <h6 className="font-bold text-avocado-300 font-mono text-[11px] uppercase">
                          Telemetría Satelital 24/7
                        </h6>
                        <p className="text-cream/75 leading-relaxed font-light">
                          Cada contenedor incluye 2 dataloggers digitales con calibración NIST en pallets testigo para verificación de temperatura y humedad en el puerto de arribo.
                        </p>
                      </div>

                      <div className="bg-forest-900/70 p-4 rounded-xl border border-white/10 space-y-2">
                        <h6 className="font-bold text-avocado-300 font-mono text-[11px] uppercase">
                          Empaque & Palletizado
                        </h6>
                        <p className="text-cream/75 leading-relaxed font-light">
                          Pallets estándar de 1.00 x 1.20 m con esquineros rígidos, zunchado de alta tensión y malla de protección para soportar el oleaje marino sin movimiento de carga.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDossierTab === 'customs' && (
                  <div className="space-y-4">
                    <h5 className="font-serif font-bold text-cream text-base">
                      Documentación de Despacho & Certificaciones de Origen
                    </h5>
                    <p className="text-xs text-cream/70 leading-relaxed font-light">
                      Cada despacho incluye el legajo completo de exportación tramitado mediante la Ventanilla Única de Comercio Exterior (VUCE):
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-forest-900/60 border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-cream block">Certificado Fitosanitario Oficial SENASA</strong>
                          <span className="text-cream/60 text-[11px]">Inspección física en planta y autorización de embarque.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-forest-900/60 border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-cream block">Bill of Lading (B/L) Marítimo</strong>
                          <span className="text-cream/60 text-[11px]">Conocimiento de embarque emitido por la naviera (Originales o Telex Release).</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-forest-900/60 border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-cream block">Certificado de Origen (EUR.1 / Form A)</strong>
                          <span className="text-cream/60 text-[11px]">Para aranceles preferenciales bajo Tratados de Libre Comercio.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-forest-900/60 border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-avocado-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-cream block">Reporte de Calidad & Grasa en Origen</strong>
                          <span className="text-cream/60 text-[11px]">Curva de materia seca calibrada por lote antes del corte.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Modal con Acción */}
              <div className="p-6 bg-forest-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-cream/60 font-mono">
                  Agrícola Pilcococha SAC • RUC 20603849182 • Sede Calca, Cusco
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      alert('Descargando Ficha Técnica Fitosanitaria y Matriz de Puertos 2026 (PDF)...')
                      setIsDossierOpen(false)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream text-xs font-bold border border-white/20 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                  </button>

                  <Link
                    to="/cotizar"
                    onClick={() => setIsDossierOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>Ir al Cotizador B2B</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
