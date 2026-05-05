'use client'

import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'

const skillGroups = [
  {
    category: 'Data & Analytics',
    color: 'var(--accent)',
    skills: ['Python (Pandas, NumPy)', 'R Studio', 'Power BI', 'PostgreSQL', 'MS Excel (Advanced)', 'IBM SPSS Modeller', 'Stata', 'SIMUL8', 'Predictive Modelling', 'KPI Design', 'Scikit-learn', 'DEAP'],
  },
  {
    category: 'AI, ML & Automation',
    color: 'var(--green)',
    skills: ['Agentic AI Systems', 'NLP', 'Sentiment Analysis', 'AI Voice Agents', 'Workflow Automation', 'Model Retraining', 'Prompt Engineering', 'Smart Search Integration'],
  },
  {
    category: 'Software & Web Development',
    color: '#7C9EFF',
    skills: ['Python (Backend)', 'React JS', 'Next.js', 'MongoDB', 'Full-Stack Development', 'API Integration', 'Core Web Vitals', 'SEO Optimisation', 'Website Performance'],
  },
  {
    category: 'Business & Strategy',
    color: '#C084FC',
    skills: ['Business Process Analysis', 'Financial Modelling', '5-Year Business Planning', 'KPI Frameworks', 'SharePoint Admin', 'ISO 9001:2015', 'CQC Audit Support', 'Strategic Planning'],
  },
  {
    category: 'Design & Architecture',
    color: '#F97316',
    skills: ['AutoCAD (Floor Plans)', 'SketchUp Pro', 'V-Ray Rendering', '3D Architectural Models', 'UI/UX Design'],
  },
  {
    category: 'Marketing & Ads',
    color: '#EC4899',
    skills: ['Google Ads', 'Meta Ads', 'Landing Page Design', 'SEO Strategy', 'Campaign Attribution', 'Conversion Tracking'],
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>04. skills</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Technologies & Tools
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
              style={{
                background: 'var(--bg)', border: '1px solid var(--faint)',
                borderRadius: '12px', padding: '24px',
                borderTop: `2px solid ${group.color}`,
              }}
            >
              <p style={{
                fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: group.color, marginBottom: '16px', fontWeight: 600,
              }}>
                {group.category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.skills.map(skill => (
                  <span key={skill} style={{
                    fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
                    background: 'var(--surface)', padding: '4px 12px',
                    borderRadius: '100px', border: '1px solid var(--faint)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
