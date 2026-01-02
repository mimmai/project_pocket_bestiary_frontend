import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {new Date().getFullYear()} Pocket Bestiary</p>
    </footer>
  )
}

export default Footer