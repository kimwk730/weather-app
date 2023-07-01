let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

document.querySelector("#time-now").innerHTML = `${hours}:${minutes}`;
document.querySelector("#date-now").innerHTML = `${month} ${date}, ${year}`;
document.querySelector("#day-now").innerHTML = day;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//
window.onload = function getWeather(event) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric`;
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let theApiUrl = `${apiUrl}&appid=${apiKey}`;

  axios.get(theApiUrl).then(displayWeather);
};

//

function displayWeather(response) {
  console.log(response.data);

  celsiusTemp = response.data.main.temp;

  uploadWeatherIcon(response.data.weather[0].id);

  document.querySelector("#city-now").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description-now").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity-now").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-now").innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);
}

//

function uploadWeatherIcon(weatherId) {
  let iconElement = document.querySelector("#main-weather-icon");
  if (weatherId === 800) {
    iconElement.setAttribute("src", "images/sun.gif");
  }
  if (weatherId === 801 || weatherId === 802) {
    iconElement.setAttribute("src", "images/partlycloudy.gif");
  }
  if (weatherId === 803 || weatherId === 804) {
    iconElement.setAttribute("src", "images/cloudy.gif");
  }
  if (weatherId >= 700 && weatherId < 799) {
    iconElement.setAttribute("src", "images/foggy.gif");
  }
  if (weatherId >= 600 && weatherId < 699) {
    iconElement.setAttribute("src", "images/snow.gif");
  }
  if (weatherId >= 200 && weatherId < 299) {
    iconElement.setAttribute("src", "images/storm.gif");
  }
  if (weatherId >= 300 && weatherId < 399) {
    iconElement.setAttribute("src", "images/drizzle.gif");
  }
  if (weatherId >= 500 && weatherId < 599) {
    iconElement.setAttribute("src", "images/rain.gif");
  }
}

//

function getForecast(coordinates) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col week">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <img src="images/storm.gif" class="weather-icons" id="forecast-icon/>
        <span class="forecast-temp-max"> ${Math.round(
          forecastDay.temp.max
        )}°C </span> | 
        <span class="forecast-temp-min"> ${Math.round(
          forecastDay.temp.min
        )}°C </span>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", changeInfo);

function changeInfo(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input").value;
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric`;
  let theApiUrl = `${apiUrl}&appid=${apiKey}`;

  axios.get(theApiUrl).then(displayWeather);
}

//

let currentLocationButton = document.querySelector("#button-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let theLatitude = position.coords.latitude;
  let theLongitude = position.coords.longitude;
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${theLatitude}&lon=${theLongitude}&units=metric`;
  let theApiUrl = `${apiUrl}&appid=${apiKey}`;

  axios.get(theApiUrl).then(displayWeather);
}

//

let celsiusTemp = null;

function convertToFahenheit(event) {
  document.querySelector("#temp-now").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
}
function convertToCelsius(event) {
  document.querySelector("#temp-now").innerHTML = Math.round(celsiusTemp);
}

function changeUnitIcon(image) {
  if (image.getAttribute("src") == "images/celsius.gif") {
    image.setAttribute("src", "images/fahrenheit.gif");
    convertToFahenheit();
  } else {
    image.setAttribute("src", "images/celsius.gif");
    convertToCelsius();
  }
}
