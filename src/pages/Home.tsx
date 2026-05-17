import { useEffect } from 'react'
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-bg-dark transition-colors duration-300 p-4 sm:p-6 lg:p-8 font-poppins">
      <div className="w-full max-w-5xl bg-white dark:bg-bg-dark-soft rounded-[2rem] shadow-premium border border-border-light dark:border-border-dark overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in">
        
        {/* LEFT PANEL: SYSTEM VISUAL */}
        <div className="md:w-1/2 p-4 bg-slate-50 dark:bg-bg-dark">
          <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden group border border-border-light dark:border-border-dark">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
              alt="System Core" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
            />
            {/* Overlay Gradient: Orange focused */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-orange/40 via-bg-dark/20 to-transparent" />
            
            {/* Hero Text */}
            <div className="absolute bottom-10 left-10 text-white drop-shadow-lg">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter uppercase italic">
                Secure.<br/>
                Modern.<br/>
                Optimized.
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: MODULE SELECTION */}
        <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-6">
                <img src="/mooserage_icon.svg" alt="Mooserage Logo" className="w-14 h-14 rounded-2xl"/>
              </div>
              <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight uppercase italic">
                {homeData.welcomeTitle || "HI! Im Jade Atyla"}
              </h1>
              <p className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-widest leading-relaxed">
                {homeData.welcomeDescription || "Select an authorized module to enter the system."}
              </p>
            </div>

            {/* Navigation Options */}
            <div className="space-y-4">
              {homeData.features && homeData.features.length > 0 && (
                <>
                  {/* PRIMARY ACCESS: First item in the list */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-accent-orange uppercase tracking-[0.3em] ml-1">Primary Access</p>
                    <button 
                      onClick={() => onNavigate?.(homeData.features[0].targetPage)}
                      className="w-full bg-accent-orange hover:bg-accent-orange-hover text-white py-4 px-8 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-accent-orange/10 flex items-center justify-start gap-4"
                    >
                      <div className="shrink-0">{getIcon(homeData.features[0].icon)}</div>
                      <span>{homeData.features[0].title}</span>
                    </button>
                  </div>

                  {homeData.features.length > 1 && (
                    <>
                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border-light dark:border-border-dark border-dashed"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                          <span className="bg-white dark:bg-bg-dark-soft px-4 text-text-light-secondary font-bold tracking-[0.4em]">Sub-Modules</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {homeData.features.slice(1).map((feature: any, index: number) => (
                          <button 
                            key={index}
                            onClick={() => onNavigate?.(feature.targetPage)}
                            className="flex items-center justify-start gap-4 px-8 w-full bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark hover:border-accent-orange/50 text-text-light-primary dark:text-text-dark-primary py-3.5 rounded-xl font-bold text-xs transition-all active:scale-[0.98]"
                          >
                            <div className="text-accent-orange shrink-0">
                               {getIcon(feature.icon)}
                            </div>
                            <span>{feature.title}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-border-light dark:border-border-dark">
               <p className="text-[10px] text-text-light-secondary dark:text-text-dark-secondary font-bold uppercase tracking-[0.3em]">
                 Core v1.0.4 • Security Active • © 2026
               </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
