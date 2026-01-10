import './Navigation.css'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="nav">
      <form className="nav__search" onSubmit={(e) => e.preventDefault()}>
        <input className="nav__input" type="text" placeholder="Buscar Pokémon…" />
        <button className="nav__button" type="submit">Buscar</button>
      </form>

      <div className="nav__actions">
        <Link className="nav__action" to="/pokedex">Pokédex</Link>
        <Link className="nav__action" to="/favorites">Favoritos</Link>
      </div>
    </nav>
  )
}

export default Navigation