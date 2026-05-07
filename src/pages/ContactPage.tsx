import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input, Textarea } from '../components/ui/Input'
import socialsData from '../data/socials.json'
import profile from '../data/profile.json'

interface SocialItemProps {
  name: string
  url: string
  icon: React.ReactNode
}

function SocialItem({ name, url, icon }: SocialItemProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`

  return (
    <div className="relative group">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all duration-500 shadow-sm hover:shadow-lg"
      >
        {icon}
      </a>

      {/* QR Code Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
        <div className="bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark rounded-2xl p-4 shadow-2xl relative w-40 text-center backdrop-blur-md">
           <p className="text-[9px] font-black text-accent-orange uppercase tracking-[0.2em] mb-3">Scan Connection</p>
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

function ContactPage() {
  const handleSend = () => {
    const subject = encodeURIComponent(`Project Inquiry - Portfolio`)
    const body = encodeURIComponent(`Hello ${profile.name},\n\nI'm interested in discussing a project with you.\n\n[Your message here]\n\nBest regards,`)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')
  }

  const socialIcons: Record<string, React.ReactNode> = {
    GitHub: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
    LinkedIn: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
    Viber: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.7 16.68c0-.72-.11-1.39-.32-2.02-.21-.63-.53-1.22-.96-1.75-.43-.53-.96-1.01-1.61-1.42-.65-.41-1.42-.73-2.31-.96-.89-.23-1.89-.35-2.99-.35h-.95v6.5h.95c1.1 0 2.1-.12 2.99-.35.89-.23 1.66-.55 2.31-.96.65-.41 1.18-.89 1.61-1.42.43-.53.75-1.12.96-1.75.21-.63.32-1.3.32-2.02zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-4.3 4.68c0-1.26-.26-2.45-.78-3.57-.52-1.12-1.24-2.11-2.16-2.97-.92-.86-2-1.54-3.24-2.04-1.24-.5-2.61-.75-4.11-.75h-2.16v13.31h2.16c1.5 0 2.87-.25 4.11-.75 1.24-.5 2.32-1.18 3.24-2.04.92-.86 1.64-1.85 2.16-2.97.52-1.12.78-2.31.78-3.57z"/></svg>,
    WhatsApp: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.928 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.273.607-1.446.159-.174.346-.217.462-.217l.332.006c.118.005.23.009.33.221.124.285.426 1.039.463 1.113.036.075.061.161.012.26-.046.099-.068.162-.137.245-.069.082-.146.182-.208.245-.071.074-.147.155-.063.301.084.146.374.618.801 1.003.548.496 1.012.651 1.155.73.144.079.23.065.314-.019.084-.083.362-.423.459-.569.096-.146.192-.124.324-.075.132.049.833.393.978.465.145.072.242.108.278.168.036.061.036.35-.108.755zm-3.423 9.584c-5.451 0-9.885-4.436-9.885-9.887 0-5.451 4.434-9.885 9.885-9.885s9.886 4.434 9.886 9.885c0 5.451-4.435 9.887-9.886 9.887z"/></svg>
  };

  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12 sm:px-10 space-y-24">
        
        {/* Section 1: Direct Contact Hero (Matches Sidebar ID) */}
        <section id="direct-contact" className="animate-fade-in flex flex-col items-center text-center pt-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-accent-orange/5 border border-accent-orange/10 mb-6">
            <div className="w-1 h-1 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-orange">Ready for Collaboration</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-text-light-primary dark:text-text-dark-primary tracking-tighter mb-6 leading-tight">
            Let's keep in <span className="text-accent-orange italic underline decoration-accent-orange/20 underline-offset-4">touch</span>.
          </h1>
          
          <p className="text-[10px] font-bold text-text-light-secondary dark:text-text-dark-secondary opacity-40 max-w-sm mx-auto mb-10 uppercase tracking-[0.15em] leading-relaxed">
            Direct access to design support. Initialize connection via secure protocol.
          </p>

          <div className="flex flex-col items-center gap-8 w-full max-w-xs">
             <button 
                onClick={handleSend}
                className="group relative w-full py-4 rounded-2xl bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark text-[10px] font-black uppercase tracking-[0.3em] text-text-light-primary dark:text-text-dark-primary hover:border-accent-orange transition-all duration-500 shadow-xl overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-accent-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-4 h-4 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2}/></svg>
                  Deliver Message
                </span>
              </button>

              <div className="flex justify-center gap-4">
                {socialsData.map((social) => (
                  <SocialItem 
                    key={social.id}
                    {...social}
                    icon={socialIcons[social.name]}
                  />
                ))}
              </div>
          </div>
        </section>

        {/* Section 2: Inquiry Form (Matches Sidebar ID) */}
        <section id="support-form" className="w-full">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-[9px] font-black text-accent-orange uppercase tracking-[0.3em] mb-2 opacity-60">Protocol 02</p>
              <h2 className="text-2xl font-black text-text-light-primary dark:text-text-dark-primary tracking-tighter uppercase">Inquiry Interface</h2>
            </div>
            <p className="text-[10px] font-medium text-text-light-secondary opacity-40 max-w-[200px] sm:text-right uppercase tracking-tighter leading-tight">
              Standard structured data submission for detailed project proposals.
            </p>
          </div>

          <Card className="p-6 sm:p-10 bg-slate-50/30 dark:bg-bg-dark-soft/20 border-dashed backdrop-blur-sm rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
               <Input label="Identity / Name" placeholder="Jane Doe" className="bg-transparent text-xs" />
               <Input label="Access Point / Email" placeholder="jane@example.com" className="bg-transparent text-xs" />
            </div>
            <div className="space-y-6">
               <Textarea label="Payload / Message" placeholder="Describe your vision..." rows={5} className="bg-transparent text-xs" />
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 text-emerald-500">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Encrypted</span>
                  </div>
                  <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-[9px] font-black uppercase tracking-[0.2em]">Deploy Payload</Button>
               </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default ContactPage
