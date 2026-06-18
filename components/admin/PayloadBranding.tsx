import logo from '../../saglamfav.png'

const logoSrc = typeof logo === 'string' ? logo : logo.src

export function PayloadIcon() {
  return (
    <img
      src={logoSrc}
      alt="Sağlam Akademi"
      style={{
        display: 'block',
        height: 32,
        width: 32,
        objectFit: 'contain',
      }}
    />
  )
}

export function PayloadLogo() {
  return (
    <img
      src={logoSrc}
      alt="Sağlam Akademi"
      style={{
        display: 'block',
        height: 72,
        maxWidth: 220,
        objectFit: 'contain',
        width: 'auto',
      }}
    />
  )
}
