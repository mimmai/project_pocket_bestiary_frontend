import { useRef } from "react";
import './Avatar.css'
import '../../Form/Form.css'

export default function AvatarPopup({ onUpdateAvatar }) {
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!avatarRef.current) return;

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
   }

  return (
    <form
      className="popup__form form form__login form__avatar"
      id="form-avatar"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form__title">Cambiar foto del Perfil</h2>

      <input
        className="form__input form__input-neon form__input-avatar"
        name="avatar"
        placeholder="Enlace a tu nueva foto de perfil"
        id="input-image"
        required
        type="url"
        ref={avatarRef}
      />

      <span className="form__error" id="input-image-error"></span>

      <button type="submit" className="form__button form__btn-neon form__button-avatar">
        Guardar
      </button>
    </form>
  );
}