import { Wallet, ShieldCheck, Zap, Landmark, ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FLOW = [
  { icon: Wallet, label: 'Buyer', title: 'Sends stablecoins on Avalanche' },
  { icon: ShieldCheck, label: 'Provider Rails', title: 'Routes supported stablecoins' },
  { icon: Zap, label: 'Off-Ramp', title: 'Stablecoin → bank settlement' },
  { icon: Landmark, label: 'Seller', title: 'Receives local currency to bank' },
]

const CHIPS = ['Avalanche C-Chain', 'USDC', 'USDT', 'NGN coming soon']

export default function Avalanche() {
  return (
    <section id="avalanche" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <Reveal>
          <div className="head-split">
            <div>
              <span className="eyebrow">06 / Built on Avalanche · Avalanche C-Chain first</span>
              <h2 className="section-title">
                Stablecoin payments. Local bank payouts{' '}
                <span className="accent-text">coming next</span>
              </h2>
            </div>
            <p className="lead">
              Sivan is prioritizing Avalanche C-Chain as the first public network for its
              stablecoin settlement rails. The first rollout focuses on supported stablecoins
              such as USDC and USDT on Avalanche, with NGN bank settlement planned as partnership
              work is finalized.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="cells flow-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {FLOW.map((f, i) => (
              <div key={f.label} style={{ position: 'relative', background: 'var(--card)', padding: '26px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span className="label" style={{ fontSize: 9 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color: 'var(--primary-deep)' }}>
                    <f.icon size={18} strokeWidth={1.7} />
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', marginTop: 30 }}>
                  {f.label}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 7, lineHeight: 1.55 }}>
                  {f.title}
                </div>
                {i < FLOW.length - 1 && (
                  <span
                    aria-hidden
                    className="flow-arrow"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: -11,
                      zIndex: 2,
                      width: 21,
                      height: 21,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--background)',
                      border: '1px solid var(--border)',
                      color: 'var(--primary-deep)',
                    }}
                  >
                    <ArrowRight size={11} strokeWidth={2.5} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
            {CHIPS.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
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
