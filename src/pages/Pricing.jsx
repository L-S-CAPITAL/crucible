import { Link } from 'react-router-dom'
import { Mail, Info } from 'lucide-react'
import { CRUCIBLE_MARGIN_RATE } from '../utils/calculations'
import './Pricing.css'

const MARGIN_PERCENT = (CRUCIBLE_MARGIN_RATE * 100).toFixed(0)

const COST_COMPONENTS = [
  {
    title: 'LME Execution & Margin Finance',
    description: 'Broker commissions, clearing fees, and capital cost of posting hedge margin for 6–9 months.',
    status: 'Pass-through',
  },
  {
    title: 'Wholesaler Priority Allocation',
    description: 'Brisbane supplier warehousing and price-matching (L&H, Middys, MM Kembla).',
    status: 'Pass-through',
  },
  {
    title: 'Platform & Operations',
    description: 'Forecaster, portfolio dashboard, contracts, and supplier orchestration per lock-in.',
    status: 'Pass-through',
  },
  {
    title: `Crucible Margin (${MARGIN_PERCENT}%)`,
    description: `${MARGIN_PERCENT}% on top of operational pass-through costs — not on copper notional.`,
    status: `${MARGIN_PERCENT}% on ops cost`,
  },
]

const FAQ = [
  {
    q: 'How is pricing calculated?',
    a: `Crucible uses cost-plus pricing. We total operational pass-through costs (hedge execution, margin finance, wholesaler, platform), then add a ${MARGIN_PERCENT}% Crucible margin on that amount. Client price = Operational cost × ${(1 + CRUCIBLE_MARGIN_RATE).toFixed(2)}.`,
  },
  {
    q: 'What does a typical lock-in cost?',
    a: `The forecaster defaults to ~4.17% operational pass-through on copper notional, plus ${MARGIN_PERCENT}% margin on those costs — about 5% total client fee. Adjust operational % in the forecaster to match your broker quotes and project volume.`,
  },
  {
    q: 'Is the margin 20% of the copper value?',
    a: `No. The ${MARGIN_PERCENT}% margin applies only to Crucible's operational costs (broker, supply chain, platform). It is not ${MARGIN_PERCENT}% of your project's copper notional.`,
  },
  {
    q: 'Is this financial advice?',
    a: 'No. Crucible provides procurement certainty tooling and scenario modelling. Commodity hedging involves basis risk. Consult your financial and legal advisors before entering derivative positions.',
  },
  {
    q: 'What\'s the minimum project size?',
    a: 'Designed for mid-rise residential and mixed-use developments in Brisbane — typically 20+ dwellings or 3+ metric tonnes of copper content.',
  },
]

export default function Pricing() {
  return (
    <div className="page pricing-page animate-fade-in">
      <div className="page-header pricing-header">
        <p className="eyebrow">Pricing</p>
        <h1 className="page-title">Cost-plus, transparent</h1>
        <p className="page-subtitle">
          Operational costs passed through at cost. Crucible earns a {MARGIN_PERCENT}% margin on top of those costs — not on copper notional.
        </p>
      </div>

      <div className="pricing-formula glass-card">
        <h3>Client lock-in fee</h3>
        <p className="formula-expression">Operational pass-through × {(1 + CRUCIBLE_MARGIN_RATE).toFixed(2)}</p>
        <p className="formula-detail">
          Operational pass-through covers LME hedge execution, margin financing, Brisbane wholesaler allocation, and per-project platform ops.
          Crucible margin is <strong>{MARGIN_PERCENT}% of that operational total</strong>.
        </p>
      </div>

      <div className="pricing-notice glass-card">
        <Info size={22} />
        <div>
          <h3>Example on a $121,500 copper notional</h3>
          <p>
            At 4.17% operational pass-through: <strong>$5,067</strong> ops cost → <strong>$1,013</strong> Crucible margin ({MARGIN_PERCENT}%) → <strong>$6,080</strong> total client fee (~5.0% of notional).
            Model your project in the forecaster to see exact dollar splits.
          </p>
        </div>
      </div>

      <div className="cost-breakdown">
        <h2 className="section-heading">What Goes Into the Price</h2>
        <div className="cost-cards">
          {COST_COMPONENTS.map((item) => (
            <div key={item.title} className="cost-card glass-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="cost-status">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pricing-ctas">
        <Link to="/forecaster" className="pricing-cta primary">
          Model your savings
        </Link>
        <a href="mailto:hello@crucible.dev" className="pricing-cta">
          <Mail size={14} /> Discuss your project
        </a>
      </div>

      <section className="pricing-faq">
        <h2 className="section-heading">FAQ</h2>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details key={item.q} className="faq-item glass-card">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}