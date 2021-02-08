///Function to get current day/time, return the reformatted string
function getFormatTime() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let displayDay = days[day];
  let displayHour = now.getHours();
  let displayMin = now.getMinutes();
  if (displayMin < 10) {
    displayMin = "0" + displayMin;
  }
  let displayTime = `${displayDay} ${displayHour}:${displayMin}`;

  return displayTime;
}

function onSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input-area").value;
  getCityApiInfo(cityInput);
}

function getCityApiInfo(city) {
  let apiKey = "16b311402d819220aacc1ab1a949702b";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiURL}q=${city}&units=imperial&appid=${apiKey}`)
    .then(displayWeatherInfo);
}

function displayWeatherInfo(response) {
  let cityDisplay = document.querySelector("#city-text");
  cityDisplay.innerHTML = response.data.name;
  let tempElement = document.querySelector("#display-temp");
  let temperature = Math.round(response.data.main.temp);
  fixedTemp = temperature;
  tempElement.innerHTML = `${temperature}`;
  let conditionElement = document.querySelector("#display-cond");
  conditionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#display-wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let featureIconElement = document.querySelector("#display-weather-img");
  let iconCode = response.data.weather[0].icon;
  featureIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

function displayCel(event) {
  //activeTemp class toggles the link colors
  event.preventDefault();
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = Math.round((fixedTemp - 32) / 1.8);
  let fahrIconElement2 = document.querySelector("#fahrenIcon");
  fahrIconElement2.classList.remove("activeTemp");
  let celIconElement2 = document.querySelector("#celIcon");
  celIconElement2.classList.add("activeTemp");
}
function displayFahr(event) {
  //activeTemp class toggles the link colors
  event.preventDefault();
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = fixedTemp;
  let fahrIconElement3 = document.querySelector("#fahrenIcon");
  fahrIconElement3.classList.add("activeTemp");
  let celIconElement3 = document.querySelector("#celIcon");
  celIconElement3.classList.remove("activeTemp");
}

let displayTimeElement = document.querySelector("#feature-time");
displayTimeElement.innerHTML = getFormatTime();

//grabbing the form element & activating function on submit event
//setting up global variable that can be used in API call and also in C/F conversion
let fixedTemp = null;
let cityInputForm = document.querySelector("#city-submit-form");
cityInputForm.addEventListener("submit", onSubmit);

//C & F Conversion
let celIconElement = document.querySelector("#celIcon");
celIconElement.addEventListener("click", displayCel);
let fahrenIconElement = document.querySelector("#fahrenIcon");
fahrenIconElement.addEventListener("click", displayFahr);
