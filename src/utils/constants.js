// const defaultClothingItems = [
//   {
//     _id: 0,
//     name: "Cap",
//     weatherType: "hot",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
//   },
//   {
//     _id: 1,
//     name: "Hoodie",
//     weatherType: "warm",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
//   },
//   {
//     _id: 2,
//     name: "Jacket",
//     weatherType: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
//   },
//   {
//     _id: 3,
//     name: "Sneakers",
//     weatherType: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
//   },
//   {
//     _id: 4,
//     name: "T-Shirt",
//     weatherType: "hot",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
//   },
//   {
//     _id: 5,
//     name: "Winter coat",
//     weatherType: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
//   },
// ];
// export { defaultClothingItems };

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

// - - - CLOTHING API - - - //
export const baseUrl = "http://localhost:3001";

export const headers = {
  authorization: "",
  "Content-Type": "application/json",
};
