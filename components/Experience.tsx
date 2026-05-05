'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'

const jobs = [
  {
    title: 'Data Analyst',
    company: 'SD Care',
    fullCompany: 'San Damiano Ltd.',
    location: 'Guildford, UK',
    period: 'Aug 2024 – Present',
    current: true,
    bullets: [
      'Led data analytics initiatives designing KPIs and interactive dashboards to monitor performance and drive continuous improvement.',
      'Analysed business processes across HR, Finance, and Operations — implementing optimisations that materially improved efficiency.',
      'Worked directly with the CEO and Finance Manager to build a 5-year business plan and financial restructuring strategy.',
      'Supported ISO 9001:2015 quality audits and CQC inspections — both entities achieved a Good CQC rating.',
      'Delivered data-driven insights and reporting frameworks supporting IT and marketing functions.',
    ],
    tech: ['Python', 'Power BI', 'PostgreSQL', 'Excel', 'SharePoint', 'ISO 9001'],
  },
  {
    title: 'IT Specialist',
    company: 'SD Care',
    fullCompany: 'San Damiano Ltd.',
    location: 'Guildford, UK',
    period: 'Nov 2023 – Jul 2024',
    current: false,
    bullets: [
      'Partnered with Operations, Finance, HR, and Marketing to identify automation opportunities and implement AI-driven solutions.',
      'Maintained and optimised systems and workflows across departments, reducing recurring manual overhead.',
      'Developed dashboards and reporting tools to improve data visibility and executive decision-making.',
    ],
    tech: ['AI Automation', 'Power BI', 'SharePoint', 'System Administration'],
  },
  {
    title: 'Data Analyst',
    company: 'Trade Wins Ltd',
    fullCompany: 'Trade Wins Ltd',
    location: 'Remote',
    period: 'Oct 2022 – Jul 2023',
    current: false,
    bullets: [
      'Designed dashboards and reporting templates supporting business decision-making and performance tracking.',
      'Managed and optimised SharePoint and database systems, improving data accessibility and integrity.',
      'Automated administrative workflows, reducing manual effort across HR and finance processes.',
      'Provided analytical insights for project planning, recruitment administration, and performance management.',
    ],
    tech: ['Python', 'Power BI', 'Excel', 'SharePoint', 'SQL'],
  },
  {
    title: 'Data & Analytics',
    company: 'Videnda',
    fullCompany: 'Videnda',
    location: 'India',
    period: 'Oct 2020 – Sep 2021',
    current: false,
    bullets: [
      'Built foundational data analytics skills across business intelligence, reporting, and data pipeline management.',
    ],
    tech: ['Python', 'Data Analysis', 'Reporting'],
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Experience() {
  const [active, setActive] = useState(0)

  return (
    <section id="experience" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>02. experience</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Company tabs */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {jobs.map((job, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                border: 'none', cursor: 'pointer', textAlign: 'left',
                padding: '16px 20px',
                borderLeft: active === i ? '2px solid var(--accent)' : '2px solid var(--faint)',
                background: active === i ? 'rgba(200,169,110,0.06)' : 'transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  if (active !== i) (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,110,0.03)'
                }}
                onMouseLeave={e => {
                  if (active !== i) (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                <div style={{
                  fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.04em',
                  color: active === i ? 'var(--accent)' : 'var(--muted)',
                  transition: 'color 0.2s',
                }}>
                  {job.company}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '2px', fontFamily: 'monospace' }}>
                  {job.period.split('–')[0].trim()}
                </div>
                {job.current && (
                  <span style={{
                    fontFamily: 'monospace', fontSize: '8px', color: 'var(--green)',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: 'rgba(74,222,128,0.1)', padding: '2px 6px',
                    borderRadius: '100px', display: 'inline-block', marginTop: '4px',
                  }}>● current</span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Job content */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ marginBottom: '6px', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>
                {jobs[active].title}
              </h3>
              <span style={{ fontSize: '18px', color: 'var(--accent)' }}>
                @ {jobs[active].fullCompany}
              </span>
            </div>
            <p style={{
              fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)',
              letterSpacing: '0.04em', marginBottom: '28px',
            }}>
              {jobs[active].period} · {jobs[active].location}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', marginBottom: '28px' }}>
              {jobs[active].bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, fontSize: '12px', marginTop: '3px' }}>▸</span>
                  <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8 }}>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {jobs[active].tech.map(t => (
                <span key={t} style={{
                  fontFamily: 'monospace', fontSize: '11px', color: 'var(--accent)',
                  background: 'rgba(200,169,110,0.08)', padding: '4px 12px',
                  borderRadius: '100px', border: '1px solid rgba(200,169,110,0.2)',
                }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
