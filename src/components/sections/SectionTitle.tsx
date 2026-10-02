import React from 'react'

export interface SectionTitleProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      {subtitle && <p className="ebrow text-forest-800 tracking-widest text-sm mb-4">{subtitle}</p>}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-charcoal leading-tight mb-6">{title}</h2>
      {children}
    </div>
  )
}