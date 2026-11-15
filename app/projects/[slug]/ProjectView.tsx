'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Image as ImageIcon } from 'lucide-react'
import { hue, projects } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectView({ slug }: { slug: string }) {
  const caseStudies = projects.filter(p => p.overview)
  const idx = caseStudies.findIndex(p => p.slug === slug)
  const project = caseStudies[idx]

  if (!project) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <p className="font-display text-[64px] font-extrabold tracking-tight text-ink">404</p>
          <p className="mb-6 text-muted">That project doesn&apos;t exist (yet).</p>
          <Link href="/#projects" className="btn btn-primary"><ArrowLeft size={16} /> Back to projects</Link>
        </div>
      </div>
    )
  }

  const c = hue(project.hue)
  const next = caseStudies[(idx + 1) % caseStudies.length]
  const sections = [
    { k: 'Overview', v: project.overview },
    { k: 'The challenge', v: project.challenge },
    { k: 'The solution', v: project.solution },
  ]

  return (
    <main className="min-h-screen pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1000px] items-center justify-between px-5 sm:px-8">
          <Link href="/#projects" className="group inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-ink">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All projects
          </Link>
          <Link href="/" className="grid size-9 place-items-center rounded-full bg-ink font-display text-[14px] font-bold text-bg">VT</Link>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line" style={{ background: `linear-gradient(160deg, color-mix(in oklab, ${c} 18%, var(--bg)) 0%, var(--bg) 70%)` }}>
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `repeating-radial-gradient(circle at 90% 110%, transparent 0 28px, color-mix(in oklab, ${c} 14%, transparent) 28px 29px)` }} />
        <div className="relative mx-auto max-w-[1000px] px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: -4 }} transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="mb-8 grid size-20 place-items-center rounded-3xl border border-line bg-surface text-[40px] shadow-[var(--shadow-md)]"
          >
            {project.emoji}
          </motion.div>
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="chip">{project.type}</span>
            <span className="chip">{project.year}</span>
            {project.category.map(cat => <span key={cat} className="chip tint" style={{ ['--c' as string]: c }}>{cat}</span>)}
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
            className="max-w-[18ch] font-display text-[clamp(38px,6vw,72px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink"
          >
            {project.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5 flex items-center gap-2.5 text-[18px] text-muted">
            <span className="size-2 rounded-full" style={{ background: c }} />{project.tagline}
          </motion.p>
          {project.metric && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border border-line bg-surface px-5 py-4 shadow-[var(--shadow-sm)]"
            >
              <span className="font-display text-[40px] font-extrabold leading-none tracking-tight" style={{ color: c }}>{project.metric.value}</span>
              <span className="text-[14px] text-muted">{project.metric.label}</span>
            </motion.div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-[1000px] gap-12 px-5 pt-16 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-12">
          {sections.map((s, i) => (
            <motion.section key={s.k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6, ease }}>
              <p className="eyebrow mb-3">{String(i + 1).padStart(2, '0')} · {s.k}</p>
              <p className="text-[17px] leading-[1.85] text-muted">{s.v}</p>
            </motion.section>
          ))}

          <section>
            <p className="eyebrow mb-4">Screenshots</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(project.imageLabels ?? []).map(label => (
                <div key={label} className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-line-strong bg-surface-2 text-center">
                  <div className="text-subtle">
                    <ImageIcon size={22} className="mx-auto mb-2" />
                    <p className="text-[13px]">{label}</p>
                    <p className="mt-1 font-mono text-[10px]">coming soon</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="eyebrow mb-4">Results</p>
            <ul className="space-y-3">
              {project.results?.map((r, i) => (
                <motion.li key={r} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full" style={{ background: `color-mix(in oklab, ${c} 16%, transparent)`, color: c }}>
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {r}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="eyebrow mb-4">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
          <Link href="/#contact" className="btn btn-primary w-full">Want something like this? <ArrowUpRight size={16} /></Link>
        </aside>
      </div>

      {/* Next project */}
      <div className="mx-auto mt-24 max-w-[1000px] px-5 sm:px-8">
        <Link href={next.href} className="group card spotlight flex items-center justify-between gap-6 p-7 sm:p-9">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-subtle">Next project</p>
            <p className="mt-2 font-display text-[clamp(24px,3.5vw,36px)] font-bold tracking-tight text-ink">{next.emoji} {next.title}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-bg transition-transform group-hover:translate-x-1">
            <ArrowRight size={22} />
          </span>
        </Link>
      </div>
    </main>
  )
}
