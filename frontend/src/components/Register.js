import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const initialValue = {
    email: "",
    password: "",
  };

  const [value, setValue] = useState(initialValue);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValue((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = value;
    onRegister(email, password);
  };

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <fieldset className="register__form-set">
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={handleChange}
            className="register__input"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={value.password}
            onChange={handleChange}
            className="register__input"
            placeholder="Пароль"
          />
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
          <p className="register__descr">
            Уже зарегистрированы?{" "}
            <Link className="register__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
