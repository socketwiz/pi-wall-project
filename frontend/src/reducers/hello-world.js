
import {UPDATE_HELLO, UPDATE_HELLOS} from '../actions/hello-world';

const initialState = {
    'hellos': []
};

function helloWorldReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_HELLO:
            return {'hellos': state.hellos.concat(action.hello)};
        case UPDATE_HELLOS:
            return Object.assign({}, state, {
                'hellos': action.hellos
            });

        default:
            return state;
    }
}

export default helloWorldReducer;
