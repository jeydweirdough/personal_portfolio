import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { TechIcon } from '../components/ui/TechIcon'
import { projects as projectsData } from '../data'
import { EmptyState } from '../components/ui/EmptyState'
import { useEffect } from 'react'

const projects = projectsData as any[]

interface ProjectsProps {
  selectedProjectId?: string | null
  onProjectClick: (projectId: string) => void
  onLoading?: (isLoading: boolean) => void
}

function Projects({ selectedProjectId, onProjectClick, onLoading }: ProjectsProps) {
  const loading = false

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])


  // Centralized loading is handled in App.tsx

  const activeProjects = projects?.filter(p => p.status === 'Active') || []
  const archivedProjects = projects?.filter(p => p.status !== 'Active') || []

  return (
    <div className="flex flex-col animate-fade-in scroll-smooth">
      <section id="active-projects" className="px-4 py-8 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Active Projects</h2>
        </div>

        {activeProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {activeProjects.map((project) => {
              const isSelected = project.id === selectedProjectId
              const coverImage = project.documentation?.[0]?.image

              return (
                <Card 
                  key={project.id} 
                  hoverable 
                  className={`relative overflow-hidden p-6 group cursor-pointer transition-all duration-300 border ${
                    isSelected 
                      ? 'border-accent-orange ring-2 ring-accent-orange/20 shadow-md shadow-accent-orange/10 scale-[1.01]' 
                      : 'border-border-light dark:border-border-dark'
                  }`} 
                  onClick={() => onProjectClick(project.id)}
                >
                  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {coverImage && (
                      <>
                        {/* Image cover and overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-bg-dark dark:via-bg-dark/90 dark:to-transparent z-10" />
                        <img 
                          src={coverImage} 
                          alt={project.name} 
                          className="w-full h-full object-cover object-right opacity-0 group-hover:opacity-60 transition-opacity duration-[800ms] ease-out" 
                        />
                      </>
                    )}

                    {/* Gloss Shimmer Shine Beam */}
                    <div className="absolute inset-y-0 -left-[100%] w-full bg-[linear-gradient(90deg,transparent_0%,rgba(15,23,42,0.03)_35%,rgba(15,23,42,0.15)_50%,rgba(15,23,42,0.03)_65%,transparent_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_35%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.05)_65%,transparent_100%)] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-[1000ms] ease-out z-20" />
                  </div>
                  <div className="relative z-20">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary group-hover:text-accent-orange transition-colors">{project.name}</h3>
                          {isSelected && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-accent-orange text-white uppercase tracking-wider animate-pulse">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">{project.hosting}</p>
                      </div>
                      <button className="text-text-light-secondary opacity-30 hover:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M6 7.5v10.5A1.5 1.5 0 007.5 19.5h10.5A1.5 1.5 0 0019.5 18V13.5"
                          />
                        </svg>
                      </button>
                    </div>
                  <div className="mt-8 flex flex-wrap items-center gap-1.5">
                    {(() => {
                      const techStack = [
                        ...(project.technologies || []),
                        ...(project.techStack || []),
                        ...(project.database || [])
                      ].filter((t: any) => t && (typeof t === 'string' ? t.trim() !== '' : t.name?.trim() !== ''));

                      const MAX_VISIBLE = 3
                      const visibleTech = techStack.slice(0, MAX_VISIBLE)
                      const hiddenTech = techStack.slice(MAX_VISIBLE)
                      const hiddenNames = hiddenTech
                        .map((t: any) => typeof t === 'string' ? t : t.name)
                        .filter(Boolean)
                        .join(', ')

                      return techStack.length > 0 ? (
                        <>
                          {visibleTech.map((tech: any, i: number) => {
                            const name = typeof tech === 'string' ? tech : tech.name
                            const link_svg = typeof tech === 'string' ? undefined : tech.link_svg
                            return (
                              <div key={name || i} className="group/tech relative">
                                <div className="h-6 w-6 p-1 rounded-md bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center hover:border-accent-orange transition-colors">
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
                              <div className="h-6 px-1.5 rounded-md bg-slate-100 dark:bg-white/10 border border-border-light dark:border-border-dark flex items-center justify-center text-[9px] font-bold text-text-light-secondary dark:text-text-dark-secondary hover:border-accent-orange transition-colors cursor-help">
                                +{hiddenTech.length}
                              </div>
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                                {hiddenNames}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <Badge variant="outline" className="text-[10px] py-0 opacity-40 italic">System Default</Badge>
                      );
                    })()}
                  <div className={`h-1.5 w-1.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'} ml-1`}></div>
                  <span className="text-[10px] text-text-light-secondary font-bold uppercase tracking-tighter">{project.status}</span>
                </div>
                </div>
              </Card>
            )})}
          </div>
        ) : (
          <EmptyState 
            title="No Active Projects" 
            message="Your active project registry is currently empty. Initialize a new project to start tracking."
          />
        )}
      </section>

      {archivedProjects.length > 0 && (
        <section id="archived" className="px-4 py-16 sm:py-20 sm:px-10 lg:px-12 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark mt-12 sm:mt-20">
          <div className="max-w-4xl">
            <h2 className="text-lg sm:text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Archived</h2>
            <p className="text-sm text-text-light-secondary mt-1">Projects that are no longer actively maintained.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {archivedProjects.map((project) => (
                <Card key={project.id} className="p-4 opacity-60">
                  <h3 className="text-sm font-bold">{project.name}</h3>
                  <p className="text-[10px] text-text-light-secondary">
                    {project.status} • {project.technologies?.join(', ') || 'General'}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Projects


