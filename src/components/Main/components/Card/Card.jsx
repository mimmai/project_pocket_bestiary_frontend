import './Card.css'
import '../../../Form/Form.css'

export default function Card({ 
    card, 
    onCardLike, 
    onCardDelete, 
    onImageClick, 
    onDetailsClick,
    onPokeballClick, } ) {

        console.log("✅ Card.jsx correcto renderizado");
    const { name, link } = card;

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
    if (typeof onPokeballClick === "function") {
        onPokeballClick(card);
    } else {
        console.log("🟡 Pokeball click (sin handler)", card?.name);
    }
    };

    return (
    <article className="card">
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

        {/* STATS EN CUADRADITOS*/}
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
    </article>
    );
}