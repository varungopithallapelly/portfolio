'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Briefcase, Download, Hand } from 'lucide-react'
import { marqueeTech, profile, stats } from '@/lib/data'
import { CountUp, Magnetic } from './ui'
import { openRecruiter } from './RecruiterPanel'

const rotating = ['AI agents', 'data systems', 'automations', 'dashboards', 'software']

const stickers = [
  { label: '🎓 MSc Business Analytics', hue: 'var(--violet)', pos: 'left-[-6%] top-[8%]', rot: -8 },
  { label: '⚡ 72-language voice agent', hue: 'var(--green)', pos: 'right-[-10%] top-[30%]', rot: 6 },
  { label: '📍 Guildford, UK', hue: 'var(--blue)', pos: 'left-[-2%] bottom-[14%]', rot: 4 },
  { label: '⏱ 1 week → 1 day', hue: 'var(--accent)', pos: 'right-[-4%] bottom-[2%]', rot: -5 },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const [word, setWord] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const glowX = useTransform(sx, [-0.5, 0.5], ['30%', '70%'])
  const glowY = useTransform(sy, [-0.5, 0.5], ['30%', '70%'])
  const glare = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.55), transparent 55%)`)

  useEffect(() => {
    const t = setInterval(() => setWord(w => (w + 1) % rotating.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="relative flex min-h-[min(100svh,980px)] flex-col overflow-x-clip justify-center pt-28 pb-10">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Copy ── */}
        <div className="order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-2 pr-4 text-[13px] text-muted shadow-[var(--shadow-sm)]"
          >
            <span className="relative grid size-5 place-items-center">
              <span className="pulse-dot absolute size-2.5 rounded-full bg-green" />
              <span className="absolute size-5 rounded-full bg-[color-mix(in_oklab,var(--green)_20%,transparent)]" />
            </span>
            Available for new roles &amp; freelance
          </motion.div>

          <h1 className="font-display font-extrabold tracking-[-0.035em] text-ink text-[clamp(52px,9vw,112px)] leading-[0.92]">
            {[profile.first, profile.last].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}>
                  {w}{i === 1 && <span className="text-accent">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center gap-x-3 font-display text-[clamp(22px,3vw,32px)] font-medium tracking-tight text-muted"
          >
            I build
            <motion.span layout transition={{ duration: 0.35, ease }} className="relative inline-flex overflow-hidden py-[0.08em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={rotating[word]}
                  initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="text-gradient whitespace-nowrap font-semibold"
                >
                  {rotating[word]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
            <motion.span layout transition={{ duration: 0.35, ease }}>that actually ship.</motion.span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease }}
            className="mt-6 max-w-[540px] text-[17px] leading-[1.75] text-muted"
          >
            Data Analyst &amp; AI Solutions Developer in Guildford. I turn <strong className="font-semibold text-ink">complex data into decisions</strong>, from
            agentic voice agents serving 3 franchise clients to custom payroll software that cut a one-week process to a single day.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary group">
                See my work
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </button>
            </Magnetic>
            <Magnetic>
              <a href={profile.cv} download className="btn btn-ghost">
                <Download size={17} /> Download CV
              </a>
            </Magnetic>
            <button onClick={() => openRecruiter('summary')} className="group inline-flex items-center gap-2 px-2 text-[15px] font-semibold text-ink">
              <Briefcase size={17} className="text-accent" />
              <span className="underline-draw">Hiring? 30-sec summary</span>
            </button>
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 grid max-w-[560px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
          >
            {stats.map(s => (
              <div key={s.label} className="bg-surface px-4 py-4 transition-colors hover:bg-surface-2">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[30px] font-bold leading-none tracking-tight text-ink"><CountUp to={s.value} suffix={s.suffix} /></dd>
                <dd className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-subtle">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Portrait stage ── */}
        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }}
          className="relative order-1 mx-auto w-[min(62vw,420px)] lg:order-2"
          onMouseMove={e => {
            const r = stageRef.current?.getBoundingClientRect()
            if (!r) return
            mx.set((e.clientX - r.left) / r.width - 0.5)
            my.set((e.clientY - r.top) / r.height - 0.5)
          }}
          onMouseLeave={() => { mx.set(0); my.set(0) }}
          style={{ perspective: 1000 }}
        >
          <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative aspect-[4/5]">
            <div className="absolute -inset-3 rotate-[-4deg] rounded-[44px] border-2 border-dashed border-line-strong" />
            <div className="absolute inset-0 overflow-hidden rounded-[40px] border border-line bg-surface-2 shadow-[var(--shadow-lg)]">
              <Image
                src={profile.photo}
                alt="Varun Thallapelly, Data Analyst and AI Solutions Developer"
                fill priority sizes="(max-width: 1024px) 62vw, 420px"
                className="object-cover object-top"
              />
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ background: glare }}
              />
            </div>
          </motion.div>

          {stickers.map((s, i) => (
            <motion.div
              key={s.label}
              drag
              dragConstraints={stageRef}
              dragElastic={0.25}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.6, rotate: s.rot }}
              animate={{ opacity: 1, scale: 1, rotate: s.rot }}
              transition={{ delay: 0.8 + i * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
              className={`absolute ${s.pos} z-10 cursor-grab select-none whitespace-nowrap rounded-full border bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink shadow-[var(--shadow-md)] active:cursor-grabbing`}
              style={{ borderColor: `color-mix(in oklab, ${s.hue} 40%, var(--line))`, boxShadow: `0 8px 24px -10px color-mix(in oklab, ${s.hue} 60%, transparent)` }}
            >
              {s.label}
            </motion.div>
          ))}

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="absolute -bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-subtle lg:flex"
          >
            <Hand size={13} /> psst, the stickers are draggable
          </motion.p>
        </motion.div>
      </div>

      {/* ── Tech marquee ── */}
      <div className="marquee relative mt-20 overflow-hidden border-y border-line bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] py-4">
        <div className="marquee-track flex gap-10">
          {[...marqueeTech, ...marqueeTech].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-[18px] font-semibold tracking-tight text-muted">
              {t}<span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="mx-auto mt-8 grid size-11 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-ink"
        aria-label="Scroll to about"
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ArrowDown size={18} /></motion.span>
      </button>
    </section>
  )
}
