import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'

const LINKS = [
  { label: 'How it works', href: '#workflow' },
  { label: 'Safety', href: '#operations' },
  { label: 'Pilot', href: '#pilot' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" aria-label="Sivan — home">
          <Logo height={40} />
        </a>

        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a
            href="https://app.sivantech.online/"
            target="_blank"
            rel="noreferrer"
            className="nav-signin"
            style={{
              marginLeft: 12,
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--slate)',
              padding: '9px 14px',
              borderRadius: 10,
              transition: 'color .16s ease, background-color .16s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)'
              e.currentTarget.style.background = 'rgba(3,123,223,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--slate)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Sign in
          </a>
          <a href="https://app.sivantech.online/" target="_blank" rel="noreferrer" className="btn btn-primary nav-cta">
            Open App <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </nav>

        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className="mobile-menu"
          style={{
            background: '#fff',
            borderTop: '1px solid var(--line)',
            padding: '10px 24px 24px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="https://app.sivantech.online/"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'block', padding: '13px 4px', fontWeight: 700, color: 'var(--ink)', borderBottom: '1px solid var(--line)' }}
          >
            Sign in
          </a>
          <a
            href="https://app.sivantech.online/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ marginTop: 18, width: '100%' }}
          >
            Open App <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 920px) {
          .nav-links, .nav-cta, .nav-signin { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
