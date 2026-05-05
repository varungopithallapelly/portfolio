'use client'

import { motion, Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/varungopithallapelly', color: '#E8E6E0', bg: 'rgba(232,230,224,0.1)', border: 'rgba(232,230,224,0.2)' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/varun-gopi-thallapelly/', color: '#0A66C2', bg: 'rgba(10,102,194,0.15)', border: 'rgba(10,102,194,0.4)' },
  { label: 'Instagram', href: 'https://www.instagram.com/__varun._/', color: '#E1306C', bg: 'rgba(225,48,108,0.12)', border: 'rgba(225,48,108,0.35)' },
  { label: 'Email', href: 'mailto:thallapellyvarun@gmail.com', color: '#C8A96E', bg: 'rgba(200,169,110,0.12)', border: 'rgba(200,169,110,0.35)' },
  { label: '+44 7471 301 412', href: 'tel:+447471301412', color: '#4ADE80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.3)' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>01. about</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Who I Am
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'start' }}>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.9 }}>
              I&apos;m a <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Data Analyst and AI Solutions Developer</strong> based
              in Guildford, United Kingdom, with an MSc in Business Analytics from the University of Surrey. I specialise in
              turning messy data and complex business problems into clean, automated systems that save real time and cost.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.9 }}>
              At SD Care, I&apos;ve built everything from a fully custom payroll system that reduced a week-long process to a single
              day, to an agentic AI voice system serving 3 optical franchise clients simultaneously — handling 72 languages,
              real-time tone analysis, and 24/7 inbound call management.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.9 }}>
              I care about <strong style={{ color: 'var(--text)', fontWeight: 500 }}>building things that actually work</strong> — not
              just dashboards that look good in demos, but software that teams use every single day and that make a measurable
              difference to how a business operates.
            </p>

            {/* Eye-catching link buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'monospace', fontSize: '11px',
                    color: link.color,
                    background: link.bg,
                    border: `1px solid ${link.border}`,
                    padding: '7px 14px', borderRadius: '8px',
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'all 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = `0 4px 16px ${link.border}`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { category: 'Data & Analytics', color: '#C8A96E', items: ['Python', 'R Studio', 'Power BI', 'PostgreSQL', 'MS Excel', 'SPSS'] },
                { category: 'AI & Automation', color: '#4ADE80', items: ['Agentic AI', 'NLP', 'Sentiment Analysis', 'Voice Agents', 'Workflow Automation'] },
                { category: 'Development', color: '#7C9EFF', items: ['React JS', 'Next.js', 'MongoDB', 'Python Backend', 'API Integration'] },
                { category: 'Web & Marketing', color: '#EC4899', items: ['SEO', 'Core Web Vitals', 'Google Ads', 'Meta Ads', 'Smart Search'] },
                { category: 'Business', color: '#F97316', items: ['KPI Design', 'Financial Modelling', 'ISO 9001', 'CQC Audit', 'SharePoint'] },
              ].map(group => (
                <div key={group.category} style={{
                  background: 'var(--surface)', border: '1px solid var(--faint)',
                  borderRadius: '10px', padding: '14px 18px',
                  borderLeft: `3px solid ${group.color}`,
                }}>
                  <p style={{
                    fontFamily: 'monospace', fontSize: '10px', color: group.color,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600,
                  }}>{group.category}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {group.items.map(item => (
                      <span key={item} style={{
                        fontFamily: 'monospace', fontSize: '11px', color: 'var(--text)',
                        background: `${group.color}15`,
                        border: `1px solid ${group.color}30`,
                        padding: '3px 10px', borderRadius: '100px',
                        fontWeight: 500,
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
