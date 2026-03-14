import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: 'clamp(380px, 55vh, 580px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a1520 0%, #142431 60%, #1a1f2e 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(206,150,45,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(206,150,45,0.05) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1551958219-acbc595d1e10?w=1400&q=60")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.12,
        }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', width: '100%' }}>
          <div className="animate-fadeup" style={{ maxWidth: 620 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(206,150,45,0.15)', border: '1px solid rgba(206,150,45,0.3)',
              borderRadius: 4, padding: '0.3rem 0.75rem', marginBottom: '1.2rem',
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>
              ⚽ Three Bridges FC · Est. 1901 · Crawley
            </div>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 900,
              lineHeight: 1.05, letterSpacing: '-0.02em',
              textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              Three Bridges<br />
              <span style={{ color: 'var(--gold)' }}>Academy</span>
            </h1>
            <p className="delay-1 animate-fadeup" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Developing technically excellent, tactically aware players from U7 to U16 — built on a structured 14-week curriculum.
            </p>
            <div className="delay-2 animate-fadeup" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/age-groups" className="btn">Explore Age Groups</Link>
              <Link to="/curriculum" className="btn btn-outline">View Curriculum</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav tiles */}
      <section style={{ background: 'var(--card)', borderBottom: '2px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {[
              { to: '/age-groups', icon: '👥', label: 'Age Groups' },
              { to: '/curriculum', icon: '📋', label: 'Curriculum' },
              { to: '/linesman-course', icon: '🚩', label: 'Linesman Course' },
              { to: '/coaches', icon: '🔒', label: 'Coaches Portal' },
            ].map(item => (
              <Link key={item.to} to={item.to} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                padding: '1.1rem 0.5rem', color: 'var(--muted)',
                borderRight: '1px solid var(--border)',
                fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                transition: 'color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(206,150,45,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '3.5rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p className="page-header-eyebrow">Our Mission</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Player Development at Every Level
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
              The Three Bridges Academy provides structured, age-appropriate coaching from grassroots to senior level. Our curriculum follows a 14-week rotating programme designed to develop technical skills, tactical understanding, and physical attributes.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              Each age group follows a tailored pathway — from 5v5 fundamentals at U7-10, through 9v9 tactical awareness at U11-12, to full 11v11 game understanding at U13-16.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { num: '3', label: 'Age Groups', sub: 'U7-10 · U11-12 · U13-16' },
              { num: '14', label: 'Week Curriculum', sub: 'Rolling programme' },
              { num: '5', label: 'Topic Themes', sub: 'Technical to tactical' },
              { num: '60', label: 'Min Sessions', sub: 'Structured training' },
            ].map(stat => (
              <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.3rem' }}>{stat.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme highlights */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1rem' }}>
          <p className="page-header-eyebrow" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Programme Highlights</p>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginBottom: '2.5rem' }}>
            What the Academy Covers
          </h2>
          <div className="grid-3">
            {[
              { icon: '⚽', title: 'Technical Foundations', desc: 'Dribbling, passing, receiving and striking — built from the ground up with age-appropriate progression.', color: '#ce962d' },
              { icon: '🧠', title: 'Tactical Awareness', desc: 'Playing out from the back, switching play, rotation, pressing from the front and combination play in wide areas.', color: '#e74c3c' },
              { icon: '🛡️', title: 'Defensive Organisation', desc: 'Defending the box, wide areas, central areas, and dealing with overloads — structured for each age group.', color: '#3498db' },
              { icon: '⚡', title: 'Pressing & Transitions', desc: 'How we press, attacking overloads, counter attacks and defending against overloads in the final third.', color: '#2ecc71' },
              { icon: '📅', title: 'Games Weeks', desc: 'Every 14 weeks culminates in a dedicated games week to apply learning in competitive match environments.', color: '#9b59b6' },
              { icon: '📝', title: 'Session Structure', desc: 'Every session follows our proven format: Arrival Activity → Ball Mastery → Practice → Game → Debrief.', color: '#1abc9c' },
            ].map(card => (
              <div key={card.title} className="card card-hover" style={{ borderTop: `3px solid ${card.color}` }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{card.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{
        background: 'linear-gradient(90deg, #ce962d 0%, #e0a835 100%)',
        padding: '2.5rem 1rem', textAlign: 'center',
      }}>
        <h2 style={{ color: '#000', fontWeight: 900, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginBottom: '0.75rem' }}>
          Are you a coach at Three Bridges Academy?
        </h2>
        <p style={{ color: 'rgba(0,0,0,0.7)', marginBottom: '1.5rem' }}>
          Log in to access weekly training plans, session guides and resources for your age group.
        </p>
        <Link to="/coaches" className="btn" style={{ background: '#000', color: '#ce962d' }}>
          Coaches Portal →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0f1520', borderTop: '1px solid var(--border)',
        padding: '2rem 1rem', textAlign: 'center',
        color: 'var(--muted)', fontSize: '0.82rem',
      }}>
        <img
          src="https://threebridgesfc.co.uk/wp-content/uploads/2023/10/Bridges-Hi-Res-No-Background.png"
          alt="Three Bridges FC"
          style={{ height: 48, margin: '0 auto 1rem', opacity: 0.7 }}
        />
        <p style={{ marginBottom: '0.3rem', fontWeight: 700, color: 'var(--text)' }}>Three Bridges Academy</p>
        <p>Part of Three Bridges FC · Jubilee Field, Crawley · Est. 1901</p>
      </footer>
    </>
  )
}
