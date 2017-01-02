
import {combineReducers} from 'redux';
import homeContainerReducer from './home-container';

const ROOT_REDUCER = combineReducers({
    /* eslint-disable comma-dangle */
    homeContainerReducer,
    /* eslint-enable comma-dangle */
});

export default ROOT_REDUCER;
