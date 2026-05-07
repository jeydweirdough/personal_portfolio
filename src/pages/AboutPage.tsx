import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Accordion } from '../components/ui/Accordion'
import { ProgressBar } from '../components/ui/ProgressBar'
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
            <div className="flex flex-wrap gap-4">
               <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                 <Button variant="primary" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
                   Download CV
                 </Button>
               </a>
               <Button variant="outline">{profile.phone}</Button>
            </div>
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
              <div className="space-y-6">
                {profile.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary">{skill.name}</span>
                      <span className="text-[10px] font-black text-accent-orange">{skill.level}%</span>
                    </div>
                    <ProgressBar progress={skill.level} size="xs" />
                  </div>
                ))}
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
