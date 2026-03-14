const WEEKS = [
  { week: 1,  u710: 'Dribbling',                        u1112: { text: 'Playing Out',                   cat: 'attacking' }, u1316: { text: 'Playing Out',                   cat: 'attacking' } },
  { week: 2,  u710: 'Dribbling',                        u1112: { text: 'Playing Between the Lines',     cat: 'attacking' }, u1316: { text: 'Playing Between the Lines',     cat: 'attacking' } },
  { week: 3,  u710: 'Passing',                          u1112: { text: 'Switching Play',                cat: 'attacking' }, u1316: { text: 'Switching Play',                cat: 'attacking' } },
  { week: 4,  u710: 'Turning & Shielding',              u1112: { text: 'Rotation',                      cat: 'attacking' }, u1316: { text: 'Midfield Rotation',             cat: 'attacking' } },
  { week: 5,  u710: 'Tight Area Possession',            u1112: { text: 'Combination in Wide Areas',     cat: 'attacking' }, u1316: { text: 'Combination in Wide Areas',     cat: 'attacking' } },
  { week: 6,  u710: 'Receiving',                        u1112: { text: 'Finishing',                     cat: 'attacking' }, u1316: { text: 'Finishing in the Box',          cat: 'attacking' } },
  { week: 7,  u710: '1v1 / 2v2 / 3v3 Games',           u1112: { text: 'Defending the Box',             cat: 'defending' }, u1316: { text: 'Defending the Box',             cat: 'defending' } },
  { week: 8,  u710: 'Attacking Equal Number (1v1/2v2)', u1112: { text: 'Defending in Wide Areas',       cat: 'defending' }, u1316: { text: 'Defending in Wide Areas',       cat: 'defending' } },
  { week: 9,  u710: 'Attacking Overload (2v1/3v2)',     u1112: { text: 'Defending in Central Areas',    cat: 'defending' }, u1316: { text: 'Defending in Central Areas',    cat: 'defending' } },
  { week: 10, u710: 'Striking & Finishing',             u1112: { text: 'Pressing from the Front',       cat: 'pressing'  }, u1316: { text: 'How We Press',                  cat: 'pressing'  } },
  { week: 11, u710: 'Striking & Finishing',             u1112: { text: 'Attacking Overload',            cat: 'pressing'  }, u1316: { text: 'Attacking Overload',            cat: 'pressing'  } },
  { week: 12, u710: 'Defending Equal Numbers (1v1/2v2)',u1112: { text: 'Counter Attacks in Final 1/3',  cat: 'pressing'  }, u1316: { text: 'Counter Attacks in Final 1/3',  cat: 'pressing'  } },
  { week: 13, u710: 'Defending Outnumbered (1v2/2v3)', u1112: { text: 'Defending Against Overloads',   cat: 'pressing'  }, u1316: { text: 'Defending Against Overloads',   cat: 'pressing'  } },
  { week: 14, u710: 'Games Week',                       u1112: { text: 'Games Week',                    cat: 'games'     }, u1316: { text: 'Games Week',                    cat: 'games'     } },
]

const SESSION = [
  { time: '0–10 mins',   label: 'Arrival Activity',            highlight: false },
  { time: '10–20 mins',  label: 'Ball Mastery',                highlight: true  },
  { time: '20–40 mins',  label: 'Topic Related Practice',      highlight: true  },
  { time: '40–55 mins',  label: 'Game',                        highlight: false },
  { time: '55–60 mins',  label: 'Debrief & Tidy Away',         highlight: false },
]

const CAT_COLORS = {
  attacking: { bg: 'rgba(231,76,60,0.15)', text: '#e74c3c', border: 'rgba(231,76,60,0.3)' },
  defending: { bg: 'rgba(52,152,219,0.15)', text: '#3498db', border: 'rgba(52,152,219,0.3)' },
  pressing:  { bg: 'rgba(46,204,113,0.15)', text: '#2ecc71', border: 'rgba(46,204,113,0.3)' },
  games:     { bg: 'rgba(206,150,45,0.15)', text: '#ce962d', border: 'rgba(206,150,45,0.3)' },
  neutral:   { bg: 'transparent',           text: 'var(--text)', border: 'transparent' },
}

function TopicCell({ cell }) {
  if (typeof cell === 'string') {
    const isGames = cell === 'Games Week'
    const style = isGames ? CAT_COLORS.games : CAT_COLORS.neutral
    return (
      <span style={{
        display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: 4,
        background: style.bg, color: style.text,
        fontSize: '0.82rem', fontWeight: isGames ? 700 : 500,
      }}>{cell}</span>
    )
  }
  const style = CAT_COLORS[cell.cat] || CAT_COLORS.neutral
  return (
    <span style={{
      display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: 4,
      background: style.bg, color: style.text,
      border: `1px solid ${style.border}`,
      fontSize: '0.82rem', fontWeight: 600,
    }}>{cell.text}</span>
  )
}

export default function CurriculumPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">Three Bridges Academy</p>
          <h1>Youth Curriculum</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            14-week rolling programme across all age groups
          </p>
        </div>
      </div>

      <div className="page">
        {/* Legend */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { cat: 'attacking', label: 'Attacking / Possession' },
            { cat: 'defending', label: 'Defending' },
            { cat: 'pressing',  label: 'Pressing & Transitions' },
            { cat: 'games',     label: 'Games Week' },
          ].map(item => {
            const style = CAT_COLORS[item.cat]
            return (
              <div key={item.cat} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.78rem', fontWeight: 600,
              }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: style.text, display: 'inline-block' }} />
                <span style={{ color: style.text }}>{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Curriculum table — scrollable on mobile */}
        <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid var(--border)', marginBottom: '3rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr style={{ background: 'var(--gold)' }}>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000', width: 100 }}>Week</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>U7–10 (5v5/7v7)</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>U11–12 (9v9)</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>U13–16 (11v11)</th>
              </tr>
            </thead>
            <tbody>
              {WEEKS.map((row, i) => (
                <tr key={row.week} style={{ background: i % 2 === 0 ? 'var(--card)' : 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 800, fontSize: '0.82rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                    WEEK {row.week}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <TopicCell cell={row.u710} />
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <TopicCell cell={row.u1112} />
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <TopicCell cell={row.u1316} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Session Planning */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="page-header-eyebrow" style={{ marginBottom: '0.5rem' }}>Session Structure</p>
          <h2 className="section-title">Session Planning</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Every Academy session follows the same structured format to ensure consistency and maximum development time.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 600 }}>
            {SESSION.map((s, i) => (
              <div key={s.time} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.9rem 1.25rem',
                background: s.highlight ? 'rgba(0,188,212,0.12)' : 'var(--card)',
                border: s.highlight ? '1px solid rgba(0,188,212,0.3)' : '1px solid var(--border)',
                borderRadius: 8,
              }}>
                <span style={{
                  minWidth: 90, fontSize: '0.78rem', fontWeight: 700, color: s.highlight ? '#00bcd4' : 'var(--muted)',
                }}>{s.time}</span>
                <span style={{
                  fontWeight: s.highlight ? 700 : 500,
                  color: s.highlight ? '#fff' : 'var(--text)',
                  fontSize: '0.9rem',
                }}>{s.label}</span>
                {s.highlight && (
                  <span style={{
                    marginLeft: 'auto', fontSize: '0.68rem', fontWeight: 700,
                    background: 'rgba(0,188,212,0.2)', color: '#00bcd4',
                    padding: '0.15rem 0.5rem', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>Key Phase</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Coaches CTA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(206,150,45,0.1) 0%, rgba(206,150,45,0.03) 100%)',
          border: '1px solid rgba(206,150,45,0.25)',
          borderRadius: 10,
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>Coaches — access your weekly training plans</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Full session plans for each week of the curriculum are available in the password-protected Coaches Portal.
          </p>
          <a href="/coaches" className="btn">Go to Coaches Portal →</a>
        </div>
      </div>
    </>
  )
}
