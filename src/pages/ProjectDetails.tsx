import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import { projects as projectsData } from '../data'
const projects = projectsData as any[]

function TechIcon({ name }: { name: string }) {
  const [hasError, setHasError] = useState(false)
  const slug = name.toLowerCase().replace(/\s+/g, '-')

  if (hasError || !name) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-accent-orange/5 text-accent-orange text-[8px] font-bold tracking-tighter uppercase rounded-md border border-accent-orange/15 select-none" title={name}>
        {name.slice(0, 2)}
      </div>
    )
  }

  return (
    <img
      src={`https://thesvg.org/icons/${slug}/default.svg`}
      alt={name}
      className="w-full h-full object-contain"
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement
        if (target.src.includes('thesvg.org')) {
          target.src = `https://cdn.svgl.app/library/${slug}.svg`
        } else {
          setHasError(true)
        }
      }}
    />
  )
}

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
  onLoading?: (isLoading: boolean) => void
}

function ProjectDetails({ projectId, onBack, onLoading }: ProjectDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const project = projects.find((p: any) => p.id === projectId)
  const loading = false

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

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
    <div className="px-6 py-12 sm:px-10 lg:px-12 animate-fade-in relative">
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

      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-8" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>}>
          Back to Projects
        </Button>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {(() => {
                const techStack = [
                  ...(project.technologies || []),
                  ...(project.techStack || []),
                  ...(project.database || [])
                ].filter(Boolean);

                return techStack.map((tech: string, i: number) => (
                  <Badge key={i} variant="accent">{tech}</Badge>
                ));
              })()}
              <span className="h-4 w-px bg-border-light dark:bg-border-dark mx-2" />
              <span className="text-xs font-bold text-text-light-secondary uppercase tracking-widest">{project.region}</span>
            </div>
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary sm:text-5xl mb-6">
              {project.name}
            </h1>
            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-10 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
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
                      <TechIcon name={project.hosting} />
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
                    {project.techStack.map((tech: string) => (
                      <div key={tech} className="group relative">
                        <div className="h-7 w-7 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center hover:border-accent-orange transition-colors cursor-help">
                          <TechIcon name={tech} />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                          {tech}
                        </div>
                      </div>
                    ))}
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
                    {project.database.map((db: string) => (
                      <div key={db} className="group relative">
                        <div className="h-7 w-7 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center hover:border-accent-orange transition-colors cursor-help">
                          <TechIcon name={db} />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-bg-dark text-white text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md">
                          {db}
                        </div>
                      </div>
                    ))}
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
  )
}

export default ProjectDetails
