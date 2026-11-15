'use client'

import { useEffect, useRef } from 'react'

// Fixed decorative layers: dot grid, drifting colour blobs, film grain and a
// soft light that follows the cursor. Cursor position is written to CSS vars
// (no React re-renders).
export default function Background() {
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        lightRef.current?.style.setProperty('--mx', `${e.clientX}px`)
        lightRef.current?.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-dots" />
      <div className="blob blob-a" style={{ width: '42vw', height: '42vw', left: '-10vw', top: '-12vw', background: 'color-mix(in oklab, var(--accent) 55%, #ffd7a8)' }} />
      <div className="blob blob-b" style={{ width: '36vw', height: '36vw', right: '-8vw', top: '18vh', background: 'color-mix(in oklab, var(--violet) 45%, #ffc6dc)' }} />
      <div className="blob blob-c" style={{ width: '40vw', height: '40vw', left: '30vw', bottom: '-20vw', background: 'color-mix(in oklab, var(--green) 40%, #d8f0c8)' }} />
      <div ref={lightRef} className="absolute inset-0 cursor-light" />
      <div className="absolute inset-0 bg-grain" />
    </div>
  )
}
