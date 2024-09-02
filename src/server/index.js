const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));
const PORT = 4000;


const fetchCityCoordinates = async (city) => {

  const geoNamesApiKey = process.env.geoNamesUser;
  console.log(geoNamesApiKey)
  const apiUrl = `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoNamesApiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.geonames.length > 0) {
      const { lat, lng, name, countryName } = data.geonames[0];
      return { latitude: lat, longitude: lng, cityName: name, countryName };
    } else {
      throw new Error('No data found for the specified location');
    }
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    throw new Error('Unable to fetch city coordinates');
  }
};

const fetchCityImage = async (city) => {
  const pixabayApiKey = process.env.pixabayAPIKey;
  const apiUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(city)}&image_type=photo`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    return data.hits.length > 0 ? data.hits[0].webformatURL : '';
  } catch (error) {
    console.error('Error fetching image from Pixabay:', error);
    throw new Error('Unable to fetch city image');
  }
};

const calculateDaysUntil = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const timeDiff = target - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
};

// Function to fetch weather forecast using Weatherbit API 
const fetchWeatherForecast = async (lat, lng, date) => {
  const weatherbitApiKey = process.env.weatherAPIKey;
  const remainingDays = calculateDaysUntil(date);
  const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${weatherbitApiKey}&days=${remainingDays}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.data.length > 0) {
      const { temp, weather } = data.data[0];
      return { temperature: temp, description: weather.description, icon: weather.icon };
    } else {
      throw new Error('No weather data available');
    }
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Unable to fetch weather forecast');
  }
};


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/coordinates', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const coordinates = await fetchCityCoordinates(city);
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get weather forecast
app.get('/api/weather', async (req, res) => {
  const { lat, lng, date } = req.query;
  console.log("query :", req.query)
  if (!lat || !lng || !date) {
    return res.status(400).json({ error: 'Latitude, Longitude, and Date parameters are required' });
  }

  try {
    const weatherForecast = await fetchWeatherForecast(lat, lng, date);
    res.json(weatherForecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/image', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const imageUrl = await fetchCityImage(city);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
