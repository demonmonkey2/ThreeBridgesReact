import { useState, useRef } from 'react'
import crest from '../assets/crest.svg'

const SKILL_GROUPS = [
  {
    label: 'Technical',
    color: '#ce962d',
    skills: ['Dribbling', 'Passing', 'Receiving', 'Shooting & Finishing', 'Ball Mastery', '1v1 Play'],
  },
  {
    label: 'Tactical',
    color: '#e74c3c',
    skills: ['Playing Out from Back', 'Switching Play', 'Pressing', 'Positioning', 'Combination Play', 'Runs in Behind'],
  },
  {
    label: 'Game Qualities',
    color: '#3498db',
    skills: ['Work Rate', 'Communication', 'Leadership', 'Resilience', 'Teamwork', 'Attitude'],
  },
]

const AGE_GROUP_OPTIONS = ['U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16']

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: '0.65rem 0.9rem',
  color: '#fff',
  fontSize: '0.88rem',
  width: '100%',
  fontFamily: 'inherit',
}

export default function PlayersPage() {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const [form, setForm] = useState({
    playerName: '', ageGroup: '', team: '', coach: '', date: today,
    strengths: [], focusAreas: [], coachNote: '', gameHighlight: '',
  })
  const cardRef = useRef(null)

  const toggle = (field, skill) => {
    setForm(f => {
      const list = f[field]
      return { ...f, [field]: list.includes(skill) ? list.filter(s => s !== skill) : [...list, skill] }
    })
  }

  const handlePrint = () => {
    const card = cardRef.current
    if (!card) return
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Player Report — ${form.playerName}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a1520; color: #fff; font-family: -apple-system, sans-serif; padding: 2rem; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      </style></head><body>${card.innerHTML}</body></html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
  }

  const isReady = form.playerName && form.ageGroup && form.strengths.length > 0

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
          Coaches Portal
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.35rem' }}>Player Development</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Build and print a personalised report card for any player.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

        {/* ── Form ── */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1rem', margin: 0 }}>Player Details</h3>

          <input placeholder="Player name *" value={form.playerName}
            onChange={e => setForm(f => ({ ...f, playerName: e.target.value }))}
            style={inputStyle} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <select value={form.ageGroup} onChange={e => setForm(f => ({ ...f, ageGroup: e.target.value }))}
              style={{ ...inputStyle, color: form.ageGroup ? '#fff' : 'var(--muted)' }}>
              <option value="">Age group *</option>
              {AGE_GROUP_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <input placeholder="Team (e.g. Amber)" value={form.team}
              onChange={e => setForm(f => ({ ...f, team: e.target.value }))}
              style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <input placeholder="Coach name" value={form.coach}
              onChange={e => setForm(f => ({ ...f, coach: e.target.value }))}
              style={inputStyle} />
            <input type="text" value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={inputStyle} />
          </div>

          {/* Strengths */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              What they're doing brilliantly (pick up to 3)
            </div>
            {SKILL_GROUPS.map(g => (
              <div key={g.label} style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.68rem', color: g.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{g.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {g.skills.map(s => {
                    const active = form.strengths.includes(s)
                    const maxed = form.strengths.length >= 3 && !active
                    return (
                      <button key={s} disabled={maxed} onClick={() => toggle('strengths', s)} style={{
                        background: active ? `${g.color}25` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${active ? g.color : 'rgba(255,255,255,0.12)'}`,
                        color: active ? g.color : 'var(--muted)',
                        fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem',
                        borderRadius: 20, cursor: maxed ? 'not-allowed' : 'pointer', opacity: maxed ? 0.4 : 1,
                      }}>{active ? '✓ ' : ''}{s}</button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Focus areas */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3498db', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              Keep working on (pick 1–2)
            </div>
            {SKILL_GROUPS.map(g => (
              <div key={g.label} style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.68rem', color: g.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{g.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {g.skills.map(s => {
                    const active = form.focusAreas.includes(s)
                    const maxed = form.focusAreas.length >= 2 && !active
                    return (
                      <button key={s} disabled={maxed} onClick={() => toggle('focusAreas', s)} style={{
                        background: active ? `${g.color}25` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${active ? g.color : 'rgba(255,255,255,0.12)'}`,
                        color: active ? g.color : 'var(--muted)',
                        fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem',
                        borderRadius: 20, cursor: maxed ? 'not-allowed' : 'pointer', opacity: maxed ? 0.4 : 1,
                      }}>{active ? '✓ ' : ''}{s}</button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <textarea placeholder="Coach note — a personal message to the player..." value={form.coachNote}
            onChange={e => setForm(f => ({ ...f, coachNote: e.target.value }))}
            rows={3} style={{ ...inputStyle, resize: 'vertical' }} />

          <textarea placeholder="Game highlight — what did they do well in the last match?" value={form.gameHighlight}
            onChange={e => setForm(f => ({ ...f, gameHighlight: e.target.value }))}
            rows={2} style={{ ...inputStyle, resize: 'vertical' }} />

          <button className="btn" disabled={!isReady} onClick={handlePrint}
            style={{ opacity: isReady ? 1 : 0.4, cursor: isReady ? 'pointer' : 'not-allowed' }}>
            🖨️ Print / Save Report Card
          </button>
          {!isReady && (
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '-0.75rem' }}>
              Fill in player name, age group and at least one strength to generate.
            </p>
          )}
        </div>

        {/* ── Live preview card ── */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Preview
          </div>
          <div ref={cardRef} style={{
            background: 'linear-gradient(145deg, #0d1c2e 0%, #111c2b 100%)',
            border: '2px solid #ce962d', borderRadius: 16, padding: '1.75rem',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80,
              background: 'linear-gradient(225deg, rgba(206,150,45,0.15) 0%, transparent 70%)', borderRadius: '0 16px 0 0' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(206,150,45,0.25)', paddingBottom: '1rem' }}>
              <img src={crest} alt="Crest" style={{ height: 44, opacity: 0.9 }} />
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ce962d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>ABC FC Academy</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, lineHeight: 1.1 }}>Player Report Card</div>
              </div>
            </div>

            {/* Player name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                {form.playerName || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Player Name</span>}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>
                {[form.ageGroup, form.team].filter(Boolean).join(' · ') || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Age Group</span>}
                {form.date && <span> · {form.date}</span>}
              </div>
            </div>

            {/* Strengths */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                ⭐ What you're doing brilliantly
              </div>
              {form.strengths.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {form.strengths.map(s => (
                    <span key={s} style={{ background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.4)', color: '#2ecc71', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 20 }}>✓ {s}</span>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem' }}>Select strengths from the form…</p>
              )}
            </div>

            {/* Focus areas */}
            {form.focusAreas.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#3498db', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  🎯 Keep working on
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {form.focusAreas.map(s => (
                    <span key={s} style={{ background: 'rgba(52,152,219,0.15)', border: '1px solid rgba(52,152,219,0.4)', color: '#3498db', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 20 }}>→ {s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Coach note */}
            {form.coachNote && (
              <div style={{ marginBottom: '1.25rem', background: 'rgba(206,150,45,0.06)', border: '1px solid rgba(206,150,45,0.2)', borderRadius: 8, padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ce962d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>Coach's Note</div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{form.coachNote}</p>
              </div>
            )}

            {/* Game highlight */}
            {form.gameHighlight && (
              <div style={{ marginBottom: '1.25rem', background: 'rgba(155,89,182,0.08)', border: '1px solid rgba(155,89,182,0.25)', borderRadius: 8, padding: '0.85rem 1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9b59b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>⚡ Game Highlight</div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{form.gameHighlight}</p>
              </div>
            )}

            {/* Footer */}
            <div style={{ borderTop: '1px solid rgba(206,150,45,0.2)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>ABC FC Academy</div>
              {form.coach && <div style={{ fontSize: '0.72rem', color: '#ce962d', fontWeight: 700 }}>{form.coach}</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
