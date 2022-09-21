import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"change-avatar"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field" htmlFor="name">
        <input
          ref={avatarRef}
          type="url"
          name="avatar"
          id="link-avatar-input"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="link-avatar-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
