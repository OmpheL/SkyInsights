const apiKey = "9605c51ae5b92t61fff7f03a24730o32"; // SheCodes API key
const baseUrl = "https://api.shecodes.io/weather/v1/current?query="; // SheCodes API endpoint for current weather

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const cityNameElement = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const weatherDescriptionElement = document.getElementById(
  "weather-description"
);
const windsElement = document.getElementById("winds"); // Element for wind info display

function updateWeather(city) {
  const now = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const formattedDate = `${daysOfWeek[now.getDay()]} ${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  fetch(`${baseUrl}${city}&key=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.city && data.temperature && data.condition) {
        const temperature = data.temperature.current;
        const humidity = data.temperature.humidity;
        const winds = data.wind ? `${data.wind.speed} km/h` : "N/A"; // Handle cases where wind data is unavailable
        const condition = data.condition.description;
        const iconUrl = data.condition.icon_url;

        cityNameElement.textContent =
          city.charAt(0).toUpperCase() + city.slice(1);

        // Show temperature and icon
        temperatureElement.innerHTML = `${Math.round(temperature)}°C `;
        if (iconUrl) {
          temperatureElement.innerHTML += `<img src="${iconUrl}" alt="${condition}" class="weather-icon">`;
        }

        humidityElement.textContent = `${humidity}%`;
        windsElement.textContent = `${winds}`;
        weatherDescriptionElement.textContent = `${formattedDate}, ${condition}`;
      } else {
        cityNameElement.textContent =
          city.charAt(0).toUpperCase() + city.slice(1);
        temperatureElement.innerHTML = `N/A <span class="weather-icon">❓</span>`;
        humidityElement.textContent = `N/A`;
        windsElement.textContent = `N/A`;
        weatherDescriptionElement.textContent = `Sorry, we couldn't fetch the weather for this city. Please try again.`;
      }
    })
    .catch(() => {
      cityNameElement.textContent =
        city.charAt(0).toUpperCase() + city.slice(1);
      temperatureElement.innerHTML = `N/A <span class="weather-icon">❓</span>`;
      humidityElement.textContent = `N/A`;
      windsElement.textContent = `N/A`;
      weatherDescriptionElement.textContent = `Sorry, we couldn't fetch the weather for this city. Please try again.`;
    });
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim().toLowerCase();
  if (city) {
    updateWeather(city);
  }
});

// Set Johannesburg as default city
document.addEventListener("DOMContentLoaded", function () {
  updateWeather("johannesburg");
});
