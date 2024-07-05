import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const TemperatureTrend = ({ forecast }) => {
  const data = {
    labels: forecast?.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Temperature',
        data: forecast.map((day) => day.main.temp),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '7-Day Temperature Trend',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureTrend;
