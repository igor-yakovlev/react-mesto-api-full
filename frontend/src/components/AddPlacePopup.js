import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

const initialValue = {
  name: '', 
  link: ''
}


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue)
  }, [isOpen])

  const handleChange = ({target}) => {
    const {name, value} = target;
    setValue(state => ({...state, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: value.name,
      link: value.link,
    });
  };

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-place"}
      buttonText={"Создать"}
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
          id="name-place-input"
          className="popup__input"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span id="name-place-input-error" className="popup__error"></span>
      </label>
      <label className="popup__form-field" htmlFor="name">
        <input
          type="url"
          name="link"
          value={value.link}
          onChange={handleChange}
          id="link-place-input"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="link-place-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
