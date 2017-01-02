
import {combineReducers} from 'redux';
import homeContainerReducer from './home-container';

const ROOT_REDUCER = combineReducers({
    homeContainerReducer
});

export default ROOT_REDUCER;
