import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import projectsData from '../data/projects.json'
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
              const isSelected = project._id === selectedProjectId
              const coverImage = project.documentation?.[0]?.image

              return (
                <Card 
                  key={project._id} 
                  hoverable 
                  className={`relative overflow-hidden p-6 group cursor-pointer transition-all duration-300 border ${
                    isSelected 
                      ? 'border-accent-orange ring-2 ring-accent-orange/20 shadow-md shadow-accent-orange/10 scale-[1.01]' 
                      : 'border-border-light dark:border-border-dark'
                  }`} 
                  onClick={() => onProjectClick(project._id)}
                >
                  {coverImage && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-bg-dark dark:via-bg-dark/90 dark:to-transparent z-10" />
                      <img src={coverImage} alt={project.name} className="w-full h-full object-cover object-right opacity-60 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>
                  )}
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
                        <p className="mt-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">{project.provider} | {project.region}</p>
                      </div>
                      <button className="text-text-light-secondary opacity-30 hover:opacity-100"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                    </div>
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                  {(() => {
                    const techStack = [
                      ...(project.technologies || []),
                      ...(project.framework || []),
                      ...(project.database || [])
                    ].filter(Boolean);

                    return techStack.length > 0 ? (
                      techStack.map((tech: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-[10px] py-0 border-accent-orange/20 text-accent-orange/80">{tech}</Badge>
                      ))
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
                <Card key={project._id} className="p-4 opacity-60">
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


