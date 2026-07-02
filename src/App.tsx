import { useState, useEffect } from 'react'
import Projects from './pages/Projects'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProjectDetails from './pages/ProjectDetails'
import Footer from './components/parts/Footer'
import { profile, socials } from './data'

const NAV_ITEMS = [
  { id: 'profile', label: 'About' },
  { id: 'projects-section', label: 'Projects' },
  { id: 'contact-section', label: 'Contact' },
]

// Curated picks from the About section's tech stack
const FLOAT_ICONS = [
  { slug: 'react',        style: { top: '12%',  left: '6%'   }, delay: '0s',    dur: '4s'   },
  { slug: 'typescript',  style: { top: '8%',   right: '8%'  }, delay: '0.6s',  dur: '5s'   },
  { slug: 'nodedotjs',   style: { top: '42%',  left: '3%'   }, delay: '1.2s',  dur: '4.5s' },
  { slug: 'tailwind-css',style: { top: '72%',  left: '7%'   }, delay: '0.3s',  dur: '3.8s' },
  { slug: 'supabase',    style: { top: '28%',  left: '18%'  }, delay: '0.9s',  dur: '5.2s' },
  { slug: 'mongodb',     style: { top: '62%',  right: '6%'  }, delay: '1.5s',  dur: '4.2s' },
  { slug: 'figma',       style: { top: '35%',  right: '4%'  }, delay: '0.4s',  dur: '4.8s' },
  { slug: 'github',      style: { top: '80%',  right: '12%' }, delay: '1.1s',  dur: '3.6s' },
  { slug: 'python',      style: { top: '55%',  left: '20%'  }, delay: '0.7s',  dur: '5.5s' },
  { slug: 'firebase',    style: { top: '18%',  right: '22%' }, delay: '1.8s',  dur: '4.3s' },
]

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('activeSection')
      return stored && (stored === 'home' || NAV_ITEMS.find(n => n.id === stored)) ? stored : 'home'
    }
    return 'home'
  })
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get('project')
    }
    return null
  })
  const [activeProjectId, setActiveProjectId] = useState<string | null>(selectedProjectId)
  const [navScrolled, setNavScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  // Profile and socials are loaded statically from local JSON data

  // Scroll to saved section on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('activeSection')
      if (stored) {
        // Small delay to let the DOM render fully
        const timeout = setTimeout(() => {
          const el = document.getElementById(stored)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
        return () => clearTimeout(timeout)
      }
    }
  }, [])

  // Theme sync
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Navbar shadow + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 10)
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll Spy — updates activeSection and localStorage
  useEffect(() => {
    if (selectedProjectId) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            localStorage.setItem('activeSection', entry.target.id)
          }
        })
      },
      { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [selectedProjectId])

  // Handle browser back/forward buttons for project selection
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const projId = params.get('project')
      setSelectedProjectId(projId)
      if (projId) {
        setActiveProjectId(projId)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleProjectSelect = (id: string | null) => {
    setSelectedProjectId(id)
    if (id) {
      setActiveProjectId(id)
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('project', id)
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`
      window.history.pushState({ path: newUrl }, '', newUrl)
    } else {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.delete('project')
      const newUrl = searchParams.toString() ? `${window.location.pathname}?${searchParams.toString()}` : window.location.pathname
      window.history.pushState({ path: newUrl }, '', newUrl)
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(id)
    localStorage.setItem('activeSection', id)
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveSection('profile')
    localStorage.setItem('activeSection', 'profile')
  }

  const toggleTheme = () => setIsDark((d) => !d)

  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark transition-colors duration-200 font-poppins">

      {/* ── STICKY NAVBAR ─────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          navScrolled
            ? 'bg-white/90 dark:bg-bg-dark/90 backdrop-blur-lg shadow-sm border-b border-border-light dark:border-border-dark'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo — scrolls to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 group"
          >
            <img src="/mooserage_icon.svg" alt="Mooserage Logo" className="h-7 w-7 rounded-xl" />
            <span className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-tight group-hover:text-accent-orange transition-colors">
              Mooserage
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  activeSection === item.id
                    ? 'text-accent-orange bg-accent-orange/5'
                    : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle"
              className="h-9 w-9 flex items-center justify-center rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              {isDark ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Profile Avatar */}
            {profile?.avatar && (
              <div className="hidden md:block h-8 w-8 rounded-full overflow-hidden border-2 border-border-light dark:border-border-dark">
                <img src={profile.avatar} alt={profile?.name} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-bg-dark border-t border-border-light dark:border-border-dark px-4 py-3 space-y-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  activeSection === item.id
                    ? 'text-accent-orange bg-accent-orange/5'
                    : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── BACK TO TOP ─────────────────────────────────────── */}
      <button
        id="back-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[190] h-10 w-10 flex items-center justify-center rounded-full bg-accent-orange text-white shadow-lg shadow-accent-orange/30 transition-all duration-300 hover:bg-accent-orange-hover hover:scale-110 ${
          showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* ── PROJECT DETAIL OVERLAY ──────────────────────────── */}
      {selectedProjectId && (
        <div className="fixed inset-0 z-[250] bg-white dark:bg-bg-dark overflow-y-auto animate-fade-in">
          <ProjectDetails
            projectId={selectedProjectId}
            onBack={() => handleProjectSelect(null)}
          />
        </div>
      )}

      {/* ── PAGE SECTIONS ───────────────────────────────────── */}
      <main>

        {/* HOME — Landing section with hero opener */}
        <section id="home" className="min-h-[calc(100vh-4rem)] relative bg-slate-50 dark:bg-bg-dark-soft border-b border-border-light dark:border-border-dark flex items-center overflow-hidden pt-16">

          {/* Floating tech icons — decorative background */}
          {FLOAT_ICONS.map((icon) => (
            <div
              key={icon.slug}
              className="absolute animate-float opacity-[0.18] dark:opacity-[0.08] pointer-events-none hidden lg:block"
              style={{ ...icon.style, animationDelay: icon.delay, animationDuration: icon.dur }}
            >
              <div className="h-14 w-14 p-3 rounded-2xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-sm">
                <img
                  src={`https://thesvg.org/icons/${icon.slug}/default.svg`}
                  alt={icon.slug}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://cdn.svgl.app/library/${icon.slug}.svg` }}
                />
              </div>
            </div>
          ))}

          {/* Centered hero text */}
          <div className="relative z-10 max-w-xl mx-auto w-full px-6 py-16 text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-orange/5 border border-accent-orange/15 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-semibold text-accent-orange uppercase tracking-wider">
                {profile?.status || 'Status Not Available'}
              </span>
            </div>

            <p className="text-[11px] text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-widest mb-3">
              {profile?.name || 'Jade Atyla'}
              <br />
              {profile?.title || 'Developer & Designer'}
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary leading-snug tracking-tight mb-4">
              Welcome to my{' '}
              <span className="text-accent-orange italic">portfolio.</span>
            </h1>

            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed max-w-sm mx-auto mb-8">
              I design and build modern web experiences — clean UIs, solid back-end systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <button
                onClick={() => scrollTo('contact-section')}
                className="px-4 py-2 bg-accent-orange hover:bg-accent-orange-hover text-white text-[11px] font-semibold rounded-lg transition-all active:scale-95"
              >
                Get in Touch
              </button>
              <button
                onClick={() => scrollTo('projects-section')}
                className="px-4 py-2 border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary text-[11px] font-semibold rounded-lg hover:border-accent-orange hover:text-accent-orange transition-all"
              >
                View Projects
              </button>
              {socials && socials.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {socials.slice(0, 4).map((s: any) => {
                    const slug = s.name?.toLowerCase().replace(/\s+/g, '-')
                    return (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-7 w-7 flex items-center justify-center rounded-md border border-border-light dark:border-border-dark hover:border-accent-orange/50 transition-all p-1.5"
                      >
                        <img
                          src={`https://thesvg.org/icons/${slug}/default.svg`}
                          alt={s.name}
                          className="w-full h-full object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://cdn.svgl.app/library/${slug}.svg` }}
                        />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Scroll hint */}
            <div className="mt-12 flex flex-col items-center gap-1.5 opacity-25">
              <span className="text-[9px] uppercase tracking-widest text-text-light-secondary">scroll</span>
              <svg className="w-3.5 h-3.5 text-text-light-secondary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* ABOUT — About page detailed content */}
        <AboutPage />

        <section id="projects-section" className="scroll-mt-16 min-h-screen flex flex-col justify-center border-t border-border-light dark:border-border-dark">
          <div className="px-4 pt-12 pb-2 sm:px-10 lg:px-16 max-w-6xl mx-auto">
            <span className="text-xs font-bold text-accent-orange uppercase tracking-[0.3em] mb-2">Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tighter uppercase">Projects</h2>
          </div>
          <Projects 
            selectedProjectId={activeProjectId} 
            onProjectClick={(id) => handleProjectSelect(id)} 
          />
        </section>

        <section id="contact-section" className="scroll-mt-16 min-h-screen flex flex-col justify-center border-t border-border-light dark:border-border-dark">
          <ContactPage />
        </section>

      </main>

      <Footer profile={profile} socials={socials ?? undefined} />
    </div>
  )
}

export default App