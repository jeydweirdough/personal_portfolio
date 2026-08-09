'use client'

import { useState, useEffect } from 'react'

export interface ShowcaseItem {
  id: string
  category: string
  title: string
  icon?: string
  starColor?: string
  description?: string
  link?: string
  onClick?: () => void
}

interface FeaturedCardWidgetProps {
  items?: ShowcaseItem[]
  onItemClick?: (item: ShowcaseItem) => void
  className?: string
}

const DEFAULT_ITEMS: ShowcaseItem[] = [
  {
    id: '1',
    category: 'HERITAGE FOUNDATION',
    title: '29 Principles & conservation impact.',
    starColor: '#E77E43',
  },
  {
    id: '2',
    category: 'FEATURED PROJECT',
    title: 'Modern Full-Stack Cloud Architecture & AI Automation.',
    starColor: '#FF4532',
  },
  {
    id: '3',
    category: 'TECHNICAL LEADERSHIP',
    title: 'High-availability infrastructure & reliable support systems.',
    starColor: '#3B82F6',
  },
  {
    id: '4',
    category: 'SOFTWARE ENGINEERING',
    title: 'Responsive Next.js applications built for scale.',
    starColor: '#10B981',
  },
]

export function FeaturedCardWidget({ items = DEFAULT_ITEMS, onItemClick, className = '' }: FeaturedCardWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const activeItem = items[currentIndex] || items[0]

  return (
    <div
      onClick={() => onItemClick?.(activeItem)}
      className={`relative w-full max-w-2xl mx-auto rounded-[32px] bg-[#ECE8E1] dark:bg-[#18181A] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E2DDD5] dark:border-[#27272A] flex flex-col sm:flex-row items-center gap-4 sm:gap-5 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)] cursor-pointer select-none ${className}`}
    >
      {/* Dark Square Icon Box */}
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-[22px] bg-[#111111] dark:bg-[#09090B] flex items-center justify-center shadow-inner overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        {/* Star Icon (matching exact image icon) */}
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110"
          fill={activeItem.starColor || '#E77E43'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Content + Controls Area */}
      <div className="flex-1 flex flex-col justify-between w-full h-full min-h-[96px] py-1">
        {/* Upper Text */}
        <div className="space-y-1">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 font-sans">
            {activeItem.category}
          </p>
          <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-neutral-900 dark:text-white leading-snug tracking-tight font-sans">
            {activeItem.title}
          </h3>
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="flex items-center justify-between mt-4 pt-1">
          {/* Pagination Indicators (dots + bar) */}
          <div className="flex items-center gap-1.5">
            {items.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-neutral-900 dark:bg-white'
                    : 'w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700'
                }`}
              />
            ))}
          </div>

          {/* Navigation Pill Buttons (← and →) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              type="button"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#242427] text-neutral-800 dark:text-neutral-200 flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5 hover:scale-105 hover:bg-neutral-50 dark:hover:bg-[#2C2C30] transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              type="button"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#242427] text-neutral-800 dark:text-neutral-200 flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5 hover:scale-105 hover:bg-neutral-50 dark:hover:bg-[#2C2C30] transition-all active:scale-95"
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
