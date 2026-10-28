import { FileCheck2, HandCoins, History, MessagesSquare } from 'lucide-react'
import Reveal from './Reveal.jsx'

const RECORDS = [
  { icon: FileCheck2, title: 'Service agreement record', text: 'Scope, pricing, counterparty, and terms are organized clearly' },
  { icon: HandCoins, title: 'Provider payment reference', text: 'Payment processing remains with licensed third-party providers' },
  { icon: History, title: 'Delivery update trail', text: 'Progress and completion updates are recorded for transparency' },
  { icon: MessagesSquare, title: 'Dispute review workflow', text: 'Both parties can submit context when a disagreement occurs' },
]

export default function Transparency() {
  return (
    <section id="structure" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: 56, alignItems: 'start' }}
          className="why-grid"
        >
          <Reveal>
            <div style={{ position: 'sticky', top: 96 }}>
              <span className="eyebrow">04 / Transparency & Structure</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)', marginTop: 20 }}>
                Structured records keep{' '}
                <span className="accent-text">both parties aligned</span>
              </h2>
              <p className="lead" style={{ fontSize: '0.96rem' }}>
                Sivan provides structured records of service agreements, payment references
                handled by providers, and delivery updates to improve clarity and accountability
                between clients and service providers.
              </p>

              <a
                href="https://waitlist.sivantech.online/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ marginTop: 30 }}
              >
                Request Pilot Access
              </a>
            </div>
          </Reveal>

          <div className="cells records-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {RECORDS.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div style={{ height: '100%', padding: '26px 24px', background: 'var(--card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="icon-box" style={{ width: 30, height: 30 }}>
                      <r.icon size={15} strokeWidth={1.9} />
                    </span>
                    <span className="label" style={{ fontSize: 9 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', marginTop: 26, fontWeight: 600 }}>{r.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.87rem', marginTop: 9, lineHeight: 1.6 }}>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .why-grid > div:first-child > div { position: static !important; }
        }
        @media (max-width: 620px) {
          .records-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
