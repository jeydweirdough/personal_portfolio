'use client'

import { useEffect } from 'react'
import { projects as projectsData } from '../data'
import { EmptyState } from '../components/ui/EmptyState'

const projects = projectsData as any[]

interface ProjectsProps {
  selectedProjectId?: string | null
  onProjectClick: (projectId: string) => void
  onLoading?: (isLoading: boolean) => void
}

export default function Projects({ onProjectClick, onLoading }: ProjectsProps) {
  const loading = false

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

  const activeProjects = projects?.filter(p => p.status === 'Active') || []
  const archivedProjects = projects?.filter(p => p.status !== 'Active') || []

  return (
    <div className="w-full font-sans space-y-8">
      {/* ── SINGLE FLEX ROW: TITLE ON LEFT, CHIPS FLOWING BESIDE IT ── */}
      {activeProjects.length > 0 ? (
        <div className="w-full flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-3.5">
          
          {/* Portfolio Projects Title */}
          <div className="shrink-0 pr-3 sm:pr-5">
            <span className="text-[11px] font-bold text-accent-orange uppercase tracking-[0.3em] block mb-0.5">Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-light-primary dark:text-text-dark-primary tracking-tighter uppercase leading-none">Projects</h2>
          </div>

          {/* Project Chips directly beside Title */}
          {activeProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectClick(project.id)}
              className="w-auto inline-flex items-center gap-2.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-border-light dark:border-border-dark text-xs sm:text-sm font-bold text-text-light-primary dark:text-text-dark-primary shadow-2xs hover:border-accent-orange hover:text-accent-orange hover:bg-accent-orange/5 dark:hover:bg-accent-orange/10 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer select-none group"
            >
              <span className="truncate">{project.name}</span>
              <span className="w-4.5 h-4.5 rounded-md bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark grid place-items-center text-text-light-secondary dark:text-text-dark-secondary group-hover:border-accent-orange group-hover:text-accent-orange transition-all shrink-0">
                <svg className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Active Projects"
          message="Your active project registry is currently empty."
        />
      )}

      {/* ── ARCHIVED PROJECT CHIPS ── */}
      {archivedProjects.length > 0 && (
        <div className="w-full pt-5 border-t border-border-light dark:border-border-dark flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] font-bold text-accent-orange uppercase tracking-[0.25em] opacity-70 pr-2">
            Archive:
          </span>
          {archivedProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectClick(project.id)}
              className="w-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-border-light/60 dark:border-border-dark/60 text-xs font-semibold text-text-light-secondary dark:text-text-dark-secondary opacity-75 hover:opacity-100 hover:border-accent-orange hover:text-accent-orange transition-all cursor-pointer"
            >
              <span>{project.name}</span>
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
