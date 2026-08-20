'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const carouselImages = [
  { src: '/images/work/lora/01_hook_you_dont_own_it.jpg', alt: 'You don\'t own the AI version of you' },
  { src: '/images/work/lora/02_credits_expire.jpg', alt: 'Credits expire' },
  { src: '/images/work/lora/03_the_laptop.jpg', alt: 'The laptop' },
  { src: '/images/work/lora/04_what_i_built.jpg', alt: 'What I built' },
  { src: '/images/work/lora/05_rent_vs_own.jpg', alt: 'Rent vs own' },
  { src: '/images/work/lora/06_the_stack.jpg', alt: 'The stack' },
  { src: '/images/work/lora/07_models_fit_my_laptop.jpg', alt: 'Models fit my laptop' },
  { src: '/images/work/lora/08_speed_and_cloud.jpg', alt: 'Speed and cloud' },
  { src: '/images/work/lora/09_where_the_money_is.jpg', alt: 'Where the money is' },
  { src: '/images/work/lora/10_honest_limits.jpg', alt: 'Honest limits' },
  { src: '/images/work/lora/11_didnt_invent_the_wheel.jpg', alt: 'Didn\'t invent the wheel' },
  { src: '/images/work/lora/12_ideas_welcome.jpg', alt: 'Ideas welcome' },
]

const sections = [
  {
    num: '01',
    title: 'Two Environments, Kept Apart',
    desc: 'Generating and training need different Python versions, so they get separate installs. Mixing them breaks both.',
    color: '#4CC9F0',
    icon: '⚙️',
    items: [
      { label: 'Generating — ComfyUI', detail: 'Python 3.13, torch 2.12.0+xpu, AnimateDiff-Evolved, Advanced-ControlNet, VideoHelperSuite, IPAdapter_plus', icon: '🖥️' },
      { label: 'Training — sd-lora-trainer', detail: 'Python 3.12, XPU fork of eden\'s trainer patched for Intel Arc instead of CUDA', icon: '🧠' },
    ]
  },
  {
    num: '02',
    title: 'The Pipeline',
    desc: 'Photos in, animated character out. The trained LoRA is the hinge: produced once by the trainer, then reused forever inside ComfyUI.',
    color: '#5BD99C',
    icon: '🔄',
    items: [
      { label: 'Input', detail: '20–30 photos of one person. Vary angle, lighting, outfit and background.', icon: '📸' },
      { label: 'Preprocess', detail: 'Florence auto-captions each image. CLIPSeg segments the face and crops around it.', icon: '✂️' },
      { label: 'Train', detail: '600 steps on the Arc GPU. SD 1.5 at 512px, batch 2, rank 16. ~25 minutes.', icon: '⚡' },
      { label: 'Artifacts', detail: 'LoRA (~13 MB) for likeness + Embedding (~5 KB) for trigger token.', icon: '📦' },
      { label: 'Generate', detail: 'Stills for quick feedback, then video with AnimateDiff + OpenPose ControlNet.', icon: '🎬' },
    ]
  },
  {
    num: '03',
    title: 'Setting Up the Trainer',
    desc: 'Install Git and Python 3.12 alongside 3.13. Clone the XPU fork. Build a separate venv. Install torch from the Intel wheel index.',
    color: '#4CC9F0',
    icon: '🛠️',
    items: [
      { label: 'torch 2.12.0+xpu', detail: 'Installed from the Intel wheel index, not PyPI', icon: '🔥' },
      { label: 'Base model', detail: 'Juggernaut Reborn (SD 1.5), downloaded manually via curl.exe', icon: '📥' },
      { label: 'Config', detail: 'Resolution 512, batch 2, max 600 steps, checkpoints at 200/400/600', icon: '⚙️' },
    ]
  },
  {
    num: '04',
    title: 'The Fixes No Tutorial Mentions',
    desc: 'Every one of these is a Linux or CUDA assumption baked into tooling never tested on Windows with Intel Arc.',
    color: '#F4A62A',
    icon: '🔧',
    items: [
      { label: 'Requirements file broken', detail: 'pip rejects +xpu version labels with >=. Fix: install torch separately, filter the requirements.', icon: 'A' },
      { label: 'wget missing on Windows', detail: 'Model downloader silently fails. Fix: download with curl.exe manually.', icon: 'B' },
      { label: 'CLIPSeg size mismatch', detail: 'Newer transformers don\'t auto-stretch. Fix: add interpolate_pos_encoding=True.', icon: 'C' },
      { label: 'Python 3.13 incompatible', detail: 'No prebuilt wheels. Fix: use 3.12 for the trainer environment.', icon: 'D' },
      { label: 'xformers warning', detail: 'Ignore it. xformers is CUDA-only. PyTorch cross-attention works fine on Intel.', icon: 'E' },
      { label: 'DWPose slow on CPU', detail: 'onnxruntime has no XPU provider. Fix: switch to plain OpenPose or force CPU.', icon: 'F' },
      { label: 'Batch ≠ frame count', detail: 'AnimateDiff needs matching batch and frame count. Use VAEDecodeTiled if OOM.', icon: 'G' },
    ]
  },
  {
    num: '05',
    title: 'What This Actually Gets You',
    desc: 'A capable free pipeline, not a local copy of a commercial video service.',
    color: '#5BD99C',
    icon: '✅',
    items: [
      { label: 'Works well', detail: 'Strong still images. Quick 25-min training. Medium shots animate well. Everything stays on your machine.', icon: '✅' },
      { label: 'Know the limits', detail: 'Faces drift between frames. SD 1.5 anatomy is loose. SDXL/Flux need more VRAM. LoRA is architecture-locked.', icon: '⚠️' },
    ]
  },
]

const chips = [
  { label: 'GPU', value: 'Intel Arc 140V (integrated)' },
  { label: 'VRAM', value: '16 GB shared' },
  { label: 'Backend', value: 'torch 2.12.0+xpu' },
  { label: 'Models', value: 'SD 1.5 only' },
  { label: 'Train time', value: '~25 min / 600 steps' },
]

function ArrowBtn({ dir, onClick, disabled }: { dir: 'l' | 'r'; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      onClick={onClick} disabled={disabled}
      style={{
        width: '48px', height: '48px', borderRadius: '50%',
        background: disabled ? 'var(--surface)' : 'var(--accent)',
        border: disabled ? '1px solid var(--faint)' : 'none',
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? 'var(--faint)' : 'var(--bg)',
        fontSize: '20px', fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s', flexShrink: 0,
        boxShadow: disabled ? 'none' : '0 4px 16px rgba(200,169,110,0.3)',
      }}
    >{dir === 'l' ? '‹' : '›'}</motion.button>
  )
}

export default function IntelArcLoraPage() {
  const [current, setCurrent] = useState(0)
  const [activeSection, setActiveSection] = useState<number>(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef(0)

  const next = useCallback(() => setCurrent(c => c < carouselImages.length - 1 ? c + 1 : 0), [])
  const prev = useCallback(() => setCurrent(c => c > 0 ? c - 1 : carouselImages.length - 1), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  // Auto-advance — pauses on hover
  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, current, next])

  const handleTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 32px 0' }}>
        <Link href="/" style={{
          fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
          textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-flex',
          alignItems: 'center', gap: '8px', padding: '8px 16px',
          background: 'var(--surface)', border: '1px solid var(--faint)',
          borderRadius: '8px', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--faint)' }}
        >← Back to portfolio</Link>
      </motion.div>

      {/* Hero */}
      <header style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 56px', borderBottom: '1px solid var(--faint)' }}>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4CC9F0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '28px', height: '1px', background: '#4CC9F0', display: 'inline-block' }} />
          Build log · Windows 11 · Intel Arc · no CUDA
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 20px', maxWidth: '18ch' }}>
          Training a character on a laptop that <span style={{ color: '#4CC9F0' }}>wasn&apos;t supposed to</span>.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--muted)', maxWidth: '60ch', marginBottom: '28px', lineHeight: 1.7 }}>
          A working end-to-end setup for character LoRA training and motion-control video on{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Intel Arc integrated graphics</strong>{' '}
          — no NVIDIA, no cloud, no subscription.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {chips.map((chip, i) => (
            <motion.span key={chip.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              style={{
                fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)',
                border: '1px solid var(--faint)', borderRadius: '6px',
                padding: '6px 12px', background: 'var(--surface)', transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#4CC9F0'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--faint)'}
            >
              <strong style={{ color: '#4CC9F0', fontWeight: 500 }}>{chip.label}</strong> {chip.value}
            </motion.span>
          ))}
        </motion.div>
      </header>

      {/* Carousel */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px', borderBottom: '1px solid var(--faint)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>INSTAGRAM CAROUSEL</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '8px' }}>The visual breakdown</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>
            Swipe, click arrows, or use keyboard. Auto-advances every 4s, pauses on hover. Posted on{' '}
            <a href="https://www.instagram.com/__varun._/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#E1306C', textDecoration: 'none', fontWeight: 500 }}>@__varun._</a>
          </p>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 3vw, 28px)', maxWidth: '620px', margin: '0 auto' }}>
          <ArrowBtn dir="l" onClick={prev} disabled={false} />

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative', flex: 1, maxWidth: '440px',
              borderRadius: '16px', overflow: 'hidden',
              background: 'var(--surface)',
              border: paused ? '2px solid var(--accent)' : '2px solid var(--faint)',
              boxShadow: paused ? '0 24px 64px rgba(200,169,110,0.15)' : '0 24px 64px rgba(0,0,0,0.3)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div key={current}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                >
                  <Image src={carouselImages[current].src} alt={carouselImages[current].alt}
                    fill style={{ objectFit: 'cover' }} priority={current < 3} />
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div style={{
                position: 'absolute', top: '14px', right: '14px',
                fontFamily: 'monospace', fontSize: '11px', color: '#fff',
                background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '100px',
                backdropFilter: 'blur(8px)',
              }}>
                {current + 1} / {carouselImages.length}
              </div>

              {/* Paused indicator */}
              {paused && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute', bottom: '14px', left: '14px',
                    fontFamily: 'monospace', fontSize: '10px', color: 'var(--accent)',
                    background: 'rgba(0,0,0,0.6)', padding: '3px 10px', borderRadius: '100px',
                    backdropFilter: 'blur(8px)', letterSpacing: '0.06em',
                  }}>⏸ PAUSED</motion.div>
              )}
            </div>
          </div>

          <ArrowBtn dir="r" onClick={next} disabled={false} />
        </div>

        {/* Progress + dots */}
        <div style={{ maxWidth: '440px', margin: '20px auto 0' }}>
          <div style={{ width: '100%', height: '3px', background: 'var(--faint)', borderRadius: '100px', overflow: 'hidden', marginBottom: '14px' }}>
            <motion.div animate={{ width: `${((current + 1) / carouselImages.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%', background: 'var(--accent)', borderRadius: '100px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {carouselImages.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? '24px' : '8px', height: '8px',
                borderRadius: '100px', border: 'none', cursor: 'pointer',
                background: i === current ? 'var(--accent)' : 'var(--faint)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical — tab layout */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 32px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>TECHNICAL BREAKDOWN</p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '40px' }}>How it works</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(200px, 25%, 260px) 1fr', gap: '24px', alignItems: 'start' }}>

          {/* Left tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'sticky', top: '80px' }}>
            {sections.map((s, i) => {
              const isActive = activeSection === i
              return (
                <button key={i} onClick={() => setActiveSection(i)}
                  style={{
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    padding: '14px 16px', borderRadius: '10px',
                    background: isActive ? `${s.color}12` : 'transparent',
                    borderLeft: `3px solid ${isActive ? s.color : 'transparent'}`,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--surface)' }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent' }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px' }}>{s.icon}</span>
                    <span style={{
                      fontFamily: 'monospace', fontSize: '11px',
                      color: isActive ? s.color : 'var(--faint)',
                      letterSpacing: '0.08em', fontWeight: 600, transition: 'color 0.2s',
                    }}>{s.num}</span>
                  </div>
                  <span style={{
                    fontSize: '13px', fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    transition: 'color 0.2s',
                  }}>{s.title}</span>
                </button>
              )
            })}
          </div>

          {/* Right content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'var(--surface)', border: '1px solid var(--faint)',
                borderRadius: '14px', padding: '32px',
                borderTop: `3px solid ${sections[activeSection].color}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{sections[activeSection].icon}</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{sections[activeSection].title}</h3>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px', maxWidth: '55ch' }}>
                {sections[activeSection].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sections[activeSection].items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: ii * 0.06 }}
                    style={{
                      background: 'var(--bg)', border: '1px solid var(--faint)',
                      borderRadius: '10px', padding: '16px 20px',
                      display: 'flex', gap: '14px', alignItems: 'flex-start',
                      transition: 'all 0.2s', cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = sections[activeSection].color
                      el.style.transform = 'translateX(4px)'
                      el.style.boxShadow = `0 4px 20px ${sections[activeSection].color}15`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--faint)'
                      el.style.transform = 'translateX(0)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    <span style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: `${sections[activeSection].color}15`,
                      border: `1px solid ${sections[activeSection].color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: sections[activeSection].num === '04' ? '12px' : '14px',
                      fontFamily: sections[activeSection].num === '04' ? 'monospace' : 'inherit',
                      fontWeight: sections[activeSection].num === '04' ? 700 : 400,
                      color: sections[activeSection].color,
                    }}>{item.icon}</span>
                    <div>
                      <h4 style={{
                        fontSize: '14px', fontWeight: 600, margin: '0 0 4px',
                        color: 'var(--text)',
                      }}>{item.label}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Section nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--faint)' }}>
                <button
                  onClick={() => setActiveSection(s => Math.max(0, s - 1))}
                  disabled={activeSection === 0}
                  style={{
                    fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.06em',
                    color: activeSection === 0 ? 'var(--faint)' : 'var(--muted)',
                    background: 'none', border: 'none', cursor: activeSection === 0 ? 'default' : 'pointer',
                    transition: 'color 0.2s',
                  }}
                >← Previous</button>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--faint)' }}>
                  {activeSection + 1} of {sections.length}
                </span>
                <button
                  onClick={() => setActiveSection(s => Math.min(sections.length - 1, s + 1))}
                  disabled={activeSection === sections.length - 1}
                  style={{
                    fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.06em',
                    color: activeSection === sections.length - 1 ? 'var(--faint)' : 'var(--accent)',
                    background: 'none', border: 'none',
                    cursor: activeSection === sections.length - 1 ? 'default' : 'pointer',
                    transition: 'color 0.2s',
                  }}
                >Next →</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 80px', borderTop: '1px solid var(--faint)' }}>
        <p style={{ fontSize: '13px', color: 'var(--muted)', maxWidth: '60ch', marginBottom: '12px', lineHeight: 1.7 }}>
          Tools used are open source and free: ComfyUI, AnimateDiff-Evolved, Advanced-ControlNet, VideoHelperSuite, IPAdapter_plus, and the XPU fork of eden&apos;s sd-lora-trainer.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          Only train likenesses of yourself or of people who have agreed to it.
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--faint)', letterSpacing: '0.08em', marginBottom: '24px' }}>
          Verified on Intel Arc 140V · 16 GB shared · Windows 11 · torch 2.12.0+xpu
        </p>
        <Link href="/" style={{
          fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
          textDecoration: 'none', padding: '10px 20px',
          border: '1px solid var(--accent)', borderRadius: '8px',
          transition: 'all 0.2s', display: 'inline-block',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--accent)'; el.style.color = 'var(--bg)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--accent)' }}
        >← Back to portfolio</Link>
      </footer>
    </div>
  )
}
