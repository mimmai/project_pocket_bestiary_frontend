import './ProfilePopup.css'
import '../../../Form/Form.css'
import '../LoginPopup/Loginpopup.css'

export default function ProfilePopup({ onUpdateUser }) {
function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const about = e.target.about.value.trim();

    onUpdateUser({ name, about });
}

    return (
    <form className="popup__form form form__login" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Editar perfil</h2>

    <input
        className="form__input form__input-neon"
        type="text"
        name="name"
        placeholder="Nombre de usuario"
        required
        minLength="2"
        maxLength="40"
    />

    <input
        className="form__input form__input-neon"
        type="text"
        name="about"
        placeholder="Descripción breve"
        required
        minLength="2"
        maxLength="200"
    />

    <button type="submit" className="form__button form__btn-neon">
        Guardar
    </button>
    </form>
    );
}