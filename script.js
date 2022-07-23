const search = document.querySelector(".header1");
const submit = document.querySelector(".btn");
const sample = document.querySelector(".sample");
let value = "";
let card = document.querySelector(".card");
let mode = document.querySelector(".dark1");

search.addEventListener("input", function (e) {
  e.preventDefault();
  value = e.target.value;
  //console.log(value);
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  getData(value);
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "fba19d5dacmsh9779381eed4e676p1e4590jsn9657134d0fe7",
    "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
  },
};

const getData = function (City) {
  fetch(
    `https://community-open-weather-map.p.rapidapi.com/weather?q=${City}`,
    options
  )
    .then((response) => response.json())
    .then((response) => output(response));
};
let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes();

let inside = false;

const output = function (response) {
  if (inside) {
    card.innerHTML = "";
  }
  console.log(response);
  const data = `<div class="card-header">
  <button class="btn1"> ${response.name}</button>
  <div class="card-time">${time}</div>
</div>
<div class="card-mid">
<img class = "image"src="Images/${response.weather[0].main}.png" alt="">
<div class="description">${response.weather[0].main}</div>
</div>
<div class="card-footer">
    <div class="humidity">Humidity  ${response.main.humidity}</div>
    <div class="temperature">Temperature <br> ${(
      response.main.temp - 273.15
    ).toFixed(2)}&#176C</div>
    <div class="wind">Wind  ${response.wind.speed} km/h</div>
  </div>

  `;
  card.insertAdjacentHTML("afterbegin", data);
  card.style.opacity = 1;
  inside = true;
};

let has = false;
const enable = () => {
  document.body.classList.add("dark");
  has = true;
};

const disable = () => {
  document.body.classList.remove("dark");
  has = false;
};

mode.addEventListener("click", () => {
  if (!has) {
    enable();
  } else {
    disable();
  }
});
