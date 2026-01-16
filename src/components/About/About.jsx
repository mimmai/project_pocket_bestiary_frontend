import './About.css'
import '../Form/form.css'

export default function AboutPopup() {
  return (
    <div className="popup__form form form__about">
      <h2 className="form__title">About me</h2>

      <p className="form__text">
        Hola! soy Mitzi. Soy chilena, Desarrollador full Stack en formación, buscando aprender acerca del mundo de la tecnología.
        Dentro el bootcamp de TripleTen estoy construyendo Pocket Bestiary (Pokédex) con React y
        Vite. Además de aprender otros como HTML, CSS y Backend como; Node.js, Express, APIs y herramientas como Git y Github.
      </p>
    </div>
  );
}