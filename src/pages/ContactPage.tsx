import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input, Textarea } from '../components/ui/Input'
import { useSanityData } from '../hooks/useSanity'
import { useEffect } from 'react'
import { Skeleton } from '../components/ui/Skeleton'

interface SocialItemProps {
  name: string
  url: string
}

function SocialItem({ name, url }: SocialItemProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="relative group">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all duration-500 shadow-sm hover:shadow-lg p-2.5"
      >
        <img
          src={`https://thesvg.org/icons/${slug}/default.svg`}
          alt={name}
          className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = `https://cdn.svgl.app/library/${slug}.svg`
          }}
        />
      </a>

      {/* QR Code Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
        <div className="bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark rounded-2xl p-4 shadow-2xl relative w-40 text-center backdrop-blur-md">
           <p className="text-xs font-bold text-accent-orange uppercase tracking-[0.2em] mb-3">Scan Connection</p>
           <div className="aspect-square w-full rounded-lg bg-white p-1 mb-3 border border-slate-50">
              <img src={qrUrl} alt={`${name} QR Code`} className="w-full h-full object-contain" />
           </div>
           <p className="text-[8px] text-text-light-secondary opacity-40 font-mono uppercase tracking-tighter">
             {url.replace('https://', '')}
           </p>
           <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-bg-dark-soft border-b border-r border-border-light dark:border-border-dark rotate-45 -mt-2 shadow-sm"></div>
        </div>
      </div>
    </div>
  )
}

interface ContactPageProps {
  onLoading?: (isLoading: boolean) => void
}

function ContactPage({ onLoading }: ContactPageProps) {
  const { data: profile, loading: profileLoading } = useSanityData<any>(`*[_type == "profile"][0]`)
  const { data: socials, loading: socialsLoading } = useSanityData<any[]>(`*[_type == "social"]`)

  const isLoading = profileLoading || socialsLoading

  useEffect(() => {
    onLoading?.(isLoading)
  }, [isLoading, onLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-bg-dark transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-12 sm:px-10 space-y-24">
          
          {/* Section 1 Skeleton: Direct Contact */}
          <section className="flex flex-col items-center text-center pt-6 space-y-8">
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="h-16 w-3/4 max-w-lg" />
            <Skeleton className="h-8 w-1/2 max-w-sm" />
            
            <div className="w-full max-w-xs space-y-6">
              <Skeleton className="h-14 w-full rounded-2xl" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>
            </div>
          </section>

          {/* Section 2 Skeleton: Inquiry Form */}
          <section className="w-full space-y-8">
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-48" />
              </div>
              <Skeleton className="h-10 w-40" />
            </div>

            <div className="p-6 sm:p-10 border border-border-light dark:border-border-dark border-dashed rounded-3xl space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Skeleton className="h-4 w-20" />
                   <Skeleton className="h-10 w-full rounded-lg" />
                 </div>
                 <div className="space-y-2">
                   <Skeleton className="h-4 w-20" />
                   <Skeleton className="h-10 w-full rounded-lg" />
                 </div>
               </div>
               <div className="space-y-2">
                 <Skeleton className="h-4 w-20" />
                 <Skeleton className="h-40 w-full rounded-lg" />
               </div>
               <div className="flex items-center justify-between pt-4">
                 <Skeleton className="h-4 w-24" />
                 <Skeleton className="h-10 w-32 rounded-lg" />
               </div>
            </div>
          </section>

        </div>
      </div>
    )
  }

  const handleSend = () => {
    if (!profile) return
    const subject = encodeURIComponent(`Project Inquiry - Portfolio`)
    const body = encodeURIComponent(`Hello ${profile.name},\n\nI'm interested in discussing a project with you.\n\n[Your message here]\n\nBest regards,`)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')
  }



  // Centralized loading is handled in App.tsx

  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-10 space-y-16 sm:space-y-24">
        
        {/* Section 1: Direct Contact Hero (Matches Sidebar ID) */}
        <section id="direct-contact" className="animate-fade-in flex flex-col items-center text-center pt-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-accent-orange/5 border border-accent-orange/10 mb-6">
            <div className="w-1 h-1 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-orange">Ready for Collaboration</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight mb-3 sm:mb-4 leading-snug">
            Let's keep in <span className="text-accent-orange italic">touch</span>.
          </h1>
          
          <p className="text-xs font-bold text-text-light-secondary dark:text-text-dark-secondary opacity-40 max-w-sm mx-auto mb-10 uppercase tracking-[0.15em] leading-relaxed">
            Direct access to streamline emails. <br/>Let's connect and discuss your ideas.
          </p>

          <div className="flex flex-col items-center gap-8 w-full max-w-xs">
              <button 
                onClick={handleSend}
                className="group relative w-full py-3 sm:py-4 rounded-2xl bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark text-xs font-bold uppercase tracking-[0.3em] text-text-light-primary dark:text-text-dark-primary hover:border-accent-orange transition-all duration-500 shadow-xl overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-accent-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-4 h-4 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2}/></svg>
                  Deliver Message
                </span>
              </button>

              <div className="flex justify-center gap-4">
                {socials?.map((social) => (
                  <SocialItem 
                    key={social._id}
                    {...social}
                  />
                ))}
              </div>
          </div>
        </section>

        {/* Section 2: Inquiry Form (Matches Sidebar ID) */}
        <section id="support-form" className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div className="text-left">
              <p className="text-xs font-bold text-accent-orange uppercase tracking-[0.3em] mb-2 opacity-60">Email</p>
              <h2 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight uppercase">Inquiry Form</h2>
            </div>
            <p className="text-xs font-medium text-text-light-secondary opacity-40 max-w-[200px] text-left sm:text-right uppercase tracking-tighter leading-tight">
              We can connect here for any project discussions.
            </p>
          </div>

          <Card className="p-6 sm:p-10 bg-slate-50/30 dark:bg-bg-dark-soft/20 border-dashed backdrop-blur-sm rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
               <Input label="Name" placeholder="Jane Doe" className="bg-transparent text-xs" />
               <Input label="Email" placeholder="jane@example.com" className="bg-transparent text-xs" />
            </div>
            <div className="space-y-6">
               <Textarea label="Message" placeholder="Describe your vision..." rows={5} className="bg-transparent text-xs" />
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 text-emerald-500">
                  </div>
                  <Button variant="primary" size="md" className="w-full sm:w-auto font-bold uppercase tracking-[0.2em]">Deploy Payload</Button>
               </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default ContactPage

