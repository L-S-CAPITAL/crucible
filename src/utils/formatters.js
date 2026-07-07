export function formatAUD(val) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(val)
}

export function formatTonnes(val, decimals = 2) {
  return `${val.toFixed(decimals)}T`
}

export function formatPercent(val, decimals = 0) {
  return `${val.toFixed(decimals)}%`
}