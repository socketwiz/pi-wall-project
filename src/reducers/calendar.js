/*
 *
 * Calendar reducer
 *
 */

import {SET_CALENDAR} from '../actions/calendar';

const initialState = {
};

function calendarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CALENDAR:
            return Object.assign({}, state, {
            });
        default:
            return state;
    }
}

export default calendarReducer;
