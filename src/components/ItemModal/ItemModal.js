import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <img
          src={selectedCard.imageUrl}
          className="modal__image"
          alt={selectedCard.name}
        />
        <div className="modal__caption">
          <div className="modal__name">{selectedCard.name}</div>
          <div className="modal__weather">Weather:{selectedCard.weather}</div>
          <button
            className="modal__delete"
            type="button"
            onClick={() => handleDeleteCard(selectedCard)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
