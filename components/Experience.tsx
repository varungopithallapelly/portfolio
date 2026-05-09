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
      'Collaborated directly with the CEO and Finance Manager to build a 5-year strategic business plan and financial restructuring model to support group-level expansion.',
      'Developed a fully custom in-house payroll system (Python, MongoDB, React JS) integrating data from multiple clock-in platforms, reduced a one-week manual payroll process to a single day.',
      'Built an automated accounts receivable and invoicing system pulling live data from Nourish Care software, generating monthly and bi-weekly client invoices, cut a two-week cycle to one day.',
      'Led website consolidation and digital infrastructure project, unified two company sites into a single high-performance platform with AI smart search, SEO optimisation, Google Ads and Meta Ads, Google Tag Manager, and Google Analytics 4.',
      'Designed and deployed end-to-end business intelligence infrastructure, built KPI frameworks and interactive Power BI dashboards monitoring performance across HR, Finance, and Operations in real time.',
      'Conducted deep-dive process analysis across all business units, identifying inefficiencies and implementing data-driven optimisations that materially reduced operational overhead.',
      'Delivered an end-to-end HR automation suite covering training tracking, recruitment pipeline management, annual leave, appraisals, and QCS policy compliance.',
      'Supported ISO 9001:2015 quality management audits and CQC inspections — both SD Care entities achieved a Good CQC rating.',
      'Built and deployed an AI-powered companion app (Web, Android, iOS) for healthcare clients, improving client engagement and daily wellbeing communication.',
    ],
    tech: ['Python', 'Power BI', 'PostgreSQL', 'MongoDB', 'React JS', 'Next.js', 'Excel', 'SharePoint', 'ISO 9001', 'Google Analytics 4', 'Google Tag Manager'],
  },
  {
    title: 'IT Executive',
    company: 'SD Care Agency',
    fullCompany: 'San Damiano Corporation Ltd.',
    location: 'Guildford, UK',
    period: 'Nov 2023 – Jul 2024',
    current: false,
    bullets: [
      'Integrated and managed Mindbody CRM for Omnia Lifestyle Limited, handling pricing configuration, booking systems, therapist management, and website chatbot integration for digital client engagement.',
      'Developed a Field Supervision Report application (phone, tablet, desktop) for the domiciliary care team — enabling live carer supervision, performance rating, feedback recording, and offline report generation.',
      'Built an automated HR operations application combining annual leave computation, HR meeting invitation generation, and resignation acceptance processing, enabling the HR team to prepare and send documentation in minutes.',
      'Developed an appraisal form application (AppSheet) where HR sets objectives, routes to line manager for review and rating, and the system auto-generates a formatted PDF on completion.',
      'Built an in-house training tracker dashboard connected to CareSkills with live completion dashboards, targeted email actions, and automated weekly training status reminders.',
      'Designed and implemented an end-to-end hiring process tracker on Monday.com covering the full recruitment pipeline from CV receipt through to onboarding, with a centralised employee database.',
      'Acted as the internal technical lead bridging business requirements and technology delivery across HR, Finance, Operations, and Marketing.',
    ],
    tech: ['Mindbody CRM', 'AppSheet', 'Monday.com', 'CareSkills', 'AI Automation', 'Power BI', 'SharePoint', 'System Administration'],
  },
  {
    title: 'Data Analyst',
    company: 'Trade Wins Ltd',
    fullCompany: 'Trade Wins Ltd',
    location: 'Remote',
    period: 'Oct 2022 – Jul 2023',
    current: false,
    bullets: [
      'Designed dashboards and reporting templates to support business decision-making and performance tracking.',
      'Managed and optimised SharePoint and database systems to improve data accessibility and integrity.',
      'Automated administrative workflows, reducing manual effort for HR and finance processes.',
      'Provided analytical insights for project planning, recruitment administration, and performance management.',
    ],
    tech: ['Python', 'Power BI', 'Excel', 'SharePoint', 'SQL'],
  },
]

const education = [
  {
    degree: 'MSc Business Analytics',
    school: 'University of Surrey',
    location: 'Guildford, United Kingdom',
    period: 'Sep 2021 – Sep 2022',
  },
  {
    degree: 'BSc Electrical Engineering',
    school: 'Kakatiya Institute of Technology & Science',
    location: 'Warangal, India',
    period: 'Jun 2016 – Jun 2020',
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
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>
            02. experience
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'start', marginBottom: '80px' }}>

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
                      fontFamily: 'monospace', fontSize: '13px', fontWeight: 600,
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
                    fontSize: '13px', fontWeight: 500, marginBottom: '4px',
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    transition: 'color 0.2s',
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
                    <span style={{
                      position: 'absolute', right: '16px', top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '14px', color: 'var(--accent)',
                    }}>→</span>
                  )}
                </button>
              )
            })}
          </motion.div>

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
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                background: 'var(--surface)', padding: '4px 12px', borderRadius: '6px',
                border: '1px solid var(--faint)', letterSpacing: '0.04em',
              }}>{jobs[active].period}</span>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                background: 'var(--surface)', padding: '4px 12px', borderRadius: '6px',
                border: '1px solid var(--faint)', letterSpacing: '0.04em',
              }}>{jobs[active].location}</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', marginBottom: '24px' }}>
              {jobs[active].bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, fontSize: '10px', marginTop: '5px', fontWeight: 700 }}>▸</span>
                  <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8 }}>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--faint)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {jobs[active].tech.map(t => (
                <span key={t} style={{
                  fontFamily: 'monospace', fontSize: '11px', color: 'var(--accent)',
                  background: 'rgba(200,169,110,0.1)', padding: '4px 12px',
                  borderRadius: '100px', border: '1px solid rgba(200,169,110,0.25)', fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
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
                  borderRadius: '12px', padding: '28px',
                  borderTop: '3px solid var(--accent)',
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 12px 40px rgba(200,169,110,0.12)'
                  el.style.borderColor = 'rgba(200,169,110,0.4)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'var(--faint)'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', lineHeight: 1.2 }}>
                  {edu.degree}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 500, marginBottom: '16px' }}>
                  {edu.school}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                    background: 'var(--surface)', padding: '4px 12px', borderRadius: '6px',
                    border: '1px solid var(--faint)', letterSpacing: '0.04em',
                  }}>{edu.period}</span>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                    background: 'var(--surface)', padding: '4px 12px', borderRadius: '6px',
                    border: '1px solid var(--faint)', letterSpacing: '0.04em',
                  }}>{edu.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}