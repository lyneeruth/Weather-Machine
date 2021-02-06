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
  console.log(response);
  let cityDisplay = document.querySelector("#city-text");
  cityDisplay.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let tempElement = document.querySelector("#display-temp");
  tempElement.innerHTML = `${temperature}°C`;
  let conditionElement = document.querySelector("#display-cond");
  conditionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#display-wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let displayTimeElement = document.querySelector("#feature-time");
displayTimeElement.innerHTML = getFormatTime();

//grabbing the form element & activating function on submit event
let cityInputForm = document.querySelector("#city-submit-form");
cityInputForm.addEventListener("submit", onSubmit);

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
