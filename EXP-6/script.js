const apiKey = "YOUR_API_KEY"; // replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("error");

// Fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);

    // Save last searched city
    localStorage.setItem("lastCity", city);
    errorMsg.textContent = "";
  } catch (error) {
    errorMsg.textContent = error.message;
    weatherResult.innerHTML = "";
  }
}

// Display weather in DOM
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>🌡️ Temperature: ${main.temp}°C</p>
    <p>☁️ Condition: ${weather[0].description}</p>
  `;
}

// Search button event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    errorMsg.textContent = "Please enter a city name.";
  }
});

// Load last searched city from localStorage
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    getWeather(lastCity);
  }
});
