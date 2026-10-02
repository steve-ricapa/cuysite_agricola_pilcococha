import React from 'react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export interface MetricCardProps {
  number: string | number
  label: string
  sublabel?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({ number, label, sublabel }) => {
  return (
    <div className="card-highlight-white group relative text-center p-6 sm:p-7 rounded-3xl bg-white transition-all duration-300 ease-out hover:bg-sand/40 border border-charcoal/10 shadow-xs cursor-pointer overflow-hidden">
      <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-avocado-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      <p className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-forest-950 tracking-tight group-hover:scale-105 transition-transform duration-300">
        <AnimatedCounter value={number} />
      </p>
      <p className="text-forest-900 font-semibold text-xs sm:text-sm mt-2 group-hover:text-forest-950 transition-colors">{label}</p>
      {sublabel && <p className="text-muted text-[11px] mt-0.5">{sublabel}</p>}
    </div>
  )
}