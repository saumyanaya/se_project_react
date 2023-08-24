import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ weatherTemp, onSelectCard, clothingItems }) => {
  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);
  const temp =
    weatherTemp?.temperature?.[currentTemperatureUnit.currentTemperatureUnit];
  const getWeatherType = (temp) => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };
  const weatherType = getWeatherType(temp);

  const filteredCards = clothingItems?.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloud" weatherTemp={temp} />
      <section className="card_section" id="card_section">
        <div className="clothing__intro">
          Today is {temp}° F You may want to wear:
        </div>
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Main;
