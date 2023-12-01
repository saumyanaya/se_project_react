import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemCard = ({ item, onCardLike, onSelectCard }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__likeButton ${
    isLiked ? "card__likeButton-active" : "card__likeButton-inactive"
  }`;
  const handleCardLikeClick = (item) => {
    onCardLike(item, isLiked, currentUser);
  };

  return (
    <div className="clothing_card">
      <div className="card_name">
        {item.name}
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={() => handleCardLikeClick(item)}
        ></button>
      </div>
      <img
        src={item?.imageUrl || item?.link}
        alt={item.name}
        className="card_image"
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
};

export default ItemCard;
