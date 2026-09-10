'use client'

import { Input, Textarea } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { profile, socials } from '../data'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

interface ContactPageProps {
  onLoading?: (isLoading: boolean) => void
}

type FieldErrors = { name?: string; email?: string; message?: string }
type SendStatus = 'idle' | 'sending' | 'success' | 'error'

function ContactPage({ onLoading }: ContactPageProps) {
  useEffect(() => {
    onLoading?.(false)
  }, [onLoading])

  // Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (and in Vercel) to deliver
  // messages straight to your inbox. Without it the form still works, but it
  // falls back to opening a prefilled email draft the visitor sends themselves.
  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

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
    if (!form.name.trim()) next.name = 'Enter your name so I know who is asking.'

    const email = form.email.trim()
    if (!email) next.email = 'Enter an email so I can reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email address looks invalid.'

    const message = form.message.trim()
    if (!message) next.message = 'Describe what needs building or fixing.'
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
      const subject = encodeURIComponent(`Service request from ${form.name.trim()}`)
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
          subject: `Service request from ${form.name.trim()}`,
          from_name: 'Portfolio service request',
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })
      const data = await res.json().catch(() => null)

      if (res.ok && data?.success) {
        setStatus('success')
        setStatusNote('Request logged. I will get back to you as soon as I can.')
        setForm({ name: '', email: '', message: '', botcheck: '' })
      } else {
        setStatus('error')
        setStatusNote(
          data?.message || `Could not send (${res.status}). Email me directly instead.`
        )
      }
    } catch {
      setStatus('error')
      setStatusNote('Network error. Email me directly instead.')
    }
  }

  /** Direct channels as ruled rows — every one of these works on a phone. */
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    ...(socials ?? []).map((s: any) => ({
      label: s.name,
      value: s.name === 'GitHub' || s.name === 'LinkedIn' ? s.url.replace('https://', '') : profile.phone,
      href: s.url,
    })),
  ]

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      {/* What happens next, then the direct channels. */}
      <div>
        <p className="max-w-[52ch] text-[clamp(1rem,1.7vw,1.25rem)] leading-relaxed text-[var(--plate-ink)]">
          Tell me what is broken, manual, or missing. If it is something I can
          take on, I will say so — and if it is not, I will say that too.
        </p>

        <dl className="mt-10 m-0 border-t border-[var(--plate-rule)]">
          {channels.map((c) => (
            <div
              key={c.label}
              className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4 border-b border-[var(--plate-rule)] py-3.5"
            >
              <dt className="stencil text-[var(--plate-ink-dim)]">{c.label}</dt>
              <dd className="m-0 min-w-0">
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block truncate text-[15px] text-[var(--plate-ink)] underline decoration-[var(--plate-rule)] transition-colors hover:decoration-current"
                >
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <p className="stencil mt-5 text-[var(--plate-ink-dim)]">
          Based in {profile.location} · Remote work fine
        </p>
      </div>

      {/* The request itself. */}
      <form onSubmit={handleSubmit} noValidate className="border border-[var(--plate-rule)] p-5 sm:p-8">
        <p className="stencil mb-6 border-b border-[var(--plate-rule)] pb-3 text-[var(--plate-ink-dim)]">
          Service request
        </p>

        {/* Honeypot — hidden from people, tempting to bots */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          checked={form.botcheck !== ''}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, botcheck: e.target.checked ? 'bot' : '' }))
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Your name"
            name="name"
            autoComplete="name"
            placeholder="Maria Santos"
            value={form.name}
            onChange={update('name')}
            error={errors.name}
            disabled={status === 'sending'}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="maria@company.ph"
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            disabled={status === 'sending'}
          />
        </div>

        <div className="mt-5">
          <Textarea
            label="What needs building or fixing"
            name="message"
            placeholder="We track stock in a spreadsheet and it keeps going out of sync."
            rows={5}
            value={form.message}
            onChange={update('message')}
            error={errors.message}
            disabled={status === 'sending'}
          />
        </div>

        <div className="mt-6 flex flex-col-reverse items-stretch gap-4 border-t border-[var(--plate-rule)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-5 flex items-start gap-2.5" role="status" aria-live="polite">
            {status !== 'idle' && status !== 'sending' && (
              <>
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 shrink-0 ${
                    status === 'success' ? 'bg-[var(--plate-signal)]' : 'bg-[var(--plate-caution)]'
                  }`}
                />
                <p
                  className={`m-0 max-w-[40ch] text-[15px] leading-snug ${
                    status === 'success' ? 'text-[var(--plate-ink)]' : 'text-[var(--plate-caution)]'
                  }`}
                >
                  {statusNote}
                </p>
              </>
            )}
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={status === 'sending'}>
            {status === 'sending' ? 'Sending' : 'Send request'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactPage
