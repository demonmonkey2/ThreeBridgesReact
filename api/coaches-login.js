import crypto from 'crypto'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body || {}
  const storedPassword = process.env.COACHES_PASSWORD
  const secret = process.env.TOKEN_SECRET

  if (!storedPassword || !secret) {
    return res.status(500).json({ error: 'Server not configured — contact the Academy Director.' })
  }

  // Timing-safe comparison prevents brute-force timing attacks
  let valid = false
  try {
    const a = Buffer.from(password || '', 'utf8')
    const b = Buffer.from(storedPassword, 'utf8')
    valid = a.length === b.length && crypto.timingSafeEqual(a, b)
  } catch {
    valid = false
  }

  if (!valid) {
    return res.status(401).json({ error: 'Incorrect password. Please contact the Academy Director.' })
  }

  // Issue a 30-day signed token
  const expiry = String(Date.now() + 30 * 24 * 60 * 60 * 1000)
  const sig = crypto.createHmac('sha256', secret).update(expiry).digest('base64url')
  const token = `${Buffer.from(expiry).toString('base64url')}.${sig}`

  res.json({ token })
}
