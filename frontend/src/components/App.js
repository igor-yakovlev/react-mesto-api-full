import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect, useCallback } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [infoTooltipOption, setInfoTooltipOption] = useState({
    toolTipOpen: false,
    toolTipType: "failure",
  });
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .authorize()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push("/");
          } else {
            setLoggedIn(false);
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn)
      Promise.all([api.getUser(), api.getInitialCards()]).then(
        ([userData, cardInfo]) => {
          setCurrentUser(userData);
          setCards(cardInfo);
        }
      );
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltipOption((state) => ({ ...state, toolTipOpen: false }));
    setSelectedCard({ name: "", link: "" })
  };

  const handleUpdateUser = (data) => {
    api
      .setUser({
        name: data.name,
        about: data.description,
      })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => {
      return i === currentUser._id
    });
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          history.push("/sign-in");
          setInfoTooltipOption({ toolTipOpen: true, toolTipType: "success" });
        } else {
          setInfoTooltipOption({ toolTipOpen: true, toolTipType: "failure" });
        }
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipOption({ toolTipOpen: true, toolTipType: "failure" });
      });
  };

  const onLogin = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          setEmail(email);
          history.push("/");
        } else {
          setInfoTooltipOption({ toolTipOpen: true, toolTipType: "failure" });
        }
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipOption({ toolTipOpen: true, toolTipType: "failure" });
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    setEmail("");
    history.push("/sign-in");
  };
  return (
    <div className="page page_theme_black">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Header onSignOut={onSignOut} userEmail={email} />
          <Switch>
            <ProtectedRoute exact path="/"
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
            <Route exact path="/sign-in">
              <Login setEmail={setEmail} onLogin={onLogin} />
            </Route>
            <Route exact path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm
            title={"Вы уверены?"}
            name={"confirm"}
            buttonText={"Да"}
            onClose={closeAllPopups}
          />
          <InfoTooltip settings={infoTooltipOption} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
