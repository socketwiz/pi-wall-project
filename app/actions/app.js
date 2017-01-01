
import {LOAD_TEST} from '../constants';

export function loadTest(data) {
    return {
        'type': LOAD_TEST,
        'test': data
    };
}

