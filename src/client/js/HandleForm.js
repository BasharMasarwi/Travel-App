import { fetchCoordinates, fetchWeather, fetchImage } from "./ApisCalls.js";
import { updateWeatherInfo, updateImageInfo, showError } from "./UpdateUI.js";

export const handleSubmit = async (event) => {
  event.preventDefault();

  const destination = document.getElementById("destination").value;
  const departureDate = document.getElementById("departureDate").value;

  try {
    const coordinates = await fetchCoordinates(destination);
    const { latitude, longitude } = coordinates;

    const weatherData = await fetchWeather(latitude, longitude, departureDate);

    const imageData = await fetchImage(destination);
    updateImageInfo(imageData.imageUrl);
  } catch (error) {
    console.error("Error:", error);
    showError("Failed to fetch data. Please try again.");
  }
};
