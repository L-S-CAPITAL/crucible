import { calculateHedgingScenario } from './calculations'

export const SCENARIO_PRESETS = [
  { id: 'conservative', label: 'Conservative', multiplier: 1.3 },
  { id: 'moderate', label: 'Moderate', multiplier: 1.7 },
  { id: 'worst', label: 'Worst Case', multiplier: 2.5 },
]

export const MOCK_COPPER_PRICE = 13542
export const MOCK_COPPER_CHANGE = 4.2

export const ACTIVITY_FEED = [
  { id: 1, text: 'Lumina Apartments lock-in confirmed with L&H South Brisbane', time: '2 hours ago' },
  { id: 2, text: 'LME copper +4.2% this week — hedged positions in the green', time: 'Yesterday' },
  { id: 3, text: 'Horizon Tower forward contract extended to Month 8', time: '3 days ago' },
  { id: 4, text: 'Bayside Residences draft scenario shared with project team', time: '5 days ago' },
]

const baseProjects = [
  {
    id: 'lumina',
    name: 'Lumina Apartments, West End',
    suburb: 'West End',
    status: 'active',
    apartments: 60,
    copperSource: 'apartments',
    copperPerApartment: 150,
    lockedPrice: 12800,
    currentMarketPrice: 13542,
    lockDate: '2026-01-15',
    fitOutMonth: 8,
    supplier: 'Lawrence & Hanson',
  },
  {
    id: 'horizon',
    name: 'Horizon Tower, Newstead',
    suburb: 'Newstead',
    status: 'active',
    apartments: 120,
    copperSource: 'apartments',
    copperPerApartment: 160,
    lockedPrice: 13100,
    currentMarketPrice: 13542,
    lockDate: '2026-02-01',
    fitOutMonth: 9,
    supplier: 'Middys Fortitude Valley',
  },
  {
    id: 'terraces',
    name: 'The Terraces, Paddington',
    suburb: 'Paddington',
    status: 'completed',
    apartments: 24,
    copperSource: 'apartments',
    copperPerApartment: 140,
    lockedPrice: 11900,
    currentMarketPrice: 13542,
    lockDate: '2025-06-10',
    fitOutMonth: 7,
    supplier: 'MM Kembla',
  },
  {
    id: 'bayside',
    name: 'Bayside Residences, Wynnum',
    suburb: 'Wynnum',
    status: 'draft',
    apartments: 45,
    copperSource: 'apartments',
    copperPerApartment: 150,
    lockedPrice: 13500,
    currentMarketPrice: 13542,
    lockDate: null,
    fitOutMonth: 9,
    supplier: 'Rexel Coorparoo',
  },
]

export function enrichProject(project) {
  const tonnes = project.copperSource === 'apartments'
    ? (project.apartments * project.copperPerApartment) / 1000
    : project.manualTonnes || 0

  const scenario = calculateHedgingScenario({
    copperSource: project.copperSource,
    apartments: project.apartments,
    copperPerApartment: project.copperPerApartment,
    currentSpotPrice: project.lockedPrice,
    futurePriceMultiplier: 2.0,
  })

  const priceDelta = project.currentMarketPrice - project.lockedPrice
  const savingsToDate = project.status === 'draft'
    ? 0
    : Math.max(0, tonnes * priceDelta)

  return {
    ...project,
    tonnes: tonnes.toFixed(1),
    savingsToDate,
    projectedSavings: scenario.netSavings,
    roi: scenario.roi,
  }
}

export const SAMPLE_PROJECTS = baseProjects.map(enrichProject)

export const STORAGE_KEY = 'crucible_projects'

export function loadProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored).map(enrichProject)
    }
  } catch {
    /* use defaults */
  }
  return SAMPLE_PROJECTS
}

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function getPortfolioKPIs(projects) {
  const locked = projects.filter((p) => p.status !== 'draft')
  const totalTonnes = locked.reduce((sum, p) => sum + parseFloat(p.tonnes), 0)
  const aggregateSavings = locked.reduce((sum, p) => sum + p.savingsToDate, 0)
  const avgRoi = locked.length
    ? locked.reduce((sum, p) => sum + p.roi, 0) / locked.length
    : 0

  return {
    totalProjects: projects.length,
    activeLocks: locked.filter((p) => p.status === 'active').length,
    totalTonnes,
    aggregateSavings,
    avgRoi,
  }
}