import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({
  isLoggedIn,
  weatherTemp,
  onSelectCard,
  clothingItems,
  onCardLike,
}) => {
  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);
  const temp =
    weatherTemp?.temperature?.[currentTemperatureUnit.currentTemperatureUnit];
  const getWeatherType = () => {
    if (currentTemperatureUnit.currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    }

    if (currentTemperatureUnit.currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = clothingItems?.filter((item) => {
    return item.weather?.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloud" weatherTemp={temp} />
      <section className="card_section" id="card_section">
        <div className="clothing__intro">
          Today is {temp}° {currentTemperatureUnit.currentTemperatureUnit} / You
          may want to wear:
        </div>
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard
              item={item}
              onSelectCard={onSelectCard}
              key={item?.id ?? item?._id}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Main;
