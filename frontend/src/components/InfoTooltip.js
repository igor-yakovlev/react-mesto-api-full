import tooltipSuccess from "../images/tooltip/tooltip__success.svg";
import tooltipFailure from "../images/tooltip/tooltip__failure.svg";

function InfoTooltip({ settings, onClose }) {
  const tooltipMap = {
    success: {
      src: tooltipSuccess,
      text: "Вы успешно зарегистрировались!",
      alt: "Успешно",
    },
    failure: {
      src: tooltipFailure,
      text: "Что-то пошло не так! Попробуйте ещё раз.",
      alt: "Неудача",
    },
  };

  function getToolTip(type) {
    return tooltipMap[type];
  }

  return (
    <div className={`popup  ${settings.toolTipOpen && "popup_opened"}`}>
      <div className="popup__container tooltip">
        <img
          src={getToolTip(settings.toolTipType).src}
          alt={getToolTip(settings.toolTipType).alt}
          className="tooltip__image"
        />
        <h2 className="tooltip__title">
          {getToolTip(settings.toolTipType).text}
        </h2>
        <button
          aria-label="Close popup"
          type="button"
          onClick={onClose}
          className="popup__close-cross"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
