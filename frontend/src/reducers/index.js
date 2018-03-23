
import calendarReducer from './calendar';
import {combineReducers} from 'redux';
import weatherReducer from './weather';

const rootReducer = combineReducers({
    calendarReducer,
    weatherReducer
});

export default rootReducer;
