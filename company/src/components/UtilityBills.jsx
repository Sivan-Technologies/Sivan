import {
  Smartphone,
  Wifi,
  Zap,
  Tv,
  Router,
  Droplets,
  GraduationCap,
  Globe2,
  BadgeCheck,
  ReceiptText,
} from 'lucide-react'
import Reveal from './Reveal.jsx'

const BILLS = [
  { n: '01', icon: Smartphone, title: 'Airtime top-up', meta: 'MTN · Airtel · Glo · 9mobile' },
  { n: '02', icon: Wifi, title: 'Data bundles', meta: 'Daily · weekly · monthly plans' },
  { n: '03', icon: Zap, title: 'Electricity — NEPA bills', meta: 'Prepaid & postpaid meters' },
  { n: '04', icon: Tv, title: 'Cable TV', meta: 'DStv · GOtv · StarTimes · Showmax' },
  { n: '05', icon: Router, title: 'Internet & broadband', meta: 'Spectranet · Smile · ipNX · fibre' },
  { n: '06', icon: Droplets, title: 'Water & waste bills', meta: 'State water boards · sanitation' },
  { n: '07', icon: GraduationCap, title: 'School fees & exam pins', meta: 'WAEC · NECO · JAMB · school fees' },
  { n: '08', icon: Globe2, title: 'Online & business bills', meta: 'Hosting · domains · subscriptions' },
]

const RECEIPT = [
  { k: 'Airtime', v: 'MTN', a: '₦2,000' },
  { k: 'Electricity', v: 'Prepaid meter', a: '₦15,000' },
  { k: 'Data', v: '10GB monthly', a: '₦5,000' },
]

const POINTS = [
  { icon: BadgeCheck, label: 'Paid through licensed providers' },
  { icon: ReceiptText, label: 'Every bill kept in your Sivan record' },
]

export default function UtilityBills() {
  return (
    <section id="bills" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <Reveal>
          <div className="head-split">
            <div>
              <span className="eyebrow">02 / Utility bills</span>
              <h2 className="section-title">
                Utility bills, handled in the{' '}
                <span className="accent-text">same conversation</span>
              </h2>
            </div>
            <p className="lead">
              Sivan also handles the everyday bills that keep people and small businesses
              running — airtime, data, electricity, cable TV and more. Pay them on their own,
              or attach them to a service agreement when they are part of the job.
            </p>
          </div>
        </Reveal>

        <div className="cells bills-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {BILLS.map((b, i) => (
            <Reveal key={b.title} delay={i * 40}>
              <div style={{ height: '100%', padding: '22px 20px 20px', background: 'var(--card)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span className="label" style={{ fontSize: 9 }}>{b.n}</span>
                  <span style={{ color: 'var(--primary-deep)' }}>
                    <b.icon size={18} strokeWidth={1.7} />
                  </span>
                </div>
                <h3 style={{ fontSize: '0.98rem', marginTop: 30, fontWeight: 600, lineHeight: 1.2 }}>
                  {b.title}
                </h3>
                <p
                  className="label"
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.06em',
                    textTransform: 'none',
                    marginTop: 8,
                    lineHeight: 1.5,
                    color: 'var(--muted)',
                  }}
                >
                  {b.meta}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Confirmation panel — mirrors the main site's "smart receipt" block */}
        <Reveal delay={100}>
          <div
            style={{
              marginTop: 28,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
              gap: 44,
              alignItems: 'center',
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              padding: '38px 40px',
            }}
            className="bills-strip"
          >
            <div>
              <span className="label" style={{ fontSize: 10 }}>Bill payments</span>
              <h3
                style={{
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                  marginTop: 14,
                  fontWeight: 600,
                  lineHeight: 1.1,
                }}
              >
                One balance, one record, every bill.
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.94rem', marginTop: 14, maxWidth: 430 }}>
                Each payment returns an instant confirmation and a provider reference, stored
                alongside your agreements — so there is always a record of what was paid, for
                what, and when.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
                {POINTS.map((pt) => (
                  <span
                    key={pt.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: '0.86rem',
                      fontWeight: 500,
                      color: 'var(--slate)',
                    }}
                  >
                    <pt.icon size={14} strokeWidth={2} color="var(--green)" />
                    {pt.label}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
              <div className="panel-head" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary-deep)' }}>
                  <span style={{ width: 6, height: 6, background: 'var(--primary)' }} />
                  Bill payment confirmation
                </span>
                <span className="pill pill-green" style={{ padding: '3px 8px', fontSize: 9 }}>
                  Settled
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
                {RECEIPT.map((r) => (
                  <div key={r.k} style={{ background: 'var(--card)', padding: '14px 16px' }}>
                    <div className="label" style={{ fontSize: 9 }}>{r.k}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginTop: 6 }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{r.v}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '0.92rem',
                          color: 'var(--foreground)',
                        }}
                      >
                        {r.a}
                      </span>
                    </div>
                  </div>
                ))}
                <div style={{ background: 'var(--card)', padding: '14px 16px' }}>
                  <div className="label" style={{ fontSize: 9 }}>Receipt</div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--green)',
                    }}
                  >
                    <BadgeCheck size={12} strokeWidth={2.4} /> Stored
                  </div>
                </div>
              </div>

              <div
                className="label"
                style={{
                  padding: '11px 16px',
                  borderTop: '1px solid var(--border)',
                  fontSize: 9,
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                }}
              >
                Paid through a licensed provider · reference stored
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bills-strip { grid-template-columns: 1fr !important; gap: 30px !important; padding: 28px !important; }
        }
        @media (max-width: 420px) {
          .bills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
