import { useState, useRef } from 'react'
import crest from '../assets/crest.svg'

const TOKEN_KEY = 'coaches_token'

function isTokenValid(token) {
  if (!token) return false
  try {
    const [dataB64] = token.split('.')
    const base64 = dataB64.replace(/-/g, '+').replace(/_/g, '/')
    const expiry = parseInt(atob(base64), 10)
    return expiry > Date.now()
  } catch {
    return false
  }
}

const CAT_COLORS = {
  attacking: '#e74c3c',
  defending: '#3498db',
  pressing:  '#2ecc71',
  games:     '#ce962d',
}

const WEEKS_DATA = [
  { week: 1,  theme: 'Attacking / Possession', u710: 'Dribbling',                        u1112: 'Playing Out',                  u1316: 'Playing Out',                  cat: 'attacking' },
  { week: 2,  theme: 'Attacking / Possession', u710: 'Dribbling',                        u1112: 'Playing Between the Lines',    u1316: 'Playing Between the Lines',    cat: 'attacking' },
  { week: 3,  theme: 'Attacking / Possession', u710: 'Passing',                          u1112: 'Switching Play',               u1316: 'Switching Play',               cat: 'attacking' },
  { week: 4,  theme: 'Attacking / Possession', u710: 'Turning & Shielding',              u1112: 'Rotation',                     u1316: 'Midfield Rotation',            cat: 'attacking' },
  { week: 5,  theme: 'Attacking / Possession', u710: 'Tight Area Possession',            u1112: 'Combination in Wide Areas',    u1316: 'Combination in Wide Areas',    cat: 'attacking' },
  { week: 6,  theme: 'Attacking / Possession', u710: 'Receiving',                        u1112: 'Finishing',                    u1316: 'Finishing in the Box',         cat: 'attacking' },
  { week: 7,  theme: 'Defending',              u710: '1v1 / 2v2 / 3v3 Games',           u1112: 'Defending the Box',            u1316: 'Defending the Box',            cat: 'defending' },
  { week: 8,  theme: 'Defending',              u710: 'Attacking Equal Number',           u1112: 'Defending in Wide Areas',      u1316: 'Defending in Wide Areas',      cat: 'defending' },
  { week: 9,  theme: 'Defending',              u710: 'Attacking Overload',               u1112: 'Defending in Central Areas',   u1316: 'Defending in Central Areas',   cat: 'defending' },
  { week: 10, theme: 'Pressing & Transitions', u710: 'Striking & Finishing',             u1112: 'Pressing from the Front',      u1316: 'How We Press',                 cat: 'pressing'  },
  { week: 11, theme: 'Pressing & Transitions', u710: 'Striking & Finishing',             u1112: 'Attacking Overload',           u1316: 'Attacking Overload',           cat: 'pressing'  },
  { week: 12, theme: 'Pressing & Transitions', u710: 'Defending Equal Numbers',          u1112: 'Counter Attacks in Final 1/3', u1316: 'Counter Attacks in Final 1/3', cat: 'pressing'  },
  { week: 13, theme: 'Pressing & Transitions', u710: 'Defending Outnumbered',            u1112: 'Defending Against Overloads',  u1316: 'Defending Against Overloads',  cat: 'pressing'  },
  { week: 14, theme: 'Games Week',             u710: 'Games Week',                       u1112: 'Games Week',                   u1316: 'Games Week',                   cat: 'games'     },
]

function ShootingDrillDiagram() {
  return (
    <svg viewBox="0 0 420 310" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '1rem auto 0', borderRadius: 8, background: 'rgba(20,50,30,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <defs>
        <marker id="arrow-white" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.7)" />
        </marker>
        <marker id="arrow-yellow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#ffd54f" />
        </marker>
        <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#4dd0e1" />
        </marker>
        <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#ff8a65" />
        </marker>
      </defs>

      {/* Pitch markings */}
      <rect x="10" y="10" width="400" height="290" rx="4" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Goal */}
      <rect x="165" y="15" width="90" height="22" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <text x="210" y="31" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="bold">GOAL</text>

      {/* GK */}
      <circle cx="210" cy="55" r="13" fill="rgba(255,193,7,0.2)" stroke="#ffc107" strokeWidth="2" />
      <text x="210" y="52" textAnchor="middle" fill="#ffc107" fontSize="9" fontWeight="bold">GK</text>
      <text x="210" y="64" textAnchor="middle" fill="#ffc107" fontSize="8">(Leo)</text>

      {/* === PLAYER 1 path: cone1 → cone2 → goal === */}
      {/* dribble: cone1 to cone2 (solid yellow) */}
      <line x1="80" y1="255" x2="135" y2="185" stroke="#ffd54f" strokeWidth="2" markerEnd="url(#arrow-yellow)" />
      {/* cut + shoot: cone2 to goal area (dashed yellow) */}
      <line x1="140" y1="178" x2="195" y2="80" stroke="#ffd54f" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow-yellow)" />

      {/* === PLAYER X: lays ball for P1 first time shot === */}
      {/* ball pass from X toward P1 run path (solid cyan) */}
      <line x1="205" y1="248" x2="165" y2="165" stroke="#4dd0e1" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

      {/* === PLAYER Y: runs down right then crosses === */}
      {/* Y runs down line */}
      <line x1="350" y1="100" x2="350" y2="220" stroke="#ff8a65" strokeWidth="2" markerEnd="url(#arrow-orange)" />
      {/* Y crosses into box */}
      <line x1="345" y1="222" x2="220" y2="95" stroke="#ff8a65" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow-orange)" />

      {/* === CONES === */}
      {/* Cone 1 */}
      <polygon points="80,270 70,285 90,285" fill="#ffd54f" />
      <text x="80" y="298" textAnchor="middle" fill="#ffd54f" fontSize="11" fontWeight="bold">1</text>

      {/* Cone 2 */}
      <polygon points="140,185 132,198 148,198" fill="#ffd54f" />
      <text x="140" y="210" textAnchor="middle" fill="#ffd54f" fontSize="10">cone 2</text>

      {/* Player X */}
      <circle cx="205" cy="260" r="13" fill="rgba(77,208,225,0.2)" stroke="#4dd0e1" strokeWidth="2" />
      <text x="205" y="264" textAnchor="middle" fill="#4dd0e1" fontSize="12" fontWeight="bold">X</text>

      {/* Player Y */}
      <circle cx="350" cy="88" r="13" fill="rgba(255,138,101,0.2)" stroke="#ff8a65" strokeWidth="2" />
      <text x="350" y="92" textAnchor="middle" fill="#ff8a65" fontSize="12" fontWeight="bold">Y</text>

      {/* Cone Y (bottom right) */}
      <polygon points="350,235 342,248 358,248" fill="#ff8a65" />

      {/* Legend */}
      <rect x="14" y="265" width="200" height="32" rx="4" fill="rgba(0,0,0,0.4)" />
      <line x1="22" y1="276" x2="40" y2="276" stroke="#ffd54f" strokeWidth="2" />
      <text x="44" y="280" fill="#ffd54f" fontSize="9">Player 1 run / shoot</text>
      <line x1="22" y1="289" x2="40" y2="289" stroke="#4dd0e1" strokeWidth="2" />
      <text x="44" y="293" fill="#4dd0e1" fontSize="9">Player X lay-off</text>
      <line x1="120" y1="289" x2="138" y2="289" stroke="#ff8a65" strokeWidth="2" />
      <text x="142" y="293" fill="#ff8a65" fontSize="9">Player Y cross</text>
    </svg>
  )
}

function DefendingWideDiagram() {
  return (
    <svg viewBox="0 0 380 400" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '1rem auto 0', borderRadius: 8, background: 'rgba(20,50,30,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <defs>
        <marker id="arr-w" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="rgba(255,255,255,0.6)" />
        </marker>
        <marker id="arr-att" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="#ce962d" />
        </marker>
      </defs>

      {/* Main pitch outline */}
      <rect x="15" y="15" width="350" height="370" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Left wide channel */}
      <rect x="15" y="15" width="65" height="370" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Right wide channel */}
      <rect x="300" y="15" width="65" height="370" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Halfway line */}
      <line x1="15" y1="210" x2="365" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5,4" />

      {/* Small goal top centre */}
      <rect x="163" y="15" width="54" height="16" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <text x="190" y="26" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="bold">SMALL GOAL</text>

      {/* Big goal bottom label */}
      <rect x="138" y="372" width="104" height="14" rx="2" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
      <text x="190" y="382" textAnchor="middle" fill="#10b981" fontSize="8">BIG GOAL (if defenders win ball)</text>

      {/* === TOP HALF — Defenders === */}
      {/* Def Balance (left) */}
      <circle cx="95"  cy="100" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="95"  y="104" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">DEF</text>
      <text x="95"  y="122" textAnchor="middle" fill="#3b82f6" fontSize="8">Balance</text>

      {/* Def Cover (centre) */}
      <circle cx="190" cy="100" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="190" y="104" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">DEF</text>
      <text x="190" y="122" textAnchor="middle" fill="#3b82f6" fontSize="8">Cover</text>

      {/* Def Press (right) */}
      <circle cx="285" cy="100" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="285" y="104" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">DEF</text>
      <text x="285" y="122" textAnchor="middle" fill="#3b82f6" fontSize="8">Press</text>

      {/* Cone in right channel */}
      <polygon points="335,75 328,90 342,90" fill="#ffd54f" />
      <text x="335" y="103" textAnchor="middle" fill="#ffd54f" fontSize="8">Cone</text>

      {/* Arrow — attacker runs to cone then crosses */}
      <path d="M335,255 Q355,170 335,92" fill="none" stroke="#ce962d" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr-att)" />

      {/* === BOTTOM HALF — Attackers === */}
      {/* Attack far left */}
      <circle cx="47"  cy="270" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="47"  y="274" textAnchor="middle" fill="#ce962d" fontSize="10" fontWeight="bold">ATT</text>

      {/* Def left-centre */}
      <circle cx="125" cy="270" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="125" y="274" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">DEF</text>

      {/* Attack centre */}
      <circle cx="190" cy="260" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="190" y="264" textAnchor="middle" fill="#ce962d" fontSize="10" fontWeight="bold">ATT</text>

      {/* Def right-centre */}
      <circle cx="255" cy="270" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="255" y="274" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">DEF</text>

      {/* Attack right channel (wide attacker who will cross) */}
      <circle cx="335" cy="255" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="335" y="259" textAnchor="middle" fill="#ce962d" fontSize="10" fontWeight="bold">ATT</text>

      {/* Attack bottom-left */}
      <circle cx="125" cy="340" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="125" y="344" textAnchor="middle" fill="#ce962d" fontSize="10" fontWeight="bold">ATT</text>

      {/* Attack bottom-right */}
      <circle cx="255" cy="340" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="255" y="344" textAnchor="middle" fill="#ce962d" fontSize="10" fontWeight="bold">ATT</text>

      {/* Channel labels */}
      <text x="47" y="35" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8">WIDE</text>
      <text x="335" y="35" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8">WIDE</text>

      {/* Legend */}
      <rect x="18" y="18" width="84" height="34" rx="3" fill="rgba(0,0,0,0.5)" />
      <circle cx="28" cy="28" r="5" fill="rgba(206,150,45,0.3)" stroke="#ce962d" strokeWidth="1.5" />
      <text x="36" y="32" fill="#ce962d" fontSize="8">Attacker</text>
      <circle cx="28" cy="44" r="5" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="36" y="48" fill="#3b82f6" fontSize="8">Defender</text>
    </svg>
  )
}

function DefendingCentralDiagram() {
  return (
    <svg viewBox="0 0 300 340" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '1rem auto 0', borderRadius: 8, background: 'rgba(20,50,30,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Pitch outline */}
      <rect x="20" y="10" width="260" height="320" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Goal */}
      <rect x="110" y="14" width="80" height="20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <text x="150" y="29" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="bold">GOAL</text>

      {/* 20 yards label */}
      <line x1="20" y1="318" x2="280" y2="318" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="150" y="330" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">20 yards</text>

      {/* Band dividers */}
      <line x1="20" y1="95"  x2="280" y2="95"  stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="20" y1="175" x2="280" y2="175" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="20" y1="250" x2="280" y2="250" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />

      {/* Band labels */}
      <text x="287" y="70"  fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="start">top</text>
      <text x="287" y="140" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="start">mid</text>
      <text x="287" y="218" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="start">low</text>
      <text x="287" y="290" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="start">feed</text>

      {/* TOP BAND — 2 attackers (O) wide */}
      <circle cx="75"  cy="68" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="75"  cy="68" textAnchor="middle" fill="#ce962d" fontSize="13" fontWeight="bold" y="72">O</text>
      <circle cx="225" cy="68" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="225" cy="68" textAnchor="middle" fill="#ce962d" fontSize="13" fontWeight="bold" y="72">O</text>

      {/* MIDDLE BAND — 3 defenders (X) */}
      <circle cx="80"  cy="135" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="80"  textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold" y="139">X</text>
      <circle cx="150" cy="135" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="150" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold" y="139">X</text>
      <circle cx="220" cy="135" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="220" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold" y="139">X</text>

      {/* LOWER BAND — 3 attackers (O) */}
      <circle cx="75"  cy="213" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="75"  textAnchor="middle" fill="#ce962d" fontSize="13" fontWeight="bold" y="217">O</text>
      <circle cx="150" cy="213" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="150" textAnchor="middle" fill="#ce962d" fontSize="13" fontWeight="bold" y="217">O</text>
      <circle cx="225" cy="213" r="14" fill="rgba(206,150,45,0.2)" stroke="#ce962d" strokeWidth="2" />
      <text x="225" textAnchor="middle" fill="#ce962d" fontSize="13" fontWeight="bold" y="217">O</text>

      {/* BOTTOM BAND — 2 feeders (X) */}
      <circle cx="100" cy="280" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="100" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold" y="284">X</text>
      <circle cx="200" cy="280" r="14" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
      <text x="200" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold" y="284">X</text>

      {/* Pass arrow — feeder into lower O */}
      <defs>
        <marker id="arr-gold" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="#ce962d" />
        </marker>
        <marker id="arr-blue" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="#3b82f6" />
        </marker>
      </defs>
      <line x1="150" y1="265" x2="150" y2="228" stroke="#ce962d" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr-gold)" />
      <line x1="150" y1="199" x2="150" y2="150" stroke="#ce962d" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr-gold)" />

      {/* Legend */}
      <rect x="22" y="12" width="70" height="34" rx="3" fill="rgba(0,0,0,0.45)" />
      <circle cx="32" cy="22" r="5" fill="rgba(206,150,45,0.3)" stroke="#ce962d" strokeWidth="1.5" />
      <text x="40" y="26" fill="#ce962d" fontSize="8">Attackers (O)</text>
      <circle cx="32" cy="38" r="5" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="40" y="42" fill="#3b82f6" fontSize="8">Defenders (X)</text>
    </svg>
  )
}

// Session plans keyed by "week-agegroup"
// Each plan has: coach, date, topic, blocks[]
// block types: warmup | drill | game | note
const SESSION_PLANS = {
  '8-u1112': {
    coach: 'Robert',
    date: '10 Mar 2026',
    topic: 'Defending in Wide Areas',
    blocks: [
      {
        type: 'warmup',
        duration: '20 mins',
        title: 'Warm Up',
        details: [
          'Dribbling in a square — players dribble freely inside the area, avoiding each other.',
          'Circle with a ball — players stand in a circle, one ball moving around. Vary the pass (inside foot, outside foot, first time).',
        ],
      },
      {
        type: 'drill',
        duration: '20 mins',
        title: 'Defending Wide Areas — Dealing with the Cross',
        subtitle: 'Body shape · Direct to corner · Stay on feet · Two arm\'s length',
        details: [
          'Set up a pitch with two wide channels and a small goal at the top.',
          'Wide attacker starts at the bottom of the right (or left) channel with the ball.',
          'Defending team: Def Press tracks the wide attacker up the channel, Def Cover shifts across, Def Balance holds the other side.',
          'Wide attacker dribbles to the cone near the byline and attempts to cross.',
          'Defending team must deal with the cross — clear or catch.',
          'If defenders win the ball they break to the big goal at the bottom.',
        ],
        coachingPoints: [
          'Body shape — stay side-on, show the attacker toward the corner flag, not inside.',
          'Direct the attacker away from goal — force them to the byline where the angle is tightest.',
          'Don\'t dive in — stay on your feet, wait for the right moment.',
          'Two arm\'s length away — close enough to pressure, far enough not to be beaten easily.',
        ],
        notes: [
          'Rotate attackers and defenders so everyone experiences both roles.',
          'Progress: add more attackers in the box to increase the challenge for defenders dealing with the cross.',
        ],
        diagram: 'defending-wide',
      },
      {
        type: 'game',
        duration: '15 mins',
        title: 'Small Sided Game (SSG)',
        details: [
          'Free play — encourage players to apply wide defending principles.',
          'Coaching point: track runners into wide areas early, don\'t wait until they receive the ball.',
        ],
      },
    ],
  },
  '8-u1316': {
    coach: 'Robert',
    date: '10 Mar 2026',
    topic: 'Defending in Wide Areas',
    blocks: [
      {
        type: 'warmup',
        duration: '20 mins',
        title: 'Warm Up',
        details: [
          'Dribbling in a square — players dribble freely inside the area, avoiding each other.',
          'Circle with a ball — players stand in a circle, one ball moving around. Vary the pass (inside foot, outside foot, first time).',
        ],
      },
      {
        type: 'drill',
        duration: '20 mins',
        title: 'Defending Wide Areas — Dealing with the Cross',
        subtitle: 'Body shape · Direct to corner · Stay on feet · Two arm\'s length',
        details: [
          'Set up a pitch with two wide channels and a small goal at the top.',
          'Wide attacker starts at the bottom of the right (or left) channel with the ball.',
          'Defending team: Def Press tracks the wide attacker up the channel, Def Cover shifts across, Def Balance holds the other side.',
          'Wide attacker dribbles to the cone near the byline and attempts to cross.',
          'Defending team must deal with the cross — clear or catch.',
          'If defenders win the ball they break to the big goal at the bottom.',
        ],
        coachingPoints: [
          'Body shape — stay side-on, show the attacker toward the corner flag, not inside.',
          'Direct the attacker away from goal — force them to the byline where the angle is tightest.',
          'Don\'t dive in — stay on your feet, wait for the right moment.',
          'Two arm\'s length away — close enough to pressure, far enough not to be beaten easily.',
        ],
        notes: [
          'Rotate attackers and defenders so everyone experiences both roles.',
          'Progress: add more attackers in the box to increase the challenge for defenders dealing with the cross.',
        ],
        diagram: 'defending-wide',
      },
      {
        type: 'game',
        duration: '15 mins',
        title: 'Small Sided Game (SSG)',
        details: [
          'Free play — encourage players to apply wide defending principles.',
          'Coaching point: track runners into wide areas early, don\'t wait until they receive the ball.',
        ],
      },
    ],
  },
  '9-u1112': {
    coach: 'Robert',
    date: '10 Mar 2026',
    topic: 'Defending in Central Areas',
    blocks: [
      {
        type: 'warmup',
        duration: '20 mins',
        title: 'Warm Up',
        details: [
          'Dribbling in a square — players dribble freely inside the area, avoiding each other. Add passing combinations when comfortable.',
          'Circle with a ball — players stand in a circle, one ball moving around. Vary the pass (inside foot, outside foot, first time).',
        ],
      },
      {
        type: 'drill',
        duration: '20 mins',
        title: 'Defending in Central Areas — Compact Shape & Passing Lanes',
        subtitle: 'Defenders stay compact · Protect passing lanes · Body shape',
        details: [
          'Set up a 20-yard wide zone in front of goal with 4 horizontal bands.',
          'Top band: 2 attackers (O) wide, close to goal — target players.',
          'Middle band: 3 defenders (X) — must stay compact and cut passing lanes.',
          'Lower band: 3 attackers (O) — receive the ball and look to combine.',
          'Bottom band: 2 feeders (X) — play the ball into the lower O\'s to start.',
          'Lower O\'s receive, turn and try to play into the top O\'s — who turn and shoot.',
          'Defenders must get in line quickly to block the through pass.',
          'Can be run as an overload to increase the challenge for defenders.',
          'Coaching defenders: body shape (side-on, stay compact), communicate, get in line fast.',
          'Swap roles after each round.',
        ],
        notes: [
          'Key coaching point: defenders should NOT ball-watch — stay aware of runners behind them.',
          'Reward defenders who intercept and transition quickly.',
        ],
        diagram: 'defending-central',
      },
      {
        type: 'game',
        duration: '15 mins',
        title: 'Small Sided Game (SSG)',
        details: [
          'Free play — encourage players to apply defensive shape from the drill.',
          'Coaching point: when out of possession, get compact quickly and protect central areas.',
        ],
      },
    ],
  },
  '9-u1316': {
    coach: 'Robert',
    date: '10 Mar 2026',
    topic: 'Defending in Central Areas',
    blocks: [
      {
        type: 'warmup',
        duration: '20 mins',
        title: 'Warm Up',
        details: [
          'Dribbling in a square — players dribble freely inside the area, avoiding each other. Add passing combinations when comfortable.',
          'Circle with a ball — players stand in a circle, one ball moving around. Vary the pass (inside foot, outside foot, first time).',
        ],
      },
      {
        type: 'drill',
        duration: '20 mins',
        title: 'Defending in Central Areas — Compact Shape & Passing Lanes',
        subtitle: 'Defenders stay compact · Protect passing lanes · Body shape',
        details: [
          'Set up a 20-yard wide zone in front of goal with 4 horizontal bands.',
          'Top band: 2 attackers (O) wide, close to goal — target players.',
          'Middle band: 3 defenders (X) — must stay compact and cut passing lanes.',
          'Lower band: 3 attackers (O) — receive the ball and look to combine.',
          'Bottom band: 2 feeders (X) — play the ball into the lower O\'s to start.',
          'Lower O\'s receive, turn and try to play into the top O\'s — who turn and shoot.',
          'Defenders must get in line quickly to block the through pass.',
          'Can be run as an overload to increase the challenge for defenders.',
          'Coaching defenders: body shape (side-on, stay compact), communicate, get in line fast.',
          'Swap roles after each round.',
        ],
        notes: [
          'Key coaching point: defenders should NOT ball-watch — stay aware of runners behind them.',
          'Reward defenders who intercept and transition quickly.',
        ],
        diagram: 'defending-central',
      },
      {
        type: 'game',
        duration: '15 mins',
        title: 'Small Sided Game (SSG)',
        details: [
          'Free play — encourage players to apply defensive shape from the drill.',
          'Coaching point: when out of possession, get compact quickly and protect central areas.',
        ],
      },
    ],
  },
  '6-u1112': {
    coach: 'Leo',
    date: '10 Feb 2026',
    topic: 'Finishing',
    blocks: [
      {
        type: 'warmup',
        duration: '15 mins',
        title: 'Warm Up — 3v3 Tennis',
        details: [
          'Split players into groups of 3.',
          'Play 3v3 tennis-style game — keep the ball off the ground over a low line/cone net.',
          'Swap teams every 5 minutes — 3 swaps total.',
        ],
      },
      {
        type: 'drill',
        duration: '25 mins',
        title: 'Shooting Drill',
        subtitle: 'Long Shot · First Time Shot · Cross + Shot',
        details: [
          'Set up 3 stations: cone 1 (Player 1), cone X (Player X), cone Y (Player Y) in front of goal.',
          'Player 1 — dribbles to cone 2, cuts in and shoots. Returns to cone 1.',
          'Player X — lays ball in front for Player 1 to run onto and hit a first time shot. Player 1 runs back to cone 1.',
          'Player Y — runs down the line to the cone, then crosses back into the path of Player 1 to finish.',
          'Once a player has shot and played ball in, rotate around 1 station.',
        ],
        notes: [
          'Need footballs at each station — return balls to positions 1, X and Y after each rep.',
          'Keep the pitch clear — rotate immediately after shooting.',
        ],
        diagram: 'shooting-drill',
      },
      {
        type: 'game',
        duration: '20 mins',
        title: 'Small Sided Game (SSG)',
        details: [
          'Free play — let players apply finishing in a game context.',
          'Encourage shots on sight. Reward goals from outside the area.',
        ],
      },
    ],
  },
}

function SessionPlan({ plan, color }) {
  const TYPE_STYLES = {
    warmup: { bg: 'rgba(255,183,77,0.1)',  border: 'rgba(255,183,77,0.3)',  label: 'Warm Up',  labelColor: '#ffb74d' },
    drill:  { bg: 'rgba(231,76,60,0.1)',   border: 'rgba(231,76,60,0.3)',   label: 'Drill',    labelColor: '#e74c3c' },
    game:   { bg: 'rgba(46,204,113,0.1)',  border: 'rgba(46,204,113,0.3)',  label: 'Game',     labelColor: '#2ecc71' },
    note:   { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', label: 'Note',    labelColor: 'var(--muted)' },
  }

  return (
    <div>
      {/* Plan header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {plan.coach && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(255,255,255,0.08)', color: 'var(--muted)', padding: '0.2rem 0.6rem', borderRadius: 4 }}>
              👤 {plan.coach}
            </span>
          )}
          {plan.date && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(255,255,255,0.08)', color: 'var(--muted)', padding: '0.2rem 0.6rem', borderRadius: 4 }}>
              📅 {plan.date}
            </span>
          )}
          <span style={{ fontSize: '0.75rem', fontWeight: 700, background: `${color}20`, color: color, padding: '0.2rem 0.6rem', borderRadius: 4 }}>
            ⚽ {plan.topic}
          </span>
        </div>
      </div>

      {/* Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {plan.blocks.map((block, i) => {
          const s = TYPE_STYLES[block.type] || TYPE_STYLES.note
          return (
            <div key={i} style={{
              background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 8, padding: '1rem 1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                  background: s.border, color: s.labelColor, padding: '0.2rem 0.55rem', borderRadius: 3,
                }}>{s.label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{block.title}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 700, color: s.labelColor }}>⏱ {block.duration}</span>
              </div>
              {block.subtitle && (
                <p style={{ fontSize: '0.8rem', color: s.labelColor, fontWeight: 600, marginBottom: '0.6rem' }}>{block.subtitle}</p>
              )}
              <ul style={{ paddingLeft: '1.1rem', margin: 0 }}>
                {block.details.map((d, j) => (
                  <li key={j} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.7 }}>{d}</li>
                ))}
              </ul>
              {block.diagram === 'shooting-drill' && <ShootingDrillDiagram />}
              {block.diagram === 'defending-central' && <DefendingCentralDiagram />}
              {block.diagram === 'defending-wide' && <DefendingWideDiagram />}
              {block.coachingPoints && block.coachingPoints.length > 0 && (
                <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.9rem', background: 'rgba(59,130,246,0.08)', borderRadius: 6, borderLeft: '3px solid #3b82f6' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6', margin: '0 0 0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Coaching Points</p>
                  {block.coachingPoints.map((cp, j) => (
                    <p key={j} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0.15rem 0' }}>• {cp}</p>
                  ))}
                </div>
              )}
              {block.notes && block.notes.length > 0 && (
                <div style={{
                  marginTop: '0.75rem', padding: '0.6rem 0.9rem',
                  background: 'rgba(0,0,0,0.2)', borderRadius: 6,
                  borderLeft: `3px solid ${s.labelColor}`,
                }}>
                  {block.notes.map((n, j) => (
                    <p key={j} style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>⚠ {n}</p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekPlan({ week }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('u1112')
  const color = CAT_COLORS[week.cat] || 'var(--gold)'

  const AGE_TABS = [
    { key: 'u710',  label: 'U7–10',  topic: week.u710,  format: '5v5/7v7' },
    { key: 'u1112', label: 'U11–12', topic: week.u1112, format: '9v9'     },
    { key: 'u1316', label: 'U13–16', topic: week.u1316, format: '11v11'   },
  ]

  const planKey = `${week.week}-${activeTab}`
  const plan = SESSION_PLANS[planKey] || null
  const hasAnyPlan = AGE_TABS.some(tab => !!SESSION_PLANS[`${week.week}-${tab.key}`])

  const effectiveColor = hasAnyPlan ? color : 'var(--muted)'

  return (
    <div style={{
      border: `1px solid ${open ? effectiveColor : 'var(--border)'}`,
      borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.2s',
      opacity: hasAnyPlan ? 1 : 0.45,
    }}>
      {/* Header row */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        background: open ? `${effectiveColor}10` : 'var(--card)',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.2s',
      }}>
        <span style={{
          minWidth: 36, height: 36, borderRadius: '50%',
          background: `${effectiveColor}20`, border: `2px solid ${effectiveColor}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.78rem', fontWeight: 800, color: effectiveColor,
          flexShrink: 0,
        }}>{week.week}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: hasAnyPlan ? 'var(--text)' : 'var(--muted)' }}>Week {week.week}</div>
          <div style={{ fontSize: '0.78rem', color: effectiveColor, fontWeight: 600 }}>{week.theme}</div>
        </div>
        {/* Show which age groups have plans */}
        <div style={{ display: 'flex', gap: '0.3rem' }} className="hide-mobile">
          {AGE_TABS.map(tab => {
            const hasPlan = !!SESSION_PLANS[`${week.week}-${tab.key}`]
            return (
              <span key={tab.key} style={{
                fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: 3,
                background: hasPlan ? `${color}20` : 'rgba(255,255,255,0.05)',
                color: hasPlan ? color : 'rgba(255,255,255,0.2)',
                border: `1px solid ${hasPlan ? `${color}40` : 'transparent'}`,
              }}>{tab.label}</span>
            )
          })}
        </div>
        <span style={{ color: 'var(--muted)', fontSize: '0.9rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>▼</span>
      </button>

      {open && (
        <div style={{ borderTop: `1px solid ${color}30`, background: 'rgba(255,255,255,0.01)' }}>
          {/* Age group tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
            {AGE_TABS.map(tab => {
              const hasPlan = !!SESSION_PLANS[`${week.week}-${tab.key}`]
              const isActive = activeTab === tab.key
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                  flex: 1, padding: '0.75rem 0.5rem', border: 'none', cursor: 'pointer',
                  fontWeight: 700, fontSize: '0.8rem',
                  background: isActive ? `${color}15` : 'transparent',
                  color: isActive ? color : 'var(--muted)',
                  borderBottom: isActive ? `2px solid ${color}` : '2px solid transparent',
                  transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                }}>
                  <span>{tab.label}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.7 }}>{tab.topic}</span>
                  {hasPlan && <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, marginTop: '0.1rem' }} />}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div style={{ padding: '1.25rem' }}>
            {plan ? (
              <SessionPlan plan={plan} color={color} />
            ) : (
              <div style={{
                padding: '1.5rem', textAlign: 'center',
                background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
                <p style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.9rem' }}>No plan added yet</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                  Contact the Academy Director to add a session plan for{' '}
                  {AGE_TABS.find(t => t.key === activeTab)?.label} — Week {week.week} ({AGE_TABS.find(t => t.key === activeTab)?.topic}).
                </p>
              </div>
            )}

            {/* Session structure bar */}
            <div style={{
              marginTop: '1.25rem',
              background: 'rgba(0,188,212,0.06)', border: '1px solid rgba(0,188,212,0.15)',
              borderRadius: 6, padding: '0.75rem 1rem',
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#00bcd4', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Standard Session Structure</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['0–10 Arrival', '10–20 Ball Mastery', '20–40 Topic Practice', '40–55 Game', '55–60 Debrief'].map(s => (
                  <span key={s} style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 4, background: 'rgba(0,188,212,0.1)', color: '#00bcd4', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const SKILL_GROUPS = [
  {
    label: 'Technical',
    color: '#ce962d',
    skills: ['Dribbling', 'Passing', 'Receiving', 'Shooting & Finishing', 'Ball Mastery', '1v1 Play'],
  },
  {
    label: 'Tactical',
    color: '#e74c3c',
    skills: ['Playing Out from Back', 'Switching Play', 'Pressing', 'Positioning', 'Combination Play', 'Runs in Behind'],
  },
  {
    label: 'Game Qualities',
    color: '#3498db',
    skills: ['Work Rate', 'Communication', 'Leadership', 'Resilience', 'Teamwork', 'Attitude'],
  },
]

const AGE_GROUP_OPTIONS = ['U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16']

function SkillBadge({ label, color, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      background: `${color}20`, border: `1px solid ${color}50`,
      color, fontSize: '0.78rem', fontWeight: 600,
      padding: '0.3rem 0.65rem', borderRadius: 20,
    }}>
      {label}
      {onRemove && (
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color, lineHeight: 1, padding: 0, fontSize: '0.9rem' }}>×</button>
      )}
    </span>
  )
}

function PlayerReportBuilder() {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const [form, setForm] = useState({
    playerName: '', ageGroup: '', team: '', coach: '', date: today,
    strengths: [], focusAreas: [], coachNote: '', gameHighlight: '',
  })
  const [preview, setPreview] = useState(false)
  const cardRef = useRef(null)

  const toggle = (field, skill) => {
    setForm(f => {
      const list = f[field]
      return { ...f, [field]: list.includes(skill) ? list.filter(s => s !== skill) : [...list, skill] }
    })
  }

  const handlePrint = () => {
    const card = cardRef.current
    if (!card) return
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Player Report — ${form.playerName}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a1520; color: #fff; font-family: -apple-system, sans-serif; padding: 2rem; }
        .card { background: #111c2b; border: 2px solid #ce962d; border-radius: 16px; padding: 2rem; max-width: 560px; margin: 0 auto; }
        .gold { color: #ce962d; }
        .muted { color: rgba(255,255,255,0.55); }
        .badge { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.25rem 0.6rem; border-radius: 20px; font-size: 0.78rem; font-weight: 700; margin: 0.2rem; }
        .tick::before { content: '✓ '; }
        .focus::before { content: '→ '; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      </style></head><body>${card.innerHTML}</body></html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
  }

  const isReady = form.playerName && form.ageGroup && form.strengths.length > 0

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

      {/* ── Form ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Build Report Card</h3>

        {/* Player details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input placeholder="Player name *" value={form.playerName}
            onChange={e => setForm(f => ({ ...f, playerName: e.target.value }))}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem', width: '100%' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <select value={form.ageGroup} onChange={e => setForm(f => ({ ...f, ageGroup: e.target.value }))}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: form.ageGroup ? '#fff' : 'var(--muted)', fontSize: '0.88rem' }}>
              <option value="">Age group *</option>
              {AGE_GROUP_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <input placeholder="Team (e.g. Amber)" value={form.team}
              onChange={e => setForm(f => ({ ...f, team: e.target.value }))}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <input placeholder="Your name" value={form.coach}
              onChange={e => setForm(f => ({ ...f, coach: e.target.value }))}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem' }} />
            <input type="text" value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem' }} />
          </div>
        </div>

        {/* Strengths */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
            What they're doing brilliantly (pick up to 3)
          </div>
          {SKILL_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.68rem', color: g.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{g.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {g.skills.map(s => {
                  const active = form.strengths.includes(s)
                  const maxed = form.strengths.length >= 3 && !active
                  return (
                    <button key={s} disabled={maxed} onClick={() => toggle('strengths', s)} style={{
                      background: active ? `${g.color}25` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? g.color : 'rgba(255,255,255,0.12)'}`,
                      color: active ? g.color : 'var(--muted)',
                      fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem',
                      borderRadius: 20, cursor: maxed ? 'not-allowed' : 'pointer', opacity: maxed ? 0.4 : 1,
                    }}>{active ? '✓ ' : ''}{s}</button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Focus areas */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3498db', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
            Keep working on (pick 1–2)
          </div>
          {SKILL_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.68rem', color: g.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{g.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {g.skills.map(s => {
                  const active = form.focusAreas.includes(s)
                  const maxed = form.focusAreas.length >= 2 && !active
                  return (
                    <button key={s} disabled={maxed} onClick={() => toggle('focusAreas', s)} style={{
                      background: active ? `${g.color}25` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? g.color : 'rgba(255,255,255,0.12)'}`,
                      color: active ? g.color : 'var(--muted)',
                      fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem',
                      borderRadius: 20, cursor: maxed ? 'not-allowed' : 'pointer', opacity: maxed ? 0.4 : 1,
                    }}>{active ? '✓ ' : ''}{s}</button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <textarea placeholder="Coach note — a personal message to the player..." value={form.coachNote}
            onChange={e => setForm(f => ({ ...f, coachNote: e.target.value }))}
            rows={3} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem', resize: 'vertical', fontFamily: 'inherit' }} />
          <textarea placeholder="Game highlight — what did they do well in the last match?" value={form.gameHighlight}
            onChange={e => setForm(f => ({ ...f, gameHighlight: e.target.value }))}
            rows={2} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.65rem 0.9rem', color: '#fff', fontSize: '0.88rem', resize: 'vertical', fontFamily: 'inherit' }} />
        </div>

        <button className="btn" disabled={!isReady} onClick={handlePrint}
          style={{ opacity: isReady ? 1 : 0.4, cursor: isReady ? 'pointer' : 'not-allowed' }}>
          🖨️ Print / Save Report Card
        </button>
        {!isReady && <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '-0.75rem' }}>Fill in player name, age group and at least one strength to generate.</p>}
      </div>

      {/* ── Live preview card ── */}
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          Preview
        </div>
        <div ref={cardRef} style={{
          background: 'linear-gradient(145deg, #0d1c2e 0%, #111c2b 100%)',
          border: '2px solid #ce962d', borderRadius: 16, padding: '1.75rem',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Gold corner accent */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80,
            background: 'linear-gradient(225deg, rgba(206,150,45,0.15) 0%, transparent 70%)', borderRadius: '0 16px 0 0' }} />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(206,150,45,0.25)', paddingBottom: '1rem' }}>
            <img src={crest} alt="ABC FC Crest" style={{ height: 44, opacity: 0.9 }} />
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ce962d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>ABC FC Academy</div>
              <div style={{ fontSize: '1rem', fontWeight: 900, lineHeight: 1.1 }}>Player Report Card</div>
            </div>
          </div>

          {/* Player name */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
              {form.playerName || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Player Name</span>}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>
              {[form.ageGroup, form.team].filter(Boolean).join(' · ') || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Age Group</span>}
              {form.date && <span> · {form.date}</span>}
            </div>
          </div>

          {/* Strengths */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              ⭐ What you're doing brilliantly
            </div>
            {form.strengths.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {form.strengths.map(s => (
                  <span key={s} style={{ background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.4)', color: '#2ecc71', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 20 }}>✓ {s}</span>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem' }}>Select strengths from the form…</p>
            )}
          </div>

          {/* Focus areas */}
          {form.focusAreas.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#3498db', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                🎯 Keep working on
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {form.focusAreas.map(s => (
                  <span key={s} style={{ background: 'rgba(52,152,219,0.15)', border: '1px solid rgba(52,152,219,0.4)', color: '#3498db', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 20 }}>→ {s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Coach note */}
          {form.coachNote && (
            <div style={{ marginBottom: '1.25rem', background: 'rgba(206,150,45,0.06)', border: '1px solid rgba(206,150,45,0.2)', borderRadius: 8, padding: '0.85rem 1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ce962d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>Coach's Note</div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{form.coachNote}</p>
            </div>
          )}

          {/* Game highlight */}
          {form.gameHighlight && (
            <div style={{ marginBottom: '1.25rem', background: 'rgba(155,89,182,0.08)', border: '1px solid rgba(155,89,182,0.25)', borderRadius: 8, padding: '0.85rem 1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9b59b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>⚡ Game Highlight</div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{form.gameHighlight}</p>
            </div>
          )}

          {/* Footer */}
          <div style={{ borderTop: '1px solid rgba(206,150,45,0.2)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>
              ABC FC Academy · abcfc.com
            </div>
            {form.coach && <div style={{ fontSize: '0.72rem', color: '#ce962d', fontWeight: 700 }}>{form.coach}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoachesPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(() => isTokenValid(localStorage.getItem(TOKEN_KEY)))
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [portalSection, setPortalSection] = useState('plans')

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/coaches-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Incorrect password. Please contact the Academy Director.')
      } else {
        localStorage.setItem(TOKEN_KEY, data.token)
        setLoggedIn(true)
      }
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setLoggedIn(false)
    setPassword('')
  }

  if (!loggedIn) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(206,150,45,0.08) 0%, transparent 60%)',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(206,150,45,0.1)', border: '2px solid rgba(206,150,45,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', margin: '0 auto 1rem',
            }}>🔒</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Coaches Portal</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>ABC FC Academy · Staff Only</p>
          </div>
          <div className="card">
            {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Coach Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter coach password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required autoFocus
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    style={{
                      position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--muted)', fontSize: '1rem', lineHeight: 1,
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn" disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Checking...' : 'Access Portal'}
              </button>
            </form>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
            Don't have a password? Contact the Academy Director.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-header-eyebrow">ABC FC Academy · Coaches Portal</p>
          <h1>Weekly Training Plans</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Click a week, then select an age group tab to view or add session plans
          </p>
        </div>
      </div>

      <div className="page">
        {/* Welcome bar */}
        <div style={{
          background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.25)',
          borderRadius: 8, padding: '0.9rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <span>✅</span>
          <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#2ecc71' }}>
            Welcome, Coach — ABC FC Academy training plan dashboard.
          </span>
          <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer' }}>
            Log out
          </button>
        </div>

        {/* Section switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.3rem' }}>
          {[
            { key: 'plans', label: '📋 Training Plans' },
            { key: 'reports', label: '📄 Player Reports' },
          ].map(s => (
            <button key={s.key} onClick={() => setPortalSection(s.key)} style={{
              flex: 1, padding: '0.6rem 1rem', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.15s',
              background: portalSection === s.key ? 'var(--gold)' : 'transparent',
              color: portalSection === s.key ? '#000' : 'var(--muted)',
            }}>{s.label}</button>
          ))}
        </div>

        {portalSection === 'reports' && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '2rem' }}>
            <PlayerReportBuilder />
          </div>
        )}

        {portalSection === 'plans' && <>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          {[
            { cat: 'attacking', label: 'Attacking' },
            { cat: 'defending', label: 'Defending' },
            { cat: 'pressing',  label: 'Pressing'  },
            { cat: 'games',     label: 'Games Week' },
          ].map(item => (
            <div key={item.cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: CAT_COLORS[item.cat], display: 'inline-block' }} />
              <span style={{ color: CAT_COLORS[item.cat] }}>{item.label}</span>
            </div>
          ))}
          <span style={{ color: 'var(--muted)', fontSize: '0.72rem', marginLeft: 'auto' }}>
            ● = plan available
          </span>
        </div>

        {/* Week list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {WEEKS_DATA.map(week => <WeekPlan key={week.week} week={week} />)}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '2.5rem', background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '2rem', textAlign: 'center',
        }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Add a Session Plan</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem', fontSize: '0.88rem' }}>
            To add a plan for a specific week and age group, contact the Academy Director or developer.
          </p>
          <a href="#" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
            Contact Academy Director
          </a>
        </div>

        </>}
      </div>
    </>
  )
}
