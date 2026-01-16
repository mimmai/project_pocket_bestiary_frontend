import "./TeamPage.css";
import { Link } from "react-router-dom";
import Card from "../Main/components/Card/Card";
import ImagePopup from "../Forms/ImagePopup/ImagePopup";
import DetailPopup from "../Main/components/DetailPopup/DetailPopup";
import Preloader from "../Preloader/Preloader";
import { getEvolutionChainLinear3 } from "../../utils/PokeApi";

const SLOTS = Array.from({ length: 6 }, (_, i) => i + 1);

export default function TeamPage({ 
    onOpenAvatarPopup, 
    avatarUrl, 
    onOpenProfilePopup, 
    trainer, 
    team, 
    onOpenPopup }) {

    //mock temporal borrar despues de conectar la api
    const avatarStyle = avatarUrl ? { "--trainer-avatar": `url("${avatarUrl}")` } : undefined;
    
    function handleImageClick(card) {
    onOpenPopup({
    title: null,
    children: <ImagePopup card={card} />,
    });
}

    function handleDetailClick(card) {
    onOpenPopup({
    title: `Evolución: ${card.name}`,
    children: (
        <div className="popup__form form form__details">
        <Preloader />
        </div>
    ),
    });

    getEvolutionChainLinear3(card._id || card.name)
    .then((chain) => {
        onOpenPopup({
        title: `Evolución: ${card.name}`,
        children: <DetailPopup chain={chain} />,
        });
    })
    .catch(() => {
        onOpenPopup({
        title: `Evolución: ${card.name}`,
        children: <DetailPopup chain={[]} />,
        });
    });
}
    
    return(
        <main className="team__trainer">
         {/* Bloque superior perfil */}
        <section className="team__trainer team__trainer-perfil">
            <div 
            className="team__trainer-avatar"
            onClick={onOpenAvatarPopup}
            style={avatarStyle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onOpenAvatarPopup()}
            />
        <div className="team__trainer-card">

            <div>
                <h2 className="team__trainer-name">{trainer?.name || "Tu equipo"}</h2>
                <p className="team__trainer-description">
                {trainer?.about || "Arma tu team Pokemón"}
                </p>
            </div>

            <div className="team__trainer-btn-block">
            <button 
            className="team__trainer-btn-perfil"
            type="button"
            onClick={onOpenProfilePopup}
            aria-label="EditarPerfil"
            >+</button>

            <Link
                to="/"
                className="team__trainer-btn-pokedex"
                aria-label="Volver a la Pokédex"
        >
            <img
                src="/images/pokedex-route.png"
                alt="Volver a la Pokédex"
                className="team__trainer-btn-pokedex-image"
            />
            </Link>
            </div>
        </div>
        </section>

        <section className="team__cards">
            <ul className="team__cards-list">
        {SLOTS.map((slot) => {
            const pokemon = team.find((p) => p.slot === slot);

        if (!pokemon) {
        return (
            <li key={slot} className="team__slot team__slot-empty">
            <button type="button" className="team__slot-empty-btn">
                <span className="team__plus">+</span>
            </button>
            </li>
        );
        }

        return (
        <li key={slot} className="team__slot team__slot-filled">
            <Card
            card={pokemon}
            onImageClick={handleImageClick}
            onDetailsClick={handleDetailClick}
            onCardLike={() => {}}
            onCardDelete={() => {}}
            onPokeballClick={() => {}}
        />
        </li>
            );
        })}
    </ul>
        </section>
        </main>
    )
}