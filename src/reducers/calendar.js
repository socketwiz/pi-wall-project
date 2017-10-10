/*
 *
 * Calendar reducer
 *
 */

import {SET_EVENTS} from '../actions/calendar';

const initialState = {
    'events': []
};

function calendarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EVENTS:
            return Object.assign({}, state, {
                'events': action.events
            });
        default:
            return state;
    }
}

export default calendarReducer;
