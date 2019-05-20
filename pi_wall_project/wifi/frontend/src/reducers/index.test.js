/* global describe expect it */

import '../../setup';

import rootReducer from './index';

describe('Reducers', () => {
    it('will be a function', () => {
        expect(typeof rootReducer).toEqual('function');
    });
});


