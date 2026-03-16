import { useState, useEffect } from 'react'
import { api } from '../api'

export default function ScoresPage() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    api.get('/scores')
      .then(setScores)
      .catch(() => {}) // fall back to placeholder data silently
      .finally(() => setLoading(false))
  }, [])

  const placeholder = [
    { id: 'p1', home_team: 'ABC FC', away_team: 'Eastbourne Town',  home_score: 2, away_score: 1, date: '2026-03-08' },
    { id: 'p2', home_team: 'Lingfield',         away_team: 'ABC FC', home_score: 0, away_score: 3, date: '2026-03-01' },
    { id: 'p3', home_team: 'ABC FC', away_team: 'Horsham YMCA',     home_score: 1, away_score: 1, date: '2026-02-22' },
  ]

  const display = scores.length > 0 ? scores : placeholder

  function getResult(s) {
    const tbHome = s.home_team?.toLowerCase().includes('abc fc')
    const our = tbHome ? s.home_score : s.away_score
    const their = tbHome ? s.away_score : s.home_score
    if (our > their) return { label: 'W', cls: 'badge-win' }
    if (our < their) return { label: 'L', cls: 'badge-loss' }
    return { label: 'D', cls: 'badge-draw' }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-inner animate-fadeup">
          <p className="page-header-eyebrow">Isthmian League SE</p>
          <h1>Results &amp; Scores</h1>
        </div>
      </div>

      <div className="page">
        {loading && <div className="card" style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>Loading results...</div>}

        {!loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {display.map((s, i) => {
              const result = getResult(s)
              return (
                <div key={s.id} className={`card animate-fadeup delay-${Math.min(i + 1, 4)}`}
                  style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                      <div style={{ flex: 1, textAlign: 'right', fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.home_team}
                      </div>
                      <div style={{
                        background: 'rgba(206,150,45,0.1)',
                        border: '1px solid rgba(206,150,45,0.3)',
                        borderRadius: 6,
                        padding: '0.35rem 1rem',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        color: 'var(--gold)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.06em',
                        flexShrink: 0,
                      }}>
                        {s.home_score} – {s.away_score}
                      </div>
                      <div style={{ flex: 1, fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.away_team}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                      <span className={`badge ${result.cls}`}>{result.label}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                        {new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
