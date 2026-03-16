import { useState } from 'react'

const VIDEOS = [
  {
    id: 1,
    title: 'Academy Training Session Highlights',
    description: 'Watch our U13-16s work through combination play in wide areas during a recent session at Victoria Park.',
    youtubeId: null,
    date: 'Mar 2026',
    tag: 'Training',
  },
  {
    id: 2,
    title: 'U11-12 Passing & Movement Drills',
    description: 'Switching play and rotation work from the U11-12 group — great shape and movement from the squad.',
    youtubeId: null,
    date: 'Feb 2026',
    tag: 'Training',
  },
  {
    id: 3,
    title: 'Goalkeeper Training Masterclass',
    description: 'Shot-stopping and distribution drills with our Academy GK coach. Excellent work from all keepers.',
    youtubeId: null,
    date: 'Feb 2026',
    tag: 'Coaching',
  },
]

const ARTICLES = [
  {
    id: 1,
    tag: 'Academy News',
    title: 'New 14-Week Curriculum Launches Across All Age Groups',
    excerpt: 'ABC FC Academy has rolled out a unified 14-week curriculum across U7-10, U11-12 and U13-16 squads, bringing consistency and progression to player development.',
    date: '10 Mar 2026',
    img: 'https://images.unsplash.com/photo-1551958219-acbc595d1e10?w=600&q=80',
    readTime: '3 min read',
  },
  {
    id: 2,
    tag: 'Coaching',
    title: 'Why Ball Mastery Is the Foundation of Our Sessions',
    excerpt: 'Every Academy session begins with 10 minutes of Ball Mastery. Our lead coach explains the thinking behind placing individual technique at the heart of everything we do.',
    date: '4 Mar 2026',
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
    readTime: '4 min read',
  },
  {
    id: 3,
    tag: 'Player Development',
    title: 'Games Week: Putting the Curriculum Into Practice',
    excerpt: 'Week 14 of our curriculum is Games Week — a dedicated opportunity for players to apply everything they have worked on in a match environment without individual coaching interruption.',
    date: '25 Feb 2026',
    img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
    readTime: '5 min read',
  },
  {
    id: 4,
    tag: 'Academy News',
    title: 'Coaches Portal Now Live — Weekly Plans Available',
    excerpt: 'All ABC FC Academy coaches can now access their weekly session plans, training guides and curriculum resources through the new password-protected Coaches Portal.',
    date: '18 Feb 2026',
    img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
    readTime: '2 min read',
  },
]

export default function MediaPage() {
  const [tab, setTab] = useState('articles')

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">ABC FC Academy</p>
          <h1>Media & Articles</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Videos, training insights and Academy news
          </p>
        </div>
      </div>

      <div className="page">
        {/* Tab switcher */}
        <div style={{
          display: 'flex', gap: '0.25rem', marginBottom: '2rem',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '0.3rem', width: 'fit-content',
        }}>
          {[
            { key: 'articles', label: '📰 Articles' },
            { key: 'videos', label: '▶️ Videos' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '0.55rem 1.25rem', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '0.85rem',
              background: tab === t.key ? 'var(--gold)' : 'transparent',
              color: tab === t.key ? '#000' : 'var(--muted)',
              transition: 'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Articles */}
        {tab === 'articles' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {ARTICLES.map((article, i) => (
              <article key={article.id} className={`animate-fadeup delay-${i + 1}`} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={article.img} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = ''}
                  />
                  <span style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    background: 'var(--gold)', color: '#000',
                    fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.08em',
                    textTransform: 'uppercase', padding: '0.25rem 0.6rem', borderRadius: 3,
                  }}>{article.tag}</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.35, marginBottom: '0.5rem' }}>{article.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1rem' }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{article.date} · {article.readTime}</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem' }}>Read →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Videos */}
        {tab === 'videos' && (
          <div>
            <div className="grid-3" style={{ marginBottom: '2rem' }}>
              {VIDEOS.map((video, i) => (
                <div key={video.id} className={`card card-hover animate-fadeup delay-${i + 1}`}>
                  {/* Thumbnail placeholder */}
                  <div style={{
                    aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)', borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem', position: 'relative', overflow: 'hidden',
                  }}>
                    {video.youtubeId ? (
                      <iframe
                        width="100%" height="100%"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: '50%',
                          background: 'rgba(206,150,45,0.15)', border: '2px solid rgba(206,150,45,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 0.5rem', fontSize: '1.4rem',
                        }}>▶</div>
                        <div style={{ fontSize: '0.75rem' }}>Video coming soon</div>
                      </div>
                    )}
                  </div>
                  <span style={{
                    background: 'rgba(206,150,45,0.15)', color: 'var(--gold)',
                    fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem',
                    borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>{video.tag}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.35, margin: '0.5rem 0' }}>{video.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{video.description}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{video.date}</div>
                </div>
              ))}
            </div>

            {/* YouTube embed info box */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '1.5rem', textAlign: 'center',
            }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                Have a YouTube video to add? Share the video URL with the Academy admin to get it featured here.
              </p>
              <a href="#" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                Contact Academy Admin
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
