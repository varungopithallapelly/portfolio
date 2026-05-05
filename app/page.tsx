'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  const [theme, setTheme] = useState('dark')
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        left: mousePos.x,
        top: mousePos.y,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'left 0.1s ease, top 0.1s ease',
      }} />

      <main style={{ background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="lg:pl-[72px]">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  )
}
