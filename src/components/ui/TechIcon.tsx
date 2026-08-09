import { useState, useEffect } from 'react'

interface TechIconProps {
  name: string
  link_svg?: string
  className?: string
}

// Canonical mapping for simple-icons CDN slugs
const SLUG_MAP: Record<string, string> = {
  react: 'react',
  reactnative: 'react',
  typescript: 'typescript',
  tailwind: 'tailwindcss',
  tailwindcss: 'tailwindcss',
  python: 'python',
  flask: 'flask',
  html: 'html5',
  html5: 'html5',
  css: 'css3',
  css3: 'css3',
  javascript: 'javascript',
  js: 'javascript',
  javscript: 'javascript',
  nodejs: 'nodedotjs',
  node: 'nodedotjs',
  express: 'express',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  static: 'json',
  json: 'json',
  'static / json': 'json',
  vercel: 'vercel',
  supabase: 'supabase',
  mongodb: 'mongodb',
  figma: 'figma',
  github: 'github',
  firebase: 'firebase',
}

export function TechIcon({ name, link_svg, className = "w-full h-full object-contain" }: TechIconProps) {
  const [isDark, setIsDark] = useState(() => {
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  })
  const [fallbackStage, setFallbackStage] = useState<'simpleicons' | 'svgl' | 'thesvg' | 'error'>('simpleicons')

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

  useEffect(() => {
    setFallbackStage('simpleicons')
  }, [isDark, name, link_svg])

  const cleanName = name ? name.toLowerCase().trim().replace(/[^a-z0-9]/g, '') : ''
  const canonicalSlug = SLUG_MAP[cleanName] || (link_svg ? link_svg.split('/')[0].trim() : cleanName)

  if (fallbackStage === 'error' || (!name && !link_svg)) {
    return (
      <div 
        className="h-full w-full flex items-center justify-center bg-accent-orange/10 text-accent-orange text-[8px] font-extrabold tracking-tighter uppercase rounded select-none" 
        title={name}
      >
        {(name || '').slice(0, 2)}
      </div>
    )
  }

  let src = ''
  if (fallbackStage === 'simpleicons') {
    src = `https://cdn.simpleicons.org/${canonicalSlug}`
  } else if (fallbackStage === 'svgl') {
    src = `https://cdn.svgl.app/library/${canonicalSlug}.svg`
  } else if (fallbackStage === 'thesvg') {
    const folder = link_svg ? link_svg.split('/')[0].trim() : canonicalSlug
    const modeVariant = isDark ? 'dark' : 'light'
    src = `https://thesvg.org/icons/${folder}/${modeVariant}.svg`
  }

  const handleError = () => {
    if (fallbackStage === 'simpleicons') {
      setFallbackStage('svgl')
    } else if (fallbackStage === 'svgl') {
      setFallbackStage('thesvg')
    } else if (fallbackStage === 'thesvg') {
      setFallbackStage('error')
    }
  }

  return (
    <img
      key={`${src}-${isDark}`}
      src={src}
      alt={name || 'tech icon'}
      className={className}
      onError={handleError}
    />
  )
}
