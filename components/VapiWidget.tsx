'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// REPLACE THESE WITH YOUR VAPI CREDENTIALS
const VAPI_PUBLIC_KEY = 'ae05102d-6db4-429e-be3a-7373ff67117d'
const VAPI_ASSISTANT_ID = '6faf3c38-2630-47c3-9258-8e2031f3e85b'

type CallStatus = 'idle' | 'connecting' | 'active' | 'ended'

export default function VapiWidget() {
  const [status, setStatus] = useState<CallStatus>('idle')
  const [expanded, setExpanded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0)
  const vapiRef = useRef<unknown>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const startCall = async () => {

    setStatus('connecting')
    try {
      const { default: Vapi } = await import('@vapi-ai/web')
      const vapi = new Vapi(VAPI_PUBLIC_KEY)
      vapiRef.current = vapi

      vapi.on('call-start', () => setStatus('active'))
      vapi.on('call-end', () => { setStatus('ended'); setTimeout(() => setStatus('idle'), 2000) })
      vapi.on('volume-level', (v: number) => setVolume(v))
      vapi.on('error', () => setStatus('idle'))

      await vapi.start(VAPI_ASSISTANT_ID)
    } catch {
      setStatus('idle')
    }
  }

  const endCall = () => {
    if (vapiRef.current) {
      (vapiRef.current as { stop: () => void }).stop()
    }
    setStatus('ended')
    setTimeout(() => setStatus('idle'), 2000)
  }

  const toggleMute = () => {
    if (vapiRef.current) {
      (vapiRef.current as { setMuted: (m: boolean) => void }).setMuted(!isMuted)
    }
    setIsMuted(!isMuted)
  }

  const isActive = status === 'active'
  const isConnecting = status === 'connecting'

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--faint)',
              borderRadius: '16px', padding: '20px', width: '280px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
              }}>⚡</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>AI Voice Demo</div>
                <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                  {isActive ? 'Live call · speak now' : isConnecting ? 'Connecting...' : 'Talk to my AI agent'}
                </div>
              </div>
              {isActive && (
                <div style={{
                  marginLeft: 'auto', display: 'flex', gap: '3px', alignItems: 'flex-end', height: '20px',
                }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i}
                      animate={{ height: isActive ? `${Math.max(4, volume * 20 * (0.5 + Math.random() * 0.5))}px` : '4px' }}
                      transition={{ duration: 0.1 }}
                      style={{ width: '3px', background: 'var(--green)', borderRadius: '2px', minHeight: '4px' }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {status === 'idle' && (
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                Experience a live demo of the agentic AI voice system I built for 3 optical gallery clients. Ask it anything about booking, services, or pricing.
              </p>
            )}

            {/* Action buttons */}
            {status === 'idle' && (
              <button onClick={startCall} style={{
                width: '100%', padding: '12px',
                background: 'var(--accent)', color: 'var(--bg)',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.08em',
                textTransform: 'uppercase', fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                <span>🎤</span> Start Voice Demo
              </button>
            )}

            {isConnecting && (
              <div style={{ textAlign: 'center', padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--muted)' }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                  Connecting...
                </motion.span>
              </div>
            )}

            {isActive && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={toggleMute} style={{
                  flex: 1, padding: '10px',
                  background: isMuted ? 'rgba(239,68,68,0.15)' : 'var(--surface2)',
                  color: isMuted ? '#EF4444' : 'var(--muted)',
                  border: `1px solid ${isMuted ? 'rgba(239,68,68,0.3)' : 'var(--faint)'}`,
                  borderRadius: '8px', cursor: 'pointer',
                  fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                }}>
                  {isMuted ? '🔇 Muted' : '🎤 Mute'}
                </button>
                <button onClick={endCall} style={{
                  flex: 1, padding: '10px',
                  background: 'rgba(239,68,68,0.15)', color: '#EF4444',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '8px', cursor: 'pointer',
                  fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.04em',
                }}>
                  📵 End Call
                </button>
              </div>
            )}

            {status === 'ended' && (
              <div style={{ textAlign: 'center', padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--green)' }}>
                ✓ Call ended
              </div>
            )}

            {/* Install note */}
            <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'var(--faint)', marginTop: '12px', textAlign: 'center', letterSpacing: '0.04em' }}>
              Powered by VAPI · Built by Varun
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: isActive ? 'linear-gradient(135deg, #4ADE80, #22C55E)' : 'linear-gradient(135deg, #C8A96E, #B8860B)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', boxShadow: isActive ? '0 0 24px rgba(74,222,128,0.4)' : '0 8px 32px rgba(200,169,110,0.3)',
          transition: 'background 0.3s, box-shadow 0.3s',
          position: 'relative',
        }}
      >
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(74,222,128,0.3)',
            }}
          />
        )}
        {isActive ? '🎤' : '⚡'}
      </motion.button>
    </div>
  )
}
