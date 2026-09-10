'use client'

import React, { useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onClick?: () => void
}

/**
 * A record row that opens. Square, ruled, no chevron flourish — the mark is a
 * plus that becomes a minus, which is what a schedule actually uses.
 */
export function AccordionItem({ title, children, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-[var(--plate-rule)]">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-4 text-left transition-colors hover:text-[var(--plate-ink)]"
      >
        <span className="text-[15px] font-medium text-[var(--plate-ink)]">{title}</span>
        <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[var(--plate-ink-dim)]" aria-hidden="true">
          <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.6" />
          <line
            x1="8"
            y1="1"
            x2="8"
            y2="15"
            stroke="currentColor"
            strokeWidth="1.6"
            className="transition-opacity duration-200 ease-[var(--ease-plate)]"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-plate)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="max-w-[64ch] pb-5 text-[15px] leading-relaxed text-[var(--plate-ink-dim)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: { id?: string; title: string; content: React.ReactNode }[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0])

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className="border-t border-[var(--plate-rule)]">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onClick={() => toggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
