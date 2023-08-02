const ItemModal = ({ selectedCard, onClose }) => {
  console.log("item modal");
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <img src={selectedCard.link} />
        <div>{selectedCard.name}</div>
        <div>weather type:{selectedCard.weather}</div>
      </div>
    </div>
  );
};
export default ItemModal;
