'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mic, MicOff, PhoneOff, Sparkles, X } from 'lucide-react'

// Public (client-side) VAPI identifiers
const VAPI_PUBLIC_KEY = 'ae05102d-6db4-429e-be3a-7373ff67117d'
const VAPI_ASSISTANT_ID = '20179215-b12a-428f-8032-3a3798aab51a'

type CallStatus = 'idle' | 'connecting' | 'active' | 'ended'
type VapiLike = { stop: () => void; setMuted: (m: boolean) => void }

export default function VapiWidget() {
  const [status, setStatus] = useState<CallStatus>('idle')
  const [expanded, setExpanded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0)
  const [nudge, setNudge] = useState(false)
  const vapiRef = useRef<VapiLike | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 6000)
    return () => { clearTimeout(t); vapiRef.current?.stop() }
  }, [])

  const startCall = async () => {
    setStatus('connecting')
    try {
      const { default: Vapi } = await import('@vapi-ai/web')
      const vapi = new Vapi(VAPI_PUBLIC_KEY)
      vapiRef.current = vapi as unknown as VapiLike
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
    vapiRef.current?.stop()
    setStatus('ended')
    setTimeout(() => setStatus('idle'), 2000)
  }

  const toggleMute = () => {
    vapiRef.current?.setMuted(!isMuted)
    setIsMuted(!isMuted)
  }

  const isActive = status === 'active'
  const isConnecting = status === 'connecting'

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="w-[300px] origin-bottom-right rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-lg)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                <Sparkles size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">AI Voice Demo</p>
                <p className="font-mono text-[11px] text-subtle">
                  {isActive ? 'Live call · speak now' : isConnecting ? 'Connecting…' : 'Talk to my AI agent'}
                </p>
              </div>
              {isActive ? (
                <div className="flex h-5 items-end gap-[3px]">
                  {[0.6, 1, 0.8, 1, 0.6].map((m, i) => (
                    <motion.span key={i} animate={{ height: Math.max(4, volume * 22 * m) }} transition={{ duration: 0.1 }} className="w-[3px] rounded-full bg-green" style={{ minHeight: 4 }} />
                  ))}
                </div>
              ) : (
                <button onClick={() => setExpanded(false)} aria-label="Close" className="grid size-8 place-items-center rounded-full text-subtle hover:bg-surface-2 hover:text-ink"><X size={16} /></button>
              )}
            </div>

            {status === 'idle' && (
              <>
                <p className="mb-4 text-[13.5px] leading-relaxed text-muted">
                  A live demo of the agentic AI voice system I built for 3 optical gallery clients. Ask it anything about booking, services, or pricing.
                </p>
                <button onClick={startCall} className="btn btn-primary h-11 w-full text-[14px]">
                  <Mic size={16} /> Start voice demo
                </button>
              </>
            )}

            {isConnecting && (
              <div className="py-3 text-center font-mono text-[12px] text-muted">
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>Connecting…</motion.span>
              </div>
            )}

            {isActive && (
              <div className="flex gap-2">
                <button onClick={toggleMute} className={`btn h-10 flex-1 text-[13px] ${isMuted ? 'border-[#D93025]/30 bg-[#D93025]/10 text-[#D93025]' : 'btn-ghost'}`}>
                  {isMuted ? <><MicOff size={15} /> Muted</> : <><Mic size={15} /> Mute</>}
                </button>
                <button onClick={endCall} className="btn h-10 flex-1 bg-[#D93025] text-[13px] text-white hover:bg-[#B3261E]">
                  <PhoneOff size={15} /> End
                </button>
              </div>
            )}

            {status === 'ended' && <p className="py-3 text-center font-mono text-[12px] text-green">✓ Call ended</p>}

            <p className="mt-4 text-center font-mono text-[10px] text-subtle">Powered by VAPI · Built by Varun</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {nudge && !expanded && status === 'idle' && (
            <motion.button
              onClick={() => { setExpanded(true); setNudge(false) }}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="hidden rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-ink shadow-[var(--shadow-md)] sm:block"
            >
              Talk to my AI agent 👋
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => { setExpanded(e => !e); setNudge(false) }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          aria-label="AI voice demo"
          className={`relative grid size-14 place-items-center rounded-full text-white shadow-[var(--shadow-lg)] transition-colors ${isActive ? 'bg-green' : 'bg-ink'}`}
        >
          {isActive && (
            <motion.span animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="absolute inset-0 rounded-full bg-green" />
          )}
          <span className={`relative ${isActive ? '' : 'text-bg'}`}>{isActive ? <Mic size={22} /> : <Sparkles size={22} />}</span>
        </motion.button>
      </div>
    </div>
  )
}
