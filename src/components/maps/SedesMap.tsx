import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  MapPin, 
  ExternalLink, 
  Mountain, 
  Compass, 
  Copy, 
  Check, 
  Layers, 
  Satellite, 
  ZoomIn, 
  Eye, 
  Globe, 
  Sparkles,
  Maximize2
} from 'lucide-react'

export interface Sede {
  id: string
  nombre: string
  subtitulo: string
  valle: string
  departamento: string
  altitud: string
  coordenadas: [number, number] // [lat, lng]
  descripcion: string
  caracteristicas: string[]
  googleMapsUrl: string
  tipo: 'Fundo Agrícola' | 'Sede y Acopio'
}

export const SEDES_DATA: Sede[] = [
  {
    id: 'calca-pisac',
    nombre: 'Sede Calca - Pisac',
    subtitulo: 'Fundo Agrícola Pacocha SAC',
    valle: 'Valle Sagrado de los Incas (Sector Pisac / Calca)',
    departamento: 'Cusco, Perú',
    altitud: '2,920 m.s.n.m.',
    coordenadas: [-13.3217292, -71.9521573], // [lat, lng]
    tipo: 'Fundo Agrícola',
    descripcion: 'Campos de cultivo de Palta Hass con microclima templado de valle interandino, regados con agua pura de deshielos y suelo con excelente drenaje.',
    caracteristicas: [
      'Huertos de Palta Hass en producción',
      'Sistema de riego tecnificado por goteo',
      'Control fitosanitario permanente SENASA',
      'Acceso directo por la carretera del Valle Sagrado'
    ],
    googleMapsUrl: 'https://www.google.com/maps/place/AGRICOLA+PACOCHA+SAC/@-13.3216797,-71.9522025,3a,75y,140.99h,90t/data=!3m7!1e1!3m5!1sBx-3Bdjq0JywlgaXswz4cA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DBx-3Bdjq0JywlgaXswz4cA%26yaw%3D140.98607!7i16384!8i8192!4m14!1m7!3m6!1s0x916ddf8c54119e5b:0x645ec9a7588db2ff!2sAGRICOLA+PACOCHA+SAC!8m2!3d-13.3217292!4d-71.9521573!16s%2Fg%2F11wjkd5b31!3m5!1s0x916ddf8c54119e5b:0x645ec9a7588db2ff!8m2!3d-13.3217292!4d-71.9521573!16s%2Fg%2F11wjkd5b31?hl=es-419',
  },
  {
    id: 'urubamba-huayllabamba',
    nombre: 'Sede Urubamba - Huayllabamba',
    subtitulo: 'Fundo Agrícola Pacocha SAC',
    valle: 'Valle Sagrado de los Incas (Sector Huayllabamba / Urubamba)',
    departamento: 'Cusco, Perú',
    altitud: '2,870 m.s.n.m.',
    coordenadas: [-13.3064008, -72.1191834], // [lat, lng]
    tipo: 'Sede y Acopio',
    descripcion: 'Punto neurálgico de operaciones agrícolas en el corazón del Valle Sagrado. Alta insolación diurna y noches frescas que favorecen la acumulación de materia seca y aceite natural.',
    caracteristicas: [
      'Plantaciones tecnificadas de alta densidad',
      'Punto de acopio y recepción de cosecha',
      'Monitoreo agronómico y estación meteorológica',
      'Logística de salida hacia puertos de exportación'
    ],
    googleMapsUrl: 'https://www.google.com/maps/place/AGRICOLA+PACOCHA+SAC/@-13.3064008,-72.1191834,15z/data=!4m6!3m5!1s0x916ddd3369dc2195:0xdcc579f19fd66120!8m2!3d-13.3064008!4d-72.1191834!16s%2Fg%2F11lv41jzny?hl=es',
  },
]

const CARTO_API_KEY = (import.meta.env.VITE_CARTO_API_KEY || '').trim()
const isBasemapKey = Boolean(CARTO_API_KEY && !CARTO_API_KEY.startsWith('ey'))

export type LayerType = 'satellite' | 'terrain' | 'esri' | 'editorial'

export interface LayerConfig {
  name: string
  label: string
  desc: string
  url: string
  attribution: string
  maxZoom: number
  subdomains?: string[]
}

const TILES: Record<LayerType, LayerConfig> = {
  satellite: {
    name: 'Satélite HD Realista',
    label: 'Satélite HD',
    desc: 'Fotografía satelital ultra nítida con nombres de vías y pueblos',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps &mdash; Maxar, CNES/Airbus',
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3'],
  },
  terrain: {
    name: 'Relieve Andino 3D',
    label: 'Relieve 3D',
    desc: 'Sombras de montaña, elevación y topografía del Valle Sagrado',
    url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps &mdash; Topografía y Sombras',
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3'],
  },
  esri: {
    name: 'Satélite Natural (Esri)',
    label: 'Foto Pura',
    desc: 'Imagen satelital natural de alta fidelidad sin textos',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 19,
  },
  editorial: {
    name: isBasemapKey ? 'Mapa Editorial (CARTO)' : 'Mapa Callejero (OSM)',
    label: 'Editorial',
    desc: 'Plano gráfico vectorial ilustrado',
    url: isBasemapKey
      ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: isBasemapKey
      ? '&copy; <a href="https://carto.com/" target="_blank">CARTO</a>, &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c', 'd'],
  },
}

export const SedesMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})
  const circlesRef = useRef<{ [key: string]: L.Circle }>({})
  const [selectedSede, setSelectedSede] = useState<Sede>(SEDES_DATA[0])
  const [activeLayer, setActiveLayer] = useState<LayerType>('satellite')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Crear o actualizar icono de marcador
  const createCustomIcon = (sede: Sede, isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
          <div style="background: ${isSelected ? '#0e2c20' : '#ffffff'}; color: ${isSelected ? '#9ab55d' : '#0e2c20'}; border: 2px solid ${isSelected ? '#9ab55d' : '#0e2c20'}; padding: 4px 10px; border-radius: 9999px; font-weight: 700; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.25); margin-bottom: 4px; transition: transform 0.2s;">
            🥑 ${sede.nombre}
          </div>
          <div style="position: relative; width: 38px; height: 38px; border-radius: 50%; background: #173d2d; border: 3px solid ${isSelected ? '#9ab55d' : '#ffffff'}; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(0,0,0,0.45);">
            ${isSelected ? '<div style="position: absolute; inset: -6px; border-radius: 50%; background: #9ab55d; opacity: 0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#9ab55d' : '#f7f4ea'}" stroke-width="2.5">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="3" fill="${isSelected ? '#9ab55d' : '#f7f4ea'}"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [38, 62],
      iconAnchor: [19, 62],
      popupAnchor: [0, -62],
    })
  }

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Centrado inicial cercano al primer fundo
    const initialCenter = selectedSede.coordenadas
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: true,
      maxZoom: 20,
    })

    const currentTileConfig = TILES[activeLayer]
    const tile = L.tileLayer(currentTileConfig.url, {
      attribution: currentTileConfig.attribution,
      maxZoom: currentTileConfig.maxZoom,
      subdomains: currentTileConfig.subdomains || ['a', 'b', 'c', 'd'],
    }).addTo(map)

    tileLayerRef.current = tile
    mapInstanceRef.current = map

    // Añadir marcadores y perímetro agronómico a cada sede
    SEDES_DATA.forEach((sede) => {
      const isSelected = sede.id === selectedSede.id

      // Círculo perimetral del fundo agrícola
      const circle = L.circle(sede.coordenadas, {
        radius: 280, // ~280 metros de huertos
        color: isSelected ? '#9ab55d' : '#173d2d',
        fillColor: isSelected ? '#9ab55d' : '#173d2d',
        fillOpacity: isSelected ? 0.22 : 0.10,
        weight: isSelected ? 2.5 : 1.5,
        dashArray: isSelected ? '6, 6' : '3, 6',
      }).addTo(map)

      circle.bindTooltip(`🌱 Huertos de Palta Hass &bull; ${sede.nombre}`, {
        direction: 'top',
        permanent: false,
      })

      circlesRef.current[sede.id] = circle

      const marker = L.marker(sede.coordenadas, {
        icon: createCustomIcon(sede, isSelected),
        zIndexOffset: isSelected ? 1000 : 500,
      }).addTo(map)

      const popupContent = `
        <div style="font-family: inherit; padding: 6px; max-width: 270px;">
          <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #173d2d; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">
            ${sede.tipo}
          </span>
          <h4 style="font-size: 16px; font-weight: 900; color: #0e2c20; margin: 0 0 4px 0; font-family: Fraunces, serif;">
            ${sede.nombre}
          </h4>
          <p style="font-size: 11px; color: #687168; margin: 0 0 8px 0;">
            ${sede.valle} (${sede.altitud})
          </p>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <a href="${sede.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: #173d2d; color: #ffffff; text-decoration: none; border-radius: 9999px; font-size: 11px; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
              Abrir Google Maps ↗
            </a>
          </div>
        </div>
      `
      marker.bindPopup(popupContent)

      marker.on('click', () => {
        setSelectedSede(sede)
      })

      markersRef.current[sede.id] = marker
    })

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Cambiar capa de mapa (Satélite HD / Relieve 3D / Foto Pura / Editorial)
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return
    mapInstanceRef.current.removeLayer(tileLayerRef.current)
    const layerConfig = TILES[activeLayer]
    const newTile = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains || ['a', 'b', 'c', 'd'],
    }).addTo(mapInstanceRef.current)
    tileLayerRef.current = newTile
  }, [activeLayer])

  // Actualizar marcadores, perímetros y enfocar de cerca al cambiar selectedSede
  useEffect(() => {
    if (!mapInstanceRef.current) return

    SEDES_DATA.forEach((sede) => {
      const isSelected = sede.id === selectedSede.id
      const marker = markersRef.current[sede.id]
      if (marker) {
        marker.setIcon(createCustomIcon(sede, isSelected))
        marker.setZIndexOffset(isSelected ? 1000 : 500)
      }
      const circle = circlesRef.current[sede.id]
      if (circle) {
        circle.setStyle({
          color: isSelected ? '#9ab55d' : '#173d2d',
          fillColor: isSelected ? '#9ab55d' : '#173d2d',
          fillOpacity: isSelected ? 0.22 : 0.10,
          weight: isSelected ? 2.5 : 1.5,
          dashArray: isSelected ? '6, 6' : '3, 6',
        })
      }
    })

    // Zoom cercano directo al huerto (zoom 16.5)
    mapInstanceRef.current.flyTo(selectedSede.coordenadas, 16.5, {
      animate: true,
      duration: 1.4,
    })
  }, [selectedSede])

  const handleSelectSede = (sede: Sede) => {
    setSelectedSede(sede)
  }

  const handleZoomHuerto = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSede.coordenadas, 18, {
        animate: true,
        duration: 1.0,
      })
    }
  }

  const handleZoomParcela = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSede.coordenadas, 16, {
        animate: true,
        duration: 1.0,
      })
    }
  }

  const handleViewAll = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-13.314, -72.035], 11.5, {
        animate: true,
        duration: 1.2,
      })
    }
  }

  const copyCoordinates = (sede: Sede) => {
    const text = `${sede.coordenadas[0]}, ${sede.coordenadas[1]}`
    navigator.clipboard.writeText(text)
    setCopiedId(sede.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/10 text-forest-800 text-xs font-bold uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Valle Sagrado de los Incas • Cusco, Perú</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-forest-950 leading-tight">
              Nuestras 2 Sedes y Fundos
            </h2>
            <p className="text-muted text-base md:text-lg mt-3 leading-relaxed">
              Explora nuestros campos de cultivo y centros de acopio en fotografía satelital real de alta resolución, a más de 2,800 metros de altitud.
            </p>
          </div>

          {/* Acciones Rápidas */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleZoomHuerto}
              className="px-3.5 py-2 rounded-full bg-forest-950 hover:bg-forest-900 text-avocado-400 font-bold text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5"
              title="Acercamiento máximo al huerto de palta"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Zoom Huerto (18x)</span>
            </button>

            <button
              onClick={handleViewAll}
              className="px-4 py-2 rounded-full bg-white hover:bg-sand border border-charcoal/15 text-charcoal font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ver ambas sedes</span>
            </button>

            {isBasemapKey && (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-800/10 text-forest-800 text-[11px] font-mono font-bold border border-forest-800/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                CARTO Ready
              </span>
            )}
          </div>
        </div>

        {/* Selector de Sedes (Pestañas visuales) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SEDES_DATA.map((sede) => {
            const isSelected = selectedSede.id === sede.id
            return (
              <div
                key={sede.id}
                onClick={() => handleSelectSede(sede)}
                className={`p-6 rounded-3xl cursor-pointer transition-all border text-left relative overflow-hidden ${
                  isSelected
                    ? 'bg-forest-950 text-cream border-forest-800 shadow-xl scale-[1.01]'
                    : 'bg-white hover:bg-sand/60 text-charcoal border-charcoal/10 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-avocado-400 text-forest-950' : 'bg-forest-800/10 text-forest-800'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isSelected ? 'text-avocado-400' : 'text-forest-800'
                      }`}>
                        {sede.tipo}
                      </span>
                      <h3 className={`text-xl font-bold font-serif ${isSelected ? 'text-cream' : 'text-forest-950'}`}>
                        {sede.nombre}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                    isSelected ? 'bg-white/10 text-cream' : 'bg-sand text-charcoal/70'
                  }`}>
                    {sede.altitud}
                  </span>
                </div>

                <p className={`text-xs mt-3 leading-relaxed ${
                  isSelected ? 'text-cream/80' : 'text-muted'
                }`}>
                  {sede.valle} — {sede.departamento}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className={`font-semibold flex items-center gap-1.5 ${
                    isSelected ? 'text-avocado-400' : 'text-forest-800'
                  }`}>
                    {isSelected ? '● Enfocada en Satélite HD' : 'Explorar en el mapa →'}
                  </span>

                  <a
                    href={sede.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold underline underline-offset-2 ${
                      isSelected ? 'text-cream/90 hover:text-white' : 'text-forest-800 hover:text-forest-600'
                    }`}
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contenedor del Mapa Leaflet Interactivo */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sand relative h-[600px]">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Selector Flotante de Modos de Vista (Top-Right) */}
          <div className="absolute top-4 right-4 z-[1000] bg-forest-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-1">
            <button
              onClick={() => setActiveLayer('satellite')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'satellite'
                  ? 'bg-avocado-400 text-forest-950 shadow-md scale-[1.02]'
                  : 'text-cream/80 hover:text-white hover:bg-white/10'
              }`}
              title="Fotografía satelital realista de alta definición con nombres de poblados y caminos"
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Satélite HD</span>
            </button>

            <button
              onClick={() => setActiveLayer('terrain')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'terrain'
                  ? 'bg-avocado-400 text-forest-950 shadow-md scale-[1.02]'
                  : 'text-cream/80 hover:text-white hover:bg-white/10'
              }`}
              title="Relieve topográfico 3D con sombras de las montañas andinas"
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Relieve 3D</span>
            </button>

            <button
              onClick={() => setActiveLayer('esri')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'esri'
                  ? 'bg-avocado-400 text-forest-950 shadow-md scale-[1.02]'
                  : 'text-cream/80 hover:text-white hover:bg-white/10'
              }`}
              title="Foto aérea satelital pura (sin etiquetas)"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Foto Pura</span>
            </button>

            <button
              onClick={() => setActiveLayer('editorial')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'editorial'
                  ? 'bg-avocado-400 text-forest-950 shadow-md scale-[1.02]'
                  : 'text-cream/80 hover:text-white hover:bg-white/10'
              }`}
              title="Mapa plano ilustrado"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editorial</span>
            </button>
          </div>

          {/* Barra Flotante de Perspectiva y Zoom (Top-Left al lado de controles + -) */}
          <div className="absolute top-4 left-14 z-[1000] hidden sm:flex items-center gap-2 bg-forest-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15 shadow-xl text-xs text-cream">
            <span className="text-[11px] font-bold text-avocado-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-avocado-400 animate-pulse" />
              {selectedSede.nombre}
            </span>
            <span className="text-white/20">|</span>
            <button
              onClick={handleZoomHuerto}
              className="hover:text-avocado-400 transition-colors font-bold flex items-center gap-1 text-[11px]"
              title="Acercarse al máximo nivel de detalle para ver los árboles de palta"
            >
              <ZoomIn className="w-3 h-3 text-avocado-400" />
              <span>Detalle Huerto (18x)</span>
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={handleZoomParcela}
              className="hover:text-avocado-400 transition-colors text-cream/80 text-[11px]"
              title="Vista de la parcela completa y el río"
            >
              <span>Parcela (16x)</span>
            </button>
          </div>

          {/* Tarjeta flotante con datos de la sede seleccionada sobre el mapa */}
          <div className="absolute bottom-6 left-6 max-w-sm hidden sm:block bg-forest-950/95 backdrop-blur-md text-cream p-5 rounded-2xl shadow-2xl border border-white/15 z-[1000]">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[11px] uppercase tracking-wider text-avocado-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {selectedSede.tipo}
              </span>
              <span className="text-xs text-cream/70 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                <Mountain className="w-3 h-3 text-avocado-400" />
                {selectedSede.altitud}
              </span>
            </div>
            <h4 className="text-lg font-serif font-bold text-cream mb-1">{selectedSede.nombre}</h4>
            <p className="text-xs text-cream/70 leading-relaxed mb-3">{selectedSede.descripcion}</p>

            <div className="space-y-1.5 text-xs text-cream/85 mb-4">
              {selectedSede.caracteristicas.slice(0, 2).map((c, i) => (
                <p key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-avocado-400 shrink-0" />
                  <span>{c}</span>
                </p>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
              <a
                href={selectedSede.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-forest-950 bg-avocado-400 hover:bg-avocado-300 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                title="Abrir en Google Maps o Street View 360°"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Street View 360°</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => copyCoordinates(selectedSede)}
                className="text-cream/70 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px]"
                title="Copiar coordenadas GPS"
              >
                {copiedId === selectedSede.id ? (
                  <>
                    <Check className="w-3 h-3 text-avocado-400" />
                    <span className="text-avocado-400 font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Coords</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
