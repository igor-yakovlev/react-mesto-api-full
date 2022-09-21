import React, { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <fieldset className="login__form-set">
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={handleChange}
            className="login__input"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={value.password}
            onChange={handleChange}
            className="login__input"
            placeholder="Пароль"
          />
          <button type="submit" className="login__button">
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
