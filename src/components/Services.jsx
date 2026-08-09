import { FileCheck2, HandCoins, PackageCheck, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FEATURES = [
  {
    n: '01',
    icon: FileCheck2,
    title: 'Matching jobs with the right talent',
    text: 'Sivan bridges content creators and freelancers with the specific jobs they offer defining scope, pricing, and delivery expectations before work begins.',
    accent: 'linear-gradient(135deg, #037bdf, #018ee8)',
    glow: 'rgba(3,123,223,0.45)',
    textColor: 'var(--primary)',
  },
  {
    n: '02',
    icon: HandCoins,
    title: 'Simplified payment coordination',
    text: 'Payments are processed directly through secure third-party payment services, keeping the experience simple and transparent.',
    accent: 'linear-gradient(135deg, #0faec0, #0d8fb0)',
    glow: 'rgba(15,174,192,0.45)',
    textColor: 'var(--cyan)',
  },
  {
    n: '03',
    icon: PackageCheck,
    title: 'Job delivery tracking',
    text: 'Sivan provides structured tracking of service progress and completion so both parties can maintain clarity throughout the engagement.',
    accent: 'linear-gradient(135deg, #0d8fb0, #34c77b)',
    glow: 'rgba(15,174,192,0.45)',
    textColor: 'var(--cyan)',
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
              Connecting the right people with{' '}
              <span className="serif-accent">the right jobs</span>
            </h2>
            <p className="lead">
              Sivan bridges content creators and freelancers with the specific jobs they offer
              giving both parties a structured way to agree on terms, coordinate delivery, and
              confirm completion.
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

        <Reveal delay={200}>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'var(--soft)',
              border: '1px solid var(--line)',
              borderRadius: 16,
              padding: '18px 24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <ShieldCheck size={20} color="var(--green)" style={{ flexShrink: 0 }} />
            <span style={{ color: 'var(--slate)', fontWeight: 600, fontSize: '0.98rem', textAlign: 'center' }}>
              No app download, no setup required everything runs through WhatsApp.
            </span>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .focus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
