import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const token = localStorage.getItem("jwt");
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeatherType] = useState("");

  const handleWeatherType = (e) => {
    setWeatherType(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setWeatherType("");
      setUrl("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather, token });
  };
  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Name
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            className="modal__input"
            onChange={handleNameChange}
            value={name}
            required
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Image
          <input
            type="url"
            name="link"
            minLength="1"
            maxLength="300"
            placeholder="Image URL"
            className="modal__input"
            value={imageUrl}
            onChange={handleUrlChange}
            required
          />
        </label>
      </div>
      <p> Select the weather type:</p>
      <div className="modal__radio_buttons">
        <div className="modal__radio_option">
          <input
            type="radio"
            id="hot"
            value="hot"
            name="temp_range"
            className="modal__radio_button"
            onChange={handleWeatherType}
          />
          <label className="modal__label_radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="modal__radio_option">
          <input
            type="radio"
            id="warm"
            value="warm"
            name="temp_range"
            className="modal__radio_button"
            onChange={handleWeatherType}
          />
          <label className="modal__label_radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="modal__radio_option">
          <input
            type="radio"
            id="cold"
            value="cold"
            name="temp_range"
            className="modal__radio_button"
            onChange={handleWeatherType}
          />
          <label className="modal__label_radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
