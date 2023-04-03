function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}  ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayDailyForecastWeather(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = `<div class="row">`;
  forecast.forEach((forecastDay, index) => {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `   <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="36">
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperatures-min">
                    ${Math.round(forecastDay.temp.min)}°
                  </span>
                  <span class="weather-forecast-temperatures-max">
                  ${Math.round(forecastDay.temp.max)}°
                  </span>
                </div>
              </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let apiKey = `b35c686ba9565ba0ab254c2230937552`;
  let urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(urlApi).then(displayDailyForecastWeather);
}

function SetValue(response) {
   let city = document.querySelector("#city");
   let temp = document.querySelector("#temperature");
   let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
//   let img = document.querySelector(".images");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  
  city.innerHTML = `city name : ${response.data.name}`;
  temp.innerHTML = Math.round(response.data.main.temp);
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  description.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `response.data.weather[0].description`);
  getForecast(response.data.coord);
//   if (temp <= 0) {
//     img.innerHTML = `<img src="img/wear-jacket.jpg">`;
//   } else if (temp < 10 && temp > 0) {
//     img.innerHTML = `<img src="img/fleece.png">`;
//   } else if (temp < 20 && temp > 11) {
//     img.innerHTML = `<img src="img/medium-coat.jpg">`;
//   } else if (temp < 30 && temp > 20) {
//     img.innerHTML = `<img src="img/shirts.jpg">`;
//   } else {
//     img.innerHTML = `<img src="img/summer.jpg">`;
//   }
}

function GetValue(event) {
  event.preventDefault();
  let apiKey = "4aa4f4c485e2f9ad87e3fd6f892979f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
  let inputValue = document.querySelector("#input-city");
  let cityName = inputValue.value;
  axios.get(apiUrl + `&q=${cityName}`).then(SetValue);
}

function SetPosition(position) {
  let apiKey = "4aa4f4c485e2f9ad87e3fd6f892979f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
  
  let lon = position.coords.latitude;
  let lat = position.coords.longitude;
  axios.get(apiUrl + `&lat=${lat}&lon=${lon}`).then(SetValue);
}

function ShowCurrentLocation() {
  navigator.geolocation.getCurrentPosition(SetPosition);
}
function search(city) {
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(SetValue);
  }

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temp = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchBtn = document.querySelector("#btn");
let currentBtn = document.querySelector("#current");
searchBtn.addEventListener("click", GetValue);
currentBtn.addEventListener("click", ShowCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
search("New York");