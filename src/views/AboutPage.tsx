'use client'

import { useEffect } from 'react'
import { Accordion } from '../components/ui/Accordion'
import { PlateSection, RecordRow, Bolts, Mark } from '../components/ui/Plate'
import { profile, education, experience, faq as faqData } from '../data'
import { EmptyState } from '../components/ui/EmptyState'

interface AboutPageProps {
  onLoading?: (isLoading: boolean) => void
}

function AboutPage({ onLoading }: AboutPageProps) {
  useEffect(() => {
    onLoading?.(false)
  }, [onLoading])

  if (!profile) {
    return <EmptyState title="Record unavailable" message="The profile record could not be read." />
  }

  return (
    <>
      <PlateSection id="profile" label="Equipment record" note={profile.location}>
        {/* Nameplate: the photo is a plate like everything else, squared and ruled. */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-12">
          <div className="relative w-40 shrink-0 border border-[var(--plate-rule)] lg:w-full">
            <Bolts />
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={`${profile.name}, ${profile.title}`}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="plate-display grid aspect-square w-full place-items-center text-4xl text-[var(--plate-ink-dim)]">
                {profile.name?.split(' ').map((n: string) => n[0]).join('')}
              </div>
            )}
            <p className="stencil border-t border-[var(--plate-rule)] px-2.5 py-2 text-[var(--plate-ink-dim)]">
              {education?.[0]?.attainment === 'Graduate' ? 'BSCS · Graduate' : 'On file'}
            </p>
          </div>

          <p className="max-w-[64ch] text-[clamp(1rem,1.7vw,1.25rem)] leading-relaxed text-[var(--plate-ink)]">
            {profile.bio}
          </p>
        </div>

        <dl className="m-0">
          <RecordRow label="Employed">
            <div className="space-y-6">
              {experience?.length ? (
                experience.map((exp: any, i: number) => (
                  <div key={i}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="m-0 text-lg font-semibold leading-snug">{exp.role}</h3>
                      <span className="stencil text-[var(--plate-ink-dim)]">{exp.period}</span>
                    </div>
                    <p className="stencil mt-1 text-[var(--plate-ink-dim)]">{exp.company}</p>
                    <p className="mt-2.5 max-w-[64ch] text-[15px] leading-relaxed text-[var(--plate-ink-dim)]">
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[var(--plate-ink-dim)]">No employment recorded.</p>
              )}
            </div>
          </RecordRow>

          <RecordRow label="Schooling">
            {education?.length ? (
              education.map((edu: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  {edu.schoolLogo && (
                    <img
                      src={edu.schoolLogo}
                      alt=""
                      aria-hidden="true"
                      className="mt-1 h-10 w-10 shrink-0 border border-[var(--plate-rule)] bg-white object-contain p-1"
                    />
                  )}
                  <div>
                    <h3 className="m-0 text-lg font-semibold leading-snug">{edu.course}</h3>
                    <p className="stencil mt-1.5 text-[var(--plate-ink-dim)]">
                      {edu.school} · {edu.schoolYear} · {edu.attainment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[var(--plate-ink-dim)]">No schooling recorded.</p>
            )}
          </RecordRow>

          {/* Type only. The real per-project stacks are evidenced in the schedule
              below, so this row names the capability and lets the records prove it —
              rather than pasting vendor logos, which is the skills grid this site
              exists to refuse. */}
          <RecordRow label="Rated for">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-0 p-0 sm:grid-cols-2">
              {profile.skills?.map((skill: string) => (
                <li
                  key={skill}
                  className="border-b border-[var(--plate-rule)] py-2 text-[15px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </RecordRow>

          <RecordRow label="Works like">
            <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-2 p-0">
              {(profile.coreStrengths || []).map((s: string) => (
                <li key={s} className="text-[15px] text-[var(--plate-ink)]">
                  {s}
                </li>
              ))}
            </ul>
          </RecordRow>

          <RecordRow label="Documents">
            {profile.resume?.url ? (
              <a
                href={profile.resume.url}
                download={profile.resume.filename}
                className="inline-flex items-center gap-1.5 text-[15px] underline decoration-[var(--plate-rule)] hover:decoration-current"
              >
                {profile.resume.label || 'Download resume'}
                <Mark dir="down" />
              </a>
            ) : (
              <span className="text-[var(--plate-ink-dim)]">None on file</span>
            )}
          </RecordRow>

          <RecordRow label="Reachable at" className="border-b border-[var(--plate-rule)]">
            <div className="flex flex-col gap-1.5">
              <a
                href={`mailto:${profile.email}`}
                className="text-[15px] underline decoration-[var(--plate-rule)] hover:decoration-current"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="text-[15px] underline decoration-[var(--plate-rule)] hover:decoration-current"
              >
                {profile.phone}
              </a>
            </div>
          </RecordRow>
        </dl>
      </PlateSection>

      {faqData && faqData.length > 0 && (
        <PlateSection id="faq" label="Before you ask" note={`${faqData.length} entries`}>
          <div className="max-w-4xl">
            <Accordion
              items={faqData.map((item: any) => ({
                id: item.id,
                title: item.title,
                content: item.content,
              }))}
            />
          </div>
        </PlateSection>
      )}
    </>
  )
}

export default AboutPage
