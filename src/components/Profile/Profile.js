import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  onSelectCard,
  handleCreateModal,
  clothingItems,
  onEditProfileModal,
  onLogout,
  isLoggedIn,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <SideBar onEditProfileModal={onEditProfileModal} onLogout={onLogout} />
      <ClothesSection
        onSelectCard={onSelectCard}
        handleCreateModal={handleCreateModal}
        clothingItems={clothingItems}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;
