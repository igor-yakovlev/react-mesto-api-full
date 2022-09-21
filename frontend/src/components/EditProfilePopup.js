import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const initialValue = { 
  name: "", 
  description: "" 
}

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const user = React.useContext(CurrentUserContext);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (user) {
      setValue((state) => ({
        ...state,
        name: user.name,
        description: user.about,
      }));
    }
  }, [user, onClose]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValue((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(value);
  };

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"user-info"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field" htmlFor="name">
        <input
          type="text"
          name="name"
          value={value.name}
          onChange={handleChange}
          id="name-input"
          className="popup__input"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-input-error" className="popup__error"></span>
      </label>
      <label className="popup__form-field" htmlFor="description">
        <input
          type="text"
          name="description"
          value={value.description}
          onChange={handleChange}
          id="description-input"
          className="popup__input"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="description-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
