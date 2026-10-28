import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function Pilot() {
  return (
    <section id="pilot" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <Reveal>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              padding: '64px 48px',
              textAlign: 'center',
            }}
          >
            <div
              aria-hidden
              className="grid-bg"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.7,
                maskImage: 'radial-gradient(620px 380px at 50% 40%, #000 20%, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(620px 380px at 50% 40%, #000 20%, transparent 78%)',
                pointerEvents: 'none',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(760px 340px at 50% 0%, rgba(0,242,254,0.12), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative' }}>
              <span className="pill">
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }} />
                Pilot access · Limited capacity
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.9rem)',
                  maxWidth: 720,
                  margin: '22px auto 0',
                  fontWeight: 600,
                  lineHeight: 1.05,
                }}
              >
                Limited early access for{' '}
                <span className="accent-text">WhatsApp-based service businesses</span>
              </h2>

              <p
                style={{
                  marginTop: 18,
                  fontSize: '0.98rem',
                  color: 'var(--muted)',
                  maxWidth: 560,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  lineHeight: 1.65,
                }}
              >
                We are currently onboarding a limited number of early users to refine the service
                coordination experience.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
                <a href="https://waitlist.sivantech.online/" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Join Pilot Access <ArrowUpRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 620px) {
          .section#pilot { padding-top: 56px; }
        }
      `}</style>
    </section>
  )
}
