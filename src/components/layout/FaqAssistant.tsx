import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

const greetings = [
  { start: 5.5, end: 6.8, text: '¡Hola!' },
  { start: 7.2, end: 9.5, text: '¡Bienvenidos a Agrícola Pilcococha!' },
]

const questions = [
  {
    label: '¿Qué palta ofrecen?',
    answer: 'Cultivamos palta Hass peruana. Puedes conocer sus características y presentaciones en Nuestra Palta.',
    links: [{ label: 'Ver Nuestra Palta', to: '/nuestra-palta' }],
  },
  {
    label: '¿Cómo cuidan la calidad?',
    answer: 'En Proceso y Calidad encontrarás información sobre el cultivo, la selección y los controles del producto.',
    links: [{ label: 'Ver Proceso y Calidad', to: '/proceso-calidad' }],
  },
  {
    label: '¿A qué mercados se dirigen?',
    answer: 'Conoce los destinos para los que preparamos nuestra oferta en la página de Mercados.',
    links: [{ label: 'Ver Mercados', to: '/mercados' }],
  },
  {
    label: 'Quiero hacer una consulta',
    answer: 'Para hablar con el equipo, escríbenos desde Contacto o solicita una cotización. Este asistente solo responde preguntas frecuentes.',
    links: [
      { label: 'Ir a Contacto', to: '/contacto' },
      { label: 'Solicitar cotización', to: '/cotizar' },
    ],
  },
]

export function FaqAssistant() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [greeting, setGreeting] = useState('')
  const [hovered, setHovered] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hidden = pathname === '/contacto'

  useEffect(() => {
    if (hidden) return

    const video = videoRef.current
    if (!video) return

    const playGreeting = () => {
      video.currentTime = 0
      void video.play().catch(() => {})
    }

    playGreeting()
    const interval = window.setInterval(playGreeting, 60_000)
    return () => {
      window.clearInterval(interval)
      video.pause()
    }
  }, [hidden])

  useEffect(() => {
    if (!open) return
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open])

  if (hidden) return null

  return (
    <aside className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          id="faq-assistant-panel"
          role="region"
          aria-label="Asistente de preguntas frecuentes"
          className="w-[min(22rem,calc(100vw-2rem))] max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl border border-forest-800/15 bg-white p-5 text-charcoal shadow-[0_18px_50px_rgba(14,44,32,0.23)] sm:p-6"
        >
          <div className="flex items-start justify-between gap-3 border-b border-forest-800/10 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-forest-700">Asistente Pilcococha</p>
              <h2 className="mt-1 font-serif text-xl font-bold text-forest-950">¡Bienvenidos!</h2>
              <p className="mt-1 text-sm leading-relaxed text-charcoal/75">Elige una pregunta. No necesitas escribir.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                launcherRef.current?.focus()
              }}
              className="rounded-full p-2 text-forest-800 hover:bg-forest-800/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800"
              aria-label="Cerrar asistente"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-2" aria-label="Preguntas frecuentes">
            {questions.map((question, index) => (
              <button
                key={question.label}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                className={`flex w-full items-center justify-between gap-3 border-b border-forest-800/10 py-3 text-left text-sm font-semibold transition-colors hover:text-forest-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800 ${selected === index ? 'text-forest-600' : 'text-forest-950'}`}
              >
                <span>{question.label}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className="mt-3 border-l-2 border-river pl-4" aria-live="polite">
              <p className="text-sm leading-relaxed text-charcoal">{questions[selected].answer}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {questions[selected].links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-forest-700 underline underline-offset-4 hover:text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {!open && (hovered || greeting) && (
          <div aria-hidden="true" className="pointer-events-none absolute bottom-full right-0 mb-3 w-max max-w-[min(16rem,calc(100vw-2rem))] rounded-2xl border border-forest-800/15 bg-white px-4 py-2 text-center text-xs font-bold leading-snug text-forest-950 shadow-lg">
            {hovered ? '¡Hola! ¿En qué puedo ayudarte?' : greeting}
            <span className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-b border-r border-forest-800/15 bg-white" />
          </div>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-expanded={open}
          aria-controls={open ? 'faq-assistant-panel' : undefined}
          aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de preguntas frecuentes'}
          className="block rounded-full border border-forest-800/15 bg-white p-1.5 shadow-[0_8px_30px_rgba(14,44,32,0.25)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            poster="/images/hero/palta-asistente.png"
            aria-hidden="true"
            onTimeUpdate={(event) => {
              const time = event.currentTarget.currentTime
              setGreeting(greetings.find(({ start, end }) => time >= start && time <= end)?.text ?? '')
            }}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0
              setGreeting('')
            }}
            className="h-18 w-18 rounded-full bg-white object-cover sm:h-20 sm:w-20"
          >
            <source src="/videopalta/palta-asistente.webm" type="video/webm" />
            <source src="/videopalta/gemini_generated_video_8b2dc77d.mp4" type="video/mp4" />
          </video>
        </button>
      </div>
    </aside>
  )
}
