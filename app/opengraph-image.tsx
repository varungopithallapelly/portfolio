import { ImageResponse } from 'next/og'

export const alt = 'Varun Thallapelly — Data Analyst & AI Solutions Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Social share card (LinkedIn, X, WhatsApp, Slack…)
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '72px 80px', background: '#F4F0E8', color: '#18160F', fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at 85% 15%, #FBC6B0 0%, transparent 45%), radial-gradient(circle at 10% 95%, #D9CCF5 0%, transparent 45%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', width: 64, height: 64, borderRadius: 999, background: '#18160F', color: '#F4F0E8', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800 }}>VT</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 999, background: '#FFFDF8', border: '1px solid #E1D9CA', fontSize: 22, color: '#1C7C5B' }}>
            ● Available for new roles
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Varun Thallapelly<span style={{ color: '#E2552D' }}>.</span></div>
          <div style={{ fontSize: 40, marginTop: 24, color: '#5F584C' }}>Data Analyst & AI Solutions Developer</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 24, color: '#5F584C' }}>
          {['72-language AI voice agent', 'Payroll: 1 week → 1 day', 'Guildford, UK'].map(t => (
            <div key={t} style={{ display: 'flex', padding: '10px 20px', borderRadius: 999, background: '#FFFDF8', border: '1px solid #E1D9CA' }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
