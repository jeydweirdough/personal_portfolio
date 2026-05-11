import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  isLoading?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  isLoading = false,
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none relative"
  
  const variants = {
    primary: "bg-accent-orange text-white shadow-sm hover:bg-accent-orange-hover",
    secondary: "bg-slate-50 dark:bg-bg-dark-soft border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary hover:bg-slate-100 dark:hover:bg-white/5",
    outline: "border border-border-light dark:border-border-dark bg-transparent text-text-light-primary dark:text-text-dark-primary hover:border-accent-orange/50 hover:text-accent-orange",
    ghost: "text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-slate-100 dark:hover:bg-bg-dark-soft"
  }
  
  const sizes = {
    xs: "px-2 py-1 text-[10px]",
    sm: "px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs",
    md: "px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm",
    lg: "px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base"
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </button>
  )
}
