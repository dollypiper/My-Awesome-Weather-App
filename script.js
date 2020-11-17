let currentTime = new Date();
let h3 = document.querySelector("h3");

let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0 ${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thurday`,
  `Friday`,
  `Saturday`,
];

let day = days[currentTime.getDay()];
h3.innerHTML = `${day} ${hour}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  console.log(response.data);
}

function defaultDisplay(city) {
  let apiKey = "cddb064f88c6e4fd36e3b34f9776d697";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city").value;
  defaultDisplay(city);
}

let form = document.querySelector("#form");
form.addEventListener("submit", search);

defaultDisplay("Lagos");

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0d60caf4e9b7c910f1fa9407528637af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let current = document.querySelector(`#current-location`);
current.addEventListener("click", displayCurrentLocation);
