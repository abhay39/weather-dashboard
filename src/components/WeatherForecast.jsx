import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const WeatherForecast = ({ forecast }) => {
  console.log(forecast)
  return (
    <Grid container spacing={2} style={{marginTop:10}}>
      {forecast?.map((day, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Day {index + 1}</Typography>
              <Typography variant="body1">Temperature: {day.main.temp}°C</Typography>
              <Typography variant="body1">Condition: {day.weather[0].description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeatherForecast;
