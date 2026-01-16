import Preloader from "../../../Preloader/Preloader";
import './DetailPopup.css'
import '../../../Form/Form.css'


export default function DetailPopup({ chain = [], isLoading = false }) {
  const hasData = Array.isArray(chain) && chain.length > 0;

  return (
     <div className="popup__form form form__details">
      <h2 className="form__title">Evolución</h2>

      {isLoading ? (
        <div className="details__loader">
          <Preloader />
        </div>
      ) : !hasData ? (
        <p className="details__empty">Sin datos de evolución.</p>
      ) : (
        <div className="details__chain">
          {chain.map((p, idx) => (
            <div className="details__item" key={p.id ?? `${p.name}-${idx}`}>
              <div className="details__stage">
                <img
                  className="details__sprite"
                  src={p.sprite}
                  alt={p.name}
                />

                <div className="details__name">{p.name}</div>

                <div className="details__stats">
                  <div className="details__stat">
                    ATK <span>{p.atk ?? "-"}</span>
                  </div>
                  <div className="details__stat">
                    SpA <span>{p.spa ?? "-"}</span>
                  </div>
                </div>
              </div>

              {idx < chain.length - 1 && (
                <div className="details__arrow">▶</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}