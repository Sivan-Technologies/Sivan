import { ArrowUpRight, Check, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react'

const BADGES = ['Clear terms', 'Licensed providers', 'No fund custody']

const STATUS_ROWS = [
  { k: 'Agreement', v: 'Terms confirmed', ok: true },
  { k: 'Provider payment', v: 'Processed externally', ok: true },
  { k: 'Delivery', v: 'Service in progress', ok: false },
  { k: 'Completion', v: 'Final confirmation', ok: false },
]

export default function Hero() {
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', background: 'var(--background)' }}>
      {/* Technical grid backdrop, faded toward the bottom */}
      <div
        aria-hidden
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          maskImage: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(820px 460px at 12% 0%, rgba(0,242,254,0.09), transparent 62%), radial-gradient(760px 480px at 92% 18%, rgba(79,172,254,0.11), transparent 66%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container hero-grid"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          gap: 64,
          alignItems: 'center',
          paddingTop: 86,
          paddingBottom: 96,
        }}
      >
        {/* ---------------- Left ----------------
            Note: the eyebrow phrase is intentionally kept out of the <h1> so the
            live-site wording appears once in the headline and once in the paragraph. */}
        <div>
          <span className="pill">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }} />
            Service coordination · Live in Nigeria
          </span>

          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.9rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              marginTop: 26,
            }}
          >
            WhatsApp-based service agreement{' '}
            <span className="accent-text">coordination</span>
          </h1>

          <p className="lead" style={{ marginTop: 24, maxWidth: 560 }}>
            WhatsApp-based service agreement coordination for freelancers and service businesses.
            Sivan helps freelancers, agencies, and small businesses structure service agreements,
            agree on terms, and track delivery through WhatsApp. Payments are processed directly
            through licensed payment providers.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 34 }}>
            <a href="https://waitlist.sivantech.online/" target="_blank" rel="noreferrer" className="btn btn-primary">
              Request Pilot Access <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 26,
              flexWrap: 'wrap',
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid var(--border)',
            }}
          >
            {BADGES.map((b) => (
              <span
                key={b}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: 'var(--slate)',
                }}
              >
                <Check size={13} strokeWidth={3} color="var(--green)" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- Right: agreement console ---------------- */}
        <div style={{ position: 'relative' }}>
          <ChatPreview />
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; padding-top: 56px !important; padding-bottom: 64px !important; }
        }
      `}</style>
    </section>
  )
}

/* ---------------- "Live agreement preview" console ---------------- */
function ChatPreview() {
  return (
    <div className="panel" style={{ background: 'rgba(11,15,25,0.82)', maxWidth: 560, marginLeft: 'auto' }}>
      <div className="panel-head">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--primary-deep)' }}>
          <span style={{ width: 6, height: 6, background: 'var(--primary)' }} />
          Service agreement console
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--muted)' }}>
          <span className="pill pill-green" style={{ padding: '3px 8px', fontSize: 9 }}>
            Active
          </span>
          Live preview
        </span>
      </div>

      {/* Field rows */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
        <div style={{ background: 'var(--card)', padding: '14px 16px' }}>
          <div className="label" style={{ fontSize: 9 }}>Channel</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginTop: 6 }}>WhatsApp</div>
        </div>
        <div style={{ background: 'var(--card)', padding: '14px 16px' }}>
          <div className="label" style={{ fontSize: 9 }}>Agreement value</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginTop: 6 }}>
            ₦20,000 <span className="label" style={{ fontSize: 9 }}>NGN</span>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              maxWidth: '82%',
              background: 'var(--primary)',
              color: '#06080f',
              border: '1px solid var(--primary-deep)',
              padding: '10px 13px',
              fontSize: '0.82rem',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            Create agreement for ₦20,000 to seller for dev design
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div
            style={{
              maxWidth: '82%',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              padding: '10px 13px',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--foreground)',
              lineHeight: 1.5,
            }}
          >
            Confirm this service agreement?
          </div>
        </div>

        <div
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: 'rgba(20,241,149,0.08)',
            border: '1px solid rgba(20,241,149,0.3)',
            color: 'var(--green)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            padding: '6px 11px',
          }}
        >
          YES <CheckCircle2 size={12} strokeWidth={2.5} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div
            style={{
              maxWidth: '88%',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              padding: '10px 13px',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--foreground)',
              lineHeight: 1.55,
            }}
          >
            Agreement created. Seller invited. Payment is processed through a licensed provider.
          </div>
        </div>
      </div>

      {/* Status table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderTop: '1px solid var(--border)' }}>
        {STATUS_ROWS.map((row) => (
          <div key={row.k} style={{ background: 'var(--card)', padding: '12px 14px' }}>
            <div className="label" style={{ fontSize: 9 }}>{row.k}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 6,
                fontSize: '0.78rem',
                fontWeight: 600,
                color: row.ok ? 'var(--green)' : 'var(--slate)',
              }}
            >
              {row.ok ? <Check size={12} strokeWidth={3} /> : <span style={{ width: 12, height: 1, background: 'var(--faint)' }} />}
              {row.v}
            </div>
          </div>
        ))}
      </div>

      <div
        className="label"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          padding: '11px 16px',
          borderTop: '1px solid var(--border)',
          fontSize: 9,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <FileCheck2 size={11} /> Terms confirmed
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <ShieldCheck size={11} /> No fund custody
        </span>
      </div>
    </div>
  )
}
