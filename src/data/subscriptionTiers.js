export const SUBSCRIPTION_TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    period: 'month',
    blurb: 'Model copper exposure and run scenario analysis across your projects.',
    cta: 'Start Basic',
    highlight: false,
    features: [
      'Forecaster scenario engine',
      'Portfolio project drafts',
      'Cost-plus fee transparency',
      'LME forward curve docs',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2500,
    period: 'month',
    blurb: 'Portfolio locks, live warehouse inventory pulse, and systematic roll monitoring.',
    cta: 'Start Pro',
    highlight: true,
    features: [
      'Everything in Basic',
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
    cta: 'Enquire for price',
    highlight: false,
    features: [
      'Everything in Pro',
      'Multi-workspace / multi-entity',
      'Live LME feed integration',
      'Custom roll-threshold policies',
      'SSO & audit export (IFRS 9 trail)',
      'Dedicated success manager',
    ],
  },
]

export function formatTierPrice(tier) {
  if (tier.price == null) return 'Enquire'
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(tier.price)
}
