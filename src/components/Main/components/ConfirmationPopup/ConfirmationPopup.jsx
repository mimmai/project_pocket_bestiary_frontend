export default function ConfirmationPopup({
    title = "Confirmación",
    message = "¿Deseas continuar?",
    confirmText = "Sí",
    onConfirm,
    onClose,
}) {

    function handleSubmit(e) {
        e.preventDefault();

    if (typeof onConfirm === "function") {
    onConfirm();
        }

    if (typeof onClose === "function") {
    onClose();
    }
}

    return (
    <form className="popup__form form form__login" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">{title}</h2>

        <p className="form__text">{message}</p>

        <button type="submit" className="form__button form__btn-neon">
        {confirmText}
        </button>
    </form>
    );
}