'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { hue, projectCategories, projects, type Project } from '@/lib/data'
import { SectionHeading, SpotlightCard } from './ui'

function ProjectCard({ p, big }: { p: Project; big: boolean }) {
  const c = hue(p.hue)
  return (
    <Link href={p.href} className="group block h-full rounded-[22px] focus-visible:outline-offset-4">
      <SpotlightCard tilt spot={c} className="flex h-full flex-col">
        {/* Visual header */}
        <div
          className={`relative overflow-hidden rounded-t-[21px] border-b border-line ${big ? 'h-[240px]' : 'h-[180px]'}`}
          style={{ background: `linear-gradient(140deg, color-mix(in oklab, ${c} 20%, var(--surface)) 0%, color-mix(in oklab, ${c} 6%, var(--surface)) 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-110"
            style={{ background: `repeating-radial-gradient(circle at 85% 120%, transparent 0 22px, color-mix(in oklab, ${c} 16%, transparent) 22px 23px)` }}
          />
          <div className="absolute left-5 top-5 flex gap-2">
            <span className="rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur">{p.type}</span>
            <span className="rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur">{p.year}</span>
          </div>
          <span className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-ink text-bg opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
          <span
            className={`absolute bottom-5 left-5 grid place-items-center rounded-2xl border border-line bg-surface shadow-[var(--shadow-md)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${big ? 'size-20 text-[40px]' : 'size-16 text-[32px]'}`}
          >
            {p.emoji}
          </span>
          {p.metric && (
            <div className="absolute bottom-5 right-5 text-right">
              <p className={`font-display font-extrabold leading-none tracking-tight ${big ? 'text-[48px]' : 'text-[36px]'}`} style={{ color: c }}>{p.metric.value}</p>
              <p className="mt-1 font-mono text-[11px] text-muted">{p.metric.label}</p>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className={`font-display font-bold leading-tight tracking-tight text-ink ${big ? 'text-[26px]' : 'text-[20px]'}`}>{p.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-[14.5px] text-muted">
            <span className="size-1.5 shrink-0 rounded-full" style={{ background: c }} />
            {p.tagline}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {p.tech.slice(0, big ? 5 : 3).map(t => <span key={t} className="chip !py-1.5 !text-[11px]">{t}</span>)}
            {p.tech.length > (big ? 5 : 3) && <span className="chip !py-1.5 !text-[11px]">+{p.tech.length - (big ? 5 : 3)}</span>}
          </div>
        </div>
      </SpotlightCard>
    </Link>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = useMemo(() => (filter === 'All' ? projects : projects.filter(p => p.category.includes(filter))), [filter])

  return (
    <section id="projects" className="relative py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title={<>Things I&apos;ve <span className="italic font-medium text-accent">built</span>.</>}
            intro="Real systems in production, plus a few experiments. Hover a card to light it up, then click for the case study."
          />
        </div>

        <LayoutGroup>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {projectCategories.map(cat => {
              const on = filter === cat
              const n = cat === 'All' ? projects.length : projects.filter(p => p.category.includes(cat)).length
              return (
                <button
                  key={cat} role="tab" aria-selected={on} onClick={() => setFilter(cat)}
                  className={`relative isolate flex items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors ${on ? 'border-ink text-bg' : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'}`}
                >
                  {on && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {cat}
                  <span className={`font-mono text-[11px] ${on ? 'opacity-70' : 'text-subtle'}`}>{n}</span>
                </button>
              )
            })}
          </div>

          <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => {
                const big = filter === 'All' && !!p.featured
                const wide = big && i === 0
                return (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    className={wide ? 'md:col-span-2' : ''}
                  >
                    <ProjectCard p={p} big={big} />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
