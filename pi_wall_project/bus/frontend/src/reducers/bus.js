/*
 *
 * Bus reducer
 *
 */

import {SET_SCHEDULE, SET_HOLIDAY} from '../actions/bus';

const initialState = {
  'holidays': [],
  'pickups': []
};

function busReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCHEDULE:
      return state.pickups.concat(action.data.pickup);
    case SET_HOLIDAY:
      return state.holidays.concat(action.data.holiday);
    default:
      return state;
  }
}

export default busReducer;

