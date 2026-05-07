import React, { useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onClick?: () => void
}

export function AccordionItem({ title, children, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-b-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 text-left transition-all hover:text-accent-orange"
      >
        <span className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
          {title}
        </span>
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0])

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndexes(prev => prev.includes(index) ? [] : [index])
    }
  }

  return (
    <div className="divide-y divide-border-light dark:divide-border-dark">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
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
