import './Navigation.css'

function Navigation() {
  return (
    <nav className="nav">
      <form className="nav__search" onSubmit={(e) => e.preventDefault()}>
        <input className="nav__input" type="text" placeholder="Buscar Pokémon…" />
        <button className="nav__button" type="submit">Buscar</button>
      </form>

      <div className="nav__actions">
        <button className="nav__action" type="button">Pokédex</button>
        <button className="nav__action" type="button">Favoritos</button>
      </div>
    </nav>
  )
}

export default Navigation