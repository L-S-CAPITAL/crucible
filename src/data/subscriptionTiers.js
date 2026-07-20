export const SUBSCRIPTION_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'forever',
    blurb: 'Model copper exposure and run scenario analysis on a single project.',
    cta: 'Start free',
    highlight: false,
    features: [
      'Forecaster scenario engine',
      '1 active project draft',
      'Cost-plus fee transparency',
      'LME forward curve docs',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 490,
    period: 'month',
    blurb: 'Portfolio locks, live warehouse inventory pulse, and systematic roll monitoring.',
    cta: 'Start Professional',
    highlight: true,
    features: [
      'Everything in Starter',
      'Unlimited portfolio projects',
      'Physical inventory live page',
      'Cash/3M, 3M/15M, LME–COMEX basis monitors',
      'Carrying-charge shortfall flags',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    period: 'custom',
    blurb: 'Multi-entity books, broker integrations, and dedicated ops for large developers.',
    cta: 'Contact sales',
    highlight: false,
    features: [
      'Everything in Professional',
      'Multi-workspace / multi-entity',
      'Live LME feed integration',
      'Custom roll-threshold policies',
      'SSO & audit export (IFRS 9 trail)',
      'Dedicated success manager',
    ],
  },
]

export function formatTierPrice(tier) {
  if (tier.price === 0) return 'Free'
  if (tier.price == null) return 'Custom'
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(tier.price)
}
