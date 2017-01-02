/* global describe, before, it */

/**
 * Test store addons
 */

import {expect} from 'chai';
import configureStore from '../configureStore';

describe('configureStore', () => {
    let store;

    before(() => {
        store = configureStore({});
    });

    describe('dispatch', () => {
        it('should have a dispatch', () => {
            expect(typeof store.dispatch).to.eql('function');
        });
    });
});

