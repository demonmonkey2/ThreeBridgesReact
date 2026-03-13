import { useState, useEffect } from 'react'
import { api } from '../api'

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get('/teams')
      .then(setTeams)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const placeholder = [
    { id: 'p1', name: '1st Team',       description: 'Competing in the Isthmian League South East Division.', manager: 'TBC' },
    { id: 'p2', name: "Women's Team",   description: "Three Bridges FC Women's team.",                       manager: 'TBC' },
    { id: 'p3', name: 'U18s',           description: 'Youth development squad.',                             manager: 'TBC' },
  ]

  const display = teams.length > 0 ? teams : placeholder

  return (
    <div>
      <div className="page-header">
        <div className="page-header-inner animate-fadeup">
          <p className="page-header-eyebrow">Three Bridges FC</p>
          <h1>Our Teams</h1>
        </div>
      </div>

      <div className="page">
        {loading && (
          <div className="grid-2">
            {[1,2,3].map(i => (
              <div key={i} className="card" style={{ height: 130, opacity: 0.3 }} />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid-2">
            {display.map((team, i) => (
              <div key={team.id} className={`card card-hover animate-fadeup delay-${Math.min(i + 1, 4)}`}
                style={{ borderLeft: '3px solid var(--gold)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{team.name}</h2>
                  <span className="badge badge-gold">Active</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: team.manager ? '1rem' : 0 }}>
                  {team.description || 'No description available.'}
                </p>
                {team.manager && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                    <span>👤</span>
                    <span><strong style={{ color: 'var(--text)' }}>Manager:</strong> {team.manager}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
