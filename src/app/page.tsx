'use client'

import { useState, useEffect } from 'react'
import Projects from '../views/Projects'
import AboutPage from '../views/AboutPage'
import ContactPage from '../views/ContactPage'
import JourneyPage from '../views/JourneyPage'
import ProjectDetails from '../views/ProjectDetails'
import Footer from '../components/parts/Footer'
import { Bolts, Mark, PlateSection, StatusLamp } from '../components/ui/Plate'
import { useSystemStatus } from '../lib/useSystemStatus'
import { profile, socials, projects } from '../data'

const NAV_ITEMS = [
  { id: 'profile', label: 'Record' },
  { id: 'journey-section', label: 'History' },
  { id: 'projects-section', label: 'Systems' },
  { id: 'contact-section', label: 'Contact' },
]

/** A field row on the identity plate: name in the label column, value beside it. */
function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] items-baseline gap-x-6 gap-y-1.5 border-t border-[var(--plate-rule)] py-4 sm:py-5 ${className}`}
    >
      <dt className="stencil text-[var(--plate-ink-dim)] sm:pt-1.5">{label}</dt>
      <dd className="m-0 text-[var(--plate-ink)]">{children}</dd>
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // One probe for the page. The hero tally, the schedule and the record sheet
  // all read the same panel, so nothing on the page can contradict anything
  // else about what is actually up.
  const status = useSystemStatus()

  useEffect(() => {
    setMounted(true)

    const hasDarkClass = document.documentElement.classList.contains('dark')
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(hasDarkClass || storedTheme === 'dark' || (!storedTheme && prefersDark))

    const storedSec = localStorage.getItem('activeSection')
    if (storedSec && (storedSec === 'home' || NAV_ITEMS.some((n) => n.id === storedSec))) {
      setActiveSection(storedSec)
    }

    const params = new URLSearchParams(window.location.search)
    const projId = params.get('project')
    if (projId) {
      setSelectedProjectId(projId)
      setActiveProjectId(projId)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark, mounted])

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const projId = params.get('project')
      setSelectedProjectId(projId)
      if (projId) setActiveProjectId(projId)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleProjectSelect = (id: string | null) => {
    setSelectedProjectId(id)
    const searchParams = new URLSearchParams(window.location.search)
    if (id) {
      setActiveProjectId(id)
      searchParams.set('project', id)
    } else {
      searchParams.delete('project')
    }
    const qs = searchParams.toString()
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(id)
    localStorage.setItem('activeSection', id)
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveSection('home')
    localStorage.setItem('activeSection', 'home')
  }

  const builtCount = projects.length
  const withEndpoint = projects.filter((p: any) => p.demoUrl).length

  return (
    <div className="min-h-screen">
      {/* ── BOLTED TOP RAIL ─────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[200] plate-field border-b border-[var(--plate-rule)]">
        <nav className="mx-auto max-w-[86rem] px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Back to top of record"
          >
            <span className="stencil text-[var(--plate-ink-dim)] transition-colors group-hover:text-[var(--plate-ink)]">
              Madigal · J.A.L.
            </span>
          </button>

          <div className="hidden md:flex items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`stencil px-4 py-2 border-l border-[var(--plate-rule)] transition-colors ${
                  activeSection === item.id
                    ? 'bg-[color-mix(in_srgb,var(--plate-ink)_14%,transparent)] text-[var(--plate-ink)]'
                    : 'text-[var(--plate-ink-dim)] hover:text-[var(--plate-ink)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? 'Switch to day plate' : 'Switch to night plate'}
              className="stencil h-8 px-3 border border-[var(--plate-rule)] text-[var(--plate-ink-dim)] hover:text-[var(--plate-ink)] hover:border-[var(--plate-ink)] transition-colors"
            >
              {!mounted ? '··' : isDark ? 'Night' : 'Day'}
            </button>

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle index"
              className="stencil md:hidden h-8 px-3 border border-[var(--plate-rule)] text-[var(--plate-ink-dim)] hover:text-[var(--plate-ink)] transition-colors"
            >
              {mobileMenuOpen ? 'Close' : 'Index'}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--plate-rule)] bg-[var(--color-signal-deep)]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`stencil w-full text-left px-6 py-3.5 border-b border-[var(--plate-rule)] transition-colors ${
                  activeSection === item.id ? 'bg-[color-mix(in_srgb,var(--plate-ink)_14%,transparent)] text-[var(--plate-ink)]' : 'text-[var(--plate-ink-dim)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="stencil fixed bottom-0 right-0 z-[190] inline-flex items-center gap-1.5 plate-field text-[var(--plate-ink-dim)] border-t border-l border-[var(--plate-rule)] px-4 py-3 hover:text-[var(--plate-ink)] transition-colors"
        >
          <Mark dir="up" />
          Top
        </button>
      )}

      {selectedProjectId && (
        <div className="fixed inset-0 z-[250] bg-[var(--plate-ground)] overflow-y-auto">
          <ProjectDetails
            projectId={selectedProjectId}
            onBack={() => handleProjectSelect(null)}
            state={status.stateFor(selectedProjectId)}
            reading={status.readingFor(selectedProjectId)}
            checkedAt={status.checkedAt}
          />
        </div>
      )}

      <main>
        {/* ── IDENTITY PLATE ────────────────────────────────── */}
        <section id="home" className="relative plate-field pt-14">
          <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
            <div className="relative border-x border-[var(--plate-rule)] px-4 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-0">
              <Bolts />

              <dl className="m-0 pt-2">
                <Field label="Asset">
                  <h1 className="plate-display m-0 text-[clamp(2.25rem,8.2vw,5.5rem)] uppercase">
                    {profile.name}
                  </h1>
                </Field>

                <Field label="Function">
                  <p className="m-0 text-[clamp(1rem,2.4vw,1.6rem)] font-medium leading-snug">
                    {profile.title}
                  </p>
                </Field>

                <Field label="Does">
                  <p className="m-0 max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.125rem)] leading-relaxed text-[var(--plate-ink)]/90">
                    Builds the internal systems a business runs on — and keeps the
                    hardware, software, and networks under them working.
                  </p>
                </Field>

                <Field label="Location">
                  <p className="m-0 text-[clamp(1rem,2.4vw,1.6rem)] font-medium leading-snug">
                    {profile.location} · PH
                  </p>
                </Field>

                <Field label="In service">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="text-base font-medium">Since Jan 2025</span>
                    <StatusLamp on={profile.openToProjects}>
                      {profile.openToProjects ? 'Accepting project work' : 'Not accepting work'}
                    </StatusLamp>
                  </div>
                </Field>
              </dl>

              {/* Primary action, directly under the record, at left. */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3 border-t border-[var(--plate-rule)] py-6 sm:py-8">
                <button
                  onClick={() => scrollTo('contact-section')}
                  className="bg-[var(--plate-signal)] text-[var(--plate-signal-ink)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-center hover:bg-[var(--plate-signal-hover)] transition-colors"
                >
                  Request service
                </button>
                <button
                  onClick={() => scrollTo('projects-section')}
                  className="border border-[var(--plate-rule)] text-[var(--plate-ink)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-center hover:border-[var(--plate-ink)] hover:bg-[color-mix(in_srgb,var(--plate-ink)_8%,transparent)] transition-colors"
                >
                  {status.upCount === null
                    ? `${builtCount} systems built`
                    : `${status.upCount} of ${withEndpoint} responding`}
                </button>
              </div>

              {/* The panel schedule breaks the fold. */}
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1.5 border-t border-[var(--plate-rule)] py-3">
                <span className="stencil text-[var(--plate-ink-dim)]">Schedule</span>
                <span className="stencil text-[var(--plate-ink-dim)]">
                  {builtCount} records
                  {status.upCount !== null && ` · ${status.upCount} responding`}
                </span>
                {profile.resume?.url && (
                  <a
                    href={profile.resume.url}
                    download={profile.resume.filename}
                    className="stencil inline-flex items-center gap-1.5 whitespace-nowrap text-[var(--plate-ink-dim)] underline decoration-stencil/30 transition-colors hover:text-[var(--plate-ink)] hover:decoration-current sm:ml-auto"
                  >
                    Spec sheet
                    <Mark dir="down" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <AboutPage />

        <PlateSection id="journey-section" label="Service history" note="2022 — 2026">
          <JourneyPage />
        </PlateSection>

        <PlateSection
          id="projects-section"
          label="Systems built"
          note={
            status.upCount === null
              ? `${builtCount} records`
              : `${builtCount} records · ${status.upCount} responding`
          }
        >
          <Projects
            selectedProjectId={activeProjectId}
            onProjectClick={(id) => handleProjectSelect(id)}
            stateFor={status.stateFor}
            readingFor={status.readingFor}
            checkedAt={status.checkedAt}
          />
        </PlateSection>

        <PlateSection id="contact-section" label="Service request" note="Response within a day">
          <ContactPage />
        </PlateSection>
      </main>

      <Footer profile={profile} socials={socials ?? undefined} />
    </div>
  )
}
