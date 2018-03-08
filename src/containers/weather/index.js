/*
 * WeatherContainer
 */

import {connect} from 'react-redux';
import {setForecast, setWeather} from '../../actions/weather';
import Weather from '../../components/weather';
import 'whatwg-fetch';
import {withRouter} from 'react-router';

function mapStateToProps(state) {
    return {
        'city': state.weatherReducer.city,
        'error': state.weatherReducer.error,
        'forecast': state.weatherReducer.forecast,
        'humidity': state.weatherReducer.humidity,
        'temp': state.weatherReducer.temp,
        'temp_min': state.weatherReducer.temp_min,
        'temp_max': state.weatherReducer.temp_max,
        'weather': state.weatherReducer.weather,
        'wind': state.weatherReducer.wind
    };
}

function mapDispatchToProps(dispatch) {
    return {
        'getCurrentWeather': () => {
            const API_SERVER = 'http://api.openweathermap.org';
            const API_WEATHER = '/data/2.5/weather';
            const API_FORECAST = '/data/2.5/forecast';
            const PARAMS = `?units=imperial&zip=22603&appid=${process.env.REACT_APP_OPEN_WEATHER_API}`;
            const weatherEndpoint = `${API_SERVER}${API_WEATHER}${PARAMS}`;
            const forecastEndpoint = `${API_SERVER}${API_FORECAST}${PARAMS}`;

            fetch(weatherEndpoint)
                .then(response => response.json().then(data => {
                    const status = parseInt(data.cod, 10);

                    if (status !== 200 && status !== 0) {
                        dispatch(setWeather({
                            'error': `STATUS: ${data.cod} MESSAGE: ${data.message}`
                        }));
                    } else {
                        dispatch(setWeather({
                            'error': '',
                            'temp': data.main.temp,
                            'temp_min': data.main.temp_min,
                            'temp_max': data.main.temp_max,
                            'humidity': data.main.humidity,
                            'weather': data.weather,
                            'wind': data.wind.speed
                        }));
                    }
                }));

            fetch(forecastEndpoint)
                .then(response => response.json().then(data => {
                    if (data.cod === 401) {
                        return;
                    }

                    dispatch(setForecast({
                        'city': data.city.name,
                        'forecast': data.list
                    }));
                }));
        }
    };
}

const WeatherApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);

export default withRouter(WeatherApp);
