import React from "react";
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
import {
  deleteItem,
  getItems,
  addItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import AddItemModal from "../AddItemModal/AddItemModal";

import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import {
  postSignIn,
  postSignup,
  getUserInfo,
  editProfile,
} from "../../utils/auth.js";
import LoginModal from "../LoginModal/LoginModal.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

//---------------------------------------------Functions------------------------------------------------------

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  //-----------------------------------------------UseEffects-------------------------------------------------
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch(console.error);
    }
  }, [loggedIn]);

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

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };
  const EditProfileModal = () => {
    setActiveModal("editProfile");
  };
  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLogin = (email, password) => {
    postSignIn({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          handleCloseModal();
          return res;
        } else {
          console.log("handleLogin error");
        }
      })
      .catch(console.error);
  };

  const handleEditProfileSubmit = (name, avatar, token) => {
    editProfile(name, avatar, token)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (selectedCard) => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");

    setLoggedIn(false);
    setClothingItems(clothingItems);
  };
  const handleRegisterSubmit = (email, password, name, avatar) => {
    postSignup({ email, password, name, avatar })
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
        handleLogin(email, password);
      })
      .catch(console.error);
  };

  const handleCardLike = (item, isLiked, currentUser) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(item._id, currentUser._id, token)
          .then((res) => {
            setClothingItems((clothingItems) =>
              clothingItems.map((card) => (card._id === item._id ? res : card))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(item._id, currentUser._id, token)
          .then((updatedCard) => {
            setClothingItems((clothingItems) =>
              clothingItems.map((card) =>
                card._id === item._id ? updatedCard : card
              )
            );
          })
          .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  // const onAddItem = (values) => {
  //   const item = {
  //     name: values.name,
  //     imageUrl: values.imageUrl,
  //     weather: values.weatherType,
  //   };

  //   const newClothesRequest = () => {
  //     return clothingItems(item).then((item) => {
  //       setClothingItems([item.data, ...clothingItems]);
  //     });
  //   };
  //   handleCloseModal(newClothesRequest);
  // };
  const onAddItem = (values) => {
    addItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };

  const handleDeleteCard = (selectedCard) => {
    deleteItem(selectedCard)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards.id !== selectedCard.id;
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
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleCreateModal={handleCreateModal}
          onLoginModal={handleLoginModal}
          onRegisterModal={handleRegisterModal}
          loggedIn={loggedIn}
          city={location}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              onCardLike={handleCardLike}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              clothingItems={clothingItems}
              handleCreateModal={handleCreateModal}
              onSelectCard={handleSelectedCard}
              onEditProfileModal={EditProfileModal}
              onLogout={handleLogout}
              loggedIn={loggedIn}
              onCardLike={handleCardLike}
            ></Profile>
          </ProtectedRoute>
          <Route exact path="">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
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
            loggedIn={loggedIn}
            currentUser={currentUser}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "login"}
            onLogin={handleLogin}
            setActiveModal={setActiveModal}
            onRegister={handleRegisterModal}
            // buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "register"}
            onRegister={handleRegisterSubmit}
            setActiveModal={setActiveModal}
            // buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        )}
        {activeModal === "editProfile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "editProfile"}
            onSubmit={handleEditProfileSubmit}
            // buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        )}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
