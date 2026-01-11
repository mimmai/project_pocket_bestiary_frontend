export default function Popup(props) {
    
    const { onClose, title, children, isOpen } = props;
    return (
   
<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
    <div className={`popup__content ${!title ? 'popup__content_content_image' : ""}`}>
        <button
        aria-label='close modal'
        className="popup__close"
        type="button"
        onClick={onClose}
        />
        {children}
    </div>
    </div>
    )
}