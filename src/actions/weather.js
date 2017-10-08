/*
 *
 * Weather actions
 *
 */

export const SET_WEATHER = 'SET_WEATHER';
export const SET_FORECAST = 'SET_FORECAST';

/**
 * Set the forecast data in the redux store
 *
 * @param {Object} data - data to store
 */
export function setForecast(data) {
    return {
        'type': SET_FORECAST,
        'data': data
    };
}

/**
 * Set the weather data in the redux store
 *
 * @param {Object} data - data to store
 */
export function setWeather(data) {
    return {
        'type': SET_WEATHER,
        'data': data
    };
}
