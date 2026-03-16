import { Link } from 'react-router-dom'

const tiles = [
  { to: '/teams', icon: '👥', title: 'Manage Teams', desc: 'Add, edit and remove teams.' },
  { to: '/scores', icon: '📋', title: 'Manage Scores', desc: 'Post and update match results.' },
  { to: '/book-pitch', icon: '📅', title: 'Pitch Bookings', desc: 'View and manage pitch bookings.' },
  { to: '/videos', icon: '🎬', title: 'Videos', desc: 'Upload and manage video content.' },
]

export default function AdminPage() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #142431, #1e2024)',
        borderBottom: '2px solid var(--gold)',
        padding: '2.5rem 1rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>ABC FC</p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700 }}>Admin Dashboard</h1>
          </div>
          <span className="badge badge-gold">Admin</span>
        </div>
      </div>

      <div className="page">
        <div className="grid-2">
          {tiles.map(tile => (
            <Link to={tile.to} key={tile.to} style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{ cursor: 'pointer', transition: 'border-color 0.2s', height: '100%' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{tile.icon}</div>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>{tile.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{tile.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
