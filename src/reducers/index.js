
import {combineReducers} from 'redux';
import weatherReducer from './weather';

const rootReducer = combineReducers({
    weatherReducer
});

export default rootReducer;
