import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'default',
  asChild: _asChild = false,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const variants = {
    primary: 'bg-forest-800 text-white hover:bg-forest-700',
    secondary: 'bg-cream text-forest-900 hover:bg-sand border border-forest-800/10',
    ghost: 'bg-transparent text-charcoal hover:bg-charcoal/10',
  }

  const sizes = {
    default: 'h-10 py-2 px-5 text-sm',
    sm: 'h-8 py-1.5 px-3 text-xs',
    lg: 'h-12 py-3 px-8 text-base',
    icon: 'h-10 w-10 p-2',
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}