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
              const src = s.link_svg 
                ? `https://thesvg.org/icons/${s.link_svg}`
                : `https://thesvg.org/icons/${slug}/default.svg`
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-light-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all p-1.5"
                >
                  <img
                    src={src}
                    alt={s.name}
                    className="w-full h-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      if (target.src.includes('thesvg.org')) {
                        const fallbackSlug = s.link_svg ? s.link_svg.split('/')[0] : slug
                        target.src = `https://cdn.svgl.app/library/${fallbackSlug}.svg`
                      }
                    }}
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