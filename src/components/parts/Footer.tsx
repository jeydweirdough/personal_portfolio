'use client'

interface FooterProps {
  profile: any
  socials?: any[]
}

/** The maker's plate: who made it, where it sits, when it was stamped. */
function Footer({ profile, socials }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="plate-field">
      <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="border-x border-[var(--plate-rule)] px-4 sm:px-8 lg:px-12 py-10">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="plate-display m-0 text-2xl uppercase sm:text-3xl">
                {profile?.name}
              </p>
              <p className="stencil mt-2 text-[var(--plate-ink-dim)]">
                {profile?.title} · {profile?.location}
              </p>
            </div>

            {socials && socials.length > 0 && (
              <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
                {socials.map((s: any) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="stencil text-[var(--plate-ink-dim)] transition-colors hover:text-[var(--plate-ink)]"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="stencil mt-10 border-t border-[var(--plate-rule)] pt-4 text-[var(--plate-ink-dim)]">
            © {year} {profile?.name} · Built and maintained by the person it describes
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
