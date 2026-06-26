import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import projectsData from '../data/projects.json'
const projects = projectsData as any[]

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
  onLoading?: (isLoading: boolean) => void
}

function ProjectDetails({ projectId, onBack, onLoading }: ProjectDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const project = projects.find((p: any) => p._id === projectId)
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
                  project.framework,
                  project.database
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
              {[
                { label: 'Status', value: project.status, color: project.status === 'Active' ? 'text-emerald-500' : 'text-slate-400' },
                { label: 'Provider', value: project.provider },
                { label: 'Framework', value: Array.isArray(project.framework) ? project.framework.join(', ') : project.framework },
                { label: 'Database', value: Array.isArray(project.database) ? project.database.join(', ') : project.database }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-text-light-secondary uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-sm font-semibold ${stat.color || 'text-text-light-primary dark:text-text-dark-primary'}`}>{stat.value}</p>
                </div>
              ))}
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
                
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full" icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>}>
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
