import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import WeatherForecast from './WeatherForecast';
import TemperatureTrend from './TemperatureTrend';
import { fetchWeather, fetchForecast } from '../utils/api';
import { getUserDetails } from './WeatherCard'; // Assuming this is where getUserDetails is imported from

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userDetails = await getUserDetails(token);
          setUserDetails(userDetails);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error fetching user details
      }
    };

    fetchUserDetails();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/"; // Redirect to login or home page after logout
  };

  return (
    <Container>
      <div style={{
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
      }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {userDetails?.name || 'User'} to Weather Dashboard
        </Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <SearchBar onSearch={handleSearch} />
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h6" gutterBottom>
        Saved Address
      </Typography>
      {userDetails?.savedAddress?.map((item, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: '10px', padding: '10px' }}>
          <CardContent>
            <Typography onClick={()=>{
              handleSearch(item.address)
            }} style={{
              cursor: 'pointer',
              
            }} variant="body1">
              {item.address}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {weather && <WeatherCard weather={weather} />}


      {forecast && <WeatherForecast forecast={forecast.list} />}
      {forecast && <TemperatureTrend forecast={forecast.list} />}
    </Container>
  );
};

export default Dashboard;
