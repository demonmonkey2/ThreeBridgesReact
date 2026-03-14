import { useState } from 'react'

const COACH_PASSWORD = 'academy2026'

const CAT_COLORS = {
  attacking: '#e74c3c',
  defending: '#3498db',
  pressing:  '#2ecc71',
  games:     '#ce962d',
}

const WEEKS_DATA = [
  { week: 1,  theme: 'Attacking / Possession', u710: 'Dribbling',                        u1112: 'Playing Out',                  u1316: 'Playing Out',                  cat: 'attacking' },
  { week: 2,  theme: 'Attacking / Possession', u710: 'Dribbling',                        u1112: 'Playing Between the Lines',    u1316: 'Playing Between the Lines',    cat: 'attacking' },
  { week: 3,  theme: 'Attacking / Possession', u710: 'Passing',                          u1112: 'Switching Play',               u1316: 'Switching Play',               cat: 'attacking' },
  { week: 4,  theme: 'Attacking / Possession', u710: 'Turning & Shielding',              u1112: 'Rotation',                     u1316: 'Midfield Rotation',            cat: 'attacking' },
  { week: 5,  theme: 'Attacking / Possession', u710: 'Tight Area Possession',            u1112: 'Combination in Wide Areas',    u1316: 'Combination in Wide Areas',    cat: 'attacking' },
  { week: 6,  theme: 'Attacking / Possession', u710: 'Receiving',                        u1112: 'Finishing',                    u1316: 'Finishing in the Box',         cat: 'attacking' },
  { week: 7,  theme: 'Defending',              u710: '1v1 / 2v2 / 3v3 Games',           u1112: 'Defending the Box',            u1316: 'Defending the Box',            cat: 'defending' },
  { week: 8,  theme: 'Defending',              u710: 'Attacking Equal Number',           u1112: 'Defending in Wide Areas',      u1316: 'Defending in Wide Areas',      cat: 'defending' },
  { week: 9,  theme: 'Defending',              u710: 'Attacking Overload',               u1112: 'Defending in Central Areas',   u1316: 'Defending in Central Areas',   cat: 'defending' },
  { week: 10, theme: 'Pressing & Transitions', u710: 'Striking & Finishing',             u1112: 'Pressing from the Front',      u1316: 'How We Press',                 cat: 'pressing'  },
  { week: 11, theme: 'Pressing & Transitions', u710: 'Striking & Finishing',             u1112: 'Attacking Overload',           u1316: 'Attacking Overload',           cat: 'pressing'  },
  { week: 12, theme: 'Pressing & Transitions', u710: 'Defending Equal Numbers',          u1112: 'Counter Attacks in Final 1/3', u1316: 'Counter Attacks in Final 1/3', cat: 'pressing'  },
  { week: 13, theme: 'Pressing & Transitions', u710: 'Defending Outnumbered',            u1112: 'Defending Against Overloads',  u1316: 'Defending Against Overloads',  cat: 'pressing'  },
  { week: 14, theme: 'Games Week',             u710: 'Games Week',                       u1112: 'Games Week',                   u1316: 'Games Week',                   cat: 'games'     },
]

// Session plans keyed by "week-agegroup"
// Each plan has: coach, date, topic, blocks[]
// block types: warmup | drill | game | note
const SESSION_PLANS = {
  '6-u1112': {
    coach: 'Leo',
    date: '10 Feb 2026',
    topic: 'Finishing',
    blocks: [
      {
        type: 'warmup',
        duration: '15 mins',
        title: 'Warm Up — 3v3 Tennis',
        details: [
          'Split players into groups of 3.',
          'Play 3v3 tennis-style game — keep the ball off the ground over a low line/cone net.',
          'Swap teams every 5 minutes — 3 swaps total.',
        ],
      },
      {
        type: 'drill',
        duration: '25 mins',
        title: 'Shooting Drill',
        subtitle: 'Long Shot · First Time Shot · Cross + Shot',
        details: [
          'Set up 3 stations: cone 1 (Player 1), cone X (Player X), cone Y (Player Y) in front of goal.',
          'Player 1 — dribbles to cone 2, cuts in and shoots. Returns to cone 1.',
          'Player X — lays ball in front for Player 1 to run onto and hit a first time shot. Player 1 runs back to cone 1.',
          'Player Y — runs down the line to the cone, then crosses back into the path of Player 1 to finish.',
          'Once a player has shot and played ball in, rotate around 1 station.',
        ],
        notes: [
          'Need footballs at each station — return balls to positions 1, X and Y after each rep.',
          'Keep the pitch clear — rotate immediately after shooting.',
        ],
      },
      {
        type: 'game',
        duration: '20 mins',
        title: 'Small Sided Game (SSG)',
        details: [
          'Free play — let players apply finishing in a game context.',
          'Encourage shots on sight. Reward goals from outside the area.',
        ],
      },
    ],
  },
}

function SessionPlan({ plan, color }) {
  const TYPE_STYLES = {
    warmup: { bg: 'rgba(255,183,77,0.1)',  border: 'rgba(255,183,77,0.3)',  label: 'Warm Up',  labelColor: '#ffb74d' },
    drill:  { bg: 'rgba(231,76,60,0.1)',   border: 'rgba(231,76,60,0.3)',   label: 'Drill',    labelColor: '#e74c3c' },
    game:   { bg: 'rgba(46,204,113,0.1)',  border: 'rgba(46,204,113,0.3)',  label: 'Game',     labelColor: '#2ecc71' },
    note:   { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', label: 'Note',    labelColor: 'var(--muted)' },
  }

  return (
    <div>
      {/* Plan header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {plan.coach && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(255,255,255,0.08)', color: 'var(--muted)', padding: '0.2rem 0.6rem', borderRadius: 4 }}>
              👤 {plan.coach}
            </span>
          )}
          {plan.date && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(255,255,255,0.08)', color: 'var(--muted)', padding: '0.2rem 0.6rem', borderRadius: 4 }}>
              📅 {plan.date}
            </span>
          )}
          <span style={{ fontSize: '0.75rem', fontWeight: 700, background: `${color}20`, color: color, padding: '0.2rem 0.6rem', borderRadius: 4 }}>
            ⚽ {plan.topic}
          </span>
        </div>
      </div>

      {/* Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {plan.blocks.map((block, i) => {
          const s = TYPE_STYLES[block.type] || TYPE_STYLES.note
          return (
            <div key={i} style={{
              background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 8, padding: '1rem 1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                  background: s.border, color: s.labelColor, padding: '0.2rem 0.55rem', borderRadius: 3,
                }}>{s.label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{block.title}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 700, color: s.labelColor }}>⏱ {block.duration}</span>
              </div>
              {block.subtitle && (
                <p style={{ fontSize: '0.8rem', color: s.labelColor, fontWeight: 600, marginBottom: '0.6rem' }}>{block.subtitle}</p>
              )}
              <ul style={{ paddingLeft: '1.1rem', margin: 0 }}>
                {block.details.map((d, j) => (
                  <li key={j} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.7 }}>{d}</li>
                ))}
              </ul>
              {block.notes && block.notes.length > 0 && (
                <div style={{
                  marginTop: '0.75rem', padding: '0.6rem 0.9rem',
                  background: 'rgba(0,0,0,0.2)', borderRadius: 6,
                  borderLeft: `3px solid ${s.labelColor}`,
                }}>
                  {block.notes.map((n, j) => (
                    <p key={j} style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>⚠ {n}</p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekPlan({ week }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('u1112')
  const color = CAT_COLORS[week.cat] || 'var(--gold)'

  const AGE_TABS = [
    { key: 'u710',  label: 'U7–10',  topic: week.u710,  format: '5v5/7v7' },
    { key: 'u1112', label: 'U11–12', topic: week.u1112, format: '9v9'     },
    { key: 'u1316', label: 'U13–16', topic: week.u1316, format: '11v11'   },
  ]

  const planKey = `${week.week}-${activeTab}`
  const plan = SESSION_PLANS[planKey] || null

  return (
    <div style={{
      border: `1px solid ${open ? color : 'var(--border)'}`,
      borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.2s',
    }}>
      {/* Header row */}
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
          fontSize: '0.78rem', fontWeight: 800, color,
          flexShrink: 0,
        }}>{week.week}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>Week {week.week}</div>
          <div style={{ fontSize: '0.78rem', color, fontWeight: 600 }}>{week.theme}</div>
        </div>
        {/* Show which age groups have plans */}
        <div style={{ display: 'flex', gap: '0.3rem' }} className="hide-mobile">
          {AGE_TABS.map(tab => {
            const hasPlan = !!SESSION_PLANS[`${week.week}-${tab.key}`]
            return (
              <span key={tab.key} style={{
                fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: 3,
                background: hasPlan ? `${color}20` : 'rgba(255,255,255,0.05)',
                color: hasPlan ? color : 'var(--muted)',
                border: `1px solid ${hasPlan ? `${color}40` : 'transparent'}`,
              }}>{tab.label}</span>
            )
          })}
        </div>
        <span style={{ color: 'var(--muted)', fontSize: '0.9rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>▼</span>
      </button>

      {open && (
        <div style={{ borderTop: `1px solid ${color}30`, background: 'rgba(255,255,255,0.01)' }}>
          {/* Age group tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
            {AGE_TABS.map(tab => {
              const hasPlan = !!SESSION_PLANS[`${week.week}-${tab.key}`]
              const isActive = activeTab === tab.key
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                  flex: 1, padding: '0.75rem 0.5rem', border: 'none', cursor: 'pointer',
                  fontWeight: 700, fontSize: '0.8rem',
                  background: isActive ? `${color}15` : 'transparent',
                  color: isActive ? color : 'var(--muted)',
                  borderBottom: isActive ? `2px solid ${color}` : '2px solid transparent',
                  transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                }}>
                  <span>{tab.label}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.7 }}>{tab.topic}</span>
                  {hasPlan && <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, marginTop: '0.1rem' }} />}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div style={{ padding: '1.25rem' }}>
            {plan ? (
              <SessionPlan plan={plan} color={color} />
            ) : (
              <div style={{
                padding: '1.5rem', textAlign: 'center',
                background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
                <p style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.9rem' }}>No plan added yet</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                  Contact the Academy Director to add a session plan for{' '}
                  {AGE_TABS.find(t => t.key === activeTab)?.label} — Week {week.week} ({AGE_TABS.find(t => t.key === activeTab)?.topic}).
                </p>
              </div>
            )}

            {/* Session structure bar */}
            <div style={{
              marginTop: '1.25rem',
              background: 'rgba(0,188,212,0.06)', border: '1px solid rgba(0,188,212,0.15)',
              borderRadius: 6, padding: '0.75rem 1rem',
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#00bcd4', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Standard Session Structure</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['0–10 Arrival', '10–20 Ball Mastery', '20–40 Topic Practice', '40–55 Game', '55–60 Debrief'].map(s => (
                  <span key={s} style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 4, background: 'rgba(0,188,212,0.1)', color: '#00bcd4', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CoachesPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = e => {
    e.preventDefault()
    if (password === COACH_PASSWORD) { setLoggedIn(true); setError(null) }
    else setError('Incorrect password. Please contact the Academy Director.')
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
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter coach password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required autoFocus
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    style={{
                      position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--muted)', fontSize: '1rem', lineHeight: 1,
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>Access Portal</button>
            </form>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
            Don't have a password? Contact the Academy Director.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">Three Bridges Academy · Coaches Portal</p>
          <h1>Weekly Training Plans</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Click a week, then select an age group tab to view or add session plans
          </p>
        </div>
      </div>

      <div className="page">
        {/* Welcome bar */}
        <div style={{
          background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.25)',
          borderRadius: 8, padding: '0.9rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <span>✅</span>
          <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#2ecc71' }}>
            Welcome, Coach — Three Bridges Academy training plan dashboard.
          </span>
          <button onClick={() => setLoggedIn(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer' }}>
            Log out
          </button>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          {[
            { cat: 'attacking', label: 'Attacking' },
            { cat: 'defending', label: 'Defending' },
            { cat: 'pressing',  label: 'Pressing'  },
            { cat: 'games',     label: 'Games Week' },
          ].map(item => (
            <div key={item.cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: CAT_COLORS[item.cat], display: 'inline-block' }} />
              <span style={{ color: CAT_COLORS[item.cat] }}>{item.label}</span>
            </div>
          ))}
          <span style={{ color: 'var(--muted)', fontSize: '0.72rem', marginLeft: 'auto' }}>
            ● = plan available
          </span>
        </div>

        {/* Week list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {WEEKS_DATA.map(week => <WeekPlan key={week.week} week={week} />)}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '2.5rem', background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '2rem', textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Add a Session Plan</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem', fontSize: '0.88rem' }}>
            To add a plan for a specific week and age group, contact the Academy Director or developer.
          </p>
          <a href="https://threebridgesfc.co.uk" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
            Contact Academy Director
          </a>
        </div>
      </div>
    </>
  )
}
