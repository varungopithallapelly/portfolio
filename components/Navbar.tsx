'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const socials = [
  { icon: <GithubIcon />, href: 'https://github.com/varungopithallapelly', label: 'GitHub' },
  { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/in/varun-gopi-thallapelly/', label: 'LinkedIn' },
  { icon: <InstagramIcon />, href: 'https://www.instagram.com/__varun._/', label: 'Instagram' },
  { icon: <EmailIcon />, href: 'mailto:thallapellyvarun@gmail.com', label: 'Email' },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'relative',
        width: '48px', height: '26px',
        borderRadius: '100px',
        background: isDark ? '#1E2640' : '#E2E8F0',
        border: isDark ? '1px solid #2A3250' : '1px solid #CBD5E1',
        cursor: 'pointer', padding: 0,
        transition: 'background 0.3s, border-color 0.3s',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: isDark ? 2 : 22 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute', top: '3px',
          width: '18px', height: '18px',
          borderRadius: '50%',
          background: isDark ? '#C8A96E' : '#F59E0B',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px',
        }}
      >
        {isDark ? '☽' : '☀'}
      </motion.div>
    </button>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      for (const { href } of [...navLinks].reverse()) {
        const el = document.getElementById(href.replace('#', ''))
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(href.replace('#', '')); break }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* DESKTOP sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="hidden lg:flex"
        style={{
          position: 'fixed', left: 0, top: 0, bottom: 0, width: '72px',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
          padding: '28px 0', zIndex: 50,
          borderRight: '1px solid var(--faint)',
          background: 'var(--bg)',
        }}
      >
        <ThemeToggle />

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <button key={label} onClick={() => scrollTo(href)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.12em',
                textTransform: 'uppercase', writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                transition: 'all 0.2s', padding: '4px',
                textDecoration: isActive ? 'none' : 'none',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive ? 'var(--accent)' : 'var(--muted)' }}
              >
                {label}
              </button>
            )
          })}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
              style={{ color: 'var(--muted)', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.transform = 'translateY(0)' }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </motion.aside>

      {/* TABLET */}
      <motion.header
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="hidden sm:flex lg:hidden"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', zIndex: 50,
          background: isDark ? 'rgba(10,14,26,0.96)' : 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--faint)',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>VT</span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <nav style={{ display: 'flex', gap: '24px' }}>
            {navLinks.map(({ label, href }) => {
              const isActive = active === href.replace('#', '')
              return (
                <button key={label} onClick={() => scrollTo(href)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: isActive ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.2s',
                }}>{label}</button>
              )
            })}
          </nav>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* MOBILE */}
      <motion.header
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="flex sm:hidden"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '56px',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', zIndex: 50,
          background: isDark ? 'rgba(10,14,26,0.98)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--faint)',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>VT</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px', background: 'var(--muted)', transition: 'all 0.2s',
                transform: menuOpen ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'scaleX(0)' : 'none',
              }} />
            ))}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex sm:hidden"
            style={{
              position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 49,
              background: isDark ? 'rgba(10,14,26,0.98)' : 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--faint)',
              flexDirection: 'column', padding: '8px 20px 20px',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <button key={label} onClick={() => scrollTo(href)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.08em',
                textTransform: 'uppercase', textAlign: 'left',
                color: active === href.replace('#', '') ? 'var(--accent)' : 'var(--muted)',
                padding: '14px 0', borderBottom: '1px solid var(--faint)', width: '100%',
              }}>{label}</button>
            ))}
            <div style={{ display: 'flex', gap: '20px', paddingTop: '16px' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
