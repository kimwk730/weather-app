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

let theTime = document.querySelector("#time-now");
theTime.innerHTML = `${hours}:${minutes}`;

let theDate = document.querySelector("#date-now");
theDate.innerHTML = `${month} ${date}, ${year}`;

let theDay = document.querySelector("#day-now");
theDay.innerHTML = day;

//

function displayWeather(response) {
  console.log(response.data);

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

window.onload = function getWeather(event) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric`;
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let theApiUrl = `${apiUrl}&appid=${apiKey}`;

  axios.get(theApiUrl).then(displayWeather);
};

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
