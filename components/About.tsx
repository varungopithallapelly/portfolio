'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Briefcase, GraduationCap, Mail, MapPin, Phone } from 'lucide-react'
import { education, jobs, profile, socials } from '@/lib/data'
import { Reveal, SectionHeading, SpotlightCard } from './ui'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './icons'

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    const t0 = setTimeout(tick, 0)
    const t = setInterval(tick, 1000)
    return () => { clearTimeout(t0); clearInterval(t) }
  }, [])

  const fmt = (o: Intl.DateTimeFormatOptions) => now ? new Intl.DateTimeFormat('en-GB', { timeZone: profile.timezone, ...o }).format(now) : '--'
  const hour = now ? Number(fmt({ hour: '2-digit', hour12: false })) : 12
  const awake = hour >= 8 && hour < 23

  return (
    <div>
      <div className="font-display text-[clamp(40px,5vw,56px)] font-bold leading-none tracking-tight text-ink tabular-nums">
        {fmt({ hour: '2-digit', minute: '2-digit', hour12: false })}
        <span className="ml-1 text-[0.45em] font-medium text-subtle">:{fmt({ second: '2-digit' }).padStart(2, '0')}</span>
      </div>
      <p className="mt-3 flex items-center gap-2 text-[13px] text-muted">
        <span className={`size-2 rounded-full ${awake ? 'bg-green pulse-dot' : 'bg-subtle'}`} />
        {awake ? 'Probably awake. Replies are quick.' : 'Probably asleep. I’ll reply in the morning.'}
      </p>
    </div>
  )
}

const links = [
  { label: 'GitHub', href: socials.github, icon: <GithubIcon size={18} />, hue: 'var(--ink)' },
  { label: 'LinkedIn', href: socials.linkedin, icon: <LinkedinIcon size={18} />, hue: '#0A66C2' },
  { label: 'Instagram', href: socials.instagram, icon: <InstagramIcon size={18} />, hue: '#E1306C' },
  { label: 'Email', href: socials.email, icon: <Mail size={18} />, hue: 'var(--accent)' },
  { label: profile.phone, href: profile.phoneHref, icon: <Phone size={18} />, hue: 'var(--green)' },
]

export default function About() {
  const current = jobs.find(j => j.current)!

  return (
    <section id="about" className="relative py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={<>Software people <span className="italic font-medium text-accent">actually</span> use.</>}
          intro="Not dashboards that only look good in demos. Systems teams open every single day, and that make a measurable difference to how a business runs."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {/* Bio */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <p className="eyebrow mb-5">The short version</p>
              <div className="space-y-5 text-[16.5px] leading-[1.8] text-muted">
                <p>
                  I&apos;m a <strong className="font-semibold text-ink">Data Analyst and AI Solutions Developer</strong> based in Guildford, with an MSc in
                  Business Analytics from the University of Surrey. I specialise in turning messy data and complex business problems into clean,
                  automated systems that save real time and cost.
                </p>
                <p>
                  At SD Care, I&apos;ve built everything from a fully custom payroll system that reduced a week-long process to a single day, to an
                  agentic AI voice system serving 3 optical franchise clients simultaneously, handling 72 languages, real-time tone analysis, and
                  24/7 inbound call management.
                </p>
                <p>
                  I care about <strong className="font-semibold text-ink">building things that actually work</strong>: software that teams use every
                  day and that makes a measurable difference.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Clock */}
          <Reveal delay={0.05} className="md:col-span-2">
            <SpotlightCard className="h-full p-7" spot="var(--blue)">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                <MapPin size={13} /> Guildford · local time
              </p>
              <LiveClock />
            </SpotlightCard>
          </Reveal>

          {/* Currently */}
          <Reveal delay={0.1} className="md:col-span-2">
            <SpotlightCard className="h-full p-7" spot="var(--green)">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                <Briefcase size={13} /> Currently
              </p>
              <p className="font-display text-[22px] font-bold leading-tight tracking-tight text-ink">{current.title}</p>
              <p className="mt-1 text-[15px] text-muted">{current.company}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--green)_12%,transparent)] px-3 py-1 font-mono text-[11px] text-green">
                <span className="size-1.5 rounded-full bg-green pulse-dot" /> {current.period}
              </p>
            </SpotlightCard>
          </Reveal>

          {/* Education */}
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={0.05 * i} className="md:col-span-3">
              <SpotlightCard className="group h-full p-7" spot="var(--violet)">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-violet transition-transform group-hover:-rotate-6">
                    <GraduationCap size={20} />
                  </span>
                  <span className="font-mono text-[11px] text-subtle">{e.period}</span>
                </div>
                <p className="mt-6 font-display text-[21px] font-bold leading-tight tracking-tight text-ink">{e.degree}</p>
                <p className="mt-1 text-[15px] text-muted">{e.school}</p>
                <p className="mt-1 text-[13px] text-subtle">{e.location}</p>
              </SpotlightCard>
            </Reveal>
          ))}

          {/* Links */}
          <Reveal className="md:col-span-6">
            <div className="card flex flex-wrap items-center gap-2 p-3">
              <span className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">Find me on</span>
              {links.map(l => (
                <a
                  key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-surface-2 py-2 pl-2.5 pr-4 text-[14px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  style={{ ['--c' as string]: l.hue }}
                >
                  <span className="grid size-7 place-items-center rounded-full bg-surface text-[var(--c)]">{l.icon}</span>
                  {l.label}
                  <ArrowUpRight size={14} className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
