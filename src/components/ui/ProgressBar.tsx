import React from 'react'

interface ProgressBarProps {
  progress: number // 0 to 100
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: string
  showValue?: boolean
  className?: string
  isAnimated?: boolean
}

export function ProgressBar({ 
  progress, 
  size = 'md', 
  color = 'bg-accent-orange',
  showValue = false,
  className = '',
  isAnimated = true
}: ProgressBarProps) {
  
  const heightMap = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className="text-[10px] font-bold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wider">
            {progress}% Complete
          </span>
        )}
      </div>
      <div className={`w-full bg-slate-100 dark:bg-bg-dark-soft rounded-full overflow-hidden ${heightMap[size]}`}>
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out ${isAnimated ? 'animate-pulse' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
