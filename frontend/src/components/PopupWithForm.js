function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          method="post"
          name={`popup_${name}`}
          className="popup__form popup__form_user-info"
          onSubmit={onSubmit}
        >
          <fieldset className="popup__form-set">
            <button
              aria-label="Close popup"
              type="button"
              onClick={onClose}
              className="popup__close-cross"
            ></button>
            {children}
            <button
              aria-label="Submit form"
              type="submit"
              className="popup__button"
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
