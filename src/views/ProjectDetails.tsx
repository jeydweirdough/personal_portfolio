'use client'

import { useEffect, useState } from 'react'
import { EmptyState } from '../components/ui/EmptyState'
import { Bolts, Mark, CircuitReadout } from '../components/ui/Plate'
import { checkedAtLabel, type CircuitState, type Reading } from '../lib/useSystemStatus'
import { projects as projectsData } from '../data'

const projects = projectsData as any[]

interface ProjectDetailsProps {
  projectId: string
  onBack: () => void
  onLoading?: (isLoading: boolean) => void
  state: CircuitState
  reading: Reading | null
  checkedAt: string | null
}

/** One row of the record sheet. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 border-t border-[var(--plate-rule)] py-4 sm:grid-cols-[9.5rem_1fr] sm:items-baseline">
      <dt className="stencil pt-0.5 text-[var(--plate-ink-dim)]">{label}</dt>
      <dd className="m-0 min-w-0 text-[var(--plate-ink)]">{children}</dd>
    </div>
  )
}

/**
 * A spec value list. Type only — no vendor logos: they are third-party colour
 * marks in a four-colour stencil world, and fetching them at runtime puts a
 * live external dependency on the page that has to persuade.
 */
function TechList({ items }: { items: any[] }) {
  if (!items?.length) return <span className="text-[var(--plate-ink-dim)]">—</span>
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0">
      {items.map((t: any, i: number) => (
        <li key={`${t.name}-${i}`} className="text-[15px]">
          {t.name}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="pl-1.5 text-[var(--plate-ink-dim)]">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

function ProjectDetails({
  projectId,
  onBack,
  onLoading,
  state,
  reading,
  checkedAt,
}: ProjectDetailsProps) {
  const [lightbox, setLightbox] = useState<{ src: string; title?: string } | null>(null)

  const project = projects.find((p: any) => p.id === projectId)
  const index = projects.findIndex((p: any) => p.id === projectId)

  useEffect(() => {
    onLoading?.(false)
  }, [onLoading])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (lightbox) setLightbox(null)
      else onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, onBack])

  if (!project) {
    return (
      <div className="mx-auto max-w-[86rem] px-4 py-24 sm:px-6">
        <EmptyState
          title="Record not found"
          message={`No circuit is filed under ${projectId}.`}
          action={{ label: 'Back to schedule', onClick: onBack }}
        />
      </div>
    )
  }

  const paragraphs: string[] = Array.isArray(project.description)
    ? project.description
    : project.description
      ? [project.description]
      : []

  const repos: { label: string; url: string }[] = Array.isArray(project.repos)
    ? project.repos
    : project.repoUrl
      ? [{ label: 'Repository', url: project.repoUrl }]
      : []

  const docs = (project.documentation || []).filter((d: any) => d?.image)

  return (
    <div className="min-h-screen pb-20">
      {/* Title block — the strip an engineering sheet is identified by. */}
      <header className="sticky top-0 z-10 plate-field">
        <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            onClick={onBack}
            className="stencil inline-flex items-center gap-1.5 text-[var(--plate-ink-dim)] transition-colors hover:text-[var(--plate-ink)]"
          >
            <Mark dir="back" />
            Schedule
          </button>
          <span className="stencil text-[var(--plate-ink-dim)]">
            Record {String(index + 1).padStart(2, '0')} of{' '}
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="border-x border-[var(--plate-rule)] px-4 py-12 sm:px-8 lg:px-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <CircuitReadout
              state={state}
              ms={reading?.ms}
              checkedAt={checkedAtLabel(checkedAt)}
            />
            {project.hosting && (
              <span className="stencil text-[var(--plate-ink-dim)]">
                Hosted on {project.hosting}
              </span>
            )}
          </div>

          <h1 className="plate-display mt-5 mb-8 max-w-[18ch] text-[clamp(2rem,6vw,4.25rem)] uppercase text-[var(--plate-ink)]">
            {project.name}
          </h1>

          {/* Actions first: a live system's whole point is that you can open it. */}
          <div className="mb-12 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--plate-signal)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--plate-signal-ink)] transition-colors hover:bg-[var(--plate-signal-hover)]"
              >
                Open live system
                <Mark dir="external" />
              </a>
            )}
            {repos.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--plate-ink)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--plate-ink)] transition-colors hover:bg-[var(--plate-ink)] hover:text-[var(--plate-ground)]"
              >
                {r.label}
                <Mark dir="external" />
              </a>
            ))}
          </div>

          <dl className="m-0 max-w-5xl">
            {project.org && (
              <Row label="Built for">
                <span className="text-[15px]">
                  {project.org}
                  {project.role && (
                    <span className="text-[var(--plate-ink-dim)]"> · {project.role}</span>
                  )}
                </span>
              </Row>
            )}

            {paragraphs.length > 0 && (
              <Row label="What it is">
                <div className="space-y-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="m-0 max-w-[64ch] text-[15px] leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </Row>
            )}

            {project.features?.length > 0 && (
              <Row label="It does">
                <ul className="m-0 list-none space-y-2 p-0">
                  {project.features.map((f: string) => (
                    <li key={f} className="text-[15px] leading-relaxed">
                      {f}
                    </li>
                  ))}
                </ul>
              </Row>
            )}

            <Row label="Built with">
              <TechList items={project.techStack} />
            </Row>

            {project.database?.length > 0 && (
              <Row label="Data">
                <TechList items={project.database} />
              </Row>
            )}

            <Row label="Host">
              {project.hosting ? (
                <span className="text-[15px]">{project.hosting}</span>
              ) : (
                <span className="text-[var(--plate-ink-dim)]">Not deployed publicly</span>
              )}
            </Row>
          </dl>

          {/* Documentation plates: flat, ruled, captioned. */}
          {docs.length > 0 && (
            <section className="mt-16">
              <h2 className="stencil border-b border-[var(--plate-ink)] pb-2.5 text-[var(--plate-ink)]">
                Documentation · {docs.length} plates
              </h2>
              <ul className="m-0 mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((d: any, i: number) => (
                  <li key={d.key ?? i} className="relative border border-[var(--plate-rule)]">
                    <Bolts />
                    <button
                      type="button"
                      onClick={() => setLightbox({ src: d.image, title: d.title })}
                      className="block w-full text-left"
                    >
                      <img
                        src={d.image}
                        alt={d.title || `${project.name} screen ${i + 1}`}
                        loading="lazy"
                        className="block aspect-[16/10] w-full bg-[var(--plate-ground)] object-cover object-top"
                      />
                      <span className="stencil flex items-baseline justify-between gap-3 border-t border-[var(--plate-rule)] px-3 py-2.5 text-[var(--plate-ink-dim)]">
                        <span className="truncate">{d.title || 'Untitled'}</span>
                        <span className="shrink-0 opacity-60">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title || 'Documentation plate'}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-asphalt-deep/95 p-4 sm:p-10"
        >
          <div className="max-h-full w-full max-w-6xl overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.title || ''}
              className="block w-full border border-[var(--plate-rule)] object-contain"
            />
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <p className="stencil m-0 text-[var(--plate-ink-dim)]">{lightbox.title}</p>
              <button
                onClick={() => setLightbox(null)}
                className="stencil inline-flex items-center gap-1.5 text-[var(--plate-ink-dim)] transition-colors hover:text-[var(--plate-ink)]"
              >
                Close
                <Mark dir="close" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails
