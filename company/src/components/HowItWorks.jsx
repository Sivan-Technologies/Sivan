import { FileText, ClipboardCheck, HandCoins, PackageCheck, BadgeCheck } from 'lucide-react'
import Reveal from './Reveal.jsx'

const STEPS = [
  { icon: FileText, step: '1', title: 'Create service agreement', text: 'Define scope, pricing, and delivery expectations before work starts.' },
  { icon: ClipboardCheck, step: '2', title: 'Confirm terms', text: 'Both parties agree on the terms before work begins.' },
  { icon: HandCoins, step: '3', title: 'Process payment via licensed provider', text: 'Payment is handled by a licensed third-party provider.' },
  { icon: PackageCheck, step: '4', title: 'Deliver service', text: 'Track progress and delivery updates through WhatsApp.' },
  { icon: BadgeCheck, step: '5', title: 'Confirm completion', text: 'Both parties confirm the service is complete.' },
]

export default function HowItWorks() {
  return (
    <section id="workflow" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <Reveal>
          <div className="head-split">
            <div>
              <span className="eyebrow">03 / How it works</span>
              <h2 className="section-title">
                From agreement to completion,{' '}
                <span className="accent-text">guided end to end</span>
              </h2>
            </div>
            <p className="lead">A simple flow — no order books, no trading interface, no jargon.</p>
          </div>
        </Reveal>

        <div className="cells process-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 70}>
              <div style={{ height: '100%', padding: '24px 22px 22px', background: 'var(--card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="label" style={{ fontSize: 10 }}>
                    Step {s.step}
                  </span>
                  <span style={{ color: 'var(--primary-deep)' }}>
                    <s.icon size={17} strokeWidth={1.7} />
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'rgba(0,242,254,0.16)',
                    lineHeight: 1,
                    marginTop: 22,
                  }}
                >
                  {String(s.step).padStart(2, '0')}
                </div>
                <h4 style={{ fontSize: '0.98rem', marginTop: 12, fontWeight: 600, lineHeight: 1.25 }}>{s.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 10, lineHeight: 1.6 }}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .process-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 760px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
