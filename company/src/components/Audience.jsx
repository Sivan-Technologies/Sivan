import { Wallet, HandCoins, ShieldCheck } from 'lucide-react'

const AUDIENCES = [
  { n: '01', icon: Wallet, title: 'Freelancers', text: 'Independent service sellers' },
  { n: '02', icon: HandCoins, title: 'Providers', text: 'WhatsApp-based service businesses' },
  { n: '03', icon: ShieldCheck, title: 'Agencies', text: 'Small teams managing client work' },
]

export default function Audience() {
  return (
    <div className="container" style={{ position: 'relative' }}>
      <div className="cells audience-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {AUDIENCES.map((c) => (
          <div key={c.title} className="audience-item" style={{ padding: '28px 26px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="label" style={{ fontSize: 10 }}>{c.n}</span>
              <span className="icon-box" style={{ width: 30, height: 30 }}>
                <c.icon size={15} strokeWidth={1.9} />
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: 'var(--foreground)',
                fontSize: '1.12rem',
                marginTop: 26,
              }}
            >
              {c.title}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: 8 }}>{c.text}</div>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '0.82rem',
          letterSpacing: '0.01em',
          marginTop: 18,
          lineHeight: 1.7,
          color: 'var(--muted)',
        }}
      >
        Built for small businesses operating on WhatsApp, with structured records for terms,
        provider references, delivery updates, and dispute review.
      </p>

      <style>{`
        @media (max-width: 900px) {
          .audience-grid { grid-template-columns: 1fr !important; }
          .audience-item { padding: 24px 22px !important; }
        }
      `}</style>
    </div>
  )
}
