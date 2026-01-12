
//import { useContext } from "react";
//import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function Card({ 
    card, 
    onCardLike, 
    onCardDelete, 
    onImageClick, 
    onDetailsClick,
    onPokeballClick, } ) {

        console.log("✅ Card.jsx correcto renderizado");
    const { name, link } = card;

    //ESTO DESESTRUCTURA CURRENTUSER DEL CONTEXTO
    //const { currentUser } = useContext(CurrentUserContext)
    //console.log('currentUser:', currentUser)

    //PARA VERIFICAR QUE EL USARIO ES DUEÑO DE LA TARJETA?
   //const isOwn = card?.owner?._id === currentUser?._id;


    //ESTE MUESTRA EL BOTON ELIMINAR SOLO SI ES EL DUEÑO
   // const cardDeleteButtonClassName = `card__trash-button ${
     //   isOwn ? 'card__trash-button-visible': 'card__trash-button_hidden'
    //}`  
    
   // const isLiked = (typeof card.isLiked !== 'undefined')
 // ? card.isLiked
 // : (currentUser && card.likes ? card.likes.some(user => user._id === currentUser._id) : false);
    

  //  const _cardLikeButtonClassName = `card__like-button ${
  //  isLiked ? 'card__like-button-active' : ''
//}`; 

    function _handleLikeCLick() {
        console.log('Card.jsx -> click', card._id, 'prop card.isLiked =', card.isLiked);
        onCardLike(card);
    }

    function _handleCardDelete() {
       // console.log('Funciona le boton?')
        onCardDelete(card)
    }
    console.log(card);

    // helpers para stats desde PokeAPI
    const getBaseStat = (statName) => {
    const s = card.stats?.find((x) => x.stat?.name === statName);
    return typeof s?.base_stat === "number" ? s.base_stat : "-";
    };

    const hp = getBaseStat("hp");
    const def = getBaseStat("defense");
    const spd = getBaseStat("speed");

    const mainAbility =
    card.abilities?.find((a) => !a.is_hidden)?.ability?.name ||
    card.abilities?.[0]?.ability?.name ||
    "-";

    const abilityLabel =
    mainAbility === "-"
        ? "-"
        : String(mainAbility).replaceAll("-", " ");

    const handlePokeball = () => {
    // Si aún no conectas el handler desde la API/estado, no rompe
    if (typeof onPokeballClick === "function") {
        onPokeballClick(card);
    } else {
        console.log("🟡 Pokeball click (sin handler)", card?.name);
    }
    };

    return (
    <li className="card">
        <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(card)}
    />

    <div className="card__content">
        <h2 className="card__title">{name}</h2>

        <div className="card__types">
            {card.types?.map((t) => (
            <span
                key={t.type.name}
                className={`card__type card__type--${t.type.name}`}
            >
                {t.type.name}
            </span>
            ))}
        </div>

        {/* STATS EN CUADRADITOS (2 POR FILA) */}
        <div className="card__stats">
            <div className="card__stat">
            <span className="card__stat-value">
                {typeof card.height === "number" ? card.height / 10 : "-"} m
            </span>
            <span className="card__stat-label"></span>
        </div>

            <div className="card__stat">
            <span className="card__stat-value">
                {typeof card.weight === "number" ? card.weight / 10 : "-"} kg
            </span>
            <span className="card__stat-label"></span>
        </div>

        <div className="card__stat">
            <span className="card__stat-value">{hp}</span>
            <span className="card__stat-label">HP</span>
        </div>

        <div className="card__stat">
            <span className="card__stat-value">{def}</span>
            <span className="card__stat-label">DEF</span>
        </div>

        <div className="card__stat">
            <span className="card__stat-value">{spd}</span>
            <span className="card__stat-label">SPD</span>
        </div>

          {/* Habilidad full width */}
        <div className="card__stat card__stat--full">
            <span className="card__stat-value card__stat-value--text">
                {abilityLabel}
            </span>
            <span className="card__stat-label"></span>
            </div>
        </div>

        <div className="card__actions">
            <button
            className="card__details-btn"
            type="button"
            onClick={() => onDetailsClick(card)}
        >
            Evolución
            </button>

        <button
            className="card__pokeball-btn"
            type="button"
            aria-label="Acción Pokéball"
            onClick={handlePokeball}
        >
            <img
                className="card__pokeball-icon"
                src="/images/Favorites.png"
                alt=""
            />
            </button>
        </div>
        </div>
    </li>
    );
}

/*<div className="card__description">
                <button 
                aria-label='Like card'
                className={cardLikeButtonClassName}
                onClick={handleLikeCLick}
                type="button"></button> 
                
                 <button 
                aria-label='Delete card'
                type="button" 
                className={cardDeleteButtonClassName}
                onClick={handleCardDelete}
                ></button>*/