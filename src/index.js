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

function displayC(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = Math.round((fixedTemp - 32) / 1.8);
}
function displayF(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = fixedTemp;
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
celIconElement.addEventListener("click", displayC);
let fahrenIconElement = document.querySelector("#fahrenIcon");
fahrenIconElement.addEventListener("click", displayF);

//Celsius and Fahrenheight

//Display F on click
/*function displayC(event) {
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = "66";
}


//Display C on click
function displayC(event) {
  let tempDisplay2 = document.querySelector("#display-temp");
  tempDisplay2.innerHTML = "19";
}
let cValue = document.querySelector("#cels-value");
cValue.addEventListener("click", displayC);
*/
