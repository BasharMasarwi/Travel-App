# Travel Companion App

## Overview
This project is a Travel Companion App that allows users to input a destination and travel date, and then fetch weather details and relevant images using multiple external APIs.

## Dependencies
- Express
- Webpack
- Babel
- Jest
- Node-sass

## Setup
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Build for production: `npm run build`
4. Start the server: `npm run start`
5. Run tests: `npm run test`
6. Make sure you create an .env file and add your api keys before running the project.
```bash
  weatherAPIKey = your_weatherbit_key
  geoNamesUser = your-Geaonnames-username
  pixabayAPIKey = your_pixabay_key
```

## Node Version
This project requires Node.js version `18.8.1`.

## APIs Used
- Geonames
- Weatherbit
- Pixabay

## Features
- Enter a destination and travel date
- Fetch and display weather information for the chosen location
- Display images related to the destination

