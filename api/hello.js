require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (clientIp === '::1' || clientIp === '127.0.0.1') {
    clientIp = '8.8.8.8'; // Example: Google's public DNS IP address
  }

  try {
    const locationResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
    const locationData = locationResponse.data;
    const city = locationData.city || 'New York';

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
    const weatherData = weatherResponse.data;
    const temperature = weatherData.main.temp;

    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
    });
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

module.exports = app;
