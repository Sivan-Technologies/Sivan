import { Wallet, ShieldCheck, Zap, Landmark, ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FLOW = [
  {
    icon: Wallet,
    title: 'Buyer',
    text: 'Sends payment',
    accent: 'linear-gradient(135deg, #037bdf, #018ee8)',
  },
  {
    icon: ShieldCheck,
    title: 'Payment rails',
    text: 'Routes payments securely',
    accent: 'linear-gradient(135deg, #018ee8, #0faec0)',
  },
  {
    icon: Zap,
    title: 'Offramp',
    text: 'Payment to bank settlement',
    accent: 'linear-gradient(135deg, #0faec0, #0d8fb0)',
  },
  {
    icon: Landmark,
    title: 'Seller',
    text: 'Receives local currency to bank',
    accent: 'linear-gradient(135deg, #0d8fb0, #34c77b)',
  },
]

const CHIPS = ['Secure payouts', 'Local bank payouts', 'NGN supported']

export default function Payouts() {
  return (
    <section id="payouts" className="section" style={{ background: 'linear-gradient(180deg, #fff 0%, #edf5fc 100%)' }}>
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <span className="eyebrow">Bank payouts</span>
            <h2 className="section-title">
              Offramp to your bank,{' '}
              <span className="serif-accent">coordinated end to end</span>
            </h2>
            <p className="lead">
              Payments and payouts are routed through secure third-party rails and settled
              directly to the seller&rsquo;s bank account.
            </p>
          </div>
        </Reveal>

        {/* Flow */}
        <Reveal delay={120}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
              alignItems: 'stretch',
            }}
            className="flow-grid"
          >
            {FLOW.map((f, i) => (
              <div key={f.title} style={{ position: 'relative', display: 'flex' }}>
                <div
                  className="card"
                  style={{
                    padding: 30,
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: 14,
                      borderRadius: 15,
                      background: f.accent,
                      color: '#fff',
                      boxShadow: '0 16px 30px -12px rgba(3,123,223,0.45)',
                    }}
                  >
                    <f.icon size={24} strokeWidth={1.9} />
                  </span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)', marginTop: 16 }}>
                    {f.title}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 6 }}>{f.text}</div>
                </div>
                {i < FLOW.length - 1 && (
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
                      zIndex: 2,
                    }}
                    className="flow-arrow"
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Chips */}
        <Reveal delay={220}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 36 }}>
            {CHIPS.map((c) => (
              <span
                key={c}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 999,
                  padding: '10px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 34 }}>
            <a href="#contact" className="btn btn-primary">
              Request Pilot Access <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .flow-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .flow-arrow { display: none !important; }
        }
        @media (max-width: 560px) {
          .flow-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
