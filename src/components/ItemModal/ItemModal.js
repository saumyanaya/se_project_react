import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="item_modal__close_button"
        ></button>
        <img
          src={selectedCard.link}
          className="item_modal__item_image"
          alt={selectedCard.name}
        />
        <div className="item_modal__caption">
          <div className="item_modal__caption_name">{selectedCard.name}</div>
          <div className="item_modal__caption_weather">
            weather type:{selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
