import React, { useEffect, useRef, useState, useMemo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  Ship, 
  Thermometer, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Radio
} from 'lucide-react'

// =============================================================================
// MODELOS DE DATOS: 3 CORREDORES REALES DE EXPORTACIÓN
// =============================================================================

export interface ExportRoute {
  id: string
  codigo: string
  nombre: string
  puerto: string
  region: string
  distanciaKm: number
  tiempoHoras: string
  temperatura: string
  mercados: string[]
  color: string
  description: string
  waypoints: [number, number][]
  zoomBounds: [[number, number], [number, number]]
}

export const SEDE_ORIGEN = {
  id: 'calca',
  nombre: 'Fundo Calca (Origen)',
  valle: 'Valle Sagrado de los Incas &bull; Cusco',
  coordenadas: [-13.3217, -71.9522] as [number, number],
  altitud: '2,920 m.s.n.m.'
}

export const EXPORT_ROUTES: ExportRoute[] = [
  {
    id: 'callao-chancay',
    codigo: 'EXP-LIMA',
    nombre: 'Corredor Central &bull; Callao & Chancay',
    puerto: 'Megapuerto Callao / Chancay',
    region: 'Costa Central (Lima)',
    distanciaKm: 1120,
    tiempoHoras: '22 - 24 horas',
    temperatura: '+5.0°C Garantizado',
    mercados: ['Rotterdam (Países Bajos)', 'Filadelfia (EE.UU.)', 'Algeciras (España)', 'Hamburgo (Alemania)'],
    color: '#10b981', // Esmeralda
    description: 'Puerta principal de exportación a Europa y la Costa Este de EE.UU. Tránsito refrigerado continuo desde el Valle Sagrado hacia los terminales marítimos de Lima para estiba directa en buques portacontenedores.',
    zoomBounds: [[-16.5, -79.5], [-10.0, -70.0]],
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5320, -71.9675], // Cusco
      [-13.6339, -72.8814], // Abancay
      [-14.0417, -73.2389], // Chalhuanca
      [-14.6942, -74.1436], // Puquio
      [-14.8300, -74.9389], // Nazca
      [-14.0678, -75.7286], // Ica
      [-13.7142, -76.2036], // Pisco
      [-13.0778, -76.3889], // Cañete
      [-12.0565, -77.1420], // Callao
      [-11.5724, -77.2711]  // Chancay
    ]
  },
  {
    id: 'paita',
    codigo: 'EXP-NORTE',
    nombre: 'Corredor Norte &bull; Puerto de Paita',
    puerto: 'Puerto de Paita (Piura)',
    region: 'Costa Norte',
    distanciaKm: 1850,
    tiempoHoras: '32 - 34 horas',
    temperatura: '+5.0°C Garantizado',
    mercados: ['Long Beach (California)', 'Yokohama (Japón)', 'Shanghai (China)'],
    color: '#06b6d4', // Cyan
    description: 'Corredor agroexportador septentrional para tránsitos rápidos hacia el Pacífico Norte y Asia, con seguimiento satelital de cadena de frío ininterrumpida.',
    zoomBounds: [[-16.5, -82.5], [-4.0, -69.5]],
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5320, -71.9675], // Cusco
      [-13.6339, -72.8814], // Abancay
      [-14.8300, -74.9389], // Nazca
      [-12.0565, -77.1420], // Lima
      [-9.0744, -78.5936],  // Chimbote
      [-8.1116, -79.0286],  // Trujillo
      [-6.7714, -79.8408],  // Chiclayo
      [-5.1945, -80.6328],  // Piura
      [-5.0892, -81.1144]   // Paita
    ]
  },
  {
    id: 'matarani',
    codigo: 'EXP-SUR',
    nombre: 'Corredor Sur &bull; Puerto de Matarani',
    puerto: 'Puerto de Matarani (Arequipa)',
    region: 'Costa Sur',
    distanciaKm: 650,
    tiempoHoras: '10 - 12 horas',
    temperatura: '+5.0°C Garantizado',
    mercados: ['Valparaíso (Chile)', 'Santos (Brasil)', 'Transbordo Pacífico Sur'],
    color: '#f59e0b', // Ámbar
    description: 'Vía rápida hacia el litoral sur del Pacífico. Conexión intermodal directa para distribución regional y programas especiales de ultramar con menor tiempo terrestre.',
    zoomBounds: [[-18.5, -74.5], [-12.0, -69.0]],
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5320, -71.9675], // Cusco
      [-14.2833, -71.2500], // Sicuani
      [-15.4983, -70.1333], // Juliaca
      [-16.4090, -71.5375], // Arequipa
      [-17.0000, -72.1000]  // Matarani
    ]
  }
]

export const PUERTOS_DESTINO = [
  {
    nombre: 'Megapuerto Callao / Chancay',
    ciudad: 'Callao & Chancay',
    coordenadas: [-12.0565, -77.1420] as [number, number],
    color: '#10b981',
    tipo: 'Gateway Principal Europa & EE.UU.'
  },
  {
    nombre: 'Puerto de Paita',
    ciudad: 'Paita (Piura)',
    coordenadas: [-5.0892, -81.1144] as [number, number],
    color: '#06b6d4',
    tipo: 'Puerto Norte &bull; Asia Pacífico'
  },
  {
    nombre: 'Puerto de Matarani',
    ciudad: 'Matarani (Arequipa)',
    coordenadas: [-17.0000, -72.1000] as [number, number],
    color: '#f59e0b',
    tipo: 'Puerto Sur &bull; Pacífico Sur'
  }
]

// =============================================================================
// COMPONENTE SIMPLIFICADO: CORREDORES LOGÍSTICOS DE EXPORTACIÓN
// =============================================================================

export const PeruLogisticsMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const polylinesRef = useRef<{ [key: string]: { line: L.Polyline; glow: L.Polyline } }>({})
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  const [activeRouteIndex, setActiveRouteIndex] = useState(0)
  const [mapType, setMapType] = useState<'satellite' | 'terrain'>('satellite')
  const activeRoute = useMemo(() => EXPORT_ROUTES[activeRouteIndex], [activeRouteIndex])

  // Inicialización del Mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Mapa centrado en el Perú
    const map = L.map(mapContainerRef.current, {
      center: [-11.5, -75.5],
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false
    })

    // Controles de zoom discretos abajo a la derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Capa Satelital HD Híbrida (Google Maps Satellite con relieve y nombres, 100% gratuita y sin marcas de agua)
    const tileLayer = L.tileLayer(
      mapType === 'satellite'
        ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
        : 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      {
        maxZoom: 18,
        subdomains: ['0', '1', '2', '3']
      }
    ).addTo(map)

    tileLayerRef.current = tileLayer
    mapInstanceRef.current = map

    // 1. Marcador del Fundo en Calca (Origen permanente con pulso esmeralda)
    const originIcon = L.divIcon({
      className: 'origin-marker-icon',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
          <div style="background: #064e3b; color: #a3e635; border: 2px solid #a3e635; padding: 4px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.6); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
            <span>🥑</span>
            <span>Fundo Calca (Origen)</span>
          </div>
          <div style="position: relative; width: 32px; height: 32px; border-radius: 50%; background: #064e3b; border: 3px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(0,0,0,0.6);">
            <div style="position: absolute; inset: -6px; border-radius: 50%; background: #84cc16; opacity: 0.6; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <span style="font-size: 14px;">📍</span>
          </div>
        </div>
      `,
      iconSize: [32, 54],
      iconAnchor: [16, 54]
    })

    const originMarker = L.marker(SEDE_ORIGEN.coordenadas, { icon: originIcon, zIndexOffset: 2000 }).addTo(map)
    originMarker.bindPopup(`
      <div style="padding: 4px; font-family: inherit; color: #fdfbf7;">
        <span style="font-size: 10px; font-weight: 800; color: #a3e635; text-transform: uppercase; letter-spacing: 0.5px;">ORIGEN &bull; COSECHA & PACKING</span>
        <h4 style="font-size: 14px; font-weight: 900; color: #ffffff; margin: 3px 0 2px 0;">${SEDE_ORIGEN.nombre}</h4>
        <p style="font-size: 11px; color: #d1fae5; margin: 0;">${SEDE_ORIGEN.valle} (${SEDE_ORIGEN.altitud})</p>
      </div>
    `)

    // 2. Marcadores de los 3 Puertos de Exportación
    PUERTOS_DESTINO.forEach((puerto) => {
      const icon = L.divIcon({
        className: 'port-marker-icon',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
            <div style="background: #062319; color: #ffffff; border: 1.5px solid ${puerto.color}; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 10px; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.5); margin-bottom: 4px;">
              ${puerto.ciudad}
            </div>
            <div style="width: 24px; height: 24px; border-radius: 50%; background: #062319; border: 2.5px solid ${puerto.color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              <span style="font-size: 11px;">⚓</span>
            </div>
          </div>
        `,
        iconSize: [24, 44],
        iconAnchor: [12, 44]
      })

      const portMarker = L.marker(puerto.coordenadas, { icon, zIndexOffset: 1500 }).addTo(map)
      portMarker.bindPopup(`
        <div style="padding: 4px; font-family: inherit; color: #fdfbf7;">
          <span style="font-size: 10px; font-weight: 800; color: ${puerto.color}; text-transform: uppercase; letter-spacing: 0.5px;">TERMINAL MARÍTIMO DE EMBARQUE</span>
          <h4 style="font-size: 14px; font-weight: 900; color: #ffffff; margin: 3px 0 2px 0;">${puerto.nombre}</h4>
          <p style="font-size: 11px; color: #d1fae5; margin: 0;">${puerto.tipo}</p>
        </div>
      `)
    })

    // 3. Dibujar las 3 Rutas Logísticas
    EXPORT_ROUTES.forEach((ruta, idx) => {
      const isSelected = idx === 0

      const glow = L.polyline(ruta.waypoints, {
        color: ruta.color,
        weight: isSelected ? 8 : 4,
        opacity: isSelected ? 0.5 : 0.15,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map)

      const line = L.polyline(ruta.waypoints, {
        color: ruta.color,
        weight: isSelected ? 4 : 2,
        opacity: isSelected ? 0.95 : 0.4,
        dashArray: isSelected ? '8, 10' : '4, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map)

      line.on('click', () => {
        setActiveRouteIndex(idx)
      })

      polylinesRef.current[ruta.id] = { line, glow }
    })

    // Encuadre inicial que abarca la ruta principal con margen
    map.fitBounds(EXPORT_ROUTES[0].zoomBounds, {
      padding: [60, 60],
      maxZoom: 7,
      animate: false
    })

    // Invalidar tamaño para asegurar renderizado correcto al montar
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 150)

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize()
    })
    resizeObserver.observe(mapContainerRef.current)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
      map.remove()
      mapInstanceRef.current = null
      tileLayerRef.current = null
    }
  }, [])

  // Cambiar capa de mapa (Satélite vs Terreno)
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }

    const tileUrl = mapType === 'satellite'
      ? 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
      : 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'

    const newLayer = L.tileLayer(tileUrl, {
      maxZoom: 18,
      subdomains: ['0', '1', '2', '3']
    }).addTo(map)

    tileLayerRef.current = newLayer
  }, [mapType])

  // Actualizar estilos y zoom cuando cambia la ruta activa
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    EXPORT_ROUTES.forEach((ruta, idx) => {
      const isSelected = idx === activeRouteIndex
      const refs = polylinesRef.current[ruta.id]
      if (refs) {
        refs.line.setStyle({
          weight: isSelected ? 4.5 : 2,
          opacity: isSelected ? 1 : 0.35,
          dashArray: isSelected ? '8, 10' : '4, 8'
        })
        refs.glow.setStyle({
          weight: isSelected ? 10 : 4,
          opacity: isSelected ? 0.55 : 0.12
        })
      }
    })

    // Ajuste de encuadre suave hacia la ruta seleccionada con límite de zoom seguro
    map.fitBounds(activeRoute.zoomBounds, {
      padding: [60, 60],
      maxZoom: 7,
      animate: true,
      duration: 0.8
    })
  }, [activeRouteIndex, activeRoute])

  return (
    <div className="w-full flex flex-col space-y-6 select-none">
      
      {/* ============================================================== */}
      {/* 1. SELECTOR EJECUTIVO DE LOS 3 CORREDORES DE EXPORTACIÓN       */}
      {/* ============================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-avocado-300 font-bold">
              Corredores Viales &bull; Fundo Calca a Puertos
            </span>
          </div>
          <p className="text-xs text-cream/70 font-light mt-0.5">
            Seleccione el corredor para revisar tiempo de tránsito, distancia y puertos de ultramar conectados.
          </p>
        </div>

        {/* Píldoras de las 3 Rutas */}
        <div className="flex flex-wrap gap-2">
          {EXPORT_ROUTES.map((ruta, idx) => {
            const isActive = idx === activeRouteIndex
            return (
              <button
                key={ruta.id}
                onClick={() => setActiveRouteIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'bg-forest-900 border-avocado-400 shadow-[0_0_15px_rgba(164,227,71,0.3)] ring-1 ring-avocado-400 scale-[1.02] text-cream'
                    : 'bg-forest-950/80 border-white/10 text-cream/70 hover:bg-forest-900 hover:text-white'
                }`}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: ruta.color }} 
                />
                <span>{ruta.puerto}</span>
                <span className="text-[10px] font-mono text-cream/60">({ruta.tiempoHoras})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MAPA SATELITAL HD CON FICHA TÉCNICA FLOTANTE                */}
      {/* ============================================================== */}
      <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl h-[440px] sm:h-[500px] lg:h-[560px] bg-forest-950">
        {/* Lienzo Leaflet con Satélite HD Google Maps */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Tarjeta Flotante ubicada a la DERECHA para dejar libre la costa y los puertos */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 max-w-[calc(100%-1.5rem)] sm:max-w-md pointer-events-auto">
          <div className="liquid-glass-panel rounded-2xl p-4 sm:p-5 border border-white/25 shadow-2xl backdrop-blur-xl bg-forest-950/90">
            
            {/* Cabecera del Corredor */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span 
                className="px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono uppercase tracking-wider text-forest-950 shadow-xs"
                style={{ backgroundColor: activeRoute.color }}
              >
                {activeRoute.codigo}
              </span>
              <span className="text-[10px] font-mono text-cream/70 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Monitoreo 24/7</span>
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold font-serif text-cream leading-tight">
              {activeRoute.puerto}
            </h4>
            <p className="text-[11px] text-cream/75 leading-relaxed mt-1 mb-3 line-clamp-2">
              {activeRoute.description}
            </p>

            {/* Métricas Principales */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 mb-3">
              <div className="bg-forest-950/80 p-2 rounded-xl border border-white/10">
                <span className="text-[9px] uppercase font-mono text-cream/60 block">Tránsito Terrestre</span>
                <span className="text-xs sm:text-sm font-bold text-cream font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-avocado-400" />
                  <span>{activeRoute.tiempoHoras}</span>
                </span>
                <span className="text-[9px] text-cream/50 font-mono block mt-0.5">{activeRoute.distanciaKm} km asfaltados</span>
              </div>

              <div className="bg-forest-950/80 p-2 rounded-xl border border-white/10">
                <span className="text-[9px] uppercase font-mono text-cream/60 block">Cadena de Frío</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <Thermometer className="w-3 h-3" />
                  <span>{activeRoute.temperatura}</span>
                </span>
                <span className="text-[9px] text-cream/50 font-mono block mt-0.5">Termógrafo satelital</span>
              </div>
            </div>

            {/* Puertos de Ultramar Conectados */}
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-avocado-300 font-bold block mb-1">
                Conexión Marítima Directa a Ultramar:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeRoute.mercados.map((m, i) => (
                  <span 
                    key={i} 
                    className="text-[9.5px] font-mono text-cream/90 bg-white/10 px-2 py-0.5 rounded-md border border-white/10"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Selector de Capa Satélite/Relieve y Leyenda en Esquina Inferior Izquierda */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Alternador de Capa Satélite vs Relieve */}
          <div className="bg-forest-950/90 backdrop-blur-md p-1 rounded-xl border border-white/20 flex items-center gap-1 text-[11px] shadow-lg">
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                mapType === 'satellite'
                  ? 'bg-avocado-500 text-forest-950 shadow-xs'
                  : 'text-cream/70 hover:text-white'
              }`}
            >
              Satélite HD
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                mapType === 'terrain'
                  ? 'bg-avocado-500 text-forest-950 shadow-xs'
                  : 'text-cream/70 hover:text-white'
              }`}
            >
              Relieve Andino
            </button>
          </div>

          {/* Leyenda Compacta */}
          <div className="hidden sm:flex items-center gap-3 bg-forest-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              <span className="text-cream/90 font-medium">Origen Calca</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 border border-white" />
              <span className="text-cream/90 font-medium">Puertos Marítimos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-avocado-400" />
              <span className="text-avocado-300 font-bold">Ruta Activa</span>
            </div>
          </div>
        </div>

        {/* Estilos CSS específicos de Leaflet para integración visual */}
        <style>{`
          .origin-marker-icon, .port-marker-icon {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-popup-content-wrapper {
            background: #062319 !important;
            color: #fdfbf7 !important;
            border: 1px solid rgba(255, 255, 255, 0.25) !important;
            border-radius: 14px !important;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6) !important;
          }
          .leaflet-popup-tip {
            background: #062319 !important;
          }
          .leaflet-popup-close-button {
            color: rgba(255, 255, 255, 0.7) !important;
          }
        `}</style>
      </div>

      {/* ============================================================== */}
      {/* 3. TRES GARANTÍAS LOGÍSTICAS DE EXPORTACIÓN                    */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        
        {/* Garantía 1 */}
        <div className="liquid-glass-card rounded-2xl p-4 flex items-start gap-3.5 border border-white/15">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-cream">Cadena de Frío a 5.0°C Continua</h5>
            <p className="text-xs text-cream/70 font-light mt-0.5 leading-relaxed">
              Cámaras frigoríficas selladas y pre-enfriado rápido en packing. La fruta entra en latencia vegetal desde Fundo Calca hasta el buque.
            </p>
          </div>
        </div>

        {/* Garantía 2 */}
        <div className="liquid-glass-card rounded-2xl p-4 flex items-start gap-3.5 border border-white/15">
          <div className="w-9 h-9 rounded-xl bg-avocado-500/20 border border-avocado-400/40 text-avocado-300 flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-cream">Precinto Fitosanitario SENASA</h5>
            <p className="text-xs text-cream/70 font-light mt-0.5 leading-relaxed">
              Inspección fitosanitaria en origen y sellado oficial de cada contenedor reefer. Trazabilidad completa con código de lote exportable.
            </p>
          </div>
        </div>

        {/* Garantía 3 */}
        <div className="liquid-glass-card rounded-2xl p-4 flex items-start gap-3.5 border border-white/15">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center shrink-0 shadow-xs">
            <Ship className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-cream">Conexión Directa a Buque Portacontenedores</h5>
            <p className="text-xs text-cream/70 font-light mt-0.5 leading-relaxed">
              Programación Just-in-Time coordinada con líneas navieras internacionales (Maersk, MSC, Hapag-Lloyd) en Callao, Chancay y Paita.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
