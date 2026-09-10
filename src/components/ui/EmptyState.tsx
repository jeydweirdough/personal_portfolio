import React from 'react'

interface EmptyStateProps {
  title: string
  message: string
  icon?: React.ReactNode
  action?: { label: string; onClick: () => void }
}

/** An unpopulated plate: ruled and labelled, never a glowing illustration. */
export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-[var(--plate-rule)] px-6 py-14 text-center">
      <p className="stencil mb-3 text-[var(--plate-ink-dim)]">No record</p>
      <h3 className="m-0 text-lg font-semibold text-[var(--plate-ink)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-[46ch] text-[15px] leading-relaxed text-[var(--plate-ink-dim)]">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 border border-[var(--plate-ink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--plate-ink)] transition-colors hover:bg-[var(--plate-ink)] hover:text-[var(--plate-ground)]"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
