import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, AlertTriangle, Package, RefreshCw } from 'lucide-react'
import { generateInventorySnapshot, formatTonnesInt } from '../data/inventory'
import { computeCarryingCharge, carryShortfall } from '../utils/carryingCharge'
import './Inventory.css'

const REFRESH_MS = 4000

export default function Inventory() {
  const [tick, setTick] = useState(0)
  const [live, setLive] = useState(true)
  const [metalFilter, setMetalFilter] = useState('ALL')
  const [financingRate, setFinancingRate] = useState(0.073)
  const [warehouseRate, setWarehouseRate] = useState(0.48)
  const [spot, setSpot] = useState(9000)

  useEffect(() => {
    if (!live) return undefined
    const id = setInterval(() => setTick((t) => t + 1), REFRESH_MS)
    return () => clearInterval(id)
  }, [live])

  const snapshot = useMemo(() => generateInventorySnapshot(tick), [tick])

  const filteredRows = useMemo(() => {
    if (metalFilter === 'ALL') return snapshot.rows
    return snapshot.rows.filter((r) => r.metalCode === metalFilter)
  }, [snapshot.rows, metalFilter])

  const carry = computeCarryingCharge({
    financingRate,
    spotPrice: spot,
    daysToRoll: 90,
    warehouseRate,
    insuranceRate: 0.0012,
  })
  const marketSpread = Math.max(0, snapshot.signals.cash3m)
  const shortfall = carryShortfall({
    theoreticalCarry: carry.total,
    marketSpread: marketSpread || 0.01,
  })

  const copper = snapshot.byMetal.find((m) => m.code === 'CA')

  return (
    <div className="page inventory-page animate-fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Physical inventory</p>
          <h1 className="page-title">LME warehouse stocks</h1>
          <p className="page-subtitle">
            Real-time registered stocks, cancelled warrants, and curve signals that frame
            nearby tightness. Cancelled warrant share above 40% historically correlates with
            elevated cash/3M backwardation risk.
          </p>
        </div>
        <div className="inventory-live-controls">
          <span className={`live-badge ${live ? 'on' : 'off'}`}>
            <span className="live-pulse" />
            {live ? 'Live' : 'Paused'} · tick {tick}
          </span>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setLive((v) => !v)}
          >
            <RefreshCw size={14} />
            {live ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      <div className="inventory-signals">
        <div className="signal-card glass-card">
          <span className="signal-label">Structure</span>
          <strong className={snapshot.signals.structure === 'backwardation' ? 'danger' : 'ok'}>
            {snapshot.signals.structure === 'backwardation' ? 'Backwardation' : 'Contango'}
          </strong>
          <span className="signal-meta">Cash / 3M {snapshot.signals.cash3m.toFixed(1)} $/mt</span>
        </div>
        <div className="signal-card glass-card">
          <span className="signal-label">Tom / 3M</span>
          <strong>{snapshot.signals.tom3m.toFixed(1)} $/mt</strong>
          <span className="signal-meta">Primary roll cost metric</span>
        </div>
        <div className="signal-card glass-card">
          <span className="signal-label">3M / 15M</span>
          <strong>{snapshot.signals.m3m15.toFixed(1)} $/mt</strong>
          <span className="signal-meta">Structural trend signal</span>
        </div>
        <div className="signal-card glass-card">
          <span className="signal-label">LME–COMEX basis</span>
          <strong>{snapshot.signals.lmeComexBasis.toFixed(0)} $/mt</strong>
          <span className="signal-meta">Cross-exchange copper</span>
        </div>
      </div>

      <div className="inventory-metal-grid">
        {snapshot.byMetal.map((m) => (
          <button
            key={m.code}
            type="button"
            className={`metal-tile glass-card ${metalFilter === m.code ? 'active' : ''} tightness-${m.tightness}`}
            onClick={() => setMetalFilter((prev) => (prev === m.code ? 'ALL' : m.code))}
          >
            <div className="metal-tile-top">
              <strong>{m.code}</strong>
              <span className={`tight-pill ${m.tightness}`}>{m.tightness}</span>
            </div>
            <span className="metal-name">{m.name}</span>
            <span className="metal-stock">{formatTonnesInt(m.stock)} t</span>
            <span className={`metal-delta ${m.dayChange >= 0 ? 'up' : 'down'}`}>
              {m.dayChange >= 0 ? '+' : ''}
              {formatTonnesInt(m.dayChange)} d/d · cancel {(m.cancelledPct * 100).toFixed(0)}%
            </span>
          </button>
        ))}
      </div>

      {copper && copper.stock < 100000 && (
        <div className="inventory-alert glass-card">
          <AlertTriangle size={18} />
          <div>
            <strong>Copper warehouse stocks below 100,000 t</strong>
            <p>
              Sustained cash/3M backwardation beyond −$50/t has historically aligned with Cu
              registered stocks under this level. Review roll schedules and prompt-date alignment.
              See{' '}
              <Link to="/docs/lme-forward-curve">LME forward curve docs</Link>.
            </p>
          </div>
        </div>
      )}

      <div className="inventory-layout">
        <section className="inventory-table-wrap glass-card">
          <div className="table-toolbar">
            <h2>
              <Package size={16} /> Warehouse detail
            </h2>
            <span className="as-of">
              As of {new Date(snapshot.asOf).toLocaleTimeString()} · simulated LME feed
            </span>
          </div>
          <div className="table-scroll">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Metal</th>
                  <th>Location</th>
                  <th className="num">Stock (t)</th>
                  <th className="num">On warrant</th>
                  <th className="num">Cancelled</th>
                  <th className="num">Cancel %</th>
                  <th className="num">d/d</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span className="metal-code">{row.metalCode}</span> {row.metal}
                    </td>
                    <td>{row.location}</td>
                    <td className="num">{formatTonnesInt(row.stock)}</td>
                    <td className="num">{formatTonnesInt(row.onWarrant)}</td>
                    <td className="num">{formatTonnesInt(row.cancelled)}</td>
                    <td className="num">
                      <span className={row.cancelledPct > 0.4 ? 'warn' : ''}>
                        {(row.cancelledPct * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className={`num ${row.dayChange >= 0 ? 'up' : 'down'}`}>
                      {row.dayChange >= 0 ? '+' : ''}
                      {formatTonnesInt(row.dayChange)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="inventory-side">
          <div className="glass-card carry-panel">
            <h3>
              <Activity size={16} /> Carrying charge check
            </h3>
            <p className="carry-formula">
              C = (R × S × T/360) + (W × T) + (I × S)
            </p>
            <label>
              Financing rate (R)
              <input
                className="form-input"
                type="number"
                step="0.001"
                min="0"
                value={financingRate}
                onChange={(e) => setFinancingRate(Number(e.target.value))}
              />
            </label>
            <label>
              Spot copper S ($/mt)
              <input
                className="form-input"
                type="number"
                step="50"
                value={spot}
                onChange={(e) => setSpot(Number(e.target.value))}
              />
            </label>
            <label>
              Warehouse W ($/mt/day)
              <input
                className="form-input"
                type="number"
                step="0.01"
                value={warehouseRate}
                onChange={(e) => setWarehouseRate(Number(e.target.value))}
              />
            </label>
            <div className="carry-results">
              <div>
                <span>Theoretical 3M carry</span>
                <strong>${carry.total.toFixed(0)}/mt</strong>
              </div>
              <div>
                <span>Market cash/3M (contango portion)</span>
                <strong>${marketSpread.toFixed(1)}/mt</strong>
              </div>
              <div>
                <span>Carry coverage</span>
                <strong className={shortfall.flag ? 'danger' : 'ok'}>
                  {(shortfall.ratio * 100).toFixed(0)}%
                </strong>
              </div>
            </div>
            {shortfall.flag ? (
              <p className="carry-flag warn">
                Market spread is below 50% of theoretical carry — flag open positions for
                elevated backwardation roll risk.
              </p>
            ) : (
              <p className="carry-flag ok">
                Spread covers a healthy share of theoretical carry at current inputs.
              </p>
            )}
            <Link to="/docs/lme-forward-curve" className="arrow-link">
              Full roll-timing framework
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
