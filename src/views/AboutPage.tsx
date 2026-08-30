'use client'

import { Card } from '../components/ui/Card'
import { Markdown } from '../components/ui/Markdown'
import { Badge } from '../components/ui/Badge'
import { Accordion } from '../components/ui/Accordion'
import { TechIcon } from '../components/ui/TechIcon'
import { profile, education, experience, faq as faqData } from '../data'
import { EmptyState } from '../components/ui/EmptyState'
import { useEffect } from 'react'

interface AboutPageProps {
  onLoading?: (isLoading: boolean) => void
}

function AboutPage({ onLoading }: AboutPageProps) {
  const isLoading = false

  useEffect(() => {
    onLoading?.(isLoading)
  }, [isLoading, onLoading])

  if (!profile) {
    return (
      <EmptyState 
        title="Profile Offline" 
        message="The central profile node is not responding. Please initialize the profile document in Sanity CMS."
      />
    )
  }

  return (
    <div className="flex flex-col animate-fade-in scroll-smooth bg-white dark:bg-bg-dark">
      
      {/* SECTION 1: PROFESSIONAL PROFILE */}
      <section id="profile" className="px-4 py-8 sm:py-12 sm:px-10 lg:px-16 max-w-6xl mx-auto w-full">
        
        {/* Bio Hero */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-10">
          <div className="shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent-orange to-orange-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-3xl bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark flex items-center justify-center text-3xl font-bold text-accent-orange shadow-xl overflow-hidden">
                 {profile.avatar ? (
                   <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                 ) : (
                   profile.name?.split(' ').map((n: string) => n[0]).join('') || '?'
                 )}
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl bg-emerald-500 border-2 border-white dark:border-bg-dark flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="accent">BS Computer Science</Badge>
              {profile.openToWork && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Open to Work
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1 leading-tight">
              {profile.name}
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent-orange mb-3">
              {profile.title}
            </p>
            <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed max-w-2xl">
              {profile.bio || "Bio initialization in progress..."}
            </p>

            {profile.resume?.url && (
              <a
                href={profile.resume.url}
                download={profile.resume.filename}
                className="group mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-orange text-white text-[11px] font-bold uppercase tracking-[0.15em] shadow-md hover:bg-accent-orange-hover hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                {profile.resume.label || 'Download Resume'}
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-light-primary dark:text-text-dark-primary">Experience</h3>
                <div className="h-px flex-1 bg-border-light dark:border-border-dark opacity-20" />
              </div>
              <div className="space-y-6">
                {experience && experience.length > 0 ? (
                  experience.map((exp: any, i: number) => (
                    <div key={i} className="relative pl-6 border-l border-border-light dark:border-border-dark">
                      <div className="absolute top-1 -left-1.5 w-3 h-3 rounded-full bg-accent-orange shadow-[0_0_8px_rgba(255,69,50,0.4)]" />
                      <div>
                        <span className="text-[10px] font-bold text-accent-orange uppercase tracking-wider">{exp.period}</span>
                        <h4 className="text-base font-bold text-text-light-primary dark:text-text-dark-primary">{exp.role}</h4>
                        <p className="text-xs font-bold text-text-light-secondary opacity-60">{exp.company}</p>
                      </div>
                      <Markdown 
                        content={exp.description} 
                        className="text-xs text-text-light-secondary mt-2" 
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-text-light-secondary opacity-40 italic">Historical data not yet committed to ledger...</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-light-primary dark:text-text-dark-primary">Education</h3>
                <div className="h-px flex-1 bg-border-light dark:border-border-dark opacity-20" />
              </div>
              <div className="space-y-4">
                {education && education.length > 0 ? (
                  education.map((edu: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-bg-dark-soft border border-border-light dark:border-border-dark flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
                      {edu.schoolLogo ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white p-1 shrink-0 border border-border-light dark:border-border-dark">
                          <img src={edu.schoolLogo} alt="School Logo" className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" strokeWidth={1.5}/>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeWidth={1.5}/>
                          </svg>
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary">{edu.course || "Course/Degree TBD"}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-text-light-secondary opacity-80">
                          <span>{edu.attainment}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{edu.school}</span>
                        </div>
                        <p className="text-[10px] font-bold text-accent-orange uppercase tracking-wider mt-2 px-2 py-0.5 bg-accent-orange/5 border border-accent-orange/10 rounded inline-block">
                          {edu.schoolYear || "Academic period pending..."}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-text-light-secondary opacity-40 italic">Educational registry in compilation stage...</p>
                )}
              </div>
            </div>

          </div>

          {/* Side Column: Skills & Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent-orange mb-4">Technical Stack</h3>
              <div className="space-y-4">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill: string) => {
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

                    const logos = getLogos(skill);

                    return (
                      <div key={skill} className="space-y-2">
                        <span className="text-[10px] font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-wider">{skill}</span>
                        <div className="flex flex-wrap gap-2">
                          {logos.map(logo => (
                            <div key={logo} className="group/tech relative">
                              <div className="h-8 w-8 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-border-light dark:border-border-dark flex items-center justify-center transition-all hover:scale-105 hover:border-accent-orange shadow-2xs">
                                <TechIcon 
                                  name={logo} 
                                  className="w-full h-full object-contain grayscale opacity-60 group-hover/tech:grayscale-0 group-hover/tech:opacity-100 transition-all" 
                                />
                              </div>
                              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1 py-0.5 bg-bg-dark text-white text-[8px] font-bold rounded opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap capitalize">
                                {logo}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-text-light-secondary opacity-40 italic">Technical stack details are offline...</p>
                )}
              </div>
            </div>

            <Card className="p-4 bg-accent-orange/5 border-accent-orange/10 rounded-2xl">
               <h4 className="text-xs font-bold uppercase tracking-wider mb-3">Core Strengths</h4>
               <ul className="space-y-2">
                 {(profile.coreStrengths || []).map(s => (
                   <li key={s} className="flex items-center gap-2 text-xs font-semibold text-text-light-secondary">
                     <div className="h-1 w-1 rounded-full bg-accent-orange shrink-0" />
                     {s}
                   </li>
                 ))}
               </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 2: FAQ */}
      <section id="faq" className="px-4 py-8 sm:py-12 sm:px-10 lg:px-16 bg-slate-50 dark:bg-bg-dark-soft border-t border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-semibold text-accent-orange uppercase tracking-wider mb-1">Support Node</p>
          <h2 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight uppercase mb-4">Common Inquiries</h2>
          
          {faqData && faqData.length > 0 ? (
            <Card className="p-4 sm:p-6 bg-white dark:bg-bg-dark shadow-md rounded-2xl">
              <Accordion items={faqData.map(item => ({ id: item.id, title: item.title, content: item.content }))} />
            </Card>
          ) : (
            <EmptyState 
              title="Knowledge Base Empty" 
              message="No FAQ entries have been logged in the system."
            />
          )}
        </div>
      </section>

    </div>
  )
}

export default AboutPage
