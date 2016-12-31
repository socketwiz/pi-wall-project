
import {LOAD_TEST} from '../constants';

// The initial state of the App
const initialState = {
    'app': ''
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TEST:
            return _.assign({}, state, {
                'test': 'passed'
            });
        default:
            return state;
    }
}

export default appReducer;

