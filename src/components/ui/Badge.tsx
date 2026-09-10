import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'live' | 'muted'
  className?: string
}

/** A stamped tag. Square and ruled — never a filled pill. */
export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'border-[var(--plate-rule)] text-[var(--plate-ink)]',
    accent: 'border-[var(--plate-ink)] text-[var(--plate-ink)]',
    live: 'border-[var(--plate-signal)] text-[var(--plate-signal)]',
    muted: 'border-[var(--plate-rule)] text-[var(--plate-ink-dim)]',
  }
  return (
    <span
      className={`stencil inline-flex items-center border px-2.5 py-1.5 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
