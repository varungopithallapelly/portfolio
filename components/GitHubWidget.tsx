'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

const langColors: Record<string, string> = {
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  'Jupyter Notebook': '#F37626',
  R: '#276DC3',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Shell: '#89E051',
}

export default function GitHubWidget() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/varungopithallapelly/repos?sort=updated&per_page=6')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter((r: Repo) => !r.name.includes('varungopithallapelly')).slice(0, 6))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="github" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>
              04. github
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Code & Projects
            </h2>
          </div>
          <a
            href="https://github.com/varungopithallapelly"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.08em',
              textTransform: 'uppercase', padding: '10px 20px',
              background: 'transparent', color: 'var(--accent)',
              border: '1px solid var(--accent)', borderRadius: '6px',
              textDecoration: 'none', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--accent)'; el.style.color = 'var(--bg)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--accent)' }}
          >
            View Full Profile →
          </a>
        </motion.div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                height: '160px', background: 'var(--surface2)', borderRadius: '12px',
                border: '1px solid var(--faint)', animation: 'pulse 1.5s ease infinite',
              }} />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)', fontFamily: 'monospace', fontSize: '13px' }}>
            Could not load repositories. <a href="https://github.com/varungopithallapelly" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>View on GitHub →</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onHoverStart={() => setHovered(repo.id)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  padding: '20px 24px',
                  background: 'var(--bg)',
                  border: hovered === repo.id ? '1px solid var(--accent)' : '1px solid var(--faint)',
                  borderRadius: '12px', textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: hovered === repo.id ? '0 8px 32px rgba(200,169,110,0.1)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--muted)">
                    <path d="M3 3h18v2H3V3zm0 8h18v2H3v-2zm0 8h18v2H3v-2z"/>
                    <path d="M13 3v18M7 3v18" stroke="var(--muted)" strokeWidth="1"/>
                  </svg>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '14px', fontWeight: 600,
                    color: hovered === repo.id ? 'var(--accent)' : 'var(--text)',
                    transition: 'color 0.2s', flex: 1,
                  }}>
                    {repo.name}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65, flex: 1,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {repo.description || 'No description provided.'}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {repo.topics.slice(0, 3).map(t => (
                      <span key={t} style={{
                        fontFamily: 'monospace', fontSize: '10px',
                        background: 'rgba(200,169,110,0.08)', color: 'var(--accent)',
                        border: '1px solid rgba(200,169,110,0.2)',
                        padding: '2px 8px', borderRadius: '100px',
                      }}>{t}</span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: '1px solid var(--faint)' }}>
                  {repo.language && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: langColors[repo.language] || '#888', flexShrink: 0,
                      }} />
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)' }}>{repo.language}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--muted)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)' }}>{repo.stargazers_count}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                      <circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/>
                      <path d="M18 9v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9M12 12v3"/>
                    </svg>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)' }}>{repo.forks_count}</span>
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--faint)', marginLeft: 'auto' }}>
                    {new Date(repo.updated_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* GitHub stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '32px', padding: '20px 24px',
            background: 'var(--bg)', border: '1px solid var(--faint)', borderRadius: '12px',
            display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'GitHub', value: '@varungopithallapelly' },
              { label: 'Repos', value: `${repos.length}+ public` },
              { label: 'Focus', value: 'Python · AI · Web' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--accent)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://github.com/varungopithallapelly"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)',
              textDecoration: 'none', letterSpacing: '0.06em',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View all repositories →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
