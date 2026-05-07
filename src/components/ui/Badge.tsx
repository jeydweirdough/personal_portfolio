import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border"
  
  const variants = {
    default: "bg-slate-100 dark:bg-bg-dark-soft border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary",
    accent: "bg-accent-orange/10 border-accent-orange/20 text-accent-orange",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-500"
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
