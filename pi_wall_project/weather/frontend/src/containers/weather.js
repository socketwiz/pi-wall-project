/*
 * WeatherContainer
 */

import {connect} from 'react-redux';
import get from 'lodash/get';
import {setForecast, setWeather} from '../actions/weather';
import Weather from '../components/weather';

import moon from '../../img/climacons-master/SVG/Moon.svg';
import sun from '../../img/climacons-master/SVG/Sun.svg';
import cloudFog from '../../img/climacons-master/SVG/Cloud-Fog.svg';
import cloudRain from '../../img/climacons-master/SVG/Cloud-Rain.svg';
import cloudSnow from '../../img/climacons-master/SVG/Cloud-Snow.svg';
import cloud from '../../img/climacons-master/SVG/Cloud.svg';
import thermometerZero from '../../img/climacons-master/SVG/Thermometer-Zero.svg';

/**
 * Convert fahrenheit to celsius
 *
 * @param {Number} fahrenheit - temp to convert
 * @return {Number} - temp converted to celsius
 */
function toCelsius(fahrenheit) {
  return parseInt(((fahrenheit - 32) * (5 / 9)).toFixed(2), 10);
}

/**
 * Convert celcius to fahrenheit
 *
 * @param {Number} celsius - temp to convert
 * @return {Number} - temp converted to celsius
 */
function toFahrenheit(celsius) {
  return parseInt(((celsius * 9/5) + 32).toFixed(2), 10);
}

function toMph(knots) {
  return parseInt((knots * 1.151).toFixed(2), 10);
}

async function processWeather(response, dispatch) {
  const data = await response.json();
  const temp = toFahrenheit(
    get(data, 'properties.temperature.values[5].value', 0)
  );
  const chanceOfPrecipitation =
    get(data, 'properties.probabilityOfPrecipitation.values[5].value', 0);
  const tempMin = toFahrenheit(
    get(data, 'properties.minTemperature.values[0].value', 0)
  );
  const tempMax = toFahrenheit(
    get(data, 'properties.maxTemperature.values[0].value', 0)
  );
  const wind = toMph(
    get(data, 'properties.windSpeed.values[5].value', 0)
  );

  dispatch(setWeather({
    'chanceOfPrecipitation': chanceOfPrecipitation,
    'error': '',
    'temp': temp,
    'tempMin': tempMin,
    'tempMax': tempMax,
    'wind': wind
  }));
}

async function processForecast(response, dispatch) {
  const data = await response.json();
  const getImage = (forecast) => {
    const cloudRegexp = /\bCloudy\b/;
    const snowRegexp = /\bSnow\b/;
    const rainRegexp = /\b(Rain|Showers|Thunderstorm)\b/;
    const fogRegexp = /\bFog\b/;
    const sunRegexp = /\bSunny\b/;
    const moonRegexp = /\bClear\b/;

    let weather = thermometerZero;

    if (cloudRegexp.test(forecast)) {
      weather = cloud;
    }
    if (snowRegexp.test(forecast)) {
      weather = cloudSnow;
    }
    if (rainRegexp.test(forecast)) {
      weather = cloudRain;
    }
    if (fogRegexp.test(forecast)) {
      weather = cloudFog;
    }
    if (sunRegexp.test(forecast)) {
      weather = sun;
    }
    if (moonRegexp.test(forecast)) {
      weather = moon;
    }

    if (weather === thermometerZero) {
      console.log(forecast);
    }

    return weather;
  };
  const periods = get(data, 'properties.periods', []).map((period) => {
    const icon = getImage(period.shortForecast);

    period.icon = icon;

    return period;
  });

  const shortForecast = get(data, 'properties.periods.[0].shortForecast', '');
  const weather = getImage(shortForecast);

  dispatch(setForecast({
    'forecast': periods,
    'weather': weather
  }));
}

function mapStateToProps(state) {
  return {
    'chanceOfPrecipitation': state.weatherReducer.chanceOfPrecipitation,
    'error': state.weatherReducer.error,
    'forecast': state.weatherReducer.forecast,
    'humidity': state.weatherReducer.humidity,
    'temp': state.weatherReducer.temp,
    'tempMin': state.weatherReducer.tempMin,
    'tempMax': state.weatherReducer.tempMax,
    'weather': state.weatherReducer.weather,
    'wind': state.weatherReducer.wind
  };
}

function mapDispatchToProps(dispatch) {
  return {
    'getCurrentWeather': () => {
      const API_SERVER = 'https://api.weather.gov';
      const API_WEATHER = '/gridpoints/LWX/54,78';
      const API_FORECAST = '/gridpoints/LWX/54,78/forecast';
      const weatherEndpoint = `${API_SERVER}${API_WEATHER}`;
      const forecastEndpoint = `${API_SERVER}${API_FORECAST}`;

      fetch(weatherEndpoint)
        .then(response => {
          processWeather(response, dispatch);          
        })
        .catch(error => {
          dispatch(setWeather({
            'error': error.message
          }));
        });

      fetch(forecastEndpoint)
        .then(response => {
          processForecast(response, dispatch);
        });
    }
  };
}

const WeatherApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);

export default WeatherApp;
