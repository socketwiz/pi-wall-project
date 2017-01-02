/*
 *
 * HomeContainer reducer
 *
 */

import {
    DEFAULT_ACTION
} from '../containers/HomeContainer/constants';

const initialState = {};

function homeContainerReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default homeContainerReducer;

