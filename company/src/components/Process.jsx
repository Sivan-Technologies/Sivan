import { FileText, ClipboardCheck, HandCoins, PackageCheck, BadgeCheck } from 'lucide-react'
import Reveal from './Reveal.jsx'

const STEPS = [
  {
    icon: FileText,
    step: '1',
    title: 'Create service orchestration',
    text: 'Describe the job or service and define scope, pricing, and delivery expectations before work starts.',
  },
  {
    icon: ClipboardCheck,
    step: '2',
    title: 'Confirm terms',
    text: 'Both parties agree on the terms before work begins.',
  },
  {
    icon: HandCoins,
    step: '3',
    title: 'Process payment',
    text: 'Payment is handled securely through a third-party service.',
  },
  {
    icon: PackageCheck,
    step: '4',
    title: 'Deliver the job',
    text: 'Track progress and delivery updates through WhatsApp.',
  },
  {
    icon: BadgeCheck,
    step: '5',
    title: 'Confirm completion',
    text: 'Both parties confirm the service is complete.',
  },
]

export default function Process() {
  return (
    <section id="how" className="section" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, #edf5fc 100%)' }}>
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title">
              From job to completion,{' '}
              <span className="serif-accent">guided end to end</span>
            </h2>
            <p className="lead">
              No order books, no trading interface, no jargon a simple flow through WhatsApp.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }} className="process-grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 90}>
              <div className="card" style={{ padding: 28, height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: 11,
                      borderRadius: 13,
                      background: 'var(--gradient)',
                      color: '#fff',
                      boxShadow: '0 14px 26px -12px rgba(3,123,223,0.5)',
                    }}
                  >
                    <s.icon size={20} strokeWidth={1.9} />
                  </span>
                  <span style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--line)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {s.step}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.02rem', marginTop: 18 }}>{s.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 8 }}>{s.text}</p>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: -16,
                      width: 16,
                      height: 2,
                      background: 'var(--gradient)',
                      borderRadius: 2,
                    }}
                    className="process-arrow"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .process-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .process-arrow { display: none !important; }
        }
        @media (max-width: 760px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
