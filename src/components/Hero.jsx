import { ArrowRight, ArrowUpRight, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react'

const BADGES = ['Clear terms', 'Licensed providers', 'No fund custody']

export default function Hero() {
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', paddingTop: 96, paddingBottom: 0 }}>
      {/* Background: soft mesh + fine grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(760px 460px at 10% -5%, rgba(3,123,223,0.10), transparent 60%), radial-gradient(700px 460px at 92% 8%, rgba(15,174,192,0.09), transparent 60%), radial-gradient(560px 420px at 55% 105%, rgba(52,199,123,0.07), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(11,27,43,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11,27,43,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(720px 520px at 50% 0%, #000 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(720px 520px at 50% 0%, #000 30%, transparent 78%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container hero-grid"
        style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: 64, alignItems: 'center' }}
      >
        {/* Left */}
        <div>
          <span className="eyebrow">WhatsApp-based service agreement coordination</span>

          <h1 style={{ fontSize: 'clamp(3.4rem, 8vw, 5.6rem)', marginTop: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>
            Sivan
          </h1>

          <p className="lead" style={{ fontSize: '1.13rem' }}>
            WhatsApp-based service agreement coordination for freelancers and service businesses.
            Sivan helps freelancers, agencies, and small businesses structure service agreements,
            agree on terms, and track delivery through WhatsApp. Payments are processed directly
            through licensed payment providers.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 38 }}>
            <a href="https://app.sivantech.online/" target="_blank" rel="noreferrer" className="btn btn-primary">
              Open Sivan App <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
            <a href="https://waitlist.sivantech.online/" target="_blank" rel="noreferrer" className="btn btn-ghost">
              Request Pilot Access
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              marginTop: 30,
              alignItems: 'center',
            }}
          >
            {BADGES.map((b) => (
              <span
                key={b}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                <CheckCircle2 size={16} color="var(--green)" strokeWidth={2.5} />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right — chat-style "Live agreement preview" */}
        <div style={{ position: 'relative', padding: '18px 0 26px' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '12%',
              left: '8%',
              right: '8%',
              bottom: '6%',
              borderRadius: 999,
              background: 'linear-gradient(120deg, rgba(3,123,223,0.22), rgba(15,174,192,0.16), rgba(52,199,123,0.14))',
              filter: 'blur(56px)',
              pointerEvents: 'none',
            }}
          />
          <ChatPreview />

          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 18,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              boxShadow: 'var(--shadow-md)',
              padding: '11px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            <FileCheck2 size={15} color="var(--primary)" /> Terms confirmed
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: 14,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              boxShadow: 'var(--shadow-md)',
              padding: '11px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            <ShieldCheck size={15} color="var(--green)" /> No fund custody
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; padding-top: 60px; }
        }
      `}</style>
    </section>
  )
}

/* ---------------- Chat-style "Live agreement preview" ---------------- */
function ChatPreview() {
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #ffffff 0%, #f3f8fd 100%)',
        border: '1px solid var(--line-strong)',
        borderRadius: 22,
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        maxWidth: 540,
        marginLeft: 'auto',
      }}
    >
      {/* Chat header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 18px',
          background: 'rgba(255,255,255,0.85)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: 'linear-gradient(135deg, var(--primary), var(--cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1rem',
            boxShadow: '0 8px 16px -6px rgba(3,123,223,0.5)',
          }}
        >
          S
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--ink)' }}>Sivan</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>
            Live agreement preview
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#157a45',
            background: '#eefaf3',
            border: '1px solid #d3eedd',
            borderRadius: 999,
            padding: '5px 12px',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--green)' }} />
          Active
        </span>
      </div>

      {/* Messages */}
      <div style={{ padding: '18px 18px 10px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 300 }}>
        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              maxWidth: '78%',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-bright))',
              color: '#fff',
              borderRadius: '16px 16px 4px 16px',
              padding: '12px 15px',
              fontSize: '0.86rem',
              fontWeight: 600,
              lineHeight: 1.5,
              boxShadow: '0 10px 22px -10px rgba(3,123,223,0.5)',
            }}
          >
            Create agreement for ₦20,000 to seller for dev design
          </div>
        </div>

        {/* Bot message with confirm */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ maxWidth: '78%' }}>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '4px 16px 16px 16px',
                padding: '12px 15px',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--ink)',
                lineHeight: 1.5,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              Confirm this service agreement?
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                marginTop: 8,
                background: 'var(--gradient)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.78rem',
                borderRadius: 999,
                padding: '8px 18px',
                boxShadow: '0 10px 20px -8px rgba(3,123,223,0.55)',
              }}
            >
              YES <CheckCircle2 size={14} />
            </div>
          </div>
        </div>

        {/* Bot confirmation */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: '4px 16px 16px 16px',
              padding: '13px 15px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.55,
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '78%',
            }}
          >
            Agreement created. Seller invited. Payment is processed through a licensed provider.
          </div>
        </div>

        {/* Status rows */}
        <div
          style={{
            marginTop: 8,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            background: 'rgba(247,250,253,0.9)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: 14,
          }}
        >
          {[
            { k: 'Agreement', v: 'Terms confirmed' },
            { k: 'Provider payment', v: 'Processed externally' },
            { k: 'Delivery', v: 'Service in progress' },
            { k: 'Completion', v: 'Final confirmation' },
          ].map((row) => (
            <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--muted)' }}>{row.k}</span>
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: row.v === 'Terms confirmed' || row.v === 'Processed externally' ? '#157a45' : 'var(--slate)',
                }}
              >
                {row.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
