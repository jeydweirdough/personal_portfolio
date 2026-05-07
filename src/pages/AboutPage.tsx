import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Accordion } from '../components/ui/Accordion'
import faqData from '../data/faq.json'
import profile from '../data/profile.json'

function AboutPage() {
  return (
    <div className="flex flex-col animate-fade-in scroll-smooth bg-white dark:bg-bg-dark min-h-screen">
      
      {/* SECTION 1: PROFESSIONAL PROFILE (Matches Sidebar ID) */}
      <section id="profile" className="px-6 py-12 sm:px-10 lg:px-16 max-w-6xl mx-auto w-full">
        
        {/* Bio Hero */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <div className="shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent-orange to-orange-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-40 w-40 rounded-3xl bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark flex items-center justify-center text-4xl font-black text-accent-orange shadow-2xl overflow-hidden">
                 {profile.avatar ? (
                   <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                 ) : (
                   profile.name.split(' ').map(n => n[0]).join('')
                 )}
              </div>
              <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-2xl bg-emerald-500 border-4 border-white dark:border-bg-dark flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Badge variant="accent" className="mb-4">BS Computer Science</Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-text-light-primary dark:text-text-dark-primary tracking-tighter mb-4 leading-tight">
              {profile.name}
            </h1>
            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary leading-relaxed max-w-2xl mb-8">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column: Experience & Education */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Experience */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xl font-black uppercase tracking-widest text-text-light-primary dark:text-text-dark-primary italic">Experience</h3>
                <div className="h-px flex-1 bg-border-light dark:border-border-dark opacity-20" />
              </div>
              <div className="space-y-12">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-border-light dark:border-border-dark">
                    <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-accent-orange shadow-[0_0_8px_rgba(255,69,50,0.4)]" />
                    <div className="mb-1">
                      <span className="text-[10px] font-black text-accent-orange uppercase tracking-widest">{exp.period}</span>
                      <h4 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">{exp.role}</h4>
                      <p className="text-sm font-bold text-text-light-secondary opacity-60">{exp.company}</p>
                    </div>
                    <p className="text-sm text-text-light-secondary leading-relaxed mt-4">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xl font-black uppercase tracking-widest text-text-light-primary dark:text-text-dark-primary italic">Education</h3>
                <div className="h-px flex-1 bg-border-light dark:border-border-dark opacity-20" />
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-bg-dark-soft border border-border-light dark:border-border-dark border-dashed">
                <h4 className="font-bold text-text-light-primary dark:text-text-dark-primary">{profile.degree}</h4>
                <p className="text-sm text-text-light-secondary mt-1">{profile.education}</p>
              </div>
            </div>

          </div>

          {/* Side Column: Skills & Details */}
          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-8">Technical Stack</h3>
              <div className="space-y-8">
                {profile.skills.map(skill => {
                  const getLogos = (name: string) => {
                    const n = name.toLowerCase();
                    const logos: string[] = [];
                    if (n.includes('frontend')) logos.push('react', 'typescript', 'html5', 'css3', 'tailwind-css');
                    if (n.includes('backend')) logos.push('nodedotjs', 'express', 'typescript', 'fastapi', 'django');
                    if (n.includes('database')) logos.push('supabase', 'firebase', 'mongodb', 'mysql');
                    if (n.includes('it support')) logos.push('windows', 'microsoft-office', 'chrome');
                    if (n.includes('ai management')) logos.push('openai-chatgpt', 'google-gemini', 'claude', 'ai-studio-google', 'ollama');
                    if (n.includes('wordpress')) logos.push('wordpress', 'zoho');
                    return logos;
                  };

                  const logos = getLogos(skill.name);

                  return (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-widest">{skill.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {logos.map(logo => (
                          <div key={logo} className="group relative">
                            <div className="h-10 w-10 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center transition-all hover:scale-110 hover:border-accent-orange hover:shadow-lg hover:shadow-accent-orange/10">
                              <img
                                src={`https://thesvg.org/icons/${logo}/${
                                  ['mysql', 'ollama'].includes(logo) ? 'light' : 'default'
                                }.svg`}
                                alt={logo}
                                className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                onError={(e) => {
                                  ;(e.currentTarget as HTMLImageElement).src = `https://cdn.svgl.app/library/${logo}.svg`
                                }}
                              />
                            </div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-bg-dark text-white text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none capitalize tracking-tighter">
                              {logo}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="p-6 bg-accent-orange/5 border-accent-orange/10">
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Core Strengths</h4>
               <ul className="space-y-3">
                 {['Problem Solving', 'Adaptability', 'Attention to Detail', 'Teamwork'].map(s => (
                   <li key={s} className="flex items-center gap-3 text-xs font-bold text-text-light-secondary">
                     <div className="h-1 w-1 rounded-full bg-accent-orange" />
                     {s}
                   </li>
                 ))}
               </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 2: FAQ (Matches Sidebar ID) */}
      <section id="faq" className="px-6 py-24 sm:px-10 lg:px-16 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.3em] mb-3">Support Node</p>
          <h2 className="text-3xl font-black text-text-light-primary dark:text-text-dark-primary tracking-tighter uppercase mb-10">Common Inquiries</h2>
          <Card className="p-6 bg-white dark:bg-bg-dark shadow-xl"><Accordion items={faqData} /></Card>
        </div>
      </section>

    </div>
  )
}

export default AboutPage
