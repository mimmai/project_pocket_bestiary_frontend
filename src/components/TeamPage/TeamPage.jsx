//import "./TeamPage.css";

const SLOTS = Array.from({ length: 6 }, (_, i) => i + 1);

export default function TeamPage() {

    //mock temporal borrar despues de conectar la api
    const team = [];

    return(
        <main className="team__trainer">
         {/* Bloque superior perfil */}
        <section className="team__trainer team__trainer-perfil">
            <div className="team__trainer-avatar"/>
        <div className="team__trainer-card">

            <div>
                <h2 className="team__trainer-name">Tu equipo</h2>
                <p className="team__trainer-description">
                    Arma tu team Pokemón
                </p>
            </div>
            <button 
            className="team__trainer-btn-perfil"
            type="button"
            >+</button>
        </div>
        </section>

        <section className="team__cards">
            {SLOTS.map((slot) => {
                const pokemon = team.find(p =>p.slot === slot);

                if (!pokemon) {
                    return (
                        <button 
                        key={slot}
                        className="team__slot team__slot-empty"
                        type="button"
                        >
                            <span className="team__plus">+</span>
                        </button>
                    )
                }

                return (
                    <article 
                    key={slot}
                    className="team__slot team__slot-filled">
                        {/* info de stats pokemon para poner later*/}
                    </article>
                )
            })}
        </section>
        </main>
    )
}