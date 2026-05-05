'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const contacts = [
  { icon: <EmailIcon />, label: 'thallapellyvarun@gmail.com', href: 'mailto:thallapellyvarun@gmail.com', color: '#C8A96E' },
  { icon: <PhoneIcon />, label: '+44 7471 301 412', href: 'tel:+447471301412', color: '#4ADE80' },
  { icon: <LinkedinIcon />, label: 'linkedin.com/in/varun-gopi-thallapelly', href: 'https://www.linkedin.com/in/varun-gopi-thallapelly/', color: '#0A66C2' },
  { icon: <GithubIcon />, label: 'github.com/varungopithallapelly', href: 'https://github.com/varungopithallapelly', color: '#E8E6E0' },
  { icon: <InstagramIcon />, label: '@__varun._', href: 'https://www.instagram.com/__varun._/', color: '#E1306C' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [hovered, setHovered] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '56px' }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>05. contact</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Get In Touch
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '520px' }}>
            Open to new roles, freelance projects, and interesting conversations. My inbox is always open.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Contact links */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {contacts.map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(c.label)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px 20px',
                  background: hovered === c.label ? 'var(--bg)' : 'var(--surface2)',
                  border: hovered === c.label ? `1px solid ${c.color}40` : '1px solid var(--faint)',
                  borderRadius: '12px', textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: hovered === c.label ? `0 8px 32px ${c.color}15` : 'none',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${c.color}15`, border: `1px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color, flexShrink: 0, transition: 'transform 0.2s',
                  transform: hovered === c.label ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {c.icon}
                </div>
                <span style={{
                  fontSize: '13px', color: hovered === c.label ? 'var(--text)' : 'var(--muted)',
                  fontFamily: 'monospace', letterSpacing: '0.02em',
                  transition: 'color 0.2s', wordBreak: 'break-all',
                }}>
                  {c.label}
                </span>
                <motion.span
                  animate={{ x: hovered === c.label ? 4 : 0 }}
                  style={{ color: 'var(--accent)', marginLeft: 'auto', flexShrink: 0, fontSize: '14px' }}
                >
                  →
                </motion.span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {[
              { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type} required
                  value={form[field.key as 'name' | 'email']}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', background: 'var(--bg)', border: '1px solid var(--faint)',
                    borderRadius: '8px', padding: '12px 16px',
                    fontFamily: 'monospace', fontSize: '13px', color: 'var(--text)',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--faint)'}
                />
              </div>
            ))}

            <div>
              <label style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Message
              </label>
              <textarea
                required value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the role or project..."
                rows={5}
                style={{
                  width: '100%', background: 'var(--bg)', border: '1px solid var(--faint)',
                  borderRadius: '8px', padding: '12px 16px',
                  fontFamily: 'monospace', fontSize: '13px', color: 'var(--text)',
                  outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'}
                onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--faint)'}
              />
            </div>

            <motion.button
              type="submit" disabled={status === 'sending'}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              style={{
                fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '14px 32px',
                background: status === 'sent' ? 'rgba(74,222,128,0.15)' : 'var(--accent)',
                color: status === 'sent' ? 'var(--green)' : 'var(--bg)',
                border: status === 'sent' ? '1px solid rgba(74,222,128,0.4)' : 'none',
                borderRadius: '8px', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                fontWeight: 600, transition: 'all 0.2s',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent' : status === 'error' ? 'Try Again' : 'Send Message →'}
            </motion.button>

            {status === 'error' && (
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>
                Something went wrong. Email me directly at thallapellyvarun@gmail.com
              </p>
            )}
          </motion.form>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '80px', paddingTop: '32px', borderTop: '1px solid var(--faint)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.04em' }}>
            Designed & Built by <span style={{ color: 'var(--accent)' }}>Varun Thallapelly</span> · Guildford, United Kingdom
          </p>
        </div>
      </div>
    </section>
  )
}
