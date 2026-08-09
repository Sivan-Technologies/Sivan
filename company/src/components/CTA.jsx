import { ArrowRight, PhoneCall } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function CTA() {
  return (
    <section className="section" style={{ padding: '64px 0', background: 'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(115deg, #0b1b2b 0%, #0d2a48 55%, #0c3b66 100%)',
              padding: '72px 56px',
              textAlign: 'center',
              color: '#fff',
              boxShadow: '0 36px 70px -30px rgba(11,27,43,0.55)',
            }}
          >
            {/* subtle grid + glows */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
                backgroundSize: '52px 52px',
                maskImage: 'radial-gradient(640px 420px at 50% 40%, #000 20%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(640px 420px at 50% 40%, #000 20%, transparent 75%)',
                pointerEvents: 'none',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -140,
                right: -80,
                width: 360,
                height: 360,
                borderRadius: 999,
                background: 'rgba(1,142,232,0.22)',
                filter: 'blur(70px)',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: -160,
                left: -60,
                width: 360,
                height: 360,
                borderRadius: 999,
                background: 'rgba(15,174,192,0.18)',
                filter: 'blur(70px)',
              }}
            />

            <div style={{ position: 'relative' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                <span style={{ width: 30, height: 1.5, background: 'var(--gradient)', borderRadius: 2 }} />
                Pilot access
                <span style={{ width: 30, height: 1.5, background: 'var(--gradient)', borderRadius: 2 }} />
              </span>
              <h2
                style={{
                  color: '#fff',
                  fontSize: 'clamp(2rem, 4.4vw, 2.9rem)',
                  maxWidth: 680,
                  margin: '22px auto 0',
                }}
              >
                Limited early access for{' '}
                <span className="serif-accent" style={{ color: '#9fd8ff' }}>
                  content creators & freelancers
                </span>
              </h2>
              <p style={{ marginTop: 18, fontSize: '1.07rem', color: 'rgba(255,255,255,0.78)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
                We are currently onboarding a limited number of early users to refine the service
                orchestration experience.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 }}>
                <a href="#contact" className="btn btn-light">
                  Join Pilot Access <ArrowRight size={16} strokeWidth={2.5} />
                </a>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    color: 'rgba(255,255,255,0.92)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    padding: '14px 22px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.22)',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <PhoneCall size={16} strokeWidth={2.2} /> Prefer a call? We are happy to talk
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
