'use client'

import { journey } from '../data'
import { EmptyState } from '../components/ui/EmptyState'

type MilestoneType = 'education' | 'work' | 'project' | 'milestone'

const TYPE_LABEL: Record<MilestoneType, string> = {
  education: 'School',
  work: 'Work',
  project: 'Built',
  milestone: 'Marker',
}

/**
 * Station notation. A line diagram marks its stops with geometry, not
 * pictograms — filled for work, open for school, diamond for something built.
 * One stroke weight throughout.
 */
function StationMark({ type, current }: { type: MilestoneType; current?: boolean }) {
  const stroke = current ? 'var(--plate-signal)' : 'currentColor'
  const fill = current ? 'var(--plate-signal)' : 'var(--plate-ground)'

  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      aria-hidden="true"
      style={{ color: 'var(--plate-ink)' }}
    >
      {type === 'project' ? (
        <rect
          x="4"
          y="4"
          width="12"
          height="12"
          transform="rotate(45 10 10)"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.6"
        />
      ) : (
        <rect
          x="3.5"
          y="3.5"
          width="13"
          height="13"
          fill={type === 'work' ? stroke : fill}
          stroke={stroke}
          strokeWidth="1.6"
        />
      )}
    </svg>
  )
}

function JourneyPage() {
  if (!journey || journey.length === 0) {
    return <EmptyState title="No stations recorded" message="Journey entries have not been added." />
  }

  return (
    <div className="w-full">
      <p className="mb-8 max-w-[62ch] text-[15px] leading-relaxed text-[var(--plate-ink-dim)]">
        How the capability was actually built — university, first support role,
        then systems work. Every station is a thing that happened, in order.
      </p>

      {/* Legend — a line diagram that does not explain its notation is decoration. */}
      <div className="mb-10 flex flex-wrap items-center gap-x-7 gap-y-2 border-y border-[var(--plate-rule)] py-3">
        {(['work', 'education', 'project'] as MilestoneType[]).map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <StationMark type={t} />
            <span className="stencil text-[var(--plate-ink-dim)]">{TYPE_LABEL[t]}</span>
          </span>
        ))}
      </div>

      <ol className="relative m-0 max-w-5xl list-none p-0">
        {/* The line itself. */}
        <span
          aria-hidden="true"
          className="absolute left-[9px] top-2 bottom-2 w-px bg-[var(--plate-rule)] sm:left-[calc(8rem+9px)]"
        />

        {journey.map((item: any) => {
          const type = (item.type as MilestoneType) ?? 'milestone'

          return (
            <li
              key={item.id}
              className="relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[7rem_2.5rem_1fr] items-start gap-x-4 pb-10 last:pb-0"
            >
              <span className="stencil hidden pt-1 text-right text-[var(--plate-ink-dim)] sm:block">
                {item.period?.split('·')[0]?.trim()}
              </span>

              <span className="relative z-10 flex justify-start bg-[var(--plate-ground)] py-1">
                <StationMark type={type} current={item.current} />
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="stencil mb-1.5 text-[var(--plate-ink-dim)] sm:hidden">
                  {item.period}
                </p>
                <h3 className="m-0 text-lg font-semibold leading-snug text-[var(--plate-ink)]">
                  {item.title}
                </h3>
                {item.org && (
                  <p className="stencil mt-1.5 text-[var(--plate-ink-dim)]">{item.org}</p>
                )}
                {item.description && (
                  <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-[var(--plate-ink-dim)]">
                    {item.description}
                  </p>
                )}
                {item.current && (
                  <span className="mt-3 inline-flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 bg-[var(--plate-signal)] motion-safe:animate-[lamp_3.2s_var(--ease-plate)_infinite]"
                    />
                    <span className="stencil text-[var(--plate-signal-label)]">Current</span>
                  </span>
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
