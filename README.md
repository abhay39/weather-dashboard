# Weather Dashboard

A React-based weather dashboard application that allows users to search for and view weather forecasts for different cities. The application uses Material-UI for styling and the OpenWeatherMap API for fetching weather data.

## Features

- Search for weather information by city.
- View current weather conditions including temperature, weather description, wind speed, precipitation, and pressure.
- View a 7-day weather forecast.
- Display a temperature trend (placeholder for future enhancement).

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

```
REACT_APP_API_KEY=your_openweathermap_api_key
```

### 4. Start the development server

```bash
npm start
```

or

```bash
yarn start
```

The application will start on `http://localhost:3000`.

## Project Structure

```
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── SearchBar.js
│   │   ├── WeatherCard.js
│   │   ├── WeatherForecast.js
│   │   ├── TemperatureTrend.js
│   ├── utils/
│   │   ├── api.js
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
├── README.md
```

## Components

### `Dashboard.js`

The main component that assembles the search bar, weather card, weather forecast, and temperature trend components.

```javascript
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import WeatherForecast from './WeatherForecast';
import TemperatureTrend from './TemperatureTrend';
import { fetchWeather, fetchForecast } from '../utils/api';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weather Dashboard
      </Typography>
      <SearchBar onSearch={handleSearch} />
      {error && <Typography color="error">{error}</Typography>}
      {weather && <WeatherCard weather={weather} />}
      {forecast && <WeatherForecast forecast={forecast.list} />}
      {forecast && <TemperatureTrend forecast={forecast.list} />}
    </Container>
  );
};

export default Dashboard;
```

### `SearchBar.js`

A component for entering and submitting city names.

```javascript
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
```

### `WeatherCard.js`

A component for displaying current weather information.

```javascript
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const WeatherCard = ({ weather }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {weather.name}, {weather.sys.country}
        </Typography>
        <Typography variant="h3">
          {weather.main.temp} °C
        </Typography>
        <Typography variant="h6">
          {weather.weather[0].description}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Wind: {weather.wind.speed} kmph</Typography>
          <Typography variant="body1">Precip: {weather.rain ? weather.rain['1h'] : 0} mm</Typography>
          <Typography variant="body1">Pressure: {weather.main.pressure} mb</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
```

### `WeatherForecast.js`

A component for displaying a 5-day weather forecast.

```javascript
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const WeatherForecast = ({ forecast }) => {
  return (
    <Box display="flex" justifyContent="space-around" mt={3}>
      {forecast.slice(0, 5).map((day, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant="h6">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </Typography>
            <Typography variant="body1">
              {Math.round(day.temp.day)} °C
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default WeatherForecast;
```

### `TemperatureTrend.js`

A placeholder component for displaying temperature trends (can be replaced with a chart in the future).

```javascript
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TemperatureTrend = ({ forecast }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Temperature Trend (Placeholder)
        </Typography>
        {/* Add your chart component here */}
      </CardContent>
    </Card>
  );
};

export default TemperatureTrend;
```

### API Utility Functions

Utility functions for fetching weather and forecast data from the OpenWeatherMap API.

```javascript
// src/utils/api.js
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeather = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
};

export const fetchForecast = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
};
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or additions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a comprehensive overview of your weather dashboard application, including setup instructions, component details, and code snippets. Make sure to replace placeholder values like `your_openweathermap_api_key` and `your-username` with your actual values.
