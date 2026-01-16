import { useState } from "react";
import "./Header.css";

const TYPES = [
  { id: "fire", label: "Fire", icon: "/Icon/fire_type.svg" },
  { id: "water", label: "water", icon: "/Icon/water_type.svg" },
  { id: "grass", label: "grass", icon: "/Icon/leaf_new_type.svg" },
  { id: "electric", label: "electric", icon: "/Icon/electric_type.svg" },
  { id: "psychic", label: "psychic", icon: "/Icon/psychic_type.svg" },
  { id: "dark", label: "dark", icon: "/Icon/dark_type.svg" },
  { id: "dragon", label: "dragon", icon: "/Icon/dragon_type.svg" },
];

function Header({ email, onSignOut, onLoginClick, onTypeSelect }) {
  const loggedIn = !!email;
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  return (
    <header className="header page__section">
      <img
        src="/images/meow_icon.png"
        alt="Pocket Bestiary"
        className="header__logo"
      /> PocketBestiary
      <div className="header__right">
    
        <button
          type="button"
          className="header__btn-neon header__types-toggle"
          onClick={() => setIsTypeOpen((v) => !v)}
          aria-expanded={isTypeOpen}
        >
          Filtro
        </button>

        {!loggedIn ? (
          <button
            type="button"
            className="header__btn-filter"
            onClick={onLoginClick}
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            type="button"
            className="header__btn-filter"
            onClick={onSignOut}
          >
            Cerrar sesión
          </button>
        )}
      </div>

      {/* Este boton aparece solo en mobile creo */}
      <nav className={`header__types ${isTypeOpen ? "header__types--open" : ""}`}>
        {TYPES.map((type) => (
          <button
            key={type.id}
            className={`header__type header__btn-filter header__type--${type.id}`}
            onClick={() => onTypeSelect(type.id)}
            type="button"
          >
          <img 
          src={type.icon}
          alt=""
          aria-hidden="true"
          className="header__type-icon"
          />
          <span className="header__type-label">{type.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;