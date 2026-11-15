import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import Background from '@/components/Background'
import CommandPalette from '@/components/CommandPalette'
import RecruiterPanel from '@/components/RecruiterPanel'
import './globals.css'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Varun Thallapelly',
  url: 'https://varunthallapelly.com',
  jobTitle: 'Data Analyst & AI Solutions Developer',
  image: 'https://varunthallapelly.com/images/varun_profile.avif',
  address: { '@type': 'PostalAddress', addressLocality: 'Guildford', addressCountry: 'GB' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Surrey' },
    { '@type': 'CollegeOrUniversity', name: 'Kakatiya Institute of Technology & Science' },
  ],
  knowsAbout: ['Data Analytics', 'Business Intelligence', 'Power BI', 'Python', 'Agentic AI', 'NLP', 'Workflow Automation', 'React', 'Next.js'],
  sameAs: ['https://github.com/varungopithallapelly', 'https://www.linkedin.com/in/varun-gopi-thallapelly/'],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://varunthallapelly.com'),
  alternates: { canonical: '/' },
  title: 'Varun Thallapelly — Data Analyst & AI Solutions Developer',
  description: 'Data Analyst and AI Solutions Developer based in Guildford, UK. Building AI systems, automation tools, and data solutions that actually ship.',
  keywords: ['Data Analyst', 'AI Developer', 'Agentic AI', 'Business Analytics', 'Python', 'React', 'Power BI'],
  authors: [{ name: 'Varun Thallapelly' }],
  openGraph: {
    title: 'Varun Thallapelly — Data Analyst & AI Solutions Developer',
    description: 'Building AI systems and data solutions that actually ship.',
    url: 'https://varunthallapelly.com',
    siteName: 'Varun Thallapelly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varun Thallapelly — Data Analyst & AI Solutions Developer',
    description: 'Building AI systems and data solutions that actually ship.',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#100F0C' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ND4Z9NR5');`,
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Theme: light by default; respects a saved choice. Runs before paint. */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}})();`,
        }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ND4Z9NR5" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }} />
        <ThemeProvider>
          <Background />
          <div className="relative z-10">{children}</div>
          <CommandPalette />
          <RecruiterPanel />
        </ThemeProvider>
      </body>
    </html>
  )
}
