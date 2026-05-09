import { useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { useSanityData } from '../hooks/useSanity'
import { Skeleton } from '../components/ui/Skeleton'

interface HomeProps {
  onLoading?: (isLoading: boolean) => void
  onNavigate?: (page: string) => void
}

function Home({ onLoading, onNavigate }: HomeProps) {
  const { data: homeData, loading } = useSanityData<any>(`*[_type == "home"][0]`)

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

  const getIcon = (key: string) => {
    switch (key) {
      case 'terminal':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      case 'database':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
      case 'message':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      case 'user':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      default:
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    }
  }

  if (loading) {
    return (
      <div className="p-8 md:p-12 space-y-12">
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (!homeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-12 text-center">
        <h2 className="text-2xl font-bold opacity-20 italic">Initialize Home Page Dataset in Sanity Studio</h2>
      </div>
    )
  }

  return (
    <div className="flex flex-col animate-fade-in scroll-smooth">
      {/* Section: Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-white dark:bg-bg-dark">
        <div className="inline-flex items-center rounded-full border border-accent-orange/20 bg-accent-orange/5 px-3 py-1 text-xs font-medium text-accent-orange mb-8 uppercase tracking-widest">
          Portfolio Navigation Guide
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary sm:text-7xl max-w-4xl leading-tight">
          {homeData.heroTitle}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-text-light-secondary dark:text-text-dark-secondary sm:text-xl leading-relaxed">
          {homeData.heroSubtitle}
        </p>
        <div className="mt-10">
          <Button size="lg" onClick={() => onNavigate?.('projects')}>
            {homeData.ctaText || 'Get Started'}
          </Button>
        </div>
      </section>

      {/* Section: Navigation Guidelines */}
      <section className="py-24 px-6 sm:px-10 lg:px-12 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-text-light-primary dark:text-text-dark-primary italic">Best Features</h2>
            <div className="w-12 h-1 bg-accent-orange mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.features?.map((feature: any, i: number) => (
              <div 
                key={i} 
                onClick={() => onNavigate?.(feature.targetPage)}
                className="group p-8 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-bg-dark hover:border-accent-orange/50 hover:shadow-2xl hover:shadow-accent-orange/5 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-6xl font-black italic">{i + 1}</span>
                </div>
                
                <div className="h-12 w-12 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 transition-transform duration-500">
                   {getIcon(feature.icon)}
                </div>
                
                <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3 group-hover:text-accent-orange transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-light-secondary leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-[10px] font-black text-accent-orange uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <span>Explore Module</span>
                  <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
