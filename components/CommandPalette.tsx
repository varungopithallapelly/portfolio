'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Briefcase, Copy, CornerDownLeft, Download, FileText, Hash, Moon, Search, Sun } from 'lucide-react'
import { navLinks, profile, projects, socials } from '@/lib/data'
import { useTheme } from './ThemeProvider'
import { GithubIcon, LinkedinIcon } from './icons'
import { openRecruiter } from './RecruiterPanel'

type Item = { id: string; group: string; label: string; hint?: string; icon: ReactNode; run: () => void; keywords?: string }

export const openPalette = () => window.dispatchEvent(new Event('open-palette'))

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setQ(''); setSel(0); setOpen(o => !o)
      } else if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => { setQ(''); setSel(0); setOpen(true) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-palette', onOpen) }
  }, [])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    return () => clearTimeout(t)
  }, [open])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 1800) }
  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
    else router.push(`/#${id}`)
  }

  const items: Item[] = useMemo(() => [
    ...navLinks.map(n => ({ id: `nav-${n.id}`, group: 'Jump to', label: n.label, icon: <Hash size={16} />, run: () => go(n.id) })),
    ...projects.map(p => ({ id: `p-${p.slug}`, group: 'Projects', label: p.title, hint: p.year, keywords: p.tech.join(' ') + ' ' + p.category.join(' '), icon: <span className="text-base leading-none">{p.emoji}</span>, run: () => { setOpen(false); router.push(p.href) } })),
    { id: 'r-sum', group: 'For recruiters', label: '30-second summary', keywords: 'hire hiring recruiter tldr', icon: <Briefcase size={16} />, run: () => { setOpen(false); openRecruiter('summary') } },
    { id: 'r-cv', group: 'For recruiters', label: 'Preview CV', keywords: 'resume cv pdf', icon: <FileText size={16} />, run: () => { setOpen(false); openRecruiter('cv') } },
    { id: 'a-theme', group: 'Actions', label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode', icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />, run: () => toggleTheme() },
    { id: 'a-copy', group: 'Actions', label: 'Copy email address', hint: profile.email, icon: <Copy size={16} />, run: () => { navigator.clipboard?.writeText(profile.email); flash('Email copied'); setOpen(false) } },
    { id: 'a-cv', group: 'Actions', label: 'Download CV', icon: <Download size={16} />, run: () => { setOpen(false); window.open(profile.cv, '_blank') } },
    { id: 'l-gh', group: 'Links', label: 'GitHub', icon: <GithubIcon size={16} />, run: () => window.open(socials.github, '_blank') },
    { id: 'l-li', group: 'Links', label: 'LinkedIn', icon: <LinkedinIcon size={16} />, run: () => window.open(socials.linkedin, '_blank') },
    { id: 'l-lora', group: 'Links', label: 'Read the Intel Arc LoRA build log', icon: <FileText size={16} />, run: () => { setOpen(false); router.push('/work/intel-arc-lora') } },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [theme])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(i => `${i.label} ${i.group} ${i.keywords ?? ''}`.toLowerCase().includes(s))
  }, [q, items])

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[sel]?.run() }
  }

  let lastGroup = ''

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--ink)_30%,transparent)] backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              role="dialog" aria-modal="true" aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className="relative w-full max-w-[580px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lg)]"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={18} className="text-subtle shrink-0" />
                <input
                  ref={inputRef} value={q} onChange={e => { setQ(e.target.value); setSel(0) }} onKeyDown={onKeyDown}
                  placeholder="Search projects, sections, actions…"
                  className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-subtle outline-none focus-visible:outline-none"
                />
                <span className="kbd">esc</span>
              </div>
              <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
                {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-subtle">Nothing matches “{q}”.</p>}
                {filtered.map((item, idx) => {
                  const header = item.group !== lastGroup ? item.group : null
                  lastGroup = item.group
                  const active = idx === sel
                  return (
                    <div key={item.id}>
                      {header && <p className="px-3 pt-3 pb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">{header}</p>}
                      <button
                        data-idx={idx}
                        onMouseMove={() => setSel(idx)}
                        onClick={item.run}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors ${active ? 'bg-surface-2 text-ink' : 'text-muted'}`}
                      >
                        <span className={`grid size-8 shrink-0 place-items-center rounded-lg border ${active ? 'border-line-strong bg-surface text-accent-ink' : 'border-line text-subtle'}`}>{item.icon}</span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && <span className="font-mono text-[11px] text-subtle truncate max-w-[40%]">{item.hint}</span>}
                        {active ? <CornerDownLeft size={14} className="text-subtle" /> : <ArrowRight size={14} className="opacity-0" />}
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 border-t border-line bg-surface-2 px-4 py-2.5 font-mono text-[11px] text-subtle">
                <span><span className="kbd">↑</span> <span className="kbd">↓</span> navigate</span>
                <span><span className="kbd">↵</span> select</span>
                <span className="ml-auto"><span className="kbd">Ctrl</span> <span className="kbd">K</span> toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-8 left-1/2 z-[210] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-[var(--shadow-lg)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
