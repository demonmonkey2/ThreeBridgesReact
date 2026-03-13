import { Link } from 'react-router-dom'

const NEWS = [
  {
    id: 1,
    tag: 'Match Report',
    title: 'Three Bridges 2–1 Eastbourne Town',
    excerpt: 'Goals from Williams and Patel secured a crucial three points at Jubilee Field in front of a passionate home crowd.',
    date: '8 Mar 2026',
    img: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80',
  },
  {
    id: 2,
    tag: 'Club News',
    title: 'New Kit Unveiled for 2025/26 Season',
    excerpt: 'The club is proud to announce the launch of our new home and away kits for the upcoming Isthmian League campaign.',
    date: '2 Mar 2026',
    img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
  },
  {
    id: 3,
    tag: 'Fixtures',
    title: 'Fixture List Released for Spring Run-In',
    excerpt: 'Six games remaining in the season — here\'s what\'s coming up for the first team and development squad.',
    date: '25 Feb 2026',
    img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
  },
]

const SPONSORS = [
  'Main Sponsor', 'Kit Partner', 'Ground Sponsor', 'Media Partner', 'Community Partner',
]

export default function HomePage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1800&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(380px, 50vh, 560px)',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Layered overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,12,0.97) 0%, rgba(5,8,12,0.6) 50%, rgba(5,8,12,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(206,150,45,0.12) 0%, transparent 65%)' }} />

        {/* Watermark */}
        <div style={{
          position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem, 22vw, 18rem)', fontWeight: 700, lineHeight: 1,
          color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
          userSelect: 'none', letterSpacing: '-0.03em',
        }}>1901</div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) 1.5rem' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--gold)', color: '#000', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: 3 }}>
                2025/26 Season
              </span>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Isthmian League South East</span>
            </div>

            <h1 className="animate-fadeup" style={{
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              No Bridge<br />
              <span style={{ color: 'var(--gold)', textShadow: '0 0 60px rgba(206,150,45,0.5)' }}>Too Far.</span>
            </h1>

            <p className="animate-fadeup delay-1" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 440, marginBottom: '2rem', lineHeight: 1.6 }}>
              Three Bridges Football Club — proudly serving Crawley since 1901.
            </p>

            <div className="animate-fadeup delay-2" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/scores" className="btn" style={{ fontSize: '0.85rem', padding: '0.7rem 1.6rem' }}>Latest Results</Link>
              <Link to="/teams" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.7rem 1.6rem' }}>Our Teams</Link>
            </div>
          </div>

          {/* Fixture widget */}
          <div style={{
            position: 'absolute', right: '1.5rem', bottom: '1.5rem',
            background: 'rgba(13,15,18,0.92)',
            border: '1px solid rgba(206,150,45,0.3)',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
            minWidth: 260,
            backdropFilter: 'blur(10px)',
          }} className="hide-mobile">
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: '0.75rem' }}>Next Fixture</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', flex: 1, textAlign: 'right' }}>THREE BRIDGES</span>
              <span style={{ background: 'var(--gold)', color: '#000', fontWeight: 700, fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 3 }}>VS</span>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', flex: 1 }}>LINGFIELD FC</span>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.78rem', textAlign: 'center' }}>Sat 21 Mar · 3:00pm · Jubilee Field</div>
            <Link to="/scores" style={{ display: 'block', marginTop: '0.85rem', textAlign: 'center', background: 'var(--gold)', color: '#000', fontWeight: 700, fontSize: '0.75rem', padding: '0.45rem', borderRadius: 4, letterSpacing: '0.05em' }}>
              View All Fixtures
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>Three Bridges FC</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>Latest News</h2>
          </div>
          <Link to="/scores" style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            All News →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {NEWS.map((item, i) => (
            <article key={item.id} className={`animate-fadeup delay-${i + 1}`} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = ''}
                />
                <span style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  background: 'var(--gold)', color: '#000',
                  fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', padding: '0.25rem 0.6rem', borderRadius: 3,
                }}>{item.tag}</span>
              </div>
              {/* Content */}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.35, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1rem' }}>{item.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{item.date}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem' }}>Read more →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <section style={{ background: '#111316', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { to: '/teams',      icon: '👥', label: 'Our Teams' },
            { to: '/scores',     icon: '📋', label: 'Results' },
            { to: '/videos',     icon: '🎬', label: 'Videos' },
            { to: '/book-pitch', icon: '🏟', label: '3G Pitch Hire' },
          ].map(item => (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '1.5rem 1rem',
              borderRight: '1px solid var(--border)',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 700, fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(206,150,45,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = '' }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {item.label}
              <span style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '0.7rem' }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PITCH HIRE CTA ── */}
      <section style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1400&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,12,0.85)' }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Available for Hire</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
              3G Pitch at Jubilee Field
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: 480 }}>
              Book our artificial 3G pitch for training sessions, 5-a-side, and friendly matches. Available 7 days a week.
            </p>
          </div>
          <Link to="/book-pitch" className="btn" style={{ fontSize: '0.9rem', padding: '0.85rem 2rem', whiteSpace: 'nowrap' }}>
            Check Availability
          </Link>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section style={{ background: '#0d0f12', borderTop: '1px solid var(--border)', padding: '1.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
            Club Partners & Sponsors
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {SPONSORS.map(s => (
              <div key={s} style={{
                color: 'rgba(255,255,255,0.2)',
                fontWeight: 700, fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 4,
                padding: '0.5rem 1.25rem',
              }}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080a0c', borderTop: '3px solid var(--gold)', padding: 'clamp(2rem, 4vw, 3.5rem) 1.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>⚽</div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>THREE BRIDGES <span style={{ color: 'var(--gold)' }}>FC</span></span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                Playing out of Jubilee Field, Crawley since 1901.<br />No Bridge Too Far.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.75rem' }}>Club</div>
              {[['/', 'Home'], ['/teams', 'Teams'], ['/scores', 'Results'], ['/videos', 'Videos']].map(([to, label]) => (
                <div key={to}><Link to={to} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 2, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >{label}</Link></div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.75rem' }}>Venue</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                Jubilee Field<br />Crawley<br />West Sussex
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.75rem' }}>League</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                Isthmian League<br />South East Division<br />Step 4
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>© {new Date().getFullYear()} Three Bridges FC. All rights reserved.</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Est. 1901 · Crawley · Step 4</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
