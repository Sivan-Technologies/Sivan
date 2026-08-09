import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle2, Clock } from 'lucide-react'
import Reveal from './Reveal.jsx'

const DETAILS = [
  { icon: MapPin, label: 'Visit us', value: 'No 4, Olayinka Awo, Byzahin, Kubwa, Abuja, Nigeria' },
  { icon: Phone, label: 'Call us', value: '+234 913 671 7403' },
  { icon: Mail, label: 'Email us', value: 'support@sivantech.online' },
]

const SERVICES = [
  'Service orchestration',
  'Offramp / bank payouts',
  'Both',
  'Something else',
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: SERVICES[0], message: '' })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'start' }} className="contact-grid">
          <Reveal>
            <div>
              <span className="eyebrow">Request Pilot Access</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)' }}>
                Tell us about{' '}
                <span className="serif-accent">what you do</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.05rem' }}>
                We are onboarding a limited number of early users to refine the service
                orchestration experience. Tell us what you need and we will get back to you
                within one business day.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 38 }}>
                {DETAILS.map((d) => (
                  <div
                    key={d.label}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'center',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: 16,
                      padding: '18px 22px',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        padding: 11,
                        borderRadius: 12,
                        background: 'var(--soft)',
                        border: '1px solid var(--line)',
                        color: 'var(--primary)',
                        flexShrink: 0,
                      }}
                    >
                      <d.icon size={19} strokeWidth={1.9} />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
                        {d.label}
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: '#eefaf3',
                  border: '1px solid #d3eedd',
                  borderRadius: 14,
                  padding: '14px 18px',
                  color: '#157a45',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                }}
              >
                <Clock size={18} strokeWidth={2} style={{ flexShrink: 0 }} />
                Every request receives a response within one business day.
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="contact-form"
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                padding: 42,
              }}
            >
              {sent ? (
                <div style={{ textAlign: 'center', padding: '64px 20px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: 18,
                      borderRadius: 999,
                      background: '#eefaf3',
                      color: 'var(--green)',
                    }}
                  >
                    <CheckCircle2 size={42} strokeWidth={1.8} />
                  </span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: 24 }}>Request received</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 12, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                    Thank you{form.name ? `, ${form.name}` : ''} — we have received your request
                    and will be in touch within one business day.
                  </p>
                  <button className="btn btn-ghost" style={{ marginTop: 28 }} onClick={() => setSent(false)}>
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'grid', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <Field label="Full name" required>
                      <input name="name" required value={form.name} onChange={handle} placeholder="Your name" autoComplete="name" />
                    </Field>
                    <Field label="Email address" required>
                      <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@company.com" autoComplete="email" />
                    </Field>
                  </div>
                  <Field label="Phone (optional)">
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+234 ..." autoComplete="tel" />
                  </Field>
                  <Field label="What do you need?">
                    <select name="service" value={form.service} onChange={handle}>
                      {SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tell us about your business" required>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handle}
                      placeholder="What jobs or services do you offer, and how do you currently connect with clients?"
                    />
                  </Field>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px 26px' }}>
                    Request Pilot Access <Send size={16} strokeWidth={2.2} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, children, required }) {
  return (
    <label style={{ display: 'grid', gap: 7 }}>
      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>
        {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
      </span>
      {children}
    </label>
  )
}
