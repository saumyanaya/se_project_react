import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({
  onSelectCard,
  handleCreateModal,
  isLoggedIn,
  onCardLike,
  clothingItems,
}) => {
  const currentUser = useContext(CurrentUserContext);
  // alert("clothes section : " + currentUser.name + " " + currentUser.avatar);
  const currentItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothes__section">
      <div className="clothes__section-title-wrapper">
        <p className="clothes__section-title">Your items</p>
        <button
          type="submit"
          className="clothes__section-button"
          onClick={handleCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothing__section-cards">
        {currentItems.map((item) => {
          return (
            <ItemCard
              key={item?._id ?? item?.id}
              item={item}
              onSelectCard={onSelectCard}
              isLoggedIn={isLoggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
