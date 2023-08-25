import "./Header.css";
import avatarImage from "../../images/avatar.svg";
import wtwrLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal, city }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrLogo} alt="logo" />
          </Link>
        </div>
        <div>
          {currentDate}, {city}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            type="text"
            className="header__add-clothes-button"
            onClick={onCreateModal}
          >
            + Add New Clothes
          </button>
        </div>
        <Link to="/profile" className="header__profile-link">
          Saumya Nayak
        </Link>
        <div>
          <img src={avatarImage} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
