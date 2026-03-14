import { useEffect, useRef } from 'react'

function drawNewBadge(canvas) {
  const ctx = canvas.getContext('2d')
  const W = 800, H = 800
  canvas.width = W
  canvas.height = H

  const GOLD = '#ce962d'
  const DARK = '#0d1820'
  const RED = '#c0392b'

  // White background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // ── WATERMARK (diagonal repeating text) ──
  ctx.save()
  ctx.globalAlpha = 0.07
  ctx.fillStyle = '#000000'
  ctx.font = 'bold 22px Arial'
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-Math.PI / 4)
  for (let row = -6; row <= 6; row++) {
    for (let col = -4; col <= 4; col++) {
      ctx.fillText('THREE BRIDGES ACADEMY · LINESMAN CERTIFIED', col * 420 - 200, row * 80)
    }
  }
  ctx.restore()

  // ── OUTER GOLD BORDER ──
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 10
  ctx.strokeRect(16, 16, W - 32, H - 32)

  // ── INNER THIN BORDER ──
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 2
  ctx.strokeRect(30, 30, W - 60, H - 60)

  // ── DARK HEADER BAND ──
  ctx.fillStyle = DARK
  ctx.fillRect(16, 16, W - 32, 140)

  // ── CLUB NAME in header ──
  ctx.fillStyle = GOLD
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('THREE BRIDGES FC  ·  EST. 1901  ·  JUBILEE FIELD, CRAWLEY', W / 2, 58)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 42px Arial'
  ctx.fillText('THREE BRIDGES ACADEMY', W / 2, 118)

  // ── LINESMAN title ──
  ctx.fillStyle = DARK
  ctx.font = 'bold 56px Arial'
  ctx.fillText('LINESMAN', W / 2, 230)

  // Underline
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(200, 244)
  ctx.lineTo(600, 244)
  ctx.stroke()

  // ── THREE BRIDGES CREST (loaded from URL) ──
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = 'https://threebridgesfc.co.uk/wp-content/uploads/2023/10/Bridges-Hi-Res-No-Background.png'
  img.onload = () => {
    ctx.drawImage(img, W / 2 - 140, 260, 280, 280)
    finishDrawing()
  }
  img.onerror = () => {
    // Fallback circle if image fails
    ctx.beginPath()
    ctx.arc(W / 2, 400, 130, 0, Math.PI * 2)
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = 'rgba(206,150,45,0.1)'
    ctx.fill()
    ctx.fillStyle = GOLD
    ctx.font = 'bold 20px Arial'
    ctx.fillText('THREE BRIDGES FC', W / 2, 400)
    finishDrawing()
  }

  function finishDrawing() {
    // ── APPROVED STAMP ──
    ctx.save()
    // Stamp rectangle
    ctx.strokeStyle = RED
    ctx.lineWidth = 6
    ctx.setLineDash([])
    const sx = W / 2 - 160, sy = 565, sw = 320, sh = 80
    ctx.strokeRect(sx, sy, sw, sh)
    // Inner double border
    ctx.lineWidth = 2
    ctx.strokeRect(sx + 6, sy + 6, sw - 12, sh - 12)
    // Stamp text
    ctx.fillStyle = RED
    ctx.globalAlpha = 0.85
    ctx.font = 'bold 54px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('APPROVED', W / 2, 626)
    ctx.globalAlpha = 1
    ctx.restore()

    // ── PARTICIPANT NAME AREA ──
    ctx.fillStyle = '#333333'
    ctx.font = '18px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('SAMPLE NAME', W / 2, 690)

    // ── DATE ──
    ctx.fillStyle = '#888888'
    ctx.font = '15px Arial'
    ctx.fillText(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2, 714)

    // ── BOTTOM GOLD BAND ──
    ctx.fillStyle = DARK
    ctx.fillRect(16, 740, W - 32, 44)
    ctx.fillStyle = GOLD
    ctx.font = 'bold 14px Arial'
    ctx.fillText('threebridgesacademy.co.uk  ·  OFFICIAL LINESMAN CERTIFICATION', W / 2, 768)
  }
}

export default function BadgePreviewPage() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) drawNewBadge(canvasRef.current)
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">Preview Only — Not Live Yet</p>
          <h1>Badge Design Preview</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>This is the proposed new WhatsApp badge. Approve it and we'll replace the old one.</p>
        </div>
      </div>
      <div className="page" style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div style={{ background: 'rgba(206,150,45,0.1)', border: '1px solid rgba(206,150,45,0.3)', borderRadius: 8, padding: '1rem', marginBottom: '2rem', maxWidth: 600, margin: '0 auto 2rem' }}>
          <strong style={{ color: 'var(--gold)' }}>Proposed design:</strong>
          <p style={{ color: 'var(--muted)', margin: '0.4rem 0 0', fontSize: '0.9rem' }}>
            Three Bridges crest centre · "LINESMAN" heading · Red APPROVED stamp · Diagonal watermark · Gold border
          </p>
        </div>
        <canvas ref={canvasRef} style={{ maxWidth: '100%', width: 500, borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }} />
        <p style={{ color: 'var(--muted)', marginTop: '1.5rem', fontSize: '0.85rem' }}>
          Happy with this? Tell me and I'll replace the old badge. Want changes? Just say what you'd like different.
        </p>
      </div>
    </>
  )
}
