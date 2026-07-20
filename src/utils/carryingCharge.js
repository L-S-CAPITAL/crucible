/**
 * LME carrying charge formula (per metric tonne):
 * C = (R × S × T/360) + (W × T) + (I × S)
 *
 * R = financing rate (annualized decimal)
 * S = spot price ($/mt)
 * T = days to roll prompt
 * W = daily warehousing ($/mt/day)
 * I = annual insurance rate (decimal)
 */

export function computeCarryingCharge({
  financingRate,
  spotPrice,
  daysToRoll,
  warehouseRate,
  insuranceRate,
}) {
  const finance = financingRate * spotPrice * (daysToRoll / 360)
  const warehouse = warehouseRate * daysToRoll
  const insurance = insuranceRate * spotPrice
  const total = finance + warehouse + insurance
  return { finance, warehouse, insurance, total }
}

export function carryShortfall({ theoreticalCarry, marketSpread }) {
  if (theoreticalCarry <= 0) return { ratio: 1, shortfall: 0, flag: false }
  const ratio = marketSpread / theoreticalCarry
  return {
    ratio,
    shortfall: theoreticalCarry - marketSpread,
    flag: ratio < 0.5,
  }
}
