/*
 *
 * Weather reducer
 *
 */

import {SET_FORECAST, SET_WEATHER} from '../actions/weather';

const initialState = {
    'city': '',
    'error': '',
    'forecast': [],
    'humidity': 0,
    'temp': 0,
    'temp_min': 0,
    'temp_max': 0,
    'weather': [],
    'wind': 0
};

function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FORECAST:
            return Object.assign({}, state, {
                'city': action.data.city,
                'forecast': action.data.forecast
            });
        case SET_WEATHER:
            return Object.assign({}, state, {
                'error': action.data.error,
                'humidity': action.data.humidity,
                'temp': action.data.temp,
                'temp_min': action.data.temp_min,
                'temp_max': action.data.temp_max,
                'weather': action.data.weather,
                'wind': action.data.wind
            });
        default:
            return state;
    }
}

export default weatherReducer;

