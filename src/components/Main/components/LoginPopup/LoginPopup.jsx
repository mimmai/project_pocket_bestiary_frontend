import './LoginPopup.css'
import '../../../Form/Form.css'

export default function LoginPopup({ onLogin }) {
  function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    onLogin({ email, password });
  }

  return (
      <form className="popup__form form form__login" onSubmit={handleSubmit}>
        <h2 className="form__title">Iniciar sesión</h2>

        <input
          className="form__input form__input-neon"
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          className="form__input form__input-neon"
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          minLength="6"
        />

        <button type="submit" className="form__button form__btn-neon">
          Entrar
        </button>
      </form>
  );
}