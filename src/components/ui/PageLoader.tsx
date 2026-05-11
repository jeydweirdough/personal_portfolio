export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 w-full animate-fade-in">
      <div className="w-full max-w-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-accent-orange uppercase tracking-[0.3em] animate-pulse">Initializing Node</span>
          <span className="text-xs font-mono text-text-light-secondary opacity-40 uppercase tracking-tighter">Status: Fetching</span>
        </div>
        
        {/* The Loading Bar Container */}
        <div className="h-[2px] w-full bg-slate-100 dark:bg-bg-dark-soft rounded-full overflow-hidden relative">
          {/* The Animated Bar */}
          <div className="absolute top-0 left-0 h-full w-full bg-accent-orange shadow-[0_0_8px_rgba(255,69,50,0.4)] animate-loading-bar" />
        </div>
        
        <p className="text-xs text-center text-text-light-secondary opacity-30 uppercase tracking-[0.2em]">
          Synchronizing architectural patterns...
        </p>
      </div>
    </div>
  )
}
