'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  isLoading?: boolean
}

/**
 * Stamped controls. Square corners, stencil caps, no shadow.
 * The signal colour is the primary action and nothing else, and it resolves
 * per ground — so the label keeps its contrast on concrete, asphalt, or an
 * orange field without any per-surface special-casing here.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.12em] transition-colors duration-200 ease-[var(--ease-plate)] disabled:opacity-45 disabled:pointer-events-none relative'

  const variants = {
    primary: 'bg-[var(--plate-signal)] text-[var(--plate-signal-ink)] hover:bg-[var(--plate-signal-hover)]',
    secondary:
      'border border-[var(--plate-ink)] text-[var(--plate-ink)] hover:bg-[var(--plate-ink)] hover:text-[var(--plate-ground)]',
    outline:
      'border border-[var(--plate-rule)] text-[var(--plate-ink)] hover:border-[var(--plate-ink)]',
    ghost: 'text-[var(--plate-ink-dim)] hover:text-[var(--plate-ink)]',
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-[11px]',
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-7 py-3.5 text-sm',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Loading is a lamp on the plate edge, not a spinner. */}
      {isLoading && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 bg-current opacity-70 motion-safe:animate-[lamp_1.2s_var(--ease-plate)_infinite]"
        />
      )}
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  )
}
