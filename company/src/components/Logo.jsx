/**
 * Sivan lockup — brand mark + display wordmark, matching the main site header
 * (mark glyph on the left, "Sivan" set in Syne). `variant` is kept for API
 * compatibility with earlier usage.
 */
export default function Logo({ variant = 'light', height = 30, showWordmark = true, className = '' }) {
  const markSize = height
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(height * 0.4),
        lineHeight: 1,
      }}
    >
      <img
        src="/sivan-mark.png"
        alt=""
        aria-hidden
        style={{ height: markSize, width: 'auto', display: 'block' }}
      />
      {showWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: height * 0.62,
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
          }}
        >
          Sivan
        </span>
      )}
      <span className="sr-only" style={{ display: 'none' }}>
        Sivan — WhatsApp-based service agreement coordination
      </span>
    </span>
  )
}
