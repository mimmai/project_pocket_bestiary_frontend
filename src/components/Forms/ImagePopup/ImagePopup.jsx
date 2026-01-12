export default function ImagePopup({ card }) {

    return (
    <>    
    <img 
    className="popup__full-size-image" 
    src={card.link} 
    alt={card.name}
        />
    <p className="popup__title-view-image">{card.name}</p>
        </>
    )
}