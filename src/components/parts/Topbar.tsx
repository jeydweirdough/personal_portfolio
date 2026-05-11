interface TopbarProps {
  activePage: string
  onToggleSidebar: () => void
}

function Topbar({ activePage, onToggleSidebar }: TopbarProps) {
  const pageTitle = activePage.charAt(0).toUpperCase() + activePage.slice(1)
  
  return (
    <header className="sticky top-0 z-30 h-[var(--topbar-height)] border-b border-border-light bg-white/80 dark:border-border-dark dark:bg-bg-dark/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-text-light-secondary dark:text-text-dark-secondary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-text-light-secondary dark:text-text-dark-secondary">
          <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-40 font-bold">System</span>
        </div>
        <span className="text-border-light dark:text-border-dark">/</span>
        <div className="flex items-center gap-2 text-text-light-primary dark:text-text-dark-primary">
          <span className="text-accent-orange font-bold text-xs sm:text-sm uppercase tracking-widest">{pageTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
      </div>
    </header>
  )
}

export default Topbar
