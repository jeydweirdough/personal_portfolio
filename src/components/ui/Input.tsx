import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary">{label}</label>}
      <input
        className={`
          w-full px-3 py-2 rounded-md border border-border-light dark:border-border-dark 
          bg-white dark:bg-bg-dark text-sm outline-none focus:border-accent-orange 
          transition-colors placeholder:opacity-50 ${className}
        `}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary">{label}</label>}
      <textarea
        className={`
          w-full px-3 py-2 rounded-md border border-border-light dark:border-border-dark 
          bg-white dark:bg-bg-dark text-sm outline-none focus:border-accent-orange 
          transition-colors placeholder:opacity-50 resize-none ${className}
        `}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
    </div>
  )
}
