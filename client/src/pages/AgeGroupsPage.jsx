import { useState } from 'react'
import crest from '../assets/crest.svg'

const AGE_GROUPS = [
  {
    id: 'u7-10',
    label: 'U7–10',
    format: '5v5 / 7v7',
    color: '#ce962d',
    coach: 'TBC',
    coachRole: 'Head Coach',
    players: '13 teams',
    sessions: 'Saturdays',
    venue: 'Victoria Park, Springfield',
    description: 'Our youngest age group focuses on individual technical development — dribbling, receiving, passing, and 1v1 play. Sessions are fun, high-touch and built around small-sided games.',
    topics: ['Dribbling', 'Passing', 'Turning & Shielding', 'Tight Area Possession', 'Receiving', '1v1 / 2v2 / 3v3 Games', 'Striking & Finishing', 'Games Week'],
    icon: '⚽',
    ageGroups: [
      { age: 'U7',  teams: ['Amber', 'Black', 'Development'] },
      { age: 'U8',  teams: ['Amber', 'Black'] },
      { age: 'U9',  teams: ['Main', 'Amber', 'Black'] },
      { age: 'U10', teams: ['Main', 'Amber', 'Black', 'Saturday'] },
    ],
  },
  {
    id: 'u11-12',
    label: 'U11–12',
    format: '9v9',
    color: '#e74c3c',
    coach: null,
    coachRole: 'Head Coach',
    players: '6 teams',
    sessions: 'Saturdays',
    venue: 'Victoria Park, Springfield',
    description: 'The 9v9 group begins to introduce tactical concepts alongside technical development. Players learn to play out from the back, switch play, combine in wide areas and organise defensively.',
    topics: ['Playing Out', 'Playing Between the Lines', 'Switching Play', 'Rotation', 'Combination in Wide Areas', 'Finishing', 'Defending the Box', 'Defending Wide & Central', 'Pressing from the Front', 'Attacking Overload', 'Games Week'],
    icon: '🏃',
    ageGroups: [
      { age: 'U11', teams: ['Amber', 'Black'] },
      { age: 'U12', teams: ['Main', 'Amber', 'Black', 'Saturday'] },
    ],
  },
  {
    id: 'u13-16',
    label: 'U13–16',
    format: '11v11',
    color: '#3498db',
    coach: 'TBC',
    coachRole: 'Head Coach',
    players: '9 teams',
    sessions: 'Saturdays',
    venue: 'Victoria Park, Springfield',
    description: 'Full 11v11 football with a strong tactical emphasis. Players develop positional understanding, pressing structures, midfield rotation, counter attacking and finishing in the box.',
    notice: 'From 2026–27, the FA\'s FutureFit changes will move U13 to 9v9. Current U13s are not affected this season.',
    topics: ['Playing Out', 'Playing Between the Lines', 'Switching Play', 'Midfield Rotation', 'Combination in Wide Areas', 'Finishing in the Box', 'Defending the Box', 'Defending Wide & Central', 'How We Press', 'Attacking Overload', 'Counter Attacks', 'Games Week'],
    icon: '🧠',
    ageGroups: [
      { age: 'U13', teams: ['Amber', 'Black'] },
      { age: 'U14', teams: ['Main', 'Amber', 'Amber MSYFL', 'Blacks', 'MSYFL'] },
      { age: 'U15', teams: ['Main', 'Amber', 'MSYFL'] },
      { age: 'U16', teams: ['MSYFL'] },
    ],
  },
  {
    id: 'girls',
    label: 'Girls',
    format: '7v7 / 9v9',
    color: '#9b59b6',
    coach: 'TBC',
    coachRole: 'Head Coach',
    players: '3 teams',
    sessions: 'Saturdays',
    venue: 'Victoria Park, Springfield',
    description: 'ABC FC Girls section competes in the county Women & Girls Football League. We welcome players of all abilities and are committed to growing the girls\' game in Springfield.',
    topics: ['Dribbling', 'Passing', 'Receiving', '1v1 Play', 'Small-Sided Games', 'Combination Play', 'Switching Play', 'Finishing'],
    icon: '⭐',
    ageGroups: [
      { age: 'U10', teams: ['Youth'] },
      { age: 'U11', teams: ['Amber'] },
      { age: 'U12', teams: ['Black'] },
    ],
  },
]

function TeamGrid({ ageGroups, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {ageGroups.map(ag => (
        <div key={ag.age}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
            {ag.age}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {ag.teams.map(team => (
              <span key={team} style={{
                background: `${color}12`,
                border: `1px solid ${color}35`,
                color: color,
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 4,
              }}>
                {ag.age} {team !== 'Main' ? team : ''}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AgeGroupsPage() {
  const [openTeams, setOpenTeams] = useState({})
  const toggle = (id) => setOpenTeams(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">ABC FC Academy</p>
          <h1>Age Groups</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Structured development pathways from U7 through to U16 · Boys &amp; Girls · 31 teams
          </p>
        </div>
      </div>

      <div className="page">
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
                      background: `${group.color}20`, border: `2px solid ${group.color}`,
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

                  {group.notice && (
                    <div style={{ background: 'rgba(255,193,7,0.08)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: 8, padding: '0.65rem 0.9rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ flexShrink: 0 }}>📢</span>
                      <span style={{ fontSize: '0.8rem', color: '#f5c842', lineHeight: 1.5 }}>{group.notice}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { icon: '📍', label: group.venue },
                      { icon: '📅', label: group.sessions },
                      { icon: '👥', label: group.players },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        <span>{item.icon}</span><span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: coach + teams + topics */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* Head coach or no coach warning */}
                  {group.coach === null ? (
                    <div style={{ background: 'rgba(255,100,100,0.08)', border: '1px solid rgba(255,100,100,0.2)', borderRadius: 8, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>⚠️</span>
                      <span style={{ fontSize: '0.82rem', color: '#ff8080', fontWeight: 600 }}>No Head Coach appointed for this group</span>
                    </div>
                  ) : (
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${group.color}25`, border: `2px solid ${group.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>👤</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{group.coach}</div>
                        <div style={{ fontSize: '0.78rem', color: group.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group.coachRole} · {group.label}</div>
                      </div>
                    </div>
                  )}

                  {/* Teams — collapsible */}
                  <div>
                    <button onClick={() => toggle(group.id)} style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0.5rem',
                      borderBottom: `1px solid ${group.color}30`,
                    }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Teams ({group.ageGroups.reduce((n, ag) => n + ag.teams.length, 0)})
                      </span>
                      <span style={{ color: group.color, fontSize: '0.85rem', transition: 'transform 0.2s', display: 'inline-block', transform: openTeams[group.id] ? 'rotate(180deg)' : 'none' }}>▾</span>
                    </button>
                    {openTeams[group.id] && (
                      <div style={{ paddingTop: '0.75rem' }}>
                        <TeamGrid ageGroups={group.ageGroups} color={group.color} />
                      </div>
                    )}
                    {!openTeams[group.id] && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0.4rem 0 0' }}>
                        {group.ageGroups.map(ag => ag.age).join(', ')} · Click to expand
                      </p>
                    )}
                  </div>

                  {/* Curriculum topics */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                      Curriculum Topics
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {group.topics.map(topic => (
                        <span key={topic} style={{
                          background: `${group.color}15`, border: `1px solid ${group.color}30`,
                          color: group.color, fontSize: '0.72rem', fontWeight: 600,
                          padding: '0.25rem 0.6rem', borderRadius: 4,
                        }}>{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FA Full Time links */}
        <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <a
            href="https://fulltime.thefa.com/home/club/734867993.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none' }}
          >
            View all boys teams on FA Full Time →
          </a>
          <a
            href="https://fulltime.thefa.com/home/club/153906691.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none' }}
          >
            View all girls teams on FA Full Time →
          </a>
        </div>

        {/* Sample report card */}
        <div style={{ marginTop: '2rem' }}>
          <p className="page-header-eyebrow" style={{ marginBottom: '0.35rem' }}>Player Development</p>
          <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.4rem' }}>Player Report Cards</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Coaches send personalised report cards each half-term so players and parents know exactly what's going well and what to focus on next.
          </p>
          <div style={{
            background: 'linear-gradient(145deg, #0d1c2e 0%, #111c2b 100%)',
            border: '2px solid #ce962d', borderRadius: 16, padding: '1.75rem',
            maxWidth: 480, position: 'relative', overflow: 'hidden',
          }}>
            {/* SAMPLE watermark */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-30deg)',
              fontSize: '4rem', fontWeight: 900, color: 'rgba(206,150,45,0.07)',
              textTransform: 'uppercase', letterSpacing: '0.2em', pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
            }}>SAMPLE</div>

            {/* Gold corner */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80,
              background: 'linear-gradient(225deg, rgba(206,150,45,0.15) 0%, transparent 70%)', borderRadius: '0 16px 0 0' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(206,150,45,0.25)', paddingBottom: '1rem' }}>
              <img src={crest} alt="ABC FC Crest" style={{ height: 40, opacity: 0.9 }} />
              <div>
                <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#ce962d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>ABC FC Academy</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>Player Report Card</div>
              </div>
            </div>

            {/* Player */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>Alex Johnson</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>U12 · Amber · March 2026</div>
            </div>

            {/* Strengths */}
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.45rem' }}>⭐ What you're doing brilliantly</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {['Dribbling', 'Work Rate', 'Pressing'].map(s => (
                  <span key={s} style={{ background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.4)', color: '#2ecc71', fontSize: '0.78rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: 20 }}>✓ {s}</span>
                ))}
              </div>
            </div>

            {/* Focus */}
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#3498db', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.45rem' }}>🎯 Keep working on</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {['Receiving', 'Switching Play'].map(s => (
                  <span key={s} style={{ background: 'rgba(52,152,219,0.15)', border: '1px solid rgba(52,152,219,0.4)', color: '#3498db', fontSize: '0.78rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: 20 }}>→ {s}</span>
                ))}
              </div>
            </div>

            {/* Coach note */}
            <div style={{ marginBottom: '1.1rem', background: 'rgba(206,150,45,0.06)', border: '1px solid rgba(206,150,45,0.2)', borderRadius: 8, padding: '0.8rem 1rem' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#ce962d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>Coach's Note</div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>Alex has had a brilliant half-term — energy and effort every single session. Keep that work rate going and focus on your receiving touch when the ball comes in quickly.</p>
            </div>

            {/* Game highlight */}
            <div style={{ marginBottom: '1.1rem', background: 'rgba(155,89,182,0.08)', border: '1px solid rgba(155,89,182,0.25)', borderRadius: 8, padding: '0.8rem 1rem' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#9b59b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>⚡ Game Highlight</div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>Brilliant pressing trigger vs Horsham — won the ball back and set up the second goal.</p>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid rgba(206,150,45,0.2)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>ABC FC Academy · abcfc.com</div>
              <div style={{ fontSize: '0.72rem', color: '#ce962d', fontWeight: 700 }}>Coach Roberts</div>
            </div>
          </div>
        </div>

        {/* Join section */}
        <div style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, rgba(206,150,45,0.1) 0%, rgba(206,150,45,0.05) 100%)',
          border: '1px solid rgba(206,150,45,0.25)',
          borderRadius: 10, padding: '2rem', textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>Interested in joining the Academy?</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Get in touch with ABC FC to find out about trials and registration for the upcoming season.
          </p>
          <a href="#" className="btn">
            Contact the Club
          </a>
        </div>
      </div>
    </>
  )
}
