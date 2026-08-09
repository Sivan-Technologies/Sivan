import { FileCheck2, HandCoins, History, MessagesSquare, ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

const RECORDS = [
  {
    icon: FileCheck2,
    title: 'Service orchestration record',
    text: 'Scope, pricing, counterparty, and terms are organized clearly.',
  },
  {
    icon: HandCoins,
    title: 'Payment reference',
    text: 'Payments are coordinated through secure third-party services.',
  },
  {
    icon: History,
    title: 'Delivery update trail',
    text: 'Progress and completion updates are recorded for transparency.',
  },
  {
    icon: MessagesSquare,
    title: 'Dispute review workflow',
    text: 'Both parties can submit context when a dispute arises.',
  },
]

export default function WhyUs() {
  return (
    <section id="structure" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 64, alignItems: 'start' }} className="why-grid">
          {/* Left — sticky intro */}
          <Reveal>
            <div style={{ position: 'sticky', top: 110 }}>
              <span className="eyebrow">Transparency & Structure</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', marginTop: 20 }}>
                Structured records keep{' '}
                <span className="serif-accent">both parties aligned</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.05rem' }}>
                Sivan provides structured records of orchestration terms, payment references, and
                delivery updates to improve clarity and accountability between clients and the
                people doing the work.
              </p>

              <div
                style={{
                  marginTop: 34,
                  background: 'var(--soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: '20px 22px',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Built for creators & freelancers
                </div>
                <p style={{ color: 'var(--slate)', fontSize: '0.95rem', marginTop: 10, lineHeight: 1.65 }}>
                  Operating on WhatsApp, with structured records for terms, payment references,
                  delivery updates, and dispute review.
                </p>
              </div>

              <a href="#contact" className="btn btn-ghost" style={{ marginTop: 32 }}>
                Request Pilot Access <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </Reveal>

          {/* Right — records */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22 }} className="records-grid">
            {RECORDS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className="card" style={{ padding: 30, height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        padding: 11,
                        borderRadius: 12,
                        background: 'var(--soft)',
                        border: '1px solid var(--line)',
                        color: 'var(--primary)',
                      }}
                    >
                      <r.icon size={20} strokeWidth={1.9} />
                    </span>
                    <span style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--line)', lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.08rem', marginTop: 18 }}>{r.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.93rem', marginTop: 8 }}>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .why-grid > div:first-child { position: static !important; }
        }
        @media (max-width: 620px) {
          .records-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
