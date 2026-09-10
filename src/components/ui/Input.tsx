'use client'

import React, { useId } from 'react'

const fieldBase =
  'w-full border border-[var(--plate-rule)] bg-transparent px-3.5 py-3 text-[15px] text-[var(--plate-ink)] outline-none transition-colors placeholder:text-[var(--plate-ink-dim)] focus:border-[var(--plate-ink)]'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={fieldId} className="stencil mb-2 block text-[var(--plate-ink-dim)]">
          {label}
        </label>
      )}
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`${fieldBase} ${error ? 'border-[var(--plate-caution)]' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="stencil mt-2 text-[var(--plate-caution)]">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={fieldId} className="stencil mb-2 block text-[var(--plate-ink-dim)]">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`${fieldBase} resize-y ${error ? 'border-[var(--plate-caution)]' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="stencil mt-2 text-[var(--plate-caution)]">
          {error}
        </p>
      )}
    </div>
  )
}
