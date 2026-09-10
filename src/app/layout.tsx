import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

// One family carries the whole system. Archivo's width axis gives the
// condensed stencil labels and the expanded plate lettering from the
// same face, which is what keeps this reading as engineered rather
// than art-directed.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const SITE_URL = 'https://jade-atyla-portfolio.vercel.app'
const SITE_TITLE = 'Jade Atyla L. Madigal | System & Web Developer'
const SITE_DESC =
  'Jade Atyla L. Madigal builds the internal systems a business runs on and keeps the hardware, software, and networks under them working. System & Web Developer and IT Support at Getmeds Philippines. Based in Bacoor, Cavite. Available for project work.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: [
    'Jade Atyla Madigal',
    'Portfolio',
    'System Developer',
    'Web Developer',
    'IT Support',
    'Software Developer',
    'Computer Science Graduate',
    'Cavite State University',
    'Next.js',
  ],
  authors: [{ name: 'Jade Atyla L. Madigal' }],
  creator: 'Jade Atyla L. Madigal',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Jade Atyla L. Madigal',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: '/images/profile-avatar.png', width: 1200, height: 630, alt: 'Jade Atyla L. Madigal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ['/images/profile-avatar.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

// Next 15 wants viewport as its own export, not a metadata key.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
