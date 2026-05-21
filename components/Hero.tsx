'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
}

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'var(--bg)', paddingTop: '80px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px', alignItems: 'center',
        }}>

          {/* Photo — shows first on mobile */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
            style={{ display: 'flex', justifyContent: 'center', order: -1 }}
          >
            <div style={{ position: 'relative', width: 'clamp(240px, 30vw, 360px)', height: 'clamp(240px, 30vw, 360px)' }}>
              <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1px solid rgba(200,169,110,0.4)' }} />
              <div style={{ position: 'absolute', inset: '-14px', borderRadius: '50%', border: '1px solid var(--faint)' }} />
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--faint)' }}>
                <Image
                  src="/images/varun_profile.avif"
                  alt="Varun Thallapelly — Data Analyst and AI Solutions Developer"
                  width={600} height={600} priority
                  style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: 'top center' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: '12px', right: '-8px',
                background: 'var(--surface)', border: '1px solid var(--faint)',
                borderRadius: '8px', padding: '8px 14px',
                fontFamily: 'monospace', fontSize: '11px',
                color: 'var(--accent)', letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>
                MSc Business Analytics
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.p custom={1} variants={fadeUp} initial="hidden" animate="show"
              style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.1em' }}
            >
              // Available for new roles
            </motion.p>

            <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="show"
              style={{
                fontSize: 'clamp(38px, 5vw, 66px)', fontWeight: 800,
                lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text)',
              }}
            >
              Varun<br />
              Thallapelly<span style={{ color: 'var(--accent)' }}>.</span>
            </motion.h1>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', padding: '5px 16px', borderRadius: '100px',
                background: 'rgba(200,169,110,0.1)', color: 'var(--accent)',
                border: '1px solid rgba(200,169,110,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>Data Analyst</span>
              <span style={{ color: 'var(--faint)' }}>+</span>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', padding: '5px 16px', borderRadius: '100px',
                background: 'rgba(74,222,128,0.08)', color: 'var(--green)',
                border: '1px solid rgba(74,222,128,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>AI Solutions Developer</span>
            </motion.div>

            <motion.p custom={4} variants={fadeUp} initial="hidden" animate="show"
              style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '480px' }}
            >
              I turn <strong style={{ color: 'var(--text)', fontWeight: 500 }}>complex data into decisions</strong> and build{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI systems that actually ship</strong> — from agentic
              voice agents serving 3 franchise clients, to custom payroll software that cut a one-week process to a single day.
            </motion.p>

            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
              style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.08em',
                  textTransform: 'uppercase', padding: '13px 28px',
                  background: 'var(--accent)', color: 'var(--bg)',
                  border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600,
                }}
              >View My Work</button>
              <a href="/varun-thallapelly-cv.pdf" download style={{
                fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '13px 28px',
                background: 'transparent', color: 'var(--muted)',
                border: '1px solid var(--faint)', borderRadius: '4px', cursor: 'pointer',
                textDecoration: 'none', display: 'inline-block',
              }}>Download CV</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)',
                letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--green)', boxShadow: '0 0 8px var(--green)',
                  display: 'inline-block', animation: 'pulse 2s ease infinite',
                }} />
                Open to opportunities
              </div>
            </motion.div>

            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show"
              style={{ display: 'flex', paddingTop: '32px', borderTop: '1px solid var(--faint)', gap: '0' }}
            >
              {[
                { num: '3+', label: 'Years\nExperience' },
                { num: '8+', label: 'Shipped\nProducts' },
                { num: '85%', label: 'Process Time\nReduced' },
                { num: '3', label: 'Freelance\nClients' },
              ].map((stat, i) => (
                <div key={i} style={{
                  flex: 1,
                  paddingRight: i < 3 ? '20px' : 0,
                  marginRight: i < 3 ? '20px' : 0,
                  borderRight: i < 3 ? '1px solid var(--faint)' : 'none',
                }}>
                  <div style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontFamily: 'monospace', fontSize: '9px', color: 'var(--muted)',
                    letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.5,
                  }}>
                    {stat.label.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
