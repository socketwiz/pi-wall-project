/* global describe, it */

import {expect} from 'chai';
import homeContainerReducer from '../home-container';

describe('homeContainerReducer', () => {
    it('returns the initial state', () => {
        expect(homeContainerReducer(undefined, {})).to.eql({});
    });
});

