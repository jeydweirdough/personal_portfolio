import React from 'react'

/**
 * The house icon set. Drawn, not typed: a "↓" borrowed from the font is the
 * text face's arrow, not this system's, and it changes weight and alignment
 * with the type around it. One 1.6 stroke, matching the accordion mark and the
 * journey stations, so every mark on the page comes from the same hand.
 */
export type MarkDir = 'up' | 'down' | 'back' | 'external' | 'close'

const MARK_PATHS: Record<MarkDir, React.ReactNode> = {
  up: <path d="M8 13.5V2.5M3.5 7L8 2.5L12.5 7" />,
  down: <path d="M8 2.5v11M3.5 9l4.5 4.5L12.5 9" />,
  back: <path d="M13.5 8h-11M7 3.5L2.5 8L7 12.5" />,
  external: <path d="M5.5 10.5l6-6M6 4.5h5.5V10" />,
  close: <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />,
}

export function Mark({ dir, className = '' }: { dir: MarkDir; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={`h-[1em] w-[1em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      {MARK_PATHS[dir]}
    </svg>
  )
}

/**
 * Bolt marks at the plate corners. These are structural, not ornament:
 * they are what says the plate is fixed to something rather than floating.
 */
export function Bolts({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="bolt absolute left-2 top-2" />
      <span className="bolt absolute right-2 top-2" />
      <span className="bolt absolute left-2 bottom-2" />
      <span className="bolt absolute right-2 bottom-2" />
    </div>
  )
}

/**
 * The live-status lamp. The signal colour is reserved for exactly this and the
 * primary action — the moment it decorates anything else, it stops meaning
 * anything. The lamp square carries the colour; the label is read against its
 * own ground, which is why it goes stencil-white on an orange field.
 */
export function StatusLamp({
  on = true,
  children,
  tone = 'field',
}: {
  on?: boolean
  children: React.ReactNode
  tone?: 'field' | 'ground'
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 ${
          on ? 'bg-[var(--plate-signal)] motion-safe:animate-[lamp_3.2s_var(--ease-plate)_infinite]' : 'bg-current opacity-30'
        }`}
      />
      <span
        className={`stencil ${on ? 'text-[var(--plate-signal-label)]' : 'text-[var(--plate-ink-dim)]'}`}
      >
        {children}
      </span>
    </span>
  )
}

/**
 * A titled section of the record. The header rail is a measured strip —
 * field name at left, reading at right — exactly as a panel schedule labels
 * its own rows. Sections are framed, never floated as cards.
 */
export function PlateSection({
  id,
  label,
  note,
  children,
}: {
  id: string
  label: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-14">
      <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="border-x border-[var(--plate-rule)]">
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--plate-rule)] px-4 sm:px-8 lg:px-12 py-3.5">
            <h2 className="stencil m-0 text-[var(--plate-ink)]">{label}</h2>
            {note && <span className="stencil text-[var(--plate-ink-dim)]">{note}</span>}
          </div>
          <div className="px-4 sm:px-8 lg:px-12 py-10 sm:py-16">{children}</div>
        </div>
      </div>
    </section>
  )
}

/**
 * A record row: field name in the label column, value beside it, separated by
 * a measured rule. This is the page's only list primitive.
 */
export function RecordRow({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] items-baseline gap-x-6 gap-y-1.5 border-t border-[var(--plate-rule)] py-4 ${className}`}
    >
      <dt className="stencil text-[var(--plate-ink-dim)] pt-0.5">{label}</dt>
      <dd className="m-0 text-[var(--plate-ink)]">{children}</dd>
    </div>
  )
}

/**
 * A stamped tag. Square, ruled, no fill — the way a value is called out on a
 * plate. Never a pill, never a rounded badge.
 */
export function Tag({
  children,
  tone = 'default',
}: {
  children: React.ReactNode
  tone?: 'default' | 'live' | 'muted'
}) {
  const tones = {
    default: 'border-[var(--plate-rule)] text-[var(--plate-ink)]',
    live: 'border-[var(--plate-signal)] text-[var(--plate-signal)]',
    muted: 'border-[var(--plate-rule)] text-[var(--plate-ink-dim)]',
  }
  return (
    <span
      className={`stencil inline-flex items-center border px-2.5 py-1.5 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}


/**
 * The lamp. State is carried by FORM first and colour second, because the
 * healthy colour here is orange — the brand — and a red fault lamp sits too
 * close to it to be told apart at 8px, especially on the night ground where
 * both have to be bright. So: lit is solid, faulted is struck through, and an
 * unwired circuit is an empty holder. A real panel reads the same way.
 */
function Lamp({ state }: { state: 'pending' | 'up' | 'down' | 'none' | 'unknown' }) {
  const color =
    state === 'up'
      ? 'text-[var(--plate-signal)]'
      : state === 'down'
        ? 'text-[var(--plate-caution)]'
        : 'text-[var(--plate-ink-dim)]'

  return (
    <svg
      viewBox="0 0 10 10"
      aria-hidden="true"
      focusable="false"
      className={`h-2.5 w-2.5 shrink-0 ${color} ${
        state === 'pending'
          ? 'motion-safe:animate-[lamp_1.4s_var(--ease-plate)_infinite] opacity-60'
          : ''
      } ${state === 'unknown' ? 'opacity-40' : ''}`}
    >
      {state === 'down' ? (
        <>
          <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <line x1="1.4" y1="8.6" x2="8.6" y2="1.4" stroke="currentColor" strokeWidth="1.6" />
        </>
      ) : state === 'none' ? (
        <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      ) : (
        <rect x="1" y="1" width="8" height="8" fill="currentColor" />
      )}
    </svg>
  )
}

/**
 * The live circuit readout: a lamp and its label, driven by a real probe.
 *
 * The colour rides the lamp square and the words ride the ink, so this holds
 * contrast on concrete, on asphalt, and on an orange field without any caller
 * needing to know which ground it landed on.
 */
export function CircuitReadout({
  state,
  ms,
  checkedAt,
  className = '',
}: {
  state: 'pending' | 'up' | 'down' | 'none' | 'unknown'
  ms?: number | null
  checkedAt?: string | null
  className?: string
}) {

  const label: Record<typeof state, string> = {
    pending: 'Checking',
    up: 'In service',
    down: 'Down',
    none: 'No public endpoint',
    unknown: 'No reading',
  }

  const tone =
    state === 'up'
      ? 'text-[var(--plate-signal-label)]'
      : state === 'down'
        ? 'text-[var(--plate-caution)]'
        : 'text-[var(--plate-ink-dim)]'

  // The reading itself: a measured value where there is one, and the time of
  // the check where the answer was a failure.
  const reading =
    state === 'up' && typeof ms === 'number'
      ? `${ms} ms`
      : state === 'down' && checkedAt
        ? `checked ${checkedAt}`
        : null

  return (
    <span className={`flex flex-col gap-1 ${className}`}>
      <span className="inline-flex items-center gap-2.5">
        <Lamp state={state} />
        <span className={`stencil ${tone}`}>{label[state]}</span>
      </span>
      {reading && (
        <span className="stencil pl-[1.125rem] text-[var(--plate-ink-dim)] opacity-80">
          {reading}
        </span>
      )}
    </span>
  )
}
