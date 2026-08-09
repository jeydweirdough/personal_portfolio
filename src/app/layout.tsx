import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Jade Atyla L. Madigal | Personal Portfolio',
  description: 'Computer Science Student & Technical Support Engineer Portfolio. Showcasing software projects, IT support experience, skills, and background.',
  keywords: ['Portfolio', 'Computer Science', 'Technical Support Engineer', 'Software Developer', 'Next.js'],
  authors: [{ name: 'Jade Atyla L. Madigal' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
