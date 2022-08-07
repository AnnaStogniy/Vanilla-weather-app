// Show current time:
function currentTime() {
    let time = document.querySelector("#current-time");
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
  
    if (minutes < 10){
        time.innerHTML = `Last updated: ${day}, ${hours}:0${minutes}`;
    }
    else{
        time.innerHTML = `Last updated: ${day}, ${hours}:${minutes}`;
    }
  }

  let now = new Date();
  currentTime();

  // Change input city:
  function changeCity(event) {
    let currentCity = document.querySelector("#current-city");
    let inputNewCity = document.querySelector("#input-city");

    event.preventDefault();
    currentCity.innerHTML = `${inputNewCity.value}`;
  
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputNewCity.value}&appid=648a7061e4cc76852d26d41d4a66634b&units=metric`;
    axios.get(apiUrl).then(getNewCity);
  }

  //Change all temperature additions
  function getNewCity(response) {
     celsiusTemp = Math.round(response.data.main.temp);
    let wind = document.querySelector("#wind");
    let humidity = document.querySelector("#humidity");
    let description = document.querySelector("#description");

    currentTemperature.innerHTML = `${celsiusTemp}`; 
   description.innerHTML = `${response.data.weather[0].description}`;
   humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`
   wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`

   //change image and colour
   let descriptionToImage = response.data.weather[0].main;
   if (descriptionToImage === "Clear"){
    document.getElementById("image").src = "img/sun.png";
    document.getElementById("fullPage").style.background = "linear-gradient(110.3deg, rgb(238, 179, 123) 8.7%, rgb(216, 103, 77) 47.5%, rgb(114, 43, 54) 89.1%)";
   }

   if (descriptionToImage === "Clouds"){
    document.getElementById("image").src = "img/sunwithclouds.png";
    document.getElementById("fullPage").style.background = "linear-gradient(109.6deg, rgb(0, 37, 84) 11.2%, rgba(0, 37, 84, 0.32) 100.2%)";
   }

   if (descriptionToImage === "Rain"){
    document.getElementById("image").src = "img/rainy-day.png";
    document.getElementById("fullPage").style.background = "linear-gradient(111.4deg, rgb(55, 168, 192) -0.2%, rgb(103, 187, 125) 100.2%)";
   }

   if (descriptionToImage === "Snow"){
    document.getElementById("image").src = "img/snowflake.png";
    document.getElementById("fullPage").style.background = "linear-gradient(111.5deg, rgb(187, 232, 255) 11.1%, rgb(4, 78, 116) 107.5%)";
   }

   if (descriptionToImage === "Thunderstorm"){
    document.getElementById("image").src = "img/thunderstorm.png";
    document.getElementById("fullPage").style.background = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
   }
  }
  let form = document.querySelector("#change-city");
  form.addEventListener("submit", changeCity);

  let currentTemperature = document.querySelector("#current-temperature");

// Display forecast
function displayForecast(){
let forecastElement = document.querySelector("#forecast");

let days =["Thu", "Fri", "Sat", "Sun"];
let forecastHtml = `<div class = "row">`;
days.forEach(function (day) {
  forecastHtml = forecastHtml + `<div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <img src="img/sun.png" alt="" width="75%">
  <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">
      18
    </span>
    <span class="weather-forecast-temperature-min">
      12
    </span>
  </div>
</div>
`;

});

forecastHtml = forecastHtml + `</div>`;
forecastElement.innerHTML = forecastHtml;
console.log(forecastHtml);
}

// Change celsium to fahreinheit
  function changeCelsius(event) {
    event.preventDefault();

    document.getElementById("current-celcius").style.color = "white"
    document.getElementById("current-celcius").style.textDecoration = "none"
    document.getElementById("current-fahrenheit").style.color = "#0000EE"

    currentTemperature.innerHTML = celsiusTemp;
  }
  let newCelsius = document.querySelector("#current-celcius");
  newCelsius.addEventListener("click", changeCelsius);
  
  function changeFahrenheit(event) {
    event.preventDefault();
    document.getElementById("current-fahrenheit").style.color = "white"
    document.getElementById("current-fahrenheit").style.textDecoration = "none"
    document.getElementById("current-celcius").style.color = "#0000EE"

    let fahrenheit = Math.round(celsiusTemp* 9 / 5 + 32);

    currentTemperature.innerHTML = `${fahrenheit}`;
  }
  let celsiusTemp = null;

  let fahrenheitElement = document.querySelector("#current-fahrenheit");
  fahrenheitElement.addEventListener("click", changeFahrenheit);
