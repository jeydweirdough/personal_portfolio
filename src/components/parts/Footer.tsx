import profile from '../../data/profile.json'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-6 py-12 sm:px-10 lg:px-16 border-t border-border-light dark:border-border-dark bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section 3: Metadata / Specs (Pulled from ProjectDetails aesthetic) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 opacity-40">
           <div>
             <p className="text-[9px] font-black text-text-light-primary dark:text-text-dark-primary uppercase tracking-[0.2em] mb-3">Node Location</p>
             <p className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight">{profile.location}</p>
             <p className="text-[9px] font-medium text-text-light-secondary mt-1 tracking-tighter uppercase">GTM+8 Region</p>
           </div>
           <div>
             <p className="text-[9px] font-black text-text-light-primary dark:text-text-dark-primary uppercase tracking-[0.2em] mb-3">System Status</p>
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-tight">{profile.status}</p>
             </div>
             <p className="text-[9px] font-medium text-text-light-secondary mt-1 tracking-tighter uppercase">Verified Live</p>
           </div>
           <div>
             <p className="text-[9px] font-black text-text-light-primary dark:text-text-dark-primary uppercase tracking-[0.2em] mb-3">Response Time</p>
             <p className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight">~24 Hours</p>
             <p className="text-[9px] font-medium text-text-light-secondary mt-1 tracking-tighter uppercase">Standard Service</p>
           </div>
        </section>

        <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-center gap-4 opacity-10">
           <p className="text-[8px] font-black uppercase tracking-[1em] text-text-light-secondary">
             Mooserage Terminal v4.2.5
           </p>
           <p className="text-[8px] font-black uppercase tracking-[0.4em] text-text-light-secondary">
             © {year} All Protocols Reserved
           </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer