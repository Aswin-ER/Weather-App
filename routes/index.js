const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response) {

      // Process the weather data
      let temperature = response.data.main.temp;
      temperature = ((temperature - 32) * 5 / 9).toFixed(2);

      let date = new Date();
      let formattedDate = `${date.getDate()}/ ${date.getMonth() + 1}/ ${date.getFullYear()}`;

      let code = response.data.sys.country;

      res.render('index', {
        city: city,
        temperature: temperature,
        weather: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        formattedDate,
        code,
        wind: response.data.wind.speed,
        desc: response.data.weather[0].main,
      });
    }
  } catch (error) {
    res.render('index', {cityError:'An error occurred. Please enter a valid city name' });
  }

});

module.exports = router;
