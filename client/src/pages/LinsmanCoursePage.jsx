import { useState, useRef, useEffect } from 'react'
import crest from '../assets/crest.svg'

const MODULES = [
  {
    id: 'role',
    icon: '🚩',
    title: 'Your Role as a Linesman',
    subtitle: 'You\'re more important than you think!',
    color: '#ce962d',
  },
  {
    id: 'offside',
    icon: '⚽',
    title: 'The Offside Rule',
    subtitle: 'Everyone\'s favourite argument starter',
    color: '#3b82f6',
  },
  {
    id: 'signals',
    icon: '🏁',
    title: 'Flag Signals',
    subtitle: 'What to do with that flag',
    color: '#10b981',
  },
  {
    id: 'restarts',
    icon: '🔄',
    title: 'Throw-ins, Corners & Goal Kicks',
    subtitle: 'Who gets the ball?',
    color: '#8b5cf6',
  },
]

const QUESTION_POOL = [
  {
    question: 'A player is in an offside position when the ball is played to them. Are they offside?',
    options: ['Yes, always!', 'Only if they are involved in active play', 'No, never', 'Only on a Tuesday'],
    correct: 1,
    explanation: 'Being in an offside position is not an offence by itself. The player must be actively involved in play — touching the ball, interfering with an opponent, or gaining an advantage.',
  },
  {
    question: 'A player can\'t be offside if they receive the ball directly from which of these?',
    options: ['A regular pass from a teammate', 'A throw-in, corner kick, or goal kick', 'A goalkeeper\'s punt', 'A free kick'],
    correct: 1,
    explanation: 'Players cannot be offside directly from a throw-in, corner kick, or goal kick. These are special restarts where the offside rule does not apply.',
  },
  {
    question: 'The ball goes out over the touchline. A red player touched it last. What do you signal?',
    options: ['Flag up for offside', 'Flag pointing toward the red team\'s goal — blue team throw-in', 'Flag pointing toward the blue team\'s goal — red team throw-in', 'Do nothing, that\'s the referee\'s job'],
    correct: 1,
    explanation: 'The throw-in is awarded to the team that did NOT touch it last. Point your flag in the direction that team is attacking.',
  },
  {
    question: 'How many outfield defenders must be between an attacker and the goal line for them to be onside?',
    options: ['One', 'Two', 'Three', 'Zero — the goalkeeper counts as two!'],
    correct: 0,
    explanation: 'At least ONE outfield defender (or the goalkeeper) must be level with or closer to the goal line. The goalkeeper is always the last defender behind them.',
  },
  {
    question: 'What do you do if you\'re not 100% sure whether a player was offside?',
    options: ['Flag immediately just in case', 'Shout "OFFSIDE!" loudly', 'Keep your flag down and let play continue', 'Ask the nearest parent what they think'],
    correct: 2,
    explanation: 'When in doubt, keep your flag down. Only flag when you are certain — a wrongly disallowed goal causes far more disruption than letting a borderline call go.',
  },
  {
    question: 'Before the match, what should you always do?',
    options: ['Warm up with some jogging', 'Ask the referee what they want from you', 'Study the offside rule one more time', 'Pick the side closest to the car park'],
    correct: 1,
    explanation: 'Always speak to the referee before kick-off. Some refs want the full assistant referee duties; others just want throw-ins. Never assume — always ask.',
  },
  {
    question: 'A defender last touches the ball before it crosses the goal line (no goal). What is awarded?',
    options: ['Corner kick to the attacking team', 'Goal kick to the defending team', 'Throw-in to the nearest player', 'Free kick to the attacking team'],
    correct: 1,
    explanation: 'If a defender (including the goalkeeper) last touches the ball before it crosses the goal line without a goal, the restart is a goal kick for the defending team.',
  },
  {
    question: 'An attacker last touches the ball and it goes behind the goal line (no goal). What is awarded?',
    options: ['Goal kick', 'Free kick', 'Corner kick to the attacking team', 'Throw-in'],
    correct: 2,
    explanation: 'If an attacker last touches the ball before it crosses the goal line without a goal, the restart is a corner kick — awarded to the attacking team.',
  },
  {
    question: 'How do you signal to the referee that you\'ve spotted a foul on your side of the pitch they may have missed?',
    options: ['Raise the flag straight up and hold still', 'Wave the flag vigorously to get their attention', 'Blow a whistle', 'Run onto the pitch'],
    correct: 1,
    explanation: 'Wave your flag to attract the referee\'s attention. Once they look at you, stop waving and indicate what happened. Don\'t keep waving once you\'ve been seen.',
  },
  {
    question: 'Can a player be offside from inside their own half?',
    options: ['Yes, if they\'re near the halfway line', 'No — a player cannot be offside in their own half', 'Only if no defenders are behind them', 'Yes, always'],
    correct: 1,
    explanation: 'A player cannot be offside if they are in their own half of the pitch at the moment the ball is played. They must be in the opponent\'s half for offside to apply.',
  },
  {
    question: 'Where should you try to position yourself on the touchline during play?',
    options: ['Stay near the halfway line at all times', 'Level with the last outfield defender', 'Level with the ball at all times', 'Stay in the corner near the goal'],
    correct: 1,
    explanation: 'Keep yourself level with the last outfield defender — this is your offside reference point. Move up and down the touchline to stay level with them throughout the game.',
  },
  {
    question: 'The referee overrules your offside flag and waves play on. What do you do?',
    options: ['Keep the flag raised to show you disagree', 'Argue your case loudly', 'Lower your flag and continue — the referee has the final say', 'Walk off in protest'],
    correct: 2,
    explanation: 'The referee always has the final say. Lower your flag, move on, and keep doing your job. They may have had a better angle or different information.',
  },
  {
    question: 'What does it mean if your flag is pointing horizontally in the direction of play?',
    options: ['Offside', 'Foul', 'Throw-in — indicating which team takes it', 'Goal kick'],
    correct: 2,
    explanation: 'A horizontal flag pointing in the direction of attack signals a throw-in, indicating which team takes it. Point toward the goal the attacking team is heading for.',
  },
  {
    question: 'A player is level with the last outfield defender when the ball is played. Are they offside?',
    options: ['Yes — they must be behind the defender', 'No — level counts as onside', 'Only if they\'re on the left side', 'The referee decides'],
    correct: 1,
    explanation: 'Being level with the last outfield defender is onside. A player only needs to be ahead of the defender to be in an offside position.',
  },
  {
    question: 'Which of these is NOT one of your jobs as a linesman?',
    options: ['Signalling throw-ins', 'Watching for offside', 'Deciding on yellow and red cards', 'Attracting the referee\'s attention for fouls'],
    correct: 2,
    explanation: 'Only the referee can show yellow or red cards. As a linesman you assist — but disciplinary decisions are entirely the referee\'s call.',
  },
]

function pickQuestions() {
  const shuffled = [...QUESTION_POOL].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 5)
}

function drawBadge(canvas, name, score, total) {
  const ctx = canvas.getContext('2d')
  const W = 800, H = 800
  canvas.width = W
  canvas.height = H

  const GOLD = '#ce962d'
  const DARK = '#0d1820'
  const RED = '#c0392b'

  // White background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Watermark
  ctx.save()
  ctx.globalAlpha = 0.07
  ctx.fillStyle = '#000000'
  ctx.font = 'bold 22px Arial'
  ctx.textAlign = 'center'
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-Math.PI / 4)
  for (let row = -6; row <= 6; row++) {
    for (let col = -4; col <= 4; col++) {
      ctx.fillText('ABC FC ACADEMY · LINESMAN CERTIFIED', col * 420 - 200, row * 80)
    }
  }
  ctx.restore()

  // Outer gold border
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 10
  ctx.strokeRect(16, 16, W - 32, H - 32)

  // Inner thin border
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 2
  ctx.strokeRect(30, 30, W - 60, H - 60)

  // Dark header band
  ctx.fillStyle = DARK
  ctx.fillRect(16, 16, W - 32, 140)

  // Club name in header
  ctx.fillStyle = GOLD
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('ABC FC  ·  EST. 1923  ·  VICTORIA PARK, SPRINGFIELD', W / 2, 58)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 42px Arial'
  ctx.fillText('ABC FC ACADEMY', W / 2, 118)

  // LINESMAN title
  ctx.fillStyle = DARK
  ctx.font = 'bold 56px Arial'
  ctx.fillText('LINESMAN', W / 2, 226)
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(200, 242)
  ctx.lineTo(600, 242)
  ctx.stroke()

  // Load ABC FC crest via proxy to avoid CORS tainted canvas
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = '/api/crest'

  const finish = () => {
    // APPROVED stamp
    ctx.save()
    const sx = W / 2 - 160, sy = 562, sw = 320, sh = 82
    ctx.strokeStyle = RED
    ctx.lineWidth = 6
    ctx.strokeRect(sx, sy, sw, sh)
    ctx.lineWidth = 2
    ctx.strokeRect(sx + 6, sy + 6, sw - 12, sh - 12)
    ctx.fillStyle = RED
    ctx.globalAlpha = 0.85
    ctx.font = 'bold 54px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('APPROVED', W / 2, 624)
    ctx.restore()

    // Name
    ctx.fillStyle = '#1a1a1a'
    let nameFontSize = 44
    ctx.font = `bold ${nameFontSize}px Arial`
    while (ctx.measureText(name).width > 660 && nameFontSize > 24) {
      nameFontSize -= 2
      ctx.font = `bold ${nameFontSize}px Arial`
    }
    ctx.fillText(name, W / 2, 690)

    // Date
    ctx.fillStyle = '#888888'
    ctx.font = '15px Arial'
    ctx.fillText(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2, 714)

    // Score
    ctx.fillStyle = GOLD
    ctx.font = 'bold 20px Arial'
    ctx.fillText(`Quiz Score: ${score}/${total}`, W / 2, 740)

    // Dark footer band
    ctx.fillStyle = DARK
    ctx.fillRect(16, 752, W - 32, 32)
    ctx.fillStyle = GOLD
    ctx.font = 'bold 13px Arial'
    ctx.fillText('threebridgesacademy.co.uk  ·  OFFICIAL LINESMAN CERTIFICATION', W / 2, 773)
  }

  img.onload = () => {
    ctx.drawImage(img, W / 2 - 130, 260, 260, 260)
    finish()
  }
  img.onerror = () => {
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(W / 2, 390, 120, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = GOLD
    ctx.font = 'bold 18px Arial'
    ctx.fillText('ABC FC', W / 2, 395)
    finish()
  }
}

function WhatsAppBadge({ name, score, total, passing }) {
  const canvasRef = useRef(null)
  const [stampVisible, setStampVisible] = useState(false)

  useEffect(() => {
    // Draw the hidden canvas for download
    setTimeout(() => {
      if (canvasRef.current) drawBadge(canvasRef.current, name, score, total)
    }, 50)
    // Delay stamp slam so badge is visible first
    const t = setTimeout(() => setStampVisible(true), 600)
    return () => clearTimeout(t)
  }, [])

  const download = () => {
    const link = document.createElement('a')
    link.download = `${name.replace(/\s+/g, '-')}-linesman-badge.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  if (!passing) return null

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Keyframe styles */}
      <style>{`
        @keyframes stampSlam {
          0%   { transform: translateY(-120px) scale(1.4); opacity: 0; }
          60%  { transform: translateY(6px) scale(0.97); opacity: 1; }
          80%  { transform: translateY(-4px) scale(1.01); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0%   { left: -60%; }
          100% { left: 160%; }
        }
        .badge-stamp {
          animation: stampSlam 0.55s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .badge-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,215,80,0.35) 50%, transparent 80%);
          animation: shimmer 2s ease-in-out 1.2s infinite;
          pointer-events: none;
        }
      `}</style>

      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>📱</span>
        <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.88rem' }}>Share your badge on WhatsApp! Download below.</span>
      </div>

      {/* Animated on-screen badge */}
      <div className="badge-shimmer" style={{
        position: 'relative', overflow: 'hidden',
        maxWidth: 360, margin: '0 auto 1.25rem',
        border: '6px solid #ce962d',
        borderRadius: 8,
        background: '#ffffff',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {/* Dark header */}
        <div style={{ background: '#0d1820', padding: '0.9rem 1rem 0.7rem', textAlign: 'center' }}>
          <p style={{ color: '#ce962d', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', margin: '0 0 0.2rem' }}>
            ABC FC · EST. 1923 · VICTORIA PARK, SPRINGFIELD
          </p>
          <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 900, margin: 0, letterSpacing: '0.05em' }}>
            ABC FC ACADEMY
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0d1820', margin: '0 0 0.3rem', letterSpacing: '0.08em' }}>LINESMAN</p>
          <div style={{ height: 2, background: '#ce962d', margin: '0 auto 0.9rem', width: '70%' }} />

          {/* TB Crest */}
          <img
            src="/api/crest"
            alt="ABC FC FC Crest"
            style={{ width: 100, height: 100, objectFit: 'contain', display: 'block', margin: '0 auto 0.9rem' }}
          />

          {/* APPROVED stamp */}
          <div className={stampVisible ? 'badge-stamp' : ''} style={{
            opacity: stampVisible ? 1 : 0,
            border: '3px solid #c0392b',
            display: 'inline-block',
            padding: '0.3rem 1.5rem',
            margin: '0 0 0.9rem',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', inset: 3, border: '1.5px solid #c0392b' }} />
            <span style={{ color: '#c0392b', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.1em', opacity: 0.85 }}>APPROVED</span>
          </div>

          <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a', margin: '0 0 0.2rem' }}>{name}</p>
          <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 0.25rem' }}>{today}</p>
          <p style={{ color: '#ce962d', fontWeight: 700, fontSize: '0.8rem', margin: 0 }}>Quiz Score: {score}/{total}</p>
        </div>

        {/* Dark footer */}
        <div style={{ background: '#0d1820', padding: '0.4rem', textAlign: 'center' }}>
          <p style={{ color: '#ce962d', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', margin: 0 }}>
            threebridgesacademy.co.uk · OFFICIAL LINESMAN CERTIFICATION
          </p>
        </div>
      </div>

      {/* Hidden canvas for download */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ textAlign: 'center' }}>
        <button className="btn" onClick={download}>⬇ Download Badge</button>
      </div>
    </div>
  )
}

export default function LinsmanCoursePage() {
  const [openModule, setOpenModule] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [participantName, setParticipantName] = useState('')
  const toggleModule = (id) => setOpenModule(prev => prev === id ? null : id)

  const startQuiz = () => {
    setQuizQuestions(pickQuestions())
    setQuizIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setQuizStarted(true) // kept for state flag only — questions set via startQuiz
  }

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === quizQuestions[quizIndex].correct) setScore(s => s + 1)
  }

  const nextQuestion = () => {
    if (quizIndex + 1 >= quizQuestions.length) {
      setFinished(true)
    } else {
      setQuizIndex(i => i + 1)
      setSelected(null)
    }
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setFinished(false)
    setQuizIndex(0)
    setSelected(null)
    setScore(0)
  }

  const getScoreMessage = () => {
    if (score === quizQuestions.length) return { emoji: '🏆', msg: 'Perfect score! You\'re basically a professional referee now.' }
    if (score >= 3) return { emoji: '👏', msg: 'Great effort! You\'re ready to take that flag onto the touchline.' }
    if (score >= 2) return { emoji: '📚', msg: 'Not bad! Give the modules another read and try again.' }
    return { emoji: '😅', msg: 'Don\'t worry — even referees get it wrong sometimes. Have another go!' }
  }

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">Parent Volunteer Programme</p>
          <h1>Linesman Course</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto', fontSize: '1.05rem' }}>
            Everything you need to confidently run the line — without having a meltdown about offside.
          </p>
        </div>
      </div>

      <div className="page">

        {/* Intro banner */}
        <div className="alert-info fade-up" style={{ marginBottom: '2.5rem', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem', background: 'rgba(206,150,45,0.12)', border: '1px solid rgba(206,150,45,0.3)' }}>
          <strong style={{ color: 'var(--gold)' }}>Welcome, brave volunteer! 🙋</strong>
          <p style={{ margin: '0.4rem 0 0', color: 'var(--muted)' }}>
            You've agreed to be a linesman. Whether that was a brave decision or a moment of weakness, we salute you.
            Work through the four modules below, then test yourself with our quiz. It takes about 10 minutes — less time than arguing about offside at half-time.
          </p>
        </div>

        {/* Skip to quiz CTA */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="fade-up">
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '0.6rem' }}>
            Already know your stuff?
          </p>
          <a
            href="#quiz-section"
            onClick={e => { e.preventDefault(); document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(206,150,45,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Skip to the quiz →
          </a>
        </div>

        {/* What you'll get */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-title fade-up">What You'll Get</h2>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }} className="fade-up delay-1">

            {/* Benefits list */}
            <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📱', title: 'WhatsApp shareable badge', desc: 'A downloadable image to share in the group chat — so everyone knows you\'re the one to ask about offside.' },
                { icon: '🚩', title: 'Confidence on the touchline', desc: 'Know exactly what signals to use, when to flag, and what the referee expects from you.' },
                { icon: '⚽', title: 'Actually understand the offside rule', desc: 'Once and for all. No more guessing. You\'ll be the knowledgeable one in the car park.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                  <div>
                    <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '0.15rem' }}>{item.title}</strong>
                    <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp phone mockup */}
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 220 400" width="200" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}>
                {/* Phone body */}
                <rect x="4" y="4" width="212" height="392" rx="28" fill="#1a1a1a" />
                <rect x="8" y="8" width="204" height="384" rx="25" fill="#111" />
                {/* Screen */}
                <rect x="10" y="30" width="200" height="348" rx="4" fill="#0f0f0f" />
                {/* Notch */}
                <rect x="80" y="10" width="60" height="10" rx="5" fill="#2a2a2a" />

                {/* WhatsApp header */}
                <rect x="10" y="30" width="200" height="52" fill="#075e54" />
                {/* Back arrow */}
                <text x="20" y="62" fill="white" fontSize="16">←</text>
                {/* Avatar circle */}
                <circle cx="55" cy="56" r="16" fill="#25d366" />
                <text x="55" y="61" textAnchor="middle" fill="white" fontSize="13">🏆</text>
                {/* Chat name */}
                <text x="76" y="53" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">ABC FC</text>
                <text x="76" y="66" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Arial">Academy Group</text>
                {/* Menu dots */}
                <text x="192" y="60" fill="rgba(255,255,255,0.7)" fontSize="14">⋮</text>

                {/* Chat background */}
                <rect x="10" y="82" width="200" height="296" fill="#0d1117" />
                {/* Subtle chat wallpaper dots */}
                {[...Array(8)].map((_, i) => (
                  <circle key={i} cx={30 + (i % 4) * 50} cy={100 + Math.floor(i / 4) * 60} r="1.5" fill="rgba(255,255,255,0.04)" />
                ))}

                {/* Incoming message bubble */}
                <rect x="16" y="90" width="140" height="18" rx="6" fill="#1f2c34" />
                <text x="24" y="103" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Arial">Robert D · just now</text>

                {/* Badge image preview — white background with gold border */}
                <rect x="16" y="112" width="140" height="148" rx="4" fill="white" stroke="#ce962d" strokeWidth="2.5" />

                {/* Dark header band */}
                <rect x="16" y="112" width="140" height="28" rx="4" fill="#0d1820" />
                <text x="86" y="121" textAnchor="middle" fill="#ce962d" fontSize="5" fontFamily="Arial" fontWeight="bold">ABC FC · EST. 1923</text>
                <text x="86" y="132" textAnchor="middle" fill="white" fontSize="7" fontFamily="Arial" fontWeight="bold">ABC FC ACADEMY</text>

                {/* LINESMAN heading */}
                <text x="86" y="150" textAnchor="middle" fill="#0d1820" fontSize="10" fontFamily="Arial" fontWeight="bold">LINESMAN</text>
                <line x1="36" y1="154" x2="136" y2="154" stroke="#ce962d" strokeWidth="1" />

                {/* ABC FC Crest image */}
                <image href={crest} x="61" y="156" width="50" height="50" />

                {/* APPROVED stamp */}
                <rect x="30" y="212" width="112" height="24" fill="none" stroke="#c0392b" strokeWidth="2" />
                <rect x="33" y="215" width="106" height="18" fill="none" stroke="#c0392b" strokeWidth="1" />
                <text x="86" y="228" textAnchor="middle" fill="#c0392b" fontSize="11" fontFamily="Arial" fontWeight="bold" opacity="0.85">APPROVED</text>

                {/* Corner flags */}
                <line x1="22" y1="115" x2="22" y2="130" stroke="#555" strokeWidth="1.5" />
                <polygon points="22,116 30,121 22,126" fill="#ce962d" />
                <line x1="150" y1="115" x2="150" y2="130" stroke="#555" strokeWidth="1.5" />
                <polygon points="150,116 142,121 150,126" fill="#ce962d" />

                {/* SAMPLE watermark overlay */}
                <g transform="rotate(-35, 86, 185)">
                  <text x="86" y="195" textAnchor="middle" fill="rgba(180,0,0,0.55)" fontSize="28" fontFamily="Arial" fontWeight="bold" letterSpacing="4">SAMPLE</text>
                </g>

                {/* WhatsApp tick + time */}
                <text x="130" y="266" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Arial">✓✓ 10:24</text>

                {/* Reply bubble from someone else */}
                <rect x="20" y="274" width="120" height="28" rx="8" fill="#1f2c34" />
                <text x="28" y="285" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="Arial">😂 Get in!! Who's next?</text>
                <text x="28" y="297" fill="#25d366" fontSize="6.5" fontFamily="Arial">👍 12  🏆 8</text>

                {/* Message input bar */}
                <rect x="10" y="352" width="200" height="26" fill="#1f2c34" />
                <rect x="14" y="356" width="160" height="18" rx="9" fill="#2a3a42" />
                <text x="24" y="368" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Arial">Message</text>
                <circle cx="196" cy="365" r="10" fill="#25d366" />
                <text x="196" y="369" textAnchor="middle" fill="white" fontSize="10">🎙</text>
              </svg>
            </div>

          </div>
        </div>

        {/* What you'll need */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title fade-up">What You'll Need on the Day</h2>
          <div className="grid-3 fade-up delay-1">
            {[
              { icon: '🚩', label: 'A flag', note: 'Usually provided by the club. Bright colours. Hard to miss.' },
              { icon: '👟', label: 'Comfy shoes', note: 'You\'ll be walking the length of the pitch. A lot.' },
              { icon: '🧠', label: 'This knowledge', note: 'That\'s what this course is for. You\'ve got this.' },
            ].map(item => (
              <div key={item.label} className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '0.25rem' }}>{item.label}</strong>
                <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.9rem' }}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-title fade-up">The Four Modules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MODULES.map((mod, i) => (
              <div key={mod.id} className={`card fade-up delay-${i + 1}`} style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => toggleModule(mod.id)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.25rem 1.5rem', color: 'var(--text)', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: '1.75rem', width: 48, height: 48, borderRadius: '50%',
                    background: mod.color + '22', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                  }}>{mod.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Module {i + 1}: {mod.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{mod.subtitle}</div>
                  </div>
                  <span style={{ color: 'var(--gold)', fontSize: '1.2rem', transition: 'transform 0.2s', transform: openModule === mod.id ? 'rotate(180deg)' : 'none' }}>▾</span>
                </button>

                {openModule === mod.id && (
                  <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                    <ModuleContent id={mod.id} color={mod.color} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div id="quiz-section" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title fade-up">Test Your Knowledge</h2>
          <div className="card fade-up delay-1" style={{ padding: '2rem' }}>
            {!quizStarted && !finished && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🧠</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Ready for the quiz?</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  5 questions. No time limit. No one is watching. You've totally got this.
                </p>
                <input
                  type="text"
                  placeholder="Enter your name for the badge"
                  value={participantName}
                  onChange={e => setParticipantName(e.target.value)}
                  style={{
                    display: 'block', width: '100%', maxWidth: 320, margin: '0 auto 1rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: '0.65rem 1rem',
                    color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.95rem',
                    textAlign: 'center',
                  }}
                />
                <button className="btn" onClick={startQuiz} disabled={!participantName.trim()}>
                  Start Quiz
                </button>
              </div>
            )}

            {quizStarted && !finished && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Question {quizIndex + 1} of {quizQuestions.length}</span>
                  <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 700 }}>Score: {score}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem' }}>{quizQuestions[quizIndex].question}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                  {quizQuestions[quizIndex].options.map((opt, idx) => {
                    let bg = 'rgba(255,255,255,0.04)'
                    let border = '1px solid var(--border)'
                    let color = 'var(--text)'
                    if (selected !== null) {
                      if (idx === quizQuestions[quizIndex].correct) { bg = 'rgba(16,185,129,0.15)'; border = '1px solid #10b981'; color = '#10b981' }
                      else if (idx === selected) { bg = 'rgba(239,68,68,0.15)'; border = '1px solid #ef4444'; color = '#ef4444' }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        style={{
                          background: bg, border, borderRadius: 'var(--radius)',
                          padding: '0.75rem 1rem', color, textAlign: 'left',
                          cursor: selected === null ? 'pointer' : 'default',
                          transition: 'all 0.2s', fontFamily: 'inherit', fontSize: '0.95rem',
                        }}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {selected !== null && (
                  <div style={{ background: 'rgba(206,150,45,0.1)', border: '1px solid rgba(206,150,45,0.25)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--gold)' }}>
                      {selected === quizQuestions[quizIndex].correct ? '✅ Correct!' : '❌ Not quite!'}
                    </strong>
                    <p style={{ margin: '0.3rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>{quizQuestions[quizIndex].explanation}</p>
                  </div>
                )}
                {selected !== null && (
                  <button className="btn" onClick={nextQuestion}>
                    {quizIndex + 1 >= quizQuestions.length ? 'See Results' : 'Next Question →'}
                  </button>
                )}
              </div>
            )}

            {finished && (() => {
              const { emoji, msg } = getScoreMessage()
              return (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{emoji}</div>
                    <h3 style={{ color: 'var(--gold)', marginBottom: '0.25rem' }}>You scored {score} out of {quizQuestions.length}</h3>
                    <p style={{ color: 'var(--muted)', marginBottom: '1.25rem' }}>{msg}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button className="btn-outline" onClick={restartQuiz} style={{ padding: '0.6rem 1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>Try Again</button>
                    </div>
                  </div>

                  {/* WhatsApp shareable badge */}
                  <WhatsAppBadge name={participantName} score={score} total={quizQuestions.length} passing={score >= 3} />
                </div>
              )
            })()}
          </div>
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', paddingBottom: '2rem' }}>
          Questions? Speak to any ABC FC Academy coach on match day. And thank you for volunteering — it genuinely makes a difference. 🙏
        </div>

      </div>
    </>
  )
}

function ModuleContent({ id, color }) {
  if (id === 'role') return (
    <div style={{ paddingTop: '1.25rem' }}>
      <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
        As a linesman (officially called an <strong style={{ color: 'var(--text)' }}>Assistant Referee</strong> — but everyone still says linesman), your job is to help the referee by watching things they can't always see.
      </p>

      <div style={{ background: 'rgba(206,150,45,0.1)', border: '1px solid rgba(206,150,45,0.3)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <strong style={{ color: 'var(--gold)' }}>⚠️ First things first — talk to the referee!</strong>
        <p style={{ color: 'var(--muted)', margin: '0.4rem 0 0' }}>
          Before the game starts, the referee will tell you exactly what they want from you. Every referee is different.
          Some will want you to handle everything — offside, fouls near the touchline, goal kicks, the lot.
          Others might just want you to watch the touchline and signal throw-ins, and leave everything else to them.
          <strong style={{ color: 'var(--text)' }}> Don't assume — always ask the ref what they need before kick-off.</strong>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[
          { title: 'Watch the touchline', desc: 'When the ball goes out of play, you decide which team gets the throw-in. Watch who touched it last.' },
          { title: 'Watch for offside', desc: 'Your main job. Stay level with the last outfield defender and watch whether attackers are ahead of them when the ball is played. The goalkeeper is always the last defender behind them.' },
          { title: 'Signal with your flag', desc: 'Raise it clearly for the referee to see. Don\'t be shy — a small wave does nothing.' },
          { title: 'Stay level with play', desc: 'Move up and down the touchline to stay level with the last outfield defender (the goalkeeper is always the last, so this is the defender in front of them). This is your key reference point.' },
          { title: 'Don\'t argue', desc: 'The referee has the final say. Signal what you see, but if they overrule you, that\'s fine — they may have a better angle.' },
        ].map(item => (
          <div key={item.title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ color, fontWeight: 900, fontSize: '1.1rem', flexShrink: 0 }}>→</span>
            <div>
              <strong style={{ color: 'var(--text)' }}>{item.title}:</strong>{' '}
              <span style={{ color: 'var(--muted)' }}>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (id === 'offside') return (
    <div style={{ paddingTop: '1.25rem' }}>
      <p style={{ color: 'var(--muted)', marginBottom: '1.25rem' }}>
        The offside rule is the one everyone argues about. Here's the simple version — and we promise it's not as scary as it sounds.
      </p>

      <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <strong style={{ color: '#3b82f6' }}>The Basic Rule:</strong>
        <p style={{ color: 'var(--text)', margin: '0.4rem 0 0' }}>
          A player is offside if they are in the opponent's half <em>AND</em> closer to the goal line than both the ball and the last outfield defender when the ball is played to them. Think of it this way — the goalkeeper is always the last defender, so the attacker must have at least one outfield player between them and the goal.
        </p>
      </div>

      {/* Simple pitch diagram */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>Visual example — ball is played from left to right:</p>
        <svg viewBox="0 0 400 120" style={{ width: '100%', maxWidth: 480, background: '#2d5a3d', borderRadius: 8, display: 'block', border: '2px solid rgba(255,255,255,0.15)' }}>
          {/* Pitch markings */}
          <rect x="0" y="0" width="400" height="120" fill="#2d5a3d" />
          <line x1="200" y1="0" x2="200" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <rect x="2" y="2" width="396" height="116" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          {/* Goal areas */}
          <rect x="2" y="35" width="40" height="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <rect x="358" y="35" width="40" height="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {/* Offside line */}
          <line x1="300" y1="0" x2="300" y2="120" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="303" y="12" fill="#ef4444" fontSize="8" fontFamily="sans-serif">offside line</text>
          {/* Defender (second to last) */}
          <circle cx="300" cy="60" r="10" fill="#1e40af" />
          <text x="300" y="64" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif">DEF</text>
          {/* Goalkeeper */}
          <circle cx="385" cy="60" r="10" fill="#1e40af" />
          <text x="385" y="64" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">GK</text>
          {/* Attacker ONSIDE */}
          <circle cx="270" cy="35" r="10" fill="#ce962d" />
          <text x="270" y="39" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">ATT</text>
          <text x="270" y="22" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="sans-serif" fontWeight="bold">✓ ONSIDE</text>
          {/* Attacker OFFSIDE */}
          <circle cx="330" cy="85" r="10" fill="#ce962d" />
          <text x="330" y="89" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">ATT</text>
          <text x="330" y="107" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif" fontWeight="bold">✗ OFFSIDE</text>
          {/* Ball */}
          <circle cx="160" cy="60" r="7" fill="white" />
          <text x="160" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif">ball</text>
          {/* Arrow */}
          <line x1="168" y1="60" x2="240" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="1" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.5)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {[
          { emoji: '✅', text: 'Player is level with the last outfield defender — ONSIDE (the goalkeeper is always behind them)' },
          { emoji: '✅', text: 'Player receives from a throw-in, corner, or goal kick — cannot be offside' },
          { emoji: '✅', text: 'Player is in their own half — cannot be offside' },
          { emoji: '❌', text: 'Player is ahead of the last outfield defender when the ball is played — OFFSIDE' },
          { emoji: '⚠️', text: 'Player in offside position but not involved in play — NOT offside (wait and watch!)' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <span>{item.emoji}</span><span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )

  if (id === 'signals') return (
    <div style={{ paddingTop: '1.25rem' }}>
      <p style={{ color: 'var(--muted)', marginBottom: '1.25rem' }}>
        Your flag is your voice. Here's what to do with it in each situation.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          {
            signal: 'Flag raised straight up',
            when: 'Offside',
            detail: 'Raise the flag vertically above your head. Hold it there until the referee acknowledges you. Then lower and indicate direction.',
            emoji: '🚩',
          },
          {
            signal: 'Flag pointing at 45° downward toward corner',
            when: 'Offside on the far side of the pitch',
            detail: 'Point the flag downward at a 45° angle toward the corner flag on the far side. This tells the referee which side of the pitch the offside occurred.',
            emoji: '↙️',
          },
          {
            signal: 'Flag pointing horizontally — direction of attack',
            when: 'Throw-in — indicating who takes it',
            detail: 'Point the flag horizontally in the direction the team taking the throw-in is attacking. This makes it crystal clear to everyone.',
            emoji: '➡️',
          },
          {
            signal: 'Flag waved vigorously',
            when: 'Foul or incident on your side that the referee missed',
            detail: 'Wave the flag to attract the referee\'s attention. Once they look at you, stop waving and indicate what happened. Don\'t keep waving like you\'re flagging down a taxi.',
            emoji: '🏁',
          },
          {
            signal: 'Flag down, no movement',
            when: 'Everything is fine — play on!',
            detail: 'This is the most common position. Hold the flag loosely in your hand, angled slightly downward. You\'re watching, not signalling.',
            emoji: '🤫',
          },
        ].map(item => (
          <div key={item.when} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{item.emoji}</span>
              <strong style={{ color: color }}>{item.when}</strong>
            </div>
            <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 0.25rem' }}>{item.signal}</p>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.88rem' }}>{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )

  if (id === 'restarts') return (
    <div style={{ paddingTop: '1.25rem' }}>
      <p style={{ color: 'var(--muted)', marginBottom: '1.25rem' }}>
        When the ball goes out of play, you decide what happens next. Here's the quick guide.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          {
            type: '🤾 Throw-in',
            rule: 'Awarded to the team that did NOT touch the ball last before it crossed the touchline.',
            tip: 'Watch closely as the ball approaches. If it\'s close, stay calm and decide — then signal clearly with the flag.',
          },
          {
            type: '🚩 Corner Kick',
            rule: 'Awarded to the attacking team when a defender (including the goalkeeper) last touches the ball before it crosses the goal line.',
            tip: 'If it was last touched by an attacker, it\'s a goal kick. Corner kicks are a reward for the attacking team keeping the pressure on.',
          },
          {
            type: '🥅 Goal Kick',
            rule: 'Awarded to the defending team when an attacker last touches the ball before it crosses the goal line (without a goal being scored).',
            tip: 'This is the goalkeeper\'s territory. You don\'t need to do much — just confirm to the referee it\'s a goal kick with a point toward the goal area.',
          },
          {
            type: '⚽ Goal!',
            rule: 'The whole ball must cross the whole goal line between the posts and under the bar.',
            tip: 'If a goal is scored and you\'re sure there\'s no offside or foul, you can help the referee by pointing to the centre circle. If you spot an issue, raise your flag immediately.',
          },
        ].map(item => (
          <div key={item.type} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem' }}>
            <strong style={{ color: color, display: 'block', marginBottom: '0.35rem', fontSize: '1rem' }}>{item.type}</strong>
            <p style={{ color: 'var(--text)', margin: '0 0 0.4rem', fontSize: '0.9rem' }}>{item.rule}</p>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.85rem' }}>💡 {item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return null
}
