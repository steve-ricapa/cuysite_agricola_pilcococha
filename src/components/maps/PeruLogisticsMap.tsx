import React, { useEffect, useRef, useState, useMemo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Thermometer, 
  Gauge, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Ship, 
  Anchor, 
  CheckCircle2, 
  Clock, 
  Route, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2,
  CircleDot,
  Milestone,
  Radio,
  ArrowRightLeft
} from 'lucide-react'

// =============================================================================
// TIPOS Y MODELOS DE DATOS
// =============================================================================

export interface Waypoint {
  lat: number
  lng: number
  nombre?: string
}

export interface RutaLogistica {
  id: string
  nombre: string
  codigo: string
  origenId: string
  origenNombre: string
  destinoId: string
  destinoNombre: string
  destinoRegion: string
  tipoDestino: 'Megapuerto' | 'Puerto Norte' | 'Puerto Sur' | 'Centro Andino' | 'Frontera' | 'Corredor Agroindustrial' | 'Amazonía'
  distanciaKm: number
  tiempoHoras: string
  temperaturaObjetivo: string
  viaPrincipal: string
  descripcion: string
  mercadosConectados: string[]
  waypoints: [number, number][]
  color: string
}

export interface SedeOrigen {
  id: string
  nombre: string
  subtitulo: string
  valle: string
  coordenadas: [number, number]
  tipo: 'Fundo Productor' | 'Planta de Empaque y Acopio' | 'Fundo Productor & Empaque'
  capacidad: string
  altitud: string
}

export interface DestinoProvincia {
  id: string
  ciudad: string
  region: string
  coordenadas: [number, number]
  tipo: 'Megapuerto de Exportación' | 'Puerto Marítimo' | 'Hub Distribución' | 'Frontera Comercial'
  relevancia: string
  icono: 'ship' | 'truck' | 'anchor' | 'pin'
}

// =============================================================================
// DATOS REALES: SEDES DE ORIGEN EN CUSCO (VALLE SAGRADO)
// =============================================================================

export const SEDES_ORIGEN: SedeOrigen[] = [
  {
    id: 'calca',
    nombre: 'Sede Calca - Pisac',
    subtitulo: 'Fundo Agrícola Pacocha SAC',
    valle: 'Valle Sagrado de los Incas (Sector Calca - Pisac)',
    coordenadas: [-13.3217, -71.9522],
    tipo: 'Fundo Productor & Empaque',
    capacidad: '80+ Has en Producción',
    altitud: '2,920 m.s.n.m.'
  }
]

// =============================================================================
// DESTINOS Y PROVINCIAS CLAVE DE PERÚ
// =============================================================================

export const DESTINOS_PERU: DestinoProvincia[] = [
  {
    id: 'callao-lima',
    ciudad: 'Callao / Lima',
    region: 'Costa Central',
    coordenadas: [-12.0565, -77.1265],
    tipo: 'Megapuerto de Exportación',
    relevancia: 'Principal terminal marítimo hacia Europa (Rotterdam) y EE.UU. (Philadelphia).',
    icono: 'ship'
  },
  {
    id: 'chancay',
    ciudad: 'Megapuerto de Chancay',
    region: 'Lima Norte',
    coordenadas: [-11.5833, -77.2667],
    tipo: 'Megapuerto de Exportación',
    relevancia: 'Ruta transpacífica directa hacia Shanghái y puertos asiáticos sin escalas.',
    icono: 'anchor'
  },
  {
    id: 'paita-piura',
    ciudad: 'Paita / Piura',
    region: 'Costa Norte',
    coordenadas: [-5.0892, -81.1086],
    tipo: 'Puerto Marítimo',
    relevancia: 'Eje norteño de salida para naves de fruta fresca hacia Norteamérica y Asia.',
    icono: 'ship'
  },
  {
    id: 'trujillo',
    ciudad: 'Trujillo / Salaverry',
    region: 'La Libertad',
    coordenadas: [-8.1118, -79.0287],
    tipo: 'Hub Distribución',
    relevancia: 'Corredor agroexportador del norte y abastecimiento interregional.',
    icono: 'truck'
  },
  {
    id: 'chiclayo',
    ciudad: 'Chiclayo',
    region: 'Lambayeque',
    coordenadas: [-6.7714, -79.8409],
    tipo: 'Hub Distribución',
    relevancia: 'Eje comercial y mercado mayorista del norte peruano.',
    icono: 'truck'
  },
  {
    id: 'ica-pisco',
    ciudad: 'Ica / Pisco (Pto. San Martín)',
    region: 'Ica',
    coordenadas: [-13.8016, -76.2974],
    tipo: 'Puerto Marítimo',
    relevancia: 'Corredor agroindustrial del sur y plantas de atmósfera controlada.',
    icono: 'anchor'
  },
  {
    id: 'arequipa-matarani',
    ciudad: 'Arequipa / Matarani',
    region: 'Arequipa',
    coordenadas: [-16.4090, -71.5375],
    tipo: 'Puerto Marítimo',
    relevancia: 'Corredor logístico del sur andino con salida marítima por Matarani.',
    icono: 'ship'
  },
  {
    id: 'huancayo',
    ciudad: 'Huancayo',
    region: 'Junín',
    coordenadas: [-12.0651, -75.2049],
    tipo: 'Hub Distribución',
    relevancia: 'Centro neurálgico de abastecimiento andino central.',
    icono: 'truck'
  },
  {
    id: 'tacna',
    ciudad: 'Tacna',
    region: 'Tacna',
    coordenadas: [-18.0139, -70.2520],
    tipo: 'Frontera Comercial',
    relevancia: 'Conexión terrestre binacional hacia los mercados de Chile y Cono Sur.',
    icono: 'truck'
  },
  {
    id: 'puerto-maldonado',
    ciudad: 'Puerto Maldonado',
    region: 'Madre de Dios',
    coordenadas: [-12.5933, -69.1891],
    tipo: 'Hub Distribución',
    relevancia: 'Vía Interoceánica Sur hacia el mercado amazónico y Brasil.',
    icono: 'truck'
  }
]

// =============================================================================
// RUTAS GEOGRÁFICAS DETALLADAS (WAYPOINTS POR CARRETERAS NACIONALES)
// =============================================================================

export const RUTAS_LOGISTICAS: RutaLogistica[] = [
  {
    id: 'ruta-callao',
    nombre: 'Ruta 1: Valle Sagrado ➔ Megapuerto del Callao & Chancay',
    codigo: 'EXP-MAR-01',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo & Empaque)',
    destinoId: 'callao-lima',
    destinoNombre: 'Callao / Lima',
    destinoRegion: 'Costa Central (Exportación)',
    tipoDestino: 'Megapuerto',
    distanciaKm: 1120,
    tiempoHoras: '22 - 24 horas',
    temperaturaObjetivo: '+5.0°C Constante',
    viaPrincipal: 'Interoceánica Ramal Nazca + Panamericana Sur (PE-3S / PE-30A / PE-1S)',
    descripcion: 'Ruta neurálgica de exportación marítima. La fruta desciende de los Andes hacia la costa con monitoreo térmico satelital continuo para embarque en buques portacontenedores.',
    mercadosConectados: ['Rotterdam (Países Bajos)', 'Philadelphia (EE.UU.)', 'Algeciras (España)', 'Hamburgo (Alemania)'],
    color: '#10b981', // Verde esmeralda brillante
    waypoints: [
      [-13.3217, -71.9522], // Calca / Pisac
      [-13.5250, -71.9722], // Cusco salida Poroy
      [-13.4611, -72.1528], // Anta
      [-13.5417, -72.6944], // Curahuasi
      [-13.6339, -72.8814], // Abancay
      [-14.2889, -73.2431], // Chalhuanca
      [-14.6939, -74.1264], // Puquio
      [-14.8308, -74.9389], // Nasca
      [-14.5333, -75.1833], // Palpa
      [-14.0678, -75.7286], // Ica
      [-13.7142, -76.2031], // Pisco
      [-13.4167, -76.1333], // Chincha
      [-13.0769, -76.3861], // Cañete
      [-12.0464, -77.0428], // Lima
      [-12.0565, -77.1265], // Megapuerto del Callao
    ]
  },
  {
    id: 'ruta-paita',
    nombre: 'Ruta 2: Valle Sagrado ➔ Puerto de Paita (Norte)',
    codigo: 'EXP-MAR-02',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo Productor)',
    destinoId: 'paita-piura',
    destinoNombre: 'Paita / Piura',
    destinoRegion: 'Costa Norte (Exportación)',
    tipoDestino: 'Puerto Norte',
    distanciaKm: 1850,
    tiempoHoras: '34 - 36 horas',
    temperaturaObjetivo: '+4.8°C Constante',
    viaPrincipal: 'Panamericana Norte (PE-1N)',
    descripcion: 'Corredor refrigerado hacia el norte profundo. Conecta con el puerto de aguas profundas de Paita para despachos hacia la Costa Oeste de EE.UU. y Asia.',
    mercadosConectados: ['Long Beach (California)', 'Yokohama (Japón)', 'Shanghái (China)'],
    color: '#06b6d4', // Cyan
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5250, -71.9722], // Cusco
      [-13.6339, -72.8814], // Abancay
      [-14.8308, -74.9389], // Nasca
      [-14.0678, -75.7286], // Ica
      [-12.0464, -77.0428], // Lima
      [-11.5833, -77.2667], // Chancay
      [-11.1067, -77.6050], // Huacho
      [-10.7500, -77.7667], // Barranca
      [-9.4700, -78.3000],  // Casma
      [-9.0744, -78.5936],  // Chimbote
      [-8.1118, -79.0287],  // Trujillo
      [-7.3983, -79.5714],  // Pacasmayo
      [-6.7714, -79.8409],  // Chiclayo
      [-5.1944, -80.6328],  // Piura
      [-5.0892, -81.1086],  // Puerto de Paita
    ]
  },
  {
    id: 'ruta-arequipa',
    nombre: 'Ruta 3: Valle Sagrado ➔ Arequipa & Puerto Matarani',
    codigo: 'LOG-SUR-01',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo & Empaque)',
    destinoId: 'arequipa-matarani',
    destinoNombre: 'Arequipa / Matarani',
    destinoRegion: 'Región Sur',
    tipoDestino: 'Puerto Sur',
    distanciaKm: 480,
    tiempoHoras: '9 - 10 horas',
    temperaturaObjetivo: '+5.0°C Constante',
    viaPrincipal: 'Corredor Vial del Sur (PE-3S / PE-34A)',
    descripcion: 'Ruta directa del sur peruano. Atiende el dinámico mercado regional arequipeño y permite el embarque directo por el terminal de Matarani.',
    mercadosConectados: ['Mercado Mayorista Sur', 'Valparaíso (Chile)', 'Exportación Directa Sur'],
    color: '#eab308', // Amarillo ámbar
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5250, -71.9722], // Cusco
      [-13.6833, -71.6250], // Urcos
      [-14.1000, -71.4333], // Combapata
      [-14.2833, -71.2250], // Sicuani
      [-14.6167, -70.7833], // Santa Rosa
      [-14.8833, -70.5833], // Ayaviri
      [-15.4950, -70.1333], // Juliaca
      [-16.4090, -71.5375], // Arequipa
      [-16.9933, -72.0967], // Puerto Matarani
    ]
  },
  {
    id: 'ruta-ica',
    nombre: 'Ruta 4: Valle Sagrado ➔ Ica & Puerto San Martín (Pisco)',
    codigo: 'AGRO-SUR-02',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo Productor)',
    destinoId: 'ica-pisco',
    destinoNombre: 'Ica / Pisco',
    destinoRegion: 'Costa Sur Agroindustrial',
    tipoDestino: 'Corredor Agroindustrial',
    distanciaKm: 820,
    tiempoHoras: '15 - 16 horas',
    temperaturaObjetivo: '+5.2°C Constante',
    viaPrincipal: 'Interoceánica Sur (PE-30A)',
    descripcion: 'Conexión con el principal cluster agroindustrial del sur del país, centros de consolidación y el moderno puerto de Paracas.',
    mercadosConectados: ['Consolidación Ica', 'Puerto Paracas', 'Plantas de Frío del Sur'],
    color: '#84cc16', // Lima verde
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5250, -71.9722], // Cusco
      [-13.6339, -72.8814], // Abancay
      [-14.2889, -73.2431], // Chalhuanca
      [-14.6939, -74.1264], // Puquio
      [-14.8308, -74.9389], // Nasca
      [-14.5333, -75.1833], // Palpa
      [-14.0678, -75.7286], // Ica
      [-13.8016, -76.2974], // Puerto Gral. San Martín (Pisco)
    ]
  },
  {
    id: 'ruta-huancayo',
    nombre: 'Ruta 5: Valle Sagrado ➔ Huancayo (Sierra Central)',
    codigo: 'DIST-CEN-01',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo & Empaque)',
    destinoId: 'huancayo',
    destinoNombre: 'Huancayo / Junín',
    destinoRegion: 'Sierra Central',
    tipoDestino: 'Centro Andino',
    distanciaKm: 630,
    tiempoHoras: '14 - 15 horas',
    temperaturaObjetivo: '+5.5°C Constante',
    viaPrincipal: 'Ruta de los Libertadores (PE-3S / PE-26B)',
    descripcion: 'Abastecimiento de los mercados de altura y del valle del Mantaro con fruta fresca recolectada con máximo porcentaje de materia seca.',
    mercadosConectados: ['Mercado Mayorista Huancayo', 'Red Sierra Central'],
    color: '#a855f7', // Púrpura
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5250, -71.9722], // Cusco
      [-13.6339, -72.8814], // Abancay
      [-13.6556, -73.3872], // Andahuaylas
      [-13.1588, -74.2239], // Ayacucho
      [-12.9333, -74.2400], // Huanta
      [-12.3900, -74.8600], // Pampas
      [-12.0651, -75.2049], // Huancayo
    ]
  },
  {
    id: 'ruta-tacna',
    nombre: 'Ruta 6: Valle Sagrado ➔ Tacna (Frontera Sur)',
    codigo: 'DIST-SUR-03',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo Productor)',
    destinoId: 'tacna',
    destinoNombre: 'Tacna / Frontera',
    destinoRegion: 'Frontera Sur',
    tipoDestino: 'Frontera',
    distanciaKm: 590,
    tiempoHoras: '11 - 12 horas',
    temperaturaObjetivo: '+5.0°C Constante',
    viaPrincipal: 'Corredor Sur Altiplano (PE-3S / PE-36A)',
    descripcion: 'Paso comercial fronterizo hacia Chile y el Cono Sur con inspección fitosanitaria SENASA expedita.',
    mercadosConectados: ['Arica (Chile)', 'Mercado Fronterizo Tacna'],
    color: '#f97316', // Naranja
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5250, -71.9722], // Cusco
      [-14.2833, -71.2250], // Sicuani
      [-15.4950, -70.1333], // Juliaca
      [-15.8422, -70.0199], // Puno
      [-16.0833, -69.6400], // Ilave
      [-17.1953, -70.9353], // Moquegua
      [-18.0139, -70.2520], // Tacna
    ]
  },
  {
    id: 'ruta-selva',
    nombre: 'Ruta 7: Valle Sagrado ➔ Puerto Maldonado (Amazonía)',
    codigo: 'EXP-AMZ-01',
    origenId: 'calca',
    origenNombre: 'Sede Calca (Fundo & Empaque)',
    destinoId: 'puerto-maldonado',
    destinoNombre: 'Puerto Maldonado',
    destinoRegion: 'Selva / Amazonía',
    tipoDestino: 'Amazonía',
    distanciaKm: 470,
    tiempoHoras: '8 - 9 horas',
    temperaturaObjetivo: '+5.2°C Constante',
    viaPrincipal: 'Carretera Interoceánica Sur (PE-30C)',
    descripcion: 'Enlace bioceánico que desciende de los Andes hacia la llanura amazónica, conectando con el eje comercial hacia Acre y el centro-oeste de Brasil.',
    mercadosConectados: ['Amazonía Peruana', 'Río Branco (Brasil)', 'Corredor Bioceánico'],
    color: '#14b8a6', // Turquesa
    waypoints: [
      [-13.3217, -71.9522], // Calca
      [-13.5250, -71.9722], // Cusco
      [-13.6833, -71.6250], // Urcos
      [-13.6200, -71.3800], // Ocongate
      [-13.5900, -70.9000], // Marcapata
      [-13.0600, -69.7500], // Mazuco
      [-12.5933, -69.1891], // Puerto Maldonado
    ]
  }
]

// =============================================================================
// PARADAS Y ESTACIONES INTERMEDIAS POR RUTA (ESTILO TRANSIT / BUS ITINERARY)
// =============================================================================

export interface ParadaRuta {
  nombre: string
  km: number
  tipo: 'origen' | 'control' | 'parada' | 'puerto' | 'terminal'
  nota: string
  altitud: string
}

export const PARADAS_POR_RUTA: Record<string, ParadaRuta[]> = {
  'ruta-callao': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco (Poroy)', km: 52, tipo: 'control', altitud: '3,499 m', nota: 'Control Fitosanitario' },
    { nombre: 'Abancay', km: 248, tipo: 'parada', altitud: '2,378 m', nota: 'Paso Interandino' },
    { nombre: 'Chalhuanca', km: 370, tipo: 'control', altitud: '2,890 m', nota: 'Inspección de Frío' },
    { nombre: 'Puquio', km: 490, tipo: 'parada', altitud: '3,214 m', nota: 'Descenso Cordillerano' },
    { nombre: 'Nasca', km: 640, tipo: 'parada', altitud: '588 m', nota: 'Empalme Panamericana Sur' },
    { nombre: 'Ica', km: 780, tipo: 'parada', altitud: '406 m', nota: 'Hub de Agroexportación' },
    { nombre: 'Pisco', km: 860, tipo: 'control', altitud: '17 m', nota: 'Revisión Telemetría' },
    { nombre: 'Chincha / Cañete', km: 940, tipo: 'parada', altitud: '97 m', nota: 'Corredor Costa Central' },
    { nombre: 'Callao / Chancay', km: 1120, tipo: 'puerto', altitud: '5 m', nota: 'Megapuerto Ultramar' }
  ],
  'ruta-paita': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco', km: 52, tipo: 'control', altitud: '3,399 m', nota: 'Check Telemetría' },
    { nombre: 'Abancay', km: 248, tipo: 'parada', altitud: '2,378 m', nota: 'Vía Interoceánica' },
    { nombre: 'Nasca', km: 640, tipo: 'parada', altitud: '588 m', nota: 'Acceso Panamericana' },
    { nombre: 'Lima / Chancay', km: 1190, tipo: 'control', altitud: '45 m', nota: 'Paso Megapuerto Chancay' },
    { nombre: 'Huacho / Barranca', km: 1340, tipo: 'parada', altitud: '30 m', nota: 'Costa Norte Chica' },
    { nombre: 'Chimbote', km: 1480, tipo: 'parada', altitud: '4 m', nota: 'Checkpoint Costa' },
    { nombre: 'Trujillo', km: 1610, tipo: 'control', altitud: '34 m', nota: 'Valle Agroindustrial' },
    { nombre: 'Chiclayo', km: 1740, tipo: 'parada', altitud: '27 m', nota: 'Eje Nororiental' },
    { nombre: 'Puerto de Paita', km: 1850, tipo: 'puerto', altitud: '3 m', nota: 'Terminal Marítimo Norte' }
  ],
  'ruta-arequipa': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco', km: 52, tipo: 'control', altitud: '3,399 m', nota: 'Control Fitosanitario' },
    { nombre: 'Urcos', km: 100, tipo: 'parada', altitud: '3,150 m', nota: 'Ramal Interoceánica' },
    { nombre: 'Sicuani', km: 190, tipo: 'parada', altitud: '3,550 m', nota: 'Paso Altiplánico' },
    { nombre: 'Santa Rosa / Ayaviri', km: 260, tipo: 'control', altitud: '3,920 m', nota: 'Monitoreo Frío Extremo' },
    { nombre: 'Juliaca', km: 340, tipo: 'parada', altitud: '3,825 m', nota: 'Hub Altiplánico' },
    { nombre: 'Arequipa (Ciudad)', km: 440, tipo: 'terminal', altitud: '2,325 m', nota: 'Mercado Mayorista Sur' },
    { nombre: 'Puerto Matarani', km: 480, tipo: 'puerto', altitud: '8 m', nota: 'Terminal de Exportación Sur' }
  ],
  'ruta-ica': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco', km: 52, tipo: 'control', altitud: '3,399 m', nota: 'Inspección SENASA' },
    { nombre: 'Abancay', km: 248, tipo: 'parada', altitud: '2,378 m', nota: 'Corredor PE-30A' },
    { nombre: 'Chalhuanca', km: 370, tipo: 'control', altitud: '2,890 m', nota: 'Control de Temperatura' },
    { nombre: 'Puquio', km: 490, tipo: 'parada', altitud: '3,214 m', nota: 'Descenso Cordillerano' },
    { nombre: 'Nasca', km: 640, tipo: 'parada', altitud: '588 m', nota: 'Ingreso a Costa' },
    { nombre: 'Palpa', km: 700, tipo: 'parada', altitud: '347 m', nota: 'Valle Sur' },
    { nombre: 'Ica (Ciudad)', km: 780, tipo: 'terminal', altitud: '406 m', nota: 'Cluster Agroexportador' },
    { nombre: 'Pto. San Martín (Pisco)', km: 820, tipo: 'puerto', altitud: '6 m', nota: 'Terminal Portuario Paracas' }
  ],
  'ruta-huancayo': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco', km: 52, tipo: 'control', altitud: '3,399 m', nota: 'Control Fitosanitario' },
    { nombre: 'Abancay', km: 248, tipo: 'parada', altitud: '2,378 m', nota: 'Ruta PE-3S' },
    { nombre: 'Andahuaylas', km: 390, tipo: 'parada', altitud: '2,926 m', nota: 'Valle de Chumbao' },
    { nombre: 'Ayacucho (Huamanga)', km: 480, tipo: 'control', altitud: '2,761 m', nota: 'Control de Frío' },
    { nombre: 'Huanta', km: 530, tipo: 'parada', altitud: '2,627 m', nota: 'Valle Esmeralda' },
    { nombre: 'Pampas (Tayacaja)', km: 590, tipo: 'parada', altitud: '3,276 m', nota: 'Paso Central' },
    { nombre: 'Huancayo (Junín)', km: 630, tipo: 'terminal', altitud: '3,271 m', nota: 'Hub Sierra Central' }
  ],
  'ruta-tacna': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco', km: 52, tipo: 'control', altitud: '3,399 m', nota: 'Control Fitosanitario' },
    { nombre: 'Sicuani', km: 190, tipo: 'parada', altitud: '3,550 m', nota: 'Corredor PE-3S' },
    { nombre: 'Juliaca', km: 340, tipo: 'control', altitud: '3,825 m', nota: 'Control de Frío' },
    { nombre: 'Puno (Lago Titicaca)', km: 390, tipo: 'parada', altitud: '3,812 m', nota: 'Paso Binacional' },
    { nombre: 'Ilave', km: 440, tipo: 'parada', altitud: '3,850 m', nota: 'Meseta Altiplánica' },
    { nombre: 'Moquegua', km: 510, tipo: 'control', altitud: '1,410 m', nota: 'Descenso Sur' },
    { nombre: 'Tacna (Frontera Sta. Rosa)', km: 590, tipo: 'terminal', altitud: '562 m', nota: 'Conexión Chile / Cono Sur' }
  ],
  'ruta-selva': [
    { nombre: 'Fundo Calca (Origen)', km: 0, tipo: 'origen', altitud: '2,920 m', nota: 'Cosecha & Pre-frío' },
    { nombre: 'Cusco', km: 52, tipo: 'control', altitud: '3,399 m', nota: 'Control Fitosanitario' },
    { nombre: 'Urcos', km: 100, tipo: 'parada', altitud: '3,150 m', nota: 'Desvío Interoceánica Sur' },
    { nombre: 'Ocongate', km: 160, tipo: 'parada', altitud: '3,533 m', nota: 'Faldas del Ausangate' },
    { nombre: 'Marcapata', km: 220, tipo: 'control', altitud: '3,150 m', nota: 'Descenso Ceja de Selva' },
    { nombre: 'Mazuco', km: 370, tipo: 'parada', altitud: '360 m', nota: 'Puente Inambari' },
    { nombre: 'Puerto Maldonado', km: 470, tipo: 'terminal', altitud: '183 m', nota: 'Amazonía / Corredor Brasil' }
  ]
}

// =============================================================================
// HELPER GEODÉSICO: Interpolación y Ángulo de Rumbo (Bearing)
// =============================================================================

function calculateBearing(startLat: number, startLng: number, destLat: number, destLng: number): number {
  const startLatRad = (startLat * Math.PI) / 180
  const startLngRad = (startLng * Math.PI) / 180
  const destLatRad = (destLat * Math.PI) / 180
  const destLngRad = (destLng * Math.PI) / 180

  const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad)
  const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad)
  const brng = (Math.atan2(y, x) * 180) / Math.PI
  return (brng + 360) % 360
}

function interpolatePoint(
  p1: [number, number],
  p2: [number, number],
  fraction: number
): [number, number] {
  return [
    p1[0] + (p2[0] - p1[0]) * fraction,
    p1[1] + (p2[1] - p1[1]) * fraction
  ]
}

// =============================================================================
// COMPONENTE PRINCIPAL: PERU LOGISTICS MAP
// =============================================================================

export const PeruLogisticsMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  // Capas activas de Leaflet
  const polylinesRef = useRef<{ [key: string]: L.Polyline }>({})
  const glowLinesRef = useRef<{ [key: string]: L.Polyline }>({})
  const arrowMarkersRef = useRef<{ [key: string]: L.Marker }>({})
  const truckMarkerRef = useRef<L.Marker | null>(null)
  const animFrameRef = useRef<number | null>(null)

  // Estado del componente
  const [activeRutaIndex, setActiveRutaIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2 | 3>(1)
  const [mapLayer, setMapLayer] = useState<'satellite' | 'dark' | 'terrain'>('satellite')
  const [telemetry, setTelemetry] = useState({
    progresoPercent: 0,
    kmRecorridos: 0,
    tempActual: 5.1,
    estadoTramo: 'Iniciando despacho desde Valle Sagrado',
    velocidadKmh: 68
  })

  const activeRuta = useMemo(() => RUTAS_LOGISTICAS[activeRutaIndex], [activeRutaIndex])

  // Progreso de animación (0 a 1)
  const progressRef = useRef(0)
  const lastTimestampRef = useRef<number | null>(null)

  // Cambiar capa de fondo de mapa
  const layerConfigs = {
    satellite: {
      name: 'Satélite HD',
      url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Maps &mdash; Maxar',
      maxZoom: 18
    },
    dark: {
      name: 'Modo Nocturno / Logística',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      subdomains: ['a', 'b', 'c', 'd'],
      attribution: '&copy; CARTO & OpenStreetMap',
      maxZoom: 18
    },
    terrain: {
      name: 'Relieve Topográfico',
      url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      subdomains: ['0', '1', '2', '3'],
      attribution: '&copy; Google Terrain',
      maxZoom: 16
    }
  }

  // ---------------------------------------------------------------------------
  // Inicialización del Mapa Leaflet
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Centrado de Perú para abarcar todas las regiones
    const map = L.map(mapContainerRef.current, {
      center: [-10.5, -75.2],
      zoom: 6,
      zoomControl: false,
      scrollWheelZoom: false, // Evita scroll hijack en desktop
    })

    // Controles de zoom abajo a la derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const layer = layerConfigs[mapLayer]
    const tile = L.tileLayer(layer.url, {
      attribution: layer.attribution,
      maxZoom: layer.maxZoom,
      subdomains: layer.subdomains
    }).addTo(map)

    tileLayerRef.current = tile
    mapInstanceRef.current = map

    // 1. Agregar Marcador de la Sede en Cusco (con halo y logo de palta)
    SEDES_ORIGEN.forEach((sede) => {
      const icon = L.divIcon({
        className: 'origin-marker-icon',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
            <!-- Badge Superior -->
            <div style="background: #064e3b; color: #a3e635; border: 2px solid #a3e635; padding: 4px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.5); margin-bottom: 5px; display: flex; align-items: center; gap: 4px;">
              <span>🥑</span>
              <span>${sede.nombre}</span>
            </div>
            <!-- Pin con Pulso -->
            <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; background: #064e3b; border: 3px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(0,0,0,0.6);">
              <div style="position: absolute; inset: -8px; border-radius: 50%; background: #84cc16; opacity: 0.6; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3e635" stroke-width="2.5">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                <circle cx="12" cy="10" r="3" fill="#ffffff"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [34, 56],
        iconAnchor: [17, 56],
        popupAnchor: [0, -56]
      })

      const marker = L.marker(sede.coordenadas, { icon, zIndexOffset: 2000 }).addTo(map)
      marker.bindPopup(`
        <div style="padding: 6px; font-family: inherit;">
          <span style="font-size: 10px; font-weight: 800; color: #16a34a; text-transform: uppercase;">ORIGEN DE EMBARQUE &bull; CUSCO</span>
          <h4 style="font-size: 16px; font-weight: 900; color: #064e3b; margin: 4px 0 2px 0;">${sede.nombre}</h4>
          <p style="font-size: 12px; color: #475569; margin: 0 0 6px 0;">${sede.valle} (${sede.altitud})</p>
          <div style="background: #f1f5f9; padding: 6px 10px; border-radius: 8px; font-size: 11px; color: #334155;">
            <strong>Capacidad:</strong> ${sede.capacidad}
          </div>
        </div>
      `)
    })

    // 2. Agregar Marcadores de Destinos y Provincias
    DESTINOS_PERU.forEach((destino) => {
      const isMegaPuerto = destino.tipo === 'Megapuerto de Exportación'
      const iconBg = isMegaPuerto ? '#0284c7' : '#0f172a'
      const badgeBorder = isMegaPuerto ? '#38bdf8' : '#94a3b8'

      const icon = L.divIcon({
        className: 'dest-marker-icon',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
            <div style="background: ${iconBg}; color: #ffffff; border: 1.5px solid ${badgeBorder}; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 10px; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.35); margin-bottom: 4px;">
              ${destino.ciudad}
            </div>
            <div style="width: 22px; height: 22px; border-radius: 50%; background: ${iconBg}; border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
              <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
            </div>
          </div>
        `,
        iconSize: [22, 42],
        iconAnchor: [11, 42],
        popupAnchor: [0, -42]
      })

      const marker = L.marker(destino.coordenadas, { icon, zIndexOffset: 1000 }).addTo(map)
      marker.bindPopup(`
        <div style="padding: 6px; font-family: inherit;">
          <span style="font-size: 10px; font-weight: 800; color: #0284c7; text-transform: uppercase;">${destino.tipo}</span>
          <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 4px 0 2px 0;">${destino.ciudad}</h4>
          <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">Región: ${destino.region}</p>
          <p style="font-size: 11px; color: #334155; line-height: 1.4;">${destino.relevancia}</p>
        </div>
      `)
    })

    // 3. Dibujar todas las Rutas Logísticas en el mapa
    RUTAS_LOGISTICAS.forEach((ruta, idx) => {
      const isActive = idx === activeRutaIndex

      // Halo difuminado de fondo
      const glow = L.polyline(ruta.waypoints, {
        color: ruta.color,
        weight: isActive ? 8 : 4,
        opacity: isActive ? 0.45 : 0.15,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map)

      // Línea principal con animación de guiones (ant march hacia adelante)
      const polyline = L.polyline(ruta.waypoints, {
        color: ruta.color,
        weight: isActive ? 3.5 : 2,
        opacity: isActive ? 0.95 : 0.4,
        dashArray: isActive ? '8, 12' : '4, 8',
        lineCap: 'round',
        lineJoin: 'round',
        className: isActive ? 'animate-route-flow' : ''
      }).addTo(map)

      // Flecha indicadora de llegada en el destino final
      const lastPoint = ruta.waypoints[ruta.waypoints.length - 1]
      const prevPoint = ruta.waypoints[ruta.waypoints.length - 2]
      const bearing = calculateBearing(prevPoint[0], prevPoint[1], lastPoint[0], lastPoint[1])

      const arrowIcon = L.divIcon({
        className: 'route-arrow-icon',
        html: `
          <div style="transform: rotate(${bearing}deg); color: ${ruta.color}; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l-8 16h6v4h4v-4h6z"/>
            </svg>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      const arrowMarker = L.marker(lastPoint, { icon: arrowIcon, interactive: false }).addTo(map)

      polylinesRef.current[ruta.id] = polyline
      glowLinesRef.current[ruta.id] = glow
      arrowMarkersRef.current[ruta.id] = arrowMarker

      // Interacción al hacer clic en una ruta
      polyline.on('click', () => {
        setActiveRutaIndex(idx)
      })
    })

    // 4. Crear Marcador del Camión / Carrito de Transporte Refrigerado
    const truckIcon = L.divIcon({
      className: 'truck-custom-icon',
      html: `
        <div id="truck-visual-wrapper" style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); transition: transform 0.1s linear;">
          <!-- Telemetría Flotante Encima del Camión -->
          <div style="background: #064e3b; color: #ffffff; border: 1.5px solid #a3e635; padding: 2px 8px; border-radius: 9999px; font-weight: 800; font-size: 10px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.6); margin-bottom: 4px; display: flex; align-items: center; gap: 4px; pointer-events: none;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #a3e635; animation: pulse 1s infinite;"></span>
            <span>+5.0°C</span>
            <span style="opacity: 0.7;">&bull; TermoKing #04</span>
          </div>
          <!-- Carrito / Camión 3D Realista -->
          <div id="truck-chassis" style="position: relative; width: 44px; height: 44px; border-radius: 50%; background: #ffffff; border: 2.5px solid #16a34a; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center;">
            <!-- Aura brillante verde -->
            <div style="position: absolute; inset: -4px; border-radius: 50%; background: #84cc16; opacity: 0.4; filter: blur(3px);"></div>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#064e3b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="position: relative; z-index: 2;">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-5.652a2 2 0 0 0-.6-1.428l-3.324-3.324A2 2 0 0 0 16.652 6H14v12" />
              <circle cx="17" cy="18" r="2" fill="#16a34a" />
              <circle cx="7" cy="18" r="2" fill="#16a34a" />
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 68],
      iconAnchor: [22, 34]
    })

    const initialCoord = RUTAS_LOGISTICAS[0].waypoints[0]
    const truckMarker = L.marker(initialCoord, { icon: truckIcon, zIndexOffset: 5000 }).addTo(map)
    truckMarkerRef.current = truckMarker

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // ---------------------------------------------------------------------------
  // Cambiar capa de mapa (Satélite, Nocturno, Relieve)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return
    mapInstanceRef.current.removeLayer(tileLayerRef.current)

    const layer = layerConfigs[mapLayer]
    const tile = L.tileLayer(layer.url, {
      attribution: layer.attribution,
      maxZoom: layer.maxZoom,
      subdomains: layer.subdomains
    }).addTo(mapInstanceRef.current)

    tileLayerRef.current = tile
  }, [mapLayer])

  // ---------------------------------------------------------------------------
  // Actualizar estilos de rutas cuando cambia la ruta activa
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mapInstanceRef.current) return

    RUTAS_LOGISTICAS.forEach((ruta, idx) => {
      const isActive = idx === activeRutaIndex
      const polyline = polylinesRef.current[ruta.id]
      const glow = glowLinesRef.current[ruta.id]

      if (polyline) {
        polyline.setStyle({
          weight: isActive ? 4 : 2,
          opacity: isActive ? 0.95 : 0.35,
          dashArray: isActive ? '8, 12' : '4, 8'
        })
        if (isActive) {
          polyline.bringToFront()
        }
      }

      if (glow) {
        glow.setStyle({
          weight: isActive ? 10 : 3,
          opacity: isActive ? 0.5 : 0.1
        })
        if (isActive) {
          glow.bringToFront()
        }
      }
    })

    // Resetear posición del camión al inicio de la nueva ruta
    progressRef.current = 0
  }, [activeRutaIndex])

  // ---------------------------------------------------------------------------
  // Bucle de Animación del Carrito / Camión viajando por la ruta
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let isCancelled = false

    const animateTruck = (timestamp: number) => {
      if (isCancelled) return

      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      if (isPlaying && activeRuta && truckMarkerRef.current) {
        // Velocidad de avance de la ruta (un ciclo completo dura aprox 14 segundos a 1x)
        const cycleDuration = 14 / speedMultiplier
        const increment = deltaTime / cycleDuration
        progressRef.current += increment

        if (progressRef.current >= 1) {
          // Ha llegado al destino final: cambiar a la siguiente ruta tras breve pausa
          progressRef.current = 0
          setActiveRutaIndex((prev) => (prev + 1) % RUTAS_LOGISTICAS.length)
        } else {
          // Calcular posición exacta a lo largo de los waypoints
          const waypoints = activeRuta.waypoints
          const totalSegments = waypoints.length - 1
          const globalProgress = progressRef.current * totalSegments
          const segmentIndex = Math.min(Math.floor(globalProgress), totalSegments - 1)
          const segmentFraction = globalProgress - segmentIndex

          const p1 = waypoints[segmentIndex]
          const p2 = waypoints[segmentIndex + 1]

          if (p1 && p2) {
            const currentPos = interpolatePoint(p1, p2, segmentFraction)
            truckMarkerRef.current.setLatLng(currentPos)

            // Calcular ángulo para rotar el camión hacia la dirección de avance
            const bearing = calculateBearing(p1[0], p1[1], p2[0], p2[1])
            const chassisEl = document.getElementById('truck-chassis')
            if (chassisEl) {
              // Rotación suave del camión
              chassisEl.style.transform = `rotate(${bearing - 90}deg)`
            }

            // Actualizar telemetría para el HUD
            const percent = Math.round(progressRef.current * 100)
            const km = Math.round(progressRef.current * activeRuta.distanciaKm)
            
            // Variación sutil y realista de temperatura (+4.9°C a +5.2°C)
            const temp = Number((5.0 + Math.sin(timestamp / 2000) * 0.2).toFixed(1))

            setTelemetry({
              progresoPercent: percent,
              kmRecorridos: km,
              tempActual: temp,
              estadoTramo: percent < 15 
                ? `Salida de ${activeRuta.origenNombre}`
                : percent > 85 
                  ? `Aproximación final a ${activeRuta.destinoNombre}`
                  : `En tránsito por ${activeRuta.viaPrincipal.split('+')[0]}`,
              velocidadKmh: Math.round(65 + Math.cos(timestamp / 1500) * 6)
            })
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animateTruck)
    }

    animFrameRef.current = requestAnimationFrame(animateTruck)

    return () => {
      isCancelled = true
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying, speedMultiplier, activeRuta])

  // Ajustar vista completa a todo el Perú
  const handleFitPeru = () => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.setView([-10.5, -75.2], 6)
  }

  // Centrar en la ruta activa
  const handleFocusRoute = (idx: number) => {
    setActiveRutaIndex(idx)
    if (!mapInstanceRef.current) return
    const ruta = RUTAS_LOGISTICAS[idx]
    const bounds = L.latLngBounds(ruta.waypoints)
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 })
  }

  return (
    <div className="w-full bg-forest-950 text-cream rounded-3xl overflow-hidden border border-forest-800/40 shadow-2xl">
      {/* ===================================================================== */}
      {/* 1. BARRA SUPERIOR: TELEMETRÍA Y CONTROLES DEL CARRO EN TIEMPO REAL    */}
      {/* ===================================================================== */}
      <div className="p-5 sm:p-6 bg-forest-900/90 border-b border-forest-800/50 flex flex-wrap items-center justify-between gap-4">
        {/* Origen ➔ Destino Activo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-avocado-500/20 border border-avocado-400/40 flex items-center justify-center text-avocado-400 shrink-0">
            <Truck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Rastreo Satelital Activo
              </span>
              <span className="text-xs text-cream/60 font-mono">{activeRuta.codigo}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-cream mt-0.5">
              {activeRuta.origenNombre.split('(')[0]} ➔ <span className="text-avocado-400">{activeRuta.destinoNombre}</span>
            </h3>
          </div>
        </div>

        {/* Indicadores en Tiempo Real: Temperatura, Km, Progreso */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
          {/* Temperatura Cámara */}
          <div className="bg-forest-950/60 px-3 py-2 rounded-xl border border-forest-800/60 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Cámara Frigorífica</span>
              <span className="font-bold text-emerald-300 font-mono text-sm">{telemetry.tempActual}°C Constante</span>
            </div>
          </div>

          {/* Distancia y Progreso */}
          <div className="bg-forest-950/60 px-3 py-2 rounded-xl border border-forest-800/60 flex items-center gap-2">
            <Route className="w-4 h-4 text-avocado-400" />
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Distancia & Recorrido</span>
              <span className="font-bold text-cream font-mono text-sm">
                {telemetry.kmRecorridos} / {activeRuta.distanciaKm} km ({telemetry.progresoPercent}%)
              </span>
            </div>
          </div>

          {/* Controles de Animación: Play, Pause, Velocidad */}
          <div className="flex items-center gap-1.5 bg-forest-950/80 p-1 rounded-xl border border-forest-800/70">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-forest-800 hover:bg-forest-700 text-cream transition-colors"
              title={isPlaying ? 'Pausar recorrido' : 'Iniciar recorrido'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Velocidad */}
            {( [1, 2, 3] as const ).map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
                  speedMultiplier === s
                    ? 'bg-avocado-600 text-forest-950'
                    : 'text-cream/60 hover:text-cream hover:bg-forest-800'
                }`}
              >
                {s}x
              </button>
            ))}

            <button
              onClick={handleFitPeru}
              className="p-2 rounded-lg text-cream/60 hover:text-cream hover:bg-forest-800 transition-colors ml-1"
              title="Ajustar vista a todo el Perú"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. CONTENEDOR DEL MAPA LEAFLET INTERACTIVO CON SUPERPOSICIONES       */}
      {/* ===================================================================== */}
      <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-forest-950">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Selector Flotante de Tipo de Capa (Satélite / Nocturno / Relieve) */}
        <div className="absolute top-4 left-4 z-10 bg-forest-950/85 backdrop-blur-md p-1.5 rounded-2xl border border-forest-800/80 shadow-xl flex items-center gap-1">
          <span className="text-[10px] uppercase font-bold text-cream/50 px-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-avocado-400" />
            Vista:
          </span>
          {(['satellite', 'dark', 'terrain'] as const).map((layerKey) => (
            <button
              key={layerKey}
              onClick={() => setMapLayer(layerKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mapLayer === layerKey
                  ? 'bg-avocado-600 text-forest-950 shadow-sm font-bold'
                  : 'text-cream/70 hover:text-cream hover:bg-forest-800/60'
              }`}
            >
              {layerConfigs[layerKey].name}
            </button>
          ))}
        </div>

        {/* Tarjeta Flotante Lateral de Ruta Activa (Detalles de Logística) */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 bg-forest-950/90 backdrop-blur-md p-5 rounded-2xl border border-forest-800/80 shadow-2xl">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-avocado-400 block">
                {activeRuta.tipoDestino} &bull; {activeRuta.destinoRegion}
              </span>
              <h4 className="text-lg font-bold font-serif text-cream">
                {activeRuta.destinoNombre}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-forest-800 text-cream border border-forest-700">
              {activeRuta.tiempoHoras}
            </span>
          </div>

          <p className="text-xs text-cream/80 leading-relaxed mb-3">
            {activeRuta.descripcion}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] bg-forest-900/60 p-2.5 rounded-xl border border-forest-800/60 mb-3">
            <div>
              <span className="text-cream/50 block">Vía Principal:</span>
              <span className="font-semibold text-cream truncate block">{activeRuta.viaPrincipal.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-cream/50 block">Cadena de Frío:</span>
              <span className="font-semibold text-emerald-400">{activeRuta.temperaturaObjetivo}</span>
            </div>
          </div>

          {/* Mercados Internacionales Conectados desde este nodo */}
          <div>
            <span className="text-[10px] uppercase font-bold text-cream/60 block mb-1.5 flex items-center gap-1">
              <Ship className="w-3 h-3 text-cyan-400" />
              Destinos de Ultramar Conectados:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeRuta.mercadosConectados.map((m, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-forest-800/80 text-cream/90 border border-forest-700/60"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda Visual de Sedes y Destinos (Esquina superior derecha) */}
        <div className="hidden md:flex absolute top-4 right-4 z-10 bg-forest-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-forest-800/80 shadow-xl flex-col gap-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cream/50 block">
            Leyenda Logística
          </span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
            <span className="text-cream/90 font-medium">Sede Calca (Origen)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 border border-white"></span>
            <span className="text-cream/90 font-medium">Megapuertos / Puertos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-white"></span>
            <span className="text-cream/90 font-medium">Hubs y Provincias</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-300 font-bold">Camión Frío en Ruta</span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. DIAGRAMA DE RUTA DE TRANSPORTE REFRIGERADO (ESTILO ecoBUS / TRANSIT) */}
      {/* ===================================================================== */}
      <div className="p-5 sm:p-6 bg-forest-950/80 border-t border-forest-800/60 backdrop-blur-md">
        
        {/* Cabecera Principal del Sistema de Transporte */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-forest-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-avocado-400/20 text-avocado-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-avocado-400/30">
                <Radio className="w-3 h-3 text-avocado-400 animate-pulse" />
                Red de Transporte Refrigerado • Flota Activa
              </span>
              <span className="text-[10px] text-cream/50 font-mono hidden sm:inline">
                SISTEMA TRANS-LOGÍSTICO
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-serif text-cream">
              Diagrama de Ruta y Paradas de Despacho
            </h4>
            <p className="text-xs text-cream/70 mt-0.5">
              Terminal Central: <strong className="text-avocado-300">Fundo Calca (Km 0 • Valle Sagrado)</strong> &mdash; Seleccione una línea para visualizar sus paradas intermedias
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-forest-900 border border-forest-800 text-xs font-mono text-cream/80 flex items-center gap-2">
              <Milestone className="w-3.5 h-3.5 text-avocado-400" />
              <span>{RUTAS_LOGISTICAS.length} Corredores Viales</span>
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SELECTOR DE LÍNEAS AL ESTILO METRO / TRANSIT BUS (RIBBON DE LÍNEAS) */}
        {/* =================================================================== */}
        <div className="mb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-cream/60 block mb-2">
            Líneas de Transporte y Corredores Logísticos:
          </span>
          <div className="flex flex-wrap gap-2">
            {RUTAS_LOGISTICAS.map((ruta, idx) => {
              const isActive = idx === activeRutaIndex
              return (
                <button
                  key={ruta.id}
                  onClick={() => handleFocusRoute(idx)}
                  className={`group relative px-3.5 py-2 rounded-xl text-left transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                    isActive
                      ? 'bg-forest-800/95 border-avocado-400 shadow-[0_0_20px_rgba(164,227,71,0.35)] ring-1 ring-avocado-400 scale-[1.02] text-cream'
                      : 'bg-forest-900/60 border-forest-800/80 hover:bg-forest-800/50 hover:border-forest-700 text-cream/80'
                  }`}
                >
                  {/* Badge de Línea con Color Oficial */}
                  <span
                    className="w-6 h-6 rounded-lg text-[10px] font-black font-mono flex items-center justify-center text-forest-950 shrink-0 shadow-xs"
                    style={{ backgroundColor: ruta.color }}
                  >
                    L{idx + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold leading-tight group-hover:text-cream">
                        {ruta.destinoNombre}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cream/60 block">
                      {ruta.distanciaKm} km &bull; {ruta.codigo}
                    </span>
                  </div>

                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-avocado-400 animate-ping ml-1" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* ESQUEMA GRÁFICO DE LA RUTA ACTIVA (ESTILO ecoBUS RUTA 34 B)         */}
        {/* =================================================================== */}
        <div className="bg-forest-900/90 rounded-2xl border-2 border-forest-700/80 p-4 sm:p-5 shadow-2xl overflow-hidden relative">
          
          {/* 1. Header Banner Estilo Letrero ecoBUS de la Imagen 2 */}
          <div className="bg-gradient-to-r from-[#173d2d] via-[#1e4d39] to-[#0e2c20] p-4 rounded-xl border border-avocado-400/40 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start sm:items-center gap-3">
              {/* Badge de Línea Prominente */}
              <div 
                className="px-3 py-1.5 rounded-lg text-forest-950 font-black font-mono text-sm tracking-wider uppercase shadow-md flex items-center gap-1.5 shrink-0"
                style={{ backgroundColor: activeRuta.color }}
              >
                <span>LÍNEA {activeRutaIndex + 1}</span>
                <span>•</span>
                <span>{activeRuta.codigo}</span>
              </div>

              <div>
                <h5 className="font-serif font-black text-lg sm:text-xl text-cream leading-tight flex items-center gap-2">
                  <span>{activeRuta.nombre}</span>
                </h5>
                <p className="text-xs text-cream/70 font-mono mt-0.5 flex items-center gap-2 flex-wrap">
                  <span>Troncal: {activeRuta.viaPrincipal}</span>
                  <span className="text-avocado-400">&bull;</span>
                  <span>Destino: {activeRuta.destinoRegion}</span>
                </p>
              </div>
            </div>

            {/* Badges de Telemetría Fría */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-forest-950/80 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-inner">
                <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeRuta.temperaturaObjetivo}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-950/80 text-cream/90 font-mono text-xs border border-forest-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-avocado-400" />
                <span>{activeRuta.tiempoHoras}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-avocado-400 text-forest-950 font-bold text-xs font-mono shadow-sm flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>DESPACHO ACTIVO</span>
              </span>
            </div>
          </div>

          {/* 2. Trazado de Vía y Paradas Intermedias (Dual-Track Route Map) */}
          <div className="relative py-4 px-2">
            
            <div className="flex items-center justify-between mb-3 text-[11px] text-cream/60 font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Terminal Origen: Fundo Calca (Km 0)
              </span>
              <span className="hidden sm:inline text-cream/40">
                &mdash;&mdash; Sentido de Despacho Refrigerado Sur ➔ Costa / Frontera &mdash;&mdash;
              </span>
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Terminal Destino: {activeRuta.destinoNombre} ({activeRuta.distanciaKm} km)
              </span>
            </div>

            {/* Contenedor con Scroll Horizontal de Estaciones / Paradas */}
            <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-forest-700 scrollbar-track-forest-950">
              <div className="min-w-[840px] relative px-4">
                
                {/* Doble Vía / Dual-Track de la Ruta (como en la Imagen 2 de ecoBUS) */}
                {/* Vía Verde: Despacho Refrigerado */}
                <div 
                  className="absolute top-[32px] left-8 right-8 h-1.5 rounded-full z-0 opacity-90 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  style={{ backgroundColor: activeRuta.color }}
                />
                {/* Vía Naranja: Retorno Vacío & Monitoreo Datalogger */}
                <div className="absolute top-[38px] left-8 right-8 h-1 rounded-full bg-amber-500/80 z-0 opacity-70 border-t border-amber-400/40" />

                {/* Camioncito animado viajando por las vías */}
                <div className="absolute top-[20px] left-12 animate-route-flow z-20 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-forest-950 border border-avocado-400 shadow-[0_0_10px_rgba(164,227,71,0.8)] flex items-center justify-center text-[10px]">
                    🚛
                  </div>
                </div>

                {/* Nodos de Estaciones / Paradas a lo largo de la vía */}
                <div className="relative z-10 flex justify-between items-start gap-4">
                  {(PARADAS_POR_RUTA[activeRuta.id] || []).map((parada, pIdx, arr) => {
                    const isFirst = pIdx === 0
                    const isLast = pIdx === arr.length - 1
                    const isControl = parada.tipo === 'control'

                    return (
                      <div 
                        key={pIdx} 
                        className="flex flex-col items-center text-center group cursor-pointer"
                        style={{ minWidth: `${100 / arr.length}%` }}
                      >
                        {/* Indicadores Circulares de Parada (Doble Punto Verde + Naranja como en ecoBUS) */}
                        <div className="relative mb-3 flex flex-col items-center">
                          {isFirst ? (
                            // Terminal de Origen (Doble Anillo Verde)
                            <div className="w-8 h-8 rounded-full bg-forest-950 border-2 border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.8)] flex items-center justify-center ring-4 ring-emerald-500/20 group-hover:scale-110 transition-transform">
                              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                          ) : isLast ? (
                            // Terminal de Destino (Doble Anillo Azul / Puerto)
                            <div className="w-8 h-8 rounded-full bg-forest-950 border-2 border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.8)] flex items-center justify-center ring-4 ring-sky-500/20 group-hover:scale-110 transition-transform">
                              <span className="w-3 h-3 rounded-full bg-sky-400" />
                            </div>
                          ) : (
                            // Paradas Intermedias: Doble Punto (Verde arriba, Naranja abajo)
                            <div className="flex flex-col items-center gap-1 group-hover:scale-125 transition-transform">
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-xs"
                                style={{ backgroundColor: isControl ? '#10b981' : activeRuta.color }}
                              />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white/80 shadow-xs" />
                            </div>
                          )}
                        </div>

                        {/* Etiqueta de Kilómetro y Altitud */}
                        <span className="text-[10px] font-mono font-bold text-avocado-300 block mb-0.5">
                          Km {parada.km}
                        </span>

                        {/* Nombre de la Estación / Parada */}
                        <h6 className={`text-xs font-bold leading-tight mb-1 transition-colors ${
                          isFirst ? 'text-emerald-300 font-extrabold' : isLast ? 'text-sky-300 font-extrabold' : 'text-cream group-hover:text-avocado-200'
                        }`}>
                          {parada.nombre}
                        </h6>

                        {/* Detalle Operativo / Checkpoint */}
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          isControl 
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                            : isFirst || isLast 
                            ? 'bg-forest-800 text-cream/90 border border-forest-700' 
                            : 'text-cream/60'
                        }`}>
                          {parada.nota}
                        </span>

                        <span className="text-[8.5px] text-cream/40 font-mono mt-0.5">
                          {parada.altitud}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Leyenda Gráfica Inspirada en la Imagen 2 (ecoBUS Bottom Legend) */}
          <div className="mt-4 pt-3 border-t border-forest-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-cream/70">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cream/50">
                Simbología del Diagrama:
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white/80" />
                <span className="text-[11px] text-cream/80">Despacho Frío (+5°C)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white/80" />
                <span className="text-[11px] text-cream/80">Control SENASA / Datalogger</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 border border-white/80" />
                <span className="text-[11px] text-cream/80">Terminal / Megapuerto</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-1 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-cream/80">Vía Nacional Asfaltada</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-cream/60 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-avocado-400" />
              <span>Monitoreo Térmico Satelital 24/7</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
