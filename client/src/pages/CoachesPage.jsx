import { useState } from 'react'

// Demo password — in a real system this would be proper auth
const COACH_PASSWORD = 'academy2026'

const WEEKS_DATA = [
  { week: 1,  theme: 'Attacking / Possession', u710: 'Dribbling', u1112: 'Playing Out', u1316: 'Playing Out', cat: 'attacking' },
  { week: 2,  theme: 'Attacking / Possession', u710: 'Dribbling', u1112: 'Playing Between the Lines', u1316: 'Playing Between the Lines', cat: 'attacking' },
  { week: 3,  theme: 'Attacking / Possession', u710: 'Passing', u1112: 'Switching Play', u1316: 'Switching Play', cat: 'attacking' },
  { week: 4,  theme: 'Attacking / Possession', u710: 'Turning & Shielding', u1112: 'Rotation', u1316: 'Midfield Rotation', cat: 'attacking' },
  { week: 5,  theme: 'Attacking / Possession', u710: 'Tight Area Possession', u1112: 'Combination in Wide Areas', u1316: 'Combination in Wide Areas', cat: 'attacking' },
  { week: 6,  theme: 'Attacking / Possession', u710: 'Receiving', u1112: 'Finishing', u1316: 'Finishing in the Box', cat: 'attacking' },
  { week: 7,  theme: 'Defending', u710: '1v1 / 2v2 / 3v3 Games', u1112: 'Defending the Box', u1316: 'Defending the Box', cat: 'defending' },
  { week: 8,  theme: 'Defending', u710: 'Attacking Equal Number', u1112: 'Defending in Wide Areas', u1316: 'Defending in Wide Areas', cat: 'defending' },
  { week: 9,  theme: 'Defending', u710: 'Attacking Overload', u1112: 'Defending in Central Areas', u1316: 'Defending in Central Areas', cat: 'defending' },
  { week: 10, theme: 'Pressing & Transitions', u710: 'Striking & Finishing', u1112: 'Pressing from the Front', u1316: 'How We Press', cat: 'pressing' },
  { week: 11, theme: 'Pressing & Transitions', u710: 'Striking & Finishing', u1112: 'Attacking Overload', u1316: 'Attacking Overload', cat: 'pressing' },
  { week: 12, theme: 'Pressing & Transitions', u710: 'Defending Equal Numbers', u1112: 'Counter Attacks in Final 1/3', u1316: 'Counter Attacks in Final 1/3', cat: 'pressing' },
  { week: 13, theme: 'Pressing & Transitions', u710: 'Defending Outnumbered', u1112: 'Defending Against Overloads', u1316: 'Defending Against Overloads', cat: 'pressing' },
  { week: 14, theme: 'Games Week', u710: 'Games Week', u1112: 'Games Week', u1316: 'Games Week', cat: 'games' },
]

const CAT_COLORS = {
  attacking: '#e74c3c',
  defending: '#3498db',
  pressing:  '#2ecc71',
  games:     '#ce962d',
}

function WeekPlan({ week }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLORS[week.cat] || 'var(--gold)'

  return (
    <div style={{
      border: `1px solid ${open ? color : 'var(--border)'}`,
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        background: open ? `${color}10` : 'var(--card)',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.2s',
      }}>
        <span style={{
          minWidth: 36, height: 36, borderRadius: '50%',
          background: `${color}20`, border: `2px solid ${color}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.78rem', fontWeight: 800, color: color,
          flexShrink: 0,
        }}>{week.week}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>Week {week.week}</div>
          <div style={{ fontSize: '0.78rem', color: color, fontWeight: 600 }}>{week.theme}</div>
        </div>
        <span style={{ color: 'var(--muted)', fontSize: '1rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>

      {open && (
        <div style={{ padding: '1.25rem', borderTop: `1px solid ${color}30`, background: 'rgba(255,255,255,0.02)' }}>
          {/* Age group topics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'U7-10', topic: week.u710, format: '5v5/7v7' },
              { label: 'U11-12', topic: week.u1112, format: '9v9' },
              { label: 'U13-16', topic: week.u1316, format: '11v11' },
            ].map(ag => (
              <div key={ag.label} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '0.9rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  {ag.label} · {ag.format}
                </div>
                <div style={{ fontWeight: 700, color: color, fontSize: '0.9rem' }}>{ag.topic}</div>
              </div>
            ))}
          </div>

          {/* Session structure reminder */}
          <div style={{ background: 'rgba(0,188,212,0.08)', border: '1px solid rgba(0,188,212,0.2)', borderRadius: 6, padding: '0.9rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#00bcd4', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Session Structure</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['0-10 Arrival', '10-20 Ball Mastery', '20-40 Topic Practice', '40-55 Game', '55-60 Debrief'].map(s => (
                <span key={s} style={{
                  fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 4,
                  background: 'rgba(0,188,212,0.12)', color: '#00bcd4', fontWeight: 600,
                }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', borderRadius: 6, border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
              📄 Detailed session plans for Week {week.week} will be added here. Contact the Academy Director to upload your session PDFs.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CoachesPage() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [ageFilter, setAgeFilter] = useState('all')

  const handleLogin = e => {
    e.preventDefault()
    if (password === COACH_PASSWORD) {
      setLoggedIn(true)
      setError(null)
    } else {
      setError('Incorrect password. Please contact the Academy Director.')
    }
  }

  if (!loggedIn) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(206,150,45,0.08) 0%, transparent 60%)',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(206,150,45,0.1)', border: '2px solid rgba(206,150,45,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', margin: '0 auto 1rem',
            }}>🔒</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Coaches Portal</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Three Bridges Academy · Staff Only</p>
          </div>

          <div className="card">
            {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Coach Password</label>
                <input
                  type="password"
                  placeholder="Enter coach password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required autoFocus
                />
              </div>
              <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                Access Portal
              </button>
            </form>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
            Don't have a password? Contact the Academy Director.
          </p>
        </div>
      </div>
    )
  }

  const filteredWeeks = ageFilter === 'all' ? WEEKS_DATA : WEEKS_DATA

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">Three Bridges Academy · Coaches Portal</p>
          <h1>Weekly Training Plans</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Session plans for all 14 weeks of the curriculum
          </p>
        </div>
      </div>

      <div className="page">
        {/* Welcome bar */}
        <div style={{
          background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.25)',
          borderRadius: 8, padding: '0.9rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          <span style={{ fontSize: '1.1rem' }}>✅</span>
          <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#2ecc71' }}>
            Welcome, Coach — you're viewing the Three Bridges Academy training plan dashboard.
          </span>
          <button onClick={() => setLoggedIn(false)} style={{
            marginLeft: 'auto', background: 'transparent', border: 'none',
            color: 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer',
          }}>Log out</button>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { cat: 'attacking', label: 'Attacking' },
            { cat: 'defending', label: 'Defending' },
            { cat: 'pressing', label: 'Pressing' },
            { cat: 'games', label: 'Games Week' },
          ].map(item => (
            <div key={item.cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: CAT_COLORS[item.cat], display: 'inline-block' }} />
              <span style={{ color: CAT_COLORS[item.cat] }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Week accordion list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {WEEKS_DATA.map(week => (
            <WeekPlan key={week.week} week={week} />
          ))}
        </div>

        {/* Upload guide CTA */}
        <div style={{
          marginTop: '2.5rem',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '2rem', textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Upload a Session Plan</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem', fontSize: '0.88rem' }}>
            Want to add a PDF or resource for a specific week? Contact the Academy Director.
          </p>
          <a href="https://threebridgesfc.co.uk" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
            Contact Academy Director
          </a>
        </div>
      </div>
    </>
  )
}
