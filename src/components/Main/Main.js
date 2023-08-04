import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

const Main = ({ weatherTemp, onSelectCard }) => {
  const getWeatherType = (temperature) => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType(weatherTemp);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  console.log(filteredCards);

  return (
    <main className="main">
      <WeatherCard day={false} type="cloud" weatherTemp={weatherTemp} />
      <section className="card_section" id="card_section">
        <div className="clothing__intro">
          Today is {weatherTemp}° F/ You may want to wear:
        </div>
        <div className="card_items">
          {defaultClothingItems.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Main;
