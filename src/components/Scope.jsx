import { MapPin, Scale } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function Scope() {
  return (
    <section id="scope" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="scope-grid">
          <Reveal>
            <div>
              <span className="eyebrow">Current scope</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: 20 }}>
                Nigeria-first. Built to{' '}
                <span className="serif-accent">scale globally</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.07rem' }}>
                Sivan currently operates in Nigeria, helping freelancers and service businesses
                structure agreements and coordinate payments through WhatsApp.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Reveal delay={80}>
              <div className="card" style={{ padding: 32, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    padding: 13,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
                    color: '#fff',
                    boxShadow: '0 14px 26px -12px rgba(3,123,223,0.5)',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} strokeWidth={1.9} />
                </span>
                <div>
                  <h4 style={{ fontSize: '1.15rem' }}>Live in Nigeria today</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: 8 }}>
                    WhatsApp-based service agreement coordination with payment processing handled
                    directly by licensed providers — no app download, no crypto knowledge required.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="card" style={{ padding: 32, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    padding: 13,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, var(--cyan), var(--green))',
                    color: '#fff',
                    boxShadow: '0 14px 26px -12px rgba(15,174,192,0.5)',
                    flexShrink: 0,
                  }}
                >
                  <Scale size={22} strokeWidth={1.9} />
                </span>
                <div>
                  <h4 style={{ fontSize: '1.15rem' }}>Dispute resolution built in</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: 8 }}>
                    Both parties can submit context during a disagreement. Structured delivery
                    records give admins everything they need to review a dispute fairly.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .scope-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
