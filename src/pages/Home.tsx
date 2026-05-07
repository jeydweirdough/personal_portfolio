import { useState } from 'react'
import { Button } from '../components/ui/Button'

function Home() {
  const [isGettingStarted, setIsGettingStarted] = useState(false)

  const handleGetStarted = () => {
    setIsGettingStarted(true)
    setTimeout(() => setIsGettingStarted(false), 2000)
  }

  return (
    <div className="flex flex-col animate-fade-in scroll-smooth">
      {/* Section: Hero */}
      <section id="hero-main" className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-white dark:bg-bg-dark">
        <div className="inline-flex items-center rounded-full border border-accent-orange/20 bg-accent-orange/5 px-3 py-1 text-xs font-medium text-accent-orange mb-8">
          Welcome to my portfolio
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary sm:text-7xl">
          Designing the future of <br />
          <span className="text-accent-orange">web interfaces.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-text-light-secondary dark:text-text-dark-secondary sm:text-xl">
          Highly focused on minimalist, functional, and developer-centric design systems. Building precision products for the modern web.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button size="lg" isLoading={isGettingStarted} onClick={handleGetStarted}>
            {isGettingStarted ? 'Processing...' : 'Get Started'}
          </Button>
          <Button variant="outline" size="lg">Documentation</Button>
        </div>
      </section>

      {/* Section: Overview */}
      <section id="overview" className="py-32 px-6 sm:px-10 lg:px-12 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">System Overview</h2>
          <p className="mt-4 text-text-light-secondary dark:text-text-dark-secondary">
            Built using a robust DRY architecture, this portfolio system allows for rapid deployment and easy maintenance.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-bg-dark">
              <div className="h-10 w-10 rounded-md bg-accent-orange/10 flex items-center justify-center text-accent-orange mb-4">
                 {i}
              </div>
              <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary">Feature {i}</h3>
              <p className="mt-2 text-sm text-text-light-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
