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
}
//
function uploadWeatherIcon(weatherId) {
  let iconElement = document.querySelector("#main-weather-icon");
  if (weatherId === 800) {
    iconElement.setAttribute("src", "images/suny.gif");
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

function changeInfo(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric`;
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let theApiUrl = `${apiUrl}&appid=${apiKey}`;

  axios.get(theApiUrl).then(displayWeather);
}

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", changeInfo);

//

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let theLongitude = position.coords.longitude;
  let theLatitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${theLatitude}&lon=${theLongitude}&units=metric`;
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let theApiUrl = `${apiUrl}&appid=${apiKey}`;

  axios.get(theApiUrl).then(displayWeather);
}

let currentLocationButton = document.querySelector("#button-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

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

let celsiusTemp = null;
