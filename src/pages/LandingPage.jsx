import { useState } from 'react'
import { Link } from 'react-router-dom'
import OfferingTabs from '../components/OfferingTabs'
import { IMPACT_STATS, PARTNERS, EXPLORE_LINKS } from '../data/offerings'
import { calculateHedgingScenario } from '../utils/calculations'
import { formatAUD } from '../utils/formatters'
import './LandingPage.css'

const QUOTES = [
  {
    text: 'Crucible saved us three weeks on Lumina Tower when copper spiked. The forecaster paid for itself before we signed the wholesaler agreement.',
    author: 'James Whitfield',
    role: 'CEO, Whitfield Developments',
  },
  {
    text: 'We present the hedge scenario to investors at feasibility. Price certainty on copper is part of our development thesis now.',
    author: 'Sarah Chen',
    role: 'Managing Director, Chen & Partners',
  },
]

export default function LandingPage() {
  const [apartments, setApartments] = useState(60)
  const [multiplier, setMultiplier] = useState(2.0)

  const scenario = calculateHedgingScenario({
    apartments,
    copperSource: 'apartments',
    copperPerApartment: 150,
    futurePriceMultiplier: multiplier,
  })

  return (
    <div className="landing">
      <section className="landing-hero-dark">
        <div className="landing-hero-dark-grid">
          <div className="landing-hero-inner">
            <p className="eyebrow eyebrow--light">Crucible for Construction</p>
            <h1 className="landing-hero-title">
              Crucible brings commodity certainty into the real world.
            </h1>
            <p className="landing-hero-lead">
              Encode copper price decisions at project inception, drive autonomy into procurement and subcontractor alignment, and transform the operating leverage of your Brisbane development business.
            </p>
            <Link to="/forecaster" className="arrow-link arrow-link--light">Get Started</Link>
          </div>

          <div className="landing-montage" aria-hidden="true">
            <div className="gotham-skyline">
              <svg
                className="gotham-skyline-svg"
                viewBox="0 0 640 420"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Black and white Gotham-style city skyline"
              >
                <defs>
                  <linearGradient id="gothamSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a0a0a" />
                    <stop offset="45%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#2e2e2e" />
                  </linearGradient>
                  <linearGradient id="gothamFog" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="55%" stopColor="#c8c8c8" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#f0f0f0" stopOpacity="0.22" />
                  </linearGradient>
                  <linearGradient id="gothamBeam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <pattern id="gothamWindows" width="10" height="14" patternUnits="userSpaceOnUse">
                    <rect x="2" y="3" width="3" height="5" fill="#d8d8d8" opacity="0.35" />
                    <rect x="2" y="10" width="3" height="2" fill="#9a9a9a" opacity="0.2" />
                  </pattern>
                  <linearGradient id="gothamGround" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111" />
                    <stop offset="100%" stopColor="#000" />
                  </linearGradient>
                </defs>

                {/* Sky */}
                <rect width="640" height="420" fill="url(#gothamSky)" />

                {/* Searchlight beams */}
                <polygon points="310,40 250,420 290,420" fill="url(#gothamBeam)" />
                <polygon points="330,40 350,420 400,420" fill="url(#gothamBeam)" opacity="0.7" />

                {/* Distant haze band */}
                <ellipse cx="320" cy="300" rx="380" ry="70" fill="#fff" opacity="0.04" />

                {/* Far skyline silhouettes */}
                <g fill="#151515">
                  <rect x="20" y="230" width="28" height="150" />
                  <rect x="52" y="200" width="36" height="180" />
                  <rect x="94" y="245" width="22" height="135" />
                  <rect x="520" y="220" width="40" height="160" />
                  <rect x="566" y="195" width="30" height="185" />
                  <rect x="600" y="240" width="24" height="140" />
                </g>

                {/* Mid-ground buildings */}
                <g fill="#1c1c1c" stroke="#3a3a3a" strokeWidth="0.6">
                  {/* Left block */}
                  <path d="M40 360 V180 H70 V150 H85 V180 H110 V360 Z" />
                  <rect x="48" y="190" width="54" height="170" fill="url(#gothamWindows)" stroke="none" opacity="0.9" />
                  <path d="M120 360 V165 H155 V130 H168 V165 H200 V360 Z" />
                  <rect x="128" y="175" width="64" height="185" fill="url(#gothamWindows)" stroke="none" />

                  {/* Art-deco tower left-center */}
                  <path d="M210 360 V120 H235 V90 H250 V70 H265 V90 H280 V120 H305 V360 Z" />
                  <rect x="218" y="130" width="79" height="230" fill="url(#gothamWindows)" stroke="none" />
                  <rect x="248" y="55" width="14" height="20" fill="#2a2a2a" stroke="#555" />
                  <rect x="252" y="40" width="6" height="18" fill="#888" />

                  {/* Central Gotham tower */}
                  <path d="M320 360 V100 H345 V60 H360 V35 H375 V60 H390 V100 H415 V360 Z" />
                  <rect x="328" y="108" width="79" height="252" fill="url(#gothamWindows)" stroke="none" />
                  <path d="M355 35 L367 8 L380 35 Z" fill="#cfcfcf" opacity="0.85" />
                  <rect x="363" y="8" width="4" height="22" fill="#eee" />

                  {/* Right mid towers */}
                  <path d="M430 360 V145 H470 V115 H485 V145 H520 V360 Z" />
                  <rect x="438" y="155" width="74" height="205" fill="url(#gothamWindows)" stroke="none" />
                  <path d="M535 360 V170 H580 V140 H595 V170 H620 V360 Z" />
                  <rect x="543" y="180" width="69" height="180" fill="url(#gothamWindows)" stroke="none" />
                </g>

                {/* Foreground dark massing */}
                <g fill="#0d0d0d">
                  <path d="M0 360 L0 300 L80 300 L95 275 L130 275 L145 300 L220 300 L240 285 L300 285 L320 300 L400 300 L420 270 L470 270 L490 300 L560 300 L580 280 L640 280 L640 360 Z" />
                  <rect x="0" y="340" width="640" height="80" fill="url(#gothamGround)" />
                </g>

                {/* Street glow line */}
                <line x1="0" y1="338" x2="640" y2="338" stroke="#fff" strokeOpacity="0.08" strokeWidth="1" />
                <line x1="0" y1="342" x2="640" y2="342" stroke="#fff" strokeOpacity="0.04" strokeWidth="3" />

                {/* Rain streaks */}
                <g stroke="#fff" strokeOpacity="0.12" strokeWidth="0.8">
                  <line x1="40" y1="40" x2="30" y2="90" />
                  <line x1="90" y1="20" x2="78" y2="85" />
                  <line x1="160" y1="50" x2="148" y2="110" />
                  <line x1="230" y1="15" x2="218" y2="80" />
                  <line x1="410" y1="30" x2="398" y2="95" />
                  <line x1="480" y1="55" x2="468" y2="115" />
                  <line x1="550" y1="25" x2="538" y2="90" />
                  <line x1="600" y1="45" x2="588" y2="100" />
                </g>

                {/* Fog overlay */}
                <rect width="640" height="420" fill="url(#gothamFog)" />

                {/* Film grain dots */}
                <g fill="#fff" opacity="0.06">
                  <circle cx="70" cy="80" r="0.8" />
                  <circle cx="140" cy="50" r="0.6" />
                  <circle cx="280" cy="70" r="0.7" />
                  <circle cx="450" cy="45" r="0.8" />
                  <circle cx="520" cy="95" r="0.6" />
                  <circle cx="590" cy="60" r="0.7" />
                </g>
              </svg>
              <div className="gotham-skyline-caption">
                <span>Crucible</span>
                <span>City operations · B&amp;W</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-grid-lines" aria-hidden="true" />
      </section>

      <section className="landing-ontology">
        <div className="landing-ontology-inner">
          <h2 className="section-title-lg">The Copper Lock</h2>
          <div className="ontology-copy">
            <p>
              The Copper Lock integrates procurement, LME hedging, wholesaler fulfilment, and subcontractor execution through a unified layer purpose-built for mid-rise residential development in Brisbane.
            </p>
            <p>
              At its core, Crucible standardizes how projects interact with shared objects — tonnes locked, forward maturity, wholesaler accounts, and subcontractor draw schedules — ensuring consistent definitions and real-time synchronization from feasibility through fit-out.
            </p>
            <p>
              Built from a developer-first perspective, the Copper Lock connects what happens on site in month six to nine with the financial positions established at month zero, in an environment accessible to CEOs, project managers, and quantity surveyors alike.
            </p>
          </div>
          <div className="ontology-diagram" aria-hidden="true">
            <div className="ontology-node">Feasibility</div>
            <div className="ontology-line" />
            <div className="ontology-node accent">LME Lock</div>
            <div className="ontology-line" />
            <div className="ontology-node">Wholesaler</div>
            <div className="ontology-line" />
            <div className="ontology-node">Fit-out</div>
          </div>
        </div>
      </section>

      <OfferingTabs />

      <section className="landing-impact">
        <div className="landing-impact-inner">
          <h2 className="section-title-lg">Crucible drives real impact at scale</h2>
          <p className="landing-impact-sub">We help Brisbane property developers protect margin before the sparkies arrive.</p>
          <ul className="impact-list">
            {IMPACT_STATS.map((stat) => (
              <li key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="landing-partners">
        <div className="landing-partners-inner">
          {PARTNERS.map((p) => (
            <div key={p.name} className="partner-logo">
              <span>{p.abbr}</span>
              <small>{p.name}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-calculator">
        <div className="landing-calculator-inner">
          <h2 className="section-title-lg">Model your project</h2>
          <p className="landing-calculator-sub">Adjust inputs — results update from the same engine as the full forecaster.</p>
          <div className="calc-controls">
            <label>
              Apartments
              <input type="range" min={10} max={200} step={5} value={apartments} onChange={(e) => setApartments(Number(e.target.value))} />
              <span>{apartments}</span>
            </label>
            <label>
              Copper surge multiplier
              <input type="range" min={1} max={2.5} step={0.1} value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
              <span>{multiplier.toFixed(1)}×</span>
            </label>
          </div>
          <div className="calc-output">
            <div><span>Net savings</span><strong>{formatAUD(scenario.netSavings)}</strong></div>
            <div><span>Timeline saved</span><strong>{scenario.actualDelayDays} days</strong></div>
            <div><span>Lock-in fee</span><strong>{formatAUD(scenario.totalLockInFee)}</strong></div>
          </div>
          <Link to="/forecaster" className="arrow-link">See full analysis</Link>
        </div>
      </section>

      <section className="landing-quotes">
        <div className="landing-quotes-inner">
          <h2 className="section-title-lg">What construction leaders are saying</h2>
          <div className="quotes-grid">
            {QUOTES.map((q) => (
              <blockquote key={q.author}>
                <p>&ldquo;{q.text}&rdquo;</p>
                <footer>
                  <strong>{q.author}</strong>
                  <span>{q.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-explore">
        <div className="landing-explore-inner">
          <h2 className="section-title-lg">Continue exploring</h2>
          <div className="explore-grid">
            {EXPLORE_LINKS.map((item) => (
              <Link key={item.to} to={item.to} className="explore-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="explore-cta">↳ {item.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}