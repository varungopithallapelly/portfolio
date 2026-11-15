'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading, SpotlightCard, CountUp } from './ui'

// Only figures stated in the case studies / CV.
const processes = [
  { name: 'Payroll run', before: 7, after: 1, unit: 'days', href: '/projects/payroll', note: '1 week → 1 day' },
  { name: 'Invoicing cycle', before: 14, after: 1, unit: 'days', href: '/projects/invoicing', note: '2 weeks → 1 day' },
]
const MAX = 14

const tiles = [
  { to: 72, suffix: '', label: 'languages handled by one AI voice agent', hue: 'var(--green)', href: '/projects/ai-agent' },
  { to: 27, suffix: '%', prefix: '+', label: 'motor-insurance pricing accuracy', hue: 'var(--orange)', href: '/projects/insurance-analytics' },
  { to: 15, suffix: '%', prefix: '−', label: 'cost of risk', hue: 'var(--violet)', href: '/projects/insurance-analytics' },
  { to: 24, suffix: '/7', label: 'inbound call coverage for 3 clients', hue: 'var(--blue)', href: '/projects/ai-agent' },
]

export default function Impact() {
  const [after, setAfter] = useState(true)

  return (
    <section id="impact" className="relative py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Impact"
          title={<>Measured in <span className="italic font-medium text-accent">days saved</span>.</>}
          intro="What changed after I shipped. Flip the switch to compare before and after."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <SpotlightCard className="p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-display text-[22px] font-bold tracking-tight text-ink">Process time</p>
              <div role="radiogroup" aria-label="Before or after" className="flex rounded-full border border-line bg-surface-2 p-1">
                {[false, true].map(v => (
                  <button key={String(v)} role="radio" aria-checked={after === v} onClick={() => setAfter(v)}
                    className={`relative isolate rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${after === v ? 'text-bg' : 'text-muted hover:text-ink'}`}
                  >
                    {after === v && <motion.span layoutId="impact-toggle" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                    {v ? 'After' : 'Before'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-7">
              {processes.map(p => {
                const val = after ? p.after : p.before
                return (
                  <Link key={p.name} href={p.href} className="group block">
                    <div className="mb-2.5 flex items-baseline justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                        {p.name}
                        <ArrowUpRight size={14} className="text-subtle opacity-0 transition-all group-hover:rotate-45 group-hover:opacity-100" />
                      </span>
                      <motion.span key={val} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-[22px] font-bold tabular-nums text-ink">
                        {val} <span className="text-[14px] font-medium text-subtle">{val === 1 ? 'day' : p.unit}</span>
                      </motion.span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-surface-2 ring-1 ring-line">
                      <motion.div
                        className="h-full rounded-full"
                        initial={false}
                        animate={{ width: `${(val / MAX) * 100}%`, backgroundColor: after ? 'var(--green)' : 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      />
                    </div>
                    <p className="mt-2 font-mono text-[11px] text-subtle">{p.note}</p>
                  </Link>
                )
              })}
            </div>

            <motion.p key={String(after)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface-2 p-4 text-[14px] leading-relaxed text-muted">
              {after
                ? <>Up to <strong className="text-ink">19 days</strong> handed back to HR and finance per cycle. Timesheets now generate in under 5 seconds.</>
                : <>Manual exports from several clock-in platforms and care software, stitched together by hand in spreadsheets.</>}
            </motion.p>
          </SpotlightCard>

          <div className="grid grid-cols-2 gap-4">
            {tiles.map(t => (
              <Link key={t.label} href={t.href} className="group block">
                <SpotlightCard className="flex h-full flex-col justify-between p-6" spot={t.hue}>
                  <p className="font-display text-[clamp(34px,4vw,48px)] font-extrabold leading-none tracking-tight" style={{ color: t.hue }}>
                    {t.prefix}<CountUp to={t.to} suffix={t.suffix} />
                  </p>
                  <p className="mt-4 text-[13.5px] leading-snug text-muted">{t.label}</p>
                  <ArrowUpRight size={15} className="mt-3 text-subtle transition-transform group-hover:rotate-45 group-hover:text-ink" />
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
