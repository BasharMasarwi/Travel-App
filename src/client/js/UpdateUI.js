const updateWeatherInfo = (weatherData, destination) => {
  const weatherInfoElement = document.getElementById("weather-results");

  const weatherInfo = `
        <div>
            <strong>${destination}</strong><br>
            Temperature: ${weatherData.temperature}<br>
            Description: ${weatherData.description}<br>
             <p>Icon:${weatherData.icon} </p>
        </div>
    `;

  weatherInfoElement.innerHTML += weatherInfo;
};

const updateImageInfo = (imageUrl) => {
  const imageContainer = document.getElementById("image-container");

  imageContainer.innerHTML = "";
  const img = document.createElement("img");
  img.src = imageUrl;

  imageContainer.appendChild(img);
};

const showError = (message) => {
  alert(message);
};

export { updateWeatherInfo, updateImageInfo, showError };
