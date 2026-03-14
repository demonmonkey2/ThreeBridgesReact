const AGE_GROUPS = [
  {
    id: 'u7-10',
    label: 'U7–10',
    format: '5v5 / 7v7',
    color: '#ce962d',
    coach: 'TBC',
    coachRole: 'Head Coach',
    players: '16–24 players',
    sessions: 'Saturdays · 9:00am',
    venue: 'Jubilee Field, Crawley',
    description: 'Our youngest age group focuses on individual technical development — dribbling, receiving, passing, and 1v1 play. Sessions are fun, high-touch and built around small-sided games.',
    topics: ['Dribbling', 'Passing', 'Turning & Shielding', 'Tight Area Possession', 'Receiving', '1v1 / 2v2 / 3v3 Games', 'Striking & Finishing', 'Games Week'],
    icon: '⚽',
  },
  {
    id: 'u11-12',
    label: 'U11–12',
    format: '9v9',
    color: '#e74c3c',
    coach: 'TBC',
    coachRole: 'Head Coach',
    players: '18–22 players',
    sessions: 'Saturdays · 10:30am',
    venue: 'Jubilee Field, Crawley',
    description: 'The 9v9 group begins to introduce tactical concepts alongside technical development. Players learn to play out from the back, switch play, combine in wide areas and organise defensively.',
    topics: ['Playing Out', 'Playing Between the Lines', 'Switching Play', 'Rotation', 'Combination in Wide Areas', 'Finishing', 'Defending the Box', 'Defending Wide & Central', 'Pressing from the Front', 'Attacking Overload', 'Games Week'],
    icon: '🏃',
  },
  {
    id: 'u13-16',
    label: 'U13–16',
    format: '11v11',
    color: '#3498db',
    coach: 'TBC',
    coachRole: 'Head Coach',
    players: '20–25 players',
    sessions: 'Saturdays · 12:00pm',
    venue: 'Jubilee Field, Crawley',
    description: 'Full 11v11 football with a strong tactical emphasis. Players develop positional understanding, pressing structures, midfield rotation, counter attacking and finishing in the box.',
    topics: ['Playing Out', 'Playing Between the Lines', 'Switching Play', 'Midfield Rotation', 'Combination in Wide Areas', 'Finishing in the Box', 'Defending the Box', 'Defending Wide & Central', 'How We Press', 'Attacking Overload', 'Counter Attacks', 'Games Week'],
    icon: '🧠',
  },
]

export default function AgeGroupsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">Three Bridges Academy</p>
          <h1>Age Groups</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Structured development pathways from U7 through to U16
          </p>
        </div>
      </div>

      <div className="page">
        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {AGE_GROUPS.map((group, i) => (
            <div key={group.id} className={`animate-fadeup delay-${i + 1}`} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
              borderLeft: `4px solid ${group.color}`,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0 }}>
                {/* Left: group info */}
                <div style={{ padding: '2rem', borderRight: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: `${group.color}20`,
                      border: `2px solid ${group.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem',
                    }}>{group.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: group.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                        {group.format}
                      </div>
                      <h2 style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{group.label}</h2>
                    </div>
                  </div>

                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                    {group.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { icon: '📍', label: group.venue },
                      { icon: '📅', label: group.sessions },
                      { icon: '👥', label: group.players },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: coach + topics */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Coach card */}
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '1.25rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: `${group.color}25`,
                      border: `2px solid ${group.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', flexShrink: 0,
                    }}>👤</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>{group.coach}</div>
                      <div style={{ fontSize: '0.78rem', color: group.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group.coachRole} · {group.label}</div>
                    </div>
                  </div>

                  {/* Curriculum topics */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                      Curriculum Topics
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {group.topics.map(topic => (
                        <span key={topic} style={{
                          background: `${group.color}15`,
                          border: `1px solid ${group.color}30`,
                          color: group.color,
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.25rem 0.6rem',
                          borderRadius: 4,
                        }}>{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join section */}
        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(135deg, rgba(206,150,45,0.1) 0%, rgba(206,150,45,0.05) 100%)',
          border: '1px solid rgba(206,150,45,0.25)',
          borderRadius: 10,
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>Interested in joining the Academy?</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Get in touch with Three Bridges FC to find out about trials and registration for the upcoming season.
          </p>
          <a
            href="https://threebridgesfc.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Contact the Club
          </a>
        </div>
      </div>
    </>
  )
}
