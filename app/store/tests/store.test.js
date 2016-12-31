/* global describe, before, it */

/**
 * Test store addons
 */

import expect from 'expect';
import configureStore from '../configureStore';

describe('configureStore', () => {
    const TEST = 'passed';

    let store;

    before(() => {
        store = configureStore({'app': {'test': TEST}});
    });

    describe('app store', () => {
        it('should contain an object for the app store', () => {
            expect(store.getState().app.test).toEqual(TEST);
        });
    });
});

