import { useState } from "react";
import './Main.css'
import ImagePopup from "../Forms/ImagePopup/ImagePopup";
import Card from "./components/Card/Card";
import DetailPopup from "./components/DetailPopup/DetailPopup";
import { Link } from "react-router-dom";
import AboutPopup from "../About/About";
import ConfirmationPopup from "./components/ConfirmationPopup/ConfirmationPopup";
import Preloader from "../Preloader/Preloader";
import { getEvolutionChainLinear3 } from "../../utils/PokeApi";


function Main({ 
  cards = [], 
  onOpenPopup, 
  onAddToTeam, 
  isLoading = false, 
  error = "", 
  onShowMore,
  onSearch, }) {

  const visibleCards = Array.isArray(cards) ? cards : [];
const canShowMore = typeof onShowMore === "function";


  function handleImageClick(card) {
    onOpenPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }

   function handleDetailClick(card) {
  //  abrir popup con loader inmediatamente
  onOpenPopup({
    title: `Evolución: ${card.name}`,
    children: (
    <div className="popup__form form form__details">
      <Preloader />
    </div>
    ),
  });

  // luego cargar y reemplazar contenido del popup
  getEvolutionChainLinear3(card._id || card.name)
    .then((chain) => {
      onOpenPopup({
        title: `Evolución: ${card.name}`,
        children: <DetailPopup chain={chain} />,
      });
    })
    .catch(() => {
      // si falla, igual mostramos el popup pero vacío
      onOpenPopup({
        title: `Evolución: ${card.name}`,
        children: <DetailPopup chain={[]} />,
      });
    });
}

  function handleAboutClick() {
    onOpenPopup({
      title: "About me",
      children: <AboutPopup />,
    });
  }

  function handlePokeballClick(card) {
    onOpenPopup({
      title: "Agregar al team",
      children: ({ onClose }) => (
        <ConfirmationPopup
          title="Agregar Pokémon"
          message="¿Deseas agregar este Pokémon a tu team?"
          confirmText="Sí"
          onConfirm={() => {
            if (typeof onAddToTeam === "function") onAddToTeam(card);
          }}
          onClose={onClose}
        />
      ),
    });
  }

  const [search, setSearch] = useState("");

    function handleSearchSubmit(e) {
  e.preventDefault();
  if (!search.trim()) return;
  if (typeof onSearch === "function") 
  onSearch(search);
  setSearch("");
}

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">

        <form className="profile__search" onSubmit={handleSearchSubmit}>
          <input
          className="profile__search-input"
          type="text"
          placeholder="Buscar Pokémon por nombre o número..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
            />
            <button className="profile__search-button" type="submit">
              Buscar
            </button>
          </form>

          <div className="profile__actions">
            <button
              className="profile__action-button"
              type="button"
              onClick={handleAboutClick}
            >
              About Author
            </button>
            <Link className="profile__action-button" to="/team">
              My Team
            </Link>
          </div>
        </div>
      </section>

      <section className="cards">
        {error && <p className="cards__error">{error}</p>}
        {/* PRELOADER */}
        {isLoading ? (
         <div className="cards__loader">
        </div>
        ) : (
          <>
            <ul className="cards__list">
              {visibleCards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onImageClick={handleImageClick}
                  onDetailsClick={handleDetailClick}
                  onCardLike={() => {}}
                  onCardDelete={() => {}}
                  onPokeballClick={handlePokeballClick}
                />
              ))}
            </ul>

            {canShowMore && (
              <button
                type="button"
                className="cards__more-button"
                onClick={onShowMore}
                disabled={isLoading}
              >
                Mostrar más
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Main;