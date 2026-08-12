import { Wallet, HandCoins, ShieldCheck } from 'lucide-react'

const AUDIENCES = [
  { icon: Wallet, title: 'Freelancers', text: 'Independent service sellers' },
  { icon: HandCoins, title: 'Providers', text: 'WhatsApp-based service businesses' },
  { icon: ShieldCheck, title: 'Agencies', text: 'Small teams managing client work' },
]

export default function Audience() {
  return (
    <div className="container" style={{ position: 'relative', marginTop: 96 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
        }}
        className="audience-grid"
      >
        {AUDIENCES.map((c, i) => (
          <div
            key={c.title}
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
              padding: '34px 36px',
              borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
              transition: 'background-color 0.2s ease',
            }}
            className="audience-item"
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(3,123,223,0.045)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span
              style={{
                display: 'inline-flex',
                padding: 12,
                borderRadius: 13,
                background: 'var(--soft)',
                border: '1px solid var(--line)',
                color: 'var(--primary)',
                flexShrink: 0,
              }}
            >
              <c.icon size={21} strokeWidth={1.9} />
            </span>
            <span>
              <span style={{ display: 'block', fontWeight: 800, color: 'var(--ink)', fontSize: '1.02rem' }}>
                {c.title}
              </span>
              <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.92rem', marginTop: 6 }}>
                {c.text}
              </span>
            </span>
          </div>
        ))}
      </div>
      <p
        style={{
          textAlign: 'center',
          color: 'var(--muted)',
          fontSize: '0.95rem',
          marginTop: 22,
          fontWeight: 600,
        }}
      >
        Built for small businesses operating on WhatsApp, with structured records for terms,
        provider references, delivery updates, and dispute review.
      </p>

      <style>{`
        @media (max-width: 900px) {
          .audience-grid { grid-template-columns: 1fr !important; }
          .audience-item { border-left: none !important; border-bottom: 1px solid var(--line) !important; padding: 26px 28px !important; }
          .audience-item:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  )
}
