const GUIDE_CATEGORIES = [
  {
    id: 'technical',
    icon: '⚽',
    title: 'Technical Guides',
    color: '#ce962d',
    guides: [],
    placeholder: 'Dribbling, passing, receiving and striking guides will appear here.',
  },
  {
    id: 'tactical',
    icon: '🧠',
    title: 'Tactical Guides',
    color: '#e74c3c',
    guides: [],
    placeholder: 'Pressing shapes, rotation patterns and build-up play guides will appear here.',
  },
  {
    id: 'defending',
    icon: '🛡️',
    title: 'Defending Guides',
    color: '#3498db',
    guides: [],
    placeholder: 'Defensive organisation, marking and dealing with overloads will appear here.',
  },
  {
    id: 'physical',
    icon: '💪',
    title: 'Physical Development',
    color: '#2ecc71',
    guides: [],
    placeholder: 'Age-appropriate physical development and conditioning guides will appear here.',
  },
  {
    id: 'goalkeeper',
    icon: '🧤',
    title: 'Goalkeeper Guides',
    color: '#9b59b6',
    guides: [],
    placeholder: 'Shot-stopping, distribution and positioning guides for Academy keepers.',
  },
  {
    id: 'parents',
    icon: '👪',
    title: 'Parent & Player Resources',
    color: '#1abc9c',
    guides: [],
    placeholder: 'Guides for parents and players on Academy expectations, nutrition and match day prep.',
  },
]

export default function TrainingGuidesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">ABC FC Academy</p>
          <h1>Training Guides</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Coaching resources and player development guides
          </p>
        </div>
      </div>

      <div className="page">
        {/* Info banner */}
        <div style={{
          background: 'rgba(206,150,45,0.1)', border: '1px solid rgba(206,150,45,0.3)',
          borderRadius: 8, padding: '1.25rem 1.5rem',
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
          marginBottom: '2.5rem',
        }}>
          <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>📋</span>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Guides are being added</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
              Training guides will be published here as they are created. Coaches can also find week-by-week session plans in the{' '}
              <a href="/coaches" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Coaches Portal</a>.
            </p>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid-3">
          {GUIDE_CATEGORIES.map((cat, i) => (
            <div key={cat.id} className={`card animate-fadeup delay-${i + 1}`} style={{ borderTop: `3px solid ${cat.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `${cat.color}20`, border: `2px solid ${cat.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                }}>{cat.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cat.title}</h3>
              </div>

              {cat.guides.length === 0 ? (
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)',
                  borderRadius: 6, padding: '1.25rem', textAlign: 'center',
                }}>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>{cat.placeholder}</p>
                  <div style={{
                    marginTop: '0.75rem', fontSize: '0.7rem', fontWeight: 700,
                    color: cat.color, textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>Coming Soon</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {cat.guides.map(guide => (
                    <a key={guide.id} href={guide.url} style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.6rem 0.75rem', borderRadius: 6,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                      color: 'var(--text)', fontSize: '0.85rem',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.background = `${cat.color}10` }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                    >
                      <span style={{ color: cat.color }}>📄</span>
                      {guide.title}
                      <span style={{ marginLeft: 'auto', color: cat.color, fontSize: '0.75rem' }}>↓</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit guide CTA */}
        <div style={{
          marginTop: '3rem',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '2rem', textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>Want to add a training guide?</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Academy coaches can submit guides for publication. Log in to the Coaches Portal to upload resources.
          </p>
          <a href="/coaches" className="btn">Go to Coaches Portal →</a>
        </div>
      </div>
    </>
  )
}
