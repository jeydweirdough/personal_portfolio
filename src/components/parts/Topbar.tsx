interface TopbarProps {
  activePage: string
}

function Topbar({ activePage }: TopbarProps) {
  const pageTitle = activePage.charAt(0).toUpperCase() + activePage.slice(1)
  
  return (
    <header className="sticky top-0 z-30 h-[var(--topbar-height)] border-b border-border-light bg-white/80 dark:border-border-dark dark:bg-bg-dark/80 backdrop-blur-md px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4 text-sm font-medium">
        <div className="flex items-center gap-2 text-text-light-secondary dark:text-text-dark-secondary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </div>
        <span className="text-border-light dark:text-border-dark">/</span>
        <div className="flex items-center gap-2 text-text-light-primary dark:text-text-dark-primary">
          <span className="text-accent-orange font-bold">{pageTitle}</span>
          {/* <span className="rounded bg-slate-100 dark:bg-bg-dark-soft px-1.5 py-0.5 text-[10px] font-bold text-text-light-secondary uppercase tracking-wider border border-border-light dark:border-border-dark">Free</span> */}
        </div>
      </div>

      <div className="flex items-center gap-2">
      </div>
    </header>
  )
}

export default Topbar
