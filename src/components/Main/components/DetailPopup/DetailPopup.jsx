export default function DetailPopup({ chain = [] }) {
  if (!Array.isArray(chain) || chain.length === 0) {
    return (
      <div className="popup__form form__details">
        <h2 className="form__title">Evolución</h2>
        <p className="details__empty">Sin datos de evolución.</p>
      </div>
    );
  }

  return (
    <div className="popup__form form form__details">
      <h2 className="form__title">Evolución</h2>

      <div className="details__chain">
        {chain.map((p, idx) => (
          <div className="details__item" key={p.id ?? `${p.name}-${idx}`}>
            <div className="details__stage">
              <img className="details__sprite" src={p.sprite} alt={p.name} />
              <div className="details__name" title={p.name}>
                {p.name}
              </div>

              <div className="details__stats">
                <div className="details__stat">
                  ATK <span className="details__stat-value">{p.atk ?? "-"}</span>
                </div>
                <div className="details__stat">
                  SpA <span className="details__stat-value">{p.spa ?? "-"}</span>
                </div>
              </div>
            </div>

            {/* Flecha entre etapas */}
            {idx < chain.length - 1 && (
              <div className="details__arrow" aria-hidden="true">
                ▶
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}