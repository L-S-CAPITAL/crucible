import {
  Briefcase,
  Layers,
  Lock,
  Warehouse,
  Clock,
  Building2,
  AlertTriangle,
} from 'lucide-react'

export default function BlueprintPanel() {
  return (
    <div className="blueprint-grid">
      <div className="blueprint-main glass-card">
        <section>
          <h2 className="section-title">
            <Briefcase size={22} />
            Executive Business Brief: Crucible
          </h2>
          <p className="lead-text">
            In Brisbane&apos;s high-end property market, architectural finishes and design-forward electrical installations represent major cost centers. When a developer triggers a project, they establish their feasibility budget. But electrical fit-out takes place <strong>6 to 9 months later</strong>, exposing the developer to raw metal fluctuations.
          </p>
          <p className="lead-text">
            <strong>Crucible</strong> is a structured hedge facility that bridges financial market hedging with physical supply contracts. It guarantees that the developer locks in today&apos;s copper trading price, ensuring price stability and preventing subcontractor disputes.
          </p>
        </section>

        <section style={{ marginTop: '20px' }}>
          <h3 className="section-title" style={{ fontSize: '1.3rem' }}>
            <Layers size={18} />
            Operational Mechanics (The 3-Step Flow)
          </h3>
          <div className="workflow-steps">
            <div className="step-card">
              <span className="step-num">01</span>
              <div className="step-icon"><Lock size={20} /></div>
              <h3>Secure the Spot</h3>
              <p>At project kickoff, the developer pays the lock-in fee (operational pass-through + 20% Crucible margin). Crucible immediately acquires LME copper futures to hedge the exact physical volume.</p>
            </div>
            <div className="step-card">
              <span className="step-num">02</span>
              <div className="step-icon"><Warehouse size={20} /></div>
              <h3>Brisbane Wholesaler</h3>
              <p>Crucible partners with Brisbane wholesalers (L&H, Middys) to allocate physical inventory, backed by financial derivative positions.</p>
            </div>
            <div className="step-card">
              <span className="step-num">03</span>
              <div className="step-icon"><Clock size={20} /></div>
              <h3>Subcontractor Draw</h3>
              <p>In month 6–9, subcontractors order materials via the Crucible portal at the locked price. Crucible offsets wholesaler invoices with hedge payouts.</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '20px' }}>
          <h3 className="section-title" style={{ fontSize: '1.3rem' }}>
            <Building2 size={18} />
            Strategic Brisbane Supplier Integrations
          </h3>
          <div className="supplier-list">
            <div className="supplier-item">
              <div className="supplier-logo-box">LH</div>
              <div className="supplier-details">
                <h4>Lawrence & Hanson (L&H) South Brisbane</h4>
                <p>Full commercial electrical cabling allocations. Seamless supply chain logistics with custom sub-accounts for sparkies.</p>
                <span className="supplier-tag">Primary Cable Wholesaler</span>
              </div>
            </div>
            <div className="supplier-item">
              <div className="supplier-logo-box">M</div>
              <div className="supplier-details">
                <h4>Middys Fortitude Valley</h4>
                <p>HVAC conduit, heavy-gauge copper refrigeration piping, and switchboard internal busbars locked pricing options.</p>
                <span className="supplier-tag">Piping & Switchboard Specialty</span>
              </div>
            </div>
            <div className="supplier-item">
              <div className="supplier-logo-box">MM</div>
              <div className="supplier-details">
                <h4>MM Kembla (Brisbane Hub)</h4>
                <p>Physical copper tubes and fittings for plumbing systems. Guarantees raw material stockpile for creative architectural plumbing features.</p>
                <span className="supplier-tag">Hydronic & Plumbing Copper</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="blueprint-sidebar glass-card">
        <h2 className="section-title">
          <AlertTriangle size={22} style={{ color: 'var(--copper)' }} />
          The Volatility Risk Matrix
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>
          How commodity volatility cascades into project disasters, and how hedging mitigates the threats.
        </p>

        <div className="risk-matrix">
          <div className="matrix-row header">
            <div>Risk Category</div>
            <div>Unhedged Scenario</div>
            <div>Crucible</div>
          </div>
          <div className="matrix-row">
            <div className="matrix-label"><span>Material Pricing</span></div>
            <div className="matrix-unhedged">Subcontractors pass through raw price hikes. +$100k+ expense.</div>
            <div className="matrix-hedged">Locked price honored. 0% variance on materials.</div>
          </div>
          <div className="matrix-row">
            <div className="matrix-label"><span>Subcontractor Solvency</span></div>
            <div className="matrix-unhedged">Electrical contractors walk off due to negative margins.</div>
            <div className="matrix-hedged">Wholesaler guarantees supplier pricing; subcontractor margins protected.</div>
          </div>
          <div className="matrix-row">
            <div className="matrix-label"><span>Project Delay (Time)</span></div>
            <div className="matrix-unhedged">Re-tendering & contract disputes freeze site for 2–4 weeks.</div>
            <div className="matrix-hedged">Immediate supply chain continuity. No contract disputes.</div>
          </div>
          <div className="matrix-row">
            <div className="matrix-label"><span>Developer Carrying Cost</span></div>
            <div className="matrix-unhedged">Interest charges accrue during delay (AUD $4.5k+ daily).</div>
            <div className="matrix-hedged">Project stays on path, saving weeks of carrying fees.</div>
          </div>
        </div>

        <div className="ceo-guidance-box">
          <strong>CEO Guidance:</strong> Commodity arbitrage isn&apos;t just financial spec trading. In property development, it is <strong>risk transfer architecture</strong>. Keeping physical supplies flowing in Brisbane is the primary goal.
        </div>
      </div>
    </div>
  )
}