/** Renders the Sivan logo. `variant` picks light or dark background usage. */
export default function Logo({ variant = 'light', height = 44, className = '' }) {
  return (
    <img
      src={variant === 'dark' ? '/sivan-logo-dark.png' : '/sivan-logo.png'}
      alt="Sivan — WhatsApp-based service orchestration"
      height={height}
      className={className}
      style={{ height, width: 'auto', display: 'block' }}
    />
  )
}
