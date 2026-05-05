import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            })();
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
