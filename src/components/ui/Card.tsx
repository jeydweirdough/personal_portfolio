import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

/**
 * A framed region. Square, 1px rule, no shadow and no fill — regions here are
 * plates bolted to the page, not floating containers.
 */
export function Card({ children, className = '' }: CardProps) {
  return <div className={`border border-[var(--plate-rule)] ${className}`}>{children}</div>
}
