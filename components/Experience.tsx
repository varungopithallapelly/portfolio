'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { jobs } from '@/lib/data'
import { SectionHeading } from './ui'

const PREVIEW = 4

export default function Experience() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const job = jobs[active]
  const bullets = expanded ? job.bullets : job.bullets.slice(0, PREVIEW)

  return (
    <section id="experience" className="relative border-y border-line bg-[color-mix(in_oklab,var(--bg-2)_70%,transparent)] py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={<>Where I&apos;ve been <span className="italic font-medium text-accent">shipping</span>.</>}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Role selector — a timeline */}
          <div role="tablist" aria-label="Roles" className="relative flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            <span className="absolute left-[27px] top-6 bottom-6 hidden w-px bg-line-strong lg:block" />
            {jobs.map((j, i) => {
              const on = i === active
              return (
                <button
                  key={j.period}
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setActive(i); setExpanded(false) }}
                  className={`relative isolate flex min-w-[250px] items-start gap-4 rounded-2xl border p-4 text-left transition-colors lg:min-w-0 ${on ? 'border-line-strong' : 'border-transparent hover:bg-surface/60'}`}
                >
                  {on && <motion.span layoutId="job-bg" className="absolute inset-0 -z-10 rounded-2xl bg-surface shadow-[var(--shadow-md)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className={`relative z-10 mt-1 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? 'border-accent bg-accent' : 'border-line-strong bg-bg'}`}>
                    {j.current && <span className="size-2 rounded-full bg-on-accent pulse-dot" />}
                  </span>
                  <span className="relative z-10 min-w-0">
                    <span className={`block font-display text-[17px] font-bold tracking-tight ${on ? 'text-ink' : 'text-muted'}`}>{j.title}</span>
                    <span className="block text-[14px] text-muted">{j.company}</span>
                    <span className="mt-1.5 block font-mono text-[11px] text-subtle">{j.period}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="card overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[28px] font-bold leading-tight tracking-tight text-ink">{job.title}</h3>
                    <p className="mt-1 text-[16px] font-medium text-accent-ink">@ {job.fullCompany}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip">{job.period}</span>
                    <span className="chip"><MapPin size={12} />{job.location}</span>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {job.highlights.map((h, i) => (
                    <motion.div
                      key={h.label}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.1 }}
                      className="rounded-2xl border border-line bg-surface-2 p-4"
                    >
                      <p className="font-display text-[22px] font-bold leading-none tracking-tight text-ink">{h.value}</p>
                      <p className="mt-2 text-[13px] text-muted">{h.label}</p>
                    </motion.div>
                  ))}
                </div>

                <ul className="mt-8 space-y-3.5">
                  <AnimatePresence initial={false}>
                    {bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, delay: i >= PREVIEW ? (i - PREVIEW) * 0.03 : 0 }}
                        className="flex gap-3 text-[15.5px] leading-[1.75] text-muted"
                      >
                        <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {job.bullets.length > PREVIEW && (
                  <button onClick={() => setExpanded(e => !e)} className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink underline-draw">
                    {expanded ? 'Show less' : `Show ${job.bullets.length - PREVIEW} more`}
                    <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                )}

                <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                  {job.tech.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
