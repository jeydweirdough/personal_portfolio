import React from 'react'

interface EmptyStateProps {
  title: string
  message: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="relative mb-8">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-accent-orange/20 blur-3xl rounded-full" />
        
        <div className="relative h-24 w-24 rounded-3xl bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark flex items-center justify-center shadow-2xl">
          {icon || (
            <svg className="w-10 h-10 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
        </div>
      </div>

      <div className="max-w-sm space-y-3">
        <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed opacity-60">
          {message}
        </p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-8 px-6 py-2.5 rounded-xl bg-accent-orange text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-orange/90 transition-all active:scale-95 shadow-lg shadow-accent-orange/20"
        >
          {action.label}
        </button>
      )}

      {/* Decorative System Metadata */}
      <div className="mt-12 flex items-center gap-4 opacity-20">
         <div className="h-[1px] w-8 bg-border-light dark:bg-border-dark" />
         <span className="text-xs font-mono uppercase tracking-widest">Dataset: Null_Pointer</span>
         <div className="h-[1px] w-8 bg-border-light dark:bg-border-dark" />
      </div>
    </div>
  )
}
