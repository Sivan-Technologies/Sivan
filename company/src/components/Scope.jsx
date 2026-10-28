import { MapPin, Scale } from 'lucide-react'
import Reveal from './Reveal.jsx'

const CARDS = [
  {
    icon: MapPin,
    tag: 'Live',
    title: 'Live in Nigeria today',
    text: 'WhatsApp-based service agreement coordination with payment processing handled directly by licensed providers — no app download, no crypto knowledge required.',
  },
  {
    icon: Scale,
    tag: 'Controls',
    title: 'Dispute resolution built in',
    text: 'Both parties can submit context during a disagreement. Structured delivery records give admins everything they need to review a dispute fairly.',
  },
]

export default function Scope() {
  return (
    <section id="scope" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 56, alignItems: 'center' }}
          className="scope-grid"
        >
          <Reveal>
            <div>
              <span className="eyebrow">05 / Current scope</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)', marginTop: 20 }}>
                Nigeria-first. Built to{' '}
                <span className="accent-text">scale globally</span>
              </h2>
              <p className="lead" style={{ fontSize: '0.97rem' }}>
                Sivan currently operates in Nigeria, helping freelancers and service businesses
                structure agreements and coordinate payments through WhatsApp.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div style={{ background: 'var(--card)', padding: '26px 24px', display: 'flex', gap: 18 }}>
                  <span className="icon-box" style={{ width: 34, height: 34 }}>
                    <c.icon size={16} strokeWidth={1.9} />
                  </span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{c.title}</h4>
                      <span
                        className="label"
                        style={{
                          fontSize: 9,
                          color: 'var(--green)',
                          border: '1px solid rgba(20,241,149,0.3)',
                          background: 'rgba(20,241,149,0.08)',
                          padding: '2px 6px',
                        }}
                      >
                        {c.tag}
                      </span>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.89rem', marginTop: 9, lineHeight: 1.6 }}>
                      {c.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .scope-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  )
}
