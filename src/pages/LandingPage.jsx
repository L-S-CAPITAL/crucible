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
            <div className="montage-panel">
              <div className="montage-header">
                <span>Forecaster</span>
                <span className="montage-live">LME · Live</span>
              </div>
              <div className="montage-metrics">
                <div>
                  <label>Net Savings</label>
                  <strong>{formatAUD(scenario.netSavings)}</strong>
                </div>
                <div>
                  <label>Days Saved</label>
                  <strong>{scenario.actualDelayDays}</strong>
                </div>
                <div>
                  <label>Hedge ROI</label>
                  <strong>{scenario.roi.toFixed(0)}%</strong>
                </div>
              </div>
              <div className="montage-chart">
                <div className="montage-bar unhedged" style={{ height: '85%' }} />
                <div className="montage-bar hedged" style={{ height: '42%' }} />
              </div>
              <p className="montage-caption">Hedged vs unhedged — 60 units, {multiplier.toFixed(1)}× copper</p>
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