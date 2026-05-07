import { Button } from '../ui/Button'
import profile from '../../data/profile.json'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  sections?: { id: string; label: string; icon: React.ReactNode }[]
}

const menuItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ), sections: [
    { id: 'hero-main', label: 'Hero Section', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeWidth={2}/></svg> },
    { id: 'overview', label: 'Overview', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth={2}/></svg> }
  ]},
  { id: 'projects', label: 'Projects', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ), sections: [
    { id: 'active-projects', label: 'Active Projects', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth={2}/></svg> },
    { id: 'archived', label: 'Archived', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth={2}/></svg> }
  ]},
  { id: 'about', label: 'About', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ), sections: [
    { id: 'profile', label: 'Public Profile', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" strokeWidth={2}/></svg> },
    { id: 'faq', label: 'FAQ', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2}/></svg> }
  ]},
  { id: 'contact', label: 'Contact', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ), sections: [
    { id: 'direct-contact', label: 'Direct', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth={2}/></svg> },
    { id: 'support-form', label: 'Support Form', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth={2}/></svg> }
  ]},
  { id: 'playground', label: 'Playground', icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ), sections: [
    { id: 'api-client', label: 'API Client', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2}/></svg> },
    { id: 'storage-viewer', label: 'Storage', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" strokeWidth={2}/></svg> }
  ]},
]

interface SidebarProps {
  activePage: string
  setActivePage: (id: string) => void
  isExpanded: boolean
  toggleExpanded: () => void
  isDark: boolean
  toggleTheme: () => void
  activeSection: string
}

function Sidebar({ activePage, setActivePage, isExpanded, toggleExpanded, isDark, toggleTheme, activeSection }: SidebarProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeItemId = activePage.split('/')[0]
  const activeItem = menuItems.find(item => item.id === activeItemId) || 
                     (activeItemId === 'project-details' ? menuItems.find(i => i.id === 'projects') : menuItems[0])

  return (
    <aside className="fixed left-0 top-0 h-full flex z-[100] transition-all duration-300 ease-in-out bg-white dark:bg-bg-dark border-r border-border-light dark:border-border-dark shadow-2xl"
           style={{ width: isExpanded ? 'calc(var(--sidebar-narrow-width) + var(--sidebar-wide-width))' : 'var(--sidebar-narrow-width)' }}>
      
      {/* PRIMARY BAR: Always visible icons */}
      <div className="w-[var(--sidebar-narrow-width)] h-full flex flex-col items-center bg-slate-50 dark:bg-bg-dark border-r border-border-light dark:border-border-dark shrink-0 z-[110]">
        <div className="h-[var(--topbar-height)] flex items-center justify-center w-full shrink-0">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-accent-orange text-white font-black">M</div>
        </div>
        
        <div className="flex flex-col gap-2 flex-1 w-full items-center py-4">
          {menuItems.map(item => {
            const isItemActive = activeItemId === item.id || (activeItemId === 'project-details' && item.id === 'projects')
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id)
                  if (!isExpanded) toggleExpanded()
                }}
                className={`h-10 w-10 flex items-center justify-center rounded-md transition-all ${
                  isItemActive ? 'bg-white dark:bg-bg-dark-soft text-accent-orange shadow-sm border border-border-light dark:border-border-dark' : 'text-text-light-secondary hover:bg-slate-100'
                }`}
              >
                {item.icon}
              </button>
            )
          })}
        </div>

        {/* COMPACT FOOTER */}
        <div className="w-full flex flex-col items-center pb-6 border-t border-border-light dark:border-border-dark pt-6">
          <button 
            onClick={toggleExpanded} 
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-bg-dark-soft text-text-light-secondary hover:text-accent-orange transition-all"
          >
             {isExpanded ? (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" strokeWidth={2}/></svg>
             ) : (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeWidth={2}/></svg>
             )}
          </button>
        </div>
      </div>

      {/* SECONDARY PANE: Animated width */}
      <div 
        className="h-full transition-all duration-300 ease-in-out bg-white dark:bg-bg-dark z-[105]"
        style={{ width: isExpanded ? 'var(--sidebar-wide-width)' : '0px', opacity: isExpanded ? 1 : 0, overflow: isExpanded ? 'visible' : 'hidden' }}
      >
        <div className="w-[var(--sidebar-wide-width)] h-full flex flex-col shrink-0">
          <div className="h-[var(--topbar-height)] flex items-center px-6 border-b border-border-light dark:border-border-dark shrink-0">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary leading-tight">Mooserage</span>
              <span className="text-[10px] text-text-light-secondary font-medium uppercase tracking-tighter">Portfolio System</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
             <div className="space-y-1">
                <p className="text-[10px] text-text-light-secondary font-medium uppercase tracking-tighter mb-2">Sections</p>
                {activeItem?.sections?.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center gap-3 px-3 py-1.5 rounded-md transition-all group ${
                      activeSection === section.id 
                        ? 'text-accent-orange bg-slate-50 dark:bg-white/5' 
                        : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`${
                        activeSection === section.id 
                          ? 'text-accent-orange' 
                          : 'text-text-light-secondary/50 group-hover:text-accent-orange'
                      } transition-colors`}
                    >
                      {section.icon}
                    </div>

                    <span className="truncate text-[0.75rem] text-text-light-secondary font-medium uppercase tracking-tighter">
                      {section.label}
                    </span>
                  </button>
                ))}
             </div>

             <div className="mx-2 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 mt-auto">
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold uppercase tracking-wider">{profile.status}</span>
                </div>
                <p className="text-[10px] text-text-light-secondary leading-normal mb-3">Available for high-precision design & development. Review my experience below.</p>
                <a href={profile.resume} download>
                  <Button size="xs" variant="secondary" className="w-full border-emerald-500/20 text-emerald-500 text-[10px]" icon={<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}>
                    <span className="text-[10px]">Download CV</span>
                  </Button>
                </a>
             </div>
          </div>

          {/* STRETCHED FOOTER: Profile Popup Fixed */}
          <div className="p-4 border-t border-border-light dark:border-border-dark flex items-center gap-3 shrink-0 bg-slate-50 dark:bg-bg-dark-soft relative group/profile">
             <div className="h-10 w-10 rounded-full border-2 border-white dark:border-border-dark overflow-hidden shadow-sm cursor-pointer hover:border-accent-orange transition-all shrink-0">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
             </div>
             
             <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary truncate">{profile.name}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors"
                  >
                    {isDark ? (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-text-light-secondary dark:text-text-dark-secondary truncate leading-none uppercase tracking-tighter">{profile.title}</p>
             </div>

             {/* SIDE CONVERSATION POPUP: Forced z-index and overflow escape */}
             <div className="absolute bottom-full left-4 mb-4 opacity-0 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:pointer-events-auto transition-all duration-400 transform translate-y-2 group-hover/profile:translate-y-0 z-[9999] drop-shadow-2xl">
               <div className="bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark rounded-2xl p-6 w-72 relative">
                  <div className="flex flex-col items-center text-center">
                     <div className="h-28 w-28 rounded-full border-4 border-white dark:border-bg-dark shadow-xl overflow-hidden mb-4">
                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                     </div>
                     <h4 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">{profile.name}</h4>
                     <p className="text-[11px] text-accent-orange font-bold uppercase tracking-widest mb-4">{profile.title}</p>
                     
                     <div className="w-full space-y-3 pt-4 border-t border-border-light dark:border-border-dark">
                        <div className="flex items-center justify-between text-xs">
                           <span className="text-text-light-secondary">Location</span>
                           <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{profile.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                           <span className="text-text-light-secondary">Status</span>
                           <span className="text-emerald-500 font-bold">{profile.status}</span>
                        </div>
                     </div>
                  </div>
                  {/* Speech Bubble Arrow */}
                  <div className="absolute top-full left-6 w-5 h-5 bg-white dark:bg-bg-dark-soft border-r border-b border-border-light dark:border-border-dark rotate-45 -mt-[10px]"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
