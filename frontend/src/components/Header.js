import logo from "../images/header/header__logo.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__wrapper">
        <p className="header__user-email">{userEmail}</p>
        <Switch>
          <Route exact path="/sign-in">
            <Link to="/sign-up">
              <div className="header__link">Регистрация</div>
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in">
              <div className="header__link">Войти</div>
            </Link>
          </Route>
          <Route exact path="/">
            <div onClick={onSignOut} className="header__link">
              Выйти
            </div>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
