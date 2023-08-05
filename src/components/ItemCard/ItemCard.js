import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="clothing_card">
      <img
        src={item.link}
        alt="clothing icon"
        className="card_image"
        onClick={() => onSelectCard(item)}
      />
      <div className="card_name">{item.name}</div>
    </div>
  );
};
export default ItemCard;
