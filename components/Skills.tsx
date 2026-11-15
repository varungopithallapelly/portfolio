'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MousePointerClick } from 'lucide-react'
import { hue, projects, skillGroups } from '@/lib/data'
import { SectionHeading } from './ui'

export default function Skills() {
  const [groupIdx, setGroupIdx] = useState(0)
  const [skill, setSkill] = useState<string | null>(null)
  const group = skillGroups[groupIdx]
  const c = hue(group.hue)

  const usedIn = useMemo(() => {
    if (!skill) return []
    const s = group.skills.find(x => x.name === skill)
    if (!s?.match) return []
    return projects.filter(p => p.tech.some(t => s.match!.includes(t)))
  }, [skill, group])

  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)

  return (
    <section id="skills" className="relative border-y border-line bg-[color-mix(in_oklab,var(--bg-2)_70%,transparent)] py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Skills"
          title={<>The <span className="italic font-medium text-accent">toolkit</span>.</>}
          intro={<>{total} tools and disciplines across six areas. Pick an area, then click a skill to see where I&apos;ve used it.</>}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[300px_1fr]">
          {/* Areas */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillGroups.map((g, i) => {
              const on = i === groupIdx
              const gc = hue(g.hue)
              return (
                <button
                  key={g.category}
                  onClick={() => { setGroupIdx(i); setSkill(null) }}
                  className={`relative isolate flex min-w-[210px] items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors lg:min-w-0 ${on ? 'border-line-strong text-ink' : 'border-transparent text-muted hover:text-ink'}`}
                >
                  {on && <motion.span layoutId="skill-group" className="absolute inset-0 -z-10 rounded-2xl bg-surface shadow-[var(--shadow-md)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="flex items-center gap-3">
                    <span className="size-2.5 rounded-full transition-transform" style={{ background: gc, transform: on ? 'scale(1.4)' : 'scale(1)' }} />
                    <span className="font-display text-[16px] font-semibold tracking-tight">{g.category}</span>
                  </span>
                  <span className="font-mono text-[11px] text-subtle">{g.skills.length}</span>
                </button>
              )
            })}
          </div>

          {/* Explorer */}
          <div className="card relative overflow-hidden p-7 sm:p-9" style={{ ['--c' as string]: c }}>
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-50 blur-3xl transition-colors duration-500" style={{ background: `color-mix(in oklab, ${c} 30%, transparent)` }} />
            <AnimatePresence mode="wait">
              <motion.div key={group.category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="relative">
                <h3 className="font-display text-[30px] font-bold tracking-tight text-ink">{group.category}</h3>
                <p className="mt-1.5 text-[16px] text-muted">{group.blurb}</p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {group.skills.map((s, i) => {
                    const on = skill === s.name
                    const linked = !!s.match
                    return (
                      <motion.button
                        key={s.name}
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.025, type: 'spring', stiffness: 400, damping: 24 }}
                        whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setSkill(on ? null : s.name)}
                        className={`chip !px-4 !py-2.5 !text-[13px] cursor-pointer ${on ? 'tint !font-semibold' : 'hover:border-line-strong hover:text-ink'}`}
                        aria-pressed={on}
                      >
                        {s.name}
                        {linked && <span className="size-1.5 rounded-full" style={{ background: c, opacity: on ? 1 : 0.5 }} />}
                      </motion.button>
                    )
                  })}
                </div>

                <div className="mt-8 min-h-[120px] rounded-2xl border border-dashed border-line-strong bg-surface-2/60 p-5">
                  <AnimatePresence mode="wait">
                    {!skill ? (
                      <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[14px] text-subtle">
                        <MousePointerClick size={16} /> Click a skill. Ones with a dot link to projects.
                      </motion.p>
                    ) : usedIn.length === 0 ? (
                      <motion.p key={`none-${skill}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[14px] text-muted">
                        <strong className="text-ink">{skill}</strong>: used day to day in my roles. See the Experience section for context.
                      </motion.p>
                    ) : (
                      <motion.div key={`used-${skill}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">{skill} · used in {usedIn.length} project{usedIn.length > 1 ? 's' : ''}</p>
                        <div className="flex flex-wrap gap-2">
                          {usedIn.map(p => (
                            <Link key={p.slug} href={p.href} className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-2 pr-3.5 text-[14px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                              <span className="text-[16px]">{p.emoji}</span>{p.title}
                              <ArrowUpRight size={14} className="text-subtle transition-transform group-hover:rotate-45" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
