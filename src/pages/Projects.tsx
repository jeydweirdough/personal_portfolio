import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import projects from '../data/projects.json'

interface ProjectsProps {
  onProjectClick: (projectId: number) => void
}

function Projects({ onProjectClick }: ProjectsProps) {
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = () => {
    setIsCreating(true)
    setTimeout(() => setIsCreating(false), 1500)
  }

  return (
    <div className="flex flex-col animate-fade-in scroll-smooth">
      <section id="active-projects" className="px-6 py-8 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Active Projects</h2>
          <Button 
            variant="primary" 
            size="sm" 
            isLoading={isCreating}
            onClick={handleCreate}
            icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
          >
            {isCreating ? 'Creating...' : 'New project'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <Card key={project.id} hoverable className="p-6 group cursor-pointer" onClick={() => onProjectClick(project.id)}>
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
      </section>

      <section id="archived" className="px-6 py-20 sm:px-10 lg:px-12 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark mt-20">
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Archived</h2>
          <p className="text-sm text-text-light-secondary mt-1">Projects that are no longer actively maintained.</p>
          <div className="mt-8 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-bg-dark p-12 text-center">
             <p className="text-sm text-text-light-secondary italic">No archived projects found.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
