import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'What Sivan does', href: '#what' },
  { label: 'How it works', href: '#how' },
  { label: 'Transparency', href: '#structure' },
  { label: 'Payouts', href: '#payouts' },
  { label: 'Contact', href: '#contact' },
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
          <a href="#contact" className="btn btn-primary nav-cta">
            Request Pilot Access <ArrowRight size={16} strokeWidth={2.5} />
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
            href="#contact"
            className="btn btn-primary"
            style={{ marginTop: 18, width: '100%' }}
            onClick={() => setOpen(false)}
          >
            Request Pilot Access <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      )}
    </header>
  )
}
