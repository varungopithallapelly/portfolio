'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

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

            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/varungopithallapelly' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/varun-gopi-thallapelly/' },
                { label: 'Email', href: 'mailto:thallapellyvarun@gmail.com' },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
                  letterSpacing: '0.06em', textDecoration: 'none',
                  borderBottom: '1px solid rgba(200,169,110,0.3)',
                  paddingBottom: '2px', transition: 'color 0.2s',
                }}>
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { category: 'Data & Analytics', items: ['Python', 'R Studio', 'Power BI', 'PostgreSQL', 'MS Excel', 'SPSS'] },
                { category: 'AI & Automation', items: ['Agentic AI', 'NLP', 'Sentiment Analysis', 'Voice Agents', 'Workflow Automation'] },
                { category: 'Development', items: ['React JS', 'Next.js', 'MongoDB', 'Python Backend', 'API Integration'] },
                { category: 'Web & Marketing', items: ['SEO', 'Core Web Vitals', 'Google Ads', 'Meta Ads', 'Smart Search'] },
                { category: 'Business', items: ['KPI Design', 'Financial Modelling', 'ISO 9001', 'CQC Audit', 'SharePoint'] },
              ].map(group => (
                <div key={group.category} style={{
                  background: 'var(--surface)', border: '1px solid var(--faint)',
                  borderRadius: '10px', padding: '16px 20px',
                }}>
                  <p style={{
                    fontFamily: 'monospace', fontSize: '10px', color: 'var(--accent)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px',
                  }}>{group.category}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.items.map(item => (
                      <span key={item} style={{
                        fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                        background: 'var(--surface2)', padding: '3px 10px',
                        borderRadius: '100px', border: '1px solid var(--faint)',
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
