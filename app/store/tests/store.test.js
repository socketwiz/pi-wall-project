/* global describe, before, it */

/**
 * Test store addons
 */

import expect from 'expect';
import configureStore from '../configureStore';
import {loadTest} from '../../actions/app';
import * as types from '../../constants';

describe('configureStore', () => {
    const TEST = 'passed';

    let store;

    before(() => {
        store = configureStore({});
    });

    describe('actions', () => {
        it('should create an action to add a test', () => {
            const expectedAction = {
                'type': types.LOAD_TEST,
                'test': TEST
            };

            expect(store.dispatch(loadTest(TEST))).toEqual(expectedAction);
        });
    });
});

