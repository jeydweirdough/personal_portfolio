import { useState, useEffect, useRef, useMemo } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { TechIcon } from '../components/ui/TechIcon'
import { Markdown } from '../components/ui/Markdown'
import { projects as projectsData } from '../data'
const projects = projectsData as any[]

// Seeded pseudo-random generator for stable, unique layouts per project
function getSeededRandom(seed: string, index: number) {
  let hash = 0
  const str = seed + ':' + index
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const x = Math.sin(hash) * 10000
  return x - Math.floor(x)
}

function generateShapePositions(projectId: string, count: number) {
  const positions = []
  for (let i = 0; i < count; i++) {
    const r1 = getSeededRandom(projectId, i * 13 + 1)
    const r2 = getSeededRandom(projectId, i * 17 + 2)
    const r3 = getSeededRandom(projectId, i * 19 + 3)
    const r4 = getSeededRandom(projectId, i * 23 + 4)

    const topVal = Math.round((i / count) * 88 + r1 * 8 + 2)
    const isLeft = i % 2 === 0
    const offsetVal = Math.round(-4 + r2 * 26)

    const delay = (r3 * 2.2).toFixed(1) + 's'
    const dur = (4.5 + r4 * 2.5).toFixed(1) + 's'

    const style: React.CSSProperties = {
      top: `${topVal}%`,
      ...(isLeft ? { left: `${offsetVal}%` } : { right: `${offsetVal}%` }),
    }

    positions.push({ style, delay, dur })
  }
  return positions
}

function generateTechPositions(projectId: string, count: number) {
  const positions = []
  for (let i = 0; i < count; i++) {
    const r1 = getSeededRandom(projectId, i * 29 + 5)
    const r2 = getSeededRandom(projectId, i * 31 + 6)
    const r3 = getSeededRandom(projectId, i * 37 + 7)
    const r4 = getSeededRandom(projectId, i * 41 + 8)

    const topVal = Math.round((i / Math.max(count, 1)) * 82 + r1 * 10 + 4)
    const isLeft = i % 2 === 0
    const offsetVal = Math.round(-6 + r2 * 18)

    const delay = (r3 * 1.8).toFixed(1) + 's'
    const dur = (3.8 + r4 * 2.2).toFixed(1) + 's'

    const style: React.CSSProperties = {
      top: `${topVal}%`,
      ...(isLeft ? { left: `${offsetVal}%` } : { right: `${offsetVal}%` }),
    }

    positions.push({ style, delay, dur })
  }
  return positions
}

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
  onLoading?: (isLoading: boolean) => void
}

interface FloatingElementProps {
  children: React.ReactNode
  style: React.CSSProperties
  delay?: string
  duration?: string
  mousePosRef: React.RefObject<{ x: number; y: number }>
  containerRef: React.RefObject<HTMLDivElement | null>
}

function InteractiveFloatingElement({
  children,
  style,
  delay = '0s',
  duration = '4s',
  mousePosRef,
  containerRef,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number
    const currentOffset = { x: 0, y: 0 }

    const updatePhysics = () => {
      if (!ref.current || !containerRef.current) {
        animationFrameId = requestAnimationFrame(updatePhysics)
        return
      }

      const element = ref.current
      const rect = element.getBoundingClientRect()
      const parentRect = containerRef.current.getBoundingClientRect()

      const iconX = rect.left - parentRect.left + rect.width / 2
      const iconY = rect.top - parentRect.top + rect.height / 2

      const mouse = mousePosRef.current || { x: -1000, y: -1000 }

      let targetX = 0
      let targetY = 0

      if (mouse.x !== -1000) {
        const dx = iconX - mouse.x
        const dy = iconY - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const avoidanceRadius = 200
        const maxPush = 50

        if (distance < avoidanceRadius) {
          const force = (avoidanceRadius - distance) / avoidanceRadius
          targetX = (dx / (distance || 1)) * force * maxPush
          targetY = (dy / (distance || 1)) * force * maxPush
        }
      }

      currentOffset.x += (targetX - currentOffset.x) * 0.08
      currentOffset.y += (targetY - currentOffset.y) * 0.08

      element.style.transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`
      animationFrameId = requestAnimationFrame(updatePhysics)
    }

    animationFrameId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animationFrameId)
  }, [containerRef, mousePosRef])

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none select-none z-0 hidden lg:block"
      style={{
        ...style,
        willChange: 'transform',
      }}
    >
      <div
        className="animate-float"
        style={{ animationDelay: delay, animationDuration: duration }}
      >
        {children}
      </div>
    </div>
  )
}

function ProjectDetails({ projectId, onBack, onLoading }: ProjectDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 })

  const project = projects.find((p: any) => p.id === projectId)
  const loading = false

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mousePosRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Extract list of tech items for background floating elements
  const floatingTechList = useMemo(() => {
    if (!project) return []
    const list: { name: string; link_svg?: string }[] = []
    const add = (item: any) => {
      if (!item) return
      const name = typeof item === 'string' ? item : item.name
      const link_svg = typeof item === 'string' ? undefined : item.link_svg
      if (name && !list.some(i => i.name.toLowerCase() === name.toLowerCase())) {
        list.push({ name, link_svg })
      }
    }

    ;(project.techStack || []).forEach(add)
    ;(project.database || []).forEach(add)
    if (project.hosting) add({ name: project.hosting, link_svg: project.hosting_link_svg })
    ;(project.technologies || []).forEach(add)
    return list
  }, [project])

  // Pseudo-randomized irregular positions close to center container
  const shapePositions = useMemo(() => generateShapePositions(projectId || 'default', 10), [projectId])
  const techPositions = useMemo(() => generateTechPositions(projectId || 'default', floatingTechList.length), [projectId, floatingTechList.length])

  if (!project) {
    return (
      <EmptyState 
        title="Project Offline" 
        message={`The data stream for project ${projectId} could not be established.`}
        action={{ label: "Return to Projects", onClick: onBack }}
      />
    )
  }

  return (
    <div ref={containerRef} className="px-6 py-12 sm:px-10 lg:px-12 animate-fade-in relative min-h-screen">
      {/* Centered Main Container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Background Ambient Glows - Centered */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-accent-orange/15 via-orange-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Floating Irregular Shapes - 100% Lightweight CSS/SVG (0 Network Load Overhead) */}
        {/* Shape 1: Liquid Morph Blob */}
        {shapePositions[0] && (
          <InteractiveFloatingElement style={shapePositions[0].style} delay={shapePositions[0].delay} duration={shapePositions[0].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-tr from-accent-orange/25 via-orange-400/15 to-amber-300/10 border border-accent-orange/30 backdrop-blur-md shadow-2xl opacity-50 dark:opacity-30" />
          </InteractiveFloatingElement>
        )}

        {/* Shape 2: Glass Drop Blob */}
        {shapePositions[1] && (
          <InteractiveFloatingElement style={shapePositions[1].style} delay={shapePositions[1].delay} duration={shapePositions[1].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[70%_30%_50%_50%/50%_60%_40%_50%] bg-gradient-to-br from-sky-400/20 via-indigo-500/10 to-transparent border border-sky-400/25 backdrop-blur-md shadow-xl opacity-45 dark:opacity-25" />
          </InteractiveFloatingElement>
        )}

        {/* Shape 3: Tilted Rhombus with Spinning Orbit Ring */}
        {shapePositions[2] && (
          <InteractiveFloatingElement style={shapePositions[2].style} delay={shapePositions[2].delay} duration={shapePositions[2].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rotate-12 rounded-3xl bg-white/60 dark:bg-white/5 border border-border-light dark:border-border-dark shadow-2xl backdrop-blur-lg flex items-center justify-center opacity-60 dark:opacity-30">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-accent-orange/50 animate-spin-slow" />
            </div>
          </InteractiveFloatingElement>
        )}

        {/* Shape 4: Pill Capsule Blob */}
        {shapePositions[3] && (
          <InteractiveFloatingElement style={shapePositions[3].style} delay={shapePositions[3].delay} duration={shapePositions[3].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-32 h-20 rounded-[50px] bg-gradient-to-r from-orange-500/15 via-rose-500/10 to-transparent border border-orange-500/20 backdrop-blur-md opacity-45 dark:opacity-25 rotate-[-15deg] shadow-lg" />
          </InteractiveFloatingElement>
        )}

        {/* Shape 5: Geometric Orbit SVG Ring */}
        {shapePositions[4] && (
          <InteractiveFloatingElement style={shapePositions[4].style} delay={shapePositions[4].delay} duration={shapePositions[4].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-24 h-24 opacity-35 dark:opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent-orange fill-none stroke-current stroke-[2.5]">
                <path d="M 20,50 Q 50,10 80,50 T 20,50" className="opacity-70" />
                <circle cx="50" cy="50" r="32" strokeDasharray="5 5" />
              </svg>
            </div>
          </InteractiveFloatingElement>
        )}

        {/* Shape 6: Glass Diamond Crystal */}
        {shapePositions[5] && (
          <InteractiveFloatingElement style={shapePositions[5].style} delay={shapePositions[5].delay} duration={shapePositions[5].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-14 h-14 sm:w-18 sm:h-18 rotate-45 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent border border-emerald-500/25 backdrop-blur-md shadow-lg opacity-45 dark:opacity-25" />
          </InteractiveFloatingElement>
        )}

        {/* Shape 7: Asymmetrical Tear Blob */}
        {shapePositions[6] && (
          <InteractiveFloatingElement style={shapePositions[6].style} delay={shapePositions[6].delay} duration={shapePositions[6].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent border border-purple-400/25 backdrop-blur-md opacity-45 dark:opacity-25 rotate-45 shadow-xl" />
          </InteractiveFloatingElement>
        )}

        {/* Shape 8: Abstract Spark Starburst SVG */}
        {shapePositions[7] && (
          <InteractiveFloatingElement style={shapePositions[7].style} delay={shapePositions[7].delay} duration={shapePositions[7].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-20 h-20 opacity-30 dark:opacity-15">
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent-orange fill-none stroke-current stroke-2">
                <path d="M50,10 L50,90 M10,50 L90,50 M25,25 L75,75 M25,75 L75,25" strokeDasharray="6 6" />
                <circle cx="50" cy="50" r="16" className="fill-accent-orange/10" />
              </svg>
            </div>
          </InteractiveFloatingElement>
        )}

        {/* Shape 9: Layered Glass Concentric Disk */}
        {shapePositions[8] && (
          <InteractiveFloatingElement style={shapePositions[8].style} delay={shapePositions[8].delay} duration={shapePositions[8].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-20 h-20 rounded-full border border-accent-orange/30 bg-accent-orange/10 backdrop-blur-sm flex items-center justify-center opacity-40 dark:opacity-20 shadow-xl">
              <div className="w-10 h-10 rounded-full border border-orange-400/40 bg-orange-400/20" />
            </div>
          </InteractiveFloatingElement>
        )}

        {/* Shape 10: Curved Crescent Wave Path SVG */}
        {shapePositions[9] && (
          <InteractiveFloatingElement style={shapePositions[9].style} delay={shapePositions[9].delay} duration={shapePositions[9].dur} mousePosRef={mousePosRef} containerRef={containerRef}>
            <div className="w-24 h-24 opacity-35 dark:opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-sky-400 fill-none stroke-current stroke-[2]">
                <path d="M 10,30 C 40,80 60,20 90,70" />
                <circle cx="90" cy="70" r="4" className="fill-sky-400" />
              </svg>
            </div>
          </InteractiveFloatingElement>
        )}

        {/* Floating Tech Stack Icons - Centered relative to content */}
        {floatingTechList.slice(0, 6).map((tech, idx) => {
          const pos = techPositions[idx % techPositions.length]
          if (!pos) return null
          return (
            <InteractiveFloatingElement key={tech.name} style={pos.style} delay={pos.delay} duration={pos.dur} mousePosRef={mousePosRef} containerRef={containerRef}>
              <div className="h-12 w-12 sm:h-14 sm:w-14 p-3 rounded-2xl bg-white/80 dark:bg-bg-dark-soft/80 border border-border-light dark:border-border-dark shadow-xl backdrop-blur-md hover:scale-110 transition-transform duration-300 opacity-70 hover:opacity-100 dark:opacity-50 dark:hover:opacity-95 cursor-pointer">
                <TechIcon name={tech.name} link_svg={tech.link_svg} />
              </div>
            </InteractiveFloatingElement>
          )
        })}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-6xl w-full max-h-[90vh] flex flex-col gap-4">
               <div className="flex justify-end">
                  <button className="text-white hover:text-accent-orange transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
               </div>
               <img src={selectedImage} alt="Project Documentation" className="w-full h-full object-contain rounded-lg shadow-2xl" />
            </div>
          </div>
        )}

        <div className="relative z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-8" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>}>
          Back to Projects
        </Button>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary sm:text-5xl mb-6 tracking-tight">
              {project.name}
            </h1>
            <Markdown 
              content={project.description} 
              className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-10 leading-relaxed" 
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 p-6 rounded-2xl bg-white/50 dark:bg-bg-dark-soft/40 border border-border-light/80 dark:border-border-dark/80 backdrop-blur-md shadow-sm">
              {/* Status */}
              <div>
                <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">Status</p>
                <p className={`text-sm font-semibold mt-2.5 ${project.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {project.status}
                </p>
              </div>

              {/* Hosting */}
              <div>
                <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">Hosting</p>
                {project.hosting ? (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-7 w-7 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center">
                      <TechIcon name={project.hosting} link_svg={project.hosting_link_svg} />
                    </div>
                    <span className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary">{project.hosting}</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold mt-2.5 text-text-light-primary dark:text-text-dark-primary">-</p>
                )}
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">Tech Stack</p>
                {project.techStack && project.techStack.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {(() => {
                      const MAX_VISIBLE = 3
                      const visibleTech = project.techStack.slice(0, MAX_VISIBLE)
                      const hiddenTech = project.techStack.slice(MAX_VISIBLE)
                      const hiddenNames = hiddenTech
                        .map((t: any) => typeof t === 'string' ? t : t.name)
                        .filter(Boolean)
                        .join(', ')

                      return (
                        <>
                          {visibleTech.map((tech: any, idx: number) => {
                            const name = typeof tech === 'string' ? tech : tech.name
                            const link_svg = typeof tech === 'string' ? undefined : tech.link_svg
                            if (!name) return null
                            return (
                              <div key={name || idx} className="group/tech relative">
                                <div className="h-7 w-7 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center hover:border-accent-orange transition-colors cursor-help">
                                  <TechIcon name={name} link_svg={link_svg} />
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                                  {name}
                                </div>
                              </div>
                            )
                          })}
                          {hiddenTech.length > 0 && (
                            <div className="group/tech relative">
                              <div className="h-7 px-2 rounded-lg bg-slate-100 dark:bg-white/10 border border-border-light dark:border-border-dark flex items-center justify-center text-[10px] font-bold text-text-light-secondary dark:text-text-dark-secondary hover:border-accent-orange transition-colors cursor-help">
                                +{hiddenTech.length}
                              </div>
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                                {hiddenNames}
                              </div>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <p className="text-sm font-semibold mt-2.5 text-text-light-primary dark:text-text-dark-primary">-</p>
                )}
              </div>

              {/* Database */}
              <div>
                <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">Database</p>
                {project.database && project.database.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {(() => {
                      const MAX_VISIBLE = 3
                      const visibleDb = project.database.slice(0, MAX_VISIBLE)
                      const hiddenDb = project.database.slice(MAX_VISIBLE)
                      const hiddenNames = hiddenDb
                        .map((d: any) => typeof d === 'string' ? d : d.name)
                        .filter(Boolean)
                        .join(', ')

                      return (
                        <>
                          {visibleDb.map((db: any, idx: number) => {
                            const name = typeof db === 'string' ? db : db.name
                            const link_svg = typeof db === 'string' ? undefined : db.link_svg
                            if (!name) return null
                            return (
                              <div key={name || idx} className="group/tech relative">
                                <div className="h-7 w-7 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center hover:border-accent-orange transition-colors cursor-help">
                                  <TechIcon name={name} link_svg={link_svg} />
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                                  {name}
                                </div>
                              </div>
                            )
                          })}
                          {hiddenDb.length > 0 && (
                            <div className="group/tech relative">
                              <div className="h-7 px-2 rounded-lg bg-slate-100 dark:bg-white/10 border border-border-light dark:border-border-dark flex items-center justify-center text-[10px] font-bold text-text-light-secondary dark:text-text-dark-secondary hover:border-accent-orange transition-colors cursor-help">
                                +{hiddenDb.length}
                              </div>
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                                {hiddenNames}
                              </div>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <p className="text-sm font-semibold mt-2.5 text-text-light-primary dark:text-text-dark-primary">-</p>
                )}
              </div>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="space-y-6 mb-12">
                 <h3 className="text-xl font-bold">Key Features</h3>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {project.features.map((feature: string, i: number) => (
                     <li key={i} className="flex gap-3 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-orange shrink-0"></div>
                        {feature}
                     </li>
                   ))}
                 </ul>
              </div>
            )}

            {project.documentation && project.documentation.length > 0 && (
              <div className="mb-12">
                 <h3 className="text-xl font-bold mb-6">Photo Documentation</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   {project.documentation.map((doc: any, i: number) => {
                     const imageUrl = doc.image || ''
                     if (!imageUrl) return null
                     return (
                       <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-border-light dark:border-border-dark cursor-zoom-in hover:border-accent-orange/50 transition-all" onClick={() => setSelectedImage(imageUrl)}>
                         <img src={imageUrl} alt={doc.title || 'Documentation image'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         {doc.title && (
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                               <p className="text-[10px] font-bold text-white uppercase tracking-wider">{doc.title}</p>
                           </div>
                         )}
                       </div>
                     )
                   })}
                 </div>
              </div>
            )}
             {project.repos && project.repos.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6">Codebase Branches</h3>
                <div className="relative pl-6 border-l border-border-light dark:border-border-dark space-y-6">
                  {project.repos.map((repo: any, index: number) => {
                    const isLast = index === project.repos.length - 1;
                    return (
                      <div key={index} className="relative flex items-center gap-4">
                        {/* Branch Node Line */}
                        <div className="absolute top-1/2 -left-6 w-6 h-px bg-border-light dark:bg-border-dark" />
                        {isLast && (
                          <div className="absolute top-0 bottom-1/2 -left-6 w-px bg-border-light dark:bg-border-dark" />
                        )}
                        
                        {/* Branch Node Circle */}
                        <div className="w-8 h-8 rounded-full bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center text-accent-orange shrink-0 z-10">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7a3 3 0 100-6 3 3 0 000 6zM8 7v7a4 4 0 00.264 1.435M8 7V1.3M8 14a3 3 0 100 6 3 3 0 000-6zm8-3a3 3 0 100-6 3 3 0 000 6zm0-6V2" />
                          </svg>
                        </div>

                        {/* Repository Link Info */}
                        <div className="flex-1 p-3 rounded-xl bg-slate-50 dark:bg-bg-dark-soft border border-border-light dark:border-border-dark hover:border-accent-orange/50 transition-all">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">Repository</p>
                              <h4 className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary">{repo.label}</h4>
                            </div>
                            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="shrink-0 px-3 py-1.5 bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-[10px] font-bold uppercase tracking-wider rounded-lg text-text-light-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all flex items-center gap-1.5 shadow-sm">
                              Explore
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <Card className="p-6">
              <h4 className="text-xs font-bold text-text-light-secondary uppercase tracking-wider mb-4">Quick Actions</h4>
              <div className="space-y-3">
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="primary" className="w-full" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>}>
                      Open Live Demo
                    </Button>
                  </a>
                ) : (
                  <Button variant="primary" className="w-full opacity-50 cursor-not-allowed" disabled>
                    Demo Unavailable
                  </Button>
                )}
                
                {project.repos && project.repos.length > 0 ? (
                  project.repos.map((repo: { label: string, url: string }, index: number) => (
                    <a key={index} href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7a3 3 0 100-6 3 3 0 000 6zM8 7v7a4 4 0 00.264 1.435M8 7V1.3M8 14a3 3 0 100 6 3 3 0 000-6zm8-3a3 3 0 100-6 3 3 0 000 6zm0-6V2" /></svg>}>
                        {repo.label}
                      </Button>
                    </a>
                  ))
                ) : project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7a3 3 0 100-6 3 3 0 000 6zM8 7v7a4 4 0 00.264 1.435M8 7V1.3M8 14a3 3 0 100 6 3 3 0 000-6zm8-3a3 3 0 100-6 3 3 0 000 6zm0-6V2" /></svg>}>
                      View Repository
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" className="w-full opacity-50 cursor-not-allowed" disabled>
                    Repo Private
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default ProjectDetails
