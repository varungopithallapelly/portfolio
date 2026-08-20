'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
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
    items: [
      { label: 'Generating — ComfyUI', detail: 'Python 3.13, torch 2.12.0+xpu, AnimateDiff-Evolved, Advanced-ControlNet, VideoHelperSuite, IPAdapter_plus' },
      { label: 'Training — sd-lora-trainer', detail: 'Python 3.12, XPU fork of eden\'s trainer patched for Intel Arc instead of CUDA' },
    ]
  },
  {
    num: '02',
    title: 'The Pipeline',
    desc: 'Photos in, animated character out. The trained LoRA is the hinge: produced once by the trainer, then reused forever inside ComfyUI for both stills and video.',
    items: [
      { label: 'Input', detail: '20–30 photos of one person. Vary angle, lighting, outfit and background.' },
      { label: 'Preprocess', detail: 'Florence auto-captions each image. CLIPSeg segments the face and crops around it.' },
      { label: 'Train', detail: '600 steps on the Arc GPU. SD 1.5 at 512px, batch 2, rank 16. ~25 minutes.' },
      { label: 'Artifacts', detail: 'LoRA (~13 MB) for likeness + Embedding (~5 KB) for trigger token.' },
      { label: 'Generate', detail: 'Stills for quick feedback, then video with AnimateDiff + OpenPose ControlNet for motion.' },
    ]
  },
  {
    num: '03',
    title: 'Setting Up the Trainer',
    desc: 'Install Git and Python 3.12 alongside 3.13. Clone the XPU fork. Build a separate venv. Install torch from the Intel wheel index. Download the base model manually. Configure and train.',
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
    items: [
      { label: 'A — Requirements file broken', detail: 'pip rejects +xpu version labels with >=. Fix: install torch separately, filter the requirements.' },
      { label: 'B — wget missing on Windows', detail: 'Model downloader silently fails. Fix: download with curl.exe manually.' },
      { label: 'C — CLIPSeg image size mismatch', detail: 'Newer transformers don\'t auto-stretch. Fix: add interpolate_pos_encoding=True.' },
      { label: 'D — Python 3.13 incompatible', detail: 'No prebuilt wheels. Fix: use 3.12 for the trainer environment.' },
      { label: 'E — xformers warning', detail: 'Ignore it. xformers is CUDA-only. PyTorch cross-attention works on Intel.' },
      { label: 'F — DWPose slow on CPU', detail: 'onnxruntime has no XPU provider. Fix: switch to plain OpenPose or force CPU.' },
      { label: 'G — Batch size ≠ frame count', detail: 'AnimateDiff needs matching batch and frame count. Use VAEDecodeTiled if OOM.' },
    ]
  },
  {
    num: '05',
    title: 'What This Actually Gets You',
    desc: 'A capable free pipeline, not a local copy of a commercial video service.',
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

export default function IntelArcLoraPage() {
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>

      {/* Back nav */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 32px 0' }}>
        <Link href="/" style={{
          fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
          textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-flex',
          alignItems: 'center', gap: '8px', transition: 'opacity 0.2s',
        }}>
          ← Back to portfolio
        </Link>
      </div>

      {/* Hero */}
      <header style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 56px', borderBottom: '1px solid var(--faint)' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span style={{ width: '28px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
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
          {chips.map(chip => (
            <span key={chip.label} style={{
              fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)',
              border: '1px solid var(--faint)', borderRadius: '4px',
              padding: '6px 12px', background: 'var(--surface)',
            }}>
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{chip.label}</strong> {chip.value}
            </span>
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
            <a href="https://www.instagram.com/__varun._/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Instagram</a>.
          </p>
        </motion.div>

        {/* Slider */}
        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            maxWidth: '480px', margin: '0 auto',
            borderRadius: '16px', overflow: 'hidden',
            background: 'var(--surface)', border: '1px solid var(--faint)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <Image
                src={carouselImages[current].src}
                alt={carouselImages[current].alt}
                fill
                style={{ objectFit: 'cover' }}
                priority={current < 3}
              />
            </motion.div>
          </div>

          {/* Controls overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 12px', pointerEvents: 'none',
          }}>
            <button onClick={prev} disabled={current === 0} style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: current === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.6)',
              border: 'none', cursor: current === 0 ? 'default' : 'pointer',
              color: current === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
              fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'auto', transition: 'background 0.2s',
              backdropFilter: 'blur(8px)',
            }}>‹</button>
            <button onClick={next} disabled={current === carouselImages.length - 1} style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: current === carouselImages.length - 1 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.6)',
              border: 'none', cursor: current === carouselImages.length - 1 ? 'default' : 'pointer',
              color: current === carouselImages.length - 1 ? 'rgba(255,255,255,0.3)' : '#fff',
              fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'auto', transition: 'background 0.2s',
              backdropFilter: 'blur(8px)',
            }}>›</button>
          </div>

          {/* Counter */}
          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)',
            background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '100px',
            backdropFilter: 'blur(8px)', letterSpacing: '0.06em',
          }}>
            {current + 1} / {carouselImages.length}
          </div>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '6px',
          marginTop: '20px',
        }}>
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
      </section>

      {/* Technical Sections */}
      {sections.map((section, si) => (
        <section key={si} style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '64px 32px', borderBottom: '1px solid var(--faint)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#4CC9F0', letterSpacing: '0.1em' }}>{section.num}</span>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, letterSpacing: '-0.015em', margin: 0 }}>{section.title}</h2>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '60ch', marginBottom: '32px', lineHeight: 1.7 }}>
              {section.desc}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {section.items.map((item, ii) => (
              <motion.div
                key={ii}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ii * 0.05 }}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--faint)',
                  borderRadius: '8px', padding: '18px 20px',
                  borderLeft: section.num === '04' ? '3px solid #F4A62A' : '3px solid #4CC9F0',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(76,201,240,0.4)'
                  el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--faint)'
                  el.style.boxShadow = 'none'
                }}
              >
                <h4 style={{
                  fontSize: '14px', fontWeight: 600, margin: '0 0 6px',
                  color: section.num === '04' ? '#F4A62A' : 'var(--text)',
                }}>{item.label}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 80px' }}>
        <p style={{ fontSize: '13px', color: 'var(--muted)', maxWidth: '60ch', marginBottom: '12px', lineHeight: 1.7 }}>
          Tools used are open source and free: ComfyUI, AnimateDiff-Evolved, Advanced-ControlNet, VideoHelperSuite, IPAdapter_plus, and the XPU fork of eden&apos;s sd-lora-trainer.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          Only train likenesses of yourself or of people who have agreed to it.
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--faint)', letterSpacing: '0.08em' }}>
          Verified on Intel Arc 140V · 16 GB shared · Windows 11 · torch 2.12.0+xpu
        </p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/" style={{
            fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
            textDecoration: 'none', letterSpacing: '0.06em',
          }}>← Back to portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
