function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image-place ${card.link !== '' && "popup_opened"}`}>
      <div className="popup__container popup__container_has-image">
        <button
          aria-label="Close popup"
          type="button"
          className="popup__close-cross"
          onClick={onClose}
        ></button>
        <img
          src={card.link}
          alt={card.name}
          className="popup__image"
        />
        <h2 className="popup__description">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
