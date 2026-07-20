import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import './DocsLmeForwardCurve.css'

const COPPER_SPREADS = [
  { pair: 'Cash / Tom', normal: '−$5 to +$5', tightness: '< −$10', squeeze: '< −$20', note: 'Daily carry indicator' },
  { pair: 'Tom / 3M', normal: '+$35 to +$80', tightness: '< $0', squeeze: '< −$50', note: 'Primary roll cost metric' },
  { pair: '3M / 15M', normal: '+$60 to +$150', tightness: '< $20', squeeze: '< $0', note: 'Structural trend signal' },
  { pair: '15M / 27M', normal: '+$40 to +$100', tightness: '< $15', squeeze: '< $0', note: 'Long-dated carry signal' },
  { pair: 'Cash / 3M', normal: '+$40 to +$80', tightness: '< −$20', squeeze: '−$1,100 (Oct 2021)', note: 'Most-watched spread' },
]

const CONTRACTS = [
  { metal: 'Copper', code: 'CA', lot: '25 mt', tick: '$0.50/mt ($12.50/lot)' },
  { metal: 'Aluminium', code: 'AH', lot: '25 mt', tick: '$0.50/mt ($12.50/lot)' },
  { metal: 'Zinc', code: 'ZS', lot: '25 mt', tick: '$0.50/mt ($12.50/lot)' },
  { metal: 'Nickel', code: 'NI', lot: '6 mt', tick: '$1.00/mt ($6.00/lot)' },
  { metal: 'Lead', code: 'PB', lot: '25 mt', tick: '$0.50/mt ($12.50/lot)' },
  { metal: 'Tin', code: 'SN', lot: '5 mt', tick: '$5.00/mt ($25.00/lot)' },
]

const THRESHOLDS = [
  { level: 'Cash/3M below +$20/mt', action: 'Elevated backwardation risk — review roll schedule within 5 business days' },
  { level: 'Cash/3M below $0', action: 'Active backwardation — roll cost analysis required before next prompt; no automatic rolls' },
  { level: 'Cash/3M below −$50/mt', action: 'Squeeze-risk environment — escalate before executing any roll' },
]

export default function DocsLmeForwardCurve() {
  return (
    <div className="page docs-page animate-fade-in">
      <div className="page-header docs-header">
        <div>
          <p className="eyebrow">Research reference</p>
          <h1 className="page-title">LME forward curve &amp; calendar spreads</h1>
          <p className="page-subtitle">
            Why curve structure controls hedge performance — contango and backwardation,
            prompt-date mechanics, carrying charges, roll timing, and operational standards
            for hedge books.
          </p>
          <p className="docs-source">
            Adapted from the{' '}
            <a
              href="https://novaex.ai/blog/lme-forward-curve-calendar-spreads-metals-reference/"
              target="_blank"
              rel="noreferrer"
            >
              Novaex metals reference <ExternalLink size={12} />
            </a>
          </p>
        </div>
        <div className="docs-toc glass-card">
          <h3>On this page</h3>
          <a href="#why-curve">Why structure controls performance</a>
          <a href="#contango-back">Contango &amp; backwardation</a>
          <a href="#prompt-dates">Prompt date hedging</a>
          <a href="#spreads">Calendar spread tables</a>
          <a href="#carrying-charge">Carrying charge formula</a>
          <a href="#signals">Tenor &amp; roll signals</a>
          <a href="#operations">Operational standards</a>
        </div>
      </div>

      <article className="docs-article">
        <section id="why-curve">
          <h2>Why the LME forward curve structure controls hedge performance</h2>
          <p>
            The LME forward curve encodes three signals simultaneously: <strong>financing cost</strong>,
            {' '}<strong>physical inventory tightness</strong>, and <strong>rollover exposure</strong>.
            For base metals traders managing hedge positions across copper, aluminium, zinc, and nickel,
            misreading any one layer produces basis leakage that compounds across the book.
          </p>
          <p>
            The cash/3M spread, carrying charge formula, and cross-exchange basis are the three data
            layers that determine whether a hedge performs or leaks.
          </p>
          <p>
            The forward curve acts as a real-time equilibrium between the cost of carrying physical
            metal and the premium buyers will pay for immediate delivery.
          </p>
        </section>

        <section id="contango-back">
          <h2>Contango and backwardation markets</h2>
          <div className="docs-two-col">
            <div className="docs-callout contango">
              <h3>Contango</h3>
              <p>
                Spot prices sit below forward prices. The market compensates holders for
                <strong> storage, financing, and insurance</strong>. In LME terms, contango means
                the three-month price is higher than the cash price — the market is paying you to
                defer delivery.
              </p>
            </div>
            <div className="docs-callout backwardation">
              <h3>Backwardation</h3>
              <p>
                Spot prices exceed forward prices, signaling physical tightness severe enough that
                <strong> nearby delivery commands a premium</strong> over future delivery. Cash is
                higher than 3M — someone needs metal now, or nearby warrants are scarce.
              </p>
            </div>
          </div>
          <p>
            According to LME historical settlement data, the cash-to-3-month spread for copper has
            ranged from approximately −$1,100/tonne (October 2021 squeeze) to +$180/tonne during the
            COVID-driven demand collapse of 2020. That ~$1,280/tonne range is the quantitative case
            against static tenor assumptions in any actively managed book.
          </p>
          <p>
            Tenor selection operates as a direct cost variable before functioning as a risk mechanism.
            A 3-month hedge on copper running in a $70/tonne contango market costs the hedger about
            $70/tonne in roll decay per cycle. Over a 12-month rolling program, that is ~$280/tonne
            in cumulative carry — a real cash outflow that must be priced into physical contracts
            before the hedge is placed.
          </p>
          <h3>Backwardation mechanics for physical traders</h3>
          <p>
            For a physical trader long spot copper, backwardation is a direct P&amp;L benefit: inventory
            commands an immediate-delivery premium. For a short futures hedge against physical length,
            backwardation can create carry income if the short is rolled forward at a premium. The
            inverse applies to a long futures hedge in backwardation: roll losses accumulate until
            the curve normalizes.
          </p>
          <p>
            Sustained cash/3M backwardation beyond −$50/tonne in copper has historically corresponded
            to LME registered warehouse stocks falling below 100,000 tonnes. Below that inventory
            level, squeeze risk accelerates non-linearly. Monitor stocks on the{' '}
            <Link to="/inventory">physical inventory page</Link>.
          </p>
        </section>

        <section id="prompt-dates">
          <h2>Prompt date hedging mechanics</h2>
          <p>
            LME prompt dates define the specific delivery business day for each contract. Daily
            granularity within the 3-month window is the structural feature that distinguishes LME
            hedging precision from COMEX or SHFE equivalents.
          </p>
          <p>
            A physical copper delivery scheduled for a Wednesday 47 days forward can be matched to
            an exact LME prompt date. COMEX copper contracts deliver across a calendar month window,
            creating residual basis exposure that LME’s prompt structure eliminates. For physical
            traders with fixed-date delivery obligations, this determines whether basis risk is
            hedged or merely reduced.
          </p>
          <div className="table-scroll">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Metal</th>
                  <th>Code</th>
                  <th>Lot size</th>
                  <th>Min. price move</th>
                </tr>
              </thead>
              <tbody>
                {CONTRACTS.map((c) => (
                  <tr key={c.code}>
                    <td>{c.metal}</td>
                    <td>{c.code}</td>
                    <td>{c.lot}</td>
                    <td>{c.tick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="docs-note">
            Prompt granularity: daily (1–3M), weekly (3–6M), monthly (7–63M) for ring-traded metals.
          </p>
        </section>

        <section id="spreads">
          <h2>Forward curve calendar spread reference (copper)</h2>
          <p>
            Historical spread ranges at primary tenor break points for rollover timing decisions.
            Track <strong>cash/3M</strong>, <strong>3M/15M</strong>, and <strong>LME–COMEX basis</strong>{' '}
            for copper positions hedged across exchanges.
          </p>
          <div className="table-scroll">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Tenor pair</th>
                  <th>Normal contango</th>
                  <th>Elevated tightness</th>
                  <th>Squeeze threshold</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {COPPER_SPREADS.map((r) => (
                  <tr key={r.pair}>
                    <td>{r.pair}</td>
                    <td>{r.normal}</td>
                    <td>{r.tightness}</td>
                    <td>{r.squeeze}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="carrying-charge">
          <h2>Rollover cost mechanics: the carrying charge formula</h2>
          <p>
            Every rolling hedge program carries a cost that must be computed before tenor selection
            is final. The formula is deterministic:
          </p>
          <div className="docs-formula glass-card">
            <code>C = (R × S × T/360) + (W × T) + (I × S)</code>
            <ul>
              <li><strong>C</strong> — total carry cost per metric tonne</li>
              <li><strong>R</strong> — financing rate (annualized, decimal)</li>
              <li><strong>S</strong> — spot price ($/mt)</li>
              <li><strong>T</strong> — days to roll prompt date</li>
              <li><strong>W</strong> — daily warehousing rate ($/mt/day)</li>
              <li><strong>I</strong> — annual insurance rate (decimal)</li>
            </ul>
          </div>
          <p>
            Typical inputs for a 3-month copper roll: financing at SOFR + 150–250 bps;
            warehousing ~$0.40–$0.55/mt/day; insurance ~0.10–0.15% annually.
          </p>
          <h3>Calendar spreads and rollover costs</h3>
          <p>
            The calendar spread is the market’s real-time pricing of the carrying charge. When the
            quoted spread equals or exceeds theoretical carry, arbitrage pushes toward fair value.
            When the spread falls below theoretical carry (contango compresses), the market is
            discounting storage costs — often because warrant cancellations foreshadow inventory
            drawdown and physical tightness.
          </p>
          <p>
            Example: spot $9,000/mt, all-in financing 7.30%, standard warehousing → theoretical
            3-month carry ≈ $218/mt. If cash/3M quotes only +$60/mt, the spread is ~27% of theoretical
            carry — a precursor backwardation signal that warrants immediate position review.
            Run this check live on the{' '}
            <Link to="/inventory">inventory carrying-charge panel</Link>.
          </p>
        </section>

        <section id="signals">
          <h2>LME forward curve signals for tenor and roll timing</h2>
          <ol className="docs-signals">
            <li>
              <strong>Contango steepness vs financing cost</strong> — When market contango exceeds
              all-in financing, the hedge rolls with positive carry. When contango compresses below
              financing cost, roll cost becomes a direct P&amp;L drag. Watch 3M/15M for early-warning
              steepening or flattening.
            </li>
            <li>
              <strong>Cash/3M direction (5-day moving average)</strong> — A 5-day MA crossing from
              contango into backwardation should trigger a tenor review. Single-day readings can be
              noise; a directional 5-day trend has operational significance.
            </li>
            <li>
              <strong>Warehouse cancelled warrant percentage</strong> — Correlation between cancelled
              warrant % and subsequent cash/3M backwardation in copper exceeds 0.82 historically.
              Cancelled warrants above 40% of registered copper stock signal elevated backwardation
              risk within 2–4 weeks.
            </li>
            <li>
              <strong>COMEX–LME copper basis</strong> — Conversion factor 2,204.62 lbs/mt. A persistent
              COMEX premium after currency and conversion adjustment signals U.S.-specific tightness
              and possible physical flow toward COMEX rather than LME warehouses.
            </li>
            <li>
              <strong>SHFE import arbitrage window</strong> — When the SHFE import arb is closed
              (yuan-equivalent less duty 1.5%, VAT 13%, logistics below LME parity), physical flows
              shift toward LME and tighten nearby spreads within weeks.
            </li>
          </ol>
          <h3>Optimal hedge roll timing</h3>
          <p>
            Optimal rolls need three conditions: liquid spread market for the roll tenor; calendar
            spread for the target date not in backwardation; physical delivery calendar confirming
            the next window. Rolling into backwardation locks in a cash payment that cannot be
            recovered regardless of subsequent price direction.
          </p>
          <p>
            Professionally managed programs execute rolls in the <strong>10-to-5 business day window</strong>{' '}
            before the existing prompt date. Rolling earlier creates simultaneous open exposure across
            two spreads; rolling later creates liquidity risk as market-makers widen expiring dates.
          </p>
        </section>

        <section id="operations">
          <h2>Operational standards for hedge books</h2>
          <p>
            The LME forward curve is the most information-dense pricing signal available to a physical
            metals trader. Threshold-based monitoring replaces reactive roll decisions with systematic ones.
          </p>
          <h3>Copper spread monitoring thresholds</h3>
          <ul className="docs-thresholds">
            {THRESHOLDS.map((t) => (
              <li key={t.level}>
                <strong>{t.level}</strong>
                <span>{t.action}</span>
              </li>
            ))}
          </ul>
          <div className="docs-standards glass-card">
            <h3>Next steps for every hedge book</h3>
            <ol>
              <li>
                <strong>Set spread monitoring thresholds</strong> for each metal using the calendar
                spread tables. Track cash/3M, 3M/15M, and LME–COMEX basis for copper positions
                hedged across exchanges.
              </li>
              <li>
                <strong>Run the carrying charge formula</strong> against current financing rates and
                warehouse costs to identify open positions rolling at a carry shortfall relative to
                the market spread. Positions below 50% of theoretical carry are first to generate
                basis losses as the curve moves toward backwardation.
              </li>
              <li>
                <strong>Align physical delivery calendars to LME prompt dates</strong> wherever the
                physical schedule permits. Accepting COMEX monthly residual basis when LME precision
                is available creates uncompensated risk — a structural inefficiency that generates
                real cash losses on every cycle.
              </li>
            </ol>
          </div>
          <p>
            Document the spread at decision time, the theoretical carry calculation, and the executed
            spread. That audit trail calibrates future tenor selection and supports IFRS 9 hedge
            designation documentation.
          </p>
        </section>

        <section className="docs-cta-block">
          <Link to="/inventory" className="btn-primary">
            Open physical inventory
          </Link>
          <Link to="/forecaster" className="btn-secondary">
            Run forecaster
          </Link>
          <a
            className="btn-secondary"
            href="https://novaex.ai/blog/lme-forward-curve-calendar-spreads-metals-reference/"
            target="_blank"
            rel="noreferrer"
          >
            Full Novaex article
          </a>
        </section>
      </article>
    </div>
  )
}
