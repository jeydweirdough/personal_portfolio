'use client'

import { useEffect, useState } from 'react'
import { projects as projectsData } from '../data'
import { EmptyState } from '../components/ui/EmptyState'
import { CircuitReadout } from '../components/ui/Plate'
import { checkedAtLabel, type CircuitState, type Reading } from '../lib/useSystemStatus'

const projects = projectsData as any[]

interface ProjectsProps {
  selectedProjectId?: string | null
  onProjectClick: (projectId: string) => void
  onLoading?: (isLoading: boolean) => void
  stateFor: (id: string) => CircuitState
  readingFor: (id: string) => Reading | null
  checkedAt: string | null
}

/**
 * The panel schedule. Every system Jade has built, on numbered circuits, with
 * its real status. Exactly one row is lit at a time and the rest recede — which
 * is what makes reading it feel like reading an instrument.
 *
 * The lit row is driven by state, not by a hover media query: on a phone the
 * row you last opened stays lit when you come back to the schedule, and a touch
 * lights a row before it navigates. Hover is one more way in, not the only one.
 */
export default function Projects({
  selectedProjectId,
  onProjectClick,
  onLoading,
  stateFor,
  readingFor,
  checkedAt,
}: ProjectsProps) {
  const [pointedId, setPointedId] = useState<string | null>(null)

  useEffect(() => {
    onLoading?.(false)
  }, [onLoading])

  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        title="No circuits recorded"
        message="The panel schedule is empty. Project records have not been added yet."
      />
    )
  }

  const rank = (p: any) => (p.kind === 'work' ? 0 : 1) + (p.demoUrl ? 0 : 2)
  const ordered = [...projects].sort((a, b) => rank(a) - rank(b))
  const stamp = checkedAtLabel(checkedAt)

  const litId = pointedId ?? selectedProjectId ?? null

  return (
    <div className="w-full">
      <p className="mb-8 max-w-[62ch] text-[15px] leading-relaxed text-[var(--plate-ink-dim)]">
        Production sites for the business I work for, then my own projects.
        The status column is not a label — this page pings each live URL and
        reports what actually came back.
      </p>

      {/* Column headings — the schedule's own legend. */}
      <div
        aria-hidden="true"
        className="hidden md:grid grid-cols-[3rem_1.4fr_1.3fr_6rem_10rem] gap-x-5 border-b border-[var(--plate-ink)] pb-2.5"
      >
        <span className="stencil text-[var(--plate-ink-dim)]">No.</span>
        <span className="stencil text-[var(--plate-ink-dim)]">System</span>
        <span className="stencil text-[var(--plate-ink-dim)]">Stack</span>
        <span className="stencil text-[var(--plate-ink-dim)]">Host</span>
        <span className="stencil text-[var(--plate-ink-dim)]">Reading</span>
      </div>

      <ol className="m-0 list-none p-0" onMouseLeave={() => setPointedId(null)}>
        {ordered.map((project, i) => {
          const state = stateFor(project.id)
          const reading = readingFor(project.id)
          const stack = (project.techStack ?? []).map((t: any) => t.name).join(' · ')
          const isLit = litId === project.id
          const dimmed = litId !== null && !isLit

          return (
            <li key={project.id} className="border-b border-[var(--plate-rule)]">
              <button
                type="button"
                onClick={() => onProjectClick(project.id)}
                onMouseEnter={() => setPointedId(project.id)}
                onFocus={() => setPointedId(project.id)}
                onBlur={() => setPointedId(null)}
                onTouchStart={() => setPointedId(project.id)}
                aria-current={selectedProjectId === project.id ? 'true' : undefined}
                className={`-mx-2 grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-5 gap-y-1.5 px-2 py-5 text-left transition-[opacity,background-color,color] duration-200 ease-[var(--ease-plate)] md:grid-cols-[3rem_1.4fr_1.3fr_6rem_10rem] ${
                  isLit ? 'plate-field' : ''
                } ${dimmed ? 'opacity-40' : 'opacity-100'}`}
              >
                <span className="stencil self-start pt-1 opacity-60">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0">
                  <span className="block text-lg font-semibold leading-snug sm:text-xl">
                    {project.name}
                  </span>
                  {project.org && (
                    <span className="stencil mt-1.5 block opacity-65">
                      {project.role ? `${project.role} · ` : ''}
                      {project.org}
                    </span>
                  )}
                  <span className="stencil mt-1 block opacity-55 md:hidden">
                    {stack}
                    {project.hosting ? ` · ${project.hosting}` : ''}
                  </span>
                </span>

                <span className="stencil hidden opacity-70 md:block">{stack || '—'}</span>

                <span className="stencil hidden opacity-70 md:block">
                  {project.hosting || '—'}
                </span>

                <CircuitReadout
                  state={state}
                  ms={reading?.ms}
                  checkedAt={stamp}
                  className="col-start-2 mt-2 md:col-start-5 md:mt-0"
                />
              </button>
            </li>
          )
        })}
      </ol>

      <p className="stencil mt-5 text-[var(--plate-ink-dim)]">
        Select a circuit for the full record
        {stamp && <span className="opacity-70"> · panel read at {stamp}</span>}
      </p>
    </div>
  )
}
