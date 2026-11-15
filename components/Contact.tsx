'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail, Phone, Send } from 'lucide-react'
import { profile, socials } from '@/lib/data'
import { Magnetic, Reveal } from './ui'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const reasons = ['A full-time role', 'A freelance project', 'An AI / automation idea', 'Just saying hi']

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">{label}</span>
      {children}
    </label>
  )
}

const inputCls = 'w-full rounded-2xl border border-line bg-surface-2 px-4 py-3.5 text-[15px] text-ink placeholder:text-subtle outline-none transition-all focus:border-ink focus:bg-surface focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_15%,transparent)]'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [reason, setReason] = useState(reasons[0])
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch {}
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message: `[${reason}]\n\n${form.message}` }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="relative py-[clamp(90px,12vw,150px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* Left: pitch */}
            <div className="relative overflow-hidden bg-[#1B1913] p-8 text-[#F4F0E8] sm:p-12">
              <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-accent opacity-40 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-violet opacity-30 blur-3xl" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-mono text-xs opacity-60">07</span>
                  <span className="h-px w-10 bg-current opacity-30" />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] opacity-80">Contact</span>
                </div>
                <Reveal>
                  <h2 className="font-display text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
                    Let&apos;s build<br />something<br /><span className="italic font-medium text-accent">useful.</span>
                  </h2>
                </Reveal>
                <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed opacity-75">
                  Open to new roles, freelance projects, and interesting conversations. My inbox is always open.
                </p>

                <button
                  onClick={copy}
                  className="group mt-10 flex w-full max-w-[420px] items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3 pl-4 text-left backdrop-blur transition-colors hover:bg-white/10"
                >
                  <Mail size={18} className="shrink-0 opacity-70" />
                  <span className="flex-1 truncate text-[15px] font-medium">{profile.email}</span>
                  <span className="relative grid h-9 min-w-[92px] place-items-center rounded-xl bg-[#F4F0E8] px-3 text-[13px] font-semibold text-[#18160F]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span key={copied ? 'y' : 'n'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-1.5">
                        {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </button>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { l: 'LinkedIn', h: socials.linkedin, i: <LinkedinIcon size={16} /> },
                    { l: 'GitHub', h: socials.github, i: <GithubIcon size={16} /> },
                    { l: 'Instagram', h: socials.instagram, i: <InstagramIcon size={16} /> },
                    { l: profile.phone, h: profile.phoneHref, i: <Phone size={16} /> },
                  ].map(s => (
                    <Magnetic key={s.l} strength={0.2}>
                      <a href={s.h} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-[13px] font-medium opacity-85 transition-all hover:bg-white/10 hover:opacity-100">
                        {s.i}{s.l}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={submit} className="space-y-5 p-8 sm:p-12">
              <div>
                <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">I&apos;m reaching out about</span>
                <div className="flex flex-wrap gap-2">
                  {reasons.map(r => (
                    <button
                      type="button" key={r} onClick={() => setReason(r)} aria-pressed={reason === r}
                      className={`rounded-full border px-4 py-2 text-[14px] font-medium transition-all ${reason === r ? 'border-ink bg-ink text-bg' : 'border-line bg-surface-2 text-muted hover:border-line-strong hover:text-ink'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={inputCls} />
                </Field>
              </div>
              <Field label="Message">
                <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the role or project…" className={`${inputCls} resize-y`} />
              </Field>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button type="submit" disabled={status === 'sending'} className={`btn min-w-[180px] ${status === 'sent' ? 'bg-green text-white' : 'btn-primary'} disabled:opacity-70`}>
                  {status === 'sending' ? <><span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Sending…</>
                    : status === 'sent' ? <><Check size={17} /> Message sent</>
                    : <><Send size={16} /> {status === 'error' ? 'Try again' : 'Send message'}</>}
                </button>
                {status === 'error' && <p className="text-[14px] text-[#D93025]">Something went wrong. Email me directly at {profile.email}.</p>}
                {status === 'sent' && <p className="text-[14px] text-muted">Thanks! I&apos;ll get back to you soon.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 text-[14px] text-muted sm:px-8">
        <p>
          Designed &amp; built by <span className="font-semibold text-ink">{profile.name}</span> · {profile.location}
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 font-mono text-[12px] text-subtle sm:flex">Press <span className="kbd">Ctrl</span><span className="kbd">K</span> to search</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 font-semibold text-ink underline-draw">
            Back to top <ArrowUpRight size={15} className="-rotate-45" />
          </button>
        </div>
      </div>
    </footer>
  )
}
