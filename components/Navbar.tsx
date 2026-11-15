'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, Command, Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks, socials } from '@/lib/data'
import { useTheme } from './ThemeProvider'
import { openPalette } from './CommandPalette'
import { openRecruiter } from './RecruiterPanel'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './icons'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {dark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['hero', ...navLinks.map(n => n.id)].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" />

      <motion.header
        initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-5"
      >
        <nav
          className={`flex w-full max-w-[980px] items-center gap-2 rounded-full border px-2 py-1.5 transition-all duration-300 ${
            scrolled
              ? 'border-line bg-[color-mix(in_oklab,var(--surface)_82%,transparent)] shadow-[var(--shadow-md)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button onClick={() => go('hero')} className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3" aria-label="Back to top">
            <span className="grid size-9 place-items-center rounded-full bg-ink font-display text-[15px] font-bold text-bg transition-transform group-hover:rotate-[-8deg]">
              VT
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink lg:inline">Varun Thallapelly</span>
          </button>

          <ul className="mx-auto hidden items-center gap-0.5 md:flex">
            {navLinks.map(n => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  className={`relative isolate rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${active === n.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-line bg-surface shadow-[var(--shadow-sm)]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  {n.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button
              onClick={openPalette}
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface px-3 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-ink lg:flex"
              aria-label="Open command palette"
            >
              <Command size={14} />
              <span className="font-mono text-[12px]">Ctrl K</span>
            </button>
            <ThemeToggle />
            <button
              onClick={() => openRecruiter('summary')}
              className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold text-bg transition-colors hover:bg-accent hover:text-on-accent sm:flex"
            >
              <Briefcase size={14} /> Hiring?
            </button>
            <button onClick={() => setOpen(o => !o)} className="grid size-10 place-items-center rounded-full text-ink hover:bg-surface-2 md:hidden" aria-label="Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[76px] z-50 rounded-3xl border border-line bg-surface p-3 shadow-[var(--shadow-lg)] md:hidden"
          >
            {navLinks.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => go(n.id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-display text-[22px] font-semibold ${active === n.id ? 'bg-surface-2 text-ink' : 'text-muted'}`}
              >
                {n.label}
                <span className="font-mono text-xs text-subtle">0{i + 1}</span>
              </motion.button>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-line px-2 pt-3">
              {[{ h: socials.github, i: <GithubIcon />, l: 'GitHub' }, { h: socials.linkedin, i: <LinkedinIcon />, l: 'LinkedIn' }, { h: socials.instagram, i: <InstagramIcon />, l: 'Instagram' }].map(s => (
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" aria-label={s.l} className="grid size-11 place-items-center rounded-full border border-line text-muted">{s.i}</a>
              ))}
              <button onClick={() => { setOpen(false); openPalette() }} className="ml-auto flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted">
                <Command size={14} /> Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
