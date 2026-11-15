'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Download, FileText, GraduationCap, Mail, Sparkles, Target, Trophy, X, Zap } from 'lucide-react'
import { education, profile, socials } from '@/lib/data'
import { LinkedinIcon } from './icons'

export const openRecruiter = (tab: 'summary' | 'cv' = 'summary') =>
  window.dispatchEvent(new CustomEvent('open-recruiter', { detail: tab }))

const wins = [
  { icon: <Zap size={16} />, text: 'Built a multi-tenant agentic AI voice system serving 3 franchise clients, 24/7, in 72 languages.' },
  { icon: <Trophy size={16} />, text: 'Custom payroll software (Python, MongoDB, React) that cut a 1-week process to 1 day.' },
  { icon: <Trophy size={16} />, text: 'Automated invoicing from live care data, cutting a 2-week cycle to 1 day.' },
  { icon: <Sparkles size={16} />, text: 'Power BI + KPI frameworks across HR, Finance & Ops; supported ISO 9001 and CQC audits (both entities rated Good).' },
]

const targetRoles = ['Data Analyst', 'AI Solutions Developer', 'BI / Analytics Engineer', 'Automation Engineer']
const coreStack = ['Python', 'SQL / PostgreSQL', 'Power BI', 'React / Next.js', 'MongoDB', 'Agentic AI & NLP', 'Excel (Advanced)', 'R']

export default function RecruiterPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'summary' | 'cv'>('summary')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onOpen = (e: Event) => { setTab(((e as CustomEvent).detail as 'summary' | 'cv') ?? 'summary'); setOpen(true) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('open-recruiter', onOpen)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('open-recruiter', onOpen); window.removeEventListener('keydown', onKey) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch {}
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[190] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--ink)_35%,transparent)] backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog" aria-modal="true" aria-label="Recruiter summary"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="relative flex h-full w-full max-w-[560px] flex-col border-l border-line bg-surface shadow-[var(--shadow-lg)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line px-6 py-4">
              <div className="flex rounded-full border border-line bg-surface-2 p-1">
                {(['summary', 'cv'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`relative isolate rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${tab === t ? 'text-bg' : 'text-muted hover:text-ink'}`}>
                    {tab === t && <motion.span layoutId="rec-tab" className="absolute inset-0 -z-10 rounded-full bg-ink" />}
                    {t === 'summary' ? '30-sec summary' : 'CV'}
                  </button>
                ))}
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"><X size={18} /></button>
            </div>

            {tab === 'summary' ? (
              <div className="flex-1 overflow-y-auto px-6 py-7">
                <p className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--green)_12%,transparent)] px-3 py-1 text-[12px] font-semibold text-green">
                  <span className="size-1.5 rounded-full bg-green pulse-dot" /> Available for new roles
                </p>
                <h2 className="mt-4 font-display text-[34px] font-extrabold leading-[1.02] tracking-tight text-ink">{profile.name}</h2>
                <p className="mt-2 text-[16px] text-muted">Data Analyst &amp; AI Solutions Developer · {profile.location}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  3+ years turning messy business data into automated systems, from BI dashboards to production AI agents.
                  MSc Business Analytics (Surrey). Works directly with C-level and finance stakeholders.
                </p>

                <h3 className="mb-3 mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle"><Trophy size={13} /> Top wins</h3>
                <ul className="space-y-2.5">
                  {wins.map((w, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex gap-3 rounded-2xl border border-line bg-surface-2 p-3.5 text-[14.5px] leading-relaxed text-ink"
                    >
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-surface text-accent">{w.icon}</span>
                      {w.text}
                    </motion.li>
                  ))}
                </ul>

                <h3 className="mb-3 mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle"><Target size={13} /> Roles I&apos;m targeting</h3>
                <div className="flex flex-wrap gap-2">{targetRoles.map(r => <span key={r} className="chip tint">{r}</span>)}</div>

                <h3 className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">Core stack</h3>
                <div className="flex flex-wrap gap-2">{coreStack.map(r => <span key={r} className="chip">{r}</span>)}</div>

                <h3 className="mb-3 mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle"><GraduationCap size={13} /> Education</h3>
                <div className="space-y-2">
                  {education.map(e => (
                    <div key={e.degree} className="flex items-baseline justify-between gap-4 text-[14.5px]">
                      <span><strong className="font-semibold text-ink">{e.degree}</strong> <span className="text-muted">· {e.school}</span></span>
                      <span className="shrink-0 font-mono text-[11px] text-subtle">{e.period.slice(-4)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col overflow-hidden p-4">
                <object data={`${profile.cv}#view=FitH`} type="application/pdf" className="h-full w-full flex-1 rounded-2xl border border-line bg-surface-2">
                  <div className="grid h-full place-items-center p-8 text-center text-muted">
                    <div>
                      <FileText size={28} className="mx-auto mb-3" />
                      <p className="mb-4">Your browser can&apos;t preview PDFs inline.</p>
                      <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open CV <ArrowUpRight size={16} /></a>
                    </div>
                  </div>
                </object>
              </div>
            )}

            {/* Sticky actions */}
            <div className="grid grid-cols-2 gap-2 border-t border-line bg-surface-2 p-4 sm:grid-cols-4">
              <a href={profile.cv} download className="btn btn-primary col-span-2 h-11 text-[14px]"><Download size={16} /> Download CV</a>
              <a href={`${socials.email}?subject=${encodeURIComponent('Role opportunity')}`} className="btn btn-ghost h-11 text-[14px]"><Mail size={16} /> Email</a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-11 text-[14px]"><LinkedinIcon size={15} /> LinkedIn</a>
              <button onClick={copy} className="col-span-2 flex items-center justify-center gap-2 pt-1 font-mono text-[12px] text-subtle hover:text-ink sm:col-span-4">
                {copied ? <><Check size={13} /> Copied {profile.email}</> : <><Copy size={13} /> {profile.email}</>}
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
