export const OFFERING_TABS = [
  {
    id: 'procurement',
    label: 'Procurement',
    headline: 'Procurement certainty before the sparkies arrive.',
    narrative: [
      'Electrical fit-out happens six to nine months after feasibility. By then, copper may have doubled — and your Brisbane wholesalers are quoting spot.',
      'Crucible establishes priority procurement agreements with L&H, Middys, and MM Kembla so physical cable draws at the locked rate when subcontractors hit site.',
    ],
    features: [
      { title: 'Wholesaler Lock Accounts', desc: 'Dedicated sub-accounts for sparkies and plumbers with price-matched inventory allocation.' },
      { title: 'Supplier Scorecards', desc: 'Track fill rates, lead times, and locked-price compliance across Brisbane branches.' },
      { title: 'Material Needs Forecasting', desc: 'Translate apartment count and copper kg/unit into tonne-forward hedge volume at kickoff.' },
      { title: 'Three-Way Reconciliation', desc: 'Align PO, wholesaler invoice, and hedge payout with full audit lineage.' },
    ],
  },
  {
    id: 'hedging',
    label: 'Hedging',
    headline: 'Encode copper price decisions at project inception.',
    narrative: [
      'Raw commodity volatility is a field operations problem disguised as a finance problem. When copper surges, fixed-price electrical contracts fracture.',
      'Crucible acquires LME forward contracts matching your fit-out timeline — operational pass-through plus a fixed 20% margin on Crucible costs.',
    ],
    features: [
      { title: 'Spot Lock at Month Zero', desc: 'Lock AUD/tonne at LME spot when the project triggers, not when cables are pulled.' },
      { title: 'Forward Maturity Matching', desc: 'Contract tenor aligned to 6–9 month residential fit-out schedules.' },
      { title: 'Arbitrage Settlement', desc: 'Liquidate hedge at elevated spot and offset wholesaler invoice differentials automatically.' },
      { title: 'Scenario Presets', desc: 'Model conservative, moderate, and worst-case copper multipliers before you commit.' },
    ],
  },
  {
    id: 'subcontractors',
    label: 'Subcontractors',
    headline: 'Keep subcontractors on margin. Keep the site moving.',
    narrative: [
      'When copper doubles, fixed-price sparkies walk. Re-tendering freezes the site for weeks — often costing more than the copper itself.',
      'Crucible guarantees materials at quote prices through governed wholesaler channels, eliminating the renegotiation trigger entirely.',
    ],
    features: [
      { title: 'Scope of Work Clauses', desc: 'Pre-built special conditions mandating locked-supply procurement paths.' },
      { title: 'Subcontractor 360', desc: 'Visibility into draw schedules, quote margins, and dispute risk by trade.' },
      { title: 'Delay Cost Modelling', desc: 'Quantify carrying cost of 2–4 week re-tender cycles in dollars and days.' },
      { title: 'Cashflow Continuity', desc: 'Protect subcontractor margins so creative build programs stay on path.' },
    ],
  },
  {
    id: 'forecaster',
    label: 'Forecaster',
    headline: 'Quantify dollar and time arbitrage before the board meeting.',
    narrative: [
      'Every feasibility review should answer one question: what does unhedged copper cost us if the market moves before fit-out?',
      'The Crucible Forecaster models material surge, lock-in fees, and project carrying costs in a single scenario — exportable to investors and partners.',
    ],
    features: [
      { title: 'Apartment-to-Tonne Model', desc: 'Derive copper volume from dwelling count or direct tonne input.' },
      { title: 'Hedged vs Unhedged Comparison', desc: 'Side-by-side cost stacks with delay carrying and surge variance.' },
      { title: 'CEO Decision Directive', desc: 'Automated lock-in recommendation based on net savings and ROI.' },
      { title: 'Share & Export', desc: 'Encode scenarios in URL params or print a board-ready PDF summary.' },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    headline: 'One view across every locked development.',
    narrative: [
      'Creative developers run multiple Brisbane projects simultaneously — each with its own copper exposure, lock date, and wholesaler path.',
      'The portfolio dashboard aggregates tonnes locked, mark-to-market savings, and market pulse across your entire book.',
    ],
    features: [
      { title: 'Project 360', desc: 'Locked price, current LME, savings-to-date, and supplier per development.' },
      { title: 'Portfolio KPIs', desc: 'Total tonnes hedged, aggregate savings, and average hedge ROI at a glance.' },
      { title: 'Activity Feed', desc: 'Lock confirmations, forward extensions, and market movement events.' },
      { title: 'New Project Intake', desc: 'Draft developments with copper estimates before hedge execution.' },
    ],
  },
]

export const IMPACT_STATS = [
  { value: '$191K', label: 'Net savings on a 60-unit project when copper doubles — vs $6K lock-in fee.' },
  { value: '21 days', label: 'Average subcontractor re-tender cycle avoided on surge scenarios in Brisbane.' },
  { value: '5,457%', label: 'Return on hedge premium in the default forecaster worst-case model.' },
  { value: '< 2 weeks', label: 'From project kickoff to executed LME forward and wholesaler agreement.' },
  { value: '40+', label: 'Brisbane developers modelling copper exposure through Crucible.' },
  { value: '20%', label: 'Fixed Crucible margin on operational pass-through — never on copper notional.' },
]

export const PARTNERS = [
  { name: 'Lawrence & Hanson', abbr: 'LH' },
  { name: 'Middys', abbr: 'M' },
  { name: 'MM Kembla', abbr: 'MM' },
  { name: 'Rexel', abbr: 'RX' },
]

export const EXPLORE_LINKS = [
  { title: 'Run the Forecaster', desc: 'Model hedged vs unhedged scenarios for your next feasibility review.', to: '/forecaster', cta: 'Open Forecaster' },
  { title: 'Physical inventory', desc: 'Live LME warehouse stocks, cancelled warrants, and carry shortfall checks.', to: '/inventory', cta: 'Open Inventory' },
  { title: 'LME forward curve docs', desc: 'Contango, backwardation, carrying charges, and systematic roll standards.', to: '/docs/lme-forward-curve', cta: 'Read Docs' },
  { title: 'Pricing & plans', desc: 'Starter, Professional, Enterprise — plus cost-plus lock-in transparency.', to: '/pricing', cta: 'View Pricing' },
]
