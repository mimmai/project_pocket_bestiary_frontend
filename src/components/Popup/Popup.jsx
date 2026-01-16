import { useEffect } from "react";
import './Popup.css'

export default function Popup(props) {
    
    const { onClose, title, children, isOpen } = props;

    useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
        if (e.key === "Escape") {
        onClose();
        }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
        document.removeEventListener("keydown", handleEscClose);
    };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
    }
    };

    if (!isOpen) return null;

    return (
    <div
    className="popup"
        onMouseDown={handleOverlayClick}
    >
        <div
        className={`popup__content ${
            !title ? "popup__content_content_image" : ""
        }`}
    >
        <button
            aria-label="close modal"
            className="popup__close"
            type="button"
            onClick={onClose}
        />
        {children}
        </div>
    </div>
    );
}