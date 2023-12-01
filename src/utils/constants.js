export const WeatherOptions = [
  { url: require("../images/day/sunny.svg").default, day: true, type: "sunny" },
  {
    url: require("../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
  {
    url: require("../images/night/cloud.svg").default,
    day: false,
    type: "cloud",
  },
];
export const latitude = 44.34;
export const longitude = 10.99;
export const APIkey = "10b07b30c6133dd71134baab456a2f78";

// // - - - CLOTHING API - - - //
// export const baseUrl = "http://localhost:3001";

export const headers = {
  authorization: "",
  "Content-Type": "application/json",
};
