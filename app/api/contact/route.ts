import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['thallapellyvarun@gmail.com'],
        subject: `New message from ${name} via varunthallapelly.com`,
        reply_to: email,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #0A0E1A; color: #E8E6E0; border-radius: 12px;">
            <h2 style="color: #C8A96E; margin-bottom: 24px;">New Portfolio Contact</h2>
            <p style="margin-bottom: 12px;"><strong style="color: #C8A96E;">Name:</strong> ${name}</p>
            <p style="margin-bottom: 12px;"><strong style="color: #C8A96E;">Email:</strong> ${email}</p>
            <p style="margin-bottom: 12px;"><strong style="color: #C8A96E;">Message:</strong></p>
            <p style="background: #0F1525; padding: 16px; border-radius: 8px; border-left: 3px solid #C8A96E; line-height: 1.7;">${message}</p>
            <p style="margin-top: 24px; color: #7A8099; font-size: 12px;">Sent from varunthallapelly.com</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
