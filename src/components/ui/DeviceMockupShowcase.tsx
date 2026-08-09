'use client'

import { TechIcon } from './TechIcon'

export interface DocumentationItem {
  key?: string
  image: string
  title?: string
}

interface DeviceMockupShowcaseProps {
  documentation: DocumentationItem[]
  demoUrl?: string
  techStack?: any[]
  onImageClick?: (imageUrl: string) => void
  className?: string
}

// Preset anchor positions around the mockup stage matching hero float style
const ANCHORS = [
  { style: { top: '2%',   left: '2%'   }, delay: '0s',    duration: '4s'   },
  { style: { top: '4%',   right: '3%'  }, delay: '0.6s',  duration: '5s'   },
  { style: { top: '48%',  left: '0%'   }, delay: '1.2s',  duration: '4.2s' },
  { style: { top: '35%',  right: '1%'  }, delay: '0.4s',  duration: '4.8s' },
  { style: { top: '82%',  left: '6%'   }, delay: '0.9s',  duration: '3.8s' },
  { style: { top: '78%',  right: '6%'  }, delay: '1.5s',  duration: '4.5s' },
]

export function DeviceMockupShowcase({
  documentation = [],
  demoUrl = 'https://bank-simulator-lemon.vercel.app',
  techStack = [],
  onImageClick,
  className = '',
}: DeviceMockupShowcaseProps) {
  if (!documentation || documentation.length === 0) return null

  // Assign images for desktop, tablet, and mobile
  const desktopImg = documentation[0]?.image || ''
  const tabletImg = documentation[1]?.image || documentation[0]?.image || ''
  const mobileImg = documentation[2]?.image || documentation[0]?.image || ''

  const displayUrl = demoUrl 
    ? demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') 
    : 'bank-simulator-lemon.vercel.app'

  return (
    <div className={`w-full ${className}`}>
      {/* Composite Multi-Device Mockup Stage without outer card container */}
      <div className="relative w-full max-w-4xl mx-auto py-6 px-2 sm:px-4 flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Hero-Style Tech Stack Cards Overlapping Mockup Stage */}
        {techStack && techStack.length > 0 && techStack.map((tech: any, i: number) => {
          const name = typeof tech === 'string' ? tech : tech.name
          const link_svg = typeof tech === 'string' ? undefined : tech.link_svg
          const anchor = ANCHORS[i % ANCHORS.length]

          return (
            <div 
              key={name || i}
              className="absolute z-40 select-none transition-transform duration-300 hover:scale-125 cursor-pointer"
              style={anchor.style}
              title={name}
            >
              <div 
                className="h-10 w-10 sm:h-12 sm:w-12 p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-bg-dark/90 border border-border-light dark:border-border-dark shadow-lg backdrop-blur-md animate-float flex items-center justify-center"
                style={{ animationDelay: anchor.delay, animationDuration: anchor.duration }}
              >
                <TechIcon name={name} link_svg={link_svg} />
              </div>
            </div>
          )
        })}

        <div className="relative w-full max-w-3xl aspect-[16/10] flex items-center justify-center">

          {/* 1. DESKTOP MONITOR FRAME (Center Background) */}
          <div 
            onClick={() => onImageClick?.(desktopImg)}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[78%] sm:w-[82%] aspect-[16/10] bg-[#1a1a1e] dark:bg-[#0c0c0e] rounded-t-2xl sm:rounded-t-3xl p-2 sm:p-3 shadow-2xl border border-white/10 group cursor-zoom-in transition-all duration-500 hover:scale-[1.01] hover:shadow-accent-orange/20 z-10"
          >
            {/* Desktop Browser Header Bar */}
            <div className="w-full h-5 sm:h-7 bg-[#27272c] dark:bg-[#18181c] rounded-t-xl px-3 flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              {/* URL Bar */}
              <div className="flex-1 max-w-[220px] sm:max-w-[320px] h-3.5 sm:h-4.5 mx-auto bg-black/30 rounded-md px-2 flex items-center gap-1 text-[9px] sm:text-[10px] text-white/60 font-mono overflow-hidden">
                <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="truncate">{displayUrl}</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Monitor Screen Image */}
            <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-32px)] rounded-b-lg overflow-hidden bg-black">
              <img 
                src={desktopImg} 
                alt={documentation[0]?.title || 'Desktop Preview'} 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Expand Desktop View
                </span>
              </div>
            </div>

            {/* Monitor Chin & Stand */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-4 bg-[#28282d] rounded-b-md shadow-md flex items-center justify-center">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
          </div>


          {/* 2. TABLET / LAPTOP FRAME (Left Overlapping) */}
          {tabletImg && (
            <div 
              onClick={() => onImageClick?.(tabletImg)}
              className="absolute left-[2%] sm:left-[5%] bottom-[8%] w-[42%] sm:w-[38%] aspect-[4/3] bg-[#1e1e24] dark:bg-[#0f0f13] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-white/15 group cursor-zoom-in transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-accent-orange/30 z-20"
            >
              {/* Tablet Camera Dot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
              
              {/* Tablet Screen */}
              <div className="w-full h-full rounded-lg overflow-hidden bg-black mt-1">
                <img 
                  src={tabletImg} 
                  alt={documentation[1]?.title || 'Tablet Preview'} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold shadow-lg">
                    Tablet View
                  </span>
                </div>
              </div>
            </div>
          )}


          {/* 3. MOBILE SMARTPHONE FRAME (Front Right Overlapping) */}
          {mobileImg && (
            <div 
              onClick={() => onImageClick?.(mobileImg)}
              className="absolute right-[4%] sm:right-[10%] -bottom-[2%] w-[24%] sm:w-[22%] aspect-[9/19] bg-[#111115] dark:bg-[#08080a] rounded-[24px] sm:rounded-[36px] p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/20 group cursor-zoom-in transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-accent-orange/40 z-30"
            >
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-3.5 bg-black rounded-full border border-white/10 z-40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c22] border border-white/10" />
              </div>

              {/* Smartphone Screen */}
              <div className="w-full h-full rounded-[18px] sm:rounded-[28px] overflow-hidden bg-black relative">
                <img 
                  src={mobileImg} 
                  alt={documentation[2]?.title || 'Mobile Preview'} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold shadow-lg">
                    Mobile View
                  </span>
                </div>
              </div>

              {/* Smartphone Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-1 bg-white/40 rounded-full z-40" />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
