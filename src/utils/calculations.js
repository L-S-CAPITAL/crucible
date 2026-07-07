export const CRUCIBLE_MARGIN_RATE = 0.20

export const DEFAULT_INPUTS = {
  projectName: 'Lumina Apartments, West End',
  copperSource: 'apartments',
  apartments: 60,
  copperPerApartment: 150,
  manualTonnes: 10,
  currentSpotPrice: 13500,
  futurePriceMultiplier: 2.0,
  operationalCostPercent: 4.17,
  dailyHoldingCost: 4500,
  delayDays: 21,
}

export function calculateTotalTonnes({ copperSource, apartments, copperPerApartment, manualTonnes }) {
  return copperSource === 'apartments'
    ? (apartments * copperPerApartment) / 1000
    : manualTonnes
}

export function calculateHedgingScenario(inputs) {
  const merged = { ...DEFAULT_INPUTS, ...inputs }
  const totalTonnes = calculateTotalTonnes(merged)

  const initialCopperCost = totalTonnes * merged.currentSpotPrice
  const futureSpotPrice = merged.currentSpotPrice * merged.futurePriceMultiplier
  const unhedgedCopperCost = totalTonnes * futureSpotPrice
  const copperSurgeCost = unhedgedCopperCost - initialCopperCost

  const operationalCost = initialCopperCost * (merged.operationalCostPercent / 100)
  const crucibleMargin = operationalCost * CRUCIBLE_MARGIN_RATE
  const totalLockInFee = operationalCost * (1 + CRUCIBLE_MARGIN_RATE)
  const totalLockInPercent = merged.operationalCostPercent * (1 + CRUCIBLE_MARGIN_RATE)

  const hedgedCopperCost = initialCopperCost + totalLockInFee

  const actualDelayDays = merged.futurePriceMultiplier > 1.0 ? merged.delayDays : 0
  const delayCost = actualDelayDays * merged.dailyHoldingCost

  const unhedgedTotalCost = unhedgedCopperCost + delayCost
  const hedgedTotalCost = hedgedCopperCost

  const netSavings = unhedgedTotalCost - hedgedTotalCost
  const materialSavingsOnly = unhedgedCopperCost - hedgedCopperCost
  const timeSavingsOnly = delayCost
  const roi = totalLockInFee > 0 ? (netSavings / totalLockInFee) * 100 : 0

  const chartHeight = 220
  const maxTotal = Math.max(unhedgedTotalCost, hedgedTotalCost)
  const scale = maxTotal > 0 ? chartHeight / maxTotal : 0

  return {
    totalTonnes,
    initialCopperCost,
    futureSpotPrice,
    unhedgedCopperCost,
    copperSurgeCost,
    operationalCost,
    crucibleMargin,
    totalLockInFee,
    totalLockInPercent,
    crucibleMarginPercent: merged.operationalCostPercent * CRUCIBLE_MARGIN_RATE,
    hedgedCopperCost,
    actualDelayDays,
    delayCost,
    unhedgedTotalCost,
    hedgedTotalCost,
    netSavings,
    materialSavingsOnly,
    timeSavingsOnly,
    roi,
    chart: {
      scale,
      unhedgedBaseH: initialCopperCost * scale,
      unhedgedSurgeH: copperSurgeCost * scale,
      unhedgedDelayH: delayCost * scale,
      hedgedBaseH: initialCopperCost * scale,
      hedgedOperationalH: operationalCost * scale,
      hedgedMarginH: crucibleMargin * scale,
    },
  }
}

export function scenarioFromProject(project) {
  return {
    projectName: project.name,
    copperSource: project.copperSource || 'apartments',
    apartments: project.apartments,
    copperPerApartment: project.copperPerApartment || 150,
    manualTonnes: project.manualTonnes || project.tonnes,
    currentSpotPrice: project.lockedPrice || project.currentSpotPrice || 13500,
    futurePriceMultiplier: project.futurePriceMultiplier || 2.0,
    operationalCostPercent: project.operationalCostPercent || 4.17,
    dailyHoldingCost: project.dailyHoldingCost || 4500,
    delayDays: project.delayDays || 21,
  }
}
