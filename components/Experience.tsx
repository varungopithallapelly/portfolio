'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'

const jobs = [
  {
    title: 'Data Analyst',
    company: 'SD Care Agency',
    fullCompany: 'San Damiano Corporation Ltd.',
    location: 'Guildford, UK',
    period: 'Aug 2024 – Present',
    current: true,
    bullets: [
      'Led data analytics initiatives designing KPIs and interactive dashboards to monitor performance and drive continuous improvement.',
      'Analysed business processes across HR, Finance, and Operations — implementing optimisations that materially improved operational efficiency.',
      'Worked directly with the CEO and Finance Manager to build a 5-year business plan and financial restructuring strategy.',
      'Supported ISO 9001:2015 quality audits and CQC inspections — both entities achieved a Good CQC rating.',
      'Delivered data-driven insights and reporting frameworks supporting IT and marketing functions.',
    ],
    tech: ['Python', 'Power BI', 'PostgreSQL', 'Excel', 'SharePoint', 'ISO 9001'],
  },
  {
    title: 'IT Executive',
    company: 'SD Care Agency',
    fullCompany: 'San Damiano Corporation Ltd.',
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

const education = [
  {
    degree: 'MSc Business Analytics',
    school: 'University of Surrey',
    location: 'Guildford, United Kingdom',
    period: 'Sep 2021 – Sep 2022',
    grade: 'Merit',
    modules: ['Predictive Modelling', 'Business Intelligence', 'Statistical Analysis', 'Data Visualisation', 'Operations Research'],
    icon: '🎓',
  },
  {
    degree: 'BEng Electrical Engineering',
    school: 'Kakatiya Institute of Technology & Science',
    location: 'Warangal, India',
    period: 'Jun 2016 – Jun 2020',
    grade: 'First Class',
    modules: ['Circuit Analysis', 'Power Systems', 'Control Systems', 'Signal Processing'],
    icon: '⚡',
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

        {/* Section header */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>
            02. experience
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        {/* Work experience */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'start', marginBottom: '80px' }}>

          {/* Company tabs — redesigned */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {jobs.map((job, i) => {
              const isActive = active === i
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    padding: '16px 20px', borderRadius: '10px',
                    background: isActive ? 'rgba(200,169,110,0.12)' : 'var(--bg)',
                    borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                    outline: isActive ? '1px solid rgba(200,169,110,0.25)' : '1px solid var(--faint)',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(200,169,110,0.05)'
                      el.style.borderLeftColor = 'rgba(200,169,110,0.4)'
                      el.style.outline = '1px solid rgba(200,169,110,0.2)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'var(--bg)'
                      el.style.borderLeftColor = 'transparent'
                      el.style.outline = '1px solid var(--faint)'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em',
                      color: isActive ? 'var(--accent)' : 'var(--text)',
                      transition: 'color 0.2s',
                    }}>
                      {job.company}
                    </span>
                    {job.current && (
                      <span style={{
                        fontFamily: 'monospace', fontSize: '9px', color: 'var(--green)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        background: 'rgba(74,222,128,0.12)', padding: '2px 8px',
                        borderRadius: '100px', border: '1px solid rgba(74,222,128,0.3)',
                        flexShrink: 0,
                      }}>● NOW</span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '13px', fontWeight: 500,
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    marginBottom: '4px', transition: 'color 0.2s',
                  }}>
                    {job.title}
                  </div>
                  <div style={{
                    fontFamily: 'monospace', fontSize: '11px',
                    color: isActive ? 'rgba(200,169,110,0.8)' : 'var(--muted)',
                    letterSpacing: '0.04em', transition: 'color 0.2s',
                  }}>
                    {job.period}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute', right: '16px', top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '12px', color: 'var(--accent)',
                      }}
                    >
                      →
                    </motion.div>
                  )}
                </button>
              )
            })}
          </motion.div>

          {/* Job detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--bg)', border: '1px solid var(--faint)',
              borderRadius: '12px', padding: '28px',
            }}
          >
            <div style={{ marginBottom: '6px', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>
                {jobs[active].title}
              </h3>
              <span style={{ fontSize: '16px', color: 'var(--accent)', fontWeight: 500 }}>
                @ {jobs[active].fullCompany}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                background: 'var(--surface)', padding: '4px 10px', borderRadius: '6px',
                border: '1px solid var(--faint)', letterSpacing: '0.04em',
              }}>
                📅 {jobs[active].period}
              </span>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                background: 'var(--surface)', padding: '4px 10px', borderRadius: '6px',
                border: '1px solid var(--faint)', letterSpacing: '0.04em',
              }}>
                📍 {jobs[active].location}
              </span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', marginBottom: '24px' }}>
              {jobs[active].bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--accent)', flexShrink: 0, fontSize: '10px',
                    marginTop: '5px', fontWeight: 700,
                  }}>▸</span>
                  <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8 }}>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--faint)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {jobs[active].tech.map(t => (
                <span key={t} style={{
                  fontFamily: 'monospace', fontSize: '11px', color: 'var(--accent)',
                  background: 'rgba(200,169,110,0.1)', padding: '4px 12px',
                  borderRadius: '100px', border: '1px solid rgba(200,169,110,0.25)',
                  fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ marginBottom: '40px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>
            02b. education
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '32px' }}>
            Academic Background
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--bg)', border: '1px solid var(--faint)',
                  borderRadius: '12px', padding: '24px',
                  borderTop: '3px solid var(--accent)',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(200,169,110,0.12)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.4)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--faint)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                  }}>
                    {edu.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.2 }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 500 }}>
                      {edu.school}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                    background: 'var(--surface)', padding: '4px 10px', borderRadius: '6px',
                    border: '1px solid var(--faint)', letterSpacing: '0.04em',
                  }}>
                    📅 {edu.period}
                  </span>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                    background: 'var(--surface)', padding: '4px 10px', borderRadius: '6px',
                    border: '1px solid var(--faint)', letterSpacing: '0.04em',
                  }}>
                    📍 {edu.location}
                  </span>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '11px', color: 'var(--green)',
                    background: 'rgba(74,222,128,0.1)', padding: '4px 10px', borderRadius: '6px',
                    border: '1px solid rgba(74,222,128,0.25)', letterSpacing: '0.04em',
                  }}>
                    ✓ {edu.grade}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {edu.modules.map(m => (
                    <span key={m} style={{
                      fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)',
                      background: 'var(--surface)', padding: '3px 8px',
                      borderRadius: '4px', border: '1px solid var(--faint)',
                    }}>{m}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
