import { useState, useEffect } from 'react'
import { api } from '../api'

export default function VideoPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get('/videos')
      .then(setVideos)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const placeholder = [
    { id: 'p1', title: 'Match Highlights — Three Bridges vs Eastbourne', description: 'Full highlights from our 2-1 victory at Jubilee Field.', url: '#' },
    { id: 'p2', title: 'Training Session — Pre-Season 2025', description: 'Behind the scenes at our pre-season training camp.', url: '#' },
  ]

  const display = videos.length > 0 ? videos : placeholder

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #142431, #1e2024)',
        borderBottom: '2px solid var(--gold)',
        padding: '2.5rem 1rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>Three Bridges FC</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700 }}>Videos</h1>
        </div>
      </div>

      <div className="page">
        {loading && <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading videos...</div>}
        {!loading && (
          <div className="grid-2">
            {display.map(v => (
              <div key={v.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Thumbnail placeholder */}
                <div style={{
                  background: 'rgba(206,150,45,0.08)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                }}>
                  ▶
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>{v.description}</p>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ fontSize: '0.85rem' }}
                  >
                    ▶ Watch
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
