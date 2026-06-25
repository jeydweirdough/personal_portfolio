interface FooterProps {
  profile: any
  socials?: any[]
}

function Footer({ profile, socials }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Name & tagline */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary">
            {profile?.name || 'Mooserage'}
          </p>
          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-0.5">
            {profile?.title || 'Developer & Designer'}
          </p>
        </div>

        {/* Center: Social icons */}
        {socials && socials.length > 0 && (
          <div className="flex items-center gap-3">
            {socials.map((s: any) => {
              const slug = s.name?.toLowerCase().replace(/\s+/g, '-')
              return (
                <a
                  key={s._id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-light-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all p-1.5"
                >
                  <img
                    src={`https://thesvg.org/icons/${slug}/default.svg`}
                    alt={s.name}
                    className="w-full h-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://cdn.svgl.app/library/${slug}.svg` }}
                  />
                </a>
              )
            })}
          </div>
        )}

        {/* Right: Copyright */}
        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary text-center sm:text-right">
          © {year} {profile?.name || 'Mooserage'}. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer