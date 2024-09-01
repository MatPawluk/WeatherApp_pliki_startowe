const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_WEATHER_LINK = "https://api.openweathermap.org/data/2.5/weather?";
const API_GEO_CITY_LINK = "http://api.openweathermap.org/geo/1.0/direct?q=";
const API_KEY = "&appid=833672aba96dbdcd1ad7bb1844fcaf7d";
const API_WEATHER_UNITS = "&units=metric";

const getWheather = () => {
  let city = input.value;
  const GET_CITY_URL = API_GEO_CITY_LINK + city + API_KEY;

  axios
    .get(GET_CITY_URL)
    .then((res) => {
      let lat = res.data[0].lat.toString();
      let lon = res.data[0].lon.toString();

      const GET_WEATHER_URL = `${API_WEATHER_LINK}lat=${lat}&lon=${lon}${API_KEY}${API_WEATHER_UNITS}`;
      console.log(GET_WEATHER_URL);

      axios.get(GET_WEATHER_URL).then((weatherRes) => {
        const status = Object.assign({}, ...weatherRes.data.weather);

        temperature.textContent = `${Math.floor(weatherRes.data.main.temp)}°C`;
        humidity.textContent = `${weatherRes.data.main.humidity}%`;
        weather.textContent = status.main;
        cityName.textContent = weatherRes.data.name;
        if (status.id >= 200 && status.id <= 232) {
          photo.setAttribute("src", "./img/thunderstorm.png");
        } else if (status.id >= 300 && status.id <= 321) {
          photo.setAttribute("src", "./img/drizzle.png");
        } else if (status.id >= 500 && status.id <= 531) {
          photo.setAttribute("src", "./img/rain.png");
        } else if (status.id >= 600 && status.id <= 622) {
          photo.setAttribute("src", "./img/ice.png");
        } else if (status.id >= 701 && status.id <= 781) {
          photo.setAttribute("src", "./img/fog.png");
        } else if (status.id === 800) {
          photo.setAttribute("src", "./img/sun.png");
        } else if (status.id >= 801 && status.id <= 804) {
          photo.setAttribute("src", "./img/cloud.png");
        } else {
          photo.setAttribute("src", "./img/unknown.png");
        }
        warning.textContent = "";
        input.value = "";
      });
    })
    .catch(() => (warning.textContent = "Wpisz poprawną nazwę miasta!"));
};
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWheather();
  }
});
button.addEventListener("click", getWheather);
