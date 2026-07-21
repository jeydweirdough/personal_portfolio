import { useState, useEffect } from 'react'

interface TechIconProps {
  name: string
  link_svg?: string
  className?: string
}

export function TechIcon({ name, link_svg, className = "w-full h-full object-contain" }: TechIconProps) {
  const [isDark, setIsDark] = useState(() => {
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  })
  const [fallbackStage, setFallbackStage] = useState<'primary' | 'default' | 'svgl' | 'error'>('primary')

  useEffect(() => {
    if (typeof document === 'undefined') return

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      setIsDark(dark)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Reset fallback stage whenever theme mode, name, or link_svg changes
  useEffect(() => {
    setFallbackStage('primary')
  }, [isDark, name, link_svg])

  const slug = name ? name.toLowerCase().trim().replace(/\s+/g, '-') : ''
  const folder = link_svg ? link_svg.split('/')[0].trim() : slug

  if (fallbackStage === 'error' || (!name && !link_svg)) {
    return (
      <div 
        className="h-full w-full flex items-center justify-center bg-accent-orange/5 text-accent-orange text-[8px] font-bold tracking-tighter uppercase rounded-md border border-accent-orange/15 select-none" 
        title={name}
      >
        {(name || '').slice(0, 2)}
      </div>
    )
  }

  let src = ''
  if (fallbackStage === 'primary') {
    const modeVariant = isDark ? 'dark' : 'light'
    src = `https://thesvg.org/icons/${folder}/${modeVariant}.svg`
  } else if (fallbackStage === 'default') {
    src = `https://thesvg.org/icons/${folder}/default.svg`
  } else if (fallbackStage === 'svgl') {
    src = `https://cdn.svgl.app/library/${folder}.svg`
  }

  const handleError = () => {
    if (fallbackStage === 'primary') {
      setFallbackStage('default')
    } else if (fallbackStage === 'default') {
      setFallbackStage('svgl')
    } else if (fallbackStage === 'svgl') {
      setFallbackStage('error')
    }
  }

  return (
    <img
      key={`${src}-${isDark}`}
      src={src}
      alt={name}
      className={className}
      onError={handleError}
    />
  )
}
