import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'

const SITE = 'https://www.sivantech.online'

const EXPLORE = [
  { label: 'How it works', href: '#workflow' },
  { label: 'Safety', href: '#operations' },
  { label: 'Pitch Deck', href: `${SITE}/docs/Sivan_Pitch_Deck.pdf`, external: true },
]

const LEGAL = [
  { label: 'Terms', href: `${SITE}/legal/terms` },
  { label: 'Privacy', href: `${SITE}/legal/privacy` },
  { label: 'Risk Disclosure', href: `${SITE}/legal/risk-disclosure` },
  { label: 'Data Retention', href: `${SITE}/legal/data-retention` },
  { label: 'AML/KYC', href: `${SITE}/legal/aml-kyc` },
  { label: 'Jurisdictions', href: `${SITE}/legal/supported-jurisdictions` },
  { label: 'Wrong Network', href: `${SITE}/legal/wrong-network` },
  { label: 'Complaints', href: `${SITE}/legal/complaints` },
  { label: 'Cookies', href: `${SITE}/legal/cookies` },
]

const PRODUCT = [
  { label: 'Utility bills', href: '#bills' },
  { label: 'Service agreements', href: '#what' },
  { label: 'Dispute review', href: '#structure' },
  { label: 'Avalanche rails', href: '#avalanche' },
]

function Column({ title, items, external }) {
  return (
    <div>
      <h4 className="label" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted)' }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', display: 'grid', gap: 11, marginTop: 20 }}>
        {items.map((l) => (
          <li key={l.href + l.label}>
            <a
              href={l.href}
              {...(external || l.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
              style={{ fontSize: '0.88rem', color: 'var(--slate)', transition: 'color .15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-deep)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--slate)')}
            >
              {l.label}
              {l.external && (
                <ArrowUpRight size={12} strokeWidth={2.5} style={{ verticalAlign: '-2px', marginLeft: 3 }} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 44 }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <a href="#home" style={{ display: 'inline-block' }} aria-label="Sivan — home">
              <Logo height={30} />
            </a>
            <p
              style={{
                marginTop: 20,
                fontSize: '0.9rem',
                maxWidth: 300,
                lineHeight: 1.7,
                color: 'var(--muted)',
              }}
            >
              WhatsApp-based service agreement coordination for freelancers and service providers.
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <a
                href="https://waitlist.sivantech.online/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '10px 16px', fontSize: 12 }}
              >
                Pilot Access <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }} />
              <span className="label" style={{ fontSize: 9 }}>Live in Nigeria · Mainnet</span>
            </div>
          </div>

          <Column title="Explore" items={EXPLORE} />
          <Column title="Product" items={PRODUCT} />
          <Column title="Legal" items={LEGAL} external />
        </div>

        {/* Disclaimer (verbatim from the live site) */}
        <div
          style={{
            marginTop: 48,
            border: '1px solid var(--border)',
            background: 'var(--panel)',
            padding: '20px 22px',
          }}
        >
          <p style={{ fontSize: '0.76rem', lineHeight: 1.75, color: 'var(--muted)', maxWidth: 1040 }}>
            Sivan Technologies is a technology provider and is not a bank, a financial institution,
            or an authorised provider of crypto-asset services. Stablecoin custody, exchange and
            settlement services are provided by Bridge Ventures LLC (for non-EEA residents) and
            Bridge Building S.A. (for EEA residents), or other regulated service providers, under
            their own terms. Money transmission services for US residents are provided by Bridge
            Building Inc, NMLS #2450917. Naira payment processing is provided by licensed Nigerian
            payment service providers. Sivan does not hold customer funds and does not control
            private keys on behalf of users.
          </p>
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 20,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            © 2026 Sivan Technologies. All rights reserved.
          </span>
          <span
            style={{
              display: 'inline-flex',
              gap: 18,
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
            }}
          >
            <span>Non-custodial</span>
            <span>Licensed providers</span>
            <span>WhatsApp-first</span>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
