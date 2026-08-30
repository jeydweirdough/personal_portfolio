'use client'

import { journey } from '../data'
import { EmptyState } from '../components/ui/EmptyState'

type MilestoneType = 'education' | 'work' | 'project' | 'milestone'

const TYPE_META: Record<MilestoneType, { label: string; icon: React.ReactNode }> = {
  education: {
    label: 'Education',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.42a12.08 12.08 0 01.67 6.48A11.95 11.95 0 0012 20.05a11.95 11.95 0 00-6.83-3 12.08 12.08 0 01.67-6.47L12 14z" />
      </svg>
    ),
  },
  work: {
    label: 'Work',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.93 23.93 0 0112 15c-3.18 0-6.22-.62-9-1.745M16 6V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  project: {
    label: 'Projects',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  milestone: {
    label: 'Milestone',
    icon: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.29 6.29L22 12l-6.71 2.71L13 21l-2.29-6.29L4 12l6.71-2.71L13 3z" />
      </svg>
    ),
  },
}

function JourneyPage() {
  if (!journey || journey.length === 0) {
    return <EmptyState title="No milestones yet" message="Journey entries have not been added." />
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Section header */}
      <div className="mb-10 sm:mb-12">
        <p className="text-[10px] font-bold text-accent-orange uppercase tracking-[0.2em] mb-1.5 opacity-70">
          The road so far
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight uppercase mb-2">
          My Journey
        </h2>
        <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed max-w-xl opacity-80">
          From first year of Computer Science to graduating and looking for what&apos;s next &mdash;
          the steps that actually shaped how I work.
        </p>
      </div>

      {/* Timeline */}
      <ol className="relative">
        {/* The spine */}
        <div
          className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-orange/40 via-border-light dark:via-border-dark to-transparent"
          aria-hidden="true"
        />

        {journey.map((item, i) => {
          const meta = TYPE_META[(item.type as MilestoneType)] ?? TYPE_META.milestone
          const isLast = i === journey.length - 1

          return (
            <li key={item.id} className={`relative flex gap-4 sm:gap-6 ${isLast ? '' : 'pb-8 sm:pb-10'}`}>
              {/* Node */}
              <div className="relative z-10 shrink-0">
                <div
                  className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl border flex items-center justify-center p-1.5 sm:p-2 shadow-sm transition-colors ${
                    item.current
                      ? 'bg-accent-orange border-accent-orange text-white'
                      : 'bg-white dark:bg-bg-dark-soft border-border-light dark:border-border-dark text-accent-orange'
                  }`}
                >
                  {meta.icon}
                </div>
                {item.current && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-bg-dark" />
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-1">
                  <span className="text-[10px] font-bold text-accent-orange uppercase tracking-[0.15em]">
                    {item.period}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-text-light-secondary dark:text-text-dark-secondary opacity-60">
                    {meta.label}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-text-light-primary dark:text-text-dark-primary leading-snug">
                  {item.title}
                </h3>

                {item.org && (
                  <p className="text-[11px] font-bold text-text-light-secondary dark:text-text-dark-secondary opacity-60 mt-0.5">
                    {item.org}
                  </p>
                )}

                {item.description && (
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mt-2 max-w-2xl">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default JourneyPage
