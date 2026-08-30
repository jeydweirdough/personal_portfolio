import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const SITE_URL = 'https://jade-atyla-portfolio.vercel.app'
const SITE_TITLE = 'Jade Atyla L. Madigal | System & Web Developer'
const SITE_DESC =
  'Portfolio of Jade Atyla L. Madigal — System & Web Developer and IT Support at Getmeds Philippines, BS Computer Science graduate from Cavite State University. Software projects, systems work, and technical skills.'

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
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light-primary dark:text-text-dark-primary transition-colors duration-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
