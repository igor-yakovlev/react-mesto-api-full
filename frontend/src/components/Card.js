import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);
  const { link, name, likes } = card;

  const isOwn = card.owner === user._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn && "card__delete_show"
  }`;
  const isLiked = card.likes.some((i) => i === user._id);
  
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  const handleImageClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <>
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleImageClick}
      />
      <button
        aria-label="Delete card"
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__likes-container">
          <button
            aria-label="Add like"
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p className="card__likes-count">{likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
