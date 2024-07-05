import axios from 'axios';

const API_KEY = `3f0bf6d8e62eac40790da66dc0b7e6d4`;

export const fetchWeather = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  let data  = await response.json();
  console.log(data);
  return data;
};

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${API_KEY}&units=metric`
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching the forecast data:', error);
    throw error;
  }
};
