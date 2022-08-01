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
    event.preventDefault();
    currentCity.innerHTML = `${inputNewCity.value}`;
  
    function getNewCity(response) {
      let mathRoundedTemp = Math.round(response.data.main.temp);
      currentTemperature.innerHTML = `${mathRoundedTemp}`; 
     description.innerHTML = `${response.data.weather[0].description}`;
     humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`
     wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`
    }
  
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputNewCity.value}&appid=648a7061e4cc76852d26d41d4a66634b&units=metric`;
    axios.get(apiUrl).then(getNewCity);
  }
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let currentCity = document.querySelector("#current-city");
  
  let inputNewCity = document.querySelector("#input-city");
  let form = document.querySelector("#change-city");
  form.addEventListener("submit", changeCity, changeCelsius);

  let currentTemperature = document.querySelector("#current-temperature");

  function changeCelsius(event) {
    event.preventDefault();
    currentTemperature.innerHTML = `${response.data.main.temp}`;
  }
  let newCelsius = document.querySelector("#current-celcius");
  newCelsius.addEventListener("click", changeCelsius);
  
  function changeFahrenheit(event, fa) {
    event.preventDefault();
    currentTemperature.innerHTML = `${fa}`;
  }
  let fa = `${mathRoundedTemp*9/5+32}`

  let fahrenheit = document.querySelector("#current-fahrenheit");
  fahrenheit.addEventListener("click", changeFahrenheit);

