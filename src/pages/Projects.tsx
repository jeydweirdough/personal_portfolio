import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useSanityData } from '../hooks/useSanity'
import { EmptyState } from '../components/ui/EmptyState'
import { ProjectSkeleton, Skeleton } from '../components/ui/Skeleton'
import { useEffect } from 'react'

interface ProjectsProps {
  onProjectClick: (projectId: string) => void
  onLoading?: (isLoading: boolean) => void
}

function Projects({ onProjectClick, onLoading }: ProjectsProps) {
  const { data: projects, loading } = useSanityData<any[]>(`*[_type == "project"]`)

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

  if (loading) {
    return (
      <div className="p-8 md:p-12 space-y-12">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      </div>
    )
  }


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
            {activeProjects.map((project) => (
              <Card key={project._id} hoverable className="p-6 group cursor-pointer" onClick={() => onProjectClick(project._id)}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary group-hover:text-accent-orange transition-colors">{project.name}</h3>
                    <p className="mt-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">{project.provider} | {project.region}</p>
                  </div>
                  <button className="text-text-light-secondary opacity-30 hover:opacity-100"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <Badge>{project.tag}</Badge>
                  <div className={`h-1.5 w-1.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  <span className="text-[10px] text-text-light-secondary">{project.status}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No Active Projects" 
            message="Your active project registry is currently empty. Initialize a new project to start tracking."
          />
        )}
      </section>

      <section id="archived" className="px-4 py-16 sm:py-20 sm:px-10 lg:px-12 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark mt-12 sm:mt-20">
        <div className="max-w-4xl">
          <h2 className="text-lg sm:text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Archived</h2>
          <p className="text-sm text-text-light-secondary mt-1">Projects that are no longer actively maintained.</p>
          
          {archivedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
               {/* Simplified cards for archived */}
               {archivedProjects.map((project) => (
                 <Card key={project._id} className="p-4 opacity-60">
                    <h3 className="text-sm font-bold">{project.name}</h3>
                    <p className="text-[10px] text-text-light-secondary">{project.status} • {project.tag}</p>
                 </Card>
               ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState 
                title="Archive Empty" 
                message="No archived projects found in the database."
                icon={<svg className="w-10 h-10 text-text-light-secondary opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth={1.5}/></svg>}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projects


