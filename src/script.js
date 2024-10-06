const apiKey = "9605c51ae5b92t61fff7f03a24730o32"; // SheCodes API key
const baseUrl = "https://api.shecodes.io/weather/v1/current?query="; // SheCodes API endpoint for current weather
const forecastUrl = "https://api.shecodes.io/weather/v1/forecast?query="; // SheCodes API endpoint for forecast

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const cityNameElement = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const weatherDescriptionElement = document.getElementById(
  "weather-description"
);
const windsElement = document.getElementById("winds");
const forecastContainer = document.getElementById("forecast-container");

// Function to update current weather
function updateWeather(city) {
  fetch(`${baseUrl}${city}&key=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.city && data.temperature && data.condition) {
        const temperature = data.temperature.current;
        const humidity = data.temperature.humidity;
        const winds = data.wind ? `${data.wind.speed} km/h` : "N/A";
        const condition = data.condition.description;
        const iconUrl = data.condition.icon_url;

        cityNameElement.textContent =
          city.charAt(0).toUpperCase() + city.slice(1);
        temperatureElement.innerHTML = `${Math.round(temperature)}°C `;

        if (iconUrl) {
          temperatureElement.innerHTML += `<img src="${iconUrl}" alt="${condition}" class="weather-icon">`;
        }

        humidityElement.textContent = `${humidity}%`;
        windsElement.textContent = `${winds}`;
        weatherDescriptionElement.textContent = condition;
      } else {
        showError(city);
      }
    })
    .catch(() => {
      showError(city);
    });
}

// Function to update 5-day forecast
function updateForecast(city) {
  fetch(`${forecastUrl}${city}&key=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.daily) {
        forecastContainer.innerHTML = "";
        const forecastDays = data.daily.slice(0, 5);

        forecastDays.forEach((day) => {
          const forecastDate = new Date(day.time * 1000);
          const dayOfWeek = forecastDate.toLocaleString("en-US", {
            weekday: "long",
          });
          const minTemp = Math.round(day.temperature.minimum);
          const maxTemp = Math.round(day.temperature.maximum);
          const condition = day.condition.description;
          const iconUrl = day.condition.icon_url;

          forecastContainer.innerHTML += `
            <div class="forecast-day">
              <h3>${dayOfWeek}</h3>
              <p><img src="${iconUrl}" alt="${condition}" class="weather-icon-forecast"> <br> Min: ${minTemp}°C <br><br>  Max: ${maxTemp}°C</p>
              <p>${condition}</p>
            </div>
          `;
        });
      } else {
        forecastContainer.innerHTML = "Unable to fetch forecast data.";
      }
    })
    .catch(() => {
      forecastContainer.innerHTML = "Unable to fetch forecast data.";
    });
}

// Function to display an error when weather data can't be fetched
function showError(city) {
  cityNameElement.textContent = city.charAt(0).toUpperCase() + city.slice(1);
  temperatureElement.innerHTML = `N/A <span class="weather-icon">❓</span>`;
  humidityElement.textContent = `N/A`;
  windsElement.textContent = `N/A`;
  weatherDescriptionElement.textContent =
    "Sorry, we couldn't fetch the weather for this city.";
}

// Event listener for search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim().toLowerCase();
  if (city) {
    updateWeather(city);
    updateForecast(city);
  }
});

// Set Johannesburg as default city when the page loads
document.addEventListener("DOMContentLoaded", function () {
  updateWeather("johannesburg");
  updateForecast("johannesburg");
});
// JavaScript to toggle dark theme
document.getElementById("theme-toggle").addEventListener("click", function () {
  // Check current theme
  if (document.body.getAttribute("data-theme") === "dark") {
    // Switch to light theme
    document.body.setAttribute("data-theme", "light");
    this.textContent = "Dark Theme";
  } else {
    // Switch to dark theme
    document.body.setAttribute("data-theme", "dark");
    this.textContent = "Light Theme";
  }
});
