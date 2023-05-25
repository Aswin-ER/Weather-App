var express = require('express');
var router = express.Router();
const axios = require('axios');
const openweathermap = require('openweathermap');


router.get('/', (req, res)=> {
  res.render('index');
})

router.post('/cities', async (req, res)=> {
  const city = req.body.city;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  const response = await axios.get(url);
  if(response){

    console.log(response,"asassasas");

    //Temp
    let temperature = response.data.main.temp
    temperature = ((temperature - 32) * 5/9).toFixed(2);

    //Date
    let date = new Date();
    let formattedDate = `${date.getDate()}/ ${date.getMonth() + 1}/ ${date.getFullYear()}`;

    //Country
    let code = response.data.sys.country;

    res.render('index', {city: city, 
      temperature,weather: response.data.weather[0].description, 
      humidity: response.data.main.humidity,
      formattedDate,
      code,
      wind: response.data.wind.speed,
      desc: response.data.weather[0].main,
    });
  }else{
    res.redirect('/');
  }
 
});

module.exports = router;
