import { FileCheck2, HandCoins, PackageCheck } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FEATURES = [
  {
    n: '01',
    icon: FileCheck2,
    title: 'Clear service agreements before work begins',
    text: 'Sivan helps both parties define scope, pricing, and delivery expectations before work starts, reducing misunderstandings in service-based work.',
    accent: 'linear-gradient(135deg, #037bdf, #018ee8)',
    glow: 'rgba(3,123,223,0.45)',
  },
  {
    n: '02',
    icon: HandCoins,
    title: 'Payment coordination through licensed providers',
    text: 'Payments are processed directly by licensed third-party payment providers. Sivan does not hold, store, or transmit funds at any point.',
    accent: 'linear-gradient(135deg, #0faec0, #0d8fb0)',
    glow: 'rgba(15,174,192,0.45)',
  },
  {
    n: '03',
    icon: PackageCheck,
    title: 'Service delivery tracking',
    text: 'Sivan provides structured tracking of service progress and completion so both parties can maintain clarity throughout the engagement.',
    accent: 'linear-gradient(135deg, #0d8fb0, #34c77b)',
    glow: 'rgba(15,174,192,0.45)',
  },
]

export default function Services() {
  return (
    <section id="what" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <span className="eyebrow">What Sivan does</span>
            <h2 className="section-title">
              Clear service coordination before, during, and{' '}
              <span className="serif-accent">after delivery</span>
            </h2>
            <p className="lead">
              Sivan gives both parties a structured way to agree on terms, coordinate
              provider-processed payment references, track delivery, and confirm completion.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="focus-grid">
          {FEATURES.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="card" style={{ padding: 38, height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -90,
                    right: -90,
                    width: 210,
                    height: 210,
                    borderRadius: 999,
                    background: i === 0 ? 'rgba(3,123,223,0.07)' : 'rgba(15,174,192,0.09)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 52,
                      height: 52,
                      borderRadius: 15,
                      background: s.accent,
                      color: '#fff',
                      boxShadow: `0 16px 30px -12px ${s.glow}`,
                    }}
                  >
                    <s.icon size={25} strokeWidth={1.9} />
                  </span>
                  <span style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--line)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {s.n}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginTop: 24 }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', marginTop: 12 }}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .focus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
