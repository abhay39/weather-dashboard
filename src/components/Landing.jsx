import React from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
 // Add an appropriate background image to your assets

const id="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${id})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          Welcome to Weather Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your one-stop solution for accurate and real-time weather forecasts
        </Typography>
        <Box mt={4}>
          <Button
            component={Link}
            to="/signin"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
          >
            Register
          </Button>
        </Box>
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Real-Time Data
              </Typography>
              <Typography>
                Get the most accurate and up-to-date weather information for your location.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Forecast Analysis
              </Typography>
              <Typography>
                Analyze weather trends with our comprehensive forecast analysis tools.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Easy to Use
              </Typography>
              <Typography>
                Our user-friendly interface makes it easy to access weather information quickly.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
