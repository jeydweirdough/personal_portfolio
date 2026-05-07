import { useState, useEffect } from 'react'
import Sidebar from './components/parts/Sidebar'
import Topbar from './components/parts/Topbar'
import Footer from './components/parts/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProjectDetails from './pages/ProjectDetails'
import Playground from './pages/Playground'
import { ProgressBar } from './components/ui/ProgressBar'

function App() {
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  
  // Initialize state from URL hash and localStorage
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return hash || 'home'
  })
  
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebar-expanded')
    return saved !== null ? JSON.parse(saved) : true
  })

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark' ||
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  // Scroll Spy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Watch all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [activePage])

  // Sync URL hash with activePage
  useEffect(() => {
    window.location.hash = activePage
    // Reset active section when changing pages
    setActiveSection('')
    
    // Simulate API loading progress with ProgressBar
    setIsNavigating(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsNavigating(false), 200)
          return 100
        }
        return prev + 10
      })
    }, 50)

    return () => clearInterval(interval)
  }, [activePage])

  // Sync localStorage with sidebar state
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', JSON.stringify(isSidebarExpanded))
  }, [isSidebarExpanded])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded)

  const renderPage = () => {
    if (isNavigating) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 h-full bg-white dark:bg-bg-dark transition-opacity duration-300">
          <div className="w-full max-w-md space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-4 w-4 border-2 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-widest">Initialising Dataset</span>
            </div>
            <ProgressBar progress={progress} size="sm" showValue />
            <p className="text-[10px] text-text-light-secondary dark:text-text-dark-secondary animate-pulse uppercase tracking-tighter">Fetching architectural patterns & components...</p>
          </div>
        </div>
      )
    }

    switch (activePage) {
      case 'home': return <Home />
      case 'projects': return <Projects onProjectClick={(id) => setActivePage(`project-details/${id}`)} />
      case 'about': return <AboutPage />
      case 'contact': return <ContactPage />
      case 'playground': return <Playground />
      default: 
        if (activePage.startsWith('project-details/')) {
          const id = parseInt(activePage.split('/')[1])
          return <ProjectDetails projectId={id} onBack={() => setActivePage('projects')} />
        }
        return <Home />
    }
  }

  const sidebarWidth = isSidebarExpanded ? 'var(--sidebar-total-width)' : 'var(--sidebar-narrow-width)'

  return (
    <div className="flex h-screen bg-white dark:bg-bg-dark transition-colors duration-200 overflow-hidden font-poppins">
      {/* GLOBAL PROGRESS BAR (Minimal) */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[200]">
          <div 
            className="h-full bg-accent-orange transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,69,50,0.5)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Sidebar - Dual Pane Collapsible */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isExpanded={isSidebarExpanded}
        toggleExpanded={toggleSidebar}
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <Topbar isDark={isDark} toggleTheme={toggleTheme} activePage={activePage} />
        
        <main className="flex-1 overflow-y-auto scroll-smooth relative flex flex-col">
          <div className="flex-1">
            {renderPage()}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App