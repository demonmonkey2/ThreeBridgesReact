import { useState, useRef, useCallback } from 'react'
import crest from '../assets/crest.svg'

const SKILLS = [
  { label: 'Dribbling',     color: '#ce962d' },
  { label: 'Passing',       color: '#ce962d' },
  { label: 'Shooting',      color: '#ce962d' },
  { label: 'Ball Mastery',  color: '#ce962d' },
  { label: 'Pressing',      color: '#e74c3c' },
  { label: 'Positioning',   color: '#e74c3c' },
  { label: 'Work Rate',     color: '#3498db' },
  { label: 'Communication', color: '#3498db' },
  { label: 'Leadership',    color: '#3498db' },
  { label: 'Attitude',      color: '#3498db' },
]

const BLANK = { name: '', strengths: [], focusArea: '', note: '', gameHighlight: '' }

const EXAMPLE_DATA = [
  { name: 'Jamie Cole',    strengths: ['Dribbling', 'Attitude'],        focusArea: 'Positioning',   note: 'Great energy every session. Keep pushing.',        gameHighlight: 'Brilliant run and assist vs Horsham' },
  { name: 'Luca Bennett',  strengths: ['Passing', 'Communication'],     focusArea: 'Shooting',      note: 'Your distribution is a real strength.',            gameHighlight: 'Controlled the midfield superbly' },
  { name: 'Anya Patel',    strengths: ['Ball Mastery', 'Work Rate'],    focusArea: 'Pressing',      note: 'Never stops running — the team feeds off that.',   gameHighlight: 'Won the ball back 3 times in the second half' },
  { name: 'Sam Richards',  strengths: ['Leadership', 'Positioning'],    focusArea: 'Dribbling',     note: 'Natural leader — keep organising the defence.',     gameHighlight: 'Commanded the box well against big forwards' },
  { name: 'Theo Marshall', strengths: ['Shooting', 'Attitude'],         focusArea: 'Ball Mastery',  note: 'Clinical in front of goal. Work on first touch.',   gameHighlight: 'Hat-trick — three great finishes' },
]

function buildInitialPlayers() {
  return Array.from({ length: 15 }, (_, i) => ({
    ...(EXAMPLE_DATA[i] || BLANK),
  }))
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6,
  padding: '0.55rem 0.8rem',
  color: '#fff',
  fontSize: '0.85rem',
  width: '100%',
  fontFamily: 'inherit',
}

function generateCard(player, index, crestSrc) {
  const strengths = player.strengths.map(s => `<span style="background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.4);color:#2ecc71;font-size:0.8rem;font-weight:700;padding:0.3rem 0.7rem;border-radius:20px;display:inline-block;margin:0.15rem">✓ ${s}</span>`).join('')
  const focus = player.focusArea ? `<div style="margin-bottom:1rem"><div style="font-size:0.65rem;font-weight:700;color:#3498db;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem">🎯 Keep working on</div><span style="background:rgba(52,152,219,0.15);border:1px solid rgba(52,152,219,0.4);color:#3498db;font-size:0.8rem;font-weight:700;padding:0.3rem 0.7rem;border-radius:20px">${player.focusArea}</span></div>` : ''
  const note = player.note ? `<div style="margin-bottom:1rem;background:rgba(206,150,45,0.08);border:1px solid rgba(206,150,45,0.2);border-radius:8px;padding:0.75rem 1rem"><div style="font-size:0.65rem;font-weight:700;color:#ce962d;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem">Coach's Note</div><p style="font-size:0.85rem;line-height:1.6;color:rgba(255,255,255,0.85)">${player.note}</p></div>` : ''
  const highlight = player.gameHighlight ? `<div style="margin-bottom:1rem;background:rgba(155,89,182,0.08);border:1px solid rgba(155,89,182,0.25);border-radius:8px;padding:0.75rem 1rem"><div style="font-size:0.65rem;font-weight:700;color:#9b59b6;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.3rem">⚡ Game Highlight</div><p style="font-size:0.85rem;line-height:1.6;color:rgba(255,255,255,0.85)">${player.gameHighlight}</p></div>` : ''

  return `<!DOCTYPE html><html><head><title>Player Report — ${player.name}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a1520;color:#fff;font-family:-apple-system,sans-serif;padding:2rem;display:flex;align-items:flex-start;justify-content:center}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
</head><body>
<div style="background:linear-gradient(145deg,#0d1c2e,#111c2b);border:2px solid #ce962d;border-radius:16px;padding:1.75rem;max-width:520px;width:100%;position:relative;overflow:hidden">
  <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:linear-gradient(225deg,rgba(206,150,45,0.15),transparent 70%);border-radius:0 16px 0 0"></div>
  <div style="margin-bottom:1.25rem;border-bottom:1px solid rgba(206,150,45,0.25);padding-bottom:1rem">
    <div style="font-size:0.65rem;font-weight:700;color:#ce962d;text-transform:uppercase;letter-spacing:0.12em">ABC FC Academy</div>
    <div style="font-size:1rem;font-weight:900;line-height:1.1">Player Report Card</div>
  </div>
  <div style="margin-bottom:1.25rem">
    <div style="font-size:1.6rem;font-weight:900;color:#fff;line-height:1">${player.name || `Player ${index + 1}`}</div>
  </div>
  <div style="margin-bottom:1rem">
    <div style="font-size:0.65rem;font-weight:700;color:#2ecc71;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem">⭐ What you're doing brilliantly</div>
    <div style="display:flex;flex-wrap:wrap;gap:0.3rem">${strengths || '<span style="color:rgba(255,255,255,0.3);font-size:0.82rem">—</span>'}</div>
  </div>
  ${focus}${note}${highlight}
  <div style="border-top:1px solid rgba(206,150,45,0.2);padding-top:0.75rem">
    <div style="font-size:0.7rem;color:rgba(255,255,255,0.35)">ABC FC Academy</div>
  </div>
</div>
</body></html>`
}

function PlayerRow({ index, player, onChange, selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const crestRef = useRef(null)

  const toggle = skill => {
    const list = player.strengths
    onChange({ ...player, strengths: list.includes(skill) ? list.filter(s => s !== skill) : [...list, skill] })
  }

  const hasData = player.name || player.strengths.length > 0

  const handleSaveImage = () => {
    const win = window.open('', '_blank')
    const imgSrc = crestRef.current?.src || ''
    win.document.write(generateCard(player, index, imgSrc))
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
  }

  return (
    <div style={{
      border: `1px solid ${selected ? 'rgba(206,150,45,0.5)' : open ? 'rgba(206,150,45,0.3)' : 'var(--border)'}`,
      borderRadius: 10, overflow: 'hidden',
      background: selected ? 'rgba(206,150,45,0.05)' : open ? 'rgba(206,150,45,0.02)' : 'var(--card)',
      transition: 'border-color 0.15s, background 0.15s',
    }}>
      {/* Row header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.85rem 1.1rem', gap: '0.75rem' }}>
        {/* Checkbox */}
        <button onClick={() => onSelect(index)} style={{
          width: 22, height: 22, borderRadius: 5, flexShrink: 0, cursor: 'pointer',
          background: selected ? 'var(--gold)' : 'transparent',
          border: `2px solid ${selected ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#000', fontSize: '0.75rem', fontWeight: 900,
        }}>{selected ? '✓' : ''}</button>

        <button onClick={() => setOpen(o => !o)} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1,
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0,
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: hasData ? 'rgba(206,150,45,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hasData ? 'rgba(206,150,45,0.4)' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 800, color: hasData ? '#ce962d' : 'var(--muted)',
          }}>{index + 1}</span>
          <span style={{ fontWeight: hasData ? 700 : 400, color: hasData ? '#fff' : 'var(--muted)', fontSize: '0.9rem', flex: 1 }}>
            {player.name || `Player ${index + 1}`}
          </span>
          {player.strengths.length > 0 && (
            <span style={{ fontSize: '0.72rem', color: '#2ecc71', fontWeight: 600 }}>
              {player.strengths.slice(0, 2).join(', ')}{player.strengths.length > 2 ? '…' : ''}
            </span>
          )}
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{open ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Expanded form */}
      {open && (
        <div style={{ padding: '0 1.1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <img ref={crestRef} src={crest} alt="" style={{ display: 'none' }} />

          <input placeholder="Player name" value={player.name}
            onChange={e => onChange({ ...player, name: e.target.value })}
            style={inputStyle} />

          {/* Strengths */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Doing brilliantly (pick up to 3)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {SKILLS.map(s => {
                const active = player.strengths.includes(s.label)
                const maxed = player.strengths.length >= 3 && !active
                return (
                  <button key={s.label} disabled={maxed} onClick={() => toggle(s.label)} style={{
                    background: active ? `${s.color}25` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? s.color : 'rgba(255,255,255,0.12)'}`,
                    color: active ? s.color : 'var(--muted)',
                    fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem',
                    borderRadius: 20, cursor: maxed ? 'not-allowed' : 'pointer', opacity: maxed ? 0.35 : 1,
                  }}>{active ? '✓ ' : ''}{s.label}</button>
                )
              })}
            </div>
          </div>

          {/* Focus area */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3498db', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Keep working on (pick 1)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {SKILLS.map(s => {
                const active = player.focusArea === s.label
                return (
                  <button key={s.label} onClick={() => onChange({ ...player, focusArea: active ? '' : s.label })} style={{
                    background: active ? 'rgba(52,152,219,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? '#3498db' : 'rgba(255,255,255,0.12)'}`,
                    color: active ? '#3498db' : 'var(--muted)',
                    fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem',
                    borderRadius: 20, cursor: 'pointer',
                  }}>{active ? '→ ' : ''}{s.label}</button>
                )
              })}
            </div>
          </div>

          <textarea placeholder="Coach note — a personal message to the player…" value={player.note}
            onChange={e => onChange({ ...player, note: e.target.value })}
            rows={2} style={{ ...inputStyle, resize: 'vertical' }} />

          <textarea placeholder="Game highlight — what did they do well in the last match?" value={player.gameHighlight}
            onChange={e => onChange({ ...player, gameHighlight: e.target.value })}
            rows={2} style={{ ...inputStyle, resize: 'vertical' }} />

          <button className="btn" onClick={handleSaveImage}
            style={{ alignSelf: 'flex-start', fontSize: '0.85rem' }}>
            🖨️ Save / Print Card
          </button>
        </div>
      )}
    </div>
  )
}

const CSV_HEADERS = ['Player Name', 'Strength 1', 'Strength 2', 'Strength 3', 'Focus Area', 'Coach Note', 'Game Highlight']

const TEMPLATE_ROWS = [
  ['Jamie Cole',    'Dribbling',   'Attitude',      '',           'Positioning', 'Great energy every session.',       'Brilliant run and assist vs Horsham'],
  ['Luca Bennett',  'Passing',     'Communication', '',           'Shooting',    'Your distribution is a real strength.', 'Controlled the midfield superbly'],
  ['',              '',            '',              '',           '',            '',                                  ''],
]

function downloadTemplate() {
  const rows = [CSV_HEADERS, ...TEMPLATE_ROWS]
  const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'player-report-template.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function parseCSV(text) {
  const lines = text.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return []
  // skip header row, parse data rows
  return lines.slice(1).map(line => {
    // handle quoted fields
    const fields = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') { inQuotes = !inQuotes }
      else if (ch === ',' && !inQuotes) { fields.push(current.trim()); current = '' }
      else { current += ch }
    }
    fields.push(current.trim())
    const [name = '', s1 = '', s2 = '', s3 = '', focusArea = '', note = '', gameHighlight = ''] = fields
    const strengths = [s1, s2, s3].filter(s => s && SKILLS.some(sk => sk.label === s))
    return { name, strengths, focusArea: SKILLS.some(sk => sk.label === focusArea) ? focusArea : '', note, gameHighlight }
  })
}

function printMultiple(selectedPlayers, crestSrc) {
  const cards = selectedPlayers.map(({ player, index }) => generateCard(player, index, crestSrc)).join('<div style="page-break-after:always"></div>')
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html><html><head><title>Player Reports</title>
    <style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a1520;font-family:-apple-system,sans-serif}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
    </head><body>${cards}</body></html>`)
  win.document.close()
  win.focus()
  setTimeout(() => { win.print(); win.close() }, 400)
}

// ─────────────────────────────────────────
// MAN OF THE MATCH
// ─────────────────────────────────────────

const MOTM_STYLE = `
  @keyframes starPop {
    0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
    60%  { transform: scale(1.15) rotate(4deg); opacity: 1; }
    80%  { transform: scale(0.95) rotate(-2deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes shimmer {
    0%   { left: -60%; }
    100% { left: 160%; }
  }
`

function MotmBadge({ form, crestSrc }) {
  const isReady = form.playerName && form.opponent

  if (!isReady) {
    return (
      <div style={{
        border: '2px dashed rgba(206,150,45,0.2)', borderRadius: 16, padding: '3rem',
        textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem',
      }}>
        Fill in player name and opponent to preview the badge
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(145deg, #0d1c2e 0%, #111c2b 100%)',
      border: '3px solid #ce962d', borderRadius: 16, padding: '2rem',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      boxShadow: '0 0 40px rgba(206,150,45,0.15)',
    }}>
      <style>{MOTM_STYLE}</style>

      {/* shimmer sweep */}
      <div style={{
        position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(206,150,45,0.08), transparent)',
        animation: 'shimmer 2.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 60,
        background: 'linear-gradient(135deg, rgba(206,150,45,0.2), transparent 70%)', borderRadius: '16px 0 0 0' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60,
        background: 'linear-gradient(225deg, rgba(206,150,45,0.2), transparent 70%)', borderRadius: '0 16px 0 0' }} />

      {/* Star */}
      <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.25rem',
        animation: 'starPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        ⭐
      </div>

      {/* Heading */}
      <div style={{
        fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.2em',
        color: '#ce962d', textTransform: 'uppercase', marginBottom: '0.5rem',
      }}>
        Man of the Match
      </div>

      {/* Player name */}
      <div style={{
        fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: 900, lineHeight: 1.05,
        color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.01em',
        marginBottom: '0.4rem',
      }}>
        {form.playerName}
      </div>

      {/* Game details */}
      <div style={{ fontSize: '0.9rem', color: '#ce962d', fontWeight: 700, marginBottom: '0.2rem' }}>
        vs {form.opponent}
      </div>
      {(form.competition || form.date) && (
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1rem' }}>
          {[form.competition, form.date].filter(Boolean).join(' · ')}
        </div>
      )}

      {/* Gold divider */}
      <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, #ce962d, transparent)', margin: '0 auto 1rem' }} />

      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        ABC FC Academy
      </div>
    </div>
  )
}

function drawMotmCanvas(form, crestImg) {
  const W = 600, H = 700
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  // background
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#0d1c2e')
  bg.addColorStop(1, '#111c2b')
  ctx.fillStyle = bg
  ctx.roundRect(0, 0, W, H, 20)
  ctx.fill()

  // border
  ctx.strokeStyle = '#ce962d'
  ctx.lineWidth = 5
  ctx.roundRect(4, 4, W - 8, H - 8, 18)
  ctx.stroke()

  // inner gold line
  ctx.strokeStyle = 'rgba(206,150,45,0.3)'
  ctx.lineWidth = 1
  ctx.roundRect(14, 14, W - 28, H - 28, 14)
  ctx.stroke()

  let y = 55

  // star
  ctx.font = '72px serif'
  ctx.textAlign = 'center'
  ctx.fillText('⭐', W / 2, y + 60)
  y += 80

  // MAN OF THE MATCH label
  ctx.font = 'bold 18px -apple-system, sans-serif'
  ctx.fillStyle = '#ce962d'
  ctx.letterSpacing = '6px'
  ctx.fillText('MAN OF THE MATCH', W / 2, y + 10)
  y += 36

  // divider line
  ctx.strokeStyle = 'rgba(206,150,45,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(80, y); ctx.lineTo(W - 80, y); ctx.stroke()
  y += 28

  // player name
  ctx.font = 'bold 58px -apple-system, sans-serif'
  ctx.fillStyle = '#ffffff'
  const nameSize = form.playerName.length > 14 ? 40 : 58
  ctx.font = `bold ${nameSize}px -apple-system, sans-serif`
  ctx.fillText(form.playerName.toUpperCase(), W / 2, y + nameSize)
  y += nameSize + 18

  // opponent
  ctx.font = 'bold 26px -apple-system, sans-serif'
  ctx.fillStyle = '#ce962d'
  ctx.fillText(`vs ${form.opponent}`, W / 2, y + 26)
  y += 44

  // competition + date
  if (form.competition || form.date) {
    ctx.font = '18px -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.fillText([form.competition, form.date].filter(Boolean).join(' · '), W / 2, y + 18)
    y += 36
  }

  // gold divider
  y += 16
  const grd = ctx.createLinearGradient(W / 2 - 80, y, W / 2 + 80, y)
  grd.addColorStop(0, 'transparent')
  grd.addColorStop(0.5, '#ce962d')
  grd.addColorStop(1, 'transparent')
  ctx.strokeStyle = grd
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(W / 2 - 80, y); ctx.lineTo(W / 2 + 80, y); ctx.stroke()
  y += 24

  // footer
  ctx.font = '13px -apple-system, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  ctx.fillText('ABC FC ACADEMY', W / 2, y + 13)

  return canvas
}

function ManOfTheMatch() {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const [form, setForm] = useState({ playerName: '', opponent: '', competition: '', date: today })
  const crestRef = useRef(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleDownload = () => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = drawMotmCanvas(form, img)
      const link = document.createElement('a')
      link.download = `motm-${form.playerName.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.onerror = () => {
      const canvas = drawMotmCanvas(form, null)
      const link = document.createElement('a')
      link.download = `motm-${form.playerName.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = '/api/crest'
  }

  const inputSt = {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem',
    width: '100%', fontFamily: 'inherit',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>

      {/* Form */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontWeight: 800, fontSize: '1rem', margin: 0 }}>Badge Details</h3>

        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Player Name *</label>
          <input placeholder="e.g. Jamie Cole" value={form.playerName} onChange={e => set('playerName', e.target.value)} style={inputSt} />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Opponent *</label>
          <input placeholder="e.g. Horsham FC" value={form.opponent} onChange={e => set('opponent', e.target.value)} style={inputSt} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Competition</label>
            <input placeholder="e.g. MSYFL" value={form.competition} onChange={e => set('competition', e.target.value)} style={inputSt} />
          </div>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>Date</label>
            <input value={form.date} onChange={e => set('date', e.target.value)} style={inputSt} />
          </div>
        </div>

        <button className="btn" onClick={handleDownload}
          disabled={!form.playerName || !form.opponent}
          style={{ opacity: form.playerName && form.opponent ? 1 : 0.4, cursor: form.playerName && form.opponent ? 'pointer' : 'not-allowed', marginTop: '0.5rem' }}>
          ⬇ Download Badge (PNG)
        </button>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '-0.5rem 0 0' }}>
          Downloads as a PNG — perfect for sharing on WhatsApp.
        </p>
      </div>

      {/* Preview */}
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Preview</div>
        <MotmBadge form={form} crestSrc={crestRef.current?.src} />
        <img ref={crestRef} src={crest} alt="" style={{ display: 'none' }} />
      </div>

    </div>
  )
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function PlayersPage() {
  const [tab, setTab] = useState('reports')
  const [players, setPlayers] = useState(buildInitialPlayers)
  const [selected, setSelected] = useState(new Set())
  const [importError, setImportError] = useState('')
  const fileInputRef = useRef(null)
  const crestRef = useRef(null)

  const updatePlayer = (i, data) => setPlayers(prev => prev.map((p, idx) => idx === i ? data : p))

  const toggleSelect = i => setSelected(prev => {
    const next = new Set(prev)
    next.has(i) ? next.delete(i) : next.add(i)
    return next
  })

  const allFilled = players.filter(p => p.name)
  const allSelected = allFilled.length > 0 && allFilled.every((_, i) => selected.has(players.indexOf(_)))

  const toggleSelectAll = () => {
    if (selected.size === players.filter(p => p.name).length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(players.map((p, i) => p.name ? i : null).filter(i => i !== null)))
    }
  }

  const handleBulkPrint = () => {
    const toprint = [...selected].sort((a, b) => a - b).map(i => ({ player: players[i], index: i }))
    if (!toprint.length) return
    printMultiple(toprint, crestRef.current?.src || '')
  }

  const handleImport = useCallback(e => {
    const file = e.target.files[0]
    if (!file) return
    setImportError('')
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = parseCSV(ev.target.result)
        if (!parsed.length) { setImportError('No player rows found. Check the file matches the template.'); return }
        // pad or trim to match parsed length, minimum 15 slots
        const count = Math.max(parsed.length, 15)
        const next = Array.from({ length: count }, (_, i) => parsed[i] || { ...BLANK })
        setPlayers(next)
      } catch {
        setImportError('Could not read file. Make sure it is a valid CSV.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [])

  const filledCount = players.filter(p => p.name).length

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Page header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>Player Development</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Tools to celebrate and develop your players.</p>
      </div>

      {/* Sub-menu tabs */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.3rem', width: 'fit-content' }}>
        {[
          { key: 'reports', label: '📋 Report Cards' },
          { key: 'motm',    label: '⭐ Man of the Match' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '0.55rem 1.1rem', borderRadius: 7, border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.15s',
            background: tab === t.key ? 'var(--gold)' : 'transparent',
            color: tab === t.key ? '#000' : 'var(--muted)',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Man of the Match */}
      {tab === 'motm' && <ManOfTheMatch />}

      {/* Report Cards */}
      {tab === 'reports' && <>
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {filledCount} of {players.length} players filled in. Click a player to edit their report card.
        </p>

        {/* Import / export bar */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn btn-outline" onClick={downloadTemplate} style={{ fontSize: '0.82rem' }}>
            ⬇ Download Template
          </button>
          <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()} style={{ fontSize: '0.82rem' }}>
            ⬆ Import CSV
          </button>
          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleImport} style={{ display: 'none' }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            Fill in the template in Excel, save as CSV, then import.
          </span>
        </div>
        {importError && (
          <div style={{ marginTop: '0.75rem', background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', borderRadius: 6, padding: '0.6rem 0.9rem', fontSize: '0.82rem', color: '#e74c3c' }}>
            {importError}
          </div>
        )}
      </div>

      {/* Bulk actions bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={toggleSelectAll} style={{
          background: 'transparent', border: '1px solid var(--border)', borderRadius: 6,
          padding: '0.4rem 0.9rem', color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600,
        }}>
          {selected.size === players.filter(p => p.name).length && selected.size > 0 ? 'Deselect All' : 'Select All'}
        </button>
        {selected.size > 0 && (
          <button className="btn" onClick={handleBulkPrint} style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
            🖨️ Print {selected.size} Card{selected.size > 1 ? 's' : ''}
          </button>
        )}
        {selected.size > 0 && (
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{selected.size} selected</span>
        )}
        <img ref={crestRef} src={crest} alt="" style={{ display: 'none' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {players.map((p, i) => (
          <PlayerRow key={i} index={i} player={p} onChange={data => updatePlayer(i, data)}
            selected={selected.has(i)} onSelect={toggleSelect} />
        ))}
      </div>
      </>}

    </div>
  )
}
