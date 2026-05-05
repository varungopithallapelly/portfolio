'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import GitHubWidget from '@/components/GitHubWidget'
import VapiWidget from '@/components/VapiWidget'
import ThemeProvider from '@/components/ThemeProvider'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <ThemeProvider>
      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        left: mousePos.x, top: mousePos.y,
        width: '700px', height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', zIndex: 0,
        transition: 'left 0.12s ease, top 0.12s ease',
      }} />

      <main style={{ background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <div className="lg:pl-[72px]">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <GitHubWidget />
          <Skills />
          <Contact />
        </div>
        <VapiWidget />
      </main>
    </ThemeProvider>
  )
}
