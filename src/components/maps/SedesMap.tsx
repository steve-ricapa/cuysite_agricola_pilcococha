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
  Navigation,
  Rocket
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
]

// Key pública de CARTO basemaps (expuesta en frontend por diseño — no es secreta)
const CARTO_API_KEY = 'cb1_47p3_1_8b3ada91baa16541cf10907e'
const isBasemapKey = true

export type LayerType = 'satellite' | 'terrain' | 'esri' | 'editorial'

export interface LayerConfig {
  name: string
  label: string
  desc: string
  url: string
  attribution: string
  maxZoom: number
  maxNativeZoom?: number
  subdomains?: string[]
  recommendedZoom?: number
}

const TILES: Record<LayerType, LayerConfig> = {
  satellite: {
    name: 'Satélite HD Realista',
    label: 'Satélite HD',
    desc: 'Fotografía satelital ultra nítida con nombres de vías y parcelas',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps &mdash; Maxar, CNES/Airbus',
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3'],
    recommendedZoom: 16.5, // Enfoque cercano de huertos y árboles
  },
  terrain: {
    name: 'Relieve Andino 3D',
    label: 'Relieve 3D',
    desc: 'Sombras de montaña, elevación y topografía 3D de la cordillera andina',
    url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps &mdash; Topografía y Sombras 3D',
    maxZoom: 20,
    maxNativeZoom: 15,
    subdomains: ['0', '1', '2', '3'],
    recommendedZoom: 12.5, // Altitud panorámica donde se aprecian las montañas y el cañón del Valle Sagrado
  },
  esri: {
    name: 'Satélite Natural (Esri)',
    label: 'Foto Pura',
    desc: 'Imagen satelital natural de alta fidelidad sin textos',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics',
    maxZoom: 19,
    maxNativeZoom: 15, // Evita "Map data not yet available" escalando tiles nativos de Esri
    recommendedZoom: 14.5, // Vista de valle natural limpia y completa
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
    recommendedZoom: 15.0,
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

  // Estados para animación cinematográfica de descenso espacial por etapas (Waypoints)
  const [isDescending, setIsDescending] = useState(false)
  const [descentAltitude, setDescentAltitude] = useState<number>(450000)
  const [descentStage, setDescentStage] = useState<string>('Órbita Terrestre • Continente Sudamericano')
  const hasDescendedRef = useRef<boolean>(false)
  const descentTimersRef = useRef<{ timeouts: ReturnType<typeof setTimeout>[] }>({ timeouts: [] })

  const clearDescentTimers = () => {
    descentTimersRef.current.timeouts.forEach((t) => clearTimeout(t))
    descentTimersRef.current.timeouts = []
  }

  // Ocultar marcadores y perímetros durante la vista orbital para no tapar los continentes
  const hideMarkersAndCircles = () => {
    Object.values(markersRef.current).forEach((marker) => {
      marker.setOpacity(0)
    })
    Object.values(circlesRef.current).forEach((circle) => {
      circle.setStyle({ opacity: 0, fillOpacity: 0 })
    })
  }

  // Restaurar marcadores y perímetro agronómico al tocar tierra
  const showMarkersAndCircles = () => {
    Object.values(markersRef.current).forEach((marker) => {
      marker.setOpacity(1)
    })
    Object.values(circlesRef.current).forEach((circle) => {
      circle.setStyle({
        opacity: 1,
        fillOpacity: 0.18,
        color: '#9ab55d',
        fillColor: '#9ab55d',
        weight: 2,
        dashArray: '6, 8',
      })
    })
  }

  // Precargar en la memoria caché del navegador los tiles satelitales del trayecto
  const prefetchSatelliteFlightTiles = (coords: [number, number]) => {
    const [lat, lng] = coords
    const levels = [4, 7, 11, 14, 16]
    levels.forEach((z) => {
      const n = Math.pow(2, z)
      const x = Math.floor(((lng + 180) / 360) * n)
      const latRad = (lat * Math.PI) / 180
      const y = Math.floor(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n)

      const sub = ['0', '1', '2', '3'][(x + y) % 4]
      const img = new Image()
      img.src = `https://mt${sub}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`
    })
  }

  // Disparar vuelo cinematográfico por etapas (Waypoints) desde el espacio exterior
  // Resuelve la pantalla verde dividiendo el descenso en 4 saltos suaves (máx 3.5 niveles)
  // permitiendo que Leaflet descargue y pinte la fotografía satelital real de Perú, Cusco y el Valle
  const triggerSpaceDescent = () => {
    if (!mapInstanceRef.current) return
    const map = mapInstanceRef.current

    // Limpiar temporizadores anteriores si los hubiera
    clearDescentTimers()

    // Cambiar de inmediato a Satélite HD si estamos en otra capa
    if (activeLayer !== 'satellite') {
      const satConfig = TILES.satellite
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current)
      }
      const newTile = L.tileLayer(satConfig.url, {
        attribution: satConfig.attribution,
        maxZoom: satConfig.maxZoom,
        subdomains: satConfig.subdomains,
        updateWhenZooming: true,
        updateWhenIdle: false,
        keepBuffer: 8,
      }).addTo(map)
      tileLayerRef.current = newTile
      setActiveLayer('satellite')
    }

    // Ocultar marcadores para vista orbital limpia
    hideMarkersAndCircles()

    // Precargar tiles satelitales del trayecto
    prefetchSatelliteFlightTiles(selectedSede.coordenadas)

    setIsDescending(true)
    setDescentAltitude(450000)
    setDescentStage('Órbita Terrestre • Continente Sudamericano')

    // Posición inicial: Vista orbital de Sudamérica (zoom 3.8)
    map.setView([-11.0, -75.0], 3.8, { animate: false })

    // Waypoint 1: Reingreso atmosférico -> Territorio Peruano (zoom 7.0)
    const t1 = setTimeout(() => {
      if (!mapInstanceRef.current) return
      setDescentAltitude(120000)
      setDescentStage('Reingreso Atmosférico • Territorio Peruano')

      map.flyTo([-12.2, -74.5], 7.0, {
        animate: true,
        duration: 1.3,
        easeLinearity: 0.3,
      })
    }, 800)

    // Waypoint 2: Territorio peruano -> Cordillera de los Andes / Región Cusco (zoom 10.8)
    const t2 = setTimeout(() => {
      if (!mapInstanceRef.current) return
      setDescentAltitude(35000)
      setDescentStage('Cordillera de los Andes • Región Cusco')

      map.flyTo([-13.35, -72.1], 10.8, {
        animate: true,
        duration: 1.3,
        easeLinearity: 0.3,
      })
    }, 2200)

    // Waypoint 3: Cordillera -> Valle Sagrado de los Incas / Cañón Vilcanota (zoom 14.0)
    const t3 = setTimeout(() => {
      if (!mapInstanceRef.current) return
      setDescentAltitude(8500)
      setDescentStage('Valle Sagrado de los Incas • Cañón Vilcanota')

      map.flyTo([-13.323, -71.96], 14.0, {
        animate: true,
        duration: 1.2,
        easeLinearity: 0.3,
      })
    }, 3600)

    // Waypoint 4: Cañón -> Aterrizaje en Fundo Calca (zoom 16.5)
    const t4 = setTimeout(() => {
      if (!mapInstanceRef.current) return
      setDescentAltitude(2920)
      setDescentStage('¡Aterrizaje en Fundo Calca • Huerto de Palta Hass!')

      map.flyTo(selectedSede.coordenadas, 16.5, {
        animate: true,
        duration: 1.1,
        easeLinearity: 0.25,
      })
    }, 4900)

    // Waypoint 5: Touchdown completado -> Restaurar marcador y círculo
    const t5 = setTimeout(() => {
      showMarkersAndCircles()
      setDescentAltitude(2920)
      setDescentStage('Sede Calca - Pisac • 2,920 m.s.n.m.')

      const t6 = setTimeout(() => {
        setIsDescending(false)
      }, 1500)
      descentTimersRef.current.timeouts.push(t6)
    }, 6100)

    descentTimersRef.current.timeouts.push(t1, t2, t3, t4, t5)
  }

  // Crear icono de marcador concéntrico y perfectamente centrado
  const createCustomIcon = (sede: Sede, isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-map-marker-pin',
      html: `
        <div style="position: relative; width: 0; height: 0; display: flex; align-items: center; justify-content: center;">
          <!-- Badge con nombre de la sede centrado arriba -->
          <div style="position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); background: #0e2c20; color: #a4e347; border: 2px solid #a4e347; padding: 4px 12px; border-radius: 9999px; font-weight: 800; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.5); pointer-events: auto; display: flex; align-items: center; gap: 4px; z-index: 10;">
            <span>🥑</span>
            <span>${sede.nombre}</span>
          </div>

          <!-- Pin circular central (38px x 38px) anclado exactamente en el centro (0, 0) -->
          <div style="position: absolute; top: -19px; left: -19px; width: 38px; height: 38px; border-radius: 50%; background: #0e2c20; border: 3px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(0,0,0,0.55); pointer-events: auto; cursor: pointer; z-index: 5;">
            <!-- Onda de radar concéntrica 1: parpadea y expande desde el centro geométrico exacto -->
            <div class="animate-radar-pulse" style="position: absolute; inset: -8px; border-radius: 50%; background: rgba(164, 227, 71, 0.4); border: 2px solid #a4e347; pointer-events: none; z-index: -1;"></div>

            <!-- Onda de radar concéntrica 2: desfasada para pulso continuo y armónico -->
            <div class="animate-radar-pulse" style="position: absolute; inset: -8px; border-radius: 50%; background: rgba(164, 227, 71, 0.25); border: 1.5px solid #a4e347; animation-delay: 1.2s; pointer-events: none; z-index: -2;"></div>

            <!-- Icono de marcador central -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a4e347" stroke-width="2.5" style="position: relative; z-index: 2;">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="3" fill="#ffffff"/>
            </svg>

            <!-- Punto bullseye exacto en el centro (0, 0) -->
            <div style="position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 6px #ffffff; z-index: 3; pointer-events: none;"></div>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -36],
    })
  }

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Centrado inicial cercano al primer fundo
    const initialCenter = selectedSede.coordenadas
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 16.5,
      zoomControl: true,
      scrollWheelZoom: true,
      maxZoom: 20,
    })

    const currentTileConfig = TILES[activeLayer]
    const tileOptions: L.TileLayerOptions = {
      attribution: currentTileConfig.attribution,
      maxZoom: currentTileConfig.maxZoom,
      subdomains: currentTileConfig.subdomains || ['a', 'b', 'c', 'd'],
      updateWhenZooming: true,
      updateWhenIdle: false,
      keepBuffer: 8,
    }
    if (currentTileConfig.maxNativeZoom) {
      tileOptions.maxNativeZoom = currentTileConfig.maxNativeZoom
    }
    const tile = L.tileLayer(currentTileConfig.url, tileOptions).addTo(map)

    tileLayerRef.current = tile
    mapInstanceRef.current = map

    // Ocultar círculos a zooms muy lejanos (<12.5) para no ensuciar la vista de país o cordillera
    map.on('zoomend', () => {
      const z = map.getZoom()
      Object.values(circlesRef.current).forEach((circle) => {
        if (z < 12.5) {
          circle.setStyle({ opacity: 0, fillOpacity: 0 })
        } else {
          circle.setStyle({ opacity: 1, fillOpacity: 0.18 })
        }
      })
    })

    // Añadir marcadores y perímetro agronómico a cada sede
    SEDES_DATA.forEach((sede) => {
      const isSelected = sede.id === selectedSede.id

      // Círculo perimetral del fundo agrícola concéntrico con el marcador
      const circle = L.circle(sede.coordenadas, {
        radius: 240, // 240 metros de perímetro concéntrico
        color: '#9ab55d',
        fillColor: '#9ab55d',
        fillOpacity: 0.18,
        weight: 2,
        dashArray: '6, 8',
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
      clearDescentTimers()
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Disparar descenso espacial automáticamente cuando la sección entra al viewport (o al cargar/F5)
  useEffect(() => {
    if (!mapContainerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasDescendedRef.current) {
            hasDescendedRef.current = true
            setTimeout(() => {
              triggerSpaceDescent()
            }, 300)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(mapContainerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Cambiar capa de mapa y ajustar automáticamente altitud para la mejor perspectiva
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return
    mapInstanceRef.current.removeLayer(tileLayerRef.current)
    const layerConfig = TILES[activeLayer]

    const tileOptions: L.TileLayerOptions = {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains || ['a', 'b', 'c', 'd'],
      updateWhenZooming: true,
      updateWhenIdle: false,
      keepBuffer: 8,
    }
    if (layerConfig.maxNativeZoom) {
      tileOptions.maxNativeZoom = layerConfig.maxNativeZoom
    }

    const newTile = L.tileLayer(layerConfig.url, tileOptions).addTo(mapInstanceRef.current)
    tileLayerRef.current = newTile

    // Al cambiar de capa, alejarse o acercarse al zoom óptimo (Relieve 3D panorámico o Foto Pura de valle)
    // Se ejecuta SOLO si no estamos en pleno descenso espacial
    if (layerConfig.recommendedZoom && !isDescending) {
      mapInstanceRef.current.flyTo(selectedSede.coordenadas, layerConfig.recommendedZoom, {
        animate: true,
        duration: 1.2,
      })
    }
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
          color: '#9ab55d',
          fillColor: '#9ab55d',
          fillOpacity: 0.18,
          weight: 2,
          dashArray: '6, 8',
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
    clearDescentTimers()
    setIsDescending(false)
    showMarkersAndCircles()
    if (activeLayer !== 'satellite') {
      setActiveLayer('satellite')
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSede.coordenadas, 18, {
        animate: true,
        duration: 1.0,
      })
    }
  }

  const handleZoomParcela = () => {
    clearDescentTimers()
    setIsDescending(false)
    showMarkersAndCircles()
    if (activeLayer !== 'satellite') {
      setActiveLayer('satellite')
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSede.coordenadas, 16, {
        animate: true,
        duration: 1.0,
      })
    }
  }

  const handleResetView = () => {
    clearDescentTimers()
    setIsDescending(false)
    showMarkersAndCircles()
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSede.coordenadas, 15, {
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
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/10 text-forest-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Valle Sagrado de los Incas • Cusco, Perú</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-forest-950 leading-tight">
            Nuestra Sede y Fundo Agrícola
          </h2>
          <p className="text-muted text-base md:text-lg mt-3 max-w-3xl leading-relaxed">
            Explora nuestros campos de cultivo de Palta Hass en fotografía satelital real de alta resolución, a más de 2,900 metros de altitud en el Valle Sagrado de los Incas.
          </p>
        </div>

        {/* Todos los botones alineados en una sola fila continua */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          {/* 1. Botón interactivo GPS para copiar coordenadas */}
          <button
            type="button"
            onClick={() => copyCoordinates(selectedSede)}
            className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-forest-950 hover:bg-forest-900 border border-forest-800 text-cream text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Haz clic para copiar las coordenadas GPS"
          >
            <div className="w-5 h-5 rounded-full bg-avocado-400 text-forest-950 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
              <Navigation className="w-3 h-3 fill-current" />
            </div>
            <span className="text-avocado-400 font-bold">GPS:</span>
            <span className="font-mono text-cream/90">-13.3217, -71.9522</span>
            <span className="text-white/25">|</span>
            {copiedId === selectedSede.id ? (
              <span className="inline-flex items-center gap-1 text-avocado-300 font-bold">
                <Check className="w-3.5 h-3.5 text-avocado-400" />
                ¡Copiado!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-cream/70 group-hover:text-white">
                <Copy className="w-3 h-3" />
                Copiar GPS
              </span>
            )}
          </button>

          {/* 2. Abrir en Google Maps */}
          <a
            href={selectedSede.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white hover:bg-sand border border-charcoal/15 text-charcoal text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-forest-800" />
            <span>Abrir en Google Maps</span>
          </a>

          {/* 3. Altitud */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-sand/80 text-forest-900 text-xs font-semibold border border-charcoal/10 shadow-xs">
            <Mountain className="w-3.5 h-3.5 text-avocado-600" />
            <span>{selectedSede.altitud}</span>
          </span>

          {/* 4. Vuelo desde el Espacio */}
          <button
            onClick={triggerSpaceDescent}
            disabled={isDescending}
            className="group px-4 py-2.5 rounded-full bg-forest-950 hover:bg-forest-900 border border-forest-800 text-avocado-400 font-bold text-xs tracking-wide transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Iniciar descenso cinematográfico desde el espacio exterior"
          >
            <div className="w-5 h-5 rounded-full bg-avocado-400/20 text-avocado-400 flex items-center justify-center shrink-0 border border-avocado-400/30 group-hover:border-avocado-400/60 transition-colors">
              <Rocket className={`w-3.5 h-3.5 text-avocado-400 ${isDescending ? 'animate-bounce' : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform'}`} />
            </div>
            <span>{isDescending ? 'Descendiendo...' : 'Vuelo desde el Espacio'}</span>
          </button>

          {/* 5. Zoom Huerto */}
          <button
            onClick={handleZoomHuerto}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-sand border border-charcoal/15 text-charcoal font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            title="Acercamiento máximo al huerto de palta"
          >
            <ZoomIn className="w-3.5 h-3.5 text-forest-800" />
            <span>Zoom Huerto (18x)</span>
          </button>

          {/* 6. Centrar Sede */}
          <button
            onClick={handleResetView}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-sand border border-charcoal/15 text-charcoal font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-forest-800" />
            <span>Centrar Sede</span>
          </button>
        </div>

        {/* Contenedor del Mapa Leaflet Interactivo */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sand relative h-[600px]">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Efecto Cinematográfico de Descenso Espacial / HUD de Telemetría */}
          {isDescending && (
            <div className="absolute inset-0 pointer-events-none z-[1200] overflow-hidden flex flex-col items-center justify-between p-6">
              {/* Viñeta espacial en los bordes (centro 100% cristalino y nítido para ver el satélite sin tintes verdes) */}
              <div 
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{
                  background: 'radial-gradient(circle at center, transparent 40%, rgba(5, 12, 24, 0.35) 75%, rgba(2, 6, 18, 0.7) 100%)',
                  opacity: descentAltitude > 3500 ? 0.9 : 0,
                }}
              />

              {/* HUD Superior de Telemetría Satelital */}
              <div className="relative z-10 bg-forest-950/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-avocado-400/50 shadow-2xl flex items-center gap-3 text-cream text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-avocado-400 animate-ping" />
                <span className="font-bold text-avocado-400 uppercase tracking-widest text-[11px] font-mono">
                  DESCENSO SATELITAL:
                </span>
                <span className="font-semibold text-cream/90 text-xs">
                  {descentStage}
                </span>
                <span className="text-white/20">|</span>
                <span className="font-mono text-xs text-avocado-300 font-bold bg-white/10 px-2 py-0.5 rounded">
                  {descentAltitude > 10000 ? `${Math.round(descentAltitude / 1000)} km` : `${descentAltitude.toLocaleString()} m`}
                </span>
              </div>

              {/* Mira telescópica / Retícula de fijación de objetivo en el centro del mapa */}
              <div className="relative z-10 w-24 h-24 border border-avocado-400/40 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 border border-dashed border-avocado-400/70 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-avocado-400" />
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-avocado-400/30" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-avocado-400/30" />
              </div>

              {/* Indicador inferior */}
              <div className="relative z-10 bg-forest-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] text-cream/70 font-mono">
                COORD: -13.3217° S, -71.9522° W &bull; TARGET: SEDE CALCA - PISAC
              </div>
            </div>
          )}

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

          {/* Tarjeta flotante interactiva con datos de la sede: sobresale en 3D con borde animado y halo brillante */}
          <div 
            onClick={() => handleResetView()}
            className="absolute bottom-6 left-6 max-w-sm hidden sm:block z-[1000] group/card transition-all duration-300 ease-out hover:-translate-y-2.5 hover:scale-[1.03] active:scale-[0.99] cursor-pointer"
            title="Haz clic para centrar la sede en el mapa"
          >
            {/* Contenedor del borde animado con gradiente rotativo */}
            <div className="relative p-[2.5px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group-hover/card:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_35px_rgba(164,227,71,0.4)]">
              {/* Capa de borde con gradiente cónico animado en rotación continua */}
              <div 
                className="absolute -inset-[150%] animate-border-spin pointer-events-none opacity-50 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, #a4e347 0deg, #173d2d 60deg, #9ab55d 120deg, transparent 180deg, #a4e347 240deg, #173d2d 300deg, #a4e347 360deg)',
                }}
              />

              {/* Contenido interior de la card */}
              <div className="relative bg-forest-950/95 backdrop-blur-md text-cream p-5 rounded-[22px] border border-white/10 group-hover/card:border-transparent transition-colors">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-avocado-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 group-hover/card:rotate-12 group-hover/card:scale-110 transition-transform" />
                    {selectedSede.tipo}
                  </span>
                  <span className="text-xs text-cream/70 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full group-hover/card:bg-avocado-400/20 group-hover/card:text-avocado-300 transition-colors">
                    <Mountain className="w-3 h-3 text-avocado-400" />
                    {selectedSede.altitud}
                  </span>
                </div>
                <h4 className="text-lg font-serif font-bold text-cream mb-1 group-hover/card:text-avocado-200 transition-colors">{selectedSede.nombre}</h4>
                <p className="text-xs text-cream/70 leading-relaxed mb-3">{selectedSede.descripcion}</p>

                <div className="space-y-1.5 text-xs text-cream/85 mb-4">
                  {selectedSede.caracteristicas.slice(0, 2).map((c, i) => (
                    <p key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-avocado-400 shrink-0 group-hover/card:scale-125 transition-transform" />
                      <span>{c}</span>
                    </p>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                  <a
                    href={selectedSede.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-bold text-forest-950 bg-avocado-400 hover:bg-avocado-300 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 shrink-0"
                    title="Abrir en Google Maps o Street View 360°"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Street View 360°</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyCoordinates(selectedSede)
                      }}
                      className="text-cream/70 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-white/10 transition-all flex items-center gap-1 text-[11px] cursor-pointer hover:scale-105"
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

                    {isBasemapKey && (
                      <span 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-forest-800/60 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30"
                        title="Motor de mapa vectorial CARTO Voyager activo"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>CARTO Ready</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
