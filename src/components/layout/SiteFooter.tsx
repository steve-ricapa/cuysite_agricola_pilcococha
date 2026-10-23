import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

const currentYear = new Date().getFullYear()

const photos = [
  { src: '/images/producto/palta-arbol.jpg', alt: 'Palta Hass creciendo en el árbol' },
  { src: '/images/fundo/team-field.jpg', alt: 'Equipo de campo de Agrícola Pilcococha' },
  { src: '/images/producto/palta-hass.jpg', alt: 'Palta Hass fresca' },
  { src: '/images/fundo/acopio-cosecha.jpg', alt: 'Cosecha de palta en el fundo' },
  { src: '/images/producto/palta-caja.jpg', alt: 'Palta Hass lista para exportación' },
  { src: '/images/fundo/riego-tecnificado.jpg', alt: 'Cultivo con riego tecnificado' },
]

export function SiteFooter() {
  return (
    <footer data-bg-color="#F7F8F4" className="bg-[#F7F8F4] text-forest-950">
      <div className="overflow-hidden pt-20 sm:pt-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-serif text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight">
            Nos mueve la palta.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-forest-800/75 sm:text-base">
            Del cuidado de nuestros campos al encuentro con nuevos mercados. Descubre el origen y la calidad de nuestra palta Hass.
          </p>
          <Link to="/nuestra-palta" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-forest-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-950">
            Conoce nuestra palta <ArrowDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
          </Link>
        </div>

        <div className="mx-auto mt-16 flex h-48 max-w-[1500px] items-end justify-center gap-2 overflow-hidden px-4 sm:mt-20 sm:h-72 sm:gap-4 sm:px-8 lg:h-80" role="group" aria-label="Imágenes de nuestros campos y palta Hass">
          {photos.map((photo, index) => (
            <div key={photo.src} className={`w-32 shrink-0 overflow-hidden rounded-t-xl sm:w-48 lg:w-56 ${index % 3 === 0 ? 'h-[85%]' : index % 3 === 1 ? 'h-[65%]' : 'h-full'}`}>
              <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-forest-800/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
          <div className="max-w-xs">
            <Link to="/" className="inline-block rounded-lg bg-white p-1" title="Agrícola Pilcococha - Volver al Inicio">
              <img src="/images/fundo/logopilcococha.png" alt="Agrícola Pilcococha - Palta Hass de Exportación" loading="lazy" className="h-24 w-auto object-contain" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-forest-800/70">
              Cultivamos palta Hass peruana con cuidado, trazabilidad y vocación de llevarla más lejos.
            </p>
          </div>

          <nav aria-label="Nuestra empresa">
            <h3 className="mb-6 text-sm font-bold text-forest-950">Nuestra empresa</h3>
            <ul className="space-y-4 text-sm text-forest-800/75">
              <li><Link to="/nosotros" className="hover:text-forest-950 hover:underline">Quiénes somos</Link></li>
              <li><Link to="/proceso-calidad" className="hover:text-forest-950 hover:underline">Proceso y calidad</Link></li>
              <li><Link to="/contacto" className="hover:text-forest-950 hover:underline">Contacto</Link></li>
            </ul>
          </nav>

          <nav aria-label="Nuestra palta">
            <h3 className="mb-6 text-sm font-bold text-forest-950">Nuestra palta</h3>
            <ul className="space-y-4 text-sm text-forest-800/75">
              <li><Link to="/nuestra-palta" className="hover:text-forest-950 hover:underline">Palta Hass</Link></li>
              <li><Link to="/mercados" className="hover:text-forest-950 hover:underline">Mercados</Link></li>
              <li><Link to="/cotizar" className="hover:text-forest-950 hover:underline">Solicitar cotización</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-6 text-sm font-bold text-forest-950">Hablemos</h3>
            <div className="space-y-4 text-sm text-forest-800/75">
              <a href="mailto:comercial@agricolapilcococha.com" className="block break-words hover:text-forest-950 hover:underline">comercial@agricolapilcococha.com</a>
              <Link to="/contacto" className="inline-flex items-center gap-1 font-semibold text-forest-900 hover:underline">Escríbenos <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-forest-800/10 px-6 py-6 text-xs text-forest-800/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Agrícola Pilcococha S.A.C. Todos los derechos reservados.</p>
          <p>Cuysite Development</p>
        </div>
      </div>
    </footer>
  )
}
