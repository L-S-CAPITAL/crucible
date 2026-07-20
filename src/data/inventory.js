/** Simulated LME physical inventory — refreshed client-side for demo "live" pulse */

export const WAREHOUSE_LOCATIONS = [
  'Rotterdam',
  'Antwerp',
  'Singapore',
  'Busan',
  'New Orleans',
  'Johor',
]

export const METALS = [
  { code: 'CA', name: 'Copper', unit: 't', baseStock: 112400, cancelPct: 0.38 },
  { code: 'AH', name: 'Aluminium', unit: 't', baseStock: 428000, cancelPct: 0.22 },
  { code: 'ZS', name: 'Zinc', unit: 't', baseStock: 186200, cancelPct: 0.31 },
  { code: 'NI', name: 'Nickel', unit: 't', baseStock: 72400, cancelPct: 0.19 },
  { code: 'PB', name: 'Lead', unit: 't', baseStock: 98300, cancelPct: 0.15 },
  { code: 'SN', name: 'Tin', unit: 't', baseStock: 4100, cancelPct: 0.27 },
]

function hashSeed(n) {
  const x = Math.sin(n) * 10000
  return x - Math.floor(x)
}

export function generateInventorySnapshot(tick = 0) {
  const asOf = new Date()
  const rows = []

  METALS.forEach((metal, mi) => {
    WAREHOUSE_LOCATIONS.forEach((loc, li) => {
      const share = 0.08 + hashSeed(mi * 17 + li * 3) * 0.22
      const noise = 1 + (hashSeed(tick + mi * 5 + li) - 0.5) * 0.012
      const stock = Math.max(0, Math.round(metal.baseStock * share * noise))
      const cancelNoise = metal.cancelPct + (hashSeed(tick * 0.3 + mi + li) - 0.5) * 0.04
      const cancelledPct = Math.min(0.85, Math.max(0.05, cancelNoise))
      const cancelled = Math.round(stock * cancelledPct)
      const onWarrant = stock - cancelled
      const dayChange = Math.round((hashSeed(tick + mi * 11 + li * 7) - 0.48) * stock * 0.008)

      rows.push({
        id: `${metal.code}-${loc}`,
        metalCode: metal.code,
        metal: metal.name,
        location: loc,
        stock,
        onWarrant,
        cancelled,
        cancelledPct,
        dayChange,
        unit: metal.unit,
      })
    })
  })

  const byMetal = METALS.map((metal) => {
    const metalRows = rows.filter((r) => r.metalCode === metal.code)
    const stock = metalRows.reduce((s, r) => s + r.stock, 0)
    const cancelled = metalRows.reduce((s, r) => s + r.cancelled, 0)
    const dayChange = metalRows.reduce((s, r) => s + r.dayChange, 0)
    return {
      code: metal.code,
      name: metal.name,
      stock,
      cancelled,
      cancelledPct: stock > 0 ? cancelled / stock : 0,
      dayChange,
      tightness:
        stock < 100000 && metal.code === 'CA'
          ? 'elevated'
          : cancelled / stock > 0.4
            ? 'watch'
            : 'normal',
    }
  })

  // Illustrative forward structure signals (mock, for inventory context)
  const cash3m = -18 + (hashSeed(tick * 0.7) - 0.5) * 12
  const tom3m = 42 + (hashSeed(tick * 0.5 + 2) - 0.5) * 8
  const m3m15 = 78 + (hashSeed(tick * 0.4 + 5) - 0.5) * 15
  const lmeComexBasis = 35 + (hashSeed(tick * 0.6 + 9) - 0.5) * 40

  return {
    asOf: asOf.toISOString(),
    tick,
    rows,
    byMetal,
    signals: {
      cash3m,
      tom3m,
      m3m15,
      lmeComexBasis,
      structure: cash3m < 0 ? 'backwardation' : 'contango',
    },
  }
}

export function formatTonnesInt(n) {
  return new Intl.NumberFormat('en-AU').format(Math.round(n))
}
