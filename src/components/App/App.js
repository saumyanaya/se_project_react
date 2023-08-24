import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseLocation,
} from "../../utils/weatherApi";
import { deleteItem, getItems, addItem } from "../../utils/Api";
import AddItemModal from "../AddItemModal/AddItemModal";

import { Switch, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

//---------------------------------------------Functions------------------------------------------------------

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  //-----------------------------------------------UseEffects-------------------------------------------------

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        {
          handleCloseModal();
        }
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    const handleClickClose = (evt) => {
      if (
        evt.target.classList.contains("item_modal") ||
        evt.target.classList.contains("modal")
      ) {
        console.log("handleClickClose");
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const city = parseLocation(data);
        console.log(temperature);
        setTemp(temperature);
        setLocation(city);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //-------------------------------------------------const------------------------------------------------------
  const onAddItem = (values) => {
    console.log(values);
    addItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  const handleDeleteCard = (cardElement) => {
    deleteItem(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards.id !== cardElement.id;
        });
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //--------------------------------------------------------HTML-------------------------------------------------
  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} city={location} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              clothingItems={clothingItems}
              onCreateModal={handleCreateModal}
              onSelectCard={handleSelectedCard}
            ></Profile>
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}

        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
