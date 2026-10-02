import React from 'react'
import { Link } from 'react-router-dom'
import { MetricCard } from '@/components/sections/MetricCard'
import { FundoCarousel } from '@/components/sections/FundoCarousel'
import { ArrowRight, Leaf, Users, Award, ShieldCheck, HeartHandshake } from 'lucide-react'

export const NosotrosPage: React.FC = () => {
  return (
    <div className="py-12 md:py-16">
      {/* Banner Superior */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-forest-950 text-cream rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Resplandor sutil de fondo */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-avocado-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-forest-800/30 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Texto a la izquierda */}
            <div className="lg:col-span-7 xl:col-span-7">
              <span className="ebrow text-avocado-400 mb-3 block">Nuestra Identidad</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-cream leading-tight mb-6">
                Cultivando confianza desde el corazón del Perú.
              </h1>
              <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
                Agrícola Pilcococha nació con la visión de llevar la mejor palta Hass del suelo peruano a los mercados más competitivos del planeta, uniendo ciencia agrícola, respeto ambiental y responsabilidad comunitaria.
              </p>
            </div>

            {/* Imagen a la derecha: sin card, sin marco, imagen pura integrada */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <img 
                src="/images/gallery/paltacultivando.png" 
                alt="Cultivando confianza - Agrícola Pilcococha" 
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Historia & Fundo con Carrusel */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <FundoCarousel />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="ebrow text-forest-800">El Fundo</span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950 leading-tight">
              Tierra fértil, microclima privilegiado y cuidado minucioso.
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Ubicados en valles estratégicos de Perú, nuestros campos disfrutan de abundante radiación solar, agua pura de deshielos andinos y suelos con drenaje óptimo para el desarrollo vigoroso de árboles de Palta Hass.
            </p>
            <p className="text-muted text-base leading-relaxed">
              Cada etapa del ciclo vegetativo es monitoreada por ingenieros agrónomos de amplia trayectoria, asegurando árboles sanos y frutos que alcanzan el equilibrio exacto de materia seca antes de su recolección.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sand/50 border border-charcoal/5">
                <Leaf className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-forest-950">Agricultura Sostenible</h4>
                  <p className="text-xs text-muted mt-1">Riego por goteo de alta eficiencia para optimizar el recurso hídrico.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sand/50 border border-charcoal/5">
                <Users className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-forest-950">Impacto Comunitario</h4>
                  <p className="text-xs text-muted mt-1">Empleo formal y digno para familias agrícolas de la zona.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="bg-sand/40 py-16 border-y border-charcoal/5 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard number="80+" label="Hectáreas bajo cultivo" />
            <MetricCard number="10+" label="Años de trayectoria agrícola" />
            <MetricCard number="100%" label="Trazabilidad por lote" />
            <MetricCard number="+500t" label="Capacidad exportadora" />
          </div>
        </div>
      </section>

      {/* Pilares y Valores */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="ebrow text-forest-800 mb-2 block">Nuestros Pilares</span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-forest-950">
            Los valores que guían cada cosecha
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white shadow-xs border border-charcoal/10">
            <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-forest-950 mb-3">Rigor y Calidad</h3>
            <p className="text-sm text-muted leading-relaxed">
              No enviamos fruta que no cumpla con los parámetros acordados de calibre, firmeza y porcentaje de materia seca.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-xs border border-charcoal/10">
            <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-forest-950 mb-3">Relaciones de Largo Plazo</h3>
            <p className="text-sm text-muted leading-relaxed">
              Buscamos alianzas comerciales plurianuales con importadores que valoran la transparencia y la estabilidad de suministro.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-xs border border-charcoal/10">
            <div className="w-12 h-12 rounded-2xl bg-forest-800/10 text-forest-800 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-forest-950 mb-3">Innovación en Campo</h3>
            <p className="text-sm text-muted leading-relaxed">
              Aplicamos tecnología en fertilización de precisión, podas técnicas y monitoreo satelital de humedad.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="bg-forest-900 text-cream rounded-3xl p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-cream mb-4">
            ¿Desea programar su programa de suministro?
          </h2>
          <p className="text-cream/80 text-base max-w-xl mx-auto mb-8 font-light">
            Conversemos sobre sus volúmenes y requerimientos para la próxima campaña de Palta Hass peruana.
          </p>
          <Link
            to="/cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-avocado-600 hover:bg-avocado-400 text-forest-950 font-bold text-sm tracking-wide transition-all shadow-md"
          >
            <span>Iniciar Conversación Comercial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export const AboutPage = NosotrosPage
export const AboutSection = NosotrosPage