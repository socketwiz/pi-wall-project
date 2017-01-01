
import {assign} from 'lodash';
import {LOAD_TEST} from '../constants';

// The initial state of the App
const initialState = {
    'test': ''
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TEST:
            return assign({}, state, {
                'test': state.test
            });
        default:
            return state;
    }
}

export default appReducer;

