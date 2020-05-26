// this is where we want to work on the app

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = data => {
  console.log(data);
  const { cityDets, weather } = data; // this says from the data, we want to pull the cityDets and the weather and make variables with the same names as below

  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  // update details template
  // same syntax ust update the variables
  details.innerHTML = `  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&deg;F</span>
  </div>`;

  time.src = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  //   if (weather.IsDayTime) {
  //     time.src = "img/day.svg";
  //   } else {
  //     time.src = "img/night.svg";
  //   }

  // updating the icon
  icon.src = `img/icons/${weather.WeatherIcon}.svg`;
  // removing the display none when we submit the button
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
// we can call all the functions because forecast .js is first

cityForm.addEventListener("submit", e => {
  e.preventDefault();
  // getting city value
  const city = cityForm.city.value.trim();

  cityForm.reset();

  // update the UI with the forecast object

  forecast.updateCity(city)
    .then(data => {
      updateUI(data);
    })
    .catch(err => {
      console.log(err);
    });
  // set local storage

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => {
      updateUI(data);
    })
    .catch(err => {
      console.log(err);
    });
}
