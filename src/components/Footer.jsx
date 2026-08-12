import { ArrowUpRight } from 'lucide-react'

const SITE = 'https://www.sivantech.online'

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

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: '#9db0c3' }}>
      <div className="container" style={{ paddingTop: 76, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1.4fr', gap: 44 }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#home" style={{ display: 'inline-block' }}>
              <img src="/sivan-logo-dark.png" alt="Sivan" height={44} style={{ height: 44, width: 'auto' }} />
            </a>
            <p style={{ marginTop: 20, fontSize: '0.95rem', maxWidth: 320, lineHeight: 1.75 }}>
              WhatsApp-based service agreement coordination for freelancers and service providers.
            </p>
            <a
              href="https://app.sivantech.online/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light"
              style={{ marginTop: 24, padding: '11px 20px', fontSize: '0.88rem' }}
            >
              Open Web App <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: 20 }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 12 }}>
              <li>
                <a
                  href="#workflow"
                  style={{ fontSize: '0.92rem', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#operations"
                  style={{ fontSize: '0.92rem', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  Safety
                </a>
              </li>
              <li>
                <a
                  href="#pilot"
                  style={{ fontSize: '0.92rem', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  Pilot
                </a>
              </li>
              <li>
                <a
                  href={`${SITE}/docs/Sivan_Pitch_Deck.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.92rem', fontWeight: 700, color: '#cfe0f0', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#cfe0f0')}
                >
                  Pitch Deck <ArrowUpRight size={13} strokeWidth={2.5} style={{ verticalAlign: '-2px' }} />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: 20 }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }} className="legal-list">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.88rem', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer (verbatim from the live site) */}
        <div
          style={{
            marginTop: 56,
            padding: '22px 0',
            borderTop: '1px solid rgba(255,255,255,0.09)',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'rgba(157,176,195,0.85)', maxWidth: 980 }}>
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
            marginTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            fontSize: '0.86rem',
          }}
        >
          <span>© 2026 Sivan Technologies. All rights reserved.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .legal-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
