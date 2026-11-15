'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import { profile, socials } from '@/lib/data'
import { SectionHeading, SpotlightCard } from './ui'
import { GithubIcon } from './icons'

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
  Python: '#3776AB', JavaScript: '#E0B500', TypeScript: '#3178C6', 'Jupyter Notebook': '#F37626',
  R: '#276DC3', HTML: '#E34F26', CSS: '#1572B6', Shell: '#4EAA25',
}

export default function GitHubWidget() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=12`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data.filter((r: Repo) => !r.name.includes(profile.github)).slice(0, 6))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="github" className="relative py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="05" eyebrow="Open source" title={<>Fresh from <span className="italic font-medium text-accent">GitHub</span>.</>} />
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost group">
            <GithubIcon size={17} /> @{profile.github}
            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(6)].map((_, i) => <div key={i} className="skeleton h-[170px] rounded-[22px] border border-line" />)
            : repos.length === 0
              ? (
                <div className="card col-span-full p-10 text-center text-muted">
                  Couldn&apos;t load repositories right now.{' '}
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline-draw">View on GitHub →</a>
                </div>
              )
              : repos.map((repo, i) => (
                <motion.a
                  key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group block"
                >
                  <SpotlightCard className="flex h-full flex-col gap-3 p-6" spot={langColors[repo.language ?? ''] ?? 'var(--accent)'}>
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 text-muted"><GithubIcon size={16} /></span>
                      <span className="flex-1 truncate font-mono text-[14px] font-semibold text-ink">{repo.name}</span>
                      <ArrowUpRight size={16} className="text-subtle transition-transform group-hover:rotate-45 group-hover:text-ink" />
                    </div>
                    <p className="line-clamp-2 flex-1 text-[14.5px] leading-relaxed text-muted">{repo.description || 'No description provided.'}</p>
                    {repo.topics?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {repo.topics.slice(0, 3).map(t => <span key={t} className="chip !py-1 !text-[11px]">{t}</span>)}
                      </div>
                    )}
                    <div className="flex items-center gap-4 border-t border-line pt-3 font-mono text-[12px] text-subtle">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="size-2.5 rounded-full" style={{ background: langColors[repo.language] ?? 'var(--subtle)' }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Star size={13} />{repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={13} />{repo.forks_count}</span>
                      <span className="ml-auto">{new Date(repo.updated_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </SpotlightCard>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  )
}
