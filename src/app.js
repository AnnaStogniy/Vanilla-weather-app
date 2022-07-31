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