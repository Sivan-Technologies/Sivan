import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'

const LINKS = [
  { label: 'How it works', href: '#workflow' },
  { label: 'Bills', href: '#bills' },
  { label: 'Safety', href: '#operations' },
  { label: 'Pilot', href: '#pilot' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" aria-label="Sivan — home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo height={30} />
        </a>

        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <span
            className="nav-status"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginLeft: 30,
              paddingRight: 24,
              borderRight: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }} />
            Mainnet
          </span>

          <a
            href="https://app.sivantech.online/"
            target="_blank"
            rel="noreferrer"
            className="nav-signin"
            style={{
              marginLeft: 20,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--slate)',
              transition: 'color .16s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-deep)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--slate)')}
          >
            Sign in
          </a>
        </nav>

        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="mobile-menu"
          style={{
            background: 'var(--card)',
            borderTop: '1px solid var(--border)',
            padding: '6px 32px 26px',
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
            onClick={() => setOpen(false)}
          >
            Sign in
          </a>
        </div>
      )}
    </header>
  )
}
