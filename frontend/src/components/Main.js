import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const user = React.useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => {
  return (
    <li className="card" key={card._id}>
      <Card
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        card={card}
      />
    </li>
    
  )
}
  );

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info-wrapper">
          <div onClick={onEditAvatar} className="profile__avatar-wrapper">
            <img src={user.avatar} alt="Аватар" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{user.name}</h1>
              <button
                aria-label="Edit profile"
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{user.about}</p>
          </div>
        </div>
        <button
          aria-label="Add info"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__items">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
