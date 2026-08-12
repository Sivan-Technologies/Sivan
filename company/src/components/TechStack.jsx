import Reveal from './Reveal.jsx'

const STACK = [
  'React', 'Vue', 'Node.js', 'TypeScript', 'Python', '.NET', 'Java', 'PHP / Laravel',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
  'SharePoint', 'Microsoft 365', 'Keycloak / SSO', 'Figma', 'GitHub', 'CI / CD',
]

export default function TechStack() {
  return (
    <section className="section" style={{ padding: '88px 0', background: 'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div className="section-head center" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Built with modern stacks</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              Modern tools, proven foundations
            </h2>
            <p className="lead" style={{ fontSize: '1.02rem' }}>
              We choose the right technology for each project and we are fluent in the platforms
              your team may already use.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {STACK.map((t) => (
              <span key={t} className="chip" style={{ padding: '11px 21px', fontSize: '0.9rem' }}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
