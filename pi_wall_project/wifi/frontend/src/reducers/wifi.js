/*
 *
 * Wifi reducer
 *
 */

import {SET_QR_CODE} from '../actions/wifi';

const initialState = {
    'qrCode': ''
};

function wifiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_QR_CODE:
            return Object.assign({}, state, {
                'qrCode': action.qrCode
            });
        default:
            return state;
    }
}

export default wifiReducer;
