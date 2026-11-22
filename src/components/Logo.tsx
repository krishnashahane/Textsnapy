export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#f5d547" />
      <path d="M8 10h16M8 16h5M19 16h5M8 22h16" stroke="#141210" strokeWidth="2.6" strokeLinecap="round" opacity=".35" />
      <rect x="12" y="13" width="8" height="6" rx="1" fill="#141210" />
    </svg>
  )
}
