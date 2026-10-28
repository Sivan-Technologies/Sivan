import { FileCheck2, HandCoins, PackageCheck } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FEATURES = [
  {
    n: '01',
    icon: FileCheck2,
    title: 'Clear service agreements before work begins',
    text: 'Sivan helps both parties define scope, pricing, and delivery expectations before work starts, reducing misunderstandings in service-based work.',
    tag: 'Scope · Pricing · Delivery terms',
  },
  {
    n: '02',
    icon: HandCoins,
    title: 'Payment coordination through licensed providers',
    text: 'Payments are processed directly by licensed third-party payment providers. Sivan does not hold, store, or transmit funds at any point.',
    tag: 'Licensed providers · No custody',
  },
  {
    n: '03',
    icon: PackageCheck,
    title: 'Service delivery tracking',
    text: 'Sivan provides structured tracking of service progress and completion so both parties can maintain clarity throughout the engagement.',
    tag: 'Progress · Completion records',
  },
]

export default function Services() {
  return (
    <section id="what" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <Reveal>
          <div className="head-split">
            <div>
              <span className="eyebrow">01 / What Sivan does</span>
              <h2 className="section-title">
                Clear service coordination before, during, and{' '}
                <span className="accent-text">after delivery</span>
              </h2>
            </div>
            <p className="lead">
              Sivan gives both parties a structured way to agree on terms, coordinate
              provider-processed payment references, track delivery, and confirm completion.
            </p>
          </div>
        </Reveal>

        <div className="cells feature-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {FEATURES.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div
                style={{
                  height: '100%',
                  padding: '30px 28px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span className="label">{s.n}</span>
                  <span style={{ color: 'var(--primary-deep)' }}>
                    <s.icon size={20} strokeWidth={1.7} />
                  </span>
                </div>

                <h3 style={{ fontSize: '1.22rem', marginTop: 44, fontWeight: 600, lineHeight: 1.15 }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginTop: 12, lineHeight: 1.6 }}>
                  {s.text}
                </p>

                <div
                  className="label"
                  style={{
                    marginTop: 'auto',
                    paddingTop: 22,
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    color: 'var(--faint)',
                  }}
                >
                  {s.tag}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .feature-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
