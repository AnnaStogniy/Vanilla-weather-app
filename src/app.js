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

  //Format days forecast
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

  // Display forecast
function displayForecast(getResponseForecast){
  console.log(getResponseForecast);
  let forecast = getResponseForecast.data.daily
  let forecastElement = document.querySelector("#forecast");

  let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    console.log(index)
if (index >0 && index < 7){
    forecastHtml = forecastHtml + `<div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img id="image-forecast" src="img/${forecastDay.weather[0].icon}.png" alt="" width="75%">
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">
        ${Math.round(forecastDay.temp.max)}°
      </span>
      <span class="weather-forecast-temperature-min">
      ${Math.round(forecastDay.temp.min)}°
      </span>
    </div>
  </div>
  `;
}
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;

    //change image forecast

  

}


  


function getApiForecast(coordinates){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrlForecast);

  axios.get(apiUrlForecast).then(displayForecast);
  }
  

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
    document.getElementById("image").src = "img/01d.png";
    document.getElementById("fullPage").style.background = "linear-gradient(110.3deg, rgb(238, 179, 123) 8.7%, rgb(216, 103, 77) 47.5%, rgb(114, 43, 54) 89.1%)";
   }

   if (descriptionToImage === "Clouds"){
    document.getElementById("image").src = "img/02d.png";
    document.getElementById("fullPage").style.background = "linear-gradient(109.6deg, rgb(0, 37, 84) 11.2%, rgba(0, 37, 84, 0.32) 100.2%)";
   }

   if (descriptionToImage === "Rain"){
    document.getElementById("image").src = "img/09d.png";
    document.getElementById("fullPage").style.background = "linear-gradient(111.4deg, rgb(55, 168, 192) -0.2%, rgb(103, 187, 125) 100.2%)";
   }

   if (descriptionToImage === "Snow"){
    document.getElementById("image").src = "img/13d.png";
    document.getElementById("fullPage").style.background = "linear-gradient(111.5deg, rgb(187, 232, 255) 11.1%, rgb(4, 78, 116) 107.5%)";
   }

   if (descriptionToImage === "Thunderstorm"){
    document.getElementById("image").src = "img/11d.png";
    document.getElementById("fullPage").style.background = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
   }
   getApiForecast(response.data.coord);
  }
  let form = document.querySelector("#change-city");
  form.addEventListener("submit", changeCity);

  let currentTemperature = document.querySelector("#current-temperature");



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

