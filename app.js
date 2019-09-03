import * as ELEMENTS from './elements.js';
import {
  Http
}
from './http.js';
import {
  WeatherData, WEATHER_DATA_PROXY_HANDLER
}
from './weather-data.js';

ELEMENTS.EL_SEARCH_BUTTON.addEventListener('click', searchWeather);

console.log('ELEMENTS', ELEMENTS);

function searchWeather(event) {
  const CITY_NAME = ELEMENTS.EL_SEARCH_INPUT.value.trim();
  if (CITY_NAME.length < 2) {
    return alert('City name must contain at least 2 characters!');
  }
  const url = 'https://api.openweathermap.org/data/2.5/weather?APPID=8cb342ea537dccedf3ace8d9458f8f9f&units=metric&q=' + CITY_NAME;

  ELEMENTS.EL_SEARCH_LOADING.style.display = 'block';
  ELEMENTS.EL_WEATHER_BOX.style.display = null;
  ELEMENTS.EL_WEATHER_CITY.innerHTML = '';
  ELEMENTS.EL_WEATHER_DESC.innerHTML = '';
  ELEMENTS.EL_WEATHER_TEMP.innerHTML = '';

  Http.get(url)
    .then((response) => {
      console.log(response);
      const weatherData = new WeatherData(response.name, response.weather[0].description);
      const weatherDataProxy = new Proxy(weatherData, WEATHER_DATA_PROXY_HANDLER);
      weatherDataProxy.temperature = response.main.temp;

      ELEMENTS.EL_WEATHER_CITY.innerHTML = weatherDataProxy.cityName;
      ELEMENTS.EL_WEATHER_DESC.innerHTML = weatherDataProxy.description;
      ELEMENTS.EL_WEATHER_TEMP.innerHTML = weatherDataProxy.temperature;

      ELEMENTS.EL_SEARCH_LOADING.style.display = null;
      ELEMENTS.EL_WEATHER_BOX.style.display = 'block';
    })
    .catch(err => {
      alert(err);
      ELEMENTS.EL_SEARCH_LOADING.style.display = null;
      ELEMENTS.EL_WEATHER_BOX.style.display = null;
    });
}