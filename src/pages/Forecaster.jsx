import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ShieldCheck,
  TrendingDown,
  Layers,
  Activity,
  Building2,
  FileText,
  Printer,
  Link2,
  ChevronDown,
} from 'lucide-react'
import SliderInput from '../components/SliderInput'
import MetricCard from '../components/MetricCard'
import CostChart from '../components/CostChart'
import BreakdownTable from '../components/BreakdownTable'
import BlueprintPanel from '../components/BlueprintPanel'
import { calculateHedgingScenario, DEFAULT_INPUTS, scenarioFromProject, CRUCIBLE_MARGIN_RATE } from '../utils/calculations'
import { formatAUD } from '../utils/formatters'
import { loadProjects, SCENARIO_PRESETS } from '../utils/sampleData'
import './Forecaster.css'

const TOOLTIPS = {
  copperVol: 'Calculated based on standard medium-density residential cabling (150–180kg copper content per apartment, covering sub-mains, general wiring, switchboards, AC lines, and plumbing piping).',
  spotPrice: 'Reflects London Metal Exchange (LME) spot price translated to Australian Dollars (AUD), including wholesaler freight & import overheads.',
  holdingCost: 'The daily cost of capital, land tax, builder site offices, crane rental, and commercial financing interest accrued for every single day the project is delayed.',
  delayDays: 'When raw copper doubles, fixed-price subcontractors default or pause work to re-negotiate quotes. It typically takes 2 to 4 weeks to resolve disputes or re-tender the work in Brisbane.',
}

export default function Forecaster() {
  const [searchParams, setSearchParams] = useSearchParams()
  const projects = useMemo(() => loadProjects(), [])

  const [inputs, setInputs] = useState(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
    const projectId = params.get('project')
    if (projectId) {
      const project = loadProjects().find((p) => p.id === projectId)
      if (project) return { ...DEFAULT_INPUTS, ...scenarioFromProject(project) }
    }

    const shared = { ...DEFAULT_INPUTS }
    let hasShared = false
    for (const key of Object.keys(DEFAULT_INPUTS)) {
      if (params.has(key)) {
        hasShared = true
        const val = params.get(key)
        shared[key] = key === 'projectName' || key === 'copperSource' ? val : Number(val)
      }
    }
    return hasShared ? shared : { ...DEFAULT_INPUTS }
  })

  const [blueprintOpen, setBlueprintOpen] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const update = (key, value) => setInputs((prev) => ({ ...prev, [key]: value }))

  const scenario = calculateHedgingScenario(inputs)
  const {
    netSavings,
    materialSavingsOnly,
    timeSavingsOnly,
    actualDelayDays,
    roi,
    futureSpotPrice,
    totalLockInFee,
    totalLockInPercent,
    operationalCost,
    crucibleMargin,
  } = scenario

  const handleProjectSelect = (e) => {
    const id = e.target.value
    if (!id) return
    const project = projects.find((p) => p.id === id)
    if (project) {
      setInputs((prev) => ({ ...prev, ...scenarioFromProject(project) }))
      setSearchParams({ project: id })
    }
  }

  const handleShare = async () => {
    const params = new URLSearchParams()
    Object.entries(inputs).forEach(([k, v]) => params.set(k, String(v)))
    const url = `${window.location.origin}${window.location.pathname}#/forecaster?${params.toString()}`
    await navigator.clipboard.writeText(url)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }

  return (
    <div className="page forecaster-page animate-fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Arbitrage & Savings Forecaster</p>
          <h1 className="page-title">Model your copper hedge</h1>
          <p className="page-subtitle">Quantify dollar and time arbitrage before you lock in with Brisbane suppliers.</p>
        </div>

        <div className="forecaster-actions">
          <select className="form-input project-select" value={searchParams.get('project') || ''} onChange={handleProjectSelect}>
            <option value="">Select project...</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <div className="preset-btns">
            {SCENARIO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`preset-btn ${inputs.futurePriceMultiplier === preset.multiplier ? 'active' : ''}`}
                onClick={() => update('futurePriceMultiplier', preset.multiplier)}
              >
                {preset.label} ({preset.multiplier}x)
              </button>
            ))}
          </div>

          <button type="button" className="action-btn" onClick={() => window.print()}>
            <Printer size={14} /> Export PDF
          </button>
          <button type="button" className="action-btn" onClick={handleShare}>
            <Link2 size={14} /> {shareCopied ? 'Copied!' : 'Share Scenario'}
          </button>
        </div>
      </div>

      <div className="forecaster-grid">
        <div className="inputs-panel glass-card">
          <h2 className="panel-title"><Layers size={20} /> Project Hedging Inputs</h2>

          <div className="input-group">
            <label className="input-label" htmlFor="input-project-name">
              <Building2 size={15} /> Project Name
            </label>
            <input
              id="input-project-name"
              type="text"
              className="form-input"
              value={inputs.projectName}
              onChange={(e) => update('projectName', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label"><Activity size={15} /> Copper Volume Definition Method</label>
            <div className="toggle-group">
              <div
                className={`toggle-option ${inputs.copperSource === 'apartments' ? 'active' : ''}`}
                onClick={() => update('copperSource', 'apartments')}
              >
                Apartments Model
              </div>
              <div
                className={`toggle-option ${inputs.copperSource === 'tonnes' ? 'active' : ''}`}
                onClick={() => update('copperSource', 'tonnes')}
              >
                Direct Metric Tonnes
              </div>
            </div>
          </div>

          {inputs.copperSource === 'apartments' ? (
            <>
              <SliderInput
                id="input-apartments"
                label="Apartments / Dwellings"
                value={inputs.apartments}
                displayValue={`${inputs.apartments} Units`}
                min={10}
                max={250}
                step={5}
                scaleLabels={['10 units', '120 units', '250 units']}
                onChange={(v) => update('apartments', v)}
              />
              <SliderInput
                id="input-copper-per-apartment"
                label="Copper Content per Apartment"
                value={inputs.copperPerApartment}
                displayValue={`${inputs.copperPerApartment} kg`}
                min={50}
                max={300}
                step={10}
                scaleLabels={['50 kg (Low)', '150 kg (Avg)', '300 kg (High)']}
                tooltip={TOOLTIPS.copperVol}
                onChange={(v) => update('copperPerApartment', v)}
              />
            </>
          ) : (
            <SliderInput
              id="input-manual-tonnes"
              label="Total Estimated Copper Volume"
              value={inputs.manualTonnes}
              displayValue={`${inputs.manualTonnes} Tonnes`}
              min={1}
              max={80}
              step={1}
              scaleLabels={['1 Tonne', '40 Tonnes', '80 Tonnes']}
              onChange={(v) => update('manualTonnes', v)}
            />
          )}

          <SliderInput
            id="input-spot-price"
            label="Current LME Copper Spot Price (AUD)"
            value={inputs.currentSpotPrice}
            displayValue={`${formatAUD(inputs.currentSpotPrice)} / T`}
            min={8000}
            max={18000}
            step={250}
            scaleLabels={['$8k AUD', '$13k AUD', '$18k AUD']}
            tooltip={TOOLTIPS.spotPrice}
            onChange={(v) => update('currentSpotPrice', v)}
          />

          <SliderInput
            id="input-multiplier"
            label="Copper Spot Price Multiplier (6-9 Months)"
            value={inputs.futurePriceMultiplier}
            displayValue={`${inputs.futurePriceMultiplier.toFixed(1)}x (${formatAUD(futureSpotPrice)}/T)`}
            min={1.0}
            max={2.5}
            step={0.1}
            scaleLabels={['1.0x (Flat)', '1.5x', '2.0x (Double)', '2.5x (Surge)']}
            valueColor={inputs.futurePriceMultiplier >= 2.0 ? 'var(--danger)' : 'var(--copper)'}
            onChange={(v) => update('futurePriceMultiplier', v)}
          />

          <SliderInput
            id="input-holding-cost"
            label="Daily Project Carrying Cost (AUD)"
            value={inputs.dailyHoldingCost}
            displayValue={`${formatAUD(inputs.dailyHoldingCost)} / Day`}
            min={1000}
            max={12000}
            step={500}
            scaleLabels={['$1k AUD', '$6.5k AUD', '$12k AUD']}
            tooltip={TOOLTIPS.holdingCost}
            onChange={(v) => update('dailyHoldingCost', v)}
          />

          <SliderInput
            id="input-delay-days"
            label="Subcontractor Renegotiation Delay (Days)"
            value={inputs.delayDays}
            displayValue={`${inputs.delayDays} Days`}
            min={0}
            max={60}
            step={1}
            scaleLabels={['0 Days', '30 Days', '60 Days']}
            tooltip={TOOLTIPS.delayDays}
            onChange={(v) => update('delayDays', v)}
          />

          <div className="input-group">
            <label className="input-label" htmlFor="input-operational-cost">
              Operational Pass-Through (% of copper notional)
            </label>
            <input
              id="input-operational-cost"
              type="number"
              step="0.1"
              min="1"
              max="10"
              className="form-input"
              value={inputs.operationalCostPercent}
              onChange={(e) => update('operationalCostPercent', Number(e.target.value))}
            />
            <p className="pricing-formula-note">
              Client lock-in fee = operational cost × {(1 + CRUCIBLE_MARGIN_RATE).toFixed(2)}
              {' '}(includes {(CRUCIBLE_MARGIN_RATE * 100).toFixed(0)}% Crucible margin).
              Currently <strong>{formatAUD(totalLockInFee)}</strong> ({totalLockInPercent.toFixed(2)}% of notional):
              {' '}{formatAUD(operationalCost)} pass-through + {formatAUD(crucibleMargin)} margin.
            </p>
          </div>
        </div>

        <div className="outputs-panel">
          <div className="metrics-row">
            <MetricCard
              label="Total Savings"
              value={netSavings > 0 ? formatAUD(netSavings) : '$0'}
              subtext="Hedged vs Unhedged Cost"
              variant="savings"
            />
            <MetricCard
              label="Timeline Saved"
              value={`${actualDelayDays} Days`}
              subtext="Avoided Project Delays"
              variant="time"
            />
            <MetricCard
              label="Return on Hedging"
              value={netSavings > 0 ? `${roi.toFixed(0)}%` : '0%'}
              subtext="ROI of Total Lock-In Fee"
              variant="roi"
            />
          </div>

          <CostChart projectName={inputs.projectName} scenario={scenario} />
          <BreakdownTable scenario={scenario} inputs={inputs} />

          {netSavings > 0 ? (
            <div className="rec-banner animate-fade-in">
              <div className="rec-icon-box"><ShieldCheck size={20} /></div>
              <div className="rec-content">
                <h4>CEO Decision Directive: LOCK-IN HIGHLY RECOMMENDED</h4>
                <p>
                  By locking in copper with your Brisbane wholesale account, you hedge
                  <strong> {formatAUD(materialSavingsOnly)}</strong> in commodity surge costs and secure your construction timeline, preventing
                  <strong> {actualDelayDays} days</strong> of subcontractor walk-offs, which saves
                  <strong> {formatAUD(timeSavingsOnly)}</strong> in interest carrying overheads.
                </p>
              </div>
            </div>
          ) : (
            <div className="rec-banner green animate-fade-in">
              <div className="rec-icon-box"><TrendingDown size={20} /></div>
              <div className="rec-content">
                <h4>CEO Decision Directive: STANDBY / BUY SPOT</h4>
                <p>
                  With a copper surge multiplier of 1.0x (flat price) and zero timeline risk,
                  the unhedged cost equals the raw spot market. The lock-in fee (operational cost + 20% margin) represents a net premium drag.
                  Consider locking in only if global macroeconomic signals suggest an imminent copper breakout.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <details className="blueprint-details" open={blueprintOpen} onToggle={(e) => setBlueprintOpen(e.target.open)}>
        <summary>
          <FileText size={18} />
          Strategic Blueprint
          <ChevronDown size={16} className="chevron" />
        </summary>
        <BlueprintPanel />
      </details>
    </div>
  )
}