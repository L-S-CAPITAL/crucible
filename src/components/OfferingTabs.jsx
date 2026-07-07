import { useEffect, useState } from 'react'
import { OFFERING_TABS } from '../data/offerings'
import './OfferingTabs.css'

export default function OfferingTabs() {
  const [active, setActive] = useState(OFFERING_TABS[0].id)

  useEffect(() => {
    const sections = OFFERING_TABS.map((t) => document.getElementById(t.id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div className="offering-tabs-wrap">
      <nav className="offering-tabs" aria-label="Crucible offerings">
        {OFFERING_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`offering-tab ${active === tab.id ? 'active' : ''}`}
            onClick={() => scrollTo(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="offering-sections">
        {OFFERING_TABS.map((tab, index) => (
          <section key={tab.id} id={tab.id} className="offering-section">
            <div className="offering-section-grid">
              <div className="offering-visual" aria-hidden="true">
                <div className="offering-visual-inner">
                  <span className="offering-visual-label">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{tab.label}</strong>
                  <div className="offering-visual-bars">
                    <div style={{ height: `${55 + index * 8}%` }} />
                    <div style={{ height: `${40 + index * 5}%` }} />
                    <div style={{ height: `${70 - index * 4}%` }} />
                    <div style={{ height: `${50 + index * 6}%` }} />
                  </div>
                </div>
              </div>

              <div className="offering-copy">
                <h3 className="offering-headline">{tab.headline}</h3>
                {tab.narrative.map((p) => (
                  <p key={p.slice(0, 24)} className="offering-narrative">{p}</p>
                ))}
                <ul className="offering-features">
                  {tab.features.map((f) => (
                    <li key={f.title}>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}