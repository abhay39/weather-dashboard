// src/components/WeatherCard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

  export const getUserDetails =async(token)=>{
    let getUserDetails=await fetch(`${process.env.REACT_APP_BACKEND_API}/userDetails/${token}`);
    getUserDetails=await getUserDetails.json();
    return getUserDetails;
  }
const WeatherCard = ({ weather }) => {
  const [userDetails,setUserDetails]=useState('');
  const navigate=useNavigate();


  useEffect(()=>{
   const getd=async()=>{
    const token=localStorage.getItem('token');
    let result=await getUserDetails(token)
    setUserDetails(result);
    // console.log(userDetails);
  }
  getd();
  },[userDetails])

  const saveAddress=async()=>{
    
    if(userDetails){
      const response=await fetch(`${process.env.REACT_APP_BACKEND_API}/saveaddress`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id:userDetails._id,
          address:weather.name
        })
      })
      const status=response.status;
      const data=await response.json()
  
      if(status==201){
        navigate("/dashboard")
        alert(data)
      }else{
        alert(data)
      }
    }
  }

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
        <Button
        onClick={saveAddress}
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      Save Address
    </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
