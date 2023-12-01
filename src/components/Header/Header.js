import "./Header.css";
import wtwrLogo from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({
  handleCreateModal,
  weatherLocation,
  onLoginModal,
  onRegisterModal,
  loggedIn,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : undefined;
  const showAvatar = avatar !== "" ? true : false;
  const name = currentUser.name;

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={wtwrLogo} alt="App logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {weatherLocation}
        </p>
      </div>

      <div className="header__profile">
        <ToggleSwitch />
        {loggedIn ? (
          <>
            <div>
              <button
                className="header__add-btn"
                type="text"
                onClick={handleCreateModal}
              >
                + Add Clothes
              </button>
            </div>
            <Link to="/profile">
              <div className="header__name">Saumya Nayak</div>
            </Link>
            {showAvatar ? (
              <div>
                <img
                  className="header__avatar"
                  src={avatarImage}
                  alt="Avatar icon"
                />
              </div>
            ) : (
              <p className="header__avatar-default">{name[0].toUpperCase()}</p>
            )}
          </>
        ) : (
          <>
            <button
              className="header__register-btn"
              type="button"
              onClick={onRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="header__login-btn"
              type="button"
              onClick={onLoginModal}
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
