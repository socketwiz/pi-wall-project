/*
 *
 * Weather reducer
 *
 */

import {
    DEFAULT_ACTION
} from '../containers/Weather/constants';

const initialState = {};

function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default weatherReducer;

