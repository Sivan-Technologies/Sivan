import { MapPin, Phone, Mail, Linkedin, Twitter, Github } from 'lucide-react'

const PLATFORM = [
  'Service orchestration',
  'Terms & confirmations',
  'Payments',
  'Delivery tracking',
  'Dispute review',
]

const COMPANY = [
  { label: 'Home', href: '#home' },
  { label: 'What Sivan does', href: '#what' },
  { label: 'How it works', href: '#how' },
  { label: 'Transparency & Structure', href: '#structure' },
  { label: 'Current scope', href: '#scope' },
  { label: 'Bank payouts', href: '#payouts' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: '#9db0c3' }}>
      <div className="container" style={{ paddingTop: 76, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 44 }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#home" style={{ display: 'inline-block' }}>
              <img src="/sivan-logo-dark.png" alt="Sivan" height={44} style={{ height: 44, width: 'auto' }} />
            </a>
            <p style={{ marginTop: 20, fontSize: '0.95rem', maxWidth: 300, lineHeight: 1.75 }}>
              Sivan bridges content creators and freelancers with the specific jobs they offer
              with clear terms, secure payments, and structured delivery tracking through WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#home"
                  aria-label={s.label}
                  style={{
                    display: 'inline-flex',
                    padding: 10,
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#cfe0f0',
                    transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(3,123,223,0.4)'
                    e.currentTarget.style.borderColor = 'rgba(3,123,223,0.6)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <s.icon size={18} strokeWidth={1.9} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: 20 }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 12 }}>
              {PLATFORM.map((s) => (
                <li key={s}>
                  <a
                    href="#how"
                    style={{ fontSize: '0.92rem', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: 20 }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 12 }}>
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    style={{ fontSize: '0.92rem', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#7cc6ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: 20 }}>Get in touch</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 14 }}>
              <li style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <MapPin size={17} strokeWidth={1.9} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 4 }} />
                <span style={{ fontSize: '0.92rem' }}>
                  No 4, Olayinka Awo, Byzahin, Kubwa,
                  <br />
                  Abuja, Nigeria
                </span>
              </li>
              <li style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <Phone size={17} strokeWidth={1.9} style={{ color: 'var(--green)', flexShrink: 0 }} />
                <a href="tel:+2348000000000" style={{ fontSize: '0.92rem' }}>
                  +234 913 671 7403
                </a>
              </li>
              <li style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <Mail size={17} strokeWidth={1.9} style={{ color: 'var(--green)', flexShrink: 0 }} />
                <a href="mailto:hello@sivan.dev" style={{ fontSize: '0.92rem' }}>
                  support@sivantech.online
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            paddingTop: 26,
            borderTop: '1px solid rgba(255,255,255,0.09)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            fontSize: '0.86rem',
          }}
        >
          <span>© {new Date().getFullYear()} Sivan. All rights reserved.</span>
          <span>WhatsApp-based service orchestration</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
