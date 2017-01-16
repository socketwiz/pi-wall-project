
import {combineReducers} from 'redux';
import WeatherReducer from './weather';
import homeContainerReducer from './home-container';

const ROOT_REDUCER = combineReducers({
    /* eslint-disable comma-dangle */
    homeContainerReducer,
    WeatherReducer,
    /* eslint-enable comma-dangle */
});

export default ROOT_REDUCER;
