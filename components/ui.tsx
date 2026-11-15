'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react'
import { animate, motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/* Fade/slide in when scrolled into view */
export function Reveal({ children, delay = 0, y = 24, className, style }: {
  children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Section header: numbered eyebrow + display title + optional intro */
export function SectionHeading({ index, eyebrow, title, intro, align = 'left' }: {
  index: string; eyebrow: string; title: ReactNode; intro?: ReactNode; align?: 'left' | 'center'
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto text-center' : ''} style={{ maxWidth: align === 'center' ? 720 : undefined }}>
      <div className={`flex items-center gap-3 mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs text-subtle">{index}</span>
        <span className="h-px w-10 bg-line-strong" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="font-display font-bold tracking-tight text-ink text-[clamp(34px,5.2vw,60px)] leading-[1.02]">
        {title}
      </h2>
      {intro && <p className={`mt-5 max-w-[58ch] text-[17px] leading-relaxed text-muted ${align === 'center' ? 'mx-auto' : ''}`}>{intro}</p>}
    </Reveal>
  )
}

/* Card with a cursor-following spotlight and optional 3D tilt */
export function SpotlightCard({ children, className = '', style, tilt = false, spot }: {
  children: ReactNode; className?: string; style?: CSSProperties; tilt?: boolean; spot?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rx = useSpring(0, { stiffness: 200, damping: 20 })
  const ry = useSpring(0, { stiffness: 200, damping: 20 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    if (tilt && !reduce) {
      ry.set(((x / r.width) - 0.5) * 8)
      rx.set(-((y / r.height) - 0.5) * 8)
    }
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card spotlight ${className}`}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900, ...(spot ? { ['--spot' as string]: spot } : {}) }}
    >
      {children}
    </motion.div>
  )
}

/* Element that drifts toward the cursor when hovered */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={e => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/* Number that counts up once visible */
export function CountUp({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: v => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

/* Small helper for tinted chips: sets --c */
export const tintStyle = (color: string): CSSProperties => ({ ['--c' as string]: color })
