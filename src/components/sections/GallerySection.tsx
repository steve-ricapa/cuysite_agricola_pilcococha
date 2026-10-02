import React from 'react'
import { motion } from 'motion/react'

export interface GalleryImage {
  src: string
  alt: string
  label?: string
}

export interface GallerySectionProps {
  images: GalleryImage[]
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  return (
    <section className="py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 relative"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              {img.label && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-forest-800/80 text-white text-sm">
                  {img.label}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}