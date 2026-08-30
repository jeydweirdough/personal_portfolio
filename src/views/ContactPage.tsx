'use client'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input, Textarea } from '../components/ui/Input'
import { profile, socials } from '../data'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

interface SocialItemProps {
  name: string
  url: string
  link_svg?: string
}

function SocialItem({ name, url, link_svg }: SocialItemProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(url)}`
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const src = link_svg 
    ? `https://thesvg.org/icons/${link_svg}`
    : `https://thesvg.org/icons/${slug}/default.svg`

  return (
    <div className="relative group">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all duration-500 shadow-sm hover:shadow-lg p-2.5"
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            if (target.src.includes('thesvg.org')) {
              const fallbackSlug = link_svg ? link_svg.split('/')[0] : slug
              target.src = `https://cdn.svgl.app/library/${fallbackSlug}.svg`
            }
          }}
        />
      </a>

      {/* QR Code Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
        <div className="bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark rounded-2xl p-4 shadow-2xl relative w-40 text-center backdrop-blur-md">
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
  const isLoading = false

  useEffect(() => {
    onLoading?.(isLoading)
  }, [isLoading, onLoading])

  // Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (and in Vercel) to deliver
  // messages straight to your inbox. Without it the form still works, but it
  // falls back to opening a prefilled email draft the visitor sends themselves.
  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

  type FieldErrors = { name?: string; email?: string; message?: string }
  type SendStatus = 'idle' | 'sending' | 'success' | 'error'

  const [form, setForm] = useState({ name: '', email: '', message: '', botcheck: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SendStatus>('idle')
  const [statusNote, setStatusNote] = useState('')

  const update =
    (field: 'name' | 'email' | 'message') =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target
      setForm((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      setStatus((prev) => (prev === 'idle' || prev === 'sending' ? prev : 'idle'))
    }

  const validate = () => {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'

    const email = form.email.trim()
    if (!email) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email address looks invalid.'

    const message = form.message.trim()
    if (!message) next.message = 'Please write a short message.'
    else if (message.length < 10) next.message = 'A little more detail, please (10+ characters).'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    if (form.botcheck) return // honeypot tripped — drop it silently
    if (!validate()) return

    // No form service wired up yet: hand the visitor a prefilled draft instead
    // of pretending to send. Nothing is silently lost this way.
    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name.trim()}`)
      const body = encodeURIComponent(
        `${form.message.trim()}\n\n---\n${form.name.trim()}\n${form.email.trim()}`
      )
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`,
        '_blank',
        'noopener,noreferrer'
      )
      setStatus('success')
      setStatusNote('Draft opened in your mail app — press send there to deliver it.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio inquiry from ${form.name.trim()}`,
          from_name: 'Portfolio Contact Form',
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })
      const data = await res.json().catch(() => null)

      if (res.ok && data?.success) {
        setStatus('success')
        setStatusNote('Message sent. I will get back to you as soon as I can.')
        setForm({ name: '', email: '', message: '', botcheck: '' })
      } else {
        setStatus('error')
        setStatusNote(data?.message || `Could not send (${res.status}). Please email me directly instead.`)
      }
    } catch {
      setStatus('error')
      setStatusNote('Network error. Please email me directly instead.')
    }
  }

  const handleSend = () => {
    if (!profile) return
    const subject = encodeURIComponent(`Project Inquiry - Portfolio`)
    const body = encodeURIComponent(`Hello ${profile.name},\n\nI'm interested in discussing a project with you.\n\n[Your message here]\n\nBest regards,`)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')
  }



  return (
    <div className="bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-10 space-y-8 sm:space-y-10">
        
        {/* Section 1: Direct Contact Hero */}
        <section id="direct-contact" className="animate-fade-in flex flex-col items-center text-center pt-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent-orange/5 border border-accent-orange/10 mb-3">
            <div className="w-1 h-1 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange">Ready for Collaboration</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight mb-2 leading-snug">
            Let&apos;s keep in <span className="text-accent-orange italic">touch</span>.
          </h1>
          
          <p className="text-[11px] font-bold text-text-light-secondary dark:text-text-dark-secondary opacity-50 max-w-sm mx-auto mb-6 uppercase tracking-[0.12em] leading-relaxed">
            Direct access to streamline emails. <br/>Let&apos;s connect and discuss your ideas.
          </p>

          <div className="flex flex-col items-center gap-5 w-full max-w-xs">
              <button 
                onClick={handleSend}
                className="group relative w-full py-2.5 sm:py-3 rounded-xl bg-white dark:bg-bg-dark-soft border border-border-light dark:border-border-dark text-[11px] font-bold uppercase tracking-[0.2em] text-text-light-primary dark:text-text-dark-primary hover:border-accent-orange transition-all duration-300 shadow-md overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-accent-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2}/></svg>
                  Deliver Message
                </span>
              </button>

              <div className="flex justify-center gap-3">
                {socials?.map((social) => (
                  <SocialItem 
                    key={social.id}
                    {...social}
                  />
                ))}
              </div>
          </div>
        </section>

        {/* Section 2: Inquiry Form */}
        <section id="support-form" className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-2">
            <div className="text-left">
              <p className="text-[10px] font-bold text-accent-orange uppercase tracking-[0.2em] mb-0.5 opacity-60">Email</p>
              <h2 className="text-sm sm:text-base font-bold text-text-light-primary dark:text-text-dark-primary tracking-tight uppercase">Inquiry Form</h2>
            </div>
            <p className="text-[11px] font-medium text-text-light-secondary opacity-40 max-w-[200px] text-left sm:text-right uppercase tracking-tight leading-tight">
              We can connect here for any project discussions.
            </p>
          </div>

          <Card className="p-4 sm:p-6 bg-slate-50/30 dark:bg-bg-dark-soft/20 border-dashed backdrop-blur-sm rounded-2xl">
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from people, tempting to bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                checked={form.botcheck !== ''}
                onChange={(e) => setForm((prev) => ({ ...prev, botcheck: e.target.checked ? 'bot' : '' }))}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Name"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={update('name')}
                  error={errors.name}
                  disabled={status === 'sending'}
                  className="bg-transparent text-xs"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                  disabled={status === 'sending'}
                  className="bg-transparent text-xs"
                />
              </div>

              <div className="space-y-4">
                <Textarea
                  label="Message"
                  name="message"
                  placeholder="Describe your vision..."
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  error={errors.message}
                  disabled={status === 'sending'}
                  className="bg-transparent text-xs"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border-light dark:border-border-dark">
                  <div
                    className="flex items-start gap-2 min-h-5 order-2 sm:order-1"
                    role="status"
                    aria-live="polite"
                  >
                    {status === 'success' && (
                      <>
                        <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 leading-tight text-left">{statusNote}</p>
                      </>
                    )}
                    {status === 'error' && (
                      <>
                        <svg className="w-4 h-4 text-red-500 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-[11px] font-medium text-red-500 leading-tight text-left">{statusNote}</p>
                      </>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={status === 'sending'}
                    className="w-full sm:w-auto font-bold uppercase tracking-[0.15em] text-xs order-1 sm:order-2"
                  >
                    {status === 'sending' ? 'Sending' : 'Deploy Payload'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </section>

      </div>
    </div>
  )
}

export default ContactPage

