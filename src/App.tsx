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
import { useSanityData } from './hooks/useSanity'

function App() {
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  
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

  // Fetch Global Profile Data for Sidebar/Contact
  const { data: profile, loading: profileLoading } = useSanityData<any>(`*[_type == "profile"][0]`)

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
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [activePage])

  // Sync URL hash with activePage and handle progress animation
  useEffect(() => {
    window.location.hash = activePage
    setActiveSection('')
    
    // Start the progress interval
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 8
      })
    }, 150)

    return () => clearInterval(interval)
  }, [activePage])

  // Handle completion of loading sequence
  useEffect(() => {
    // Only finish if: Global profile is ready AND navigation animation is at 90% AND current page data is ready
    if (!profileLoading && isNavigating && !isPageLoading) {
      setProgress(100)
      const timeout = setTimeout(() => {
        setIsNavigating(false)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [profileLoading, isNavigating, isPageLoading])

  // Sync Theme & Sidebar State
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

  // Instant Navigation Handler to prevent flickering
  const handleNavigate = (page: string) => {
    if (page === activePage) return
    setIsNavigating(true)
    setProgress(0)
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onLoading={setIsPageLoading} onNavigate={handleNavigate} />
      case 'projects': return <Projects onLoading={setIsPageLoading} onProjectClick={(id) => handleNavigate(`project-details/${id}`)} />
      case 'about': return <AboutPage onLoading={setIsPageLoading} />
      case 'contact': return <ContactPage onLoading={setIsPageLoading} />
      case 'playground': return <Playground onLoading={setIsPageLoading} />
      default: 
        if (activePage.startsWith('project-details/')) {
          const id = activePage.split('/')[1]
          return <ProjectDetails projectId={id} onLoading={setIsPageLoading} onBack={() => handleNavigate('projects')} />
        }
        return <Home />
    }
  }

  const sidebarWidth = isSidebarExpanded ? 'var(--sidebar-total-width)' : 'var(--sidebar-narrow-width)'

  return (
    <div className="flex h-screen bg-white dark:bg-bg-dark transition-colors duration-200 overflow-hidden font-poppins">
      
      <Sidebar 
        activePage={activePage} 
        setActivePage={handleNavigate} 
        isExpanded={isSidebarExpanded}
        toggleExpanded={toggleSidebar}
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        profile={profile}
      />

      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <Topbar activePage={activePage} />
        
        <main className="flex-1 overflow-y-auto scroll-smooth relative flex flex-col">
          {/* Facebook-style Top Progress Bar */}
          {(isNavigating || profileLoading || isPageLoading) && (
            <div className="fixed top-0 left-0 w-full h-[3px] z-[500] pointer-events-none">
              <div 
                className="h-full bg-accent-orange shadow-[0_0_10px_rgba(255,69,50,0.6)] transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          )}

          <div className="flex-1">
            {renderPage()}
          </div>
          <Footer profile={profile} />
        </main>
      </div>
    </div>
  )
}

export default App