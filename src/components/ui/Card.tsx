import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
}

export function Card({ children, className = '', hoverable = false, ...props }: CardProps) {
  return (
    <div 
      className={`
        rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-bg-dark transition-all
        ${hoverable ? 'hover:border-accent-orange/40 hover:shadow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-border-light dark:border-border-dark bg-slate-50 dark:bg-bg-dark-soft ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`px-6 py-3 border-t border-border-light dark:border-border-dark bg-slate-50 dark:bg-bg-dark-soft ${className}`}>
      {children}
    </div>
  )
}
