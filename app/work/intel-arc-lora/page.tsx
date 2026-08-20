'use client'

import { useState, useEffect, useRef } from 'react'
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
    items: [
      { label: 'Generating — ComfyUI', detail: 'Python 3.13, torch 2.12.0+xpu, AnimateDiff-Evolved, Advanced-ControlNet, VideoHelperSuite, IPAdapter_plus' },
      { label: 'Training — sd-lora-trainer', detail: 'Python 3.12, XPU fork of eden\'s trainer patched for Intel Arc instead of CUDA' },
    ]
  },
  {
    num: '02',
    title: 'The Pipeline',
    desc: 'Photos in, animated character out. The trained LoRA is the hinge: produced once by the trainer, then reused forever inside ComfyUI.',
    color: '#5BD99C',
    items: [
      { label: 'Input', detail: '20–30 photos of one person. Vary angle, lighting, outfit and background.' },
      { label: 'Preprocess', detail: 'Florence auto-captions each image. CLIPSeg segments the face and crops around it.' },
      { label: 'Train', detail: '600 steps on the Arc GPU. SD 1.5 at 512px, batch 2, rank 16. ~25 minutes.' },
      { label: 'Artifacts', detail: 'LoRA (~13 MB) for likeness + Embedding (~5 KB) for trigger token.' },
      { label: 'Generate', detail: 'Stills for quick feedback, then video with AnimateDiff + OpenPose ControlNet.' },
    ]
  },
  {
    num: '03',
    title: 'Setting Up the Trainer',
    desc: 'Install Git and Python 3.12 alongside 3.13. Clone the XPU fork. Build a separate venv. Install torch from the Intel wheel index.',
    color: '#4CC9F0',
    items: [
      { label: 'torch 2.12.0+xpu', detail: 'Installed from the Intel wheel index, not PyPI' },
      { label: 'Base model', detail: 'Juggernaut Reborn (SD 1.5), downloaded manually via curl.exe' },
      { label: 'Config', detail: 'Resolution 512, batch 2, max 600 steps, checkpoints at 200/400/600' },
    ]
  },
  {
    num: '04',
    title: 'The Fixes No Tutorial Mentions',
    desc: 'Every one of these is a Linux or CUDA assumption baked into tooling that was never tested on Windows with an Intel GPU.',
    color: '#F4A62A',
    items: [
      { label: 'A — Requirements file broken', detail: 'pip rejects +xpu version labels with >=. Fix: install torch separately, filter the requirements.' },
      { label: 'B — wget missing on Windows', detail: 'Model downloader silently fails. Fix: download with curl.exe manually.' },
      { label: 'C — CLIPSeg image size mismatch', detail: 'Newer transformers don\'t auto-stretch. Fix: add interpolate_pos_encoding=True.' },
      { label: 'D — Python 3.13 incompatible', detail: 'No prebuilt wheels. Fix: use 3.12 for the trainer environment.' },
      { label: 'E — xformers warning', detail: 'Ignore it. xformers is CUDA-only. PyTorch cross-attention works fine on Intel.' },
      { label: 'F — DWPose slow on CPU', detail: 'onnxruntime has no XPU provider. Fix: switch to plain OpenPose or force CPU.' },
      { label: 'G — Batch size ≠ frame count', detail: 'AnimateDiff needs matching batch and frame count. Use VAEDecodeTiled if OOM.' },
    ]
  },
  {
    num: '05',
    title: 'What This Actually Gets You',
    desc: 'A capable free pipeline, not a local copy of a commercial video service.',
    color: '#5BD99C',
    items: [
      { label: 'Works well', detail: 'Strong still images. Quick 25-min training. Medium shots animate well. Everything stays on your machine.' },
      { label: 'Know the limits', detail: 'Faces drift between frames. SD 1.5 anatomy is loose. SDXL/Flux need more VRAM. LoRA is architecture-locked.' },
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

function ArrowButton({ direction, onClick, disabled }: { direction: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: disabled ? 'var(--surface)' : 'var(--accent)',
        border: disabled ? '1px solid var(--faint)' : '1px solid var(--accent)',
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? 'var(--faint)' : 'var(--bg)',
        fontSize: '18px', fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s', flexShrink: 0,
      }}
    >
      {direction === 'left' ? '‹' : '›'}
    </motion.button>
  )
}

export default function IntelArcLoraPage() {
  const [current, setCurrent] = useState(0)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const startX = useRef(0)

  const next = () => setCurrent(c => Math.min(c + 1, carouselImages.length - 1))
  const prev = () => setCurrent(c => Math.max(c - 1, 0))

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => c < carouselImages.length - 1 ? c + 1 : 0)
    }, 4000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 32px 0' }}
      >
        <Link href="/" style={{
          fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
          textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-flex',
          alignItems: 'center', gap: '8px', padding: '8px 16px',
          background: 'var(--surface)', border: '1px solid var(--faint)',
          borderRadius: '8px', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--accent)'; el.style.background = 'rgba(200,169,110,0.08)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--faint)'; el.style.background = 'var(--surface)' }}
        >
          ← Back to portfolio
        </Link>
      </motion.div>

      {/* Hero */}
      <header style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 56px', borderBottom: '1px solid var(--faint)' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4CC9F0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span style={{ width: '28px', height: '1px', background: '#4CC9F0', display: 'inline-block' }} />
          Build log · Windows 11 · Intel Arc · no CUDA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 700, lineHeight: 1.05,
            letterSpacing: '-0.025em', margin: '0 0 20px', maxWidth: '18ch',
          }}
        >
          Training a character on a laptop that <span style={{ color: '#4CC9F0' }}>wasn&apos;t supposed to</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--muted)', maxWidth: '60ch', marginBottom: '28px', lineHeight: 1.7 }}
        >
          A working end-to-end setup for character LoRA training and motion-control video on{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Intel Arc integrated graphics</strong>{' '}
          — no NVIDIA, no cloud, no subscription. Every tool here is free and runs locally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
        >
          {chips.map((chip, i) => (
            <motion.span
              key={chip.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              style={{
                fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)',
                border: '1px solid var(--faint)', borderRadius: '6px',
                padding: '6px 12px', background: 'var(--surface)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#4CC9F0'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--faint)'}
            >
              <strong style={{ color: '#4CC9F0', fontWeight: 500 }}>{chip.label}</strong> {chip.value}
            </motion.span>
          ))}
        </motion.div>
      </header>

      {/* Instagram Carousel */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px', borderBottom: '1px solid var(--faint)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>
            INSTAGRAM CAROUSEL
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.015em', marginBottom: '8px' }}>
            The visual breakdown
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>
            Swipe through the carousel or use arrow keys. Originally posted on{' '}
            <a href="https://www.instagram.com/__varun._/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#E1306C', textDecoration: 'none', fontWeight: 500 }}>@__varun._</a>
          </p>
        </motion.div>

        {/* Slider with OUTSIDE arrows */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(12px, 3vw, 24px)', maxWidth: '600px', margin: '0 auto',
        }}>

          {/* Left arrow — outside */}
          <ArrowButton direction="left" onClick={prev} disabled={current === 0} />

          {/* Image container */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative', flex: 1, maxWidth: '440px',
              borderRadius: '16px', overflow: 'hidden',
              background: 'var(--surface)', border: '1px solid var(--faint)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={carouselImages[current].src}
                    alt={carouselImages[current].alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={current < 3}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Counter badge */}
              <div style={{
                position: 'absolute', top: '14px', right: '14px',
                fontFamily: 'monospace', fontSize: '11px', color: '#fff',
                background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '100px',
                backdropFilter: 'blur(8px)', letterSpacing: '0.06em',
              }}>
                {current + 1} / {carouselImages.length}
              </div>
            </div>
          </div>

          {/* Right arrow — outside */}
          <ArrowButton direction="right" onClick={next} disabled={current === carouselImages.length - 1} />
        </div>

        {/* Dots + progress bar */}
        <div style={{ maxWidth: '440px', margin: '20px auto 0' }}>
          {/* Progress bar */}
          <div style={{
            width: '100%', height: '3px', background: 'var(--faint)',
            borderRadius: '100px', overflow: 'hidden', marginBottom: '16px',
          }}>
            <motion.div
              animate={{ width: `${((current + 1) / carouselImages.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%', background: 'var(--accent)', borderRadius: '100px' }}
            />
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? '24px' : '8px', height: '8px',
                  borderRadius: '100px', border: 'none', cursor: 'pointer',
                  background: i === current ? 'var(--accent)' : 'var(--faint)',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Sections — interactive accordion */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '12px' }}>
            TECHNICAL BREAKDOWN
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.015em', marginBottom: '8px' }}>
            How it works
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '40px' }}>
            Click any section to expand. Each card reveals detail on hover.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sections.map((section, si) => {
            const isOpen = expandedSection === si
            return (
              <motion.div
                key={si}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: si * 0.05 }}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--faint)',
                  borderRadius: '12px', overflow: 'hidden',
                  borderLeft: `3px solid ${section.color}`,
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Section header — clickable */}
                <button
                  onClick={() => setExpandedSection(isOpen ? null : si)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '20px 24px', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '16px',
                  }}
                >
                  <span style={{
                    fontFamily: 'monospace', fontSize: '13px', color: section.color,
                    letterSpacing: '0.1em', fontWeight: 600, flexShrink: 0,
                  }}>{section.num}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                      {section.title}
                    </h3>
                    {!isOpen && (
                      <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: 1.5 }}>
                        {section.desc}
                      </p>
                    )}
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: 'var(--muted)', fontSize: '18px', flexShrink: 0 }}
                  >
                    ▾
                  </motion.span>
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 24px 24px' }}>
                        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.7 }}>
                          {section.desc}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                          {section.items.map((item, ii) => {
                            const cardKey = `${si}-${ii}`
                            const isCardExpanded = expandedCard === cardKey
                            return (
                              <motion.div
                                key={ii}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: ii * 0.04 }}
                                onClick={() => setExpandedCard(isCardExpanded ? null : cardKey)}
                                style={{
                                  background: 'var(--bg)', border: '1px solid var(--faint)',
                                  borderRadius: '8px', padding: '14px 16px',
                                  cursor: 'pointer',
                                  borderLeft: `3px solid ${section.color}`,
                                  transition: 'all 0.2s',
                                  boxShadow: isCardExpanded ? `0 4px 20px ${section.color}20` : 'none',
                                }}
                                onMouseEnter={e => {
                                  const el = e.currentTarget as HTMLElement
                                  el.style.borderColor = section.color
                                  el.style.transform = 'translateY(-2px)'
                                }}
                                onMouseLeave={e => {
                                  const el = e.currentTarget as HTMLElement
                                  el.style.borderColor = 'var(--faint)'
                                  el.style.transform = 'translateY(0)'
                                }}
                              >
                                <h4 style={{
                                  fontSize: '13px', fontWeight: 600, margin: '0 0 4px',
                                  color: section.color, display: 'flex', alignItems: 'center', gap: '8px',
                                }}>
                                  {item.label}
                                  <span style={{ fontSize: '10px', color: 'var(--faint)', marginLeft: 'auto' }}>
                                    {isCardExpanded ? '−' : '+'}
                                  </span>
                                </h4>
                                <AnimatePresence>
                                  {isCardExpanded && (
                                    <motion.p
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      style={{ margin: 0, fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65, overflow: 'hidden' }}
                                    >{item.detail}</motion.p>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
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
          textDecoration: 'none', letterSpacing: '0.06em',
          padding: '10px 20px', border: '1px solid var(--accent)', borderRadius: '8px',
          transition: 'all 0.2s', display: 'inline-block',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--accent)'; el.style.color = 'var(--bg)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--accent)' }}
        >
          ← Back to portfolio
        </Link>
      </footer>
    </div>
  )
}
