/*
 *
 * Weather reducer
 *
 */

import {SET_FORECAST, SET_WEATHER} from '../actions/weather';

const initialState = {
  'forecast': [],
  'weather': '',
  'chanceOfPrecipitation': 0,
  'error': '',
  'temp': 0,
  'tempMin': 0,
  'tempMax': 0,
  'wind': 0
};

function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORECAST:
      return Object.assign({}, state, {
        'forecast': action.data.forecast,
        'weather': action.data.weather,
      });
    case SET_WEATHER:
      return Object.assign({}, state, {
        'chanceOfPrecipitation': action.data.chanceOfPrecipitation,
        'error': action.data.error,
        'temp': action.data.temp,
        'tempMin': action.data.tempMin,
        'tempMax': action.data.tempMax,
        'wind': action.data.wind
      });
    default:
      return state;
  }
}

export default weatherReducer;

