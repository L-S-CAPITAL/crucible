import { formatAUD } from '../utils/formatters'
import { CRUCIBLE_MARGIN_RATE } from '../utils/calculations'

export default function BreakdownTable({ scenario, inputs }) {
  const {
    totalTonnes,
    initialCopperCost,
    copperSurgeCost,
    operationalCost,
    crucibleMargin,
    totalLockInFee,
    delayCost,
    actualDelayDays,
    unhedgedTotalCost,
    hedgedTotalCost,
    netSavings,
  } = scenario

  const { futurePriceMultiplier, operationalCostPercent } = inputs
  const marginPercent = (CRUCIBLE_MARGIN_RATE * 100).toFixed(0)

  return (
    <table className="breakdown-table">
      <thead>
        <tr>
          <th>Cost Element</th>
          <th className="text-right">Unhedged</th>
          <th className="text-right">Hedged</th>
          <th className="text-right">Variance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Base Copper Cost ({totalTonnes.toFixed(2)}T @ Spot)</td>
          <td className="text-right">{formatAUD(initialCopperCost)}</td>
          <td className="text-right">{formatAUD(initialCopperCost)}</td>
          <td className="text-right" style={{ color: 'var(--text-muted)' }}>$0</td>
        </tr>
        <tr>
          <td>Commodity Price Surge ({futurePriceMultiplier.toFixed(1)}x)</td>
          <td className="text-right" style={{ color: 'var(--danger)' }}>+{formatAUD(copperSurgeCost)}</td>
          <td className="text-right" style={{ color: 'var(--success)' }}>$0</td>
          <td className="text-right" style={{ color: 'var(--success)', fontWeight: '600' }}>
            -{formatAUD(copperSurgeCost)}
          </td>
        </tr>
        <tr>
          <td>Operational Pass-Through ({operationalCostPercent}%)</td>
          <td className="text-right">$0</td>
          <td className="text-right" style={{ color: 'var(--text-primary)' }}>+{formatAUD(operationalCost)}</td>
          <td className="text-right" style={{ color: 'var(--danger)' }}>+{formatAUD(operationalCost)}</td>
        </tr>
        <tr>
          <td>Crucible Margin ({marginPercent}% on operational cost)</td>
          <td className="text-right">$0</td>
          <td className="text-right" style={{ color: 'var(--text-primary)' }}>+{formatAUD(crucibleMargin)}</td>
          <td className="text-right" style={{ color: 'var(--danger)' }}>+{formatAUD(crucibleMargin)}</td>
        </tr>
        <tr>
          <td>Total Lock-In Fee (operational × {(1 + CRUCIBLE_MARGIN_RATE).toFixed(2)})</td>
          <td className="text-right">$0</td>
          <td className="text-right" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>+{formatAUD(totalLockInFee)}</td>
          <td className="text-right" style={{ color: 'var(--danger)', fontWeight: '600' }}>+{formatAUD(totalLockInFee)}</td>
        </tr>
        <tr>
          <td>Project Holding Costs ({actualDelayDays} Days Delay)</td>
          <td className="text-right" style={{ color: 'var(--danger)' }}>+{formatAUD(delayCost)}</td>
          <td className="text-right" style={{ color: 'var(--success)' }}>$0</td>
          <td className="text-right" style={{ color: 'var(--success)', fontWeight: '600' }}>
            -{formatAUD(delayCost)}
          </td>
        </tr>
        <tr>
          <td>Total Project Outlay</td>
          <td className="text-right" style={{ color: 'var(--danger)' }}>{formatAUD(unhedgedTotalCost)}</td>
          <td className="text-right" style={{ color: 'var(--success)' }}>{formatAUD(hedgedTotalCost)}</td>
          <td className="text-right" style={{ color: 'var(--success)', fontSize: '0.95rem' }}>
            {netSavings > 0 ? `Saved ${formatAUD(netSavings)}` : '$0'}
          </td>
        </tr>
      </tbody>
    </table>
  )
}