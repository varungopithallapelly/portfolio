'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const categories = ['All', 'AI & Automation', 'Data Analytics', 'Software', 'Web & Marketing', 'Freelance']

const projects = [
  {
    slug: 'ai-agent',
    title: 'Agentic AI Customer Support',
    category: ['AI & Automation', 'Freelance'],
    type: 'Freelance',
    year: '2024',
    tagline: '3 optical gallery clients · 72 languages · 24/7',
    color: '#4ADE80',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0A0E1A 100%)',
    icon: '⚡',
    tech: ['Agentic AI', 'NLP', 'Voice Agents', 'Python', 'Sentiment Analysis'],
  },
  {
    slug: 'payroll',
    title: 'In-House Payroll Software',
    category: ['Software'],
    type: 'SD Care',
    year: '2023',
    tagline: 'Reduced 1-week payroll process to 1 day',
    color: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #0A0E1A 100%)',
    icon: '💰',
    tech: ['Python', 'MongoDB', 'React JS', 'QuickBooks API'],
  },
  {
    slug: 'invoicing',
    title: 'Accounts Receivable & Invoicing',
    category: ['Software'],
    type: 'SD Care',
    year: '2023',
    tagline: 'Automated 2-week invoicing cycle to 1 day',
    color: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #0A0E1A 100%)',
    icon: '📄',
    tech: ['Python', 'Nourish Care API', 'Excel', 'PDF Generation'],
  },
  {
    slug: 'hr-suite',
    title: 'HR Automation Suite',
    category: ['AI & Automation', 'Software'],
    type: 'SD Care',
    year: '2023',
    tagline: 'Full HR pipeline automated end-to-end',
    color: '#7C9EFF',
    gradient: 'linear-gradient(135deg, #0a0d2a 0%, #0A0E1A 100%)',
    icon: '👥',
    tech: ['Python', 'React JS', 'Email Automation', 'LinkedIn API'],
  },
  {
    slug: 'ai-buddy',
    title: 'AI Buddy App — Healthcare',
    category: ['AI & Automation', 'Software', 'Freelance'],
    type: 'SD Care',
    year: '2024',
    tagline: 'Live on Web, Android & iOS',
    color: '#4ADE80',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0A0E1A 100%)',
    icon: '🤖',
    tech: ['React JS', 'React Native', 'AI Integration', 'MongoDB'],
  },
  {
    slug: 'website',
    title: 'Unified Company Website',
    category: ['Web & Marketing'],
    type: 'SD Care',
    year: '2024',
    tagline: 'Top Core Web Vitals · AI smart search · SEO',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #0A0E1A 100%)',
    icon: '🌐',
    tech: ['Next.js', 'SEO', 'Google Ads', 'AI Smart Search'],
  },
  {
    slug: 'interview-sim',
    title: 'AI Interview Simulator',
    category: ['AI & Automation', 'Freelance'],
    type: 'Product',
    year: '2024',
    tagline: 'AI recruiter conducts real mock interviews',
    color: '#C084FC',
    gradient: 'linear-gradient(135deg, #120a2a 0%, #0A0E1A 100%)',
    icon: '🎯',
    tech: ['AI', 'NLP', 'React JS', 'Python'],
  },
  {
    slug: 'insurance-analytics',
    title: 'Motor Insurance Pricing Analytics',
    category: ['Data Analytics'],
    type: 'MSc Academic',
    year: '2022',
    tagline: '+27% pricing accuracy · -15% cost of risk',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #0A0E1A 100%)',
    icon: '📊',
    tech: ['R Studio', 'Power BI', 'MS Excel', 'Predictive Modelling'],
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category.includes(filter))

  return (
    <section id="projects" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>03. projects</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '32px' }}>
            Things I&apos;ve Built
          </h2>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const count = cat === 'All' ? projects.length : projects.filter(p => p.category.includes(cat)).length
              return (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.06em',
                  padding: '7px 16px', borderRadius: '100px', cursor: 'pointer',
                  border: filter === cat ? '1px solid var(--accent)' : '1px solid var(--faint)',
                  background: filter === cat ? 'rgba(200,169,110,0.12)' : 'transparent',
                  color: filter === cat ? 'var(--accent)' : 'var(--muted)',
                  transition: 'all 0.2s',
                }}>
                  {cat} <span style={{ opacity: 0.5, marginLeft: '4px' }}>{count}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div layout style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    onHoverStart={() => setHovered(project.slug)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={{ y: -8, transition: { duration: 0.2, ease: 'easeOut' } }}
                    style={{
                      background: 'var(--surface)',
                      border: hovered === project.slug ? `1px solid ${project.color}60` : '1px solid var(--faint)',
                      borderRadius: '16px', overflow: 'hidden',
                      cursor: 'pointer', height: '100%',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      boxShadow: hovered === project.slug ? `0 20px 60px ${project.color}15` : 'none',
                    }}
                  >
                    {/* Card image area */}
                    <div style={{
                      height: '200px', position: 'relative',
                      background: project.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                      {/* Background pattern */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)',
                      }} />

                      {/* Big icon */}
                      <div style={{
                        fontSize: '56px', opacity: 0.9,
                        filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))',
                        transition: 'transform 0.3s',
                        transform: hovered === project.slug ? 'scale(1.1)' : 'scale(1)',
                      }}>
                        {project.icon}
                      </div>

                      {/* Add image instruction - remove once images added */}
                      <div style={{
                        position: 'absolute', bottom: '8px', left: '12px',
                        fontFamily: 'monospace', fontSize: '9px',
                        color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em',
                      }}>
                        /images/projects/{project.slug}-1.jpg
                      </div>

                      {/* Type badge */}
                      <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        fontFamily: 'monospace', fontSize: '9px',
                        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '3px 10px', borderRadius: '100px',
                        color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em',
                      }}>
                        {project.type}
                      </div>

                      <div style={{
                        position: 'absolute', top: '14px', left: '14px',
                        fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)',
                      }}>
                        {project.year}
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontSize: '16px', fontWeight: 600, color: 'var(--text)',
                        lineHeight: 1.3, marginBottom: '8px',
                        transition: 'color 0.2s',
                      }}>
                        {project.title}
                      </h3>

                      <p style={{
                        fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6,
                        marginBottom: '14px',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: project.color, display: 'inline-block', flexShrink: 0,
                        }} />
                        {project.tagline}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        {project.tech.slice(0, 3).map(t => (
                          <span key={t} style={{
                            fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)',
                            background: 'var(--surface2)', padding: '3px 8px', borderRadius: '4px',
                          }}>{t}</span>
                        ))}
                        {project.tech.length > 3 && (
                          <span style={{
                            fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)',
                            background: 'var(--surface2)', padding: '3px 8px', borderRadius: '4px',
                          }}>+{project.tech.length - 3}</span>
                        )}
                      </div>

                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        fontFamily: 'monospace', fontSize: '11px',
                        color: hovered === project.slug ? project.color : 'var(--muted)',
                        transition: 'color 0.2s',
                        letterSpacing: '0.04em',
                      }}>
                        View case study
                        <motion.span animate={{ x: hovered === project.slug ? 4 : 0 }} transition={{ duration: 0.2 }}>
                          →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
