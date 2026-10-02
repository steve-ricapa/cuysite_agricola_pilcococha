import React from 'react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export interface MetricCardProps {
  number: string | number
  label: string
  sublabel?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({ number, label, sublabel }) => {
  return (
    <div className="text-center p-6 sm:p-7 rounded-3xl bg-white transition-all hover:bg-sand/70 border border-charcoal/10 shadow-xs hover:shadow-md hover:-translate-y-1 duration-300">
      <p className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-forest-950 tracking-tight">
        <AnimatedCounter value={number} />
      </p>
      <p className="text-forest-900 font-semibold text-xs sm:text-sm mt-2">{label}</p>
      {sublabel && <p className="text-muted text-[11px] mt-0.5">{sublabel}</p>}
    </div>
  )
}