///Function to get current day/time, return the reformatted string
function getFormatTime() {
  //is there any benefit to getting the Date here in the function, rather than passing it to the function from main body?
  let now = new Date();
  let day = now.getDay();
  console.log(now);
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

///Display city & Call WeatherAPI
function displayCityCallWeather(event) {
  event.preventDefault();
  let cityText = document.querySelector("#city-input-area");
  let cityTextValue = cityText.value;
  console.log(cityTextValue);
  let cityDisplay = document.querySelector("#city-text");
  cityDisplay.innerHTML = cityText.value;

  axios
    .get(`${apiURL}q=${cityTextValue}&units=metric&appid=${apiKey}`)
    .then(displayWeather);
}
///Weather API Response to display Weather
function displayWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let tempElement = document.querySelector("#display-temp");
  tempElement.innerHTML = `${temperature}°C`;
}
let apiKey = "16b311402d819220aacc1ab1a949702b";
let apiURL = "https://api.openweathermap.org/data/2.5/weather?";
let cityInputForm = document.querySelector("#city-submit-form");
cityInputForm.addEventListener("submit", displayCityCallWeather);

let displayTimeElement = document.querySelector("#feature-time");
displayTimeElement.innerHTML = getFormatTime();

//Celsius and Fahrenheight

//Display F on click
/*function displayF(event) {
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = "66";
}
let fValue = document.querySelector("#fahren-value");
fValue.addEventListener("click", displayF);

//Display C on click
function displayC(event) {
  let tempDisplay2 = document.querySelector("#display-temp");
  tempDisplay2.innerHTML = "19";
}
let cValue = document.querySelector("#cels-value");
cValue.addEventListener("click", displayC);
*/
